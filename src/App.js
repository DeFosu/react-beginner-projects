import React from 'react';
import './index.scss';

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
];

function Result({result, onClickReset}) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Вы отгадали {result} ответа из {questions.length}</h2>
      <button onClick={onClickReset}>Попробовать снова</button>
    </div>
  );
}

function Game({question, step, onClickVariant}) {
  const progress = Math.round(step/questions.length*100); 

  return (
    <>
      <div className="progress">
        <div style={{ width: `${progress}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((text, index) => <li onClick={() => onClickVariant(index)}  key={text} >{text}</li>)}
      </ul>
    </>
  );
}

function App() {
  const [step, setStep] = React.useState(0);
  const [result, setResult] = React.useState(0);
  const question = questions[step];

    const onClickVariant = (index) => {
      if (index == question.correct){
        setResult(result + 1)
      } 
      console.log(result);
      setStep(step + 1);
    }

    const onClickReset = () => {
      setStep(0);
      setResult(0);
    }

  return (
    <div className="App">
      { step != questions.length ? <Game question = {question} step={step} onClickVariant = {onClickVariant} /> : <Result result = {result} onClickReset = {onClickReset}  />}
    </div>
  );
}

export default App;
