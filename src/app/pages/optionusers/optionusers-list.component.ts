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
import { ActivatedRoute } from '@angular/router';

//import { Optionlink } from "./optionlink";
//import { OptionLinkService } from "./optionlinks.service";
import { ItemsService } from "../shared/utils/items.service";
import { NotificationService } from "../shared/utils/notification.service";
import { ConfigService } from "../shared/utils/config.service";
import { PaginatedResult } from "../shared/interfaces";
import { UserDomain } from "./userdomain";
import { OptionSearchObject } from "../optionlinks/optionsearch";
// import { OptionLinkService } from "../optionlinks/optionlinks.service";
import { OptionService } from "../optionlinks/option.service";
import { OptionLinkUpdateObject } from "../optionlinks/optionupdateobject";
import { UserDomainUpdateObject } from "./userdomainupdateobject";
import { OptionUserService } from "./optionusers.service";
import { DomainUserService } from "./domainuser.service";
import { ManageUserService } from "../domains/manageuser.service";
import { ManageUser } from "../domains/manageuser";


@Component({
    // moduleId: module.id,

    selector: 'optionusers',
    templateUrl: 'optionusers-list.component.html',
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
export class OptionUserListComponent {
    //@ViewChild('childModal') public childModal: ModalDirective;
    userdomains: Array<UserDomain>;
    selecteduserDomain: UserDomain;
    domainid : string;
    apiHost: string;
    currentOptionSearch : OptionSearchObject;

    public itemsPerPage: number = 10;
    public totalItems: number = 0;
    public currentPage: number = 1;
    public listManageUser: ManageUser[];
    public addUserDomain:UserDomain;
    public selectedManageUser: ManageUser;
    // Modal properties
    //@ViewChild('modal')
   // modal: any;
    items: string[] = ['item1', 'item2', 'item3'];
    selected: string;
    output: string;
    //selectedDomainId: number;
    //selectedDomainLoaded: boolean = false;
    index: number = 0;
    backdropOptions = [true, false, 'static'];
    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string | boolean = true;
    onEdit: boolean = false;
   // public addingDomain: boolean = false;
    
    constructor(
        private dataService: OptionUserService,
        private itemsService: ItemsService,
        private notificationService: NotificationService,
        private configService: ConfigService,
        private loadingBarService: SlimLoadingBarService,
        private route: ActivatedRoute,
        private domainUserService: DomainUserService,
        private manageUserService : ManageUserService

        ) {this.addUserDomain = new UserDomain();  }

    ngOnInit() {
        this.apiHost = this.configService.getApiHost();
        this.route.params.subscribe(params => {this.domainid=params['domainid']});
        
        this.loadDomainUser();
        this.loadOption();
        this.loadManageUsers();
        
    }
    loadManageUsers()
    {
        this.manageUserService.getManageUsers(1056).subscribe((data:ManageUser[]) => {
                this.listManageUser = data;
                console.log(this.listManageUser);
                this.loadingBarService.complete();
            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.printErrorMessage('Có lỗi khi tải .- ' + error);
            });
    }
    loadOption()
    {
        this.domainUserService.getOption(this.domainid).subscribe((data: OptionSearchObject)=>{
            this.currentOptionSearch = data;
        },
        error => {
                 this.loadingBarService.complete();
               this.notificationService.printErrorMessage('Có lỗi khi tải .- ' + error);
                }
        );
    }
    saveOption()
    {
         let updObject = new UserDomainUpdateObject();
         updObject.DOMAINUSER = this.userdomains;
         updObject.IsEditLink = '0';
         updObject.IsEditUser = '1';
         updObject.OPTION = this.currentOptionSearch;
         this.domainUserService.updateUserDomain(updObject).subscribe(() => {
                this.notificationService.printSuccessMessage('User domain đã được cập nhật');
                this.loadingBarService.complete();
            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.printErrorMessage('Cập nhật thất bại ' + error);
            });
        //this.optionService.updateOption()
    }
    loadDomainUser() {
        this.loadingBarService.start();

        this.dataService.getOptionUsers(this.domainid,this.currentPage, this.itemsPerPage)
            .subscribe((res: PaginatedResult<Array<UserDomain>>) => {
                this.userdomains = res.result;// schedules;
                this.totalItems = res.pagination.TotalItems;
                this.loadingBarService.complete();
            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.printErrorMessage('Có lỗi khi tải. ' + error);
            });
    }

    pageChanged(event: any): void {
        this.currentPage = event.page;
        //this.loadOptionlinks();

    };

    addNewDomainUser(usrdomain: UserDomain) {
        let newItem = new UserDomain();
        newItem.DOMAIN_ID = usrdomain.DOMAIN_ID;
        newItem.NOTES = usrdomain.NOTES;
        newItem.USER_ID = this.selectedManageUser.Username;
        newItem.USERID = this.selectedManageUser.Id;
        this.itemsService.addItemToStart(this.userdomains,newItem);


    }

    deleteDomainUser(usrdomain:UserDomain)
    {
        this.itemsService.removeItemFromArray<UserDomain>(this.userdomains, usrdomain);

    }



}