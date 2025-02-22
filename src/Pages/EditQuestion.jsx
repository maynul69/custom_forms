import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function EditQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    questions: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/questions/${id}`);
        const data = await response.json();
        setForm(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestion();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...form.questions];
    updatedQuestions[index][field] = value;
    setForm({ ...form, questions: updatedQuestions });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/questions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Question updated successfully!");
        navigate("/profile");
      } else {
        console.error("Failed to update question.");
      }
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this question?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/questions/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Question deleted successfully!");
        navigate("/profile");
      } else {
        console.error("Failed to delete question.");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Edit Question</h1>

        {/* Edit Title */}
        <label className="block font-semibold text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full mb-4 rounded-md focus:ring-2 focus:ring-blue-400"
        />

        {/* Edit Description */}
        <label className="block font-semibold text-gray-700">Description</label>
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full mb-4 rounded-md focus:ring-2 focus:ring-blue-400"
        />

        {/* Edit Questions */}
        <h2 className="text-lg font-semibold mt-4 text-gray-800">Edit Questions</h2>
        {form.questions.map((question, qIndex) => (
          <div key={question._id} className="border p-4 rounded-lg mb-4 bg-gray-50">
            <label className="block font-semibold text-gray-700">Question Text</label>
            <input
              type="text"
              value={question.questionText}
              onChange={(e) => handleQuestionChange(qIndex, "questionText", e.target.value)}
              className="border p-2 w-full mb-2 rounded-md focus:ring-2 focus:ring-blue-400"
            />

            <label className="block font-semibold text-gray-700">Question Type</label>
            <select
              value={question.questionType}
              onChange={(e) => handleQuestionChange(qIndex, "questionType", e.target.value)}
              className="border p-2 w-full mb-2 rounded-md focus:ring-2 focus:ring-blue-400"
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="paragraph">Paragraph</option>
              <option value="checkbox">Checkbox</option>
            </select>
          </div>
        ))}

        {/* Buttons */}
        <div className="flex items-center gap-4 mt-4">
          <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
            Update
          </button>
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
            Delete
          </button>
          <Link to="/profile" className="text-blue-500 hover:underline">
            Back to Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EditQuestion;
