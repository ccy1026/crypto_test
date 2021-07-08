import { expect } from 'chai';
import { getAddressInfo } from 'bitcoin-address-validation';
import {GenerateHD_SegWit, GenerateMultiSig_P2SH} from '../src/utils/generate'
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
    it("Success generate HD SegWit address seed = 5 path = m/44'/60'/0'/0/0", function() {
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
    it("Success generate MultiSig_P2SH address ", function() {
        let result = GenerateMultiSig_P2SH(5,6)
        let genAddr:string = result || ''
        let data = getAddressInfo(genAddr)
        console.log("MultiSig_P2SH address : ", genAddr)
        expect(data.type).equal("p2sh")
    
        })    
 
})


