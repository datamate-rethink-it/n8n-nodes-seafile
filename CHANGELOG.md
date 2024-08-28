# Changelog

## v2.0.0 (2024-08-28)

Complete rewrite of the Seafile node for n8n with now 33 actions:

- File Actions (10)
- Folder Actions (3)
- Info Actions (3)
- Library Actions (4)
- Search Actions (2)
- Share Actions (7)
- Tag Actions (4)

This new version introduces breaking changes, including modifications to the authentication process, which prevent the creation of a compatible update for n8n. As a result, existing workflows will need to be rebuilt. The change in authentication was made because the node now exclusively supports the Account-Token, no longer accommodating the Repo-Token.

## v1.1.0 (2024-01-01)

Initial version developed by https://www.npmjs.com/~vquie supporting these operations:

- Upload File
- Get Download Link
- List Directory
- Delete File
