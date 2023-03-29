import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Teacher } from 'app/teacher';
import { TeacherService } from 'app/teacher.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {

  constructor(private teacherService : TeacherService,private toastrService : ToastrService ,private router : Router) { }

  ngOnInit(): void {

  }

  teacher:Teacher;

  saveTeacher(addTeacherForm : NgForm){
    if(addTeacherForm.value.first_name.length >= 5 && addTeacherForm.value.last_name.length >=5 
      ){

        this.teacherService.addTeacher(addTeacherForm.value).subscribe((values)=>
        {
          if(values === "Successfully added"){
            this.toastrService.success("Teacher Added");
          }
          else{
            this.toastrService.error(values + "")
          }
        }
    );
    }
    else{
      this.toastrService.error("Please check your data again")
    }
    // this.toastrService.success("Teacher Added");

    this.router.navigate(['teacherList']);
  }

}
