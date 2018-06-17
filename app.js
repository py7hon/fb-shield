const request = require("request");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mainshield = require('./shieldstuff.js')

var urlencodedParser = bodyParser.urlencoded({
        extended: false
})



app.get('/', (req, res) => res.send("<script>window.location.replace('/kontol');</script>"));


app.get('/kontol', (req, res) => {
        res.sendFile(__dirname + "/shield/index.html", (err) => {
                    if (err) {
                                    console.log(err)
                                }

                })
});

app.post('/kontol/', urlencodedParser, (req, res) => {
        var token = req.body.token;
        if (!token) {
                    res.send("<script>alert('Không Để Trống Token')\nwindow.location.replace('/kontol');</script>");
                    return;

                } else if (token) {
                            mainshield.tokenchecker(token).then((result) => {
                                            var userid = result.id;
                                            if (!userid) {
                                                                res.send("<script>alert('Token tidak valid')\nwindow.location.replace('/kontol');</script>");
                                                                return;
                                                            } else {
                                                                                mainshield.makeshield(token, userid).then((result) => {

                                                                                                        var checkshield = result.data.is_shielded_set.is_shielded;
                                                                                                        if (checkshield == true) {
                                                                                                                                    res.send("<script>alert('Sudah Mengaktifkan Periksa Facebook Anda')\nwindow.location.replace('/kontol');</script>");
                                                                                                                                    return;

                                                                                                                                } else {
                                                                                                                                                            res.send("<script>alert('Kesalahan Harap laporkan ke Admin')\nwindow.location.replace('https://www.facebook.com/iqbalrifaii');</script>");
                                                                                                                                                            return;
                                                                                                                                                        }

                                                                                                    })

                                                                            }

                                        })

                        }
});
app.listen(80, () => console.log("Connected!"))
