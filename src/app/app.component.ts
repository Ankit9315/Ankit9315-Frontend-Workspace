import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'crud-application';
  newdata=[];

  
  constructor(private dialogRef:MatDialog){ }

  ngOnInit(){
  }
  openDialog(){
    this.dialogRef.open(LoginComponent,{data: {
      
    }
    });
   }

   
}
