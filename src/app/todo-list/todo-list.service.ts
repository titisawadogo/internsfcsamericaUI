import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../models/Todo';

@Injectable()
export class TodoListService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient ) { }


  //this will convert file from JSON to ...
  private convert(todo: Todo) {
    const copy: Todo = Object.assign({}, todo);
    return copy;
  }

  create(todo: Todo, title: string): Observable<Todo>{
    const copy = this.convert(todo);
    return this.http.post<Todo>(this.baseUrl + '?Title=' + title, copy);
  }

  update(id: number | undefined, todo: Todo, titleTodo: string | undefined, comp:boolean | undefined): Observable<Todo>{


    const copy = this.convert(todo);
    return this.http.put<Todo>(this.baseUrl + '/' + id + '?Title=' + titleTodo + '&Completed=' + comp, copy);
  }

  find(id: number): Observable<Todo>{
    return this.http.get<Todo>(`${this.baseUrl}/$id}`);
  }


  findAll(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.baseUrl);
  }

  delete(id: number | undefined): Observable<HttpResponse<any>>{
    return this.http.delete<any>(this.baseUrl + '/' + id);
  }

}
