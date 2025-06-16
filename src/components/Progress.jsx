function Progress({points, maxPoints, totalQuestions, contor}) {
    return (
        <>
            <div className="grid grid-cols-2 w-1/2">
                <div className="col-span-2">
                    <progress className="w-full" max={totalQuestions} value={contor} />
                </div>
                <div className="col-span-1">
                    <p className="font-mono font-bold">Question {contor + 1} / {totalQuestions}</p>
                </div>
                <div className="col-span-1 flex justify-end">
                    <p className="font-mono font-bold">{points} / {maxPoints} Points</p>
                </div>
            </div>
        </>
    )
}

export default Progress;