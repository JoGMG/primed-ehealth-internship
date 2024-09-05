"use strict";
/**
 * Performs a Depth-First Search (DFS) on a graph.
 *
 * @param graph - The graph to be traversed.
 * @param node - The starting node for the DFS.
 * @param visited - A set of nodes that have already been
 * visited (optional).
 * @returns An array of nodes in the order they were visited.
 */
function depth_first_search(graph, node, visited = new Set()) {
    // Add the current node to the visited set
    visited.add(node);
    // Initialize the result array with the current node
    let result = [node];
    // Iterate over the neighbors of the current node
    for (let neighbor of graph[node]) {
        // If the neighbor hasn't been visited yet...
        if (!visited.has(neighbor)) {
            // Recursively perform a DFS from the neighbor,
            // and concatenate the original result with the
            // current result array
            result = result.concat(depth_first_search(graph, neighbor, visited));
        }
    }
    // Return the result array, of the nodes in the order
    // they were visited
    return result;
}
// Test case
const test_1 = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
};
console.log(depth_first_search(test_1, 'F'));
//# sourceMappingURL=depth_first_search.js.map