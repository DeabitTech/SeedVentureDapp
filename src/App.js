import React from 'react';
import { useEffect, useState } from 'react';
import IPFS from 'ipfs';
import cryptoJs from 'crypto-js/';
import ConnectMetamask from './components/connectMetamask';
import SimplyBar from './components/simplyBar';
import IncubatorSetup from './components/incubatorSetup';
import Incubatorcards from './components/incubatorCards';
import IstanceFactoryContract from './components/istanceFactoryContract';
import IstanceAdminToolsContract from './components/istanceAdminToolContact';
import IstanceFundingPanel from './components/istanceFundingPanel';
import IstanceTokenContract from './components/istanceTokenContract';
import { Typography, Button } from '@material-ui/core';
import Web3 from "web3";

const web3 = new Web3(window.web3.currentProvider);

const App = ()=> {

  const [account,setAccount,autorizeApp] = ConnectMetamask();
  const [factoryContract, setFactoryContract,getFactoryContract] = IstanceFactoryContract();
  const [adminToolsContract, setAdminToolsContract,getAdminToolsContract] = IstanceAdminToolsContract();
  const [fundingPanelContract, setFundingPanelContract,getFundingPanelContract] = IstanceFundingPanel();
  const [tokenContact, setTokenContract,getTokenContract] = IstanceTokenContract();
  const [immagineCard,setImmagine] = useState();
  const [descrizioneCard,setDescrizione] = useState();
  const [nomeIncubatoreCard,setNomeIncubatore] = useState();
  const [contractvalues, setContractVal] = useState({walletOnTop:'', whitelistAmount:0, exRate:0, exRateTop:0})
  const [ipfsValues, setIpfsValues] = useState();
  const [detail,setDetail] = useState();
  const [isOk,setIsOk] = useState(false);
 

  useEffect(()=>{
    autorizeApp()
    getFactoryContract()
    getAdminToolsContract()
    getFundingPanelContract()
    getTokenContract()
    
   
  },[])

  

  const deployIncubator = async (nomeIncubatore,symbolToken,ipfsUrl,dochash,exRate,exRateTop,totSupply,whitelistToken) => {
    let adminToolAddress = "1";
    let tokenAddress = "2";
    let fundingPanel = "3";
    let listContract;
    
    let createIncubator = await factoryContract.methods.
    deployPanelContracts(nomeIncubatore,symbolToken,ipfsUrl,dochash,exRate,exRateTop,totSupply,whitelistToken).send({from:account}).catch((e)=> console.log(e));
    console.log(JSON.stringify(createIncubator.events.NewPanelCreated.returnValues))
    listContract = createIncubator === undefined ? null : createIncubator.events.NewPanelCreated.returnValues;
    console.log('lista contratti ' , JSON.stringify(listContract))
    getAdminToolsContract(listContract[adminToolAddress])
    getFundingPanelContract(listContract[fundingPanel])
    getTokenContract(listContract[tokenAddress])

    return listContract;
    
  }

  const updateCards = (ipfsParams, imgUp) =>{
      setNomeIncubatore(ipfsParams.nomeIncubatore)
      setImmagine(URL.createObjectURL(imgUp))
      setDescrizione(ipfsParams.descrizione)
      console.log('ma parte?')
      setIsOk(true)
  }

  const getIpfsLink = async (ipfsParams, imgUp) =>{
    const reader = new FileReader();
    reader.readAsDataURL(imgUp);
    reader.onload = () => { ipfsParams.logoIncubator = reader.result }
    let objReturn = {}
    let ipfslink = 'https://ipfs.io/ipfs/'
    const node = await IPFS.create()
    let params = JSON.stringify(ipfsParams)
    let cid = await node.add(params)
    ipfslink += cid.path;
    console.log(ipfslink)
    node.stop()
    setIpfsValues(ipfsParams)
    objReturn.link = ipfslink;
    objReturn.hash = "0x7465737445603252764742470237437456443774323573221345673254374342"//web3.utils.fromAscii(cid.path);
    return objReturn;
     
  }

  const getContractDetails = async () =>{
    let objReturn;
    console.log(await adminToolsContract.methods.getWalletOnTopAddress().call(), 
    await adminToolsContract.methods.getWLThresholdBalance().call(),
    await fundingPanelContract.methods.exchangeRateSeed().call(),
    await fundingPanelContract.methods.exchangeRateOnTop().call())
    setContractVal({
      walletOnTop: await adminToolsContract.methods.getWalletOnTopAddress().call(),
      whitelistAmount: await adminToolsContract.methods.getWLThresholdBalance().call(),
      exRate: await fundingPanelContract.methods.exchangeRateSeed().call(),
      exRateTop: await fundingPanelContract.methods.exchangeRateOnTop().call()
    })

    objReturn = contractvalues;

    return objReturn;
  }

  return (
    <div>
      <SimplyBar/>
        <div style={{marginTop:'2%'}}>
          <IncubatorSetup deployIncubator={deployIncubator} updateInc={updateCards} getIpfsLink={getIpfsLink}/>
        </div>
        <div style={{textAlign:'center', marginTop:'5%'}}>
          <Typography variant="h4" color="textSecondary">Incubatori Disponibili</Typography>
        </div>
        <div style={{marginTop:'2%'}}>
          <Incubatorcards isOk={isOk} 
          immagine={immagineCard !== undefined ? immagineCard : null} 
          descrizione={descrizioneCard !== undefined ? descrizioneCard :null}
          nomeIncubatore={nomeIncubatoreCard}
          detailIncubator={ipfsValues}
          detailFromContracts={getContractDetails}
         />
        </div>
       
        <div style={{marginTop:'27%'}}>
      <footer>
      <Typography variant="h4" color="textSecondary">Powered by DeaBit SRL</Typography>
      </footer>  
      </div>
    </div>
  );
} 

export default App;
