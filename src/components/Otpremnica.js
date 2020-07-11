import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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

function Otpremnica(params){
    const [brojOtpremnice, setBrojOtpremnice] = React.useState('')
    const [skladiste, setSkladiste] = React.useState('')
    const [datumOtpremnice, setDatumOtpremnice] = React.useState(Date.now)
    const [vozac, setVozac] = React.useState('')
    const [pttMesta, setPttMesta] = React.useState('')
    const [sifraMlekare, setSifraMlekare] = React.useState('')
    const [nazivMlekare, setNazivMlekare] = React.useState('')
    const [naziv, setNaziv] = React.useState('')
    const [kolicina, setKolicina] = React.useState(0)
    const [jedinicaMere, setJedinicaMere] = React.useState('')

    const ruta = 'http://localhost:4500/'

    const handle_brojOtpremnice = (event) => {
        setBrojOtpremnice(event.target.value)
    }

    const handle_skladiste = (event) => {
        setSkladiste(event.target.value)
    }

    const handle_datumOtpremnice = (event) => {
        setDatumOtpremnice(event.target.value)
    }

    const handle_vozac = (event) => {
        setVozac(event.target.value)
    }
    
    const handle_pttMesta = (event) => {
        setPttMesta(event.target.value)
    }

    const handle_sifraMlekare = (event) => {
        setSifraMlekare(event.target.value)
    }

    const handle_nazivMlekare = (event) => {
        setNazivMlekare(event.target.value)
    }
    
    const handle_btnPronadjiMlekaru = () => {
        if(sifraMlekare === ''){
            alert("Unesite sifru mlekare!")
            return;
        }

        fetch(`${ruta}mlekare/${sifraMlekare}`)
        .then( (res) => {
            return res.json();
        })
        .then ( (res) => {
            if(res.sifraMlekare === undefined){
                alert(res.message)
                return;
            }
            setNazivMlekare(res.nazivMlekare)
        })
    }

    const handle_naziv = (event) => {
        setNaziv(event.target.value)
    }

    const handle_kolicina = (event) => {
        setKolicina(event.target.value)
    }

    const handle_jedinicaMere = (event) => {
        setJedinicaMere(event.target.value)
    }


    return(
        <div className="otpremnica">
            <br/>
            <Typography className="title" variant="h3" component="h2">
                Otpremnica
            </Typography>
            <br/>
            <br/>
            <div className="osnovneInfo">
                <Grid container spacing={2}>
                    <Grid container item xs={12} spacing={3}>
                    <React.Fragment>
                        <Grid item xs={4}>
                        <TextField value = {brojOtpremnice} id="outlined-basic" label="brojOtpremnice" variant="outlined"
                            onChange = {handle_brojOtpremnice} name="brojOtpremnice" className="unos"
                        />
                        </Grid>
                        <Grid item xs={4}>
                        <TextField value = {sifraMlekare} id="outlined-basic" label="sifraMlekare" variant="outlined"
                            onChange = {handle_sifraMlekare} name="sifraMlekare" className="unos"
                        />
                        </Grid>
                        <Grid item xs={4}>
                        <Button variant="outlined" size = "large" className="button"
                            onClick = {handle_btnPronadjiMlekaru} name="btnPronadjiMlekaru"
                        >Pronadji mlekaru</Button>
                        </Grid>
                    </React.Fragment>
                    </Grid>
                    <Grid container item xs={12} spacing={3}>
                    <React.Fragment>
                        <Grid item xs={4}>
                        <TextField value = {vozac} id="outlined-basic" label="vozac" variant="outlined"
                            onChange = {handle_vozac} name="vozac" className="unos"
                        />
                        </Grid>
                        <Grid item xs={4}>
                        <TextField value = {nazivMlekare} id="outlined-basic" label="nazivMlekare" variant="outlined"
                            onChange = {handle_nazivMlekare} name="nazivMlekare" className="unos" disabled="true"
                        />
                        </Grid>                    
                    </React.Fragment>
                    </Grid>
                    <Grid container item xs={12} spacing={3}>
                    <React.Fragment>
                        <Grid item xs={4}>
                        <TextField value = {pttMesta} id="outlined-basic" label="pttMesta" variant="outlined"
                            onChange = {handle_pttMesta} name="pttMesta" className="unos"
                        />
                        </Grid>
                        <Grid item xs={4}>
                        <TextField value = {skladiste} id="outlined-basic" label="skladiste" variant="outlined"
                            onChange = {handle_skladiste} name="skladiste" className="unos"
                        />
                        </Grid>
                        <Grid item xs={4}>
                        <TextField
                            value = {formatDate(datumOtpremnice)}
                            id="date"
                            label="Datum otpremnice"
                            type="date"
                            variant="outlined"
                            InputLabelProps={{
                            shrink: true,
                            }}
                            onChange = {handle_datumOtpremnice}
                            className="unos"
                        />
                        </Grid>
                    </React.Fragment>
                    </Grid>
                </Grid>
            </div>    

            <div className="stavkeInfo">
                <Grid container spacing={2}>
                    <Grid container item xs={12} spacing={3}>
                    <React.Fragment>
                        <Grid item xs={4}>
                        <TextField value = {naziv} id="outlined-basic" label="naziv" variant="outlined"
                            onChange = {handle_naziv} name="naziv" className="unos"
                        />
                        </Grid>
                        <Grid item xs={4}>
                        <TextField
                            id="outlined-number"
                            label="Kolicina"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            onChane = {handle_kolicina}
                            name="kolicina" className="unos"
                        />
                        </Grid>
                        <Grid item xs={4}>
                        <TextField value = {jedinicaMere} id="outlined-basic" label="jedinicaMere" variant="outlined"
                            onChange = {handle_jedinicaMere} name="jedinicaMere" className="unos"
                        />
                        </Grid>
                    </React.Fragment>
                    </Grid>   
                    <Grid container item xs={12} spacing={3}>
                    <React.Fragment>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                        <Button variant="outlined" size = "large" className="button"
                            onClick = {handle_btnPronadjiMlekaru} name="btnPronadjiMlekaru"
                        >Dodaj stavku</Button>
                        </Grid>    
                                            
                    </React.Fragment>
                    </Grid>                                       
                </Grid>
            </div>       

        </div>
    )
}

export default Otpremnica