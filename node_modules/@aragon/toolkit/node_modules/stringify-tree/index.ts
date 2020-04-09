import flatten = require("lodash.flatten");

/**
 * Turn a tree structure into an ASCII string.
 * This is generic: I don't care what your tree node type is, as long as you can get me
 * its name and its children.
 * 
 * @param tn top-level tree node
 * @param nameFn how to calculate the name of a tree node
 * @param childrenFn how to get the children of a tree node
 */
export function stringifyTree<T>(tn: T, nameFn: (t: T) => string, childrenFn: (t: T) => T[]): string {

    function prefixChild(strs: string[], last: boolean): string[] {
        return strs.map((s, i) => {
            const prefix = i === 0 ? (last ? "└─" : "├─") : (last ? "  " : "│ ");
            return prefix + s;
        });
    }
    function nodeToStrings(tn: T): string[] {
        const origChildren = childrenFn(tn) || [];
        const children = [...origChildren]; // copy the array
        if (children.length === 0) {
            return ["─ " + nameFn(tn)];
        }
        return ["┬ " + nameFn(tn), ...flatten(children.map((c, i) => {
            const strs = nodeToStrings(c);
            return prefixChild(strs, i === (children.length - 1));
        }))];
    }

    return nodeToStrings(tn).join("\n");

}
