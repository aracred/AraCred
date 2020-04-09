"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var __1 = require("..");
describe("stringify", function () {
    it("prints one tree", function () {
        var tree = {
            name: "hi", children: [],
        };
        var result = __1.stringifyTree(tree, function (t) { return t.name; }, function (t) { return t.children; });
        console.log("tree:\n" + result);
        assert_1.default.deepEqual(result, "─ hi");
    });
    it("treats undefined as empty children", function () {
        var tree = {
            name: "hi", children: undefined,
        };
        var result = __1.stringifyTree(tree, function (t) { return t.name; }, function (t) { return t.children; });
        console.log("tree:\n" + result);
        assert_1.default.deepEqual(result, "─ hi");
    });
    it("prints a tree with a child", function () {
        var tree = {
            name: "hi", children: [
                { name: "child1", children: [] },
            ],
        };
        var result = __1.stringifyTree(tree, function (t) { return t.name; }, function (t) { return t.children; });
        console.log("tree:\n" + result);
        assert_1.default.deepEqual(result, "\u252C hi\n\u2514\u2500\u2500 child1");
    });
    it("prints a tree with two children", function () {
        var tree = {
            name: "hi", children: [
                { name: "child1", children: [] },
                { name: "child2", children: [] },
            ],
        };
        var result = __1.stringifyTree(tree, function (t) { return t.name; }, function (t) { return t.children; });
        console.log("tree:\n" + result);
        assert_1.default.deepEqual(result, "\u252C hi\n\u251C\u2500\u2500 child1\n\u2514\u2500\u2500 child2");
    });
    it("prints a tree with great-grandchildren", function () {
        var tree = {
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
        var result = __1.stringifyTree(tree, function (t) { return t.name; }, function (t) { return t.children; });
        console.log("tree:\n" + result);
        assert_1.default.deepEqual(result, "\u252C Grandmarti\n\u251C\u2500\u252C Cyndi\n\u2502 \u2514\u2500\u252C Jess\n\u2502   \u251C\u2500\u2500 Evelyn\n\u2502   \u2514\u2500\u2500 Linda\n\u2514\u2500\u2500 Celia");
    });
    it("prints a tree with two grandchildren", function () {
        var tree = {
            name: "Grandmarti", children: [
                {
                    name: "Cyndi", children: [
                        { name: "Jess", children: [] },
                        { name: "Josh", children: [] },
                    ],
                },
                { name: "Celia", children: [] },
            ],
        };
        var result = __1.stringifyTree(tree, function (t) { return t.name; }, function (t) { return t.children; });
        console.log("tree:\n" + result);
        assert_1.default.deepEqual(result, "\u252C Grandmarti\n\u251C\u2500\u252C Cyndi\n\u2502 \u251C\u2500\u2500 Jess\n\u2502 \u2514\u2500\u2500 Josh\n\u2514\u2500\u2500 Celia");
    });
    it("prints the whole family", function () {
        var tree = {
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
        var result = __1.stringifyTree(tree, function (t) { return t.name; }, function (t) { return t.children; });
        console.log("tree:\n" + result);
        assert_1.default.deepEqual(result, "\u252C Grandmarti\n\u251C\u2500\u252C Cyndi\n\u2502 \u251C\u2500\u252C Jess\n\u2502 \u2502 \u251C\u2500\u2500 Evelyn\n\u2502 \u2502 \u2514\u2500\u2500 Linda\n\u2502 \u251C\u2500\u2500 Josh\n\u2502 \u2514\u2500\u2500 Rachel\n\u251C\u2500\u252C Celia\n\u2502 \u251C\u2500\u2500 Faith\n\u2502 \u2514\u2500\u2500 Ellie\n\u2514\u2500\u252C Cheri\n  \u251C\u2500\u2500 Liz\n  \u2514\u2500\u2500 Nick");
    });
});
//# sourceMappingURL=stringifyTree.test.js.map