# ⚠️ Deprecated for [open source version of telicent-access](https://github.com/telicent-oss/telicent-access)

The shared "root", i.e the commit they share can be found here:

- https://github.com/telicent-oss/telicent-access/releases/tag/v0.11.3-telicent-oss-root

If useful, the open-source branch is here:

- https://github.com/telicent-oss/telicent-access/tree/telicent-oss-root

The PR to prep of open source has **not** been merged back into main.

**Rationale**: It might be useful to keep the internal-infra workflows on `main`

- https://github.com/telicent-oss/telicent-access/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-desc

<details>
  <summary>See old readme</summary>

# telicent-access

❗️ **The purpose of the ACCESS application is to allow testing and demonstration of
attribute-based access control (ABAC) capability within Telicent CORE&copy;. It
should not be used in a production environment**.

[![Build and push telicent-access](https://github.com/telicent-oss/telicent-access/actions/workflows/publish.yml/badge.svg)](https://github.com/telicent-oss/telicent-access/actions/workflows/publish.yml)

ACCESS enables the management of user permissions, restricting
_access_ to data to only those who should have it.

## Background

ACCESS is used to manage users' attributes. These attributes grant or deny
access to data within Telicent CORE&copy;. This is possible because access
control is enforced in the _Smart Caches_ (database and API) using ABAC.
Security labels are applied to data at a granular level. For a user to be able
to access information, their attributes must fulfil the security label on the
data.

ACCESS provides admins the ability to configure users' attributes in line with a 
handling model. It also allows admins to specify local groups which permit 
extensions to attributes and access. Furthermore, attributes and groups are 
retrievable across the platform. The attributes have been created with 
reference to both the naming conventions of the data and the user. When using
the ACCESS application, the user attribute name is shown; upon the platform 
looking up details about a user, or as part of the authorisation process, the 
API will return the data attribute label.

When deployed with its basic functionality (SCIM_ENABLED = false), ACCESS is simply
a user entitlements service. User management is done external to CORE by the 
enterprise and consequently we need a way to bring the user through from the IdP
to ACCESS to register them within the system. When a user interacts with a "data 
focussed" application, such as Telicent GRAPH or Telicent SEARCH, the application 
will call an ACCESS endpoint. This endpoint (/whoami) return the user's details. 
Under the hood it does a little bit more, if the user doesn't exist, it creates
a skeleton user with no attributes assigned. An administrator is then required 
to go in and activate the user, applying the attributes at this point. 

ACCESS can be configured to utilise the System for Cross-domain Identity
Management (SCIM) standard for managing user identity information. The goal of
SCIM is to securely automate the exchange of user identities between
applications or systems. In this implementation, an existing or external
identity provider (IdP) is responsible for user management (authentication) and
ACCESS is responsible for user attributes (authorisation).

SCIM helps to manage this relationship and when enabled in ACCESS, functions in
the following way:

- Users are created in an external user management system, which ACCESS
  communicates with via SCIM to obtain a mapped representation of the SCIM users.
- Authentication is handled by the external system.
- User attributes used for authorisation are added and managed by ACCESS.
- Soft delete support - if SCIM tries to delete a user via ACCESS, they are
  instead deactivated and an admin can then fully delete the user in the
  external IdP if required.
- SCIM IdPs can create users, but currently have no oversight or power to
  manage attributes or access. SCIM allows for group configuration, but these
  are not taken into account when it comes to authorisation decisions. Groups
  are instead handled by ACCESS alone.

## Environment Variables

ACCESS can be configured using the below environment variables

| Env var             | type    | description                                                                                                 | default               |
| ------------------- | ------- | ----------------------------------------------------------------------------------------------------------- | --------------------- |
| SCIM_ENABLED        | boolean | Enable the SCIM management pattern                                                                         | false                 |
| DEBUG               | boolean | Enable debug logging                                                                                        | false                 |
| PORT                | int     | Which port should the ACCESS API be served on                                                               | 8091                  |
| OPENID_PROVIDER_URL | url     | URL of OpenID Provider, for development, this can be set to development, see the development sections below | undefined             |
| JWT_HEADER          | string  | Header name which the token will be passed in                                                               | authorization         |
| GROUPS_KEY          | string  | Property in the token which contains the user role groups                                                   | groups                |
| DEPLOYED_DOMAIN     | url     | Domain ACCESS being served within - required if SCIM enabled                                                | http://localhost:8091 |
| MONGO_URL           | url     | Mongo database URL                                                                                          | 127.0.0.1:27017       |
| MONGO_COLLECTION    | string  | Mongo collection where ACCESS data will be stored                                                           | access                |
| MONGO_USER          | string  | Mongo user for connecting to MongoDB                                                                        | telicent-access       |
| MONGO_PWD           | string  | Mongo user password for connecting to MongoDB                                                               | password              |

## Build / Install

Once ACCESS is cloned down, it is quite conventional to get started, for ACCESS API:

```
yarn install
yarn dev
```

To install dependencies and to run locally.

To build, locally you can use

```
yarn build
```

Or make use of the Dockerfile and build a docker image.

### Development

#### Prerequisite

- MongoDB

There are two ways to develop within the Telicent ACCESS project, depending on your use case - with token validation and without. The only prerequisite is a MongoDB instance running (if you don't have one, you can use the docker-compose in the root of the project).

#### Without Token Validation - Full development mode

This is the mode for most developers. In basic development mode, making use of the dev_env.sh script:

```
source dev_env.sh
```

This sets the OPENID_PROVIDER_URL to "development". This setup has a user (test+dev@telicent.io) built in who has authorization for all of the API. The request from any UI will be performed in ACCESS by this user - including other Telicent UIs calling the /whoami endpoint.

If you want to pass your own token on API in this mode, you can do. Using the JWT_HEADER, put a token in and the API will accept it and use it without validation. This is useful when looking to test out authorization with the API.

#### With Token Validate

This mode allows a developer to spin up an IdP to validate tokens against. Within cognito-local, there is a readme on how to spin up a setup with 4 users and instructions on how to create tokens for each. These can then be passed using the JWT_HEADER; we have provided a token_env.sh script for convenience of running the API with the correct env variables.

#### Start cognito-local

Instructions for starting cognito-local can be found in the readme within the directory.

#### Start Mongo and the API

[OPTIONAL] - If you have a mongo service running on your box you can also use this

- Navigate to the root of the project.
- `docker compose up`

> Note: if you are developing the API you will not need to start both services
> in the compose file.
> To start just the Mongo service: `docker compose up mongo`

#### Start the API Development Environment

- Navigate to the root of the project.
- `yarn` _(optional)_ Install or update packages if not already done.
- `yarn dev`

#### Start the Frontend Development Environment

- `cd frontend`
- `yarn` _(optional)_ Install or update packages if not already done.
- `yarn start` _or_ `yarn start-win` _(for Windows)_
- `yarn build:tailwind --watch` _(if editing front end)_

> Note: The start script requires a [frontend/.env](./frontend/.env) file; if
> this does not already exist, there is a
> [frontend/.env.default](./frontend/.env.default) file, the contents of which
> can be copied.

## Usage

There are two main sets of information displayed in Telicent ACCESS: a list of
users and a list of groups that users can belong to.

### Users

![Users](./docs/images/users.png)

Upon running ACCESS, the user list is shown; this can also be accessed by
clicking _Users_ in the left sidebar. It displays all users in
ACCESS (either manually or via SCIM), along with their properties:

- _Active_\
  This icon shows whether the user is active:

  - _Green_ = active
  - _Red_ = inactive

- _Name_\
  Username

- _Email_\
  User's email address

- _Nationality_\
  User's nationality

- _Deployed organisation_\
  Organisation to which the user is assigned

- _Personnel type_\
  User's personnel type:

  - _GOV_ = Government
  - _NON-GOV_ = Non-government

- _Classification_\
  Clearance level possessed by the user:

  - _O_ = Official
  - _OS_ = Official Sensitive
  - _S_ = Secret
  - _TS_ = Top Secret

- _Groups_\
  All groups to which the user is assigned (click _more_ if all are not shown);
  groups are described in more detail in the next section

There are also _Delete_ and _Edit_ functions for each user, as well as a search
by username and email address function, and filters for nationality and
classification.

NB: _Delete_ will remove the user from ACCESS, however, if in the IdP, the user still has the correct groups for accessing CORE, the user will be recreated (when they log on). When this occurs, the user will be recreated as _inactive_ and with no other attributes.

### Groups

![Groups](./docs/images/groups.png)

Groups are used to assign access control to multiple users simultaneously.
Clicking _Groups_ in the left sidebar shows a list of groups with the following
properties:

- _Active_\
  This icon shows whether the group is active:

  - _Green_ = active
  - _Red_ = inactive

- _Name_\
  Group name

- _ID_\
  Group ID

- _Description_\
  Further information about the group

- _User count_\
  Number of users assigned to this group; click this to show a list of the
  usernames in the group

There is also a search by group name function.

Clicking _Create_ allows for the creation of a group with the above properties.

## Developer Notes

### Making a commit

Git commit messages should follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

### Mongo Scripts

Running `docker compose up` or `docker compose up mongo` in the root will run
Mongo with the appropriate users pre-configured. However, if you prefer or need
to configure Mongo users manually, the links below will assist you with this:

1. [Create a root user](https://www.mongodb.com/docs/manual/tutorial/configure-scram-client-authentication/#std-label-create-user-admin)
   using the root credentials listed in
   [development-credentials](#development-credentials).
2. [Create a user](https://www.mongodb.com/docs/manual/tutorial/create-users/)
   using the non-root credentials and initialise the database listed in
   [development-credentials](#development-credentials).

## API

More details on the API and its endpoints can be found in [API.md](./docs/API.md).

</details>
