import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from '@material-ui/core/Grid';
import data from './data';
import { Button, withStyles, TextField, Typography, Snackbar } from '@material-ui/core';
import { Route, Router } from 'react-router-dom';
import AddQuestion from './addQuestion';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

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
    const fail = new Audio('/fail.mp3');
    const win = new Audio('/win.mp3');
    const [markAnswers, setMarkAnswers] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState(0);
    const [guess, setGuess] = useState('');
    const [matches, setMatches] = useState([]);
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    data[0].active = true;

    const checkAnswer = answer => {
        if (answer.right) {
            win.play();
        } else {
            fail.play();
        }
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

    const lastAnswer = () => {
        setMarkAnswers(false);
        setSelectedQuestion(selectedQuestion - 1);
        console.log(data.length, selectedQuestion)
    }

    const makeGuess = () => {
        const match = data[selectedQuestion].answers.find(answer => {
            return answer.text.toLowerCase().includes(guess.toLowerCase())
        });
        if (match) {
            win.play();
            matches.push(match);
            setMatches(matches);
        } else {
            setOpen(true);
            fail.play();
        }
        setGuess('')
    }

    return (
        <div className="App">
            <header className="App-header">
                {data.map((entry, i) =>
                    <div key={i} hidden={i !== selectedQuestion}>
                        <div hidden={entry.type === 'familienDuell'}>
                            <Grid spacing={3} container>
                                <Grid item lg={12} md={12}>
                                    {entry.text}
                                </Grid>
                                {entry.answers.map((answer, i) =>
                                    <Grid className="answer" key={i} item lg={6} md={6}>
                                        <Button className="answer" onClick={() => checkAnswer(answer)} className={getAnswerStyle(answer)} variant="contained">{answer.text}</Button>
                                    </Grid>)}
                            </Grid>
                        </div>
                        <div hidden={entry.type !== 'familienDuell'} >
                            <Grid spacing={3} container>
                                <Grid item lg={12} md={12}>
                                    <Typography variant="h3">Wir haben 100 Kinder gefragt...</Typography>
                                </Grid>
                                <Grid item lg={12} md={12}>
                                    <Typography variant="h5">{entry.text}</Typography>
                                </Grid>
                                <Grid item lg={12} md={12}>
                                    {matches.map((match, i) => <Typography key={i} variant="body2">{match.text + ' --- ' + match.number}</Typography>)}
                                </Grid>
                                <Grid item lg={12} md={12}>
                                    <TextField value={guess} onChange={e => setGuess(e.target.value)} variant="outlined" fullWidth />
                                </Grid>

                            </Grid>
                            <StyledButton className="check-button" variant="contained" onClick={makeGuess}>PRÜFEN</StyledButton>
                        </div>
                    </div>
                )}
                <Grid container spacing={3}>
                    <Grid hidden={selectedQuestion === 0} item lg={12} md={12}>
                        <div>
                            <StyledButton variant="contained" onClick={lastAnswer}>ZURÜCK</StyledButton>
                        </div>
                    </Grid>
                    <Grid hidden={selectedQuestion >= data.length - 1} item lg={12} md={12}>
                        <div>
                            <StyledButton variant="contained" onClick={nextAnswer}>WEITER</StyledButton>
                        </div>
                    </Grid>
                </Grid>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        Das war leider nicht dabei!
                    </Alert>
                </Snackbar>
            </header>
        </div>
    );
}

export default Quiz;
