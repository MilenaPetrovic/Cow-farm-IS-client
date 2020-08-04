import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

//table
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

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
    const [rb, setRb] = React.useState(0)
    const [naziv, setNaziv] = React.useState('')
    const [kolicina, setKolicina] = React.useState(0)
    const [jedinicaMere, setJedinicaMere] = React.useState('')
    const [stavke, setStavke] = React.useState( { stavke: [] } )
    const [otpremnica, setOtpremnica] = React.useState({brojOtpremnice: '', stavke: [] })
    const [sifraZaposlenog, setSifraZaposlenog] = React.useState('')
    const [nazivZaposlenog, setNazivZaposlenog] = React.useState('')

    const [openAlert, setOpenAlert] = React.useState(false)
    const [tekstAlerta, setTekstAlerta] = React.useState('')
    const [tipAlerta, setTipAlerta] = React.useState('success')

    const otvoriAlert = (tekst, tip) => {
        setOpenAlert(true)
        setTekstAlerta(tekst)
        setTipAlerta(tip)
    }

    const zatvoriAlert = () => {
        setOpenAlert(false)
    }

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
        if(sifraMlekare.trim() === ''){
            otvoriAlert("Unesite šifru mlekare!", "error")
            return;
        }

        fetch(`${ruta}mlekare/${sifraMlekare}`)
        .then( (res) => {
            return res.json();
        })
        .then ( (res) => {
            if(res.sifraMlekare === undefined){
                otvoriAlert(res.message, "error")
                return;
            }
            setNazivMlekare(res.nazivMlekare)
        })        
    }

    const handle_btnPronadjiOtpremnicu = () => {
        if(brojOtpremnice.trim() === ''){
            otvoriAlert("Unesite šifru otpremnice!", "error")
            return;
        }

        fetch(`${ruta}otpremnice/${brojOtpremnice}`)
        .then( (res) => {
            return res.json();
        })
        .then ( (res) => {
            if(res.brojOtpremnice === undefined){
                otvoriAlert(res.message, "error")
                return;
            }
            setOtpremnica(res)
            setSifraZaposlenog(res.sifraZaposlenog)
            setBrojOtpremnice(res.brojOtpremnice)
            setSkladiste(res.skladiste)
            setStavke(res.stavke)
            setVozac(res.vozac)
            setPttMesta(res.pttMesta)
            setDatumOtpremnice(res.datumOtpremnice)
            setSifraMlekare(res.sifraMlekare)

            fetch(`${ruta}mlekare/${res.sifraMlekare}`)
            .then( (res) => {
                return res.json();
            })
            .then ( (res) => {
                if(res.sifraMlekare === undefined){
                    otvoriAlert(res.message, "error")
                    return;
                }
                setNazivMlekare(res.nazivMlekare)
            })        
            
            fetch(`${ruta}zaposleni/${res.sifraZaposlenog}`)
            .then( (res) => {
                return res.json();
            })
            .then ( (res) => {
                if(res.sifraZaposlenog === undefined){
                    otvoriAlert(res.message, "error")
                    return;
                }
                let nazivZap = `${res.ime} ${res.prezime}`
                setNazivZaposlenog(nazivZap)
            })
        })        

    }

    const handle_sifraZaposlenog = (event) => {
        setSifraZaposlenog(event.target.value)
    }

    const handle_nazivZaposlenog = (event) => {
        setNazivZaposlenog(event.target.value)
    }
    
    const handle_btnPronadjiZaposlenog = () => {
        if(sifraZaposlenog.trim() === ''){
            otvoriAlert("Unesite šifru zaposlenog!", "error")
            return;
        }

        fetch(`${ruta}zaposleni/${sifraZaposlenog}`)
        .then( (res) => {
            return res.json();
        })
        .then ( (res) => {
            if(res.sifraZaposlenog === undefined){
                otvoriAlert(res.message, "error")
                setNazivZaposlenog('')
                return;
            }
            let nazivZap = `${res.ime} ${res.prezime}`
            setNazivZaposlenog(nazivZap)
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
    }))(TableCell);
          
    const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    });

    const classes = useStyles();
    const [selected, setSelected] = React.useState(-1);
    const isSelected = (num) => selected === num;

    const emptyRows = 3;
    const handleClick = (event, num) => {
        event.target.type === "checkbox" ?
            event.target.checked ? setSelected(num) : setSelected(-1) 
            :
            isSelected(num) ? setSelected(-1) : setSelected(num);
        prikaziStavku(num)
    };

    const prikaziStavku = (num) => {
        const stavka = otpremnica.stavke[num-1]

        if (stavka !== undefined) {
            setRb(stavka.rb)
            setNaziv(stavka.naziv);
            setKolicina(stavka.kolicina);
            setJedinicaMere(stavka.jedinicaMere);
        } else {
            otvoriAlert("Morate izabrati stavku!", "error")
            return;
        }
    }

    const handle_btnDodajStavku = () => { 
        if(kolicina === 0 || naziv.trim() === '' || jedinicaMere.trim() === ''){
            otvoriAlert("Unesite sve podatke!", "error")
            return;
        }
        if(kolicina === undefined || isNaN(kolicina)){
            otvoriAlert("Niste pravilno uneli količinu!", "error")
            return;
        }

        let rb = 0
        if(stavke === undefined || stavke[0] === undefined){
            rb = 1
        }  else {
            rb =  stavke.length + 1
        }
        setRb(rb)
        let st = []
        let stavka = {rb, naziv, kolicina, jedinicaMere} 
        if(stavke === undefined || stavke[0] === undefined){
            st = [stavka]
        } else {
            st = stavke
            st.push(stavka)
        }        
        setStavke(st)
        otpremnica.stavke = st
        let otp = otpremnica
        setOtpremnica(otp)

        pocistiStavke()
    }

    const handle_btnIzmeniStavku = () => { 
        if(rb === 0){
            handle_btnDodajStavku()
            return;
        }
        var stavka = {rb, naziv, kolicina, jedinicaMere}            

        stavke.forEach(objekat => {
            if(objekat.rb === rb){
                stavke[rb-1] = stavka
            }
        });

        otpremnica.stavke = stavke
        let otp = otpremnica
        setOtpremnica(otp)

        pocistiStavke()
    }

    const handle_btnObrisiStavku = () => { 
        if(rb === 0){
            otvoriAlert("Morate izabrati stavku!", "error")
            return;
        }

        stavke.forEach(objekat => {
            if(objekat.rb === rb){
                stavke.pop(stavke[rb-1])
            }
        });

        otpremnica.stavke = stavke
        let otp = otpremnica
        setOtpremnica(otp)

        pocistiStavke()
    }

    const handle_btnSacuvaj = () => {
        if(brojOtpremnice.trim() === '' || nazivZaposlenog.trim() === '' || pttMesta.trim() === '' || vozac.trim() === '' || nazivZaposlenog.trim() === '' || skladiste.trim() === ''){
            otvoriAlert("Niste popunili sve podatke", "error")
            return;
        }
        if(isNaN(pttMesta)){
            otvoriAlert("Niste pravilno uneli ptt!", "error")
            return;
        }

        otpremnica.brojOtpremnice = brojOtpremnice
        otpremnica.vozac = vozac
        otpremnica.sifraMlekare = sifraMlekare
        otpremnica.skladiste = skladiste
        otpremnica.datumOtpremnice = datumOtpremnice
        otpremnica.sifraZaposlenog = sifraZaposlenog
        otpremnica.stavke = stavke
        otpremnica.pttMesta = pttMesta

        fetch(`${ruta}otpremnice/${brojOtpremnice}`)
        .then( (res) => {
            return res.json();
        })
        .then ( (res) => {
            if(res.brojOtpremnice === undefined){
                kreirajNovu()
            } else {
                azurirajOtpremnicu()
            }
        })
    }

    const kreirajNovu = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(otpremnica);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`${ruta}otpremnice`, requestOptions)
        .then(response => response.json())
        .then(result => {
            otvoriAlert(result.message, "success")
            pocisti()
        })
        .catch(error => otvoriAlert(error, "error"));
    }

    const azurirajOtpremnicu = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(otpremnica);

        var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`${ruta}otpremnice/${brojOtpremnice}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            otvoriAlert(result.message, "success")
            pocisti()
        })
        .catch(error => otvoriAlert(error, "error"));
    }

    const pocisti = () => {
        setOtpremnica({brojOtpremnice:'', stavke:[]})
        setBrojOtpremnice('')
        setVozac('')
        setSifraMlekare('')
        setDatumOtpremnice(Date.now)
        setNazivMlekare('')
        setPttMesta('')
        setSkladiste('')
        setSifraZaposlenog('')
        setNazivZaposlenog('')
        setStavke({stavke:[]})

        pocistiStavke()        
    }

    const pocistiStavke = () => {
        setNaziv('')
        setRb(0)
        setKolicina(0)
        setJedinicaMere('')
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return(
        <div className="otpremnica">
            <br/>
            <Typography className="title" variant="h3" component="h2">
                Otpremnica
            </Typography>
            <div className="osnovneInfo">
                <Grid container spacing={2}>
                    <Grid container item xs={12} spacing={3}>
                    <React.Fragment>
                        <Grid item xs={4}>
                        <TextField value = {brojOtpremnice} id="outlined-basic" label="Broj otpremnice" variant="outlined"
                            onChange = {handle_brojOtpremnice} name="brojOtpremnice" className="unos"
                        />
                        </Grid>
                        <Grid item xs={4}>
                        <TextField value = {vozac} id="outlined-basic" label="Vozač" variant="outlined"
                            onChange = {handle_vozac} name="vozac" className="unos"
                        />
                        </Grid>
                        <Grid item xs={4}>
                        <Button variant="outlined" size = "large" className="button"
                            onClick = {handle_btnPronadjiOtpremnicu} name="btnPronadjiOtpremnicu"
                        >Pronađi otpremnicu</Button>
                        </Grid>
                    </React.Fragment>
                    </Grid>
                    <Grid container item xs={12} spacing={3}>
                    <React.Fragment>                        
                        <Grid item xs={4}>
                        <TextField value = {sifraMlekare} id="outlined-basic" label="Šifra mlekare" variant="outlined"
                            onChange = {handle_sifraMlekare} name="sifraMlekare" className="unos"
                        />
                        </Grid>
                        <Grid item xs={4}>
                        <TextField value = {nazivMlekare} id="outlined-basic" label="Naziv mlekare" variant="outlined"
                            onChange = {handle_nazivMlekare} name="nazivMlekare" className="unos" disabled={true}
                        />
                        </Grid>                    
                        <Grid item xs={4}>
                        <Button variant="outlined" size = "large" className="button"
                            onClick = {handle_btnPronadjiMlekaru} name="btnPronadjiMlekaru"
                        >Pronađi mlekaru</Button>
                        </Grid>
                    </React.Fragment>
                    </Grid>
                    <Grid container item xs={12} spacing={3}>
                    <React.Fragment>
                        <Grid item xs={4}>
                        <TextField value = {pttMesta} id="outlined-basic" label="PTT mesta" variant="outlined"
                            onChange = {handle_pttMesta} name="pttMesta" className="unos"
                        />
                        </Grid>
                        <Grid item xs={4}>
                        <TextField value = {skladiste} id="outlined-basic" label="Skladište" variant="outlined"
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
                <Typography className="title" variant="h5" component="h2">
                    Stavke otpremnice
                </Typography>
                <Grid container spacing={2}>
                    <Grid container item xs={12} spacing={3}>
                    <React.Fragment>
                        <Grid item xs={4}>
                        <TextField value = {naziv} id="outlined-basic" label="Naziv" variant="outlined"
                            onChange = {handle_naziv} name="naziv" className="unos"
                        />
                        </Grid>
                        <Grid item xs={4}>
                        <TextField
                            id="outlined-number"
                            label="Količina"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            onChange = {handle_kolicina}
                            name="kolicina" className="unos"
                            value = {kolicina}
                        />
                        </Grid>
                        <Grid item xs={4}>
                        <TextField value = {jedinicaMere} id="outlined-basic" label="Jedinica mere" variant="outlined"
                            onChange = {handle_jedinicaMere} name="jedinicaMere" className="unos"
                        />
                        </Grid>
                    </React.Fragment>
                    </Grid>   
                    <Grid container item xs={12} spacing={3}>
                    <React.Fragment>
                        <Grid item xs={4}>
                        <Button variant="outlined" size = "large" className="button"
                            onClick = {handle_btnDodajStavku} name="btnDodajStavku"
                        >Dodaj novu stavku</Button>
                        </Grid>
                        <Grid item xs={4}>
                        <Button variant="outlined" size = "large" className="button"
                            onClick = {handle_btnIzmeniStavku} name="btnDodajStavku"
                        >Izmeni stavku</Button>
                        </Grid> 
                        <Grid item xs={4}>
                        <Button variant="outlined" size = "large" className="button"
                            onClick = {handle_btnObrisiStavku} name="btnDodajStavku"
                        >Obriši stavku</Button>
                        </Grid>                                              
                    </React.Fragment>
                    </Grid>                                       
                </Grid>
                <br/>
                <br/>
                <div className="tabela">                                
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            <StyledTableCell>&nbsp;</StyledTableCell>
                            <StyledTableCell>RB</StyledTableCell>
                            <StyledTableCell align="right">Naziv</StyledTableCell>
                            <StyledTableCell align="right">Količina</StyledTableCell>
                            <StyledTableCell align="right">Jedinica mere</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>            
                            {otpremnica.stavke.map((row, index) => {
                            const isItemSelected = isSelected(row.rb);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow 
                                hover
                                onClick={(event) => handleClick(event, row.rb)}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                key={row.rb}
                                selected={isItemSelected}
                                >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                    checked={isItemSelected}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    /> 
                                </TableCell>
                                <TableCell component="th" scope="row" id={labelId} >
                                    {row.rb}
                                </TableCell>
                                <TableCell align="right">{row.naziv}</TableCell>
                                <TableCell align="right">{row.kolicina}</TableCell>
                                <TableCell align="right">{row.jedinicaMere}</TableCell>
                                </TableRow>
                            )
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53* emptyRows }}>
                                <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        </Table>
                    </TableContainer>                               
                </div>
            </div>       

            <div className="osnovneInfo">
                <Grid container spacing={2}>
                    <Grid container item xs={12} spacing={3}>
                    <React.Fragment>
                        <Grid item xs={4}>
                        <TextField value = {sifraZaposlenog} id="outlined-basic" label="sifraZaposlenog" variant="outlined"
                            onChange = {handle_sifraZaposlenog} name="sifraZaposlenog" className="unos"
                        />
                        </Grid>
                        <Grid item xs={4}>
                        <TextField value = {nazivZaposlenog} id="outlined-basic" label="nazivZaposlenog" variant="outlined"
                            onChange = {handle_nazivZaposlenog} name="nazivZaposlenog" className="unos" disabled={true}
                        />
                        </Grid>
                        <Grid item xs={4}>
                        <Button variant="outlined" size = "large" className="button"
                            onClick = {handle_btnPronadjiZaposlenog} name="btnPronadjiZaposlenog"
                        >Pronađi zaposlenog</Button>
                        </Grid>
                    </React.Fragment>
                    </Grid>                    
                </Grid>
            </div> 
            <br/>
            <br/>
            <Button variant="outlined" size = "large" className="sacuvaj"
                onClick = {handle_btnSacuvaj} name="btnSacuvaj"
            >Sačuvaj otpremnicu</Button>
            <br/>
            <br/>

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

export default Otpremnica