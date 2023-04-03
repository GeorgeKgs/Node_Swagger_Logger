const m2s = require('mongoose-to-swagger')
const User = require('./models/user.model')
const Product = require('./models/product.model')

exports.options = {
    "definitions": {
        User: m2s(User),
        Product: m2s(Product)
    },
    "swagger": "2.0",
    "info": {
        "version": "1.0.0",
        "description": "Products project app API",
        "title": "CRUD API"
    },
    "host": "localhost:3000",
    "basePath": "/",
    "tags": [
        {
            "name": "Users",
            "description": "API for users"
        },
        {
            "name": "Users and products",
            "description": "Api for users and their products"
        }
    ],
    "schemes": ["http"],
    "consumes": ["application/json"],
    "produses": ["application/json"],
    "paths": {
        "/api/user/findall": {
            "get": {
                "tags": [
                    "Users"
                ],
                "summary": "Gets all users",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/User"
                        }
                    }
                }
            }
        },
        "/api/user/findone/{username}":{
            "get":{
              "tags": [
                "Users"
              ],
              "parameters":[
                {
                  "name":"username",
                  "in":"path",
                  "required":true,
                  "description": "Username of user",
                  "type":"string"
                }
              ],
              "summary": "Gets a users from system",
              "responses":{
                "200":{
                  "description": "User find",
                  "schema": {
                    "$ref": "#/definitions/User"
                  }
                }
              }
            }
         },
         "/api/user/create": {
            "post": {
              "tags": [
                "Users"
              ],
              "description": "Create new user",
              "parameters":[{
                "name": "Create user parameters",
                "in": "body",
                "description": "Users parameters that we will create",
                "schema":{
                    // "$ref": "#/definitions/User"
                    "type":"object",
                    "properties":{
                        "name":{"type":"string"},
                        "surname":{"type":"string"},
                        "username":{"type":"string"},
                        "password":{"type":"string"},
                        "email":{"type":"string"},
                        "address": {
                            "type":"object",
                            "properties":{
                                "area":{"type":"string"},
                                "road":{"type":"string"}
                            },
                        },
                        "phone":{
                            "type":"array",
                            "items":{
                                "type":"object",
                                "properties":{
                                    "type":{"type":"string"},
                                    "number":{"type":"string"}
                                },
                            },
                        },
                    },
                    "required": ["username", "email"]
                }
            }],
              "produses": ["application/json"],
              "responses":{
                "200":{
                  "description": "New user created",
                  // "schema": {
                  //   "$ref": "#/definitions/User"
                  // }
                }
              }
            }
         },
         "/api/user/delete/{username}":{
          "delete":{
              "tags":[
                  "Users"
              ],
              "description": "Deletes a user from the system",
              "parameters":[{
                  "name": "username",
                  "in": "path",
                  "description": "Username that will be deleted"
              }],
              "responses":{
                  "200":{
                      "description":"Deleted user"
                  }
              }
          }
      },
      '/api/user/update':{
        "patch":{
            "tags":[
                "Users"
            ],
            "description":"Update user in system",
            "parameters":[{
                "name": "update user in system",
                "in": "body",
                "description": "User that we will update",
                "schema":{
                    "type":"object",
                    "properties":{
                        "username": {"type":"string"},
                        "name": {"type":"string"},
                        "surname": {"type":"string"},
                        "email": {"type":"string"},
                        "address": {
                            "type": "object",
                            "properties": {
                                "area": {"type":"string"},
                                "road": {"type":"string"},
                            },
                        },
                        "phone":{
                            "type":"array",
                            "items":{
                                "type":"object",
                                "properties":{
                                    "type":{"type":"string"},
                                    "number":{"type":"string"}
                                },
                            },
                        }, 
                    },
                    "required": ["email"]
                }
            }],
            "produces": ["application/json"],
            "responses": {
                "200": {
                    "description": "Updated user"
                }
            }
        }
    },
    '/api/userproduct/findone/{username}':{
      "get": {
          "tags":[
              "Users and Products"
          ],
          "parameters":[{
              "name": "username",
              "in": "path",
              "description": "Find user's products",
              "type": "string"
          }],
          "responses":{
              "200":{
                  "description": "User and Products"
              }
          }
      }
  }
  }
}