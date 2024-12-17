# Development guide

Once ACCESS is cloned down, it is quite conventional to get started, for ACCESS API:

```
yarn install && yarn dev
```

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

## Environment Variables

ACCESS can be configured using the below environment variables

| Env var                           | type    | description                                                                                                 | default               |
| --------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------- | --------------------- |
| SCIM_ENABLED                      | boolean | Enable the SCIM management pattern                                                                          | false                 |
| DEBUG                             | boolean | Enable debug logging                                                                                        | false                 |
| PORT                              | int     | Which port should the ACCESS API be served on                                                               | 8091                  |
| OPENID_PROVIDER_URL               | url     | URL of OpenID Provider, for development, this can be set to development, see the development sections below | undefined             |
| JWT_HEADER                        | string  | Header name which the token will be passed in                                                               | authorization         |
| GROUPS_KEY                        | string  | Property in the token which contains the user role groups                                                   | groups                |
| DEPLOYED_DOMAIN                   | url     | Domain ACCESS being served within - required if SCIM enabled                                                | http://localhost:8091 |
| MONGO_PROTOCOL                    | protocol| The protocol ('mongodb' | 'mongodb+srv')                                                                    | 'mongodb'             |
| MONGO_URL                         | url     | Mongo database URL                                                                                          | 127.0.0.1:27017       |
| MONGO_COLLECTION                  | string  | Mongo collection where ACCESS data will be stored                                                           | access                |
| MONGO_USER                        | string  | Mongo user for connecting to MongoDB                                                                        | telicent-access       |
| MONGO_PWD                         | string  | Mongo user password for connecting to MongoDB                                                               | password              |
| MONGO_CONNECTION_STRING_OPTIONS   | string  | Connection string options e.g. authMechanism <sup>1</sup>                                                   |                       |

<sup>1</sup> — For more on authMechanism (and other connection string options), see [docs](https://www.mongodb.com/docs/drivers/node/v6.10/fundamentals/authentication/mechanisms/)

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
