import React, {useState} from 'react';
import './Homepage.css';
import {useTimeSlots} from './CustomHook';

function DocTimeSlot(doc_info) {
    const [userInfo, setUserInfo] = useState(doc_info.doc_info);
    const logeduserinfo = "Benjamin";
    const [twelveslot, setTwelveslot] = useState(userInfo?.twelve.length === 0 ? "12:00" : "--:--");
    const handleReserve_12 = async()=> {
        const updateduserinfo = userInfo;
        if(userInfo.twelve.length === 0){
            updateduserinfo.twelve = logeduserinfo;
            setUserInfo(updateduserinfo);
            setTwelveslot("--:--");
        }else{
            updateduserinfo.twelve = "";
            setUserInfo(updateduserinfo);
            setTwelveslot("12:00");

        }
        console.log(userInfo);
    }
    const [thirteenslot, setThirteenslot] = useState(userInfo?.thirteen.length === 0 ? "13:00" : "--:--");
    const handleReserve_13 = async() => {
        const updateduserinfo = userInfo;
        if(userInfo.thirteen.length === 0){
            updateduserinfo.thirteen = logeduserinfo;
            setUserInfo(updateduserinfo);
            setThirteenslot("--:--")
        }else{
            updateduserinfo.thirteen = "";
            setUserInfo(updateduserinfo);
            setThirteenslot("13:00");
        }

    }

    const [fourteenslot, setFourteenslot] = useState(userInfo?.fourteen.length === 0 ? "14:00" : "--:--");
    const handleReserve_14 = async() => {
        const updateduserinfo = userInfo;
        if(userInfo.fourteen.length === 0){
            updateduserinfo.fourteen = logeduserinfo;
            setUserInfo(updateduserinfo);
            setFourteenslot("--:--");
        }else{
            updateduserinfo.fourteen = "";
            setUserInfo(updateduserinfo);
            setFourteenslot("14:00");
        }
    }
    const [fifteenslot, setFifteenslot] = useState(userInfo?.fifteen.length === 0 ? "15:00" : "--:--");
    const handleReserve_15 = async() => {
        const updateduserinfo = userInfo;
        if(userInfo.fifteen.length === 0){
            updateduserinfo.fifteen = logeduserinfo;
            setUserInfo(updateduserinfo);
            setFifteenslot("--:--");
        }else{
            updateduserinfo.fifteen = "";
            setUserInfo(updateduserinfo);
            setFifteenslot("15:00");
        }
    }
    const [sixteenslot, setSixteenslot] = useState(userInfo?.sixteen.length === 0 ? "16:00" : "--:--");
    const handleReserve_16 = async() => {
        const updateduserinfo = userInfo;
        if(userInfo.sixteen.length === 0 ){
            updateduserinfo.sixteen = logeduserinfo;
            setUserInfo(updateduserinfo);
            setSixteenslot("--:--");
        }else{
            updateduserinfo.sixteen = "";
            setUserInfo(updateduserinfo);
            setSixteenslot("16:00");
        }
    }
    const [seventeenslot, setSeventeenslot] = useState(userInfo?.seventeen.length === 0 ? "17:00" : "--:--");
    const handleReserve_17 = async() => {
        const updateduserinfo = userInfo;
        if(userInfo.seventeen.length === 0 ){
            updateduserinfo.seventeen = logeduserinfo;
            setUserInfo(updateduserinfo);
            setSeventeenslot("--:--");
        }else{
            updateduserinfo.seventeen = "";
            setUserInfo(updateduserinfo);
            setSeventeenslot("17:00");
        }
    }
    // sixteen
    // seventeen
    return (
        <div className='doc_time'>
            <div className='doc_integrate'>
                <img className = 'doc_img' src={userInfo?.profileImage} alt=""/>
                <div className = 'doc_info'>
                    <h1 className='doc_name'>{userInfo?.username}</h1>
                    <div className='doc_class'>{userInfo?.course}</div>
                    <div className='doc_dep'>{userInfo?.dep}</div>
                </div>
            </div>
                <h2 className='time_title'>Available Time Slot: </h2>
                <div classN ame = 'time_slot'>
                    <div className='time_button' onClick={() => {handleReserve_12()}}>{twelveslot}</div>
                    <div className='time_button' onClick={() => {handleReserve_13()}}>{thirteenslot}</div>
                    <div className='time_button' onClick={() => {handleReserve_14()}}>{fourteenslot}</div>
                    <div className='time_button' onClick={() => {handleReserve_15()}}>{fifteenslot}</div>
                    <div className='time_button' onClick={() => {handleReserve_16()}}>{sixteenslot}</div>
                    <div className='time_button' onClick={() => {handleReserve_17()}}>{seventeenslot}</div>
                </div>
            </div>
    )
}
 
function HomePage() {
    const timeslot = useTimeSlots();
    const [timeview, setTimeview] = useState(<></>);
    const viewTimeslot = (docid) =>{
        setTimeview(<DocTimeSlot doc_info={timeslot[docid]}/>)
    };
    return(
        <div className='Homepage'>
            <div className='Title'>
                <h1>Welcome to the Reservation System</h1>
            </div>
            <div className='docList'>
                <div className='doctor' onClick = {() =>{viewTimeslot(0)}}>
                    <img className = 'doc1' src="https://directory.seas.upenn.edu/wp-content/uploads/2020/07/smith-harry.jpg" alt="Harry Smith"/>
                    <p className='doc_name'>Harry Smith</p>
                </div>
                <div className='doctor' onClick = {() =>{viewTimeslot(1)}}>
                    <img className = 'doc1' src="https://directory.seas.upenn.edu/wp-content/uploads/2021/08/T_McGaha_sq-1-e1628545840568.jpeg" alt="Travis Q. McGaha"/>
                    <p className='doc_name'>Travis Mcgaha</p>
                </div>
                <div className='doctor' onClick = {() =>{viewTimeslot(2)}}>
                    <img className = 'doc1' src="https://directory.seas.upenn.edu/wp-content/uploads/2020/03/Bhusnermath-Arvind.jpg" alt="Arvind Bhusnurmath"/>
                    <p className='doc_name'>Arvind Bhusnurmath</p>
                </div>
            </div>
            {timeview}
        </div>
    )
}

export default HomePage;