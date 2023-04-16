import React from 'react';
import ToDoTask from './ToDoTask';
import ToDoTaskAdd from './ToDoTaskAdd';
import ToDoList from './ToDoList';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';



class App extends React.Component {
	constructor(props) {
    super(props);
    
    this.state = {
      tasks: []
    }
    this.onTaskDelete = this.onTaskDelete.bind(this); 
	this.onTaskAdd = this.onTaskAdd.bind(this); 
  }
  
  componentDidMount() {
    console.log('componentDidMount');

    fetch('tasks').then(function(res) {
      return res.json();
    }).then((data) => { 
         this.setState({
           tasks: data
         });
    });
  }

  onTaskAdd(task) {
    this.setState({
      tasks: [...this.state.tasks, task]
    });
  }
  
  onTaskDelete(_id) {
    this.setState({
      tasks: this.state.tasks.filter(function(task) {
        return task._id !== _id;
      })
    });
  }

  render(){
    return (
      <div className="App">
        <Router>
		  <Routes>
		    <Route path="/" element={<ToDoList tasks={this.state.tasks} onTaskDelete={this.onTaskDelete} />} />
			<Route path="/add" element={<ToDoTaskAdd onTaskAdd={this.onTaskAdd} />} />
		  </Routes>
		</Router>
      </div>
    );
  }
}

export default App;
