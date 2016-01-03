import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLNonNull,
} from 'graphql';

import {
    PersonType,
    getPerson,
} from 'graphtypes/Person';


const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        person: {
            type: PersonType,
            args: {
                id: {
                    name: 'id',
                    type: new GraphQLNonNull(GraphQLInt),
                },
            },
            resolve: (root, { id }) => {
                return getPerson(id);
            },
        }
    }),
});

const TestSchema = new GraphQLSchema({
    query: RootQueryType,
});

export default TestSchema;
