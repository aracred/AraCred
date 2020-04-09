"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var flatten = require("lodash.flatten");
/**
 * Turn a tree structure into an ASCII string.
 * This is generic: I don't care what your tree node type is, as long as you can get me
 * its name and its children.
 *
 * @param tn top-level tree node
 * @param nameFn how to calculate the name of a tree node
 * @param childrenFn how to get the children of a tree node
 */
function stringifyTree(tn, nameFn, childrenFn) {
    function prefixChild(strs, last) {
        return strs.map(function (s, i) {
            var prefix = i === 0 ? (last ? "└─" : "├─") : (last ? "  " : "│ ");
            return prefix + s;
        });
    }
    function nodeToStrings(tn) {
        var origChildren = childrenFn(tn) || [];
        var children = origChildren.slice(); // copy the array
        if (children.length === 0) {
            return ["─ " + nameFn(tn)];
        }
        return ["┬ " + nameFn(tn)].concat(flatten(children.map(function (c, i) {
            var strs = nodeToStrings(c);
            return prefixChild(strs, i === (children.length - 1));
        })));
    }
    return nodeToStrings(tn).join("\n");
}
exports.stringifyTree = stringifyTree;
//# sourceMappingURL=index.js.map