import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { getImageURL } from 'src/app/utils/getImageUrl';
@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
})
export class MemberComponent implements OnInit {
  getImageURL = getImageURL;
  showPopup: boolean = false;
  @Input() member: User;
  @Output() deleteMember$ = new EventEmitter<User>();
  constructor() {}

  ngOnInit(): void {}

  deleteMember(member: User) {
    this.deleteMember$.emit(member);
  }
}
