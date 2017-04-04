import {Component, OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

import 'style-loader!./login.scss';
import {User} from "./user";
import {NotificationService} from "../shared/utils/notification.service";
import {Router} from "@angular/router";
import {MembershipService} from "./membership.service";
import {OperationResult} from "./operationResult";

@Component({
  selector: 'login',
  templateUrl: './login.html',
})
export class Login implements OnInit {
  private _user: User;

  constructor(public membershipService: MembershipService,
              public notificationService: NotificationService,
              public router: Router) { }

  ngOnInit() {
    this._user = new User('', '');
  }

  login(): void {
    var _authenticationResult: OperationResult = new OperationResult(false, '');

    this.membershipService.login(this._user)
      .subscribe(res => {
          _authenticationResult.Succeeded = res.Succeeded;
          _authenticationResult.Message = res.Message;
        },
        error => console.error('Error: ' + error),
        () => {
          if (_authenticationResult.Succeeded) {
            this.notificationService.printSuccessMessage('Welcome back ' + this._user.Username + '!');
            localStorage.setItem('user', JSON.stringify(this._user));
            this.router.navigate(['pages/messages/messagelist']);
          }
          else {
            this.notificationService.printErrorMessage(_authenticationResult.Message);
          }
        });
  };
}
