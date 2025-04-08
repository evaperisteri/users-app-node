const m2s = require('mongoose-to-swagger');
const User = require('./models/user.model');
const { application } = require('express');
exports.options = {
  "components":{
    "schemas": {
      User: m2s(User)
    },
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  },
  "security":[
    {
      "beareAuth":[]
    }
  ],
  "openapi": "3.1.0",
  "info": {
    "version": "1.0.0",
    "title": "Users and products CRUD API",
    "description": "An applivation for creating users and choosing products",
    "contact": {
      "name": "API support",
      "url": "https://aueb.gr",
      "email": "support@exampl.com"
    }
  },
  "servers": [
    {
      url:"http://localhost:3000",
      description:"Local Server"
    },
    {
      url:"http://www.backend.aueb.gr",
      description:"Testing Server"
    }
  ],
  "tags":[
    {
      "name": "Users",
      "description": "Endpoints for User"
    },
    {
      "name": "Users and Products",
      "description": "Endpoints for Users and their products"
    },
    {
      "name": "Auth",
      "description": "Endpoints for authentication"
    }
  ],
  "paths":{
    "/api/users": {
      "get": {
        "tags":["Users"],
        "description":"Returns a list of all users",
        "responses":{
          "200":{
            "description": "List of all users",
            "content": {
              "application/json": {
                "schema": {
                  "type":"array",
                  "items": {
                    "$ref":"#/components/schemas/User"
                  }
                }
              }
            }
          }
        }
      },
      "post":{
        "tags":["Users"],
        "description": "Data of users that we want to create",
        "requestBody": {
          "description": "Json with user data",
          "content": {
            "application/json": {
              "schema": {
                "type":"object",
                "properties": {
                  "username": {"type":"string"},
                  "password": {"type":"string"},
                  "name": {"type":"string"},
                  "surname": {"type":"string"},
                  "email": {"type":"string"},
                  "address": {
                    "type":"object",
                    "properties": {
                      "area":{"type":"string"},
                      "road":{"type":"string"}
                    }
                  },
                  "phone": {
                    "type":"array",
                    "items": {
                      "type": "object",
                      "properties":{
                        "type": {"type": "string"},
                        "number": {"type": "number"}
                      }
                    }
                  }
                },
                "required":["username", "password", "name", "surname", "email"]
              }
            }
          }
        },
        "responses":{
          "200":{
            "description":"JSON of new user"
          }
        }
      }   
    },
    "/api/users/{username}":{
      "get": {
        "tags": ["Users"],
        "parameters": [
          {
            "name": "username",
            "in": "path",
            "required": true,
            "description": "Username of the user we want to find",
            "type": "string"
          }
        ],
        "description": "returns user details for specific username",
        "responses":{
          "200": {
            "description": "user details",
            "content":{
              "application/json": {
                "schema": {
                "$ref": "#/components/schemas/User"
                }
              }
            }
          }
        }
      },
      "patch":{
        "tags": ["Users"],
        "description": "Update user",
        "parameters":[
          {
            "name": "username",
            "in": "path",
            "required": true,
            "descripton": "username of user that can be updated",
            "type":"string"
          }
        ],
        "requestBody": {
          "description": "Data of user to be updated",
          "content":{
            "application/json":{
              "schema":{
                "type": "object",
                "properties":{
                  "username": {"type":"string"},
                  "name": {"type":"string"},
                  "surname": {"type":"string"},
                  "email": {"type":"string"},
                  "address":{
                    "type":"object",
                    "properties":{
                      "area":{"type":"string"},
                      "road":{"type":"string"}
                    }
                  }
                },
                "required":["email"]
              }
            }
          }
        },
        "responses":{
          "200":{
            "description": "Update user"
          }
        }
      },
      "delete": {
        "tags":["Users"],
        "description": "Delete user from DB",
        "parameters":[
          {
            "name":"username",
            "in": "path",
            "description": "user to be deleted",
            "type": "string",
            "required":true
          }
        ],
        "responses": {
          "200":{
            "descripton":"Delete user"
          }
        }
      }
    },
    "/api/auth/login":{
      "post":{
        "tags": ["Auth"],
        "description": "Login user",
        "requestBody": {
          "description": "User sent username and password and the response is a jwt token",
          "content": {
            "application/json":{
              "schema": {
                "type": "object",
                "properties" :{
                  "username": {"type":"string"},
                  "password": {"type":"string"}
                },
                "required": ["username", "password"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description":"Token returned"
          }
        }
      }
    },
    "/api/user-product/{username}":{
      "get":{
        "tags":["Users and Products"],
        "parameters":[
          {
            "name":"username",
            "in": "path",
            "required": true,
            "description": "find user and products",
            "type":"string"
          }
        ],
        "responses":{
          "200": {
            "description": "User and Products",
            "schema": {
              "$ref": "#/components/schemas/User"
            }
          }
        }
      }
    }
  }
}