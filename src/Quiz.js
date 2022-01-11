import React, {useState, useReducer} from "react"
import questions from "./questions.json"

const Quiz = () => {
const [questionSet, setQuestionSet] = useState({})
const [selectedAnswer, setSelectedAnswer] = useState(0)
const [jokersAvailable, setJokersAvailable] = useState([true,true,true])
const [usedQuestions, setUsedQuestions] = useState("")
const [currentLevel, setCurrentLevel] = useState(1)
const [, forceUpdate] = useReducer(x => x + 1, 0)

const forceRefresh = () => forceUpdate()

const fetchQuestion = () => {
    setSelectedAnswer(0)
    let answerList = document.getElementsByClassName("answer")
    for (let i=0; i<answerList.length; i++) answerList[i].className = "answer"
    document.getElementById("next-question").className = "next-question hidden-btn"
    
    let tempLevel = currentLevel
    setCurrentLevel(tempLevel+1)
    tempLevel--
    document.getElementById("level"+currentLevel).className = "current-level"
    if(currentLevel!=1) document.getElementById("level"+tempLevel).className = "passed-level"
    let questionList = questions.filter(questionFilter)
    let questionId = Math.floor(questionList.length*Math.random())
    setQuestionSet(questionList[questionId])
}

const questionFilter = (quest) => {
    if(quest.difficulty == Math.ceil(currentLevel/5) && !usedQuestions.includes(quest.question)) return true
}

const checkAnswer = () => {
    setUsedQuestions([...usedQuestions, questionSet.question])
    document.getElementById("answer"+questionSet.correctAnswer).className = "answer answer-correct"
    if(selectedAnswer!=questionSet.correctAnswer) {
        document.getElementById("answer"+selectedAnswer).className = "answer answer-wrong"
        document.getElementById("restart").className = "restart"    
    }
    else document.getElementById("next-question").className = "next-question"  
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
        <input value={questionSet.question || ''} readOnly></input>
        <input className="answer" id="answer1" value={questionSet.a1 || ""} readOnly onSelect={()=>setSelectedAnswer(1)}></input>
        <input className="answer" id="answer2" value={questionSet.a2 || ""} readOnly onSelect={()=>setSelectedAnswer(2)}></input>
        <input className="answer" id="answer3" value={questionSet.a3 || ""} readOnly onSelect={()=>setSelectedAnswer(3)}></input>
        <input className="answer" id="answer4" value={questionSet.a4 || ""} readOnly onSelect={()=>setSelectedAnswer(4)}></input>
        <label htmlFor="lockInBtn">Antwort Einloggen</label>
        <button className="btn lockIn" name="lockInBtn" onClick={checkAnswer}>☑</button>
        <button className="next-question" id="next-question" onClick={fetchQuestion}>NÄCHSTE FRAGE »</button>
        <button className="restart hidden-btn" id="restart" onClick={()=>window.location.reload(false)}>NEU STARTEN ↻</button>
        <h4 id="level15">Level 15</h4>
        <h4 id="level14">Level 14</h4>
        <h4 id="level13">Level 13</h4>
        <h4 id="level12">Level 12</h4>
        <h4 id="level11">Level 11</h4>
        <h4 id="level10">Level 10</h4>
        <h4 id="level9">Level 9</h4>
        <h4 id="level8">Level 8</h4>
        <h4 id="level7">Level 7</h4>
        <h4 id="level6">Level 6</h4>
        <h4 id="level5">Level 5</h4>
        <h4 id="level4">Level 4</h4>
        <h4 id="level3">Level 3</h4>
        <h4 id="level2">Level 2</h4>
        <h4 id="level1">Level 1</h4>
    </div>
)

}

export default Quiz