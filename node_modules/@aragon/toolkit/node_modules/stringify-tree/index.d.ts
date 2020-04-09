/**
 * Turn a tree structure into an ASCII string.
 * This is generic: I don't care what your tree node type is, as long as you can get me
 * its name and its children.
 *
 * @param tn top-level tree node
 * @param nameFn how to calculate the name of a tree node
 * @param childrenFn how to get the children of a tree node
 */
export declare function stringifyTree<T>(tn: T, nameFn: (t: T) => string, childrenFn: (t: T) => T[]): string;
//# sourceMappingURL=index.d.ts.map