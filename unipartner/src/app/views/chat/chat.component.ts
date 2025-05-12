import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { forEach } from 'cypress/types/lodash';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  message: string = '';
  // students: Student[] = [];
  loading: boolean = false;
  currentUser = '';
  chats: any = [];
  conversation: any;
  messages: any;
  conversationId: string = '';
  chattingWithName: string = '';
  constructor(
    private dataService: DataService,
    private userService: AuthService
  ) {}
  ngOnInit(): void {
    this.getAllChats();
    this.currentUser=this.userService.getUserEmail();    
  }
  getAllChats() {
    this.dataService.getAllConversation().subscribe({
      next:async (data: any) => {
        this.chats = await data;
        console.log(this.chats);
        if (this.chats && this.chats.length > 0) {
          console.log(this.chats[0].id)
          const firstConversationId = this.chats[0].id;
          this.getConversationById(firstConversationId);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getConversationById(id: any) {
    this.conversationId = id;
    this.dataService.getConversationById(id).subscribe({
      next: (data: any) => {
        this.conversation = data;
        console.log(this.conversation);
        this.messages = this.conversation.messages;
        if (this.conversation.user1.email !== this.currentUser) {
          this.chattingWithName = `${this.conversation.user1.name} ${this.conversation.user1.lastname}`;
      } else {
          this.chattingWithName = `${this.conversation.user2.name} ${this.conversation.user2.lastname}`;
      }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addMsg(f: any) {
    const id = this.conversationId;
    let toUser: any;
    let fromUser: any;
  
    this.userService.getDataUser(this.userService.getUserEmail()).subscribe({
      next: async (data: any) => {
        fromUser = await data;
        this.getConversationById(id);
        
        if (this.conversation.user1 != fromUser) {
          toUser = this.conversation.user2;
        } else {
          toUser = this.conversation.user1;
        }
  
        this.message = f.value.text;
  
        let user = {
          text: this.message,
        };
  
        this.dataService.addMessage(user, id).subscribe({
          next: (data) => {
            // Ajouter le nouveau message à la liste des messages directement
            this.messages.push(data);
          },
          error: (err) => {
            console.log(err);
          },
        });
  
        f.reset();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
  
  stringAsDate(dateStr: string) {
    return new Date();
  }
}
