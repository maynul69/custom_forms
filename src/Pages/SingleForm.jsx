import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import CenterTab from "../Components/centerTab";

function SingleForm() {
  const { id } = useParams(); // Extracting 'id' from the URL
  const [qst, setQst] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responses, setResponses] = useState({});

  // Fetch form data
  useEffect(() => {
    const fetchQst = async () => {
      try {
        const response = await axios.get(`https://custom-forms-server-g2hb.vercel.app/api/questions/${id}`);
        setQst(response.data);

        // Initialize responses state with empty values
        const initialResponses = response.data.questions.reduce((acc, q) => {
          acc[q.id] = q.questionType === "checkbox" ? [] : "";
          return acc;
        }, {});
        setResponses(initialResponses);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQst();
  }, [id]);

  // Handle input changes
  const handleChange = (qId, value) => {
    setResponses((prev) => ({
      ...prev,
      [qId]: value,
    }));
  };

  // Handle checkbox selection
  const handleCheckboxChange = (qId, option) => {
    setResponses((prev) => {
      const selectedOptions = prev[qId] || [];
      return {
        ...prev,
        [qId]: selectedOptions.includes(option)
          ? selectedOptions.filter((o) => o !== option)
          : [...selectedOptions, option],
      };
    });
  };

  // Submit form responses
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

        console.log(responses);
        
      const response = await axios.post("https://custom-forms-server-g2hb.vercel.app/api/submit", {
        formId: qst._id,
        responses,
      });
      alert("Form submitted successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Navbar />
      <CenterTab></CenterTab>
      <form onSubmit={handleSubmit}>
        <div className="h-full pb-8 bg-gray-200">
          <div className="section m-auto w-1/2">
            {/* Form Header */}
            <div className="form_top bg-white border-t-8 border-emerald-800 rounded-lg p-8 px-6 my-5 flex flex-col items-center justify-center">
              <h1 className="text-3xl">{qst.title}</h1>
              <p className="text-base mt-2">{qst.description}</p>
            </div>

            {/* Questions List */}
            {qst.questions.length > 0 ? (
              qst.questions.map((q) => (
                <div key={q._id} className="bg-white p-4 mb-4 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold">{q.questionText}</h4>

                  {/* Input Fields Based on Question Type */}
                  {q.questionType === "text" && (
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded mt-2"
                      placeholder="Your answer"
                      value={responses[q.id] || ""}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                    />
                  )}

                  {q.questionType === "number" && (
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded mt-2"
                      placeholder="Enter a number"
                      value={responses[q.id] || ""}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                    />
                  )}

                  {q.questionType === "paragraph" && (
                    <textarea
                      className="w-full px-3 py-2 border rounded mt-2"
                      placeholder="Type your response here..."
                      value={responses[q.id] || ""}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                    />
                  )}

                  {q.questionType === "checkbox" && (
                    <div className="mt-2">
                      {q.options.map((option, index) => (
                        <label key={index} className="flex items-center mb-1">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={responses[q.id]?.includes(option) || false}
                            onChange={() => handleCheckboxChange(q.id, option)}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Required Field Indicator */}
                  {q.required && <p className="text-sm text-red-500 mt-2">* Required</p>}
                </div>
              ))
            ) : (
              <p className="text-center mt-4 text-gray-600">No questions available</p>
            )}

            {/* Submit Button */}
            <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SingleForm;
