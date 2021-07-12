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
    const address = GenerateP2WPKHAddress(keyPair);

    return address;
}


export function GenerateMultiSig_P2SH( M: number, N:number) {
    let pubKeysArray = []
    for(let i = 0; i < N;i++) {
        let keyPair = GenerateKeyPairByECPair();
        pubKeysArray.push(keyPair.publicKey)
    }
    const address = GenerateP2SHAddress(M,pubKeysArray)

    return address
}


export function GenerateKeyPairByECPair() {
    return  bitcoin.ECPair.makeRandom();
}


export function GenerateMasterKey(seedNumber : number, path : string) {
    try {
        let masterKey = HDKey.parseMasterSeed(randomBytes(seedNumber))
        let childKey =  masterKey.derive(path).extendedPrivateKey;
        return childKey
    }catch (err) {
        return err
    }


}

export function WifEncode(privateKey : any) {
    try {
        let wifKey = wif.encode(128, privateKey, true)
        return wifKey
    }catch (err) {
        let msg = "Fail to encode the wif key. Error :"+ err
        return msg
    }

}

export function GetPairFromWif(wifKey : any) {
    try {
        let keyPair = bitcoin.ECPair.fromWIF(wifKey);
        return keyPair.publicKey
    }catch (err) {
        let msg = "Fail to get the wif key from pair. Error :"+ err
        return msg
    }
}
export function GenerateP2WPKHAddress(publicKey :any) {
    try {
        const {address} = bitcoin.payments.p2wpkh({ pubkey: publicKey });
        return address
    }
    catch (err) {
        let msg = "Fail to generate P2WPKH address. Error : "+ err
        return msg
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