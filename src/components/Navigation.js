import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
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
                    <Link className="routes" href="/" onClick={handleClick}>
                        Material-UI
                    </Link>
                    <Link className="routes" href="/getting-started/installation/" onClick={handleClick}>
                        Core
                    </Link>
                    <Typography className="routes" >Breadcrumb</Typography>
                </Breadcrumbs>
            </div>
        </div>
    )
}

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default Navigation