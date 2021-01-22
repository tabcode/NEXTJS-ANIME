import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const uri = "#";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, });

client.connect(async (err) => {
    if (err) {
        console.log(err);
    }
});

async function database(req, res, next) {
    if (!client.isConnected()) await client.connect();
    req.dbClient = client;
    req.db = client.db('#');
    return next();
}
const middleware = nextConnect();
middleware.use(database);
export default middleware;