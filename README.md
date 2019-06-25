# Random Acts Generator - API
All API requests are made to: https://rag-eu.herokuapp.com

## Sanity Check

#### Request
**GET** request to /

#### Response
```
{
    "message": "Alive",
}
```

## Auth
All auth requets are made to /auth

### Register

#### Request
**POST** to /auth/register
```
{
	"firstName": "Vinny",
	"lastName": "Peters",
	"email": "vinnyp@gmail.com",
	"phone": "07748439203",
	"password": "vinnysecretpass"
}
```
Note: All component of the request are strings, passwords must be at least 7 characters

#### Response
The full user object with a jwt token, acts array, and contacts array
```
{
    "user": {
        "_id": "5d11e8340de332001740c4b3",
        "first_name": "Vinny",
        "last_name": "Peters",
        "email": "vinnyp@gmail.com",
        "phone": "07748439203",
        "password": "$2a$10$Q.zWSthVmTf5866fhABh4e5ENEpfz58GU.GmPjh5HP3KSnqWoIvRe",
        "acts": [
            {
                "_id": "5d11e8340de332001740c4bd",
                "description": "Send them a handwritten letter or postcard",
                "level": "Medium"
            },
            {
                "_id": "5d11e8340de332001740c4bc",
                "description": "Bake them some treats.",
                "level": "Medium"
            },
            {
                "_id": "5d11e8340de332001740c4bb",
                "description": "Make them a playlist.",
                "level": "Easy"
            },
            {
                "_id": "5d11e8340de332001740c4ba",
                "description": "Give them a hug.",
                "level": "Easy"
            },
            {
                "_id": "5d11e8340de332001740c4b9",
                "description": "Take them to the movies.",
                "level": "Medium"
            }
        ],
        "contacts": [],
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiNWQxMWU4MzQwZGUzMzIwMDE3NDBjNGIzIiwiZmlyc3ROYW1lIjoiVmlubnkiLCJlbWFpbCI6InZpbm55cEBnbWFpbC5jb20iLCJpYXQiOjE1NjE0NTQ2NDR9.9GuEWS8rbhsz6GRY4cRD0JOG8nFNJ64rzPt_c3hD3OU"
}
```
Note: New users are seeded with a set of 10 random acts, the jwt token returned must be used in all future requests

### Login

#### Request
**POST** to /auth/login
```
{
	"email": "vinnyp@gmail.com",
	"password": "vinnysecretpass"
}
```

#### Response
The full user object with a jwt token, acts array, and contacts array
```
{
    "user": {
        "_id": "5d11e8340de332001740c4b3",
        "first_name": "Vinny",
        "last_name": "Peters",
        "email": "vinnyp@gmail.com",
        "phone": "07748439203",
        "password": "$2a$10$Q.zWSthVmTf5866fhABh4e5ENEpfz58GU.GmPjh5HP3KSnqWoIvRe",
        "acts": [
            {
                "_id": "5d11e8340de332001740c4bd",
                "description": "Send them a handwritten letter or postcard",
                "level": "Medium"
            },
            {
                "_id": "5d11e8340de332001740c4bc",
                "description": "Bake them some treats.",
                "level": "Medium"
            },
            {
                "_id": "5d11e8340de332001740c4bb",
                "description": "Make them a playlist.",
                "level": "Easy"
            },
            {
                "_id": "5d11e8340de332001740c4ba",
                "description": "Give them a hug.",
                "level": "Easy"
            },
            {
                "_id": "5d11e8340de332001740c4b9",
                "description": "Take them to the movies.",
                "level": "Medium"
            }
        ],
        "contacts": [],
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiNWQxMWU4MzQwZGUzMzIwMDE3NDBjNGIzIiwiZmlyc3ROYW1lIjoiVmlubnkiLCJlbWFpbCI6InZpbm55cEBnbWFpbC5jb20iLCJpYXQiOjE1NjE0NTQ2NDR9.9GuEWS8rbhsz6GRY4cRD0JOG8nFNJ64rzPt_c3hD3OU"
}
```

## Acts
All acts requets are made to /acts

### Get all acts for the user

#### Request
**GET** request to /acts <br />
A valid jwt token must be passed in the **Authorization** header

#### Response
A list of all acts associated with the user
```
[
    {
        "_id": "5d11e8340de332001740c4bd",
        "description": "Send them a handwritten letter or postcard",
        "level": "Medium"
    },
    {
        "_id": "5d11e8340de332001740c4bc",
        "description": "Bake them some treats.",
        "level": "Medium"
    },
    {
        "_id": "5d11e8340de332001740c4bb",
        "description": "Make them a playlist.",
        "level": "Easy"
    },
    {
        "_id": "5d11e8340de332001740c4ba",
        "description": "Give them a hug.",
        "level": "Easy"
    },
    {
        "_id": "5d11e8340de332001740c4b9",
        "description": "Take them to the movies.",
        "level": "Medium"
    }
]
```

### Add a new act to the user

#### Request
**POST** request to /acts <br />
A valid jwt token must be passed in the **Authorization** header
```
{
"description": "Wash their car",
"level": "Medium"
}
```
Note: level must be one of Easy, Medium, or Hard (case insensitive)

