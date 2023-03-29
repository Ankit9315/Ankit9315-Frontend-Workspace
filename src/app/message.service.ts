import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http:HttpClient) { }
  // baseUrl= "http://localhost:8080/publish";
  // baseUrl2= "http://localhost:8080/consumer";
  // constructor(private http:HttpClient) { }

  // createMessage(message:Message){
  //   const requestOptions: Object = {
  //     /* other options here */
  //     responseType: 'text'
  //    }
  //    console.log(requestOptions);
  // return this.http.post<String>(`${this.baseUrl}`, message,requestOptions);
  // }

  // replyMessage(message:Message){
  //   const requestOptions:Object={
  //     responseType:'text'
  //   }
  //   return this.http.post<String>(`${this.baseUrl2}`,message,requestOptions);

  // }

  private readonly baseUrl3 = 'http://localhost:8080/chat';

  public send(message: Message){
    const requestOptions: Object = {
          /* other options here */
          responseType: 'text'
         }
    return this.http.post<String>(`${this.baseUrl3}/send`, message,requestOptions);
  }

  public receive(uuid:String): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl3}/receive`+'/?uuid='+uuid);
  }
}
