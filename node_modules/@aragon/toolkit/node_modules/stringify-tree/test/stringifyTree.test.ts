import assert from "assert";
import { stringifyTree } from "..";

describe("stringify", () => {
    it("prints one tree", () => {
        const tree = {
            name: "hi", children: [],
        };
        const result = stringifyTree(tree, t => t.name, t => t.children);
        console.log("tree:\n" + result);
        assert.deepEqual(result, "─ hi");
    });
    it("treats undefined as empty children", () => {
        type TN = { name: string, children: TN[] }
        const tree = {
            name: "hi", children: undefined,
        } as unknown as TN;
        const result = stringifyTree(tree, t => t.name, t => t.children);
        console.log("tree:\n" + result);
        assert.deepEqual(result, "─ hi");
    });
    it("prints a tree with a child", () => {
        const tree = {
            name: "hi", children: [
                { name: "child1", children: [] },
            ],
        };
        const result = stringifyTree(tree, t => t.name, t => t.children);
        console.log("tree:\n" + result);
        assert.deepEqual(result, `┬ hi
└── child1`);
    });
    it("prints a tree with two children", () => {
        const tree = {
            name: "hi", children: [
                { name: "child1", children: [] },
                { name: "child2", children: [] },
            ],
        };
        const result = stringifyTree(tree, t => t.name, t => t.children);
        console.log("tree:\n" + result);
        assert.deepEqual(result, `┬ hi
├── child1
└── child2`);
    });
    it("prints a tree with great-grandchildren", () => {
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
        const result = stringifyTree(tree, t => t.name, t => t.children);
        console.log("tree:\n" + result);
        assert.deepEqual(result, `┬ Grandmarti
├─┬ Cyndi
│ └─┬ Jess
│   ├── Evelyn
│   └── Linda
└── Celia`);
    });

    it("prints a tree with two grandchildren", () => {
        const tree = {
            name: "Grandmarti", children: [
                {
                    name: "Cyndi", children: [
                        { name: "Jess", children: [] }
                        , { name: "Josh", children: [] },
                    ],
                },
                { name: "Celia", children: [] },
            ],
        };
        const result = stringifyTree(tree, t => t.name, t => t.children);
        console.log("tree:\n" + result);
        assert.deepEqual(result, `┬ Grandmarti
├─┬ Cyndi
│ ├── Jess
│ └── Josh
└── Celia`);
    });

    it("prints the whole family", () => {
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
                        { name: "Josh", children: [] },
                        { name: "Rachel", children: [] },
                    ],
                },
                {
                    name: "Celia", children: [
                        { name: "Faith", children: [] },
                        { name: "Ellie", children: [] },
                    ]
                },
                {
                    name: "Cheri", children: [
                        { name: "Liz", children: [] },
                        { name: "Nick", children: [] },
                    ]
                }
            ],
        };
        const result = stringifyTree(tree, t => t.name, t => t.children);
        console.log("tree:\n" + result);
        assert.deepEqual(result, `┬ Grandmarti
├─┬ Cyndi
│ ├─┬ Jess
│ │ ├── Evelyn
│ │ └── Linda
│ ├── Josh
│ └── Rachel
├─┬ Celia
│ ├── Faith
│ └── Ellie
└─┬ Cheri
  ├── Liz
  └── Nick`);
    });
});
