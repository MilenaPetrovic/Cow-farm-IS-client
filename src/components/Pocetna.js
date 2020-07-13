import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import slika1 from '../resources/farma.jpg';
import slika2 from '../resources/krava.jpg';
import slika3 from '../resources/muza.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper
    },
    gridList: {
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
    }    
  }));

function Pocetna(params){   
      
    const tileData = [
        { img: slika1, title: 'Farma' },
        { img: slika2, title: 'Krava' },
        { img: slika3, title: 'Muziliste' },
    ];

    const classes = useStyles();

    return(
        <div className = "pocetna">
            <GridList className={classes.gridList} cols={2.5}>
                {tileData.map((tile) => (
                <GridListTile key={tile.img} rows={2.5}>
                    <img src={tile.img} alt={tile.title} />                    
                </GridListTile>
                ))}
            </GridList>
        </div>
    )
}

export default Pocetna