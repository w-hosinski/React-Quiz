import React, {useEffect, useState, useReducer} from "react"
import question from "./questions.json"

const Quiz = () => {
const [questionSet, setQuestionSet] = useState({})
const [selectedAnswer, setSelectedAnswer] = useState(0)
const [jokersAvailable, setJokersAvailable] = useState([true,true,true])
const [, forceUpdate] = useReducer(x => x + 1, 0)

const forceRefresh = () => forceUpdate()

const fetchQuestion = () => {
    let questionId = Math.floor(4*Math.random())
    setQuestionSet(question[questionId])
}

const checkAnswer = () => {
    document.getElementById("answer"+questionSet.correctAnswer).className = "answer answer-correct"
    if(selectedAnswer!=questionSet.correctAnswer) {
        document.getElementById("answer"+selectedAnswer).className = "answer answer-wrong"
    }  
}

const gen5050 = () => {
    if(jokersAvailable[0]) {
        let removedArr = [false, false, false, false]
        let i = 0
        while (i<2) {
            let rndAnswer = Math.ceil(4*Math.random()) 
            if (rndAnswer != questionSet.correctAnswer && removedArr[rndAnswer-1] == false){
                removedArr[rndAnswer-1] = true
                i++
           }  
        }
        if(removedArr[0]) questionSet.a1 = ""
        if(removedArr[1]) questionSet.a2 = ""
        if(removedArr[2]) questionSet.a3 = ""
        if(removedArr[3]) questionSet.a4 = ""
        let jokers = jokersAvailable
        jokers[0] = false
        setJokersAvailable(jokers)
        document.getElementById("5050joker").className = "btn btn-used"
        forceRefresh()
    }
}

return(
    <div className="container">
        <button className="btn" id="5050joker" onClick={gen5050}>50/50</button>
        <button className="btn">Telefon Joker</button>
        <button className="btn">Publikum Joker</button>
        <input value={questionSet.question || ''} onSelect={fetchQuestion} readOnly></input>
        <input className="answer" id="answer1" value={questionSet.a1 || ""} readOnly onSelect={()=>setSelectedAnswer(1)}></input>
        <input className="answer" id="answer2" value={questionSet.a2 || ""} readOnly onSelect={()=>setSelectedAnswer(2)}></input>
        <input className="answer" id="answer3" value={questionSet.a3 || ""} readOnly onSelect={()=>setSelectedAnswer(3)}></input>
        <input className="answer" id="answer4" value={questionSet.a4 || ""} readOnly onSelect={()=>setSelectedAnswer(4)}></input>
        <label htmlFor="lockInBtn">Antwort Einloggen</label>
        <button className="btn lockIn" name="lockInBtn" onClick={checkAnswer}>☑</button>
    </div>
)

}

export default Quiz