export function valid_input_p2sh(m: any , n: any) {
    let errorMsg = ""
    if (typeof n != "number") {
        errorMsg = "n is not a number"
        return errorMsg
    }
    if (typeof m != "number") {
        errorMsg = "m is not a number"
        return errorMsg
    }
    if (n < m) {
        errorMsg = "Pubkey count cannot be less than m"
        return errorMsg
    }

    return errorMsg
}

export function valid_input_hd_sig_wit(seed : any , path : any) {
    let errorMsg = ""
    if (typeof seed != "number") {
        errorMsg = "seed is not a number"
        return errorMsg
    }
     const regexp = new RegExp('m/\/*')
     const isValid = regexp.test(path)

    if ((typeof path != "string") ||  (isValid == false) || (path[0] != "m")){
         errorMsg = "path is not a string or is not valid"
         return errorMsg
    }
    return errorMsg
}