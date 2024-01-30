require("../Database/index");


const ApiDemo = require("../models/NewsModel");

const getNews = async (req, res, next) => {
    const authheader = req.headers.authorization;
    if (!authheader) {
        let err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err)
    }
    const auth = new Buffer.from(authheader.split(' ')[1],
        'base64').toString().split(':');
    const user = auth[0];
    const pass = auth[1];
    if (user == process.env.LoginUsername && pass == process.env.LoginPassword) {
        try {
            const FindingData = await ApiDemo.aggregate([{
                "$sort": {
                    day: 1,
                    Time: 1,
                }
            },
            {
                "$project": {
                    title: "$title",
                    day: "$day",
                    Studio: "$Studio",
                    description: "$description",
                    profile_img: "$profile_img",
                    Time: "$Time",
                    _id: "$_id",
                }
            }

            ]);
            const RespData = await ApiDemo.find({});
            res.status(200).send(FindingData);
        } catch (e) {
            res.status(400).send(e);
        } next();
    } else {
        let err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }
}




module.exports = { getNews }; 