import React,{useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import StartupSetup from './startupSetup';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const DetailIncubator = (props)=> {
  const [open, setOpen] = useState(props.openMod);

 
  const handleClose = () => {
    props.closeMod()
  };

   
     

  return (
    <div>
     
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.openMod}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Dettagli Incubatore
        </DialogTitle>
        <DialogContent dividers>
        <img style={{width:'200px'}} src={props.immagine}/>
            
            <Typography variant="h6" color="textSecondary">Nome Incubatore: <b>{props.nomeIncubatore}</b></Typography>
            <Typography variant="h6" color="textSecondary">Simbolo Token: <b>{props.simbolToken}</b></Typography>
            <Typography variant="h6" color="textSecondary">Descrizione Incubatore: <b>{props.descrizione}</b></Typography>
            <Typography variant="h6" color="textSecondary">Sito Incubatore: <a href={props.urlSite}>{props.urlSite}</a></Typography>
            <Typography variant="h6" color="textSecondary">Wallet On Top: <b>{props.walletOnTop}</b></Typography>
            <Typography variant="h6" color="textSecondary">Whitelist Amount: <b>{props.whitelistAmount}</b> </Typography>
            <Typography variant="h6" color="textSecondary">Exchange Rate: <b>{props.exRate}</b></Typography>
            <Typography variant="h6" color="textSecondary">Exchange Rate On Top: <b>{props.exRateTop}</b></Typography>
            
            <StartupSetup/>
          </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Chiudi
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DetailIncubator;

