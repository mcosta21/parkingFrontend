import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Placa from './Placa';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  option: {
    height: '30vh',
    marginBottom: 20,
  },
  btn: {
    backgroundColor: '#27293d',
    width: '100%',
    height: 'inherit',
    color: '#dbd8e3',
    borderRadius: 5,    
    fontSize: '20px',
    textAlign: 'center',
    display: 'block',
    paddingTop: theme.spacing(10),
    '&:hover': {
      marginTop: -4,
      transition: '0.3s',
      color: '#3f51b5',
      boxShadow: '12px 5px 10px #1e1e2d',
    }
  },
  titleBtn: {
    backgroundColor: 'transparent',
    color: 'inherit',    
    boxShadow: 'none',
    fontWeight: '400'
  },
  icon: {
    fontSize: 70,
    marginBottom: 15
  },
  tabs: {
    backgroundColor: 'transparent',
    marginBottom: 20,
    color: '#dbd8e3',
  },
  padd150: {
    paddingRight: theme.spacing(10),
    paddingLeft: theme.spacing(10),
  }
}));

function changeMenu(index) {
    return {
      id: `scrollable-prevent-tab-${index}`,
      'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
  }
  
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

export default function Panel() {
    const classes = useStyles();
    
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div className={classes.grow}>
          
      <Paper className={classes.tabs}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          centered>
          <Tab label="Cadastrar" {...changeMenu(0)} />
          <Tab label="Dashboard" {...changeMenu(1)}/>
          <Tab label="Configurações" {...changeMenu(2)}/>
        </Tabs>
      </Paper>

      <TabPanel className={classes.padd150} value={value} index={0}>
          <Container>
              <Grid 
                container 
                direction="row"
                justify="center"
                alignItems="center"
                spacing={2}>
            
                <Grid className={classes.option} item xs={6} sm={3}>
                  <Link to="/atendimento" className={classes.btn}>
                    <Icon className={classes.icon}>star</Icon>
                    <Paper className={classes.titleBtn}>ATENDIMENTO</Paper>
                  </Link>
                </Grid>

                <Grid className={classes.option} item xs={6} sm={3}>
                  <Link to="/atendimento" className={classes.btn}>
                    <Icon className={classes.icon}>star</Icon>
                    <Paper className={classes.titleBtn}>ATENDIMENTO</Paper>
                  </Link>
                </Grid>

                <Grid className={classes.option} item xs={6} sm={3}>
                  <Link to="/atendimento" className={classes.btn}>
                    <Icon className={classes.icon}>star</Icon>
                    <Paper className={classes.titleBtn}>ATENDIMENTO</Paper>
                  </Link>
                </Grid>

                <Grid className={classes.option} item xs={6} sm={3}>
                  <Link to="/atendimento" className={classes.btn}>
                    <Icon className={classes.icon}>star</Icon>
                    <Paper className={classes.titleBtn}>ATENDIMENTO</Paper>
                  </Link>
                </Grid>

                <Grid className={classes.option} item xs={6} sm={3}>
                  <Link to="/atendimento" className={classes.btn}>
                    <Icon className={classes.icon}>star</Icon>
                    <Paper className={classes.titleBtn}>ATENDIMENTO</Paper>
                  </Link>
                </Grid>

                <Grid className={classes.option} item xs={6} sm={3}>
                  <Link to="/atendimento" className={classes.btn}>
                    <Icon className={classes.icon}>star</Icon>
                    <Paper className={classes.titleBtn}>ATENDIMENTO</Paper>
                  </Link>
                </Grid>

                <Grid className={classes.option} item xs={6} sm={3}>
                  <Link to="/atendimento" className={classes.btn}>
                    <Icon className={classes.icon}>star</Icon>
                    <Paper className={classes.titleBtn}>ATENDIMENTO</Paper>
                  </Link>
                </Grid>

                <Grid className={classes.option} item xs={6} sm={3}>
                  <Link to="/atendimento" className={classes.btn}>
                    <Icon className={classes.icon}>star</Icon>
                    <Paper className={classes.titleBtn}>ATENDIMENTO</Paper>
                  </Link>
                </Grid>

              </Grid>

              <Placa/>

          </Container>
      </TabPanel>

      <TabPanel className={classes.padd150} value={value} index={1}>
        Item Two
      </TabPanel>

      <TabPanel className={classes.padd150} value={value} index={2}>
        Item Three
      </TabPanel>
      </div>
    );
  }