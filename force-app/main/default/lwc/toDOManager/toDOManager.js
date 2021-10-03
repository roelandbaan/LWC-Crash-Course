// track is used to make properties reactive properties
// meaning any changes in the value of the property are imediatly reflected in your markup file
// it is automatically enabled for data primitives only needed for objects
import { LightningElement, track } from 'lwc';
// import {method name} from "@salesforce/apex/ClassName.MethodName"
import addTodo from "@salesforce/apex/ToDoController.addTodo";
import getCurrentTodos from "@salesforce/apex/TodoController.getCurrentTodos";
export default class ToDOManager extends LightningElement {
    @track time = "8:15 PM";
    @track greeting = "Good Evening";

    @track todos = [];

    // LWC method that gets called as soon as your component gets initialized
    connectedCallback() {
        this.getTime();
        //this.populateTodos();
        this.fetchTodos();
    // Js method that lets you run specified method(s)
    // with a certain time interval (per 1/1000 second)     
        setInterval( () => {
            this.getTime();
        
        },1000*60)

    }

    
    

    getTime() {
        // get the date time from the system
        const date = new Date();
        const hour =  date.getHours();
        const minute = date.getMinutes();

        this.time = `${this.getHour(hour)}:${this.getDoubleDigit(minute)} ${this.getMidday(hour)}`;

        this.setGreeting(hour);
        
    }

    // displays 0 hour as 12 and hours > 12 as single digits(13 is 1, 14 is 2 etc.)
    getHour(hour) {
        return hour === 0 ? 12 : hour > 12 ? (hour-12) : hour;
    }

    // Display "PM" if hour >= 12 otherwise display "AM"
    getMidday(hour) {
        return hour >= 12 ? "PM" : "AM";
    }

    // Put a 0 zero in front of the input digit if < 10 otherwise display as normal
    getDoubleDigit(digit) {
        return digit<10 ? "0" + digit : digit;
    }

    // if hour < 12 display "Good Morning" etc
    setGreeting(hour) {
        if(hour<12) {
            this.greeting = "Good Morning";
        } else if(hour >= 12 && hour < 17) {
            this.greeting = "Good Afternoon";
        } else {
            this.greeting = "Good Evening";
        }
    }

 addTodoHandler() {
     // makes a variable called inputBox and set its value to the first 'Lightning input' element
     const inputBox = this.template.querySelector("lightning-input");

     const todo = {
        todoName: inputBox.value,
        done: false
     };

     addTodo({payload : JSON.stringify(todo)}).then(response => {
        console.log('Item inserted successfully');
        this.fetchTodos();
     }).catch(error => {
         console.error('Error inserting todo item ' + error);
     });
     // In JS if u want to add items to an array u need to use the 'push' command
    // this.todos.push(todo);
     // set the value to blank for future actions
     inputBox.value = "";
 }



 fetchTodos() {
     getCurrentTodos().then( result => {
         
        console.log("Retrieved todos from server ", result.length);
        this.todos = result;
        
     }).catch(error => {
        console.error('Error in fetching todos ' + error);
     });
 }

updateHandler() {
    this.fetchTodos();
}

deleteHandler() {
    this.fetchTodos();
}

 // returns all items form the todos array if they they are !todo.done
 get upcomingTasks() {
     return this.todos && this.todos.length ? this.todos.filter( todo => !todo.done )
      : [];
 }


  // returns all items form the todos array if they they are todo.done
 get completedTasks() {
    return this.todos && this.todos.length ? this.todos.filter( todo => todo.done ) : [];
}

// make an array of todo items and push to our todos array
populateTodos() {
    const todos = [
        {
        todoId: 0,
        todoName: "Do some Apex",
        done: false,
        todoDate: new Date()
        },
        {
            todoId: 1,
            todoName: "Build an LWC",
            done: false,
            todoDate: new Date()
            },
            {
                todoId: 2,
                todoName: "Make Testmethods",
                done: true,
                todoDate: new Date()
                }
        ];
        this.todos = todos;
    }


}