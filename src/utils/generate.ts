const { randomBytes } = require("crypto");
const { HDKey } = require("wallet.ts");
import * as bitcoin from "bitcoinjs-lib";
const wif = require("wif")

export function GenerateHD_SegWit(seedNumber: number , path : string) {

    const masterKeywithPathPrivateKey = GenerateMasterKey(seedNumber,path);

    const childKey = HDKey.parseExtendedKey(masterKeywithPathPrivateKey);
    const wallet = childKey.derive("0");
    const wifKey = WifEncode(wallet.privateKey)
    const keyPair = GetPairFromWif(wifKey);
    const address = GenerateP2WPKHAddress(keyPair.publicKey);

    return address;
}


export function GenerateMultiSig_P2SH( M: number, N:number) {
    const pubkeysArray = []
    for(let i = 0; i < N;i++) {
        const keyPair = GenerateKeyPairbyECPair();
        pubkeysArray.push(keyPair.publicKey)
    }
    const address = GenerateP2SHAddress(M,pubkeysArray)

    return address
}


export function GenerateKeyPairbyECPair() {
    return bitcoin.ECPair.makeRandom();
}


export function GenerateMasterKey(seedNumber : number, path : string) {
     let masterKey = HDKey.parseMasterSeed(randomBytes(seedNumber))
     return masterKey.derive(path).extendedPrivateKey;
}

export function WifEncode(privateKey : any) {
   return wif.encode(128, privateKey, true)
}

export function GetPairFromWif(wifKey : any) {
    return bitcoin.ECPair.fromWIF(wifKey);
}
export function GenerateP2WPKHAddress(publicKey :Buffer) {
    try {
        const {address} = bitcoin.payments.p2wpkh({ pubkey: publicKey });
        return address
    }
    catch (err) {
        return err
    }
     
}

export function GenerateP2SHAddress(M : number, pubkeysArray : Buffer[]) {
    try {
        const {address} = bitcoin.payments.p2sh({
            redeem: bitcoin.payments.p2ms({ m: M, pubkeys : pubkeysArray}),
        });
        return address
    }
    catch (err) {
        return err
    }
     
}