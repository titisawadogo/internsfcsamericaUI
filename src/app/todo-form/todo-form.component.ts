import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoListService } from '../todo-list/todo-list.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  validateForm!: FormGroup;
  titleInput: string = '';
  baseComp: boolean = true;

  isStatus: boolean = false;
  alertMsg: string = '';

  val = {
    title: this.titleInput,
    completed: this.baseComp
  }

  submitForm(value: { title: string, completed: boolean}): void{
    for(const key in this.validateForm.controls){
      if(this.validateForm.controls.hasOwnProperty(key)){
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }




    value.completed = false;
    this.todoListService.create(value, this.titleInput).subscribe(
      () => {
        this.refresh();
        //notifications
        this.isStatus = true;
        this.alertMsg = 'New Todo Added!';
        setTimeout(()=>{
          this.isStatus = false;
     }, 3000);

      },

    );
    this.validateForm.reset();
  }

  refresh(): void {
    window.location.reload();
}
  constructor(private fb: FormBuilder, private todoListService: TodoListService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]]
    })
  }

}
