# Class Method Graph Visualization

This project provides an interactive graph visualization of classes and their methods using Cytoscape.js. Each class is a node; edges represent links between classes. Clicking a class shows its methods on the right; clicking a method highlights all classes that use it, while the selected node remains distinctly highlighted.

---

## Features

- Class nodes with edges representing linked classes.
- Selected node highlighted with thick green border.
- Method buttons highlight all classes sharing that method with orange fill.
- Selected node retains thick green border during method highlight.

---

## Files

- `index.html` — Main HTML with Cytoscape.js and graph container.
- `graph.js` — JavaScript parsing JSON and implementing graph and interaction logic.
- `input.json` — Sample nested JSON describing classes, methods, and links.

---

## How to Run

1. Place `index.html`, `graph.js`, and `input.json` in the same folder.

2. Run a local HTTP server (required for JSON fetch):

```

python -m http.server 8000

```

3. Open browser at `http://localhost:8000`.

4. Click a class node to see its methods on the right panel.

5. Click a method button to highlight all classes using that method.

6. Click empty graph space to clear highlights.

---

## Sample `input.json`

```

{
"A": {
"methods used": ["method1a", "method2a", "commonMethod"],
"linked_classes": [
{
"B": {
"methods used": ["method1b", "method2b", "method3a", "commonMethod"],
"linked_classes": [
{
"D": {
"methods used": ["method1d", "commonMethod"],
"linked_classes": []
}
}
]
},
"C": {
"methods used": ["method1c", "method2b", "commonMethod"],
"linked_classes": [
{
"E": {
"methods used": ["method1e"],
"linked_classes": []
}
},
{
"F": {
"methods used": ["method1f", "method2f", "method3c", "commonMethod"],
"linked_classes": [
{
"G": {
"methods used": ["method1g", "commonMethod"],
"linked_classes": []
}
}
]
}
}
]
}
}
]
},
"X": {
"methods used": ["method1x", "commonMethod"],
"linked_classes": [
{
"Y": {
"methods used": ["method1y", "commonMethod"],
"linked_classes": []
},
"Z": {
"methods used": ["method1z", "method2z", "commonMethod"],
"linked_classes": [
{
"W": {
"methods used": ["method1w", "commonMethod"],
"linked_classes": []
}
}
]
}
}
]
}
}

```

---

## Additional Notes

- Customize styles and layout in `graph.js` as needed.
- JSON structure supports multiple independent root classes.
- Use local HTTP server due to browser security restrictions on file loading.

---