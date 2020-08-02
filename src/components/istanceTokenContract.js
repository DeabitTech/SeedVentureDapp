import {useState} from "react";
import BasicERC20 from '../SeedVentureContractsJson/BasicToken.json'
import Web3 from "web3";
let web3 = new Web3(window.web3.currentProvider);

export const IstanceTokenContract = () =>{

    const [tokenContact, setTokenContract] = useState()

    const getTokenContract = async (addrToken1) =>{
        const addrToken = '0x1a29a25535736574f0ABE62CC0daA0C037dD666C';
        const tokenCon = new web3.eth.Contract(BasicERC20,addrToken1);
        setTokenContract(tokenCon);
       
    }

    return [tokenContact, setTokenContract,getTokenContract];
   
}

export default IstanceTokenContract;