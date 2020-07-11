import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
        if(brojPasosa === ''){
            alert("Unesite broj pasosa!")
            return;
        }

        fetch(`${ruta}/${brojPasosa}`)
        .then( (res) => {
            return res.json();
        })
        .then ( (res) => {
            if(res.brojPasosa === undefined){
                alert(res.message)
                return;
            }
            setDatumIzdavanja(res.datumIzdavanja)
            setIdZivotinje(res.idZivotinje)
        })
    }

    const handle_unesiNovi = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"brojPasosa":brojPasosa,"datumIzdavanja":datumIzdavanja,"idZivotinje":idZivotinje});

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(ruta, requestOptions)
        .then(response => response.json())
        .then(result => alert("Novi pasos je sacuvan!"))
        .catch(error => console.log('error', error));
    }

    return(
        <div className = "pasos">
            <br/>
            <Typography className="title" variant="h3" component="h2">
                Pasoš
            </Typography>
            <br/>
            <br/>
            <TextField value = {brojPasosa} id="outlined-basic" label="brojPasosa" variant="outlined"
                onChange = {handle_brojPasosa} name="brojPasosa" className="unos"
            />
            <Button variant="outlined" size = "large"
                onClick = {handle_btnPretrazi} name="btnPretrazi"
            >Pretrazi</Button>
            <br/>
            <TextField value = {idZivotinje} id="outlined-basic" label="idZivotinje" variant="outlined"
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
                onClick = {handle_unesiNovi} name = "btnUnesi"
            >Unesi novi pasos</Button>
        </div>
    )
}

export default Pasos