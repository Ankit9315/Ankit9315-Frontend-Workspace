import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { faAlignRight } from '@fortawesome/free-solid-svg-icons';
import { StudentService } from 'app/student.service';
import { ViewMessageComponent } from 'app/view-message/view-message.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dialogRef:MatDialog,@Inject(MAT_DIALOG_DATA) public data:any,private studentService:StudentService,private toasterService:ToastrService,private router:Router) { }

  ngOnInit(): void {
  }
  // username : string ="";
  // password : string ="";
  //show: boolean= false;

  isValidUser:boolean=false;
  submit(ngForm:NgForm){
    let show =false;
    this.studentService.getStudentList().subscribe((value)=>{
      let uuid;
      value.forEach((data)=>{
        if(data.emailid === ngForm.value.username && ngForm.value.password === data.first_name+"@123"){
          show = true;
          console.log(show);
          uuid=data.studentuuid;
          console.log(ngForm.value.username);
          console.log(data.first_name+"@123");
        }
      });
      if(show){
        this.router.navigate(['consumer',uuid]);
        console.log(uuid);
        // this.toasterService.success("Successfully Login");
        // this.dialogRef.open(ViewMessageComponent,{data:{
        //   uuid : uuid
        // },position: {right:'10px', top: '80px'}})
        this.isValidUser=true;
      }
      else{
        this.toasterService.warning("Wrong username or password");
      }
    });
    console.log(show);
  console.log("user name is " + ngForm.value.username)
  }
}
