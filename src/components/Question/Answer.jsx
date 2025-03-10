function Answer({option, isChecked, onClick}){
    return (
        <div onClick={onClick} className={`hover:bg-[#818C78] hover:cursor-pointer font-semibold text-2xl m-2 p-2 w-full text-center border-2 ${isChecked ? 'ml-8 bg-[#818C78]' : 'bg-[#E2E0C8]'}`}>
            {option}
        </div>
    )
}

export default Answer;