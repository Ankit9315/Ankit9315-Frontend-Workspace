import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogClose, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'app/student';
import { Teacher } from 'app/teacher';
import { TeacherService } from 'app/teacher.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.css']
})
export class UpdateTeacherComponent implements OnInit {

  teacheruuid:String;
  teacher:Teacher = new Teacher();
  hideDiv:boolean=true;
  students:Student[]=[];

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private activatedRoute:ActivatedRoute,private teacherService:TeacherService,private toastrService : ToastrService,private router:Router) { }

  ngOnInit(): void {
    //this.teacheruuid=this.activatedRoute.snapshot.params['uuid'];
    this.teacheruuid=this.data.teacheruuid ;
    this.teacherService.getTeacher(this.teacheruuid).subscribe((data)=> 
      {
        this.teacher=data;
        console.log(this.teacher.stuteachrelation);
      });
  }

  hide:boolean=false;
  updatedTeacher(updateTeacher:NgForm){
    console.log(this.teacher);
    this.teacher=updateTeacher.value;
    this.teacherService.updateTeacher(this.teacheruuid,updateTeacher.value).subscribe((value)=>
    this.toastrService.success(value+""));
     this.router.navigate(['teacherList']);
     
  }

  addStudent(){
    this.hideDiv=false;
  }
}
