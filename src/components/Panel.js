import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Placa from './Placa';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
  option: {
    height: '30vh',
    marginBottom: 20
  },
  btn: {
    width: '100%',
    height: 'inherit',
    color: '#dbd8e3',
    borderRadius: 0,    
    border: '1px solid #202040',
    fontSize: '15px',
    display: 'block',
    '&:hover': {
      color: '#3e64ff',
      border: '1px solid #3e64ff',
    }
  },
  titleBtn: {
    backgroundColor: 'transparent',
    color: 'inherit',    
    boxShadow: 'none',
  },
  icon: {
    fontSize: 50,
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
          <Tab label="Item One" {...changeMenu(0)} />
          <Tab label="Item Two" {...changeMenu(1)}/>
          <Tab label="Item Three" {...changeMenu(2)}/>
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
                  <Button className={classes.btn}>
                    <Icon className={classes.icon}>star</Icon>
                    <Paper className={classes.titleBtn}>Atendimento</Paper>
                  </Button>
                </Grid>

                <Grid className={classes.option} item xs={6} sm={3}>
                  <Button className={classes.btn}>
                    <Icon className={classes.icon}>star</Icon>
                    <Paper className={classes.titleBtn}>Atendimento</Paper>
                  </Button>
                </Grid>

                <Grid className={classes.option} item xs={6} sm={3}>
                  <Button className={classes.btn}>
                    <Icon className={classes.icon}>star</Icon>
                    <Paper className={classes.titleBtn}>Atendimento</Paper>
                  </Button>
                </Grid>

                <Grid className={classes.option} item xs={6} sm={3}>
                  <Button className={classes.btn}>
                    <Icon className={classes.icon}>star</Icon>
                    <Paper className={classes.titleBtn}>Atendimento</Paper>
                  </Button>
                </Grid>

                <Grid className={classes.option} item xs={6} sm={3}>
                  <Button className={classes.btn}>
                    <Icon className={classes.icon}>star</Icon>
                    <Paper className={classes.titleBtn}>Atendimento</Paper>
                  </Button>
                </Grid>

                <Grid className={classes.option} item xs={6} sm={3}>
                  <Button className={classes.btn}>
                    <Icon className={classes.icon}>star</Icon>
                    <Paper className={classes.titleBtn}>Atendimento</Paper>
                  </Button>
                </Grid>

                <Grid className={classes.option} item xs={6} sm={3}>
                  <Button className={classes.btn}>
                    <Icon className={classes.icon}>star</Icon>
                    <Paper className={classes.titleBtn}>Atendimento</Paper>
                  </Button>
                </Grid>

                <Grid className={classes.option} item xs={6} sm={3}>
                  <Button className={classes.btn}>
                    <Icon className={classes.icon}>star</Icon>
                    <Paper className={classes.titleBtn}>Atendimento</Paper>
                  </Button>
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