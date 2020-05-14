npm install


================================================================================================
npm install inert --save

inert - Static file and directory handlers for hapi.js.
inert is part of the hapi ecosystem and was designed to work seamlessly with the hapi web framework and its other components (but works great on its own or with other frameworks). 
================================================================================================

hapi is also the only framework that doesn't rely on outside dependencies. Every dependency is managed by the core hapi team, which makes security and reliability some of hapi's greatest strengths.

While Express relies heavily on middleware for much of its functionality, hapi has more built into the core. Body parsing, cookie handling, input/output validation, and HTTP-friendly error objects are already built-in to the hapi framework.

Routing
-------
To create a route, Express has the structure of app.METHOD(PATH, HANDLER) and hapi has the structure server.route({METHOD, PATH, HANDLER}). The method, path, and handler are passed to the hapi server as an object.

server.route({
    method: ['PUT', 'POST'],
    path: '/',
    handler: function (request, h) {

        return 'I did something!';
    }
});

====================================================================================================
Handler:
There are differences in the way Express and hapi structure their route handlers. Unlike Express, which has a handler with parameters of req and res, hapi has a handler with parameters of request and h. The second parameter, h is the response toolkit, which is an object with several methods used to respond to the request.

==================================================================================================
There are Express response methods that hapi can accomplish by just using return. Some of these methods include res.send and res.json. Here is an example of how hapi will respond with JSON data:

server.route({
    method: 'GET',
    path: '/user',
    handler: function (request, h) {

        const user = {
            firstName: 'John',
            lastName: 'Doe',
            userName: 'JohnDoe',
            id: 123
        }

        return user;
    }
});
===================================================================================================

Express drawback:
To extend its functionality, Express uses middleware. Middleware essentially is a sequence of functions using callbacks to execute the next function. The issue with this is as your application grows in size and complexity, the order at which middleware executes becomes more crucial and more difficult to maintain. Having a middleware execute before one it's dependant on will cause you application to fail. hapi fixes this issue with its robust plugin and extension system.

Hapi solution to problem:
Plugins allow you to break your application logic into isolated pieces of business logic, and reusable utilities. Each plugin comes with its own dependencies which are explicitly specified in the plugins themselves. This means you don't have to install dependencies yourself to make your plugins work. You can either add an existing hapi plugin, or write your own. 
===========================================================================================

you can write your own middleware in Express. The same is true with hapi plugins. A plugin is an object with required name and register properties. The register property is a function with the signature of async function (server, option)

Express:
--------
const getDate = function (req, res, next) {

    req.getDate = function() {

        const date = new Date();
        return date;
    };

    next();
};

In Express, you load middleware by calling the app.use() method
app.use(getDate);

Hapi:
-----
const getDate = {
    name: 'getDate',
    version: '1.0.0',
    register: async function (server, options) {

        const currentDate = function() {

            const date = new Date();
            return date;
        };

        server.decorate('toolkit', 'getDate', currentDate);
    }
};

In hapi, you call the server.register() method. 

await server.register({
    plugin: getDate
});
=====================================================================================

body-parser
hapi has parsing abilities built into its core. Unlike Express, you do not need middleware to parse payload data. In fact, you may need to install up to four additional middlewares in Express depending on what kind of data you would like to parse. In hapi the payload data, whether its JSON or plain text, is readily available in the request.payload object.

Express:
--------
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extend: true}));

app.post('/hello', function (req, res) {  

  var name = req.body.name
  res.send('Hello ' + name);  
});


hapi:
------
server.route({
    method: 'POST',
    path: '/hello',
    handler: function (request, h) {

        const name = request.payload.name;
        return `Hello ` + name;
    }
});