import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import './HomePage.css';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import axios from '../api/axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const style = {
    color:"grey",
    width: '100%',
    maxWidth: 700,
    bgcolor: '#fce4ec',
  };

function HomePage(props) {
    const [docArr, setDocArr] = useState([]);

    useEffect(() => {
        // GET doc data
        axios.get('http://localhost:3500/doc_account')
        .then((res) => setDocArr(res.data))
    }, []);
    
    return (
        docArr.map((item) => 
        <Box
        key={item.username}
        sx={{
            color: "white",
            width: 800,
            height: 280,
            backgroundColor: 'primary.dark',
            // backgroundColor: rgb(201, 76, 76),
            // backgroundColor: "blue",
            // backgroundColor: rgba(201, 76, 76, 0.1),
            '&:hover': {
            backgroundColor: 'primary.main',
            // backgroundColor:"blue",
            opacity: [0.9, 0.8, 0.7],
            },
        }}
        >{item.username}
            <List sx={style} component="nav" aria-label="mailbox folders">
            <ListItem button>
                <ListItemText primary="timeslot1" />{item.time[0]} 
                <FormControlLabel control={<Checkbox false />} label="" />
            </ListItem>
            <Divider />
            <ListItem button divider>
                <ListItemText primary="timeslot2" />{item.time[1]} 
                <FormControlLabel control={<Checkbox false />} label="" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="timeslot3" />{item.time[2]}
                <FormControlLabel control={<Checkbox false />} label="" />
            </ListItem>
            <Divider light />
            <ListItem button>
                <ListItemText primary="timeslot4" />{item.time[3]}
                <FormControlLabel control={<Checkbox false />} label="" />
                
            </ListItem>
            </List>
            
        </Box>
        )
    )
}

export default HomePage;