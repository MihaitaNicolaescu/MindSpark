function Finished({points, maxPoints, setStatus, appDispatch}){
    return(
        <div className="grid w-1/2">
            <p className="text-xl font-medium mb-5 mt-5 text-center">You&apos;ve scored {points} of {maxPoints} points.</p>
            <button className='rounded bg-[#A7B49E] w-full h-10 font-bold' onClick={() => {setStatus("notStarted"); appDispatch({type: "reset", payload: true});}}>Restart Quiz</button>
        </div>
    )
}

export default Finished;