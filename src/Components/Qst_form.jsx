import { useState } from "react";
import { MdClose } from "react-icons/md";
import { BsImage } from "react-icons/bs";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { jwtDecode } from "jwt-decode";

function QstForm() {
  const MAX_QUESTIONS = 16;
  const MAX_OPTIONS = 4;
  const MAX_QUESTIONS_PER_TYPE = 4;

  const [formTitle, setFormTitle] = useState(""); // To store form title
  const [formDescription, setFormDescription] = useState(""); // To store form description


  const [questions, setQuestions] = useState([
    {
      id: "q1",
      questionText: "",
      questionType: "chooseQestionType",
      options: [],
      open: false,
      required: false,
      selectedOption: null,
      image: "",
      answer: "",
    },
  ]);

  const countQuestionType = (type) => {
    return questions.filter((q) => q.questionType === type).length;
  };

  const addQuestion = () => {
    if (questions.length < MAX_QUESTIONS) {
      setQuestions([
        ...questions,
        {
          id: `q${questions.length + 1}`,
          questionText: "",
          questionType: "choose question type",
          options: [],
          open: false,
          required: false,
          selectedOption: null,
          image: "",
          answer: "",
        },
      ]);
    }
  };

  const deleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const changeQuestionType = (index, type) => {
    if (countQuestionType(type) >= MAX_QUESTIONS_PER_TYPE) {
      alert(
        `You can add only ${MAX_QUESTIONS_PER_TYPE} questions of type ${type}.`
      );
      return;
    }

    const newQuestions = [...questions];
    newQuestions[index].questionType = type;
    newQuestions[index].options =
      type === "checkbox" || type === "radio" || type === "dropdown" ? [] : [];
    newQuestions[index].answer = "";
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[optIndex] = value;
    setQuestions(newQuestions);
  };

  const addOption = (index) => {
    const newQuestions = [...questions];
    if (newQuestions[index].options.length < MAX_OPTIONS) {
      newQuestions[index].options.push("");
      setQuestions(newQuestions);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newQuestions = [...questions];
    const [reorderedItem] = newQuestions.splice(result.source.index, 1);
    newQuestions.splice(result.destination.index, 0, reorderedItem);
    setQuestions(newQuestions);
  };

  const toggleRequired = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].required = !newQuestions[index].required;
    setQuestions(newQuestions);
  };

  const handleSubmit = async () => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    const decoded = jwtDecode(token);

    // If token doesn't exist, you can handle this case as needed
    if (!token) {
      alert("No authentication token found. Please log in again.");
      return;
    }

    const formData = {
      title: formTitle, // Form title
      description: formDescription, // Form description
      questions: questions, // All questions
      token: decoded.email
    };

    try {
      const response = await fetch("https://custom-forms-server-g2hb.vercel.app/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         
        },
        body: JSON.stringify(formData), // Send title, description, and questions
      });

      if (!response.ok) throw new Error("Failed to submit questions");

      const result = await response.json();
      console.log("Form saved successfully:", result);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  return (
    <div className="h-full pb-8 bg-gray-200">
      <div className="section m-auto w-1/2">
        <div className="form_top bg-white border-t-8 border-emerald-800 rounded-lg p-8 px-6">
          <input
            type="text"
            className="w-full text-3xl border-b"
            placeholder="Untitled Document"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)} // Update title state
          />

          <input
            type="text"
            className="w-full text-base border-b mt-2"
            placeholder="Form Description"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)} // Update description state
          />
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="questions">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {questions.map((ques, i) => (
                  <Draggable key={ques.id} draggableId={ques.id} index={i}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white p-4 mb-4 rounded-lg shadow-md"
                      >
                        <div className="flex justify-between">
                          <input
                            type="text"
                            className="w-4/5 px-3 py-2 border"
                            placeholder="Question"
                            value={ques.questionText}
                            onChange={(e) => {
                              const newQuestions = [...questions];
                              newQuestions[i].questionText = e.target.value;
                              setQuestions(newQuestions);
                            }}
                          />
                          <button
                            onClick={() => deleteQuestion(i)}
                            className="text-red-500"
                          >
                            ✖
                          </button>
                        </div>
                        <select
                          className="border p-2 rounded"
                          value={ques.questionType}
                          onChange={(e) =>
                            changeQuestionType(i, e.target.value)
                          }
                        >
                          <option value="chooseQustionType">
                            Choose Question Type
                          </option>
                          <option value="text">Short Answer</option>
                          <option value="paragraph">Paragraph</option>
                          <option value="number">Integer Value</option>
                          <option value="checkbox">Checkbox</option>
                        </select>
                        {ques.questionType === "checkbox" && (
                          <div className="mt-2">
                            {ques.options.map((option, optIndex) => (
                              <div key={optIndex} className="flex items-center">
                                <input
                                  type={ques.questionType}
                                  className="mr-2"
                                />
                                <input
                                  type="text"
                                  className="w-full px-3 py-2 border"
                                  placeholder={`Option ${optIndex + 1}`}
                                  value={option}
                                  onChange={(e) =>
                                    handleOptionChange(
                                      i,
                                      optIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                            {ques.options.length < MAX_OPTIONS && (
                              <button
                                onClick={() => addOption(i)}
                                className="text-blue-500"
                              >
                                Add Option
                              </button>
                            )}
                          </div>
                        )}
                        <div className="mt-2">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={ques.required}
                              onChange={() => toggleRequired(i)}
                              className="mr-2"
                            />{" "}
                            Required
                          </label>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {questions.length < MAX_QUESTIONS && (
          <button
            onClick={addQuestion}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Question
          </button>
        )}
        <button
          onClick={handleSubmit}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded ml-4"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default QstForm;
