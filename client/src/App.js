import './App.css';
import { useState } from "react";
import Axios from 'axios'


function App() {
  const [Name, setName] = useState("");
  const [Pleader, setPleader] = useState("");
  const [No_of_components, setNo_of_components] = useState(0);
  const [Budget, setBudget] = useState(0);
  const [Components_completed, setComponents_completed] = useState(0);

  const [newCompleted, setNewCompleted] = useState(0);

  const [projectList, setProjectList] = useState([]);

  const addProject = () => {
    Axios.post ('http://localhost:3001/create', {
     Name: Name, 
     Pleader: Pleader, 
     No_of_components: No_of_components, 
     Budget: Budget, 
     Components_completed: Components_completed,
    }).then(() => {
      console.log("success");
    });
  };
 
  const getProjects = () => {
    Axios.get("http://localhost:3001/projects").then((response) => {
      setProjectList(response.data);
    });
  };

  const updateComponentsCompleted = (id) => {
    Axios.put("http://localhost:3001/update", { Components_completed: newCompleted, id: id }).then(
      (response) => {
        setProjectList(
          projectList.map((val, key) => {
            return val.id == id
              ? {
                  id: val.id,
                  ["Project Name"]: val["Project Name"],
                  ["Project Leader"]: val["Project Leader"],
                  ["Number of Components"]: val["Number of Components"],
                  Budget: val["Budget"],
                  ["Components Completed"]: newCompleted,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteProject = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setProjectList(
        projectList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className = "information">
        <label>Project Name:</label>
        <input 
          type="text" 
          onChange = {(event) => {
            setName(event.target.value);
          }}
        />
        <label>Project Leader:</label>
        <input
          type="text"
          onChange = {(event) => {
            setPleader(event.target.value);
          }}
        />
        <label>Number of components:</label>
        <input 
          type="number" 
          onChange = {(event) => {
            setNo_of_components(event.target.value);
          }}
        />
        <label>Budget:</label>
        <input 
          type="number" 
          onChange = {(event) => {
            setBudget(event.target.value);
          }}
        />
        <label>Components Completed:</label>
        <input 
          type="number" 
          onChange = {(event) => {
            setComponents_completed(event.target.value);
          }} 
        />
        <button onClick ={addProject}>Add Project</button>
      </div>

      <br />
      <div className = "projects">
      <button onClick={getProjects}>Show Projects</button>


      {projectList.map((val, key) => {
          return (
            <div className="project">
              <div>
                <h3>Project Name: {val["Project Name"]}</h3>
                <h3>Project Leader: {val["Project Leader"]}</h3>
                <h3>Number of Components: {val["Number of Components"]}</h3>
                <h3>Budget: {val["Budget"]}</h3>
                <h3>Components Completed: {val["Components Completed"]}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="0"
                  onChange={(event) => {
                    setNewCompleted(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateComponentsCompleted(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteProject(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
