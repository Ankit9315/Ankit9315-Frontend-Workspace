import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'app/message';
import { MessageService } from 'app/message.service';
import { Student } from 'app/student';
import { Teacher } from 'app/teacher';
import { TeacherService } from 'app/teacher.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'app/student.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  searchValue:string = ""
  getTeacherNameWord(event:any) {
    console.log(this.filteredTeacherList);
    console.log(event.target.value.toLowerCase());
    this.searchValue = event.target.value;
    let searchvalue=this.searchValue.toLowerCase();
    let matchTeachers=this.listTeacher.filter((value)=>{
      let filteredFirst_name=value.first_name.toLowerCase();
      return filteredFirst_name.includes(searchvalue);
    });
    if(matchTeachers.length > 0){
      this.filteredTeacherList=matchTeachers;
    }
    else{
      this.toasterService.error("Entered teacher " + event.target.value+" is not available");
      this.filteredTeacherList=matchTeachers;
    }
    console.log(this.searchValue);
    console.log(matchTeachers);
  };

  getStudentNameWord(event:any) {
    console.log(this.students);
    console.log(event.target.value);
    let searchvalue=event.target.value.toLowerCase();
    let matchStudent=this.students.filter((value)=>{
      let filteredFirst_name=value.first_name.toLowerCase();
      return filteredFirst_name.includes(searchvalue);
    });
    if(matchStudent.length > 0){
      this.filteredStudentList=matchStudent;
    }
    else{
      this.toasterService.error("Entered student " + event.target.value +" is not available")
      this.filteredStudentList=matchStudent;
    }
    console.log(this.filteredStudentList);
  };

  listTeacher:Teacher[]=[];
  studentuuid: any;
  constructor(private activatedRoute:ActivatedRoute,private studentService:StudentService,private toasterService:ToastrService,private router:Router,@Inject(MAT_DIALOG_DATA) public data:any,private teacherService : TeacherService,private messageService:MessageService,private dialogRef:MatDialog) {
   }

  ngOnInit( ): void {
    this.getTeacherList();
    this.studentuuid=this.data.name;
    this.filteredTeacherList = this.listTeacher;
    console.log(this.data);
  }

  getTeacherList(){
    this.teacherService.getTeacherList().subscribe(value=> {
      value.forEach((x)=>{
        
        this.listTeacher.push(x);
      });
  });
}

filteredTeacherList:Teacher[]=[];
filteredStudentList:Student[]=[];
students:any[]=[];
hideDiv=true;
teacher:Teacher;
showTeacher(teacher:any){
  this.teacher=teacher;
  let uuid=this.teacher.teacheruuid;
  console.log(this.teacher);
  this.students.length=0;
  this.teacherService.getTeacher(uuid).subscribe((value)=>{
    value.stuteachrelation.forEach((data=>{
      if(data.student.studentuuid != this.studentuuid){this.students.push(data.student);}
    }))
  });
  this.hideDiv=false;
  console.log(this.students);
  this.filteredStudentList=this.students;
}

uuid:String;

filteredData:any;
applyFilter(evt: string) {
  evt = evt + "";
  if (!evt) this.listTeacher = this.listTeacher;
  else {
    /** uses both id and text fields for extensive filtering (case insensitive) . can be tailored for custom needs */
    this.filteredData = this.listTeacher.filter(item => (item.teacheruuid + "") === evt || item.first_name.toLocaleLowerCase().indexOf(evt.toLocaleLowerCase()) >= 0);
  }
}

receiverStudent(student:Student){
//   let uuid=student.studentuuid;
//   this.students.forEach((value)=>
// {
//   if(value.studentuuid==uuid){
//     this.uuid=value.studentuuid;
//     console.log(value)}
// }
//   );
//   console.log(student);
this.uuid=student.studentuuid;
  this.matDialogClose();
}
closeDialog:boolean=false;
receivemessage:Message;
  messageReceive(){
    console.log(this.studentuuid);
    console.log(this.uuid);
    // // this.message.authorization=this.firstname;
    // this.message.authentication=this.uuid;
    // this.messageService.createMessage(addTeacherForm.value).subscribe((value)=>{
    //   console.log(value);
    // });
    if(this.uuid !=null && this.studentuuid != null){
      console.log(this.uuid + "  "+this.studentuuid)
    // 
    this.hideSelector=false;
    this.hideMessagenger=true;
    this.closeDialog=true;
    this.studentService.getStudent(this.uuid).subscribe((data)=>{ 
      this.student=data;
      console.log(this.student);
    });
    this.studentService.getStudent(this.studentuuid).subscribe((data)=>{ 
      this.senderStudent=data;
      console.log(this.senderStudent);
    });
    }
    else{
      this.toasterService.error("Please Select a receiver who receive message");
    }
    // console.log(addTeacherForm.value.authentication + "  "+this.studentuuid)
    // this.dialogRef.open(PublisherComponent,{data: {
    //   values1: this.uuid ,
    //   values2: this.studentuuid}
    // });
   // this.router.navigate(['publisher'],{queryParams : {values1: addTeacherForm.value.authentication ,values2: this.studentuuid}});
  }

  student:Student;
  senderStudent : Student;

   message:String;
  sendMessage(messageForm:NgForm){
    if(this.message.length>0){
      console.log(this.uuid);
    console.log(this.studentuuid);
    messageForm.value.authorization=this.uuid;
    messageForm.value.authentication=this.studentuuid;
    console.log(messageForm.value);
    this.messageService.send(messageForm.value).subscribe((value)=>{
      console.log(value);
    });
    this.toasterService.success("Message Successfully send");
    this.message='';
    }
    // this.router.navigate(['consumer'],{queryParams : messageForm.value});
  }

  clearMessage(){
    this.message='';
  }

  backToPriviousPage(){
    this.hideMessagenger=false;
    this.hideSelector=true;
  }
  searchValue2:string='';
  closeMessageDialog(){
    // this.ngOnInit();
    this.searchValue = "";
    this.searchValue2="";
    this.hideDiv=true;
    this.students.length=0;
    
    console.log(this.teacher);
    console.log(this.students);
    console.log(this.searchValue);
  }

  hideSelector:boolean = true;
  hideMessagenger:boolean=false;
  close:boolean=true;
  matDialogClose(){
    if(this.teacher !=null && this.uuid !=null){
      this.close=false;
    }
  }
}
