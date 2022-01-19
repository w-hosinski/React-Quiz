import React, {useState, useReducer} from "react"
import questions from "./questions.json"
import './quiz.scss'

const Quiz = () => {
const [questionSet, setQuestionSet] = useState({})
const [selectedAnswer, setSelectedAnswer] = useState(0)
const [jokersAvailable, setJokersAvailable] = useState([true,true,true])
const [usedQuestions, setUsedQuestions] = useState("")
const [currentLevel, setCurrentLevel] = useState(1)
const [removedArr, setRemovedArr] = useState([false, false, false, false])
const [telVar, setTelVar] = useState("")
const [telWords, setTelWords] = useState("")
const [, forceUpdate] = useReducer(x => x + 1, 0)
const phoneOdds = [0.8,0.6,0.4]
const publicumOdds = []

const forceRefresh = () => forceUpdate()

const fetchQuestion = () => {
    setSelectedAnswer(0)
    let answerList = document.getElementsByClassName("answer")
    for (let i=0; i<answerList.length; i++) answerList[i].className = "answer"
    document.getElementById("next-question").className = "next-question hidden-btn"
    document.getElementById("lockIn").className = "lockIn"
    document.getElementById("telJoker").className = "telJoker hidden-btn"
    let tempLevel = currentLevel
    setCurrentLevel(tempLevel+1)
    let questionList = questions.filter(questionFilter)
    let questionId = Math.floor(questionList.length*Math.random())
    setQuestionSet(questionList[questionId])
}

const questionFilter = (quest) => {
    if(quest.difficulty == Math.ceil(currentLevel/5) && !usedQuestions.includes(quest.question)) return true
}

const checkAnswer = () => {
    if (selectedAnswer!=0) {
        document.getElementById("lockIn").className = "lockIn hidden-btn"
        setUsedQuestions([...usedQuestions, questionSet.question])
        if(selectedAnswer!=questionSet.correctAnswer) {
            document.getElementById("answer"+selectedAnswer).className = "answer answer-wrong"
            document.getElementById("answer"+questionSet.correctAnswer).className = "answer answer-corrected"
            document.getElementById("loserScreen").className = "winnerScreen"
            document.getElementById("restart").className = "restart"    
        }
        else {
            document.getElementById("answer"+questionSet.correctAnswer).className = "answer answer-correct"
            if(currentLevel==16) {
                document.getElementById("winnerScreen").className = "winnerScreen"
                let tempLevel = currentLevel
                setCurrentLevel(tempLevel+1)
                document.getElementById("restart").className = "restart"
            }
            else document.getElementById("next-question").className = "next-question" 
        } 
    } 
}

const gen5050 = () => {
    if(jokersAvailable[0] && document.getElementById("lockIn").className == "lockIn") { 
        let i = 0
        while (i<2) {
            let rndAnswer = Math.ceil(4*Math.random()) 
            if (rndAnswer != questionSet.correctAnswer && removedArr[rndAnswer-1] == false){
                let tempRemovedArr = removedArr
                tempRemovedArr[rndAnswer-1] = true
                setRemovedArr(tempRemovedArr)
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
        document.getElementById("joker1").className = "btn btn-used"
        forceRefresh()
    }
}

const genTel = () => {
    if(jokersAvailable[1] && document.getElementById("lockIn").className == "lockIn") {
        document.getElementById("telJoker").className = "telJoker"
        let numberLetterArr = ["A", "B", "C", "D"]
        let telWordsArr = ["bin mir recht sicher", "denke", "vermute"]
        setTelWords(telWordsArr[questionSet.difficulty-1])
        let rndHint = Math.random()
        console.log(rndHint)
        if(rndHint<phoneOdds[questionSet.difficulty-1]) {
            setTelVar(numberLetterArr[questionSet.correctAnswer-1])
        }
        else {
            let i = Math.ceil(4*Math.random())
            let j = 0
            while(j<1){
                if(i!=questionSet.correctAnswer && !removedArr[i-1]) {
                    setTelVar(numberLetterArr[i-1])
                    console.log(numberLetterArr[i-1])
                    j++
                }
            }  
        }
        let jokers = jokersAvailable
        jokers[1] = false
        setJokersAvailable(jokers)
        document.getElementById("joker2").className = "btn btn-used"
    }
}

return(
    <div className="container">
        <button className="btn" id="joker1" onClick={gen5050}>50/50</button>
        <button className="btn" id="joker2" onClick={genTel}>Telefon Joker</button>
        <button className="btn" id="joker3">Publikum Joker(Nicht fertig)</button>

        <textarea wrap="soft" className="question" id="question" value={questionSet.question || ''} readOnly></textarea>
        <input className="answer" id="answer1" value={questionSet.a1 || ""} readOnly onSelect={()=>setSelectedAnswer(1)}></input>
        <input className="answer" id="answer2" value={questionSet.a2 || ""} readOnly onSelect={()=>setSelectedAnswer(2)}></input>
        <input className="answer" id="answer3" value={questionSet.a3 || ""} readOnly onSelect={()=>setSelectedAnswer(3)}></input>
        <input className="answer" id="answer4" value={questionSet.a4 || ""} readOnly onSelect={()=>setSelectedAnswer(4)}></input>
        
        <button className="lockIn hidden-btn" id="lockIn" onClick={checkAnswer}>☑</button>
        <button className="next-question" id="next-question" onClick={fetchQuestion}>NÄCHSTE FRAGE »</button>
        <button className="restart hidden-btn" id="restart" onClick={()=>window.location.reload(false)}>NEU STARTEN ↻</button>
        <img className="ladder" src={require(`./img/level${currentLevel}.png`).default} alt=""/>
        <h1 className="winnerScreen hidden-btn" id="winnerScreen" >DU HAST GEWONNEN!</h1>
        <h1 className="winnerScreen hidden-btn" id="loserScreen" >LEIDER VERLOREN!</h1>
        <h1 className="telJoker hidden-btn" id="telJoker">Ich {telWords}, dass es Antwort {telVar} ist.</h1>
    </div>
)
}
export default Quiz