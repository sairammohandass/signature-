import{Keypair,PublicKey} from "@solana/web3.js"
import * as nacl from "tweetnacl"
import * as fs from "fs";
import bs58 from 'bs58';


(async ()=>{
    const kp = Keypair.fromSecretKey(
        bs58.decode("5MaiiCavjCmn9Hs1o3eznqDEhRwxo7pXiAYez7keQUviUkauRiTMD8DrESdrNjN8zd9mTmVhRvBJeg5vhyvgrAhG")
    )
        const message="please sign this transaction";
        const signature= signMessage(message,kp);
        console.log(signature);
})();

function signMessage(message:string,signer:Keypair){
    
    const messageBytes = new TextEncoder().encode(message);

    const signature = nacl.sign.detached(messageBytes, signer.secretKey);
    return bs58.encode(signature)
}
function verifyMessage(signature:string,message :string,signer:PublicKey){
    const messageBytes = new TextEncoder().encode(message);
    const result = nacl.sign.detached.verify(
        messageBytes,
       bs58.decode(signature),
       signer.toBytes()
);  

console.log(result);

    
}