import { useEffect, useReducer, useRef } from "react";

const initialState = {
    remainingTime: 300,
}

function Timer({started, stopQuiz}) {

    const [state, dispatch] = useReducer(reducer, initialState);
    const intervalRef = useRef(null);
    const mins = Math.floor(state.remainingTime / 60);
    const sec = state.remainingTime % 60;

    useEffect(() => {
        if(started === true && intervalRef.current === null){
            intervalRef.current = setInterval(() => {
                dispatch({type: "decrementTime"});
            }, 1000);
            
            return () => clearInterval(intervalRef);
        }
    }, [started]);

    useEffect(() => {
        if(state.remainingTime <= 0){
            clearInterval(intervalRef.current);
            stopQuiz("noTime");
        }
    }, [state.remainingTime])


    return <>
        {mins < 10 && "0"}{mins} : {sec < 10 && "0"}{sec}
    </>
}

function reducer(state, action){
    switch(action.type){
        case "setRemainingTime":
            return {...state, remainingTime: action.payload};
        case "decrementTime":
            return {...state, remainingTime: state.remainingTime > 0 ? state.remainingTime - 1 : 0};
        default:
            throw new Error("Ivalid timer action!");
    }
}

export default Timer;