# stringify-tree

Convert a tree structure to an ASCII tree, in approximately the style of `npm ls`

This is in TypeScript, which helps since you pass it some functions.

## install

`npm install stringify-tree`

## trivial example

```typescript
import { stringifyTree } from "stringify-tree";

const tree = {
        name: "Grandmarti", children: [
            {
                name: "Cyndi", children: [
                    {
                        name: "Jess", children: [
                            { name: "Evelyn", children: [] },
                            { name: "Linda", children: [] },
                        ],
                    },
                ],
            },
            { name: "Celia", children: [] },
        ],
    };
    console.log(stringifyTree(tree, t => t.name, t => t.children));
```

```
┬ Grandmarti
├─┬ Cyndi
│ └─┬ Jess
│   ├── Evelyn
│   └── Linda
└── Celia
```

## real-life example

```typescript
import { stringifyTree } from "stringify-tree";

function treeNodeName(tn: TreeNode) {
    const endOffset = tn.$value ? ", " + (tn.$offset + tn.$value.length) : "";
    return `[${tn.$offset}${endOffset}] ${tn.$name}`;
}
function treeNodeChildren(tn: TreeNode): TreeNode[] {
    return tn.$children || [];
}

// parser stuff from Atomist. trust me, it makes a TreeNode with fields like the above

const ast = await Java9FileParser.toAst(p.findFileSync(path));
console.log(stringifyTree<TreeNode>(ast, treeNodeName, treeNodeChildren));
```

```

```