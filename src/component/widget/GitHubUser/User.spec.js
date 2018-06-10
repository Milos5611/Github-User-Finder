import React from "react";
import User from "./User";
import renderer from "react-test-renderer";
import {mount} from "enzyme";
import { goToPage } from "../../../services/users";

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Test User Component", () => {
    it("User should see div with avatar / username and id", () => {
        const component = renderer.create(
            <User
                avatar="https://github.com/images/error/octocat_happy.gif"
                className="card"
                login="Milos5611"
                userId={5}
                changePage={() => goToPage("details", "Milos5611")}
            />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should be able to click the button", () => {
        const mockFunction = jest.fn();
        const element = mount(<User changePage={mockFunction("details", "Milos5611")} />);
        element.find("button").simulate("click");
        expect(mockFunction).toHaveBeenCalled();
    });
});
