import React, {useState, useEffect} from 'react'
import "./Timer.css"


//Gets the the time and date and updates it constantly in browser. No refresh needed.
function Timer() {
    const [time, setTime] = useState(setInterval( () => { new Date().toLocaleString()}, 1000))

    useEffect(() => {

        setInterval( () => {
            setTime(new Date().toLocaleString())
        }, 1000)

    }, [time])
    
    return (
        <div>
            <h4 id = "date" >{time}</h4>    
        </div>
    )
}

export default Timer
