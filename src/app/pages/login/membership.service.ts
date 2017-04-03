import { Http, Response, Request } from '@angular/http';
import { Injectable } from '@angular/core';
import {User} from "./user";
import {Registration} from "./registration";
import {DataServiceShare} from "./data.service";

@Injectable()
export class MembershipService {

    private _accountRegisterAPI: string = 'http://localhost:9823/api/account/register/';
    private _accountLoginAPI: string = 'http://localhost:9823/api/account/authenticate/';
    private _accountLogoutAPI: string = 'http://localhost:9823/api/account/logout/';

    constructor(public accountService: DataServiceShare) { }

    register(newUser: Registration) {

        this.accountService.set(this._accountRegisterAPI);

        return this.accountService.post(JSON.stringify(newUser));
    }

    login(creds: User) {
        this.accountService.set(this._accountLoginAPI);
        return this.accountService.post(JSON.stringify(creds));
    }

    logout() {
        this.accountService.set(this._accountLogoutAPI);
        return this.accountService.post(null, false);
    }

    isUserAuthenticated(): boolean {
        var _user: any = localStorage.getItem('user');
        if (_user != null)
            return true;
        else
            return false;
    }

    getLoggedInUser(): User {
        var _user: User;

        if (this.isUserAuthenticated()) {
            var _userData = JSON.parse(localStorage.getItem('user'));
            _user = new User(_userData.Username, _userData.Password);
        }

        return _user;
    }
}
