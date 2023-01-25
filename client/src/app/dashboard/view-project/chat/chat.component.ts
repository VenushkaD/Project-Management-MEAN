import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewChecked,
  HostListener,
  Input,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth/auth.service';
import { Messages } from 'src/app/models/messages.model';
import { AppState } from 'src/app/store/app.reducer';
import { DashboardService } from '../../dashboard.service';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import { SocketService } from '../../socket.service';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @Input() projectId: string;
  bottomScroll = false;
  messages: Messages;
  userId: string;
  moment = moment;
  isLoading = false;
  constructor(
    private dashboardService: DashboardService,
    private store: Store<AppState>,
    private socketService: SocketService
  ) {}

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.bottomScroll = false;
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      this.bottomScroll = true;
    }
    // this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.scrollToBottom();
    window.scroll({
      top: 100,
      left: 100,
      behavior: 'smooth',
    });
    this.isLoading = true;
    this.store.select('auth').subscribe((authState) => {
      this.userId = authState.user._id;
      this.dashboardService
        .getMessages(this.projectId)
        .subscribe((messages) => {
          this.messages = messages;
          this.isLoading = false;
        });
    });
    this.socketService
      .listenToServer('message-added')
      .subscribe((data: Message) => {
        if (data.projectId !== this.projectId) return;
        this.messages.messages.push(data);
        this.scrollToBottom();
      });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  onSubmit(form: NgForm) {
    const text = form.value.text;
    this.dashboardService
      .sendMessage(text, this.projectId)
      .subscribe((messages) => {
        // this.messages.messages.push(messages);
        // this.scrollToBottom();
      });
    form.reset();
  }
}
