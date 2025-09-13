fetch('input_json.json')
  .then(response => response.json())
  .then(data => {
    let nodes = new Set();
    let edges = [];

    function extractKeysAndValues(obj, parentKey = null) {
      if (typeof obj === "object" && obj !== null) {
        if (Array.isArray(obj)) {
          
          obj.forEach(item => {
            if (typeof item === "object" && item !== null) {
              extractKeysAndValues(item, parentKey);
            } else {
              nodes.add(String(item));
              if (parentKey !== null) {
                edges.push({ data: { source: parentKey, target: String(item) } });
              }
            }
          });
        } else {
          Object.entries(obj).forEach(([key, val]) => {
            nodes.add(key);
            if (parentKey !== null) {
              edges.push({ data: { source: parentKey, target: key } });
            }
            extractKeysAndValues(val, key);
          });
        }
      } else {
        nodes.add(String(obj));
        if (parentKey !== null) {
          edges.push({ data: { source: parentKey, target: String(obj) } });
        }
      }
    }

    extractKeysAndValues(data);

    // Prepare Cytoscape nodes array
    let nodeArr = Array.from(nodes).map(id => ({ data: { id, label: id } }));

cytoscape({
  container: document.getElementById('cy'),
  elements: { nodes: nodeArr, edges: edges },
  style: [
    { selector: 'node', style: { 'label': 'data(label)', 'background-color': '#0074D9' }},
    { selector: 'edge', style: { 'width': 2, 'line-color': '#aaa' }}
  ],
  layout: {
    name: 'breadthfirst',
    directed: true,
    orientation: 'vertical',
    padding: 10
  }
});
  });
