import { expect } from 'chai';
import { validate, getAddressInfo } from 'bitcoin-address-validation';
import {GenerateHD_SegWit, GenerateMultiSig_P2SH, GenerateKeyPairByECPair,GenerateMasterKey,GenerateP2WPKHAddress,GenerateP2SHAddress,WifEncode, GetPairFromWif} from '../src/utils/generate'
import {valid_input_p2sh , valid_input_hd_sig_wit} from '../src/utils/validation'


describe('Generate HD SegWit address', function(){
    it("Seed data type is wrong and throw error", function() {
        let result = valid_input_hd_sig_wit("a", "m/44'/60'/0'/0/0")
        expect(result).equal("seed is not a number")

    }),
    it("Path is wrong and throw error", function() {
        let result = valid_input_hd_sig_wit(1, "a")
        expect(result).equal("path is not a string or is not valid")
    }),
    it("Seed and path is wrong and throw error", function() {
        let result = valid_input_hd_sig_wit("a", "b")
        expect(result).equal("seed is not a number")
    }),
    it("Success Encode key to WIF", function(){
        const keyPair = GenerateKeyPairByECPair();
        let wifKey = WifEncode(keyPair.privateKey)
        expect(wifKey).not.contain("Fail to encode the wif key")
    }),
    it("Success throw error when Encode key to WIF failed", function(){
        let wifKey = WifEncode("test")
        expect(wifKey).contain("Fail to encode the wif key")
    }),
    it("Generate master Key with seed and path", function(){
        let key = GenerateMasterKey( 5, "m/44'/60'/0'/0/0")
        expect(key).not.null
    })
    it("Generate address by public key", function(){
        let keypair = GenerateKeyPairByECPair()
        let address = GenerateP2WPKHAddress(keypair.publicKey)
        let genAddr:string = address || ''
        expect(validate(genAddr)).equal(true)
    })
    it("Success throw error by generate P2WPKH Address", function () {
        let address = GenerateP2WPKHAddress("123")
        expect(address).contain("Fail to generate P2WPKH address")
    })
    it("Success Get publicKey from WIF", function(){
        const keyPair = GenerateKeyPairByECPair();
        let wifKey = WifEncode(keyPair.privateKey)
        let pair = GetPairFromWif(wifKey)
        expect(Buffer.isBuffer(pair)).true
    })
    it("Success Throw Error when Fail Get pair from WIF", function(){
        let pair = GetPairFromWif(12345)
        expect(pair).contain("Fail to get the wif key from pair")
    })

    it("Success generate HD SegWit address seed = 5 path = m/44'/60'/0'/0/0 (Full run)", function() {
        let result = GenerateHD_SegWit( 5, "m/44'/60'/0'/0/0" )
        let genAddr:string = result || ''
        let data = getAddressInfo(genAddr)
        console.log("HD SegWit address : ", genAddr)
        expect(data.type).equal("p2wpkh")
        })
    
})

describe('Generate Multi Sig P2SH address', function(){
    it("Test verify the data type of input M < N", function() {
        let result = valid_input_p2sh(5,6)
        expect(result).equal("")

    }),
    it("Verify Pubkey count cannot be less than m", function() {
        let result = valid_input_p2sh(6,5)
        expect(result).equal("Pubkey count cannot be less than m")

    }),

    it("Success generate random seed keypair", function(){
        let keypair = GenerateKeyPairByECPair()
        expect(keypair.publicKey).not.null
    })
    it("Generate P2SH address by m and n of public key", function(){
        let M = 3
        const pubkeysArray = []
        for(let i = 0; i < M;i++) {
            const keyPair = GenerateKeyPairByECPair();
            pubkeysArray.push(keyPair.publicKey)
        }
        let address = GenerateP2SHAddress(M,pubkeysArray)
        let genAddr:string = address || ''
        let data = getAddressInfo(genAddr)
        expect(data.type).equal("p2sh")
    })
    it("Success generate MultiSig_P2SH address(Full run)", function() {
        let result = GenerateMultiSig_P2SH(5,6)
        let genAddr:string = result || ''
        let data = getAddressInfo(genAddr)
        console.log("MultiSig_P2SH address : ", genAddr)
        expect(data.type).equal("p2sh")
    
        })    
 
})


