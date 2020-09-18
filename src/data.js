const questions = [{
    text: 'Wann wurde Tomi geboren?',
    answers: [{text: '1990', right: true}, {text: '1991', right: false}, {text: '1968', right: false}, {text: '2003', right: false}]
}, {
    text: 'Was war Tomis erste Sportart?',
    answers: [{text: 'Fußball', right: true}, {text: 'Volleyball', right: false}, {text: 'Leichtathletik', right: false}, {text: 'Puzzlen', right: false}]
}, {
    text: 'Wo ist Tomi aufgewachsen?',
    answers: [{text: 'Warschau', right: false}, {text: 'Im Busch', right: false}, {text: 'Berlin', right: true}, {text: 'Sporthalle', right: false}]
}, {
    text: 'Was ist dein Lieblingstier?', type: 'familienDuell',
    answers: [{text: 'Hund', right: false, number: 25}, {text: 'Katze', number: 12, right: false}, {text: 'Delfin', number: 7, right: true}, {text: 'Hasen', number: 6, right: false}]
}]

export default questions;