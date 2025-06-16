function StartQuiz({setStatus, appDispatch}) {
    return(
        <div className='grid grid-flow-row'>
          <p className='text-[50px] text-[#E2E0C8] font-thin font-serif'>MindSpark</p>
          <button className='rounded bg-[#A7B49E] w-full h-10 font-bold' onClick={() => {setStatus("active"); appDispatch({type: "setStarted", payload: true})}}>Start Quiz</button>
        </div>
    )
}

export default StartQuiz;