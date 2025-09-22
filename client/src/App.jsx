import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from './components/Input';

const api = axios.create({
  baseURL: "http://www.mokchhedulislam.page.gd/api"
  // baseURL: "http://localhost:5000/api"
});

function App() {
  const [contacts, setContacts] = useState([]);
  const [updateClick, setUpdateClick] = useState(false);
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    phone: "",
    editId: null
  });

  const [message, setMessage] = useState({ type: "", text: "" }); // ✅ success/error message

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      const res = await api.get("/");
      setContacts(res.data.contacts || []);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to fetch contacts" });
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = async () => {
    setUpdateClick(false);
    setMessage({ type: "", text: "" });

    // ✅ Validation
    if (!inputData.name || !inputData.email || !inputData.phone) {
      setMessage({ type: "error", text: "All fields are required" });
      return;
    }

    try {
      if (inputData.editId) {
        await api.put(`/${inputData.editId}`, {
          name: inputData.name,
          email: inputData.email,
          phone: inputData.phone
        });
        setMessage({ type: "success", text: "Contact updated successfully!" });
      } else {
        await api.post("/", {
          name: inputData.name,
          email: inputData.email,
          phone: inputData.phone
        });
        setMessage({ type: "success", text: "Contact added successfully!" });
      }

      setInputData({ name: "", email: "", phone: "", editId: null });
      fetchContacts();
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.response?.data?.message || "Something went wrong" });
    }
  };

  const handleDelete = async (id) => {
    setMessage({ type: "", text: "" });
    try {
      await api.delete(`/${id}`);
      setMessage({ type: "success", text: "Contact deleted successfully!" });
      fetchContacts();
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to delete contact" });
    }
  };

  const handleUpdate = (item) => {
    setInputData({
      name: item.name,
      email: item.email,
      phone: item.phone,
      editId: item._id
    });
    setUpdateClick(true);
    setMessage({ type: "", text: "" });
  };

  return (
    <div className='my-4'>
      <h1 className='text-center text-4xl font-bold m-4'>Contact Management App</h1>

      {/* ✅ Message */}
      {message.text && (
        <p
          className={`text-center my-2 font-medium ${
            message.type === "error" ? "text-red-600" : "text-green-600"
          }`}
        >
          {message.text}
        </p>
      )}

      <div className='w-2/5 mx-auto bg-slate-400 p-5 flex flex-col gap-4 rounded-md'>
        <Input handleChange={handleChange} value={inputData.name} type="text" name="name" placeholder="Enter name" />
        <Input handleChange={handleChange} value={inputData.email} type="email" name="email" placeholder="Enter email" />
        <Input handleChange={handleChange} value={inputData.phone} type="text" name="phone" placeholder="Enter phone" />

        <button onClick={handleSubmit} className='bg-black text-white p-2 rounded-full'>
          {updateClick ? "Update" : "Submit"}
        </button>
      </div>

      <div className='w-2/3 mx-auto my-5 flex flex-col gap-3'>
        {contacts?.length > 0 ? (
          contacts.map((item) => (
            <div key={item._id} className='flex justify-between bg-slate-500 text-white px-4 py-1 rounded-md'>
              <p><strong>{item.name}</strong></p>
              <p>{item.email}</p>
              <p>{item.phone}</p>
              <div className='flex gap-2'>
                <button onClick={() => handleUpdate(item)} className='bg-green-600 px-3 rounded-lg'>Edit</button>
                <button onClick={() => handleDelete(item._id)} className='bg-red-600 px-3 rounded-lg'>Del</button>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center text-xl text-gray-700'>No contacts found. Add contact.</p>
        )}
      </div>
    </div>
  );
}

export default App;
