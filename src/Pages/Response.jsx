import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";

function Response() {
    const { id } = useParams();
    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubmission = async () => {
            try {
                const response = await axios.get(`https://custom-forms-server-g2hb.vercel.app/api/submissions/${id}`);
                setSubmission(response.data);
            } catch (err) {
                setError("Failed to fetch submission.");
                console.error("Error fetching submission:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSubmission();
    }, [id]);
    
    console.log(submission);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

    return (
        <div>
            <Navbar />

            <div className="h-full pb-8 bg-gray-200">
                <div className="section m-auto w-1/2">
                    {/* Form Header */}
                    <div className="form_top bg-white border-t-8 border-emerald-800 rounded-lg p-8 px-6 my-5 flex flex-col items-center justify-center">
                        <h1 className="text-3xl">{submission.formId?.title}</h1>
                        <p className="text-base mt-2">{submission.formId?.description}</p>
                    </div>

                    {/* Questions List with responses */}
                    {submission.formId?.questions?.length > 0 ? (
                        submission.formId.questions.map((q) => (
                            <div key={q._id} className="bg-white p-4 mb-4 rounded-lg shadow-md">
                                <h4 className="text-lg font-semibold">{q.questionText}</h4>

                                {/* Display Answer Based on Question Type */}
                                {submission.responses?.[q.id] ? (
                                    <div className="mt-2 p-3  bg-gray-100">
                                        {Array.isArray(submission.responses[q.id]) ? (
                                            submission.responses[q.id].map((ans, i) => <p key={i}>✔ {ans}</p>)
                                        ) : (
                                            <p>{submission.responses[q.id]}</p>
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 mt-2">No answer provided</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center mt-4 text-gray-600">No questions available</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Response;
