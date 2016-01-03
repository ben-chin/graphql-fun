import {
    GraphQLInt,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';

import request from 'superagent';
import RSVP from 'rsvp';

export const PersonType = new GraphQLObjectType({
    name: 'Person',
    description: 'Star Wars person',
    fields: () => ({
        id: {
            type: GraphQLInt,
            description: 'Id of person',
        },
        name: {
            type: GraphQLString,
            description: 'Name of character',
        }
    }),
});

export function getPerson (id) {
    return new RSVP.Promise((resolve, reject) => {
        request
            .get(`https://swapi.co/api/people/${id}/`)
            .set('Accept', 'application/json')
            .on('error', () => {
                console.log('error');
                reject(this);
            })
            .end((err, res) => {
                resolve(res.body);
            });
    });
}
