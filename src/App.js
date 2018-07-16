import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var uuid = require("uuid-v4");
// Generate a new UUID
var myUUID = uuid();
// Validate a UUID as proper V4 format
uuid.isUUID(myUUID); // true

var questionNum = 0;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: uuid(),
      title: "",
      author: "",
      questions: [],
      answers: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.removeItem = this.removeItem.bind(this)
  }

  componentDidMount() {
    // componentDidMount() is a React lifecycle method
    this.addQuestion();
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  removeItem (index) {
    questionNum--;
    this.setState(({ questions }) => {
      const mQuestions = [ ...questions ]
      mQuestions.splice(index, 1)
      return { questions: mQuestions }
    })
    this.setState(({ answers }) => {
      const mAnswers = [ ...answers]
      mAnswers.splice(index, 4)
      return { answers: mAnswers}
    })
    console.log(
      "answers",
      this.state.answers,
      "questions",
      this.state.questions,
      questionNum,
      this.state.title,
      this.state.author
    );
  }

  addQuestion() {
    questionNum++;
    this.setState(previousState => {
      const questions = [
                          ...previousState.questions,
                          <input 
                            type="text"
                            onChange={this.handleChange}
                          />
                        ];
      const answers = [
                        ...previousState.answers,
                      ];

      for (var i = 0; i < 4; i++) {
        answers.push(
          <input 
          type="text"
          value={this.setState.answers}
          onChange={this.handleChange}
          name="answers"
          />
        );
      }
      return { questions, answers };
    });
    console.log(
      "answers",
      this.state.answers,
      "questions",
      this.state.questions,
      questionNum,
      this.state.title,
      this.state.author
    );
  }

  render() {
    return (
      <div className="App">
        <div>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Quiz Form 3.0</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
        
        <div  className="formDiv">
          <form>
            <div className="Intro">
              Give your Quiz a title:{" "}
              <input
                type="text"
                value={this.state.title}
                onChange={this.handleChange}
                name="title"
              />
              <br />
              Who's the Author?{" "}
              <input
                type="text"
                value={this.state.author}
                onChange={this.handleChange}
                name="author"
              />
              <br />
              <br />
            </div>
            <div className="questions">
            <div className="questions">
              Now let's add some questions... <br />
              <ol>
              {this.state.questions.map((question, index) => {
                return (
                  <li>
                  <div key={questionNum}>
                    Question
                    {question}<br />
                    <button onClick={ () => this.removeItem(index) }>
                  Remove Question
                </button>
                    Answer Choices<br />
                    {Array.from({ length: 4 }, () => (
                      <div>
                        <input type="checkbox" />
                        <input type="text" name="answers" onChange={this.handleChange} />
                      </div>
                    ))}
                  </div>
                  </li>
                );
              })}
              </ol>
              
            </div>
              {
              // This is what it would look like for the structure
              // I proposed earlier.
              // this.state.questions.map((question) {
              //   return (
              //       <div>{question.quesion}</div>
              //       {
              //           question.answers.map((answer) => {
              //               return (<div>{answer}</div>);
              //           })
              //       }
              //   );
              // })
              // This would output all questions and answers.
              }
            </div>
          </form>
          <button id="addQuestionButton" onClick={this.addQuestion}>Add Question</button>
        </div>
      </div>
    );
  }
}

export default App;
