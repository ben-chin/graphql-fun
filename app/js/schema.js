import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';

const rootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        name: {
            type: GraphQLString,
            resolve() {
                return 'A little Ben';
            },
        }
    },
});

const testSchema = new GraphQLSchema({
    query: rootQuery,
});

export default testSchema;
