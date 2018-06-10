import reducer from "./users";
import * as actions from "./users";
import expect from "expect";

const users_mock = [{
    avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
    events_url: "https://api.github.com/users/mojombo/events{/privacy}",
    followers_url: "https://api.github.com/users/mojombo/followers",
    following_url: "https://api.github.com/users/mojombo/following{/other_user}",
    gists_url: "https://api.github.com/users/mojombo/gists{/gist_id}",
    gravatar_id: "",
    html_url: "https://github.com/mojombo",
    id: 1,
    login: "mojombo",
    node_id: "MDQ6VXNlcjE=",
    organizations_url: "https://api.github.com/users/mojombo/orgs",
    received_events_url: "https://api.github.com/users/mojombo/received_events",
    repos_url: "https://api.github.com/users/mojombo/repos",
    site_admin: false,
    starred_url: "https://api.github.com/users/mojombo/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/mojombo/subscriptions",
    type: "User",
    url: "https://api.github.com/users/mojombo",
}];

describe("post reducer", () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual({"next_link": {},"userDetail": null,"users": null});
    });

    it("should handle GET_SUCCESS", () => {
        const fetchAllUsers = {
            type: actions.DATA_LOADED,
            users: users_mock,
        };
        expect(reducer({}, fetchAllUsers)).toEqual(users_mock);
    });
});
