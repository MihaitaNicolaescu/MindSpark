import axios from "axios";
import { useEffect, useState } from "react";
import Answer from "./Question/Answer";

function Question(){
    const [data, setData] = useState([]);
    const [contor, setContor] = useState(0);
    const [answerSelected, setAnswerSelected] = useState(null);

    useEffect(function () {
          axios.get("http://localhost:8789/quiz").then((response) => {
            setData(response.data);
            console.log(response.data);
          })
      }, []);

      function nextQuestion(){
        setContor(contor + 1);
        setAnswerSelected(null);
      }

      if(data.length > 0 && contor < data.length){
        return(
        <div className="grid place-items-center">
            <div className="grid place-items-center">
                <p className="text-3xl font-bold mb-10">{data[contor].question}</p>
                <Answer option={data[contor].answers[0]} isChecked={answerSelected === 0} onClick={() => {setAnswerSelected(0)}} />
                <Answer option={data[contor].answers[1]} isChecked={answerSelected === 1} onClick={() => {setAnswerSelected(1)}} />
                <Answer option={data[contor].answers[2]} isChecked={answerSelected === 2} onClick={() => {setAnswerSelected(2)}} />
                <Answer option={data[contor].answers[3]} isChecked={answerSelected === 3} onClick={() => {setAnswerSelected(3)}} />
            </div>
            <div className="flex justify-center items-center gap-4 mt-10">
            <p className="bg-[#A7B49E] w-20 font-xl text-center font-bold p-2 rounded-xl m-2">6:23</p>
            {answerSelected !== null && (
                <button
                    className="bg-[#A7B49E] w-20 font-xl text-center font-bold hover:cursor-pointer hover:bg-[#818C78] p-2 rounded-xl"
                    onClick={() => nextQuestion()}
                >
                    Next
                </button>
            )}
            </div>
        </div>
        )
      } else if(contor >= data.length){
        return (
            <>
                <button onClick={() => {window.location.reload(true)}}>Restart QUIZ</button>
            </>
        )
      }
}

export default Question;