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


const StatupSetup = ()=>{
    const classes = useStyles();
    const [immagine,setImm] = useState()
    return (
        <Box className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Vuoi creare un nuova StartUp?</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                        <Typography variant="h6" color="textSecondary"> Inserisci le informazioni inerenti alla tua StartUp</Typography>
                    </div>
                    
                </ExpansionPanelDetails>
                <ExpansionPanelDetails >
                        <div className={classes.fieldCss}>
                        </div>
                        <div className={classes.fieldCss}>
                        </div>
                        <input accept="image/*" className={classes.input} id="contained-button-file" multiple type="file" />
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

export default StatupSetup;