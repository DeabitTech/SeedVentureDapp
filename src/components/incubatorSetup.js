import React,{useState} from 'react';
import { makeStyles,ExpansionPanel,ExpansionPanelSummary,ExpansionPanelDetails,Typography,Box,TextField,Button } from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';  



const useStyles = makeStyles((theme) => ({
    root: {
        width: '90%',
        marginLeft: '5%'
        

    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightRegular,
    },
    button: {
        margin: theme.spacing(1),
    },
    fieldCss: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
          }
    },
    input: {
        display: 'none',
    }
}));



 const IncubatorSetup = (props) => {
    const classes = useStyles();
    const [immagine,setImmagine] = useState(null);
    const [imgUploadted,setImgUploadted] = useState();
    const [ipfsParams,setIpfsParams] = useState({nomeIncubatore:"",descrizione:"",simbolToken:"",urlSite:"",logoIncubator:""});
    const [contractParams, setContractParams] = useState({nomeIncubatore: ipfsParams.nomeIncubatore, simbolToken: ipfsParams.simbolToken, 
                                                            exRate:0, exRateTop:0, totSupply:0, whitelist:0})
    
    const valueInputDeposit =(event) =>{
        let img;
        if(event.target.files !== null){img = URL.createObjectURL(event.target.files[0]); setImgUploadted(event.target.files[0]);}  
        if(immagine === null ||immagine === undefined ){setImmagine(img)} 
       setIpfsParams({...ipfsParams,[event.target.id]:event.target.value}) 
       setContractParams({...contractParams,[event.target.id]:event.target.value})
       
    }

    const deployIncubatore = async () =>{
        const ipfslink = await props.getIpfsLink(ipfsParams, imgUploadted)  
        console.log(ipfsParams.nomeIncubatore,ipfsParams.simbolToken,ipfslink.link,ipfslink.hash,contractParams.exRate,contractParams.exRateTop,contractParams.totSupply,contractParams.whitelist)
        await props.deployIncubator(ipfsParams.nomeIncubatore,ipfsParams.simbolToken,ipfslink.link,ipfslink.hash,contractParams.exRate,contractParams.exRateTop,contractParams.totSupply,contractParams.whitelist )
        props.updateInc(ipfsParams,imgUploadted)
    }

     

    

    return (
        <Box className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Vuoi creare un nuovo Incubatore?</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                        <Typography variant="h6" color="textSecondary"> Inserisci le informazioni inerenti al tuo nuovo incubatore</Typography>
                    </div>
                    
                </ExpansionPanelDetails>
                <ExpansionPanelDetails >
                        <div className={classes.fieldCss}>
                            <Typography variant="h5" color="textSecondary">Info Incubatore</Typography>
                            <TextField onChange={valueInputDeposit} required id="nomeIncubatore" placeholder="Nome Incubatore"  color="primary"/>
                            <TextField onChange={valueInputDeposit} required id="descrizione" placeholder="Descrizione"  color="primary"/>
                            <TextField onChange={valueInputDeposit} required id="simbolToken" placeholder="Symbol"  color="primary"/>
                            <TextField onChange={valueInputDeposit} required id="urlSite" placeholder="Sito dell' incubatore"  color="primary"/>
                        </div>
                        <div className={classes.fieldCss}>
                        <Typography variant="h5" color="textSecondary">Token Params</Typography>
                            <TextField onChange={valueInputDeposit} required id="exRate" placeholder="Exchange rate"  color="primary"/>
                            <TextField onChange={valueInputDeposit} required id="exRateTop" placeholder="Exchange rate on Top"  color="primary"/>
                            <TextField onChange={valueInputDeposit} required id="totSupply" placeholder="Total Supply Token"  color="primary"/>
                            <TextField onChange={valueInputDeposit} required id="whitelist" placeholder="Whitelist Token"  color="primary"/>
                            <br/>
                            <br/>
                            <br/>
                            <Button variant="contained" color="primary" onClick={deployIncubatore}>Deploy Incubatore</Button>
                        </div>
                        <input accept="image/*" className={classes.input} id="contained-button-file" multiple type="file" onChange={valueInputDeposit}/>
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="secondary" component="span">
                                Upload Logo
                            </Button>
                            <br/>
                            <br/>
                            <br/>
                            <img style={{width:'150px'}} src={immagine}/>
                        </label>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            

        </Box>
    );
}

export default IncubatorSetup;