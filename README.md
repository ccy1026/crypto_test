# **Init the test**

    npm install

# **Start the program**

    npm run start

# **Start the test**

    npm run test

#API server IP

    http://localhost:8080/

# **Open API Docs**

Open the file api_docs.yaml with VS Code and run "Preview Swagger"



##Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin address API:

#### POST Request to 
    http://localhost:8080/hd_sig_wit

**The request body is JSON, seed is integer and path is string. Here is the example**

    { 
        "seed" : 5, 
        "path" : "m/44'/60'/0'/0/0" 
    }


##Multisignature (multi-sig) Pay-To-Script-Hash (P2SH) bitcoin address API:
####POST Request to 
    http://localhost:8080/multi_sig_p2sh


**Request body is JSON, m and n is integer. Here is the example**
 


    { 
        "m" : 5, 
        "n" : 6
    }
