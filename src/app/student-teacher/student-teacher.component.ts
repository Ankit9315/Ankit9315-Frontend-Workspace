import { Component, inject, Input, NgZone, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListStudentComponent } from 'app/list-student/list-student.component';
import { Student } from 'app/student';
import { StudentTeacher } from 'app/student-teacher';
import { StudentService } from 'app/student.service';
import { Teacher } from 'app/teacher';
import { TeacherService } from 'app/teacher.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog'
import { MessageComponent } from 'app/message/message.component';
import { ViewMessageComponent } from 'app/view-message/view-message.component';
import { UpdateStudentComponent } from 'app/update-student/update-student.component';

@Component({
  selector: 'app-student-teacher',
  templateUrl: './student-teacher.component.html',
  styleUrls: ['./student-teacher.component.css']
})
export class StudentTeacherComponent implements OnInit {

  refreshSubject=new Subject();

  page :number =1;
  count : number = 0;
  size = 5;
  isShow:boolean=true;

  constructor(private teacherService : TeacherService ,private activatedRoute:ActivatedRoute,
    private router:Router , private studentService:StudentService ,private toastrService : ToastrService ,private dialogRef:MatDialog) {
    
     }

    studentList:Student[]=[];
    studentTeacher:any={ 
    student : []=[]
    };

    teacherList: Teacher[] = [];

    teacheruuid: String;
    teachers:Teacher;
    teacherStudent: StudentTeacher[]=[];
    studentuuid:String;
    hideDiv:boolean=true;
    hideList : boolean =true;
    hideTeacher:boolean=true;
    // studentlist1:Student[]=[];
  
    ngOnInit(): void {
  this.getStudentRelationList();
  console.log(this.studentList);
  
  this.getTeacherList();
  
}

getStudentRelationList(){
  
  this.teacherStudent=[];
  this.teacheruuid=this.activatedRoute.snapshot.params['uuid'];
    console.log(this.teacheruuid);
    this.teacherService.getTeacher(this.teacheruuid).subscribe((data)=>{ 
      this.teachers=data;
      data.stuteachrelation.forEach((value)=> 
       { this.teacherStudent.push(value);
       }
      );
  });
  this.getStudentList();
}

getTeacherList(){
  this.teacherService.getTeacherList().subscribe((value)=>{
     value.filter((data) => {
      if(!(data.teacheruuid === this.teachers.teacheruuid)){
        this.teacherList.push(data);
     }
    }
    );
    
  });
}
getStudentList(){
  this.studentList=[];
  this.studentService.getStudentList().subscribe(value=> {
    this.studentList=[];
    value.forEach((x)=>{
      let index=0;
      this.teacherStudent.forEach((data)=> {
        if(x.studentuuid === data.student.studentuuid){
          index= 1;
        }
      });
      if(index == 0){
        this.studentList.push(x);
      }
    });
  });
}
giveStudent(){
  this.hideDiv=false;
  this.hideList=true;
  this.hideTeacher=true;
}

giveTeacher(){
  this.hideList=false;
  this.hideDiv=true;
  this.hideTeacher=true;
}
takeStudent(){
  this.hideList=true;
  this.hideDiv=true;
  this.hideTeacher=false;
}

  updateStudent(uuid:String){
 // this.router.navigate(['update-student',uuid]);
  this.dialogRef.open(UpdateStudentComponent,{data:{
    studentuuid:uuid
   }})
  }

onTableDataChange(event : any){
  this.page=event;
}

