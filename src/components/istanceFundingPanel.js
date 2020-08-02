import {useState} from "react";
import FundingPanel from '../SeedVentureContractsJson/FundingPanel.json'
import Web3 from "web3";
let web3 = new Web3(window.web3.currentProvider);

export const IstanceFundingPanel = () =>{

    const [fundingPanelContract, setFundingPanelContract] = useState()

    const getFundingPanelContract = async (addrFundingPanel1) =>{
        const addrFundingPanel = '0xE9330eBC4C05fb6b73AF7551745CF1Fb6A4091dD';
        const fundingPanelCon = new web3.eth.Contract(FundingPanel,addrFundingPanel1);
        setFundingPanelContract(fundingPanelCon);
       
    }

    return [fundingPanelContract, setFundingPanelContract,getFundingPanelContract];
   
}

export default IstanceFundingPanel;