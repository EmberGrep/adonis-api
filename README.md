# AdonisJs JSON API Starter Kit

This is a base project for building JSON APIs with Adonis.js.

The starter kit has a few modifications beyond the normal base project to make API development faster and easier.

* DB Configuration for Heroku Postgres
* Adonis JSON API Installed
* Adonis Generators Installed
* Default to using JWT Auth

This starter kit also comes with a few default routes and controllers to make secure registration and authentication easier.

## `/api/users` - POST

This is a JSON API resource for creating users.
For example the following request body would create a new user:

```json
{
  "data": {
    "attributes": {
      "email": "admin@admin.com",
      "password": "password"
    }
  }
}
```

This endpoint will store the new user and hash the user's password.

## `/api/users` - GET

This JSON API endpoint allows you to see all registered users in the application.
Requests to this endpoint need to be authenticated using an API token from the `/api/token-auth` endpoint.

Here is an example response from this endpoint:

```json
{
  "data": [
    {
      "type": "users",
      "id": "1",
      "attributes": {
        "email": "admin@admin.com",
        "password": "password"
      }
    }
  ]
}
```

## `/api/users/:user_id` - GET

This JSON API endpoint allows you to see details for a registered user based on `user_id`.
Requests to this endpoint need to be authenticated using an API token from the `/api/token-auth` endpoint.

Here is an example response from this endpoint - `/api/users/1`

```json
{
  "data": {
    "type": "users",
    "id": "1",
    "attributes": {
      "email": "admin@admin.com",
      "password": "password"
    }
  }
}
```

## `/api/users/:user_id` - PATCH

This JSON API endpoint allows you to update attributes for a registered user based on `user_id`.
Requests to this endpoint need to be authenticated using an API token from the `/api/token-auth` endpoint.

Here is an example request to this endpoint - `/api/users/1`:

Request:
```json
{
  "data": {
    "type": "users",
    "id": "1",
    "attributes": {
      "email": "general@admin.com"
    }
  }
}
```

Response:
```json
{
  "data": {
    "type": "users",
    "id": "1",
    "attributes": {
      "email": "admin@admin.com",
      "password": "password"
    }
  }
}
```

## `/api/users/:user_id` - PATCH

This JSON API endpoint allows you to remove a registered user based on `user_id`.
Requests to this endpoint need to be authenticated using an API token from the `/api/token-auth` endpoint.

## `/api/token-auth` - POST

This route allows users to authentcate and get back a JWT for the authorized user.

The following is an example request:

Request Body:
```json
{
  "username": "admin@example.com",
  "password": "password"
}
```

Response Body:
```json
{
  "token": "someLongJWTGoesHERE"
}
```
