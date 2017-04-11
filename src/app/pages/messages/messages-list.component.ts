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
import {FeatureService} from "./feature.service"
import {UtilityService} from "../shared/services/utility.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DataShareService } from "../shared/services/dataShare.service";
import {Paginated} from "./paginated";
import {Subscription} from "rxjs";
import {MembershipService} from "../login/membership.service";
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
export class MessageListComponent extends Paginated{
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
     private _photosAPI: string = 'http://localhost:9823/api/Messages/';
  private _displayingTotal: number;
  private sub: Subscription
    constructor(
     //   private dataService: DataService,
     //   private itemsService: ItemsService,
      //  private configService: ConfigService,
        private notificationService: NotificationService,
        private loadingBarService: SlimLoadingBarService,
        private featureService: FeatureService,
        public utilityService: UtilityService,
        private dataShareService: DataShareService,
        private membershipService:MembershipService,
  private route: ActivatedRoute,
  private router: Router
        )
    {
      super(0, 0, 0);
      this.feature = new Feature();

    }

    ngOnInit() {
       // this.apiHost = this.configService.getApiHost();
      this.sub = this.route.params.subscribe(params => {
        this.dataShareService.set(this._photosAPI, 12);
        this.dataShareService.setToken(this.membershipService.getTokenUser());

        this.loadMessages();

        //this.cleanFeature();
        //this.feature = new Feature();
      });



    }

    loadMessages() {
       this.dataShareService.get(this._page)
            .subscribe(res => {

                var data: any = res.json();

                this.messages = data.Items;
                this._displayingTotal = data.TotalCount;
                this._page = data.Page;
                this._pagesCount = data.TotalPages;
                this._totalCount = data.TotalCount;
            //    this._albumTitle = this._photos[0].AlbumTitle;
            },
            error => {

                if (error.status == 401 || error.status == 302 ||error.status==0) {

                    this.utilityService.navigateToSignIn();

                }
              console.error('Error: ' + error)


            },
            () => console.log(this.messages));

    }
      // this.dataService.getMessages(this.currentPage, this.itemsPerPage)
      //   .subscribe((res: PaginatedResult<Message[]>) => {
      //       this.messages = res.result;// schedules;
      //       this.totalItems = res.pagination.TotalItems;
      //       this.loadingBarService.complete();
      //     },
      //     error => {
      //       if (error.status == 401 || error.status == 302) {
      //         this.utilityService.navigateToSignIn();
      //       }
      //
      //       console.error('Error: ' + error);
      //
      //       this.loadingBarService.complete();
      //       this.notificationService.printErrorMessage('Có lỗi khi tải thông báo. ' + error);
      //
      //     });
    //}

    // pageChanged(event: any): void {
    //     this.currentPage = event.page;
    //     this.loadMessages();
    //
    // };

  //Thêm hàm này
  search(i): void {
    super.search(i);
    this.loadMessages();
  };

    addFeature(feature: Feature) {
        console.log(feature);
        this.loadingBarService.start();
        this.featureService.createFeedback(feature)
            .subscribe(() => {
                this.notificationService.printSuccessMessage('Thêm feedback thành công');
                this.loadingBarService.complete();
                this.feature =new Feature();
            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.printErrorMessage('Lỗi- ' + error);
            });

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
    }
}