#### Response
An updated list of all the acts associated with the user
```
[
    {
        "_id": "5d11e8340de332001740c4bd",
        "description": "Send them a handwritten letter or postcard",
        "level": "Medium"
    },
    {
        "_id": "5d11e8340de332001740c4bc",
        "description": "Bake them some treats.",
        "level": "Medium"
    },
    {
        "_id": "5d11e8340de332001740c4bb",
        "description": "Make them a playlist.",
        "level": "Easy"
    },
    {
        "_id": "5d11e8340de332001740c4ba",
        "description": "Give them a hug.",
        "level": "Easy"
    },
    {
        "_id": "5d11e8340de332001740c4b9",
        "description": "Take them to the movies.",
        "level": "Medium"
    },
    {
        "_id": "5d11e99c0de332001740c4be",
        "description": "Wash their car",
        "level": "Medium"
    }
]
```


### Edit an act associated with the user

#### Request
**PUT** request to /acts/:actID <br />
A valid jwt token must be passed in the **Authorization** header <br />
actID param must be a valid id number associated with the user and act
```
{
	"description": "Wash their car over the weekend",
	"level": "Easy"
}
```
Note: Must include a change to either the description or level or both

#### Response
An updated list of all the acts associated with the user
```
[
    {
        "_id": "5d11e8340de332001740c4bd",
        "description": "Send them a handwritten letter or postcard",
        "level": "Medium"
    },
    {
        "_id": "5d11e8340de332001740c4bc",
        "description": "Bake them some treats.",
        "level": "Medium"
    },
    {
        "_id": "5d11e8340de332001740c4bb",
        "description": "Make them a playlist.",
        "level": "Easy"
    },
    {
        "_id": "5d11e8340de332001740c4ba",
        "description": "Give them a hug.",
        "level": "Easy"
    },
    {
        "_id": "5d11e8340de332001740c4b9",
        "description": "Take them to the movies.",
        "level": "Medium"
    },
    {
        "_id": "5d11e99c0de332001740c4be",
        "description": "Wash their car over the weekend",
        "level": "Easy"
    }
]
```

### Delete an act associated with the user

#### Request
**DELETE** request to /acts/:actID <br />
A valid jwt token must be passed in the **Authorization** header <br />
actID param must be a valid id number associated with the user and act

#### Response
An updated list of all the acts associated with the user
```
[
    {
        "_id": "5d11e8340de332001740c4bd",
        "description": "Send them a handwritten letter or postcard",
        "level": "Medium"
    },
    {
        "_id": "5d11e8340de332001740c4bc",
        "description": "Bake them some treats.",
        "level": "Medium"
    },
    {
        "_id": "5d11e8340de332001740c4bb",
        "description": "Make them a playlist.",
        "level": "Easy"
    },
    {
        "_id": "5d11e8340de332001740c4ba",
        "description": "Give them a hug.",
        "level": "Easy"
    },
    {
        "_id": "5d11e99c0de332001740c4be",
        "description": "Wash their car over the weekend",
        "level": "Easy"
    }
]
```

## Contacts
All contacts requets are made to /contacts

### Get all contacts for the user

#### Request
**GET** request to /contacts <br />
A valid jwt token must be passed in the **Authorization** header

#### Response
```
[
    {
        "_id": "5d11eccd0de332001740c4cb",
        "first_name": "Jason",
        "last_name": "Bates",
        "level": "Close Friend"
    },
    {
        "_id": "5d11ece30de332001740c4cc",
        "first_name": "Simon",
        "last_name": "Clare",
        "level": "Friend"
    }
]
```

### Add a new contact to the user

#### Request
**POST** request to /contacts <br />
A valid jwt token must be passed in the **Authorization** header
```
{
	"firstName": "Lucy",
	"lastName": "Simms",
	"level": "Best Friend"
}
```
Note: level must be one of Friend, Close Friend, or Best Friend (case insensitive)

#### Response
An updated list of all the contacts associated with the user
```
[
    {
        "_id": "5d11eccd0de332001740c4cb",
        "first_name": "Jason",
        "last_name": "Bates",
        "level": "Close Friend"
    },
    {
        "_id": "5d11ece30de332001740c4cc",
        "first_name": "Simon",
        "last_name": "Clare",
        "level": "Friend"
    },
    {
        "_id": "5d11ed1d0de332001740c4cd",
        "first_name": "Lucy",
        "last_name": "Simms",
        "level": "Best Friend"
    }
]
```

### Edit a contact associated with the user

#### Request
**PUT** request to /contacts/:contactID <br />
A valid jwt token must be passed in the **Authorization** header <br />
contactID param must be a valid id number associated with the user and contact
```
{
	"firstName": "Lucinda",
	"lastName": "Graham",
	"level": "Close Friend"
}
```
Note: Must include a change to either the firstName, lastName or level or all

#### Response
An updated list of all the contacts associated with the user
```
[
    {
        "_id": "5d11eccd0de332001740c4cb",
        "first_name": "Jason",
        "last_name": "Bates",
        "level": "Close Friend"
    },
    {
        "_id": "5d11ece30de332001740c4cc",
        "first_name": "Simon",
        "last_name": "Clare",
        "level": "Friend"
    },
    {
        "_id": "5d11ed1d0de332001740c4cd",
        "first_name": "Lucinda",
        "last_name": "Graham",
        "level": "Close Friend"
    }
]
```

### Delete a contact associated with the user

#### Request
**DELETE** request to /contacts/:contactID <br />
A valid jwt token must be passed in the **Authorization** header <br />
contactID param must be a valid id number associated with the user and contact

#### Response
An updated list of all the contacts associated with the user
```
[
    {
        "_id": "5d11eccd0de332001740c4cb",
        "first_name": "Jason",
        "last_name": "Bates",
        "level": "Close Friend"
    },
    {
        "_id": "5d11ed1d0de332001740c4cd",
        "first_name": "Lucinda",
        "last_name": "Graham",
        "level": "Close Friend"
    }
]
```
