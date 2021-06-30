"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateMultiSig_P2SH = exports.GenerateHD_SegWit = void 0;
var randomBytes = require("crypto").randomBytes;
var HDKey = require("wallet.ts").HDKey;
var bitcoin = __importStar(require("bitcoinjs-lib"));
var wif = require("wif");
function GenerateHD_SegWit(seedNumber, path) {
    var masterKey = HDKey.parseMasterSeed(randomBytes(seedNumber));
    var withPathPrivateKey = masterKey.derive(path).extendedPrivateKey;
    var childKey = HDKey.parseExtendedKey(withPathPrivateKey);
    var wallet = childKey.derive("0");
    var wifKey = wif.encode(128, wallet.privateKey, true);
    var keyPair = bitcoin.ECPair.fromWIF(wifKey);
    var address = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey }).address;
    return address;
}
exports.GenerateHD_SegWit = GenerateHD_SegWit;
function GenerateMultiSig_P2SH(N, M) {
    var pubkeysArray = [];
    for (var i = 0; i < N; i++) {
        var keyPair = bitcoin.ECPair.makeRandom();
        pubkeysArray.push(keyPair.publicKey);
    }
    var address = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2ms({ m: M, pubkeys: pubkeysArray }),
    }).address;
    return address;
}
exports.GenerateMultiSig_P2SH = GenerateMultiSig_P2SH;
