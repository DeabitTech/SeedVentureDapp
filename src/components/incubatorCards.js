import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DetailIncubator from './detailIncubator';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginLeft: '2%'
  }
});


const Incubatorcards = (props) => {
  const classes = useStyles();
  const [openModal,setOpen] = useState(false)
  const [detail,setDetail] = useState();
  const [detailFromContract, setDetailFromContract] = useState();
  const [nomeInc,setNomeInc] = useState();
  const [desc,setDesc] = useState();
  const [symb,setSymb] = useState();
  const [url,setUrl] = useState();



  const detailInc = async () =>{
      const detailFromIpfs = props.detailIncubator
      const detailFromContracts = await props.detailFromContracts()
      console.log('vediamo cosa cè qui',detailFromContracts)
      setDetail(detailFromIpfs)
      setDetailFromContract(detailFromContracts)
      setOpen(true)
  }
  
 const close = () =>{
   setOpen(false)
 }


  return  props.isOk === false ? null : (
    <div>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={props.immagine}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
           {props.nomeIncubatore}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.descrizione}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={detailInc}>
          Scopri di più!
        </Button>
      </CardActions>
    </Card>
    <DetailIncubator openMod={openModal} 
    closeMod={close}
    immagine={props.immagine}
    {...detail}
    {...detailFromContract}/>
    </div>
  );
}

export default Incubatorcards;
