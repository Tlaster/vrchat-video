var express = require('express');
var logger = require('morgan');
const axios = require('axios');

var app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    const target = req.query.target;
    if (target) {
        axios.get(target, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Mobile Safari/537.36 Edg/94.0.992.31'
            },
        },
        ).then(response => {
            response.data
            const regex = /readyVideoUrl: '(.*)'/.exec(response.data);
            res.redirect(regex[1])
        }).catch(error => {
            console.log(error);
        });
    }
});

module.exports = app;
