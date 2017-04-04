import {
    Component, OnInit, ViewChild, Input, Output,
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/core';

import { ModalDirective } from 'ng2-bootstrap';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

// import { DateFormatPipe } from '../shared/pipes/date-format.pipe';
import { ItemsService } from '../shared/utils/items.service';
import { ConfigService } from '../shared/utils/config.service';
import { Pagination, PaginatedResult } from '../shared/interfaces';
import { NotificationService } from "../shared/utils/notification.service";



import { ReCaptchaComponent } from "angular2-recaptcha";
import { DataService } from "./userprofile.service";
import { User } from "../users/user";
@Component({
    // moduleId: module.id,

    selector: 'userprofile-detail',
    templateUrl: 'userprofile-detail.component.html',
    animations: [
        trigger('flyInOut', [
            state('in', style({ opacity: 1, transform: 'translateX(0)' })),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(-100%)'
                }),
                animate('0.5s ease-in')
            ]),
            transition('* => void', [
                animate('0.2s 10 ease-out', style({
                    opacity: 0,
                    transform: 'translateX(100%)'
                }))
            ])
        ])
    ]
})
export class UserProfileDetailComponent {
    //@ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;
    public currentUser : User;
    apiHost: string;
    constructor(
        private dataService: DataService,
        private itemsService: ItemsService,
        private notificationService: NotificationService,
        private configService: ConfigService,
        private loadingBarService: SlimLoadingBarService,
        ) { 
            this.currentUser = new User();
         }

    ngOnInit() {
        this.apiHost = this.configService.getApiHost();
        var _userData = JSON.parse(localStorage.getItem('user'));
         let username : string ;
        username = _userData.Username;

         this.dataService.getUser(null,username.toString()).subscribe((data: User) => {
               
                this.loadingBarService.complete();
                this.currentUser = data;
            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.printErrorMessage('Lỗi- ' + error);
            });
        //this.cleanFeature();
        //this.feature = new Feature();
        
    }



   


}