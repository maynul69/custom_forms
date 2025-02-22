import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router";


function Admin() {
  const [forms, setForms] = useState([]);
  
  useEffect(() => {
    fetch("https://custom-forms-server-g2hb.vercel.app/api/questions")
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.sort(
          (a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
        );
        setForms(sortedData);
      });
  }, []);

  return (
    <div>
      <Navbar />
<div className="min-h-screen bg-gray-100 p-6">
      
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Dashboar</h1>

      

        {/* Forms Created */}
        <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-2">All Forms</h2>
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
                forms.map(form => (
                  <tr key={form._id} className="text-center bg-white hover:bg-gray-100">
                    <td className="border border-gray-300 p-3">
                      <Link to={`/edit-question/${form._id}`} className="text-blue-500 hover:underline">
                        {form.title}
                      </Link>
                    </td>
                    <td className="border border-gray-300 p-3 text-gray-600">{form.description}</td>
                    <td className="border border-gray-300 p-3 text-gray-600">{new Date(form.createdAt).toLocaleDateString()}</td>
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

        
      </div>
    </div>    </div>
  )
}

export default Admin
