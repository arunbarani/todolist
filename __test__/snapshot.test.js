import React from "react";
import TodoItemTools from "../components/TodoItemTools";
import Header from "../components/Header";
import renderer from "react-test-renderer";

describe("renders TodoItemTools correctly", ()=> {
    it("should compare ToolsItem ", () => {
        const tree = renderer.create(
            <TodoItemTools />
        );


        expect(tree).toMatchSnapshot();
    })
});

describe("renders header correctly", ()=> {
    it("should compare header ", () => {
        const tree = renderer.create(
            <Header />
        );


        expect(tree).toMatchSnapshot();
    })
});