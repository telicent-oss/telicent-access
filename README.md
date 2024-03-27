# telicent-access

❗️ **The purpose of the ACCESS application is to allow testing and demonstration of
attribute-based access control (ABAC) capability within Telicent CORE&copy;. It
should not be used in a production environment**.

[![Build and push telicent-access](https://github.com/Telicent-io/telicent-access/actions/workflows/publish.yml/badge.svg)](https://github.com/Telicent-io/telicent-access/actions/workflows/publish.yml)

ACCESS enables the management of user permissions, restricting
_access_ to data to only those who should have it.

## Background

ACCESS is used to manage users' attributes. These attributes grant or deny
access to data within Telicent CORE&copy;. This is possible because access
control is enforced in the _Smart Caches_ (database and API) using ABAC.
Security labels are applied to data via the Kafka headers. For a user to be able
to access information, their attributes must fulfil the security label on the
data.

The full implementation of the information handling model (IHM) in ACCESS allows
admins to specify local groups which permit extensions to attributes and access.
Furthermore, attributes and groups are retrievable across the platform. The
attributes have been created with reference to both the naming conventions of
the data and the user. When using the ACCESS application, the user attribute
name is shown; upon the platform looking up details about a user, or as part of
the authorisation process, the API will return the data attribute label.

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

If SCIM is disabled, all user management is handled solely by ACCESS, including
creation, editing, full deletion, attributes and groups.

## Build / Install

### Prerequisites

- Authentication provider (AWS Cognito or Keycloak)
- Docker
- Docker Compose

### Running ACCESS as a User

A user must first be created in your chosen authentication provider; this
creates the unique identifier which is stored in Mongo. The ACCESS API works
with either [Cognito](https://aws.amazon.com/cognito/) (or its
[local emulator](#start-cognito-local) in the development environment) or
[Keycloak](https://www.keycloak.org/).

Any configuration changes such as environment variables or port numbers should
be made in [docker-compose.yaml](./docker-compose.yaml) before running Docker
Compose. [Environment variables](#environment-variables) are covered in further
detail below.

- To run ACCESS, navigate to the root of the project in the terminal and enter:
- `docker compose up`

This will run the Docker Compose file comprising containers for Mongo, the API
and the front end, as well as the required environment variables and port
numbers.

The ACCESS front end will now be available at http://localhost:8066/access/.

### Development Environment Setup

_Developers only_: this section describes how to set up the environment to
enable API and frontend development.

#### Environment Variables

The following environment variables are required to run ACCESS. These can be
found in [env.sh](./env.sh) in the root directory. Run `source env.sh` in the
terminal to set them.

`AUTH_TYPE`\
Type: _string_\
Description: _Type of authorisation used when running ACCESS_\
Examples:\
    `aws` _(in development environment)_\
    `keycloak`

`AUTH_URL`\
Type: _string_\
Description: _URL of the specified authentication type_\
Example: `http://localhost:9229` _(in development environment)_

`AUTH_USER_POOL_ID`\
Type: _string_\
Description: _User pool ID for Amazon Cognito_\
Example: `local_<hash>`

`AWS_SECRET_ACCESS_KEY`\
Type: _string_\
Description: _AWS secret access key_\
Example: _(random string)_

`SCIM_ENABLED`\
Type: _boolean_\
Description: _SCIM mode enable/disable_\
Example: `false`

`DEBUG`\
Type: _boolean_\
Description: _Debug mode enable/disable_\
Example: `false`

`JWKS_URL`\
Type: _string_\
Description: _JWKS URL_\
Example: `development`

#### Start cognito-local

For local development deployments, a user must first be created in the
authentication provider Cognito; this creates the unique identifier which is
stored in Mongo.
[cognito-local/docker-compose.yaml](./cognito-local/docker-compose.yaml) will
create a local [Cognito emulator](https://github.com/jagregory/cognito-local):

- `cd cognito-local`
- `docker compose up`

> If cognito-local needs to be configured, see
> [cognito-local/README.md](./cognito-local/README.md). Once these steps are
> completed, ensure a file is generated:
> `cognito-local/cognito/local_<hash>.json`. Use this `local_<hash>` to update
> the `AUTH_USER_POOL_ID` in the root
> [docker-compose.yaml](./docker-compose.yaml) file used in the next section.

#### Start Mongo and the API

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

#### Additional Mongo Information

> Mongo will be exposed on `locahost:27017`.
>
> Default database credentials are listed [here](#development-credentials).

##### Development Credentials

| Field                        | Value           |
| ---------------------------- | --------------- |
| `MONGO_NON_ROOT_USERNAME`    | telicent-access |
| `MONGO_NON_ROOT_PASSWORD`    | password        |
| `MONGO_INITDB_ROOT_USERNAME` | root            |
| `MONGO_INITDB_ROOT_PASSWORD` | password        |
| `MONGO_INITDB_DATABASE`      | access          |

## Usage

There are two main sets of information displayed in Telicent ACCESS: a list of
users and a list of groups that users can belong to.

### Users

![Users](./docs/images/users.png)

Upon running ACCESS, the user list is shown; this can also be accessed by
clicking _Users_ in the left sidebar. It displays all users added to
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

Clicking _Create_ allows for the creation of a user with the above properties.
This only applies when SCIM is disabled, as SCIM will map the users from the
external user management system when enabled.

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
