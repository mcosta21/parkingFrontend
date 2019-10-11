import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    app: {
      minHeight: '100vh',
      backgroundColor: '#160f30',
      color: '#dbd8e3',
    },
    defaultPlaca: {
        fontSize: '50px',
        color: 'white',
        width: 300,
        height: 500
    }
}));


export default function Placa() {
    const classes = useStyles();


    return (
      <div className={classes.grow}>
        <ThemeProvider>
            <TextField
            className={classes.defaultPlaca}
            label="Placa"
            variant="outlined"
            id="mui-theme-provider-outlined-input"
            />
        </ThemeProvider>
      </div>
    );
  }