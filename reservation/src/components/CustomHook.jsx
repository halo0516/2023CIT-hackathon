import React, {useEffect, useState} from 'react';
import {getInfo} from '../api/axios';


export function useTimeSlots() {
    const [timeslot, setTimeslot] = useState([]);

    useEffect(() => {
      async function fetchData() {
        const response = await getInfo();
        return response;
      }
      const data = fetchData();
      console.log(data);
      const p = Promise.resolve(data);
      p.then((v) => {
        setTimeslot(v);
      });
      console.log(timeslot);
    }, []);
    return timeslot;
}