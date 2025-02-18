import { useState } from 'react';
import { MdClose } from "react-icons/md";
import { BsImage } from "react-icons/bs"; // Image icon import

function QstForm() {
    const [questions, setQuestions] = useState([
        {
            questionText: "",
            questionType: "text",
            options: [],
            open: false,
            required: false,
            selectedOption: null,
            image: ""
        }
    ]);

    // Function to add a new question
    const addQuestion = () => {
        setQuestions([...questions, {
            questionText: "",
            questionType: "text",
            options: [],
            open: false,
            required: false,
            selectedOption: null,
            image: ""
        }]);
    };

    // Function to delete a question
    const deleteQuestion = (index) => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };

    // Toggle required field
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
        newQuestions[index].options = []; // Reset options when type changes
        newQuestions[index].open = false;
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

    function qstUI() {
        return questions.map((ques, i) => (
            <div key={i} className="bg-white p-4 mb-4 rounded-lg shadow-md">
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
                    </select>
                </div>

                {ques.image && (
                    <div className="mt-2">
                        <img src={ques.image} alt="Question" className="max-w-full h-auto rounded-lg" />
                    </div>
                )}

                <div className="mt-2">
                    {ques.questionType === "text" ? (
                        <input 
                            type="text" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                            placeholder="Your answer"
                        />
                    ) : ques.questionType === "paragraph" ? (
                        <textarea 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                            placeholder="Your detailed answer"
                            rows={4}
                        />
                    ) : ques.questionType === "number" ? (
                        <input 
                            type="number" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                            placeholder="Enter an integer value"
                            onKeyDown={(e) => {
                                if (e.key === '.' || e.key === 'e') {
                                    e.preventDefault();
                                }
                            }} // Prevents non-integer values
                        />
                    ) : null}
                </div>

                {/* Required Toggle and Delete Button */}
                <div className="flex justify-between items-center mt-4">
                    <label className="flex items-center">
                        <input 
                            type="checkbox" 
                            checked={ques.required} 
                            onChange={() => toggleRequired(i)} 
                            className="mr-2"
                        />
                        Required
                    </label>
                    <button 
                        onClick={() => deleteQuestion(i)}
                        className="text-red-500 hover:text-red-700"
                    >
                        <MdClose />
                    </button>
                </div>
            </div>
        ));
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
