import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import '../App.css'

function Navigation(params) {    
    return(
        <div className = "nav">
            <Typography className="title" variant="h3" component="h2">
                Informacioni sistem farme Šarulja
            </Typography>
            <br/>
            <div className="links">
                <Breadcrumbs aria-label="breadcrumb" separator="|">
                    <Link to="/" className="routes">
                        Početna
                    </Link>
                    <Link to="/otpremnica" className="routes">
                        Otpremnica
                    </Link>
                    <Link to="/pasos" className="routes">
                        Pasoš
                    </Link>
                </Breadcrumbs>
            </div>
        </div>
    )
}


export default Navigation