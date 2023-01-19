import React, {useEffect, useState} from 'react';
import {getInfo} from '../api/axios';


export function useTimeSlots() {
    const [timeslot, setTimeslot] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const response = await getInfo();
        setTimeslot(response);
      };
      fetchData();
    }, []);
    return timeslot;
}