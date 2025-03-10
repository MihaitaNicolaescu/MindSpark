import { useState } from 'react'
import './App.css'
import StartQuiz from './components/StartQuiz'
import Question from './components/Question'

function App() {

  const [quizStart, setQuizStart] = useState(false)

  

  if(quizStart === false){
    return (
      <>
        <div className='flex flex-row min-h-screen justify-center items-center bg-[#5C7285]'>
          <StartQuiz setQuizStart={setQuizStart}/>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className='flex flex-row min-h-screen justify-center items-center bg-[#5C7285]'>
          <Question />
        </div>
      </>
    )
  }

}

export default App
