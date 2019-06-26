# Random Acts Generator - API
All API requests are made to: https://rag-eu.herokuapp.com

## Sanity Check

#### Request
**GET** request to /

#### Response 200
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

#### Response 201
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

#### Errors
401 - Invalid password - 'Please use a password with at least 7 charcters' </br>
401 - User already exists -'A user with this email address already exists, please use another' </br>
401 - Invalid email - 'Please use a valid email address' </br>
401 - Mising on register - 'Please include all required fields to register'

### Login

#### Request
**POST** to /auth/login
```
{
	"email": "vinnyp@gmail.com",
	"password": "vinnysecretpass"
}
```

#### Response 200
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

#### Errors
401 - Invalid credentials - 'Please use valid login credentials' </br>
401 - Missing on login -'Please include all required fields to login'

## Acts
All acts requets are made to /acts

### Get all acts for the user

#### Request
**GET** request to /acts <br />
A valid jwt token must be passed in the **Authorization** header

#### Response 200
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

#### Errors
401 - User no exist - 'User with this token does not exist'

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

#### Response 201
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

#### Errors
401 - User no exist - 'User with this token does not exist' </br>
401 - Invalid level act - 'Please include a valid level for the act: easy, medium, or hard' </br>
401 - Missing on post act - 'Please include a description and level to add a new act'

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

#### Response 200
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

#### Errors
401 - Act no exist - 'Act with this ID does not exist' </br>
401 - User no exist - 'User with this token does not exist' </br>
401 - Invalid level act - 'Please include a valid level for the act: easy, medium, or hard' </br>
401 - Missing on put act - 'Please include a description or level to update an act'

### Delete an act associated with the user

#### Request
**DELETE** request to /acts/:actID <br />
A valid jwt token must be passed in the **Authorization** header <br />
actID param must be a valid id number associated with the user and act

#### Response 200
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

#### Errors
401 - Act no exist - 'Act with this ID does not exist' </br>
401 - User no exist - 'User with this token does not exist'

## Contacts
All contacts requets are made to /contacts

### Get all contacts for the user

#### Request
**GET** request to /contacts <br />
A valid jwt token must be passed in the **Authorization** header

#### Response 200
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

#### Errors
401 - User no exist - 'User with this token does not exist'

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

#### Response 201
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

#### Errors
401 - User no exist - 'User with this token does not exist' </br>
401 - Invalid level contact - 'Please include a valid level for the contact: friend, close friend, or best friend' </br>
401 - Missing on post contact - 'Please include a firstName, lastName, and level to add a new act'

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

#### Response 200
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

#### Errors
401 - Contact no exist - 'Contact with this ID does not exist' </br>
401 - User no exist - 'User with this token does not exist' </br>
401 - Invalid level contact - 'Please include a valid level for the contact: friend, close friend, or best friend' </br>
401 - Missing on put contact - 'Please include a firstName, lastName or level to update a contact'

### Delete a contact associated with the user

#### Request
**DELETE** request to /contacts/:contactID <br />
A valid jwt token must be passed in the **Authorization** header <br />
contactID param must be a valid id number associated with the user and contact

#### Response 200
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

#### Errors
401 - Contact no exist - 'Contact with this ID does not exist' </br>
401 - User no exist - 'User with this token does not exist'

## Sms
All sms requets are made to /sms

### Send an sms to a random user on the app

#### Request
**POST** request to /sms <br />
A valid jwt token must be passed in the **Authorization** header
```
{
	"message": "Hi, hope you have a great day"
}
```

#### Response 200
```
"Hi, hope you have a great day"
```

#### Errors - direct from the Twilio API
```
{
    "status": 400,
    "message": "The 'To' number 98349234924 is not a valid phone number.",
    "code": 21211,
    "moreInfo": "https://www.twilio.com/docs/errors/21211"
}
```
