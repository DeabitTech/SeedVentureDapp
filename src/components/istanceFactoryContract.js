import {useState} from "react";
import Factory from '../SeedVentureContractsJson/Factory.json'
import Web3 from "web3";
let web3 = new Web3(window.web3.currentProvider);

export const IstanceFactoryContract = () =>{

    const [factoryContract, setFactoryContract] = useState()

    const getFactoryContract = async () =>{
        const addrFactory = '0xf5b5042766eeb6dfc5ba8ebbafc61df26f0901da';//ropsten address..
        const factoryCon = new web3.eth.Contract(Factory,addrFactory);
        setFactoryContract(factoryCon);
        console.log(await factoryCon.methods);
    }

    return [factoryContract, setFactoryContract,getFactoryContract];
   
}

export default IstanceFactoryContract;