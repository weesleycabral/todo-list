import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.models';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public todos: Todo[] = [];
  public title: string;

  constructor() { }

  ngOnInit(): void {
    // let todosSalvos = localStorage.getItem('todo');
    this.loadTodo();
    if (this.todos === null) {
      this.todos = [];
    }
  }

  // ngOnChanges() {
  //   if (!this.todos) {
  //     this.todos = [];
  //   }
  // }

  addTodo() {
    console.log(this.title);
    const title = this.title;
    console.log(title);
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false))
    this.saveTodo();
    this.title = '';

  }

  saveTodo() {
    const saveTodo = JSON.stringify(this.todos)
    localStorage.setItem('todo', saveTodo);
  }

  loadTodo() {
    const todosSalvos = localStorage.getItem('todo');
    this.todos = JSON.parse(todosSalvos!);
  }

  clearTodo() {
    localStorage.removeItem('todo');
    this.todos = [];
  }

  deleteIndividualTodo(id: any) {
    const todo = this.todos.indexOf(id)
    this.todos.splice(todo, 1);
    this.saveTodo();
  }

  setDone(ev: any, id: any) {
    console.log(ev.target.checked)
    // this.todos.find((attr) => attr.id === id)?.done = ev.target.checked;
    const todosIndex = this.todos.findIndex((attr) => attr.id === id)

    if (todosIndex !== -1) {
      const eventValue = ev.target.checked
      this.todos[todosIndex].done = eventValue
    }
    this.saveTodo();
  }



}
