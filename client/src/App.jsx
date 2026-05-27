import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import logo from "./assets/images.jpg";

function App() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post("https://shecan-task.onrender.com/submit", form);

      toast.success(res.data.msg);

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.msg || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Toaster />

      <form onSubmit={submitHandler}>
        <img src={logo} alt="logo" className="logo" />

        <h1>She Can Foundation</h1>

        <p>Empowering women through technology and opportunities.</p>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={changeHandler}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={changeHandler}
        />

        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={changeHandler}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default App;
