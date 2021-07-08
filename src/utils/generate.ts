const { randomBytes } = require("crypto");
const { HDKey } = require("wallet.ts");
import * as bitcoin from "bitcoinjs-lib";
const wif = require("wif")

export function GenerateHD_SegWit(seedNumber: number , path : string) {
    const masterKey = HDKey.parseMasterSeed(randomBytes(seedNumber));
    const withPathPrivateKey = masterKey.derive(path).extendedPrivateKey;
    const childKey = HDKey.parseExtendedKey(withPathPrivateKey);
    const wallet = childKey.derive("0");
    const wifKey = wif.encode(128, wallet.privateKey,true)
    const keyPair = bitcoin.ECPair.fromWIF(wifKey);
    const {address} = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey });

    return address;
}

export function GenerateMultiSig_P2SH(N:number, M: number) {
    const pubkeysArray = []
    for(let i = 0; i < N;i++) {
        const keyPair = bitcoin.ECPair.makeRandom();
        pubkeysArray.push(keyPair.publicKey)
    }

    const { address } = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2ms({ m: M, pubkeys : pubkeysArray}),
    });
    return address
}