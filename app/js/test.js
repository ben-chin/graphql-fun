import graphqlHTTP from 'express-graphql';
import testSchema from 'schema';
import express from 'express';

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: testSchema,
    graphiql: true,
}));

const server = app.listen(3000, () => {
    var port = server.address().port;

    console.log('App listening at http://localhost:%s', port);
});
