import express, { request } from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

const mockUsers = [
    {id: 1, name: 'john', displayName: 'John'},
    {id: 2, name: 'will', displayName: 'Will'},
    {id: 3, name: 'frank', displayName: 'Frank'},
    {id: 4, name: 'jane', displayName: 'Jane'},
    {id: 5, name: 'susan', displayName: 'Susan'},
    {id: 6, name: 'james', displayName: 'James'},
    {id: 7, name: 'jill', displayName: 'Jill'},
]

// The following blocks of code (all before the listen() method) are route handlers.
// Route handlers are middleware functions that are executed when a request is made to the specified path.
// They are used to handle requests and send responses to the client.

// get() method is used to route the HTTP GET requests to the specified path with the specified callback functions
app.get('/', (request, response) => {
    response.status(201).send({msg: 'Hello World!'});
});

/*
For reference on query parameters and how they are used below: 
If the user sends a request like this:
/api/users?filter=name&value=john
Then:
request.query is {filter: 'name', value: 'john'}
where: 
    filter = 'name'
    value = 'john'
So the API will return all users whose name includes 'john'.
*/

app.get('/api/users', (request, response) => {
    // query parameters are used to filter the data returned by the API
    // query parameters are available in request.query
    console.log(request.query); 
    const {
        /* 
        This is nested object destructuring. It extracts the filter and value properties from the query object in the request.
        It's the same as this: 
        const filter = request.query.filter;
        const value = request.query.value;

        This code:
        Declares a single const
        Pulls out the query object from request
        Pulls filter and value from query
        Creates two variables: filter and value (the names are the same as the properties in the query object)
        */
        query: {filter, value},
    } = request;
    console.log(filter, value);
    // When filter and value are provided, the API filters the users based on the filter and value.
    if (filter && value) {
        // This sends the filtered users when the URL is /api/users?filter=(a property in the mockUsers array)&value=(string or substring in the property)
        return response.send(mockUsers.filter((user) => user[filter].includes(value)));
    } else {
        return response.send(mockUsers); // This sends all users when filter and value are not provided.
    }

});

app.get('/api/users/:id', (request, response) => { // :id is a route parameter
    console.log(request.params);
    const parsedId = parseInt(request.params.id);
    console.log(parsedId);
    if (isNaN(parsedId)) {
        return response.status(400).send({msg: "Invalid ID"});
    }
    const findUser = mockUsers.find((user) => user.id === parsedId);
    if (!findUser) {
        return response.sendStatus(404);
    } else {
    return response.send(findUser);
    }
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

