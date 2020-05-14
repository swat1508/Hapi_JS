const Hapi =  require('hapi');

//init server
const server = Hapi.server({
    host: 'localhost',
    port: 8000
  });



// Add the route  
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      return '<h1>Hello World!</h1>';
    }
  });

//Dynamic Route
server.route({
    method: 'GET',
    path: '/user/{name}',
    handler: function (request, reply) {
      return `<h1>Hello from  ${request.params.name}</h1>`;
    }
  });

//Static Routes
// server.register(require('inert'),(err) => {
//     if(err){
//         throw err;
//     }
    // server.route({
    //     method: 'GET',
    //     path: '/about',
    //     handler :(request,reply) => {
    //         reply.file('./public/about.html')
    //     }
    // }); 
// });

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



//Start Server
async function start () {
    try {
        await server.start();            
    }
    catch (err) {
      console.log(err);
      process.exit(1);
    }
  
    console.log('Server running at:', server.info.uri);
  };
  
  start();