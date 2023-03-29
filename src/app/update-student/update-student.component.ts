import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'app/student';
import { StudentService } from 'app/student.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit{

  dateToday : Date = new Date();
  
  myDate : String = "2023-01-31";
  studentuuid:String;
  student:Student= new Student();

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private studentService:StudentService,
    private activatedRoute:ActivatedRoute,
    private router:Router ,private toastrService : ToastrService){
      // this.myDate=this.dateToday.getFullYear() + "-" + this.dateToday.getMonth()+1+"-"+this.dateToday.getDate();
  }
  ngOnInit(): void {
   // this.studentuuid=this.activatedRoute.snapshot.params['uuid'];
   this.studentuuid=this.data.studentuuid;
    console.log(this.studentuuid);
   this.studentService.getStudent(this.studentuuid).subscribe((data)=>{ 
    this.student=data;
  });
  }
  updateStudent(updateStudentForm: NgForm){
    this.student=updateStudentForm.value;
   // console.log(this.student);
    this.studentService.updateStudent(this.studentuuid,this.student).subscribe((valu)=>console.log(valu));
    this.toastrService.success("Succesfully Updated");
    this.router.navigate(['students']);
  }
}
