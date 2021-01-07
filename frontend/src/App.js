import './App.css';
import CreateTask from './CreateTask/CreateTask';
import ListBody from "./ListBody/ListBody"


function App() {
  return (
    <div className="App">
      <h1>Very Simple To-Do List</h1>

      <CreateTask />

      <ListBody />
      
    </div>
  );
}

export default App;
