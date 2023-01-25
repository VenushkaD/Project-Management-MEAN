import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewChecked,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  bottomScroll = false;
  constructor() {}

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
}
