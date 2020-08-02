import {useState} from "react";
import AdminTools from '../SeedVentureContractsJson/AdminTools.json'
import Web3 from "web3";
let web3 = new Web3(window.web3.currentProvider);

export const IstanceAdminToolsContract = () =>{

    const [adminToolsContract, setAdminToolsContract] = useState()

    const getAdminToolsContract = async (addrAdminTools1) =>{
        const addrAdminTools = '0xb14323aFD63A14bc389511443Bc69c0371742e68';
        const adminToolCon = new web3.eth.Contract(AdminTools,addrAdminTools1);
        setAdminToolsContract(adminToolCon);
        console.log(await adminToolCon.methods);
    }

    return [adminToolsContract, setAdminToolsContract,getAdminToolsContract];
   
}

export default IstanceAdminToolsContract;
