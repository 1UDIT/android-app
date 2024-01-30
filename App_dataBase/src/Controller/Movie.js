require("../Database/index");


const MovieModal = require("../models/Movie");

const getAllList = async (req, res, next) => {
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
            const FindingData = await MovieModal.aggregate([{
                "$sort": {
                    day: 1,
                    Time: 1,
                }
            },
            {
                "$project": {
                    title: "$title",
                    Type: "$Type",
                    Studio: "$Studio",
                    description: "$description",
                    category: "$MovieTypes",
                    Streaming: "$Streaming",
                    img: "$img",
                    Time: "$Time",
                    _id: "$_id",
                }
            }
            ]);
            res.status(200).send(FindingData);
        } catch (e) {
            res.status(400).send(e);
        }
        next();
    } else {
        let err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }
}

const getmovie = async (req, res, next) => {
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
            let query = {
                value: {
                    $regex: req.query.listType,
                }
            };
            const TypeSeries = await MovieModal.find({ Type: query.value.$regex });
            res.status(200).send(TypeSeries);
        } catch (e) {
            res.status(400).send(e);
        }
        next();
    } else {
        let err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }
}






module.exports = { getmovie, getAllList }; 