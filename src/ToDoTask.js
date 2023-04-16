import React from 'react';

class ToDoTask extends React.Component {
  constructor(props) { 
    super(props) 

    this.state =  {
      done: this.props.task.done
    }
    
    this.onStatusClick = this.onStatusClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onStatusClick(e) { 
    e.preventDefault();
	
	fetch(`tasks/${this.props.task._id}`, {method: 'PATCH',
	  body: JSON.stringify({
		  done: !this.state.done
	  }),
	  headers: {
		  'Content-type': 'application/json'
	  }
	}).then((res) => {
        if (res.status === 200) { 
          console.log('Updated');
          this.setState ({ done: !this.state.done });
        }
        else { console.log('not updated'); }
    });
  }

  onDeleteClick(e) { 
    e.preventDefault();

      fetch(`tasks/${this.props.task._id}`, {method: 'DELETE'}).then((res) => {
        if (res.status === 200) { 
          console.log('deleted');
          this.props.onTaskDelete(this.props.task._id);
        }
        else { console.log('not deleted'); }
      });
    
  }

  render() {
    return (
	         <li>  
			   <span> {this.props.task.name} </span>
			   <span>{this.props.task.description} </span>
			   <span onClick={this.onStatusClick}><b> {this.state.done ? 'Done' : 'ToDo'} </b></span>
			   <button onClick={this.onDeleteClick}>Delete</button>
			 </li>
		   )
  }
}

export default ToDoTask;
