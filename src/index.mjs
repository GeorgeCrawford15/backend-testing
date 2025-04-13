import express, { request } from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

const mockUsers = [
    {id: 1, name: 'john', displayName: 'John'},
    {id: 2, name: 'will', displayName: 'Will'},
    {id: 3, name: 'frank', displayName: 'Frank'},
]

// The following blocks of code (all before the listen() method) are route handlers.
// Route handlers are middleware functions that are executed when a request is made to the specified path.
// They are used to handle requests and send responses to the client.

// get() method is used to route the HTTP GET requests to the specified path with the specified callback functions
app.get('/', (request, response) => {
    response.status(201).send({msg: 'Hello World!'});
});

app.get('/api/users', (request, response) => {
    response.send(mockUsers);
});

app.get('/api/users/:id', (request, response) => { // :id is a route parameter
    console.log(request.params);
    const parsedId = parseInt(request.params.id);
    console.log(parsedId);
    if (isNaN(parsedId)) return response.status(400).send({msg: "Invalid ID"});
    const findUser = mockUsers.find((user) => user.id === parsedId);
    if (!findUser) return response.sendStatus(404);
    return response.send(findUser);
});

app.get('/api/products', (request, response) => {
    response.send([
        {id: 1, name: 'Bat', price: 100},
        {id: 2, name: 'Glove', price: 50},
        {id: 3, name: 'Ball', price: 20}
    ])
});

// listen() method is used to make the server start listening to a specified port for incoming requests.
// It essentially initializes the server. 
// All routes and middleware are set up before this method is called.
app.listen(PORT, () => {
    console.log('Running on port ' + PORT);
});

