# telicent-access API

The ACCESS API is formally defined using the OpenAPI Specification in
[`swagger.json`](./src/router/swagger.json) locally or
[`swagger.json`](http://localhost:8091/api-docs/swagger.json) on the server. It
primarily allows the ACCESS front end or other applications to send queries
relating to user and group information and their relevant permissions. API calls
can be tested using the [`Swagger documentation`](http://localhost:8091/api-docs/)
where more detail of the data structures can also be found.

## Running the API Server

For instructions on running the ACCESS API server, please see
[_Build / Install_ in README.MD](./README.md#build--install) in the
telicent-access root directory.

## Error Reporting

The API returns JSON which communicates when an error is encountered servicing
an API request. This should provide sufficient information for API callers to
meaningfully address the error in many cases. A simple JSON structure is
returned, including an error code and message as below:

```json
{
  "code": ###,
  "message": "Error message"
}
```

Some example error responses are shown below:

### Invalid Request

_Invalid request_ error can occur when incomplete query data is sent:

```json
{
  "code": 400,
  "message": "Invalid request / Fields missing"
}
```

### Not Found

_Not found_ errors for the various data types:

```json
{
  "code": 404,
  "message": "Group(s) not found"
}
```

### SCIM Not Enabled

Shown when the System for Cross-domain Identity Management (SCIM) is required to
perform an operation:

```json
{
  "code": 405,
  "message": "SCIM is not enabled on this server"
}
```

### Already Exists

_Already exists_ errors for user and group creation:

```json
{
  "code": 409,
  "message": "Group already exists"
}
```

### Operation Failed

_Operation failed_ errors can occur due to invalid sent objects or operators:

```json
{
  "code": 422,
  "message": "Operation failed / User object invalid / Operator not supported"
}
```

### Server Error

A general server error, when no more specific detail can be given:

```json
{
  "code": 500,
  "message": "Server error"
}
```

### Server Error

A SCIM-related error when attempting user update:

```json
{
  "code": 501,
  "message": "Operation in patch not supported, only user deactivation is supported from the SCIM Service provider"
}
```

## API Endpoints

All endpoints return data or error responses as JSON.

### Categories

- Attributes: `/attributes` - Attribute data which can be associated with users
  and groups.
- Countries: `/countries` - List of all available countries.
- Groups: `/groups` - Data on groups containing users.
- Hierarchies: `/hierarchies` - Hierarchy data for clearance levels.
- SCIM: `/scim` - SCIM-related queries.
- Users: `/users` - User data.
- UserInfo: `/user-info` - Current user details.

### Attributes

#### `GET /attributes`

Retrieves an array of all available attributes.

Accepts no parameters.

Returns the following responses:
- _200_ - All attributes retrieved successfully.
- _404_ - Attributes not found.

#### `GET /attributes/{uuid}`

Retrieves a specific attribute matching the provided UUID.

Accepts the following parameter:
- `uuid` _required_ - Unique identifier for the attribute.

Returns the following responses:
- _200_ - Attribute retrieved successfully.
- _404_ - Attribute not found.

### Countries

#### `GET /countries`

Retrieves an array of all available countries.

Accepts no parameters.

Returns the following response:
- _200_ - Country list retrieved successfully.

### Groups

#### `GET /groups`

Retrieves an array of all groups.

Accepts no parameters.

Returns the following responses:
- _200_ - All groups retrieved successfully.
- _404_ - Groups not found.
- _500_ - Server error.

#### `GET /groups/{groupId}`

Retrieves a specific group matching the provided group ID.

Accepts the following parameter:
- `groupId` _required_ - Unique identifier for the group.

Returns the following responses:
- _200_ - Group retrieved successfully.
- _404_ - Group not found.
- _500_ - Server error.

#### `POST /groups`

Creates a new group.

Accepts no parameters.

Returns the following responses:
- _201_ - Groups created successfully (new ID returned).
- _400_ - Invalid request / fields missing.
- _409_ - Group already exists.
- _500_ - Server error.

#### `DELETE /groups/{groupId}`

Deletes a specific group matching the provided group ID.

Accepts the following parameter:
- `groupId` _required_ - Unique identifier for the group.

Returns the following responses:
- _200_ - Group soft-deleted successfully.
- _404_ - Group not found.

### Hierarchies

#### `GET /hierarchies`

Retrieves an array of all hierarchies.

Accepts no parameters.

Returns the following responses:
- _200_ - All hierarchies retrieved successfully.
- _404_ - Hierarchies not found.

#### `GET /hierarchies/{hierarchyId}`

Retrieves a specific hierarchy matching the provided hierarchy ID.

Accepts the following parameter:
- `hierarchyId` _required_ - Unique identifier for the hierarchy.

Returns the following responses:
- _200_ - Hierarchy retrieved successfully.
- _404_ - Hierarchy not found.

#### `GET /hierarchies/lookup/{name}`

Retrieves a specific hierarchy by name, using the `dataAttributeName` or
`userAttributeName` property of the hierarchy attribute.

Accepts the following parameters:
- `name` _required_ - Hierarchy name.
- `isUserAttribute` _default_: `false` - _Boolean_ specifying to search in
  `userAttributeName` if `true`, otherwise `dataAttributeName`.

Returns the following responses:
- _200_ - Hierarchy looked up successfully.
- _404_ - Hierarchy not found.

### SCIM

#### `GET /scim/v2/IsEnabled`

Get whether SCIM is configured for the back end - i.e. an external IdP is being
used to manage users.

Accepts no parameters.

Returns the following response:
- _200_ - SCIM enabled status returned.

#### `GET /scim/v2/Users`

Retrieves an array of all SCIM users.

Accepts no parameters.

Returns the following responses:
- _200_ - SCIM users retrieved successfully.
- _405_ - SCIM is not enabled, method not allowed.
- _422_ - Operation failed, possibly due to an invalid SCIM user object or
  operator.

#### `GET /scim/v2/Users/{userId}`

Retrieves a specific SCIM user matching the provided ID.

Accepts the following parameter:
- `userId` _required_ - Unique identifier for the user.

Returns the following responses:
- _200_ - SCIM user retrieved successfully.
- _404_ - SCIM user not found.
- _405_ - SCIM is not enabled, method not allowed.
- _422_ - Operation failed, possibly due to an invalid SCIM user object or
  operator.

#### `POST /scim/v2/Users`

Creates a new SCIM user.

Accepts no parameters.

Returns the following responses:
- _201_ - SCIM user created successfully (new IDs returned).
- _405_ - SCIM is not enabled, method not allowed.
- _409_ - User already exists.
- _422_ - User object invalid.

#### `PATCH /scim/v2/Users/{userId}`

Patches an existing SCIM user.

Accepts the following parameter:
- `userId` _required_ - Unique identifier for the user.

Returns the following response:
- _501_ - Operation in patch not supported, only user deactivation is supported
  from the SCIM Service provider.

#### `PUT /scim/v2/Users/{userId}`

Updates an existing SCIM user.

Accepts the following parameter:
- `userId` _required_ - Unique identifier for the user.

Returns the following response:
- _501_ - Operation in patch not supported, only user deactivation is supported
  from the SCIM Service provider.

#### `DELETE /scim/v2/Users/{userId}`

Deletes a specific SCIM user matching the provided ID.

Accepts the following parameter:
- `userId` _required_ - Unique identifier for the user.

Returns the following responses:
- _200_ - SCIM user deleted successfully.
- _405_ - SCIM is not enabled, method not allowed.
- _422_ - User deactivation failed.

#### `GET /scim/v2/ServiceProviderConfig`

Returns the service provider configuration.

Accepts no parameters.

Returns the following response:
- _200_ - Returned service provider configuration.

#### `GET /scim/v2/ResourceTypes`

Returns resource types.

Accepts no parameters.

Returns the following response:
- _200_ - Returned resource types.

#### `GET /scim/v2/ResourceTypes/{name}`

Returns resource type by specified name.

Accepts the following parameter:
- `name` _required_ - Name of the resource type to be looked up.

Returns the following response:
- _200_ - Returned resource type.

#### `GET /scim/v2/Schemas`

Returns all schemas.

Accepts no parameters.

Returns the following response:
- _200_ - Returned all schemas.

#### `GET /scim/v2/Schemas/{id}`

Returns a schema matching the specified ID.

Accepts the following parameter:
- `id` _required_ - ID of the schema to be looked up.

Returns the following response:
- _200_ - Returned schema by ID.

### Users

#### `GET /users`

Retrieves an array of all users.

Accepts no parameters.

Returns the following responses:
- _200_ - Users retrieved successfully.
- _422_ - Operation failed, possibly due to an invalid SCIM user object or
  operator.
- _500_ - Server error.

#### `GET /users/{id}`

Retrieves a specific user matching the provided ID.

Accepts the following parameter:
- `id` _required_ - Unique identifier for the user.

Returns the following responses:
- _200_ - User retrieved successfully.
- _404_ - User not found.
- _422_ - Operation failed, possibly due to an invalid user object or operator.
- _500_ - Server error.

#### `GET /users/lookup/{email}`

Retrieves a specific user by the provided email address.

Accepts the following parameter:
- `email` _required_ - User's email address.

Returns the following responses:
- _200_ - User retrieved successfully.
- _404_ - User not found.
- _422_ - Operation failed, possibly due to an invalid user object or operator.
- _500_ - Server error.

#### `POST /users`

Creates a new user.

Accepts no parameters.

Returns the following responses:
- _201_ - User created successfully (new ID returned).
- _405_ - When SCIM is enabled, users cannot be created through ACCESS.
- _409_ - User already exists in IdP.
- _422_ - Operation failed, possibly due to an invalid user object or operator.
- _500_ - Server error.

#### `PATCH /users/{id}`

Updates an existing user.

Accepts the following parameter:
- `id` _required_ - Unique identifier for the user.

Returns the following responses:
- _200_ - User updated successfully.
- _400_ - Failed to update user - invalid request.
- _404_ - User not found.
- _422_ - Operation failed, possibly due to an invalid user object or operator.

#### `DELETE /users/{id}`

Deletes a specific user matching the provided ID.

Accepts the following parameter:
- `id` _required_ - Unique identifier for the user.

Returns the following responses:
- _200_ - User deleted successfully.
- _404_ - User not found.
- _422_ - User delete failed.

### User Info

#### `GET /user-info/self`

Returns details about the user sending the query.

Accepts no parameters.

Returns the following response:
- _200_ - Successfully returned full user details.
