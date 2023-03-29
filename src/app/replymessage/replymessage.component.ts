import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageService } from 'app/message.service';
import { Student } from 'app/student';
import { StudentService } from 'app/student.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-replymessage',
  templateUrl: './replymessage.component.html',
  styleUrls: ['./replymessage.component.css']
})
export class ReplymessageComponent implements OnInit {

  constructor(private router:Router,private studentService :StudentService,private messageService:MessageService,@Inject(MAT_DIALOG_DATA) private data:any,private toastrService:ToastrService) { }

   studentuuid:String;
   studentuuid2:String;
  message:String;
  // studentuuid:String;
  // studentuuid2:String;
  student:Student;
  ngOnInit(): void {
    this.studentuuid=this.data.studentuuid
    this.studentuuid2=this.data.studentuuid2;
    this.message=this.data.message;
    this.studentService.getStudent(this.studentuuid).subscribe((value)=>{
      this.student=value;
    })
  }

  

  show:boolean=false;
  
  sendMessage(messageForm:NgForm){
    console.log(this.studentuuid);
    console.log(this.studentuuid2);
    messageForm.value.authorization=this.studentuuid;
    messageForm.value.authentication=this.studentuuid2;
    console.log(messageForm.value);
   messageForm.value.replyMessage=this.message;
    this.messageService.send(messageForm.value).subscribe((value)=>{
      console.log(value);
      this.toastrService.success("Reply Of message " + this.message + " is successfully send");
    });
    this.show=true;
  //  this.dataSubmittedEmits.emit(messageForm.value);
    // this.router.navigate(['view-message'],{queryParams:{value: messageForm.value.message}});
    // console.log(messageForm.value);
  }
}
