import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { jwtDecode } from "jwt-decode";

function UserProfile() {
  const [forms, setForms] = useState([]);
  const [responses, setResponses] = useState([]);

  const token = localStorage.getItem("token");
  const userInfo = jwtDecode(token);
  const userEmail = userInfo.email;

  // Fetch forms created by the user
  useEffect(() => {
    fetch("http://localhost:5000/api/questions/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error || data.message) {
          console.error("Error fetching questions:", data.error || data.message);
          setForms([]);
        } else {
          const sortedData = data.sort(
            (a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
          );
          setForms(sortedData);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [userEmail]);

  // Fetch all form responses
  useEffect(() => {
    fetch("http://localhost:5000/api/all-form")
      .then((res) => res.json())
      .then((data) => {
        if (data.res) {
          // Filter responses only for forms created by the user
          const userResponses = data.res.filter((response) =>
            forms.some((form) => form._id === response.formId?._id)
          );
          setResponses(userResponses);
        } else {
          console.error("Error fetching responses:", data.message);
          setResponses([]);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [forms]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">User Profile</h1>

        {/* Forms Created */}
        <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-2">Your Forms</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border border-gray-300 p-3">Title</th>
                <th className="border border-gray-300 p-3">Description</th>
                <th className="border border-gray-300 p-3">Created On</th>
              </tr>
            </thead>
            <tbody>
              {forms.length > 0 ? (
                forms.map((form) => (
                  <tr key={form._id} className="text-center bg-white hover:bg-gray-100">
                    <td className="border border-gray-300 p-3">
                      <Link to={`/edit-question/${form._id}`} className="text-blue-500 hover:underline">
                        {form.title}
                      </Link>
                    </td>
                    <td className="border border-gray-300 p-3 text-gray-600">{form.description}</td>
                    <td className="border border-gray-300 p-3 text-gray-600">
                      {new Date(form.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-3 text-gray-500">No forms created yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Filled Responses */}
        <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-2">Responses Received</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border border-gray-300 p-3">Form Title</th>
                <th className="border border-gray-300 p-3">Submitted On</th>
                <th className="border border-gray-300 p-3">View Responses</th>
              </tr>
            </thead>
            <tbody>
              {responses.length > 0 ? (
                responses.map((response) => (
                  <tr key={response._id} className="text-center bg-white hover:bg-gray-100">
                    <td className="border border-gray-300 p-3">{response.formId?.title}</td>
                    <td className="border border-gray-300 p-3 text-gray-600">
                      {new Date(response.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 p-3">
                      <Link to={`/response/${response._id}`} className="text-blue-500 hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-3 text-gray-500">No responses received yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
