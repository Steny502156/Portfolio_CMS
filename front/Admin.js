import { useState } from "react";
import axios from "axios";

function Admin() {
  const [project, setProject] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
  });

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/projects", project);
      alert("Project Added!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} />
        <input type="text" name="image" placeholder="Image URL" onChange={handleChange} />
        <input type="text" name="link" placeholder="Project Link" onChange={handleChange} />
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
}

export default Admin;
