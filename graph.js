fetch('input_json.json')
  .then(response => response.json())
  .then(data => {
    let nodesSet = new Set();
    let edges = [];
    let methodMap = {};
    let methodToClasses = {};

    function traverse(obj, parent = null) {
      Object.entries(obj).forEach(([className, classData]) => {
        nodesSet.add(className);

        methodMap[className] = classData["methods used"] || [];

        (classData["methods used"] || []).forEach(method => {
          if (!methodToClasses[method]) methodToClasses[method] = [];
          methodToClasses[method].push(className);
        });

        if (parent !== null) {
          edges.push({ data: { source: parent, target: className } });
        }

        for (const linkObj of (classData["linked_classes"] || [])) {
          traverse(linkObj, className);
        }
      });
    }
    traverse(data);

    let nodeArr = Array.from(nodesSet).map(n =>
      ({ data: { id: n, label: n } })
    );

    const cy = cytoscape({
      container: document.getElementById('cy'),
      elements: { nodes: nodeArr, edges: edges },
      style: [
        { selector: 'node', style: {
            'label': 'data(label)', 'background-color': '#0074D9',
            'color': '#fff', 'text-valign': 'center', 'text-halign': 'center',
            'border-width': 3, 'border-color': '#fff'
        }},
        { selector: 'node.highlight', style: {
            'background-color': '#FF4136',
            'border-color': '#FF851B',
            'border-width': 3
        }},
        { selector: 'node.selected', style: {
            'border-color': '#2ECC40',
            'border-width': 8,
            // The background color here can be overridden by .highlight selector fill
            'color': '#fff',
            'z-index': 10 // on top
        }},
        { selector: 'edge', style: {
            'width': 2, 'line-color': '#aaa'
        }}
      ],
      layout: { name: 'breadthfirst', directed: true, orientation: 'vertical', padding: 10 }
    });

    cy.on('tap', 'node', evt => {
      cy.nodes().removeClass('selected highlight');
      const nodeId = evt.target.id();
      cy.$id(nodeId).addClass('selected');

      const methods = methodMap[nodeId] || [];
      let html = `<b>Class ${nodeId} Methods Used:</b><ul>`;
      methods.forEach(m =>
        html += `<li><button class="method-btn" onclick="window.highlightByMethod('${m}')">${m}</button></li>`
      );
      html += '</ul>';
      document.getElementById('details').innerHTML = html;
    });

    cy.on('tap', evt => {
      if (evt.target === cy) {
        cy.nodes().removeClass('selected highlight');
        document.getElementById('details').innerHTML = `<b>Click a class node to see its methods.</b>`;
      }
    });

    window.highlightByMethod = function(method) {
      cy.nodes().removeClass('highlight');
      let selectedNodes = cy.nodes('.selected');
      let selectedId = selectedNodes.length === 1 ? selectedNodes[0].id() : null;

      (methodToClasses[method] || []).forEach(classId => {
        cy.$id(classId).addClass('highlight');
      });

      // Keep selected node selected even if it also has highlight
      if (selectedId) {
        cy.$id(selectedId).addClass('selected');
      }
    };
  });
