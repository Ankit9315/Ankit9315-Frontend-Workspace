import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from './teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private baseUrl = "http://localhost:8080/teacher";
  constructor(private http:HttpClient) { }

  getTeacherList() : Observable<Teacher[]>{
    return this.http.get<Teacher[]>(`${this.baseUrl}`);
  }

  getTeacher(teacheruuid: String): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.baseUrl}`+'/?uuid='+teacheruuid);
  }

  deleteTeacher(uuid:String){
    return this.http.delete(`${this.baseUrl}`+'/?uuid='+uuid,{ responseType: 'text' }).subscribe(data => console.log(data));
  }

  addTeacher( teacher: Teacher) : Observable<Object>{
    const requestOptions: Object = {
      responseType: 'text'
    }
    
    return this.http.post<String>(`${this.baseUrl}`,teacher,requestOptions);
  }

  updateTeacher(uuid: String,teacher:Teacher):  Observable<Object>{
    const requestOptions: Object = {
      responseType: 'text'
    } 
    console.log(teacher);
    return this.http.put<String>(`${this.baseUrl}` + '/?uuid=' + uuid, teacher,requestOptions);
  }

  deleteStudentFromTeacher(uuid1:String,uuid2:String){
    return this.http.delete<Teacher>(`${this.baseUrl}`+'s/?teacheruuid='+uuid1+'&studentuuid='+uuid2).subscribe((data)=>console.log(data));
  }
}
