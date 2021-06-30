"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var hd_segwit_1 = require("./hd_segwit");
var app = express();
var port = 8080;
app.use(express.json());
app.post("/hd_sig_wit", function (req, res) {
    var errorMsg = {
        "error": ""
    };
    if (typeof req.body["seed"] != "number") {
        errorMsg["error"] = "seed is not a number";
        res.send(errorMsg);
        return;
    }
    var regexp = new RegExp('m/\/*');
    var isValid = regexp.test(req.body["path"]);
    if ((typeof req.body["path"] != "string") || (isValid == false) || (req.body["path"][0] != "m")) {
        errorMsg["error"] = "path is not a string or is not valid";
        res.send(errorMsg);
        return;
    }
    var walletAddress = hd_segwit_1.GenerateHD_SegWit(req.body["seed"], req.body["path"]);
    var responseArray = {
        "address": walletAddress
    };
    res.send(responseArray);
});
app.post("/multi_sig_p2sh", function (req, res) {
    var errorMsg = {
        "error": ""
    };
    if (typeof req.body["n"] != "number") {
        errorMsg["error"] = "n is not a number";
        res.send(errorMsg);
        return;
    }
    if (typeof req.body["m"] != "number") {
        errorMsg["error"] = "m is not a number";
        res.send(errorMsg);
        return;
    }
    if (req.body["n"] < req.body["m"]) {
        errorMsg["error"] = "Pubkey count cannot be less than m";
        res.send(errorMsg);
        return;
    }
    var walletAddress = hd_segwit_1.GenerateMultiSig_P2SH(req.body["n"], req.body["m"]);
    var responseArray = {
        "address": walletAddress
    };
    res.send(responseArray);
});
app.listen(port, function () {
    console.log("Server started at http://localhost:" + port);
});
