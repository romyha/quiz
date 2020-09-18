import React, { useState } from 'react';
import { TextField, Grid, Button, Checkbox } from '@material-ui/core';

const handleSaveToPC = jsonData => {
    const fileData = JSON.stringify(jsonData);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'filename.json';
    link.href = url;
    link.click();
}

function AddQuestion() {
    const [question, setQuestion] = useState('');
    const [questions, setQuestions] = useState([]);
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [answer4, setAnswer4] = useState('');
    const [answer1Right, setAnswer1Right] = useState(false);
    const [answer2Right, setAnswer2Right] = useState(false);
    const [answer3Right, setAnswer3Right] = useState(false);
    const [answer4Right, setAnswer4Right] = useState(false);

    const save = () => {
        console.log(questions)
        if (!!question && !!answer1 && !!answer2 && !!answer3 && !!answer4) {
            questions.push({ text: question, answers: [{ text: answer1, right: answer1Right }, { text: answer2, right: answer2Right }, { text: answer3, right: answer3Right }, { text: answer4, right: answer4Right }] });
            setQuestions(questions)
            console.log(questions)
            setQuestion('');
            setAnswer1('');
            setAnswer2('');
            setAnswer3('');
            setAnswer4('');
            setAnswer1Right(false);
            setAnswer2Right(false);
            setAnswer3Right(false);
            setAnswer4Right(false);
        }
    }

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item lg={12} md={12}>
                    <TextField value={question} onChange={e => setQuestion(e.target.value)} fullWidth variant="outlined" label="Frage" />
                </Grid>
                <Grid item lg={3} md={3}>
                    <Checkbox value={answer1Right} checked={answer1Right} onChange={e => setAnswer1Right(!answer1Right)} />Richtige Antwort
                    <TextField value={answer1} onChange={e => setAnswer1(e.target.value)} fullWidth variant="outlined" label="Antwort 1" />
                </Grid>
                <Grid item lg={3} md={3}>
                    <Checkbox value={answer2Right} checked={answer2Right} onChange={e => setAnswer2Right(!answer2Right)} />Richtige Antwort
                    <TextField value={answer2} onChange={e => setAnswer2(e.target.value)} fullWidth variant="outlined" label="Antwort 2" />
                </Grid>
                <Grid item lg={3} md={3}>
                    <Checkbox value={answer3Right} checked={answer3Right} onChange={e => setAnswer3Right(!answer3Right)} />Richtige Antwort
                    <TextField value={answer3} onChange={e => setAnswer3(e.target.value)} fullWidth variant="outlined" label="Antwort 3" />
                </Grid>
                <Grid item lg={3} md={3}>
                    <Checkbox value={answer4Right} checked={answer4Right} onChange={e => setAnswer4Right(!answer4Right)} />Richtige Antwort
                    <TextField value={answer4} onChange={e => setAnswer4(e.target.value)} fullWidth variant="outlined" label="Antwort 4" />
                </Grid>
            </Grid>
            <Button onClick={save} variant="contained" color="primary">add and next</Button>
            <Button onClick={() => handleSaveToPC(questions)} variant="contained" color="primary">save to file</Button>
        </div>)
}

export default AddQuestion;