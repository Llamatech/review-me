'use strict';

const mongo = require('../db');
var collection = 'ratings';

exports.publish = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var body = req.body;
    var query = {id: body.id};
    mongo.find('ratings', query, (doc) => {
        console.log(doc);

        var pastAvg, N;
        if(doc.length === 0)
        {
            N = 0;
            pastAvg = 0;
        }
        else
        {
            var val = doc[0];
            N = val.n;
            pastAvg = val.avgRating;
        }
        console.log(N);
        console.log(pastAvg);

        var avg = (pastAvg*N + body.rating)/(N+1);
        var upd = {"id": body.id, "n": N+1, "avgRating": avg};
        mongo.update('ratings', query, upd, {upsert:true}, (misc) => {
            mongo.find('ratings', query, (doc) => {
                res.send(JSON.stringify({ rating: doc }));
            })
        });
    });
}
