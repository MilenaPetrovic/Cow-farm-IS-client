import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function Pasos(params){
    const [brojPasosa, setBrojPasosa] = React.useState('')
    const [idZivotinje, setIdZivotinje] = React.useState('')
    const [datumIzdavanja, setDatumIzdavanja] = React.useState(Date.now)
    const [pasos, setPasos] = React.useState({brojPasosa: ''})

    const [openAlert, setOpenAlert] = React.useState('')
    const [tekstAlerta, setTekstAlerta] = React.useState('')
    const [tipAlerta, setTipAlerta] = React.useState('')

    const otvoriAlert = (tekst, tip) => {
        setOpenAlert(true)
        setTekstAlerta(tekst)
        setTipAlerta(tip)
    }

    const zatvoriAlert = () => {
        setOpenAlert(false)
    }

    const ruta = 'http://localhost:4500/pasosi'

    const handle_brojPasosa = (event) => {
        setBrojPasosa(event.target.value)
    }

    const handle_idZivotinje = (event) => {
        setIdZivotinje(event.target.value)
    }
    
    const handle_datumIzdavanja = (event) => {
        setDatumIzdavanja(event.target.value)
    }
    
    const handle_btnPretrazi = () => {
        if(brojPasosa.trim() === ''){
            otvoriAlert("Unesite broj pasosa!", "error")
            return;
        }

        fetch(`${ruta}/${brojPasosa}`)
        .then( (res) => {
            return res.json();
        })
        .then ( (res) => {
            if(res.brojPasosa === undefined){
                otvoriAlert(res.message, "error")
                return;
            }
            setDatumIzdavanja(res.datumIzdavanja)
            setIdZivotinje(res.idZivotinje)
        })
    }

    const handle_sacuvaj = () => {
        if(brojPasosa.trim() === '' || idZivotinje.trim() === '' || datumIzdavanja.trim() === ''){
            otvoriAlert("Unesite sve podatke!", "error")
            return;
        }

        pasos.brojPasosa = brojPasosa
        pasos.idZivotinje = idZivotinje
        pasos.datumIzdavanja = datumIzdavanja

        fetch(`${ruta}/${brojPasosa}`)
        .then( (res) => {
            return res.json();
        })
        .then ( (res) => {
            if(res.brojPasosa === undefined){
                kreirajPasos()
            } else {
                azurirajPasos()     
            }
        })
    }

    const azurirajPasos = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify(pasos);
        
        var requestOptions = {
          method: 'PATCH',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch(`${ruta}/${brojPasosa}`, requestOptions)
          .then(response => response.json())
          .then(result => {
                otvoriAlert(result.message, "success")
                pocisti()
          })
          .catch(error => otvoriAlert(error, "error"));
    }

    const kreirajPasos = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(pasos);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(ruta, requestOptions)
        .then(response => response.json())
        .then(result => {
            otvoriAlert(result.message, "success")
            pocisti()
        })
        .catch(error => otvoriAlert(error, "error"));
        
    }

    const pocisti = () => {
        setBrojPasosa('')
        setDatumIzdavanja(Date.now)
        setIdZivotinje('')
        setPasos({brojPasosa:''})
    }



    return(
        <div className = "pasos">
            <br/>
            <Typography className="title" variant="h3" component="h2">
                Pasoš
            </Typography>
            <br/>
            <br/>
            <TextField value = {brojPasosa} id="outlined-basic" label="Broj Pasoša" variant="outlined"
                onChange = {handle_brojPasosa} name="brojPasosa" className="unos"
            />
            <Button variant="outlined" size = "large"
                onClick = {handle_btnPretrazi} name="btnPretrazi"
            >Pretraži</Button>
            <br/>
            <TextField value = {idZivotinje} id="outlined-basic" label="ID Životinje" variant="outlined"
                onChange = {handle_idZivotinje} name="idZivotinje" className="unos"
            />
            <TextField
                value = {formatDate(datumIzdavanja)}
                id="date"
                label="Datum izdavanja"
                type="date"
                variant="outlined"
                InputLabelProps={{
                shrink: true,
                }}
                onChange = {handle_datumIzdavanja}
                className="unos"
            />
            <br/>
            <br/>            
            <Button variant="outlined" size = "large"
                onClick = {handle_sacuvaj} name = "btnSacuvaj"
            >Sačuvaj pasoš</Button>

            {
                openAlert ? 
                <Snackbar open={openAlert} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    autoHideDuration={2000} onClose={zatvoriAlert}>
                    <Alert severity={tipAlerta}>
                        {tekstAlerta}
                    </Alert>
                </Snackbar>
                :
                <div></div> 
            }
        </div>
    )
}

export default Pasos