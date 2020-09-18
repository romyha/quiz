import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from '@material-ui/core/Grid';
import data from './data';
import { Button, withStyles } from '@material-ui/core';
import { Route, Router } from 'react-router-dom';
import AddQuestion from './addQuestion';

const StyledButton = withStyles({
  root: {
    background: 'cadetblue',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgb(37 216 214 / 30%)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

function Quiz() {
  const [markAnswers, setMarkAnswers] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  
  data[0].active = true;

  const checkAnswer = answer => {
    setSelectedAnswer(answer);
    setMarkAnswers(true);
  }

  const getAnswerStyle = answer => {
    if (markAnswers && answer.right) {
      return 'right-answer';
    }
    if (markAnswers && answer === selectedAnswer && !answer.right) {
      return 'wrong-answer';
    }
  }

  const nextAnswer = () => {
    setMarkAnswers(false);
    setSelectedQuestion(selectedQuestion + 1);
    console.log(data.length, selectedQuestion)
  }

  return (
    <div className="App">
      <header className="App-header">
        {data.map((entry, i) => <div key={i} hidden={i !== selectedQuestion}><Grid spacing={3} container>
          <Grid item lg={12} md={12}>
            {entry.text}
          </Grid>
          {entry.answers.map((answer, i) => <Grid  className="answer" key={i} item lg={6} md={6}><Button className="answer" onClick={() => checkAnswer(answer)} className={getAnswerStyle(answer)} variant="contained">{answer.text}</Button></Grid>)}
        </Grid>
        </div>)}
        <div hidden={selectedQuestion >= data.length - 1} >
        <StyledButton variant="contained" onClick={nextAnswer}>WEITER</StyledButton>

        </div>
      </header>
    </div>
  );
}

export default Quiz;
