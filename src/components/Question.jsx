import axios from "axios";
import { useEffect, useReducer } from "react";
import Answer from "./Question/Answer";
import Timer from "./Timer";
import Finished from "./Results/Finished";
import TimeIsUp from "./Results/TimeIsUp";

const initialState = {
  data: [],
  contor: 0,
  answer: null,
  started: false,
  endReason: "notStarted",
  points: 0,
};

function Question({quizStart, setQuizStart}){
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
        }
      }, [state.contor])
    

      function nextQuestion(){
        if(state.data[state.contor].answers[state.answer] === state.data[state.contor].correct_answer){
          dispatch({type: "increasePoints", payload: state.data[state.contor].points});
        }
        dispatch({type: "setContor", payload: state.contor + 1});
        dispatch({type: "setAnswer", payload: null});
      }

      function stopQuiz(endReason){
        dispatch({type: "setStarted", payload: false});
        dispatch({type: "setEndReason", payload: endReason});
        setQuizStart(false);
      }

      function showResult(){
        switch(state.endReason){
          case "finished":
            return <Finished/>;
          case "timeIsUp":
            return <TimeIsUp/>;
        }
      }

      if(state.data.length > 0 && state.contor < state.data.length){
        return(
        <div className="grid place-items-center">
          <h2>POINTS {state.points}</h2>
            <div className="grid place-items-center">
                <p className="text-3xl font-bold mb-10">{state.data[state.contor].question}</p>
                <Answer option={state.data[state.contor].answers[0]} isChecked={state.answer === 0} onClick={() => dispatch({type: "setAnswer", payload: 0})} />
                <Answer option={state.data[state.contor].answers[1]} isChecked={state.answer === 1} onClick={() => dispatch({type: "setAnswer", payload: 1})} />
                <Answer option={state.data[state.contor].answers[2]} isChecked={state.answer === 2} onClick={() => dispatch({type: "setAnswer", payload: 2})} />
                <Answer option={state.data[state.contor].answers[3]} isChecked={state.answer === 3} onClick={() => dispatch({type: "setAnswer", payload: 3})} />
            </div>
            <div className="flex justify-center items-center gap-4 mt-10">
            <p className="bg-[#A7B49E] w-20 font-xl text-center font-bold p-2 rounded-xl m-2"><Timer started={state.started} stopQuiz={stopQuiz}/></p>
            {state.answer !== null && (
                <button
                    className="bg-[#A7B49E] w-20 font-xl text-center font-bold hover:cursor-pointer hover:bg-[#818C78] p-2 rounded-xl"
                    onClick={() => nextQuestion()}>
                    Next
                </button>
            )}
            </div>
        </div>
        )
      } else if(state.contor >= state.data.length){
        return showResult();
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

export default Question;