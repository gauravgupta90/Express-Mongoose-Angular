Express-Mongoose-Redis-Angular Skeleton
================================================

The purpose of this app is to prepare a basic Skeleton for a node.js project and show a new way to work with Express.js, Mongodb, Mongoose, Redis, Angular.js.

This gives a quick start for a node.js industrial project without worrying much on structure but focus more on business logic.

It has only basic modules to start a new project from scratch and later add few advance module when needed.

Now it's time to start coding...

Happy Coding!

### Technology Stack

	Node.js

	Express framework

	MongoDB (for database)

	Mongoose

	Redis (for caching)


### Install an app

Run the following command in root directory of an app in command prompt.

###### *Install node packages*

server/ node install

###### *Install bower components*

client/src/ bower install

### Run an app

###### *Run Server*

Run the following command in root directory of an app in command prompt.

server/ node server.js

You can see the port number in command prompt after sucessfull run

You can change the settings in server/config/config.js file

### API

###### *POST request/ Create user*

    http://localhost:8000/user
    
    Body:

    	{
			"userId":"gauravgupta90",
			"username":"gauravgupta",
			"fullname":"Gaurav Gupta" // due to virtual function; this field will split by space and will store as firstname and lastname
		}

	Response:

    	{
		    "status": true,
		    "result": {
		        "__v": 0,
		        "userId": "gauravgupta90",
		        "username": "gauravgupta",
		        "lastname": "Gupta",
		        "firstname": "Gaurav",
		        "_id": "582ad367bc1034411a00e76f",
		        "fullname": "Gaurav Gupta",
		        "id": "582ad367bc1034411a00e76f"
		    },
		    "message": "user created successfully"
		}


###### *Get request/ Get all users*

    http://localhost:8000/user

    Response:

    	{
			"status": true,
			"result": [
				{
					"_id": "582ad367bc1034411a00e76f",
					"userId": "gauravgupta90",
					"username": "gauravgupta",
					"lastname": "Gupta",
					"firstname": "Gaurav",
					"__v": 0,
					"fullname": "Gaurav Gupta"
				}
			],
			"message": "successfully get all user"
		}

###### *Get request/ Get user by userid*

    http://localhost:8000/user/gauravgupta90

    Respone:

    	{
			"status": true,
			"result": {
				"_id": "582ad367bc1034411a00e76f",
				"userId": "gauravgupta90",
				"username": "gauravgupta",
				"lastname": "Gupta",
				"firstname": "Gaurav",
				"__v": 0,
				"fullname": "Gaurav Gupta"
			},
			"message": "successfully get user info"
		}

###### *PUT request/ Update user by userid*

	http://localhost:8000/user/gauravgupta90
	
	Body:

    	{
			"username":"gaurav_bng@hotmail.com"
		}

	Response:

		{
		    "status": true,
		    "result": {
		        "_id": "582ad367bc1034411a00e76f",
		        "userId": "gauravgupta90",
		        "username":"gaurav_bng@hotmail.com",
		        "lastname": "Gupta",
		        "firstname": "Gaurav",
		        "__v": 0,
		        "fullname": "Gaurav Gupta"		    },
		    "message": "User updated successfully"
		}

###### *DELETE request/ Delete user by userid*

	http://localhost:8000/user/gauravgupta90

	Response:

		{
		    "status": true,
		    "result": {
		        "ok": 1,
		        "n": 1
		    },
		    "message": "User deleted successfully"
		}
		