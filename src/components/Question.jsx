import Answer from "./Question/Answer";
import Timer from "./Timer";
import Progress from "./Progress";

function Question({setStatus, appDispatch, appState, maxPoints}){
      function nextQuestion(){
        if(appState.data[appState.contor].answers[appState.answer] === appState.data[appState.contor].correct_answer){
          appDispatch({type: "increasePoints", payload: appState.data[appState.contor].points});
        }
        appDispatch({type: "setContor", payload: appState.contor + 1});
        appDispatch({type: "setAnswer", payload: null});
      }

      function stopQuiz(endReason){
        appDispatch({type: "setStarted", payload: false});
        appDispatch({type: "setEndReason", payload: endReason});
        setStatus("timesUp"); //need to handle this implementation
      }
      
      if(appState.data.length > 0 && appState.contor < appState.data.length){
        return(
        <div className="grid place-items-center w-full">
          <Progress points={appState.points} maxPoints={maxPoints} totalQuestions={appState.data.length} contor={appState.contor}/>
          <div className="grid place-items-center">
              <p className="text-xl font-medium mb-5 mt-5 w-2/3 text-center">{appState.data[appState.contor].question}</p>
              <Answer option={appState.data[appState.contor].answers[0]} isChecked={appState.answer === 0} onClick={() => appDispatch({type: "setAnswer", payload: 0})} />
              <Answer option={appState.data[appState.contor].answers[1]} isChecked={appState.answer === 1} onClick={() => appDispatch({type: "setAnswer", payload: 1})} />
              <Answer option={appState.data[appState.contor].answers[2]} isChecked={appState.answer === 2} onClick={() => appDispatch({type: "setAnswer", payload: 2})} />
              <Answer option={appState.data[appState.contor].answers[3]} isChecked={appState.answer === 3} onClick={() => appDispatch({type: "setAnswer", payload: 3})} />
          </div>
          <div className="flex justify-center items-center gap-4 mt-10">
            <p className="bg-[#A7B49E] w-20 font-xl text-center font-bold p-2 rounded-xl m-2"><Timer started={appState.started} stopQuiz={stopQuiz}/></p>
            {appState.answer !== null && (
                <button
                    className="bg-[#A7B49E] w-20 font-xl text-center font-bold hover:cursor-pointer hover:bg-[#818C78] p-2 rounded-xl"
                    onClick={() => nextQuestion()}>
                    Next
                </button>
            )}
          </div>
        </div>
        )
      }
}

export default Question;