import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "../../service/message.service";


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit{

  newMessageContent: string = '';
  chatId :any;
  user :any;


  messages: any[] = [];


  constructor(private route:Router,
              private messageService: MessageService,
              private routeActivate: ActivatedRoute)
  {
  }


  ngOnInit(): void {
    this.routeActivate.paramMap.subscribe(params => {
      this.chatId = params.get('chatId');
      this.loadMessages();
    });

    const userData = localStorage.getItem('client_information');
    if (userData) {
      this.user = JSON.parse(userData);
      }

  }

  loadMessages() {
    console.log(this.chatId)
    this.messageService.getMessagesByChatId(this.chatId).subscribe((data) => {
      this.messages = data;
      console.log(data);
    });
  }

  sendMessage() {
    const message = {
      chatId: this.chatId, // Replace with actual chatId
      senderId: this.user.id, // Replace with actual senderId
      content: this.newMessageContent
    };

    this.messageService.sendMessage(message).subscribe((sentMessage) => {
      this.messages.push(sentMessage); // Update the list with the new message
      this.newMessageContent = ''; // Clear the input field
    });
  }

  routeBack() {
    this.route.navigateByUrl('client/dashboard');
  }
}
