import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'app/student.service';
import { ToastrService } from 'ngx-toastr';
import { Student } from '../student';
import { faAngleDown,faAngleUp} from '@fortawesome/free-solid-svg-icons';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';

import { json2csv } from 'json-2-csv';
import { MatDialog } from '@angular/material/dialog';
import { UpdateStudentComponent } from 'app/update-student/update-student.component';
// import 'jspdf-autotable';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit , OnDestroy{

  displayStyle= "none";

  faAngleDown = faAngleDown;

  faAngleUp =faAngleUp;

  students: Student[]=[] ;

  page :number =1;
  count : number = 0;
  size = 5;
  pageStudent : any = [5,10,15,20];

  columnSort : boolean =false;
  isUp : boolean = false;
  //student:Student;

  constructor(private dialogRef:MatDialog,private studentService:StudentService,private router:Router, private toastrService : ToastrService,private activatedRoute:ActivatedRoute) { }
  ngOnDestroy(): void {
  
  }

  ngOnInit() : void {
    this.getStudentsList();
    // this.router.navigate(['login'],{queryParams:{value:this.students}});
  }

  getStudentsList(){
    this.studentService.getStudentList().subscribe(value=> {
      value.forEach((x)=>{
        this.students.push(x);
      });
    });
  }

  getNewStudent(){
    this.activatedRoute.snapshot.queryParamMap.get('add-student');
  }

  openMsg(){
    this.displayStyle="block";
  }

  closeMsg(){
    this.displayStyle="none";
  }

  // downloadCSV(){
  //   this.studentService.getStudentList().subscribe((response) => {
  //     const a=document.createElement("a");
  //     a.href = "data:text/csv," + response;
  //       let filename = "sampleCSVDownload";
  //       a.setAttribute("download", filename + ".csv");
  //       document.body.appendChild(a);
  //       a.click();
  //       document.body.removeChild(a);
  //   })
  // }

  deleteStudent(student:Student){
    const uuid =student.studentuuid;
    let indexToRemove = this.students.findIndex((student) => student.studentuuid === uuid)
    if(indexToRemove != -1){
      this.students.splice(indexToRemove,1);
    }
    try {
      this.studentService.deleteStudent(uuid);
      this.toastrService.warning("Student deleted");
    } catch (error) {
      
    }
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

  sortByCol(val:string){
    if(this.columnSort === false){
      this.students.sort((a,b) => (a[val] > b[val]) ? 1 : (b[val] > a[val]) ? -1 : 0);
      this.columnSort = true;
      this.isUp=true;
    }
    else{
      this.columnSort = false;
      this.students.sort((a,b)=> (a[val] > b[val]) ? 1 : (b[val] > a[val]) ? -1 : 0 ).reverse();
    //  this.arrow = "UP";
    this.isUp = false;
    }

  }

  generateCSV(){
    this.dowmnloadCSV(this.students);
  }
  dowmnloadCSV(data : any){
    console.log(data);
    
    const header = ['first_name','last_name','date_of_birth','mobilenumber','emailid'];
    console.log(header);
    
    const csv = data.map((row:any) =>
    header
      .map((fieldName) => 
      JSON.stringify(row[fieldName])).join(',')
    );
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r');
    console.log(csv);
    
    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    console.log(blob);
    console.log(url);

    a.href = url;
    a.download = 'student.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
    
  }

  
  makePdf(){

    const pdf= new jsPDF();

    autoTable(pdf,{
      columnStyles: {
        0: {cellWidth: 32},
        1: {cellWidth: 30},
        2: {cellWidth: 30},
        3:{cellWidth: 30},
        4:{cellWidth: 30},
        5:{cellWidth: 30},
        6:{cellWidth: 30}
      },
      head:[['Student UUID','First Name','Last Name','Date Of Birth','Mobile Number','Email Id']]
    })
    this.students.forEach((value:any)=>{

      autoTable(pdf,{
        columnStyles: {
          0: {cellWidth: 32},
          1: {cellWidth: 30},
          2: {cellWidth: 30},
          3:{cellWidth: 30},
          4:{cellWidth: 30},
          5:{cellWidth: 30},
          6:{cellWidth: 30}
        },
        body:[[value.studentuuid,value.first_name,value.last_name,value.date_of_birth,value.mobilenumber,
        value.emailid]]
      })
    })

    pdf.setFontSize(2);
    pdf.save('student.pdf');
  }

  // csvConverter(){

  //   let converter = require('json-2-csv');
  //   let json2csvCallback = function(err: any,csv: any){
  //     if(err) throw err;
  //     console.log(csv);
  //   }

  //   converter
  // }
  

  // update(addStudentForm: NgForm){
  //   this.student=addStudentForm.value;
  //   this.studentService.updateStudent(this.student.studentuuid,this.student);
  // }

  // updateStudent() : void{
  //   this.studentService.updateStudent(this.student.studentuuid,this.updateToStudent);
  // }

}
