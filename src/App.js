import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from '@material-ui/core/Grid';
import data from './data';
import { Button, withStyles } from '@material-ui/core';
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom';
import AddQuestion from './addQuestion';
import Quiz from './quiz';

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

function App() {
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
    <Router>
      <div>
        

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/quiz">
            <Quiz />
          </Route>
          <Route path="/add">
            <AddQuestion />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
