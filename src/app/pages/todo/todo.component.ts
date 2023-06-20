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



}
