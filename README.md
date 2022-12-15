# node-auth-api

# Introduction

Simple nodejs backend API to signup the user with email and password defined. After successfully signing up, it will send email to the user.


## Calling API

To signup the new user, you can call url below with http POST method
```
https://node-auth-api-1.herokuapp.com/api/v1/auth/signup
```

## Request Body

Example value of request body to signup the user

```javascript
{
    "email": string,
    "password": string,
    "confirm_password": string
}
```

The `email` field contains a valid email address and required.

The `password` field should contain at least 8 characters with at least 1 lower character, 1 upper character, 1 digit character, and 1 special character.

The `confirm_password` field should be equal to password field.

## Response Body

Example of response body after user successfully signing up

```javascript
{
    "message": "OK",
    "user": {
        "email": "user_email@gmail.com"
    }
}
```

Example of response body if user fail to sign up

```javascript
{
    "errors": {
        "email": "Email cannot be empty",
        "password": "Password cannot be empty"
    }
}
```


## Status Codes

Currently, the list of statuc code from the API returns the following status codes:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 400 | `BAD REQUEST` |
| 500 | `INTERNAL SERVER ERROR` |

## Usage to run locally

You need to rename file .env.example to .env and change the environment inside the file with yours. Afer that you can run command below to install dependencies and run the API 

```
yarn
yarn dev
```

The API now should be running on localhost at port 3000

# Sending Email

Depending on your personal email configuration, the email sent after successfully signing up sometime received at promotions or spam inbox as the app currently used third party email service.
