import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListStudentComponent } from './list-student/list-student.component';  
import { AddStudentComponent } from './add-student/add-student.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { ListTeacherComponent } from './list-teacher/list-teacher.component';
import { StudentTeacherComponent } from './student-teacher/student-teacher.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { UpdateTeacherComponent } from './update-teacher/update-teacher.component';
import { ViewMessageComponent } from './view-message/view-message.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{
   path: '', redirectTo: 'teacherList', pathMatch: 'full' },
   {path:'update-student/:uuid',component:UpdateStudentComponent} , 
{ path: 'students', component: ListStudentComponent },  
{ path: 'add-student', component: AddStudentComponent },
{path:'add-teacher',component: AddTeacherComponent},
{path:'teacherList',component: ListTeacherComponent},
{path:'student-teacher/:uuid',component:StudentTeacherComponent},
{path:'update-teacher/:uuid',component:UpdateTeacherComponent},
{path:'consumer/:uuid',component:ViewMessageComponent},
{path:'view-message',component:ViewMessageComponent},
{path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
