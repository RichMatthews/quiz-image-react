import React from 'react';
import ReactDOM from 'react-dom';

//import rh from 'richs-helpers';

import uk from '../images/uk.svg';
import italy from '../images/italy.svg';
import usa from '../images/usa.svg';
import chile from '../images/chile.svg';
import brazil from '../images/brazil.svg';
import france from '../images/france.svg';
import japan from '../images/japan.svg';
import indonesia from '../images/indonesia.svg';
import madagascar from '../images/madagascar.svg';
import malawi from '../images/malawi.svg';

import './index.scss';

const easyQuestions = [{
    answer: ['uk', 'united kingdom'],
    svg: uk,
    category: 'easy'
  }, {
    answer: 'italy',
    svg: italy,
    category: 'easy'
  }, {
    answer: ['usa', 'united states', 'us'],
    svg: usa,
    category: 'easy'
  }, {
    answer: 'chile',
    svg: chile,
    category: 'easy'
  }
];
const mediumQuestions = [{
   answer: 'brazil',
   svg: brazil,
   category: 'medium'
  }, {
    answer: 'france',
    svg: france,
    category: 'medium'
  }, {
    answer: 'japan',
    svg: japan,
    category: 'medium'
  }, {
    answer: 'indonesia',
    svg: indonesia,
    category: 'medium'
  }];
const hardQuestions = [{
    answer: 'malawi',
    svg: malawi,
    category: 'hard'
  },{
    answer: 'madagascar',
    svg: madagascar,
    category: 'hard'
  }
];

class QuizApp extends React.Component {

  constructor(props) {
   super(props);
   this.state = {
     score: 0,
     questionNumber: 0,
     playerAnswers: [],
     finished: false,
     lastQuestion: false,
     questions: []
   }
   this.checkAnswer = this.checkAnswer.bind(this);
   this.submitAnswer = this.submitAnswer.bind(this);
 }

  submitAnswer(answer) {
    let newAnswer = answer.toLowerCase();
    const questionNumber = this.state.questionNumber;
    const questions = this.state.questions;
    this.isItLastQuestion();
    this.storeItem(newAnswer);
    if (questionNumber !== questions.length - 1){
      this.setState((prevState) => ({questionNumber: prevState.questionNumber + 1}))
    }
    this.checkAnswer(newAnswer)
  }

  storeItem(answer) {
    localStorage.setItem(`question ${this.state.questionNumber}`, answer)
  }

  componentDidMount() {
    let shuffledEasy = this.shuffle(easyQuestions)
    let shuffledMedium = this.shuffle(mediumQuestions)
    let shuffledHard = this.shuffle(hardQuestions)
    let array = []
    let selectedQuestions = array
    .concat(shuffledEasy[0])
    .concat(shuffledMedium[0])
    .concat(shuffledHard[0])
    this.setState({ questions: selectedQuestions})
    //this.initiateQuiz();
  }

  shuffle(array) {
  	let arrayClone = array.slice(0);
  	var tempArray = [];
  	while(arrayClone.length > 0){
    	const min = 0;
    	const max = (arrayClone.length);
    	const val = Math.floor(Math.random() * (max-min) + min)
    	const index = arrayClone.indexOf(arrayClone[val])
    	const removedItem = arrayClone.splice(index, 1)
    	tempArray = tempArray.concat(removedItem)
    }
  	arrayClone = tempArray;
  	return arrayClone;
  }

  insideArray(a, array) {
    for (var i=0; i < array.length; i++){
      if (array[i] == a) {
        return true;
      }
    }
  }

  onEnter() {

  }

  isItLastQuestion(){
    if (this.state.questionNumber == this.state.questions.length - 1){
      this.setState({ finished: true })
    }
  }

  calculateQuestionScore() {
    let score = this.state.score;
    switch(this.state.questions[this.state.questionNumber].category) {
      case 'easy':
        this.setState({score: score + 1})
        break;
      case 'medium':
        this.setState({score: score + 3})
        break;
      case 'hard':
        this.setState({score: score + 7})
        break;
    }
  }

  checkAnswer(answer) {
    const questions = this.state.questions;
    const questionNumber = this.state.questionNumber;
    if (questions[questionNumber].answer.constructor === Array) {
      if (this.insideArray(answer, questions[questionNumber].answer)) {
        this.calculateQuestionScore();
      }
    }
    else {
      if (answer == questions[questionNumber].answer){
        this.calculateQuestionScore();
      }
    }
  }

  finish() {
    this.setState({ finished: true })
  }

  render() {
    const { score, questions, questionNumber, lastQuestion, finished } = this.state;
    return (
      <div className="container">
          <div className="wrapper">
            <div className="heading">
              Name the country
            </div>
            <div className="imageWrapper">
              {questions[questionNumber] ?
                <span dangerouslySetInnerHTML={{__html: questions[questionNumber].svg}} />
                :
                null
              }
            </div>
            <div className="countryInput">
              <input ref="answerInput"/>
            </div>
            {lastQuestion ?
              <div>
                <button onClick={() => this.finish()}>Finish</button>
              </div>
              :
              <div>
                <button onClick={() => this.submitAnswer(this.refs.answerInput.value)}>Next</button>
              </div>
            }
            <div className="feedback">
              { (finished) ?
                <div>
                <div className="feedbackHeadings">
                 <div className="feedbackSubHeadings">
                  <span>You said</span>
                    {questions.map(function(question, index) {
                    return <div>
                            <p>{localStorage.getItem('question ' + index)}</p>
                          </div>
                    })}
                 </div>
                 <div className="feedbackSubHeadings">
                  <span>Correct Answer</span>
                  {questions.map(function(question, index) {
                  return <div>
                          <p>{question.answer}</p>
                        </div>
                  })}
                 </div>
                </div>
                {score}/30 points
              </div>
              :
              null
            }
          </div>
          </div>
      </div>
    );
  }
}

ReactDOM.render(<QuizApp />,
    document.getElementById('content'));
