import React from "react";

function QuestionItem({ question, deleteQuestion, updateQuestion  }) {
  const { id, prompt, answers, correctIndex } = question;

   
   function handleUpdateQuestion(event) {
    const newCorrectIndex = parseInt(event.target.value, 10); 
    const updatedQuestion = { ...question, correctIndex: newCorrectIndex };

   
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: newCorrectIndex,
      }),
    })
      .then((r) => r.json())
      .then(() => updateQuestion(updatedQuestion)); 
  }

 
  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => deleteQuestion(id)); 
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleUpdateQuestion}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;