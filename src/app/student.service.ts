import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';   
import { Student } from './student';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl ="http://localhost:8080/student";

  students: Student[];

  constructor(private http:HttpClient, private toastrService : ToastrService) { 
  }
  
  getStudentList() : Observable<Student[]>{  
    console.log(this.baseUrl);
    return this.http.get<Student[]>(`${this.baseUrl}`,{observe : 'body' , responseType : 'json' }); 
  }

  createStudent(student: Student): Observable<object> { 
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
     }
     console.log(requestOptions);
  return this.http.post<String>(`${this.baseUrl}`, student,requestOptions);  
  } 

  deleteStudent(uuid: String){  
    console.log(this.baseUrl+'/?uuid='+uuid);
    return this.http.delete(`${this.baseUrl}`+'/?uuid='+uuid,{ responseType: 'text' }).subscribe(data => console.log(data));
  }  
  
  getStudent(uuid: String): Observable<Student> {  
    return this.http.get<Student>(`${this.baseUrl}`+'/?uuid='+uuid);  
  }  

  updateStudent( uuid: String,value: Student): Observable<Object> { 
    console.log(value); 
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    } 
    return this.http.put<Student>(`${this.baseUrl}`+'/?uuid='+uuid, value,requestOptions);  
  }

}

