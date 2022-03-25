import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/Todo';
import { TodoListService } from './todo-list.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todo$!: Observable<Todo[]>;
  isStatus: boolean = false;
  alertMsg: string = '';

  isComp: boolean = true;
  isComp2: boolean = false;

  stringLine: string = '';


  constructor( private todoListService: TodoListService) { }

  loadAll = () => {
    this.todo$ = this.todoListService.findAll();
  }

  compOn(id: number | undefined,todo: Todo, titleTodo: string | undefined, comp: boolean){
    console.log(this.isComp);

    this.changeStatus(id, todo, titleTodo, this.isComp)
    //this.stringLine = 'line';
  }

  compOff(id: number | undefined,todo: Todo, titleTodo: string | undefined, comp: boolean ){

    console.log(this.isComp2);

    this.changeStatus(id, todo, titleTodo, this.isComp2)
    //this.stringLine = '';

  }


  changeStatus(id: number | undefined,todo: Todo, titleTodo: string | undefined, comp: boolean ){

    this.todoListService.update(id,todo,titleTodo, comp)
      .subscribe(
        (success) => {
          this.todo$ = this.todoListService.findAll();
          console.log(success)

          this.isStatus = true;
          this.alertMsg = 'The status has been changed';
          setTimeout(()=>{
            this.isStatus = false;
       }, 2500);
        }
      );


  }


  deleteTodo(todo: Todo){
    this.todoListService.delete(todo.id)
      .subscribe(
        ()=> {
          this.todo$ = this.todoListService.findAll();
        }
      );

      this.isStatus = true;
      this.alertMsg = 'Your Todo has been deleted';
      setTimeout(()=>{
        this.isStatus = false;
   }, 2000);
  }

  cancel(): void{
    this.isStatus = true;
      this.alertMsg = 'Click has been cancel';
      setTimeout(()=>{
        this.isStatus = false;
   }, 2000);
  }

  ngOnInit(): void {
    this.todo$ = this.todoListService.findAll();
  }

}
