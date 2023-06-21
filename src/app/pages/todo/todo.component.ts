import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Todo } from 'src/app/models/todo.models';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public todos: Todo[] = [];
  public title: string;

  constructor(
    private toast: ToastrService
  ) { }

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
    if (this.title && this.title.trim()) {
      // console.log(this.title);
      const title = this.title;
      const id = this.todos.length + 1;
      this.todos.push(new Todo(id, title, false))
      this.saveTodo();
      this.title = '';
      this.todos.sort((x) => x.done ? 1 : -1);
    } else {
      this.toast.error('Insira um titulo da tarefa.')
    }


  }

  saveTodo() {
    const saveTodo = JSON.stringify(this.todos)
    localStorage.setItem('todo', saveTodo);
  }

  loadTodo() {
    const todosSalvos = localStorage.getItem('todo');
    this.todos = JSON.parse(todosSalvos!);
    this.todos.sort((x) => x.done ? 1 : -1);
  }

  clearTodo() {
    localStorage.removeItem('todo');
    this.todos = [];
    this.toast.success('Você excluiu todos as tarefas com sucesso!');
  }

  deleteIndividualTodo(id: any, title: string) {
    if (confirm(`Deseja mesmo excluir a tarefa "${title}"?`)) {
      const todo = this.todos.findIndex((attr) => attr.id === id)
      this.todos.splice(todo, 1);
      this.saveTodo();
      this.toast.success('Tarefa deletada com sucesso!');
    }
  }

  setDone(ev: any, id: any) {
    // console.log(ev.target.checked)
    // this.todos.find((attr) => attr.id === id)?.done = ev.target.checked;
    const todosIndex = this.todos.findIndex((attr) => attr.id === id)

    if (todosIndex !== -1) {
      const eventValue = ev.target.checked
      this.todos[todosIndex].done = eventValue
      this.todos.sort((x) => x.done ? 1 : -1);
    }
    this.saveTodo();
  }



}
