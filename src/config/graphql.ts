import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import resolvers from "@graphql/resolvers";
import typeDefs from "@graphql/schemas";
import bodyParser from 'body-parser';
import cors from 'cors';

const startApolloServer = async (app: any) => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,
        plugins: [
            ApolloServerPluginLandingPageLocalDefault({ embed: true })
        ],
    });

    await server.start();

    app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server));
}

export default startApolloServer;