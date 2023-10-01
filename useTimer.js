import React, { useState, useEffect, useRef } from 'react';


const useTimer = (defaultClock = 0, defaultRunningStatus =false, mode='HMS') => {
    const [time, setTime] = useState(defaultClock);
    const [isTimerRunning, setTimerRunning] = useState(defaultRunningStatus);
    const [timerData, setTimerData] = useState('HH:MM:SS');
    const modeRef = useRef(mode);

    const tick = (e) => {
        e && e.preventDefault()
        if (time >= 0 && isTimerRunning) {
            setTime(time + 1)
        }
    }

    const handleReset = (e) => {
        e && e.preventDefault()
        setTime(defaultClock)
    }

    const togglePlayPause = (e) => {
        e && e.preventDefault()
        setTimerRunning(!isTimerRunning)
    }


    const formatSecondsToMode = useCallback((seconds)=>{
        seconds = Number(seconds);
        let h = Math.floor(seconds / 3600);
        let m = Math.floor(seconds % 3600 / 60);
        let s = Math.floor(seconds % 3600 % 60);


        if(modeRef.current === 'HMS') {
            let hDisplay = h > 0 ? String(h).padStart(2, '0') : "00";
            let mDisplay = m > 0 ? String(m).padStart(2, '0') : "00";
            let sDisplay = s > 0 ? String(s).padStart(2, '0') : "00";
            
            // example - '01:20:38'
            return hDisplay + ':' + mDisplay + ':' + sDisplay; 
        }
        else {
            let hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
            let mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
            let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    
            // example - '1 hours, 20 minutes, 38 seconds'
            return hDisplay + mDisplay + sDisplay; 
        }
    }, [modeRef.current]);
    
    

    useEffect(() => {
        setTimerData(formatSecondsToMode(time))
        let timerId = setInterval(tick, 1000);
        return () => clearInterval(timerId);
    }, [time, isTimerRunning,formatSecondsToMode])


    return [timerData, isTimerRunning, togglePlayPause, handleReset]
}