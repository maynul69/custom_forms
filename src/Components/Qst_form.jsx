import { useState } from "react";
import { MdClose } from "react-icons/md";
import { BsImage } from "react-icons/bs";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function QstForm() {
    const [questions, setQuestions] = useState([
        {
            id: "q1",
            questionText: "",
            questionType: "text",
            options: [],
            open: false,
            required: false,
            selectedOption: null,
            image: "",
            answer: ""
        }
    ]);

    const addQuestion = () => {
        setQuestions([...questions, {
            id: `q${questions.length + 1}`,
            questionText: "",
            questionType: "text",
            options: [],
            open: false,
            required: false,
            selectedOption: null,
            image: "",
            answer: ""
        }]);
    };

    const deleteQuestion = (index) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const toggleRequired = (index) => {
        const newQuestions = [...questions];
        newQuestions[index].required = !newQuestions[index].required;
        setQuestions(newQuestions);
    };

    const handleQuestionTextChange = (index, text) => {
        const newQuestions = [...questions];
        newQuestions[index].questionText = text;
        setQuestions(newQuestions);
    };

    const changeQuestionType = (index, type) => {
        const newQuestions = [...questions];
        newQuestions[index].questionType = type;
        newQuestions[index].options = type === "checkbox" ? [] : [];
        newQuestions[index].answer = "";
        setQuestions(newQuestions);
    };

    const handleAnswerChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].answer = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex, optIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[optIndex] = value;
        setQuestions(newQuestions);
    };

    const handleImageUpload = (e, index) => {
        const newQuestions = [...questions];
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                newQuestions[index].image = reader.result;
                setQuestions(newQuestions);
            };
            reader.readAsDataURL(file);
        }
    };

    const addOption = (index) => {
        const newQuestions = [...questions];
        if (newQuestions[index].options.length < 4) {
            newQuestions[index].options.push(""); 
            setQuestions(newQuestions);
        }
    };

    const removeOption = (qIndex, optIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options.splice(optIndex, 1);
        setQuestions(newQuestions);
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const newQuestions = [...questions];
        const [reorderedItem] = newQuestions.splice(result.source.index, 1);
        newQuestions.splice(result.destination.index, 0, reorderedItem);
        setQuestions(newQuestions);
    };

    function qstUI() {
        return (
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
                                            <div className="flex items-center justify-between">
                                                <input 
                                                    type="text" 
                                                    className="w-4/5 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                                                    placeholder="Question" 
                                                    value={ques.questionText} 
                                                    onChange={(e) => handleQuestionTextChange(i, e.target.value)}
                                                />
                                                <label htmlFor={`file-input-${i}`} className="cursor-pointer">
                                                    {ques.image ? (
                                                        <img src={ques.image} alt="Uploaded" className="w-6 h-6 rounded-full" />
                                                    ) : (
                                                        <BsImage className="w-6 h-6 text-gray-500" />
                                                    )}
                                                </label>
                                                <input 
                                                    id={`file-input-${i}`} 
                                                    type="file" 
                                                    accept="image/*" 
                                                    className="hidden" 
                                                    onChange={(e) => handleImageUpload(e, i)} 
                                                />
                                            </div>

                                            <div className="mt-2">
                                                <select
                                                    className="border border-gray-300 p-2 rounded"
                                                    value={ques.questionType}
                                                    onChange={(e) => changeQuestionType(i, e.target.value)}
                                                >
                                                    <option value="text">Short Answer</option>
                                                    <option value="paragraph">Paragraph</option>
                                                    <option value="number">Integer Value</option>
                                                    <option value="checkbox">Checkbox</option>
                                                </select>
                                            </div>

                                            {ques.image && (
                                                <div className="mt-2">
                                                    <img src={ques.image} alt="Question" className="max-w-full h-auto rounded-lg" />
                                                </div>
                                            )}

                                            <div className="mt-2">
                                                {ques.questionType === "text" && (
                                                    <input
                                                        type="text"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                        placeholder="Enter your answer"
                                                        value={ques.answer}
                                                        onChange={(e) => handleAnswerChange(i, e.target.value)}
                                                    />
                                                )}
                                                {ques.questionType === "paragraph" && (
                                                    <textarea
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                        placeholder="Enter your answer"
                                                        value={ques.answer}
                                                        rows="4"
                                                        onChange={(e) => handleAnswerChange(i, e.target.value)}
                                                    />
                                                )}
                                                {ques.questionType === "number" && (
                                                    <input
                                                        type="number"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                        placeholder="Enter a number"
                                                        value={ques.answer}
                                                        min="0"
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            if (val === "" || /^[0-9]+$/.test(val)) {
                                                                handleAnswerChange(i, val);
                                                            }
                                                        }}
                                                    />
                                                )}
                                            </div>

                                            {ques.questionType === "checkbox" && (
                                                <div className="mt-2 space-y-2">
                                                    {ques.options.map((option, optIndex) => (
                                                        <div key={optIndex} className="flex items-center">
                                                            <input type="checkbox" className="mr-2" disabled />
                                                            <input 
                                                                type="text" 
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                                                                placeholder={`Option ${optIndex + 1}`} 
                                                                value={option} 
                                                                onChange={(e) => handleOptionChange(i, optIndex, e.target.value)}
                                                            />
                                                            <button 
                                                                onClick={() => removeOption(i, optIndex)} 
                                                                className="text-red-500 hover:text-red-700 ml-2"
                                                            >
                                                                <MdClose />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    {ques.options.length < 4 && (
                                                        <button onClick={() => addOption(i)} className="text-blue-500 hover:text-blue-700 mt-2">
                                                            Add Option
                                                        </button>
                                                    )}
                                                </div>
                                            )}

                                            <div className="flex justify-between items-center mt-4">
                                                <label className="flex items-center">
                                                    <input type="checkbox" checked={ques.required} onChange={() => toggleRequired(i)} className="mr-2"/>
                                                    Required
                                                </label>
                                                <button onClick={() => deleteQuestion(i)} className="text-red-500 hover:text-red-700">
                                                    <MdClose />
                                                </button>
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
        );
    }

    return (
        <div className='h-full pb-8 bg-gray-200'>
            <div className='section m-auto w-1/2'>
                <div className="form_top bg-white border-t-8 border-emerald-800 rounded-lg p-8 px-6">
                    <input type="text" className='w-full text-3xl border-b' placeholder='Untitled Document' />
                    <input type="text" className='w-full text-base border-b mt-2' placeholder='Form Description' />
                </div>
                {qstUI()}
                <button onClick={addQuestion} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Add Question</button>
            </div>
        </div>
    );
}

export default QstForm;
