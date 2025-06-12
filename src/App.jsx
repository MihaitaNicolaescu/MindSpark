import { useEffect, useReducer, useState } from 'react'
import './App.css'
import StartQuiz from './components/StartQuiz'
import Question from './components/Question'
import Finished from './components/Results/Finished'
import TimeIsUp from './components/Results/TimeIsUp'
import axios from 'axios'

const initialState = {
  data: [],
  contor: 0,
  answer: null,
  started: false,
  endReason: "notStarted",
  points: 0,
};

function App() {

  const [status, setStatus] = useState("notStarted");
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    axios.get("http://localhost:8789/quiz").then((response) => {
      dispatch({type: "setData", payload: response.data});
      dispatch({type: "setStarted", payload: true});
      console.log(response.data);
    })
  }, []);

  useEffect(() => {
    if (state.contor >= state.data.length) {
      dispatch({type: "setEndReason", payload: "finished"});
      dispatch({type: "setStarted", payload: false});
      setStatus("finished");
    }
  }, [state.contor]);

  function getMaxPoints() {
    return state.data.reduce((max, currentElm) => max + currentElm.points, 0);
  }
  
  if(status === "notStarted"){
    return (
      <>
        <div className='flex flex-row min-h-screen justify-center items-center bg-[#5C7285]'>
          <StartQuiz setStatus={setStatus}/>
        </div>
      </>
    )
  } else if(status === "active") {
    return (
      <>
        <div className='flex flex-row min-h-screen justify-center items-center bg-[#5C7285]'>
          <Question setStatus={setStatus} appDispatch={dispatch} appState={state} />
        </div>
      </>
    )
  } else if(status === "finished"){
    return (
      <>
        <div className='flex flex-row min-h-screen justify-center items-center bg-[#5C7285]'>
          <Finished setStatus={setStatus} points={state.points} maxPoints={getMaxPoints()}/>
        </div>
      </>
    )
  } else if(status === "timesUp"){
    return (
      <>
        <div className='flex flex-row min-h-screen justify-center items-center bg-[#5C7285]'>
          <TimeIsUp setStatus={setStatus}/>
        </div>
      </>
    )
  }

}

function reducer(state, action) {
  switch(action.type){
    case "setData":
      return {...state, data: action.payload};
    case "setContor":
      return {...state, contor: action.payload};
    case "setAnswer":
      return {...state, answer: action.payload};
    case "setStarted":
      return {...state, started: action.payload};
    case "setEndReason":
      return {...state, endReason: action.payload};
    case "increasePoints":
      return {...state, points: state.points + action.payload }
    default:
      throw new Error ("Unknow action!");
  }
}

export default App
