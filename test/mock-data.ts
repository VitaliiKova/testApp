
export = {
    validUserName: 'octocat',
    invalidUserName: 'octocatTestData12345',
    emptyUserName: undefined,
    validOrgName: 'octo-org',
    invalidOrgName: 'octo-org12131qwer',
    emptyOrgName: undefined,
    validRepoName: 'git-consortium',
    invalidRepoName: 'TestData12345',
    validRepoNameOrg: 'wikimania',
    invalidRepoNameOrg: 'TestData12345',
    accountTypeUser: 'users',
    accountTypeOrgs: 'orgs',
    headers: {
        acceptValid: '*/*',
        acceptInvalid: 'application/xml',
        authorizationTokenValid: '',
        authorizationTokenInvalid: 'qwertyuiop'
    },
    repos: [
        {
            "id": 132935648,
            "name": "boysenberry-repo-1",
            "full_name": "octocat/boysenberry-repo-1",
            "private": false,
            "owner": {
                "login": "octocat",
                "id": 583231,
                "node_id": "MDQ6VXNlcjU4MzIzMQ==",
                "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=4",
                "url": "https://api.github.com/users/octocat",
                "type": "User",
                "site_admin": false
            },
            "description": "Testing",
            "fork": true,
            "branches_url": "https://api.github.com/repos/octocat/boysenberry-repo-1/branches{/branch}",
            "created_at": "2018-05-10T17:51:29Z",
            "updated_at": "2021-05-15T21:50:42Z",
            "pushed_at": "2018-05-10T17:52:17Z",
        },
        {
            "id": 18221276,
            "node_id": "MDEwOlJlcG9zaXRvcnkxODIyMTI3Ng==",
            "name": "git-consortium",
            "full_name": "octocat/git-consortium",
            "private": false,
            "owner": {
                "login": "octocat",
                "id": 583231,
                "node_id": "MDQ6VXNlcjU4MzIzMQ==",
                "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=4",
                "type": "User",
                "site_admin": false
            },
            "description": "This repo is for demonstration purposes only.",
            "fork": false,
            "branches_url": "https://api.github.com/repos/octocat/git-consortium/branches{/branch}",
            "created_at": "2014-03-28T17:55:38Z",
            "updated_at": "2021-07-19T02:25:01Z",
            "pushed_at": "2020-03-21T19:44:24Z"
        }
    ]
}