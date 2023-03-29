import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { StudentTeacher } from 'app/student-teacher';
import { Teacher } from 'app/teacher';
import { TeacherService } from 'app/teacher.service';
import { UpdateTeacherComponent } from 'app/update-teacher/update-teacher.component';
import jsPDF from 'jspdf';
import autoTable, { Cell, RowInput } from 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-teacher',
  templateUrl: './list-teacher.component.html',
  styleUrls: ['./list-teacher.component.css']
})
export class ListTeacherComponent implements OnInit {

  constructor(private dialogRef:MatDialog,private teacherService : TeacherService,private router : Router,private toastrService : ToastrService,private activatedroute:ActivatedRoute) { }

  teacherList : Teacher[]=[] ;

  studentTech :StudentTeacher[]=[];

  page :number =1;
  count : number = 0;
  size = 5;

  ngOnInit(): void {
    this.getTeachersList();
    // debugger;
  }

  getTeachersList(){
    this.teacherService.getTeacherList().subscribe(value=> {
      
      value.forEach((x)=>{
        
        this.teacherList.push(x);
        x.stuteachrelation.forEach(values=> this.studentTech.push(values));
      });
    });
  }

  getNewTeacher(){
    let c=this.activatedroute.snapshot.queryParamMap.get('add-teacher');
    console.log(c);
    
  }

  updateTeacher(uuid:String){
    this.dialogRef.open(UpdateTeacherComponent,{data:{
      teacheruuid:uuid
    }})
   // this.router.navigate(['update-teacher',uuid]);
  }

  onTableDataChange(event : any){
    this.page=event;
  }

  getTeacher(uuid : String){
    this.router.navigate(['student-teacher',uuid]);
  }

  getStuTech(){
    let c=this.activatedroute.snapshot.data;
    console.log(c);
    
  }

  deleteTeacher(uuid: String){
    let indexToremove=this.teacherList.findIndex((teacher)=>
    teacher.teacheruuid === uuid
    );
    if(indexToremove != -1){
      this.teacherList.splice(indexToremove,1);
    }
    try{
    this.teacherService.deleteTeacher(uuid);
    this.toastrService.warning("Teacher successfully deleted");
    }catch(error){}
  }

  generateCSV(){
    this.dowmnloadCSV(this.teacherList,this.studentTech);
  }
  dowmnloadCSV(data : any,value:any){
    this.studentTech.forEach((values=> console.log(values.student.last_name)));
    const header = ['first_name','last_name','gender','mobilenumber','email'];
    console.log(header);
    
    const csv = data.map((row:any) =>
    header
      .map((fieldName) => 
      JSON.stringify(row[fieldName])).join(',')
    );
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');
    
    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = 'teacher.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
    
  }

  columnSort : boolean =false;
  isUp : boolean = false;

  faAngleDown = faAngleDown;

  faAngleUp =faAngleUp;

  sortByCol(val:string){
    if(this.columnSort === false){
      this.teacherList.sort((a,b) => (a[val] > b[val]) ? 1 : (b[val] > a[val]) ? -1 : 0);
      this.columnSort = true;
      this.isUp=true;
    }
    else{
      this.columnSort = false;
      this.teacherList.sort((a,b)=> (a[val] > b[val]) ? 1 : (b[val] > a[val]) ? -1 : 0 ).reverse();
    //  this.arrow = "UP";
    this.isUp = false;
    }

  }

  makePdf(){

    const pdf= new jsPDF();

    autoTable(pdf,{
      columnStyles: {
        0: {cellWidth: 15},
          1: {cellWidth: 15},
          2: {cellWidth: 15},
          3:{cellWidth: 15},
          4:{cellWidth: 15},
          5:{cellWidth: 15}
      },
      head:[['First Name','Last Name','Gender','Mobile Number','Email']]
    })
    this.teacherList.forEach((value:any)=>{
      autoTable(pdf,{
        columnStyles: {
          0: {cellWidth: 40},
          1: {cellWidth: 40},
          2: {cellWidth: 27},
          3:{cellWidth: 35},
          4:{cellWidth: 35},
          5:{cellWidth: 35}
        },
        bodyStyles: {fillColor:[0,255,127]},
        theme: 'grid',
        body:[[value.first_name,value.last_name,value.gender,value.mobilenumber,
        value.email]]
      })
      autoTable(pdf,{
        columnStyles: {
          0: {cellWidth: 15},
            1: {cellWidth: 15},
            2: {cellWidth: 15},
            3:{cellWidth: 15},
            4:{cellWidth: 15},
            5:{cellWidth: 15}
        },
        headStyles :{fillColor : [124, 95, 240]},
        head:[['Student First Name','Student Last Name','Date Of Birth','Student Mobile Number','Student Email']]
      })
      value.stuteachrelation.forEach((data:any)=> {
        autoTable(pdf,{columnStyles: {
          0: {cellWidth: 40},
          1: {cellWidth: 40},
          2: {cellWidth: 27},
          3:{cellWidth: 35},
          4:{cellWidth: 35},
          5:{cellWidth: 35}
        },
        bodyStyles: {fillColor:[192,192,192]},
        theme: 'grid'
        ,body:[[data.student.first_name,data.student.last_name,data.student.date_of_birth,
        data.student.mobilenumber,data.student.emailid]]
        })
      })
    })

    pdf.setFontSize(2);
    pdf.save('teacher.pdf');
  }

}