 obj:any={
  studentuuid:String
};
addStudent(uuid:String){
  this.obj.studentuuid=uuid;
  console.log(this.obj);
  this.studentTeacher.student.push(this.obj);
  console.log(this.studentTeacher);
  this.teacherService.updateTeacher(this.teacheruuid,this.studentTeacher).subscribe((valu : any)=> 
    console.log()
  );
  // console.log(this.studentTeacher.teacheruuid);
 
  this.toastrService.success("Student is successfully added in Teacher");
  
}

deleteRelation(uuid:String){
  console.log(this.teacherStudent);
  
  this.deleteStudent(this.teacheruuid,uuid);
  this.toastrService.warning("Student successfully deleted from teacher");
}

deleteStudent(uuid:String,uuid2:String){
  this.teacherStudent=this.teacherStudent.filter( (value)=> value.student.studentuuid != uuid2);
    console.log(this.teacherStudent);
  this.teacherService.deleteStudentFromTeacher(uuid,uuid2);
}                             


newTeacher:Teacher;
// importStudents(uuid:String){
//   this.teacherList.forEach((data)=>{
//     if(data.teacheruuid == uuid){
//        this.newTeacher=data;
//       }
//   });
//   console.log(this.newTeacher);
//   this.newTeacher.stuteachrelation.forEach((value)=> {
//     let index = 0;
//     this.teachers.stuteachrelation.forEach((data)=>{
//       if(data.student.studentuuid === value.student.studentuuid){
//         index=1;
//       }
//     });
//     if(index==0){
//     this.studentTeacher.student.push(value.student);
//     }
//   });
//   console.log(this.studentTeacher);
//   this.teacherService.deleteTeacher(uuid);
//  this.teacherService.updateTeacher(this.teacheruuid,this.studentTeacher).subscribe((valu : any)=> 
//  console.log(valu));
//  this.toastrService.success("Students successfully imported");
//  this.getStudentRelationList()
// }

// exportStudent(uuid :String){
//   this.teacherList.forEach((data)=>{
//     if(data.teacheruuid == uuid){
//        this.newTeacher=data;
//       }
//   });
//   this.teacherStudent.forEach((value)=>{
//     let index = 0;
//     this.newTeacher.stuteachrelation.forEach((data)=>{
//       if(data.student.studentuuid === value.student.studentuuid){
//         index =1 ;
//       }
//     })
//     if(index == 0){
//       this.studentTeacher.student.push(value.student);
//     }
//   })
//   this.teacherService.deleteTeacher(this.teacheruuid);
//   this.teacherService.updateTeacher(uuid,this.studentTeacher).subscribe((valu:any)=>
//   console.log("success"));
//   this.toastrService.success(this.teachers.first_name + " is deleted successfully and his students assign to "+ this.newTeacher.first_name);
//   this.getStudentRelationList();
//   this.router.navigate(['teacherList']);
// }


generateCSV(){
  const teach: Student[]=[];
  this.teacherStudent.forEach((value)=> teach.push(value.student));
  console.log(this.teacherStudent);
  this.downloadCSV(teach);
}

 csv: any=[];
downloadCSV(data: any){
  
  const header=['studentuuid','first_name','last_name','date_of_birth','mobilenumber','emailid'];

  this.csv = data.map((row:any) =>
    header
      .map((fieldName) => 
      JSON.stringify(row[fieldName])).join(',')
    );
    this.csv.unshift(header.join(','));
    const csvArray = this.csv.join('\r\n');
    console.log(this.csv);
    
    const a = document.createElement('a');
    console.log(a);
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = 'student.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
    this.teacherService.deleteTeacher(this.teacheruuid);
    this.router.navigate(['teacherList']);
}

file:any;
csvString:String;
csvArray:any;
csvRecordArray:any=[];
CSVDATA(event: any){
  console.log(event);
  
  this.file=event.target.files[0];
  console.log(event.target.files);
  let filereader=new FileReader();
  filereader.readAsText(this.file);
  filereader.onload = (e) => {
    this.csvString = <string>filereader.result;
    this.csvArray=this.csvString.split('\r\n');
    this.csvArray.forEach((value: any)=>{this.csvRecordArray.push(value)});
    this.importCSV(this.csvRecordArray);
  }
  // console.log(this.csvString);
  // this.csvArray = this.csvString.split('\n');
  // console.log(this.csvArray);
  
}
importCSV(csvArrays:any){
  const header=csvArrays[0].split(",");
  
   for(let i=1;i<csvArrays.length;i++){

        let object: any[]=[];
      //  let arr=csvArrays[i].split('\\');
      let value=csvArrays[i].replaceAll('"','');
       let currentStudent=value.split(",");
     for(let j=0;j<header.length;j++){
      object[header[j]]=currentStudent[j];
     }
     const uuid=object[header[0]];
     console.log(uuid);
     
     let index=0;
     this.teacherStudent.forEach((values)=>{
      if(uuid === values.student.studentuuid){
        index=1;
      }
      } );
      if(index == 0){
        this.studentTeacher.student.push(Object.assign({},object));
      }
   }
   console.log(this.studentTeacher);

   this.teacherService.updateTeacher(this.teacheruuid,this.studentTeacher).subscribe((valu : any)=> 
  this.toastrService.success("Successfully Added"));
   }
   

   openDialog(uuid:String){
    this.dialogRef.open(MessageComponent,{data: {
      name:uuid
    }
    });
    console.log(uuid);
   }

  //  openDialog2(uuid:String){
  //   this.router.navigate(['consumer',uuid])
  //  }
  //  model:any = document.getElementById("myModel");

  //  btn:any=document.getElementById("message");

  //  span:any=document.getElementsByClassName("close");

  //  onclick(){

  //  }
}
