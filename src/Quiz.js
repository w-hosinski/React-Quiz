import React, {useEffect, useState} from "react"
import question from "./questions.json"

const Quiz = () => {
const [questionSet, setQuestionSet] = useState({})
//const [removedArr, setRemovedArr] = useState([false, false, false, false])
const [selectedAnswer, setSelectedAnswer] = useState(0)
const [jokersAvailable, setJokersAvailable] = useState([true,true,true])



const fetchQuestion = () => {
    let questionId = Math.floor(4*Math.random())
    setQuestionSet(question[questionId])
}
const gen5050 = () => {
    let removedArr = [false, false, false, false]
    let i = 0
    while (i<2) {
        let rndAnswer = Math.floor(4*Math.random()) 
        if (rndAnswer != questionSet.correctAnswer && removedArr[rndAnswer] == false){
            removedArr[rndAnswer] = true
            i++
       }  
    }
    let modifiedQS = questionSet
    modifiedQS.a1 = "Penis"
    setQuestionSet(modifiedQS)

}



return(
    <div className="container">
        <button className="btn" onClick={gen5050}>50/50</button>
        <button className="btn">Telefon Joker</button>
        <button className="btn">Publikum Joker</button>
        <input value={questionSet.question || ''} onSelect={fetchQuestion} readOnly></input>
        <input className="answer" id="answer1" value={questionSet.a1 || ""} readOnly onSelect={()=>setSelectedAnswer(1)}></input>
        <input className="answer" id="answer2" value={questionSet.a2 || ""} readOnly onSelect={()=>setSelectedAnswer(2)}></input>
        <input className="answer" id="answer3" value={questionSet.a3 || ""} readOnly onSelect={()=>setSelectedAnswer(3)}></input>
        <input className="answer" id="answer4" value={questionSet.a4 || ""} readOnly onSelect={()=>setSelectedAnswer(4)}></input>
        <label htmlFor="lockInBtn">Antwort Einloggen</label>
        <button className="btn lockIn" name="lockInBtn" 
            onClick={()=>
                selectedAnswer==questionSet.correctAnswer ? console.log("CORRECT") : console.log("FALSE")
            }>☑</button>
    </div>
)

}

export default Quiz