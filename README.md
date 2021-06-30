# crypto_test

# **Init the test**

    npm install

# **Start the program**

    npm run start

### The program will listen to 8080 port

API server is http://localhost:8080/

##Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin address API:

###### POST Request to http://localhost:8080/hd_sig_wit
Request body is JSON

**Here is the example**

seed is integer and path is string

    { 
        "seed" : 5, 
        "path" : "m/44'/60'/0'/0/0" 
    }


##Multisignature (multi-sig) Pay-To-Script-Hash (P2SH) bitcoin address API:
###### POST Request to http://localhost:8080/multi_sig_p2sh
Request body is JSON

**Here is the example**
 
m and n is integer

    { 
        "m" : 5, 
        "n" : 6
    }
