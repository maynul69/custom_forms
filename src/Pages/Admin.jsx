import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router";


function Admin() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [forms, setForms] = useState([]);
  const [admins, setAdmins] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("https://custom-forms-server-git-main-maynul-hossains-projects.vercel.app/api/auth/update-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Success: ${data.message}`);
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    }
  };


  useEffect(() => {
    fetch("https://custom-forms-server-git-main-maynul-hossains-projects.vercel.app/api/users")
      .then((res) => res.json())
      .then((data) => {
        const adminUsers = data.res.filter(user => user.role === "admin");
        setAdmins(adminUsers);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  
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
      {admins.length > 0 && <Navbar adminEmails={admins.map(admin => admin.email)} />}



<div className="min-h-screen bg-gray-100 p-6">
      
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Dashboard</h1>

        <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-2">Admins</h2>
        <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="border border-gray-300 p-3">Name</th>
                  <th className="border border-gray-300 p-3">Email</th>
                </tr>
              </thead>
              <tbody>
                {admins.length > 0 ? (
                  admins.map((admin) => (
                    <tr key={admin._id} className="text-center bg-white hover:bg-gray-100">
                      <td className="border border-gray-300 p-3">{admin.firstName} {admin.lastName}</td>
                      <td className="border border-gray-300 p-3 text-gray-600">{admin.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center p-3 text-gray-500">No admins found.</td>
                  </tr>
                )}
              </tbody>
            </table>

          <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-2">
            Add new admin
          </h2>
          <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm/6"
            required
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-emerald-600 mt-2 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-200 hover:text-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          Add to admins
        </button>
      </div>

      {message && (
        <p className="mt-2 text-sm font-medium text-gray-800">
          {message}
        </p>
      )}
    </form>
        </div>
      

        
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
    </div>  
    
  </div>
  )
}

export default Admin
