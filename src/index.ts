const express = require('express')
import {GenerateHD_SegWit, GenerateMultiSig_P2SH} from "./utils"
const app = express();
const port = 8080;

app.use(express.json())

 app.post("/hd_sig_wit", (req:any, res:any) => {
     const errorMsg = {
         "error" : ""
     }
    if (typeof req.body["seed"] != "number") {
        errorMsg["error"] = "seed is not a number"
        res.send(errorMsg)
        return
    }
     const regexp = new RegExp('m/\/*')
     const isValid = regexp.test(req.body["path"])

    if ((typeof req.body["path"] != "string") ||  (isValid == false) || (req.body["path"][0] != "m")){
        errorMsg["error"] = "path is not a string or is not valid"
         res.send(errorMsg)
         return
    }

     const walletAddress = GenerateHD_SegWit(req.body["seed"],req.body["path"])
     const responseArray = {
         "address" : walletAddress
     }
     res.send(responseArray);
});

app.post("/multi_sig_p2sh", (req:any, res:any) => {
    const errorMsg = {
        "error" : ""
    }
    if (typeof req.body["n"] != "number") {
        errorMsg["error"] = "n is not a number"
        res.send(errorMsg)
        return
    }
    if (typeof req.body["m"] != "number") {
        errorMsg["error"] = "m is not a number"
        res.send(errorMsg)
        return
    }
    if (req.body["n"] <  req.body["m"]) {
        errorMsg["error"] = "Pubkey count cannot be less than m"
        res.send(errorMsg)
        return
    }

    const walletAddress = GenerateMultiSig_P2SH(req.body["n"],req.body["m"])

    const responseArray = {
        "address" : walletAddress
    }
    res.send(responseArray);
});



app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});