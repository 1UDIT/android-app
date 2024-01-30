const imageModel = require("../models/Scheduler");

const GetScheduler = async (req, res, next) => {
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
            const sortData = await imageModel.aggregate([
                {
                    "$sort": {
                        day: 1,
                        Time: 1,
                    }
                },
                {
                    "$project": {
                        title: "$title",
                        profile_img:"$profile_img",
                        day: "$day",
                        Studio: "$Studio",
                        Season: "$Season",
                        SeasonType:"$SeasonType",
                        description: "$description",
                        date:"$date",
                        img: "$img",
                        Time: "$Time",
                        _id: "$_id",
                    }
                }

            ]); 
            res.status(200).send(sortData);
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


const FindDetail = async (req, res, next) => {
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
                    $regex: req.query.SeasonType,
                }
            }; 
            const userFound = await imageModel.find({ SeasonType: query.value.$regex });
            // console.log(userFound);
            res.status(200).send(userFound);
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




module.exports = { GetScheduler, FindDetail }; 