import 'source-map-support/register';

import graphqlHTTP from 'express-graphql';
import express from 'express';
import TestSchema from 'schema';

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: TestSchema,
    graphiql: true,
}));

const server = app.listen(3000, () => {
    var port = server.address().port;

    console.log('App listening at http://localhost:%s', port);
});
