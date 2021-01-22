import nextConnect from 'next-connect';
import middleware from '../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    let doc = await req.db.collection('#').find().toArray();
    res.json(doc);
});

handler.post(async (req, res) => {
    let data = req.body;
    await req.db.collection('#').insertOne(JSON.parse(data));
    res.json({message:"ok"});
});

handler.delete(async (req, res) => {
    let data = JSON.parse(req.body);
    await req.db.collection('#').deleteOne({idAnime:Number(data.idAnime)});
    res.json({message:"ok"});
});

export default handler;