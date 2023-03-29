import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListTeacherComponent } from './list-teacher/list-teacher.component';
import { StudentTeacherComponent } from './student-teacher/student-teacher.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { UpdateTeacherComponent } from './update-teacher/update-teacher.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MessageComponent } from './message/message.component';
import { ViewMessageComponent } from './view-message/view-message.component';
import { ReplymessageComponent } from './replymessage/replymessage.component';
import { LoginComponent } from './login/login.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { Select2Module } from 'ng-select2-component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    ListStudentComponent,
    UpdateStudentComponent,
    ListTeacherComponent,
    StudentTeacherComponent,
    AddTeacherComponent,
    UpdateTeacherComponent,
    MessageComponent,
    ViewMessageComponent,
    ReplymessageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,  
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule ,
    HttpClientModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut: 15000,
      closeButton: true,
      progressBar: true
    }),
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatDialogModule,
    NgSelectModule,
    Select2Module,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
