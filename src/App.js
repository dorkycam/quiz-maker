import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';

const uuidv4 = require('uuid/v4');
uuidv4();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quizTitle: "",
      author: "",
      key: uuidv4(),
      questions: [], answers: [], 
      numQuestions: [{number: '', key: uuidv4()}],
      // question: [
      //   {
      //     questions: '',
      //     answers: '',
      //     key: Date.now()
      //   }
      // ]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = () => {
    var questions = [];
    this.state.questions.map((questionObject) => {
      questions.push({
         id: questionObject.qid,
        questionText: questionObject.value,
        answers: this.state.answers.filter((answer) => answer.id = questionObject.id)
      });
    });
  }

  handleAnswerChange = (questionIdx, event) => {
    this.setState({
      answers: this.state.questions.push({qid: questionIdx, value: event.value})
    });
  }

  handleQuestionChange = (questionIdx, event) => {
    this.setState({
      answers: this.state.answers.push({qid: questionIdx, value: event.value})
    });
  }

  answersGenerator = ()  => {

    for (var i = 2; i < 5; i++){
      
      this.setState ({
        answerGroup: this.state.answerGroup.concat({
          key: uuidv4(), text: "", correctAnswer: true
        })
      });

    }
  }

  addQuestion = (e) => {
    e.preventDefault();
    this.setState({numQuestions: this.state.numQuestions.concat({
      number: '', 
      key: Date.now()
      })
    });
   }

  render() {
    return (
      <div className="App">
        <div>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>

        <div className="container">
          <div className="columns">
            <div className="formDiv">
              <form className="form" onSubmit={this.handleSubmit}>
                <div className="field">
                  <label className="label">Give your quiz a title.</label>
                    <input
                      className="input"
                      type="text"
                      name="quizTitle"
                      value={this.state.quizTitle}
                      onChange={this.handleChange}
                    />
                </div>

                <div className="field">
                  <label className="label">Who's the Author?</label>
                    <input
                      className="input"
                      type="text"
                      name="author"
                      value={this.state.author}
                      onChange={this.handleChange}
                    />
                </div>

                <div className="questions" id="questions">
                  {this.state.numQuestions.map((question, questionIdx) => {
                    return (
                      <div id={uuidv4()}> 
                        <label>Question {questionIdx + 1}</label>
                      <input type="text"  key={uuidv4()}/>
                        {
                        Array(4).fill().map((number, index) => {
                          return (
                            <div key={question.key}>
                              <input key={uuidv4()} type="text" key={index} onChange={this.handleAnswerChange.bind(question, question.key)}  />
                              {console.log(question.key)}
                              {console.log(question)}
                              {console.log('questions array ' + this.state.questions)}
                              {console.log('answers array ' + this.state.answers)}
                            </div>
                            
                          )
                        })
                        }
                      </div>
                    );
                  }
                  )}
                </div>

                {/* <div className="questions" id="questions">
                  {Array(this.state.question).fill().map((questions, questionIdx) => {
                    return (
                      <div id={questionIdx}> 
                        <label>Question {questionIdx + 1}</label>
                    </div>);
                  })
                  }
                </div> */}



              <div className="field">
                  <div className="endButtons">
                    <button id="addQuestionButton"
                      onClick={this.addQuestion}>Add Question</button>
                    <input
                      type="submit"
                      value="Submit"
                      id="submitButton"
                      className="button is-primary"
                    />
                  </div>
              </div>
              </form>
          </div>
         
            <div className="quizPreview">
              <pre>
                <code>
                  <p>Quiz Title: {this.state.quizTitle}</p>
                  <p>Author: {this.state.author}</p>
                  <p>Question: {this.state.question}</p>
                  <p>Answer Choices:</p>
                  <p>a: {this.state.answer1}</p>
                  <p>b: {this.state.answer2}</p>
                  <p>c: {this.state.answer3}</p>
                  <p>d: {this.state.answer4}</p>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;


/*    div.innerHTML =
        '<div className="question" id="questionGroup' + {questionNum}+'">\
        <div className="field">\
          <label className="label" id="question' + {questionNum}+'">Question '+{questionNum}+'</label>\
          <div className="control">\
            <input\
              className="input"\
              type="text"\
              name="question"\
              value='+{this.state.question}+'\
              onChange='+{this.handleChange}+'\
            />\
          </div>\
        </div>\
        \sfsffsfsfsfsf
        <div className="answersDiv">\
        <label className="label">Answers</label>\
          <div className="field">\
            <div className="control">\
              <label className="checkbox">\
              </label>\
            </div>\
          </div>\
        </div>\
        \
      </div>';*/


      /* alternative addQuestion
        var div = document.createElement('div');

    div.className = "questions" + questionNum;

    div.innerHTML =
        '<div className="question" id="questionGroup' +{questionNum}+'">\
        <p>poop</p></div>';

      document.getElementsByClassName('questions')[0].appendChild(div)
      */


      /* alternative answers generator
          var answers = []
    for (var i = 1; i < 5; i++){
      var stateName = "answer" + i + "question" + questionNum;
      var stateNameBox = "answer" + i + "Box" + "question" + questionNum;
      answers.push(
        <div className="field">
          <div className="control">
            <label className="checkbox">
               <input
                 name="terms"
                 type="checkbox"
                 id={'question'+questionNum+'Answer'+i+'Box'}
                 checked={this.state.stateNameBox} 
                 onChange={this.handleChange}
               />
                  <input
                  className="input"
                  type="text"
                  id={'question'+questionNum+'Answer'+i}
                  name={"answer"+i}
                  value={this.state.stateName}
                  onChange={this.handleChange}
                  />
           </label>
         </div>
        </div>
       );
    } 
    return <div className={'answer'+questionNum}> {answers.map(answer => answer)} </div>
      */