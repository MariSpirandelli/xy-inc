# xy-inc
###Backend as a Service

Developed to be used by those who does not have knowledge to build and keep a rest service api. It makes possible to any user only create a client side application and use CRUD operations of any models from this application.

###How to use:

1.First download and install NodeJs.

2.Second install MongoDB:
`npm install mongodb --save`

3.Third download the folder "Sevices" and install all dependencies:
`npm install`

**Now xy-inc rest service is redy to run.**

Start mongod.

Start xy-inc services: `npm start`

*It's hardcoded to use port 3000. It will be fixed on the next versions.*

###AVAILABLE APIs:

**Link Model to a Client:**

METHOD : POST

URI : /model

BODY_CONTENT_TYPE : JSON

BODY CONTENT: {"model_name": "< MODEL_NAME >", "model_attributes" : "{'< attr_key >': '< attr_type >', ...}"}


**List All from a Model:**

METHOD : GET

URI : /services/< model_name >


**Find By Id from a Model:**

METHOD : GET

URI : /services/< model_name >/< id >


**Create Content to a Model**

METHOD : POST

URI : /services/< model_name >

BODY_CONTENT_TYPE : JSON

BODY CONTENT: {"< attr_key >": "< attr_value >", ...}


**Edit Content from a Model**

METHOD : PUT

URI : /services/< model_name >/< id >

BODY_CONTENT_TYPE : JSON

BODY CONTENT: {"< attr_key >": "< new_attr_value >", ...}


**Delete Content from a Model by id**

METHOD : DELETE

URI : /services/< model_name >/< id >
