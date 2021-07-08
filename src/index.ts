const express = require('express')
import {GenerateHD_SegWit, GenerateMultiSig_P2SH} from "./utils/generate"
import {valid_input_p2sh, valid_input_hd_sig_wit} from './utils/validation'

const app = express();
const port = 8080;

app.use(express.json())

 app.post("/hd_sig_wit", (req:any, res:any) => {
    const errorMsg = {
         "error" : ""
    }

    let valid_error = valid_input_hd_sig_wit(req.body["seed"], req.body["path"])
    if (valid_error != "") {
        errorMsg["error"] = valid_error
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
    let valid_error = valid_input_p2sh(req.body["m"],req.body["n"]);

    if (valid_error != "") {
        errorMsg["error"] = valid_error
        res.send(errorMsg)
        return
    }

    const walletAddress = GenerateMultiSig_P2SH(req.body["m"], req.body["n"])

    const responseArray = {
        "address" : walletAddress
    }
    res.send(responseArray);
});



app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});