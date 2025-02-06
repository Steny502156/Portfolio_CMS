import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>My Portfolio</h1>
      {projects.map((project) => (
        <div key={project._id}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <img src={project.image} alt={project.title} width="200" />
          <a href={project.link} target="_blank" rel="noopener noreferrer">View</a>
        </div>
      ))}
    </div>
  );
}

export default Home;
