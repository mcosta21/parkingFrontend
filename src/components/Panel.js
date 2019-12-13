import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom'
import {Button} from 'primereact/button';

const useStyles = makeStyles(theme => ({
 
  btn: {
    backgroundColor: '#27293d !important' ,
    width: '100%',
    height: '30vh',
    color: '#dbd8e3',
    borderRadius: 5,    
    fontSize: '20px',
    textAlign: 'center',
    border: 'none !important',
    display: 'block',
    paddingTop: 30,
    '&:hover': {
      marginTop: -8,
      transition: '0.3s',
      color: '#3f51b5 !important',
      boxShadow: '12px 5px 10px #1e1e2d',
    }
  },
  titleBtn: {
    backgroundColor: 'transparent',
    color: 'inherit', 
    fontSize: 20,   
    boxShadow: 'none',
    fontWeight: '400'
  },
  icon: {
    fontSize: 70,
    marginTop: -40,
    marginBottom: 15
  },
  tabs: {
    backgroundColor: 'transparent',
    marginBottom: 20,
    color: '#dbd8e3',
  },
  padd150: {
    paddingRight: theme.spacing(30),
    paddingLeft: theme.spacing(30),
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
      <div>
          
      <Paper className={classes.tabs}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          centered>
          <Tab label="Cadastrar" {...changeMenu(0)} />
          <Tab label="RELATÓRIOS" {...changeMenu(1)}/>
          <Tab label="Configurações" {...changeMenu(2)}/>
        </Tabs>
      </Paper>

      <TabPanel className={classes.padd150} value={value} index={0}>
          <Grid 
            container 
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}>
          
              <Grid item xs={6} sm={3}>
                  <Link to="/atendimento">
                    <Button className={classes.btn} label={" "}>
                      <Icon className={classes.icon}>local_parking</Icon>
                      <Paper className={classes.titleBtn}>ATENDIMENTO</Paper>
                    </Button>
                  </Link>               
              </Grid>

              <Grid item xs={6} sm={3}>
                  <Link to="/cliente">
                    <Button className={classes.btn} label={" "}>
                      <Icon className={classes.icon}>face</Icon>
                      <Paper className={classes.titleBtn}>CLIENTE</Paper>
                    </Button>
                  </Link>               
              </Grid>

              <Grid item xs={6} sm={3}>
                  <Link to="/funcionario">
                    <Button className={classes.btn} label={" "}>
                      <Icon className={classes.icon}>supervised_user_circle</Icon>
                      <Paper className={classes.titleBtn}>FUNCIONÁRIO</Paper>
                    </Button>
                  </Link>               
              </Grid>

              <Grid item xs={6} sm={3}>
                  <Link to="/vagasDisponiveis">
                    <Button className={classes.btn} label={" "}>
                      <Icon className={classes.icon}>attach_money</Icon>
                      <Paper className={classes.titleBtn}>FLUXO DE CAIXA</Paper>
                    </Button>
                  </Link>               
              </Grid>

              <Grid item xs={6} sm={3}>
                  <Link to="/bairro">
                    <Button className={classes.btn} label={" "}>
                      <Icon className={classes.icon}>store_mall_directory</Icon>
                      <Paper className={classes.titleBtn}>BAIRRO</Paper>
                    </Button>
                  </Link>               
              </Grid>

              <Grid item xs={6} sm={3}>
                  <Link to="/municipio">
                    <Button className={classes.btn} label={" "}>
                      <Icon className={classes.icon}>home_work</Icon>
                      <Paper className={classes.titleBtn}>MUNICÍPIO</Paper>
                    </Button>
                  </Link>               
              </Grid>

              <Grid item xs={6} sm={3}>
                  <Link to="/uf">
                    <Button className={classes.btn} label={" "}>
                      <Icon className={classes.icon}>map</Icon>
                      <Paper className={classes.titleBtn}>UF</Paper>
                    </Button>
                  </Link>               
              </Grid>

              <Grid item xs={6} sm={3}>
                  <Link to="/cargo">
                    <Button className={classes.btn} label={" "}>
                      <Icon className={classes.icon}>work_outline</Icon>
                      <Paper className={classes.titleBtn}>CARGO</Paper>
                    </Button>
                  </Link>               
              </Grid>              

          </Grid>
      </TabPanel>

      <TabPanel className={classes.padd150} value={value} index={1}>
          <Grid 
            container 
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}>
          
              <Grid item xs={6} sm={3}>
                  <Link to="/atendimentos">
                    <Button className={classes.btn} label={" "}>
                      <Icon className={classes.icon}>supervised_user_circle</Icon>
                      <Paper className={classes.titleBtn}>ATENDIMENTOS</Paper>
                    </Button>
                  </Link>               
              </Grid>

              <Grid item xs={6} sm={3}>
                  <Link to="/clientes">
                    <Button className={classes.btn} label={" "}>
                      <Icon className={classes.icon}>face</Icon>
                      <Paper className={classes.titleBtn}>CLIENTES</Paper>
                    </Button>
                  </Link>               
              </Grid>

              <Grid item xs={6} sm={3}>
                  <Link to="/funcionarios">
                    <Button className={classes.btn} label={" "}>
                      <Icon className={classes.icon}>face</Icon>
                      <Paper className={classes.titleBtn}>FUNCIONÁRIOS</Paper>
                    </Button>
                  </Link>               
              </Grid>

              <Grid item xs={6} sm={3}>
                  <Link to="/bairros">
                    <Button className={classes.btn} label={" "}>
                      <Icon className={classes.icon}>face</Icon>
                      <Paper className={classes.titleBtn}>BAIRROS</Paper>
                    </Button>
                  </Link>               
              </Grid>

              <Grid item xs={6} sm={3}>
                  <Link to="/municipios">
                    <Button className={classes.btn} label={" "}>
                      <Icon className={classes.icon}>face</Icon>
                      <Paper className={classes.titleBtn}>MUNICÍPIOS</Paper>
                    </Button>
                  </Link>               
              </Grid>

              <Grid item xs={6} sm={3}>
                  <Link to="/ufs">
                    <Button className={classes.btn} label={" "}>
                      <Icon className={classes.icon}>face</Icon>
                      <Paper className={classes.titleBtn}>UFS</Paper>
                    </Button>
                  </Link>               
              </Grid>

              <Grid item xs={6} sm={3}>
                  <Link to="/cargos">
                    <Button className={classes.btn} label={" "}>
                      <Icon className={classes.icon}>face</Icon>
                      <Paper className={classes.titleBtn}>CARGOS</Paper>
                    </Button>
                  </Link>               
              </Grid>

          </Grid>
      </TabPanel>

      <TabPanel className={classes.padd150} value={value} index={2}>
        Item Three
      </TabPanel>
      </div>
    );
  }