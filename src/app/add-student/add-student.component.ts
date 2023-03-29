import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NgForm,Validator, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'app/student';
import { StudentService } from 'app/student.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  dateToday : Date = new Date();
  
  myDate : String ;
  month : String;
  date : String ;

  constructor(private studentService:StudentService , private toastrService : ToastrService,private formBuilder : FormBuilder ,private router:Router ){
    if(this.dateToday.getMonth() <= 9){
      this.month = "-0"+(this.dateToday.getMonth()+1);
    }
    else{
      this.month = "-"+this.dateToday.getMonth();
    }
    if(this.dateToday.getDate() <= 9){
      this.date ="-0"+this.dateToday.getDate();
    }
    else{
      this.date = "-"+this.dateToday.getDate();
    }
    this.myDate=this.dateToday.getFullYear() +""+ this.month+this.date;
    console.log(this.myDate);
  }

  

  // first_name =new FormControl('');
  // last_name = new FormControl('');
  // date_of_birth = new FormControl('');
  // mobilenumber = new FormControl('');
  // emailid = new FormControl('');
  // message : String ;
  // successMsg : boolean=false;

  // minlength: number =5;

  student : Student;

  saveStudent(addStudentForm : NgForm){
    if(addStudentForm.value.first_name.length >= 5 && addStudentForm.value.last_name.length >=5 
      ){
        
        this.studentService.createStudent(addStudentForm.value).subscribe({ 
          next:(res)=>{
            try {
              if(res +"" === "Successfully added"){
                this.toastrService.success(res+"");
              }
              else{
                this.toastrService.warning(res+"");
              }
            } catch (error) {
              this.toastrService.error(error +"");
            }
          },
        });
      }
      else{
        this.toastrService.error("Check your data again");
      }
      this.router.navigate(['students']);
  }

  

}
