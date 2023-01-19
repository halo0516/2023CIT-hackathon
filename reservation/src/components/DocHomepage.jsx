import React, {useState,useEffect} from 'react';
import './DocHomepage.css'
import {getInfo} from '../api/axios';

function DocHomePage() {
    const [RevList, setRevList] = useState([]);

    useEffect(() =>{
        const fetchData = async() => {
            try{
              const response = await getInfo();
              setRevList(response.data);
            }catch (err){
              throw new Error(err);
            }
          }
          fetchData();
    });
    return(
        <div className='DocHomepage'>
            <div className='Title'>
                <h1>Welcome back! Here Is The Reservation You Have Today</h1>
            </div>
            <div className='reservation'>
                <h2 className='reserve_title'>Reserved Time Slot: </h2>
                {RevList};
            </div>

        </div>
    )
}

export default DocHomePage;