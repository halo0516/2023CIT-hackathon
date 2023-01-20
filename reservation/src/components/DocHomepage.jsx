import React, {useState,useEffect} from 'react';
import './DocHomepage.css'
import {getInfo, fetchUser} from '../api/axios';

function DocHomePage() {
    const Docinfo = JSON.parse(sessionStorage.getItem("userid"));
    const [tellSlot1, setTellslot1] = useState(<></>);
    const [tellSlot2, setTellslot2] = useState(<></>);
    const [tellSlot3, setTellslot3] = useState(<></>);
    const [tellSlot4, setTellslot4] = useState(<></>);
    const [tellSlot5, setTellslot5] = useState(<></>);
    useEffect(() =>{
        const fetchData = async() => {
            try{
              if(Docinfo.twelve.length > 0){
                const response = await fetchUser(Docinfo.twelve);
                setTellslot1(<div className='timeslot'>{`12:00 with Student: ${response.data.firstName} ${response.data.lastName}`}</div>);
              }
              if(Docinfo.thirteen.length > 0){
                const response = await fetchUser(Docinfo.thirteen);
                setTellslot2(<div className='timeslot'>{`13:00 with Student: ${response.data.firstName} ${response.data.lastName}`}</div>);
              }
              if(Docinfo.fourteen.length > 0){
                const response = await fetchUser(Docinfo.fourteen);
                setTellslot3(<div className='timeslot'>{`14:00 with Student: ${response.data.firstName} ${response.data.lastName}`}</div>);
              }
              if(Docinfo.fifteen.length > 0){
                const response = await fetchUser(Docinfo.fifteen);
                setTellslot4(<div className='timeslot'>{`15:00 with Student: ${response.data.firstName} ${response.data.lastName}`}</div>);
              }
              if(Docinfo.sixteen.length > 0){
                const response = await fetchUser(Docinfo.sixteen);
                setTellslot5(<div className='timeslot'>{`16:00 with Student: ${response.data.firstName} ${response.data.lastName}`}</div>);
              }

            }catch (err){
              throw new Error(err);
            }
          }
          fetchData();
    }, []);
    return(
        <div className='DocHomepage'>
            <div className='Title'>
                <h1>Welcome back! Here Is The Reservation You Have Today</h1>
            </div>
            <div className='reservation'>
                <h2 className='reserve_title'>Reserved Time Slot: </h2>
                {tellSlot1}
                {tellSlot2}
                {tellSlot3}
                {tellSlot4}
                {tellSlot5}
            </div>

        </div>
    )
}

export default DocHomePage;