// setting api property which sets the properties
// as public so it can accept the values from the parent Component
import { LightningElement, api } from 'lwc';
import updateTodo from '@salesforce/apex/TodoController.updateTodo';
import deleteTodo from '@salesforce/apex/TodoController.deleteTodo';


export default class TodoItem extends LightningElement {

@api todoId;
@api todoName;
@api done = false;

updateHandler() {
    const todo = {
        todoId: this.todoId,
        todoName: this.todoName,
        done: !this.done
    };
    // set the apex payload to a string so js can read it and then us try catch to console log succes or error
    updateTodo({payload : JSON.stringify(todo)}).then(result => {
            console.log('The item is updated succesfully');
    // make an event to pass from our current child lwc 'todoItem'
    // to our parent LWC 'toDOManager'
    // to send data aswell use the  {detail:{id:}} make sure it has a detail property       
            const updateEvent = new CustomEvent('update');
    // use this.dispatchEvent to send the specified event in this case updateEvent       
            this.dispatchEvent(updateEvent);
    }).catch(error => {
        console.error('Error in update ', error);
    })
}

deleteHandler() {
    deleteTodo ({todoId: this.todoId}).then(result => {
            console.log('The item is deleted succesfully');
            const deleteEvent = new CustomEvent('delete');
            this.dispatchEvent(deleteEvent);
    }).catch(error => {
        console.error('Error in delete ', error);
    })
}

get containerClass() {
    return this.done ? "todo completed" : "todo upcoming";
}

// check if the todo is done if so display a check box if not display an add button
get iconName(){ 
    return this.done ? "utility:check" : "utility:add";
}

}