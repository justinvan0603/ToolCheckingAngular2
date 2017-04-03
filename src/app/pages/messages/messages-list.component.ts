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
import { Message } from "./message";
import { DataService } from "./message.service";
import {Feature} from "./feature"
import { FeatureService } from "./feature.service"
import { ReCaptchaComponent } from "angular2-recaptcha";
@Component({
    // moduleId: module.id,

    selector: 'messages',
    templateUrl: 'messages-list.component.html',
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
export class MessageListComponent {
    @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;
    @ViewChild('childModal') public childModal: ModalDirective;
    messages: Message[];
    selectedMessage: Message;
    apiHost: string;

    public itemsPerPage: number = 10;
    public totalItems: number = 0;
    public currentPage: number = 1;

    public feature : Feature;
    // Modal properties
    @ViewChild('modal')
    modal: any;
    items: string[] = ['item1', 'item2', 'item3'];
    selected: string;
    output: string;
    selectedMessageId: number;
    selectedMessageLoaded: boolean = false;
    index: number = 0;
    backdropOptions = [true, false, 'static'];
    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string | boolean = true;
    onEdit: boolean = false;
    addingUser: boolean = false;
    constructor(
        private dataService: DataService,
        private itemsService: ItemsService,
        private notificationService: NotificationService,
        private configService: ConfigService,
        private loadingBarService: SlimLoadingBarService,
        private featureService: FeatureService) {this.feature = new Feature();  }

    ngOnInit() {
        this.apiHost = this.configService.getApiHost();
        this.loadMessages();
        //this.cleanFeature();
        //this.feature = new Feature();
        
    }

    loadMessages() {
        this.loadingBarService.start();

        this.dataService.getMessages(this.currentPage, this.itemsPerPage)
            .subscribe((res: PaginatedResult<Message[]>) => {
                this.messages = res.result;// schedules;
                this.totalItems = res.pagination.TotalItems;
                this.loadingBarService.complete();
            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.printErrorMessage('Có lỗi khi tải thông báo. ' + error);
            });
    }

    pageChanged(event: any): void {
        this.currentPage = event.page;
        this.loadMessages();

    };


    addFeature(feature: Feature) {
       
        this.feature.RecordStatus = '1';
        this.feature.AuthStatus = 'U';
        this.feature.Resource = this.selectedMessage.Id.toString();
        let captcharesponse = this.captcha.getResponse();
        this.loadingBarService.start();
        if(captcharesponse == null || captcharesponse === '')
        {
            this.loadingBarService.complete();
            this.notificationService.printErrorMessage('Vui lòng xác thực Captcha!');
        }
        else
        {
        
        console.log(feature);
        
        this.featureService.createFeedback(feature)
            .subscribe(() => {
                this.notificationService.printSuccessMessage('Thêm feedback thành công');
                this.loadingBarService.complete();
               // this.feature =new Feature();
                this.captcha.reset();
            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.printErrorMessage('Lỗi- ' + error);
            });
        }

    }





    public viewMessageDetails(msg: Message): void {
        this.addingUser = false;
        this.selectedMessage = new Message();
        this.selectedMessage = msg;

        this.loadingBarService.complete();
        this.selectedMessageLoaded = true;

        this.feature.Resource = msg.Id.toString();
        this.childModal.show();
    }


    public hideChildModal(): void {
        this.childModal.hide();
        this.captcha.reset();
    }
}