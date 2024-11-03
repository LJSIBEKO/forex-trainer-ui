import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../service/chat.service";
import {Route, Router} from "@angular/router";
declare var bootstrap: any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit
{

  user: any;
  userChats: any[] = [];
  errorMessage: string = '';
  newChatName: string = '';
  newChatParticipants: string = '';
  isGroupChat: boolean = false;

  constructor(private chatService: ChatService,
              private route:Router)
  { }

  ngOnInit(): void {
    // Retrieve user data from local storage
    const userData = localStorage.getItem('client_information');
    if (userData) {
      this.user = JSON.parse(userData); // Parse JSON to retrieve user object
      this.getAllChats(); // Fetch user chats on component initialization
    } else {
      this.errorMessage = 'User data not found. Please log in again.';
    }
  }

  getAllChats(): void {
    if (!this.user || !this.user.id) {
      this.errorMessage = 'User ID is missing.';
      return;
    }

    this.chatService.getChatsByUserId(this.user.id).subscribe(
      (response) => {
        console.log(response);
        if (response && response.error) {
          this.errorMessage = 'Error retrieving chats: ' + response.error;
        } else {
          this.userChats = response;
        }
      },
      (error) => {
        this.errorMessage = 'Failed to load chats. Please try again later.';
        console.error('Error fetching chats:', error);
      }
    );
  }

  openCreateChatModal(): void {
    const modalElement = document.getElementById('createChatModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  createChat(): void {
    const participantIds = this.newChatParticipants.split(',').map(id => id.trim());
    participantIds.push(this.user.email)

    const obj =  {
     'chatName':this.newChatName,
     'isGroupChat':this.isGroupChat,
     'participants':participantIds
    }

    this.chatService.createChat(obj).subscribe(
      (response) => {
        if (response && response.error) {
          this.errorMessage = 'Error creating chat: ' + response.error;
        } else {
          // Reset form fields and close modal after successful creation
          this.newChatName = '';
          this.newChatParticipants = '';
          this.isGroupChat = false;

          this.getAllChats(); // Refresh the chat list
          const modalElement = document.getElementById('createChatModal');
          if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal?.hide();
          }
        }
      },
      (error) => {
        this.errorMessage = 'Failed to create chat. Please try again later.';
        console.error('Error creating chat:', error);
      }
    );
  }

  routeToMessages(id:any) {
    this.route.navigateByUrl('client/dashboard/message/'+id);
  }
}
