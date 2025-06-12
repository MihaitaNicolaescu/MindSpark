function Finished({points, maxPoints, setStatus}){
    return(
        <div className="grid w-1/2">
            <p className="text-xl font-medium mb-5 mt-5 text-center">You've scored {points} of {maxPoints} points.</p>
            <button className='rounded bg-[#A7B49E] w-full h-10 font-bold' onClick={() => {setStatus("active")}}>Restart Quiz</button>
        </div>
    )
}

export default Finished;