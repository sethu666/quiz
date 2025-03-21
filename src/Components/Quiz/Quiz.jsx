import React, { useState, useRef } from "react";
import "./quiz.scss";
import { data } from "../../assets/data";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);


  const checkAns = (e, ansCode) => {
    const qid = e.target.dataset.id
    const correctans = e.target.dataset.correctans
    const answered = data?.filter(item => item.id == qid)[0].answer === ansCode
    setLock(true)
    if (!lock) {
      if (answered) {
        e.target.classList.add("correct");
      } else {
        e.target.classList.add("wrong");
        const correctOption = e.target.parentElement.querySelectorAll(`.item-${correctans}`)
        correctOption[0].classList.add('correct')
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setLock(false);
    setScore(0);
    setResult(false);
  }

  const generateOptions = (question) => {

    return (
      question.options.map((item, index) => <li
        data-id={question.id}
        data-oid={item.code}
        data-correctans={question.answer}
        className={`item-${item.code}`}
        key={`option-${question.id}-${index}`}
        onClick={(e) => {
          checkAns(e, item.code);
        }}
      >
        {item.name}
      </li>)
    )
  }

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {!result && (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            {
              generateOptions(question)
            }
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} to {data.length} questions
          </div>
        </>
      )}
      {result && (
        <>
          <h2>You Scored {score} out of {data.length}</h2>
          <button onClick={reset}>Reset</button>
        </>
      )}

    </div>
  );
};

export default Quiz;
