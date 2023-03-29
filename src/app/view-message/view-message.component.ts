import { Component, Inject, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'app/message';
import { MessageService } from 'app/message.service';
import { MessageComponent } from 'app/message/message.component';
import { ReplymessageComponent } from 'app/replymessage/replymessage.component';
import { Student } from 'app/student';
import { StudentService } from 'app/student.service';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.css']
})
export class ViewMessageComponent implements OnInit {
  message: Message;
  value: any;
  show: boolean = false;
  @Input() inputMessage: String;
  // obj:any={ 
  //   uuid:String,
  //   senderName:String,
  //   receivedMessage:String
  // };
  finalArray:any=[];
  page: number = 1;
  count: number = 0;
  size = 5;
  uuid: String;
  array: any[] = [];
  values: any;
  lengthOfReceivedMessageList: number;
  constructor(private activatedRoute: ActivatedRoute, private studentService: StudentService, private messageService: MessageService, private dialogRef: MatDialog) { }

  student: Student;
  //  array2:any[] = [];
  //  messages:Message[]=[];
  sendMessagesList: any[] = [];
  sendMessage: String;
  ngOnInit(): void {
    this.uuid = this.activatedRoute.snapshot.params['uuid'];
    console.log(this.uuid);
    this.studentService.getStudent(this.uuid).subscribe((data) => {
      this.student = data;
    });
    this.messageService.receive(this.uuid).subscribe((value) => {
      console.log("inside subscribe");
      console.log(value);
      value.forEach((data) => {
        console.log(data);
        if (data.authorization === this.uuid && data.message != "" && data.message != null) {
          this.studentService.getStudent(data.authentication).subscribe((value1) => {
            // console.log(`inside studfent subscribe ${value1}`);
            let time=data.time.split(':');
            if(parseInt(time[1]) <10){
              time[1]='0'+parseInt(time[1]);
              data.time=time[0]+':'+time[1];
            }
            var message: any = {
              receivedMessage: data.message,
              messageuuid: data.uuid,
              time: data.time,
              replyOf:data.replyMessage
            }
            const senderName = value1.first_name + " " + value1.last_name;
            const studentuuid = value1.studentuuid;
            //   replyOf:data.replyMessage
            if (this.array.length === 0) {
              this.array.push({ message: [message], senderName, studentuuid});
            } else  {
              const index=this.array.findIndex(x=> x.studentuuid === studentuuid);
              console.log(this.array.findIndex(x=> x.studentuuid === studentuuid));
              if(index>=0) {
                this.array[index].message.push(message);
              }
              else {
                this.array.push({ message: [message], senderName, studentuuid});
              }
            }
            this.values = this.array[this.array.length - 1];
          }
          );
        }
        else if (this.uuid === data.authentication && data.message != "" && data.message != null) {
          this.studentService.getStudent(data.authorization).subscribe((value1) => {
            console.log(`inside studfent subscribe ${value1}`);
            let time=data.time.split(':');
            if(parseInt(time[1]) <10){
              time[1]='0'+parseInt(time[1]);
              data.time=time[0]+':'+time[1];
            }
            var message: any = {
              message: data.message,
              // receiveruuid: data.authentication,
              // firstname: value1.first_name + " " + value1.last_name,
              replymessage: data.replyMessage,
              time: data.time
            }
            const firstname = value1.first_name + " " + value1.last_name;
            const receiveruuid = data.authentication;
            //   replyOf:data.replyMessage
            if (this.sendMessagesList.length === 0) {
              this.sendMessagesList.push({ message: [message], firstname, receiveruuid});
            } else  {
              const index=this.sendMessagesList.findIndex(x=> x.receiveruuid === receiveruuid);
              console.log(this.sendMessagesList.findIndex(x=> x.receiveruuid === receiveruuid));
              if(index>=0) {
                this.sendMessagesList[index].message.push(message);
              }
              else {
                this.sendMessagesList.push({ message: [message], firstname, receiveruuid});
              }
            }
          })
        }

      });
    });
    console.log(`dhichak ankit ${this.array}`);
    console.log(this.array);
    
    console.log(this.array);
  }

  submit(addReplyForm: NgForm) {

    addReplyForm.value.authorization = this.student.studentuuid;

    console.log(addReplyForm.value);
    // this.messageService.send(addReplyForm.value).subscribe((value)=>{
    //   console.log(value);
    // });

    console.log(addReplyForm.value);

  }

  receiveruuid: String;
  receivedMessage: String;
  showReceiver: boolean = false;
  showReceiverDialog() {
    this.showReceiver = true;
    this.dialogRef.open(MessageComponent, {
      data: {
        name: this.uuid
      }
    });
  }

  closeDialog() {
    this.dialogRef.closeAll();
  }
  openReplyForm(receiveruuid: String, receivedMessage: String, message: String) {
    this.show = true;
    this.receiveruuid = receiveruuid;
    this.receivedMessage = receivedMessage;

    let xyz = this.dialogRef.open(ReplymessageComponent, {
      data: {
        studentuuid: receiveruuid,
        studentuuid2: this.uuid,
        message: receivedMessage
      }
    });
  }



  id: any =-1;
  hideMessage: boolean = false;
  listMessages: any = [];
  priviousUuid: String = '';
  checkPrivious: boolean = true;
  indexOfMessage: any;

  showMessage(message: any, i: any) {
    this.indexOfMessage = i;
    console.log(i);
    this.listMessages.push(message);

    console.log(this.listMessages)
    if (message.studentuuid === this.priviousUuid) {
      this.checkPrivious = false;
    }
    else {
      this.checkPrivious = true;
      this.listMessages = [];
      this.listMessages.push(message)
      this.priviousUuid = message.studentuuid;
    }
    if (this.id != i) {
      this.id = i;
    }
    else {
      this.id = -1;
    }

    console.log(this.priviousUuid);
    console.log(this.listMessages)

  }

  id2:any=-1;
  showSendMessage(i:any){
    if (this.id2 != i) {
      this.id2 = i;
    }
    else {
      this.id2 = -1;
    }
  }


  index: any = 0;
  onMessageChangeNext() {
    console.log(this.array);
    if (this.index >= 0 && this.index < this.array.length - 1) {
      this.index++;
      this.values = this.array[this.index];
    }
  }

  onMessageChangePrevious() {
    if (this.index > 0) {
      this.index--;
      this.values = this.array[this.index];
    }
  }

  onMessageChange(event: any) {
    console.log(event);
    this.page = event;
  }

  page2 = 1;
  count2 = 0;
  size2 = 3;
  onSendMessageChange(event: any) {
    this.page2 = event;
  }



}
