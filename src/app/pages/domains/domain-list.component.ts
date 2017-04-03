import {
    Component, OnInit, ViewChild, Input, Output,
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

// import { DateFormatPipe } from '../shared/pipes/date-format.pipe';
import { ItemsService } from '../shared/utils/items.service';
import { ConfigService } from '../shared/utils/config.service';
import { Pagination, PaginatedResult } from '../shared/interfaces';
import { NotificationService } from "../shared/utils/notification.service";
import { Domain } from "./domain";
import { DataService } from "./domains.service";
import { ManageUser } from "./manageuser";
import { ManageUserService } from "./manageuser.service";

@Component({
    // moduleId: module.id,

    selector: 'domains',
    templateUrl: 'domain-list.component.html',

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
    ],
    
})
export class DomainListComponent {
    @ViewChild('childModal') public childModal: ModalDirective;
    domains: Domain[];
    selectedDomain: Domain;
    apiHost: string;
    public listManageUser: ManageUser[];
    public selectedManageUser: ManageUser;
    public itemsPerPage: number = 10;
    public totalItems: number = 0;
    public currentPage: number = 1;
    
    public addDomain:Domain;
    // Modal properties
    @ViewChild('modal')
    modal: any;
    items: string[] = ['item1', 'item2', 'item3'];
    selected: string;
    output: string;
    selectedDomainId: number;
    selectedDomainLoaded: boolean = false;
    index: number = 0;
    backdropOptions = [true, false, 'static'];
    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string | boolean = true;
    onEdit: boolean = false;
    public addingDomain: boolean = false;
    public static DOMAIN_PREFIX = "http://";
    constructor(
        private dataService: DataService,
        private itemsService: ItemsService,
        private notificationService: NotificationService,
        private configService: ConfigService,
        private loadingBarService: SlimLoadingBarService,
        private manageUserService: ManageUserService
        ) {this.addDomain = new Domain();  }

    ngOnInit() {
        this.apiHost = this.configService.getApiHost();
        this.loadDomains();
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
    loadDomains() {
        this.loadingBarService.start();

        this.dataService.getDomains(this.currentPage, this.itemsPerPage)
            .subscribe((res: PaginatedResult<Domain[]>) => {
                this.domains = res.result;// schedules;
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
        this.loadDomains();

    };


    addNewDomain(domain: Domain) {
        if(domain.DOMAIN.includes(DomainListComponent.DOMAIN_PREFIX))
        {
        console.log(domain);
        this.loadingBarService.start();
        domain.USER_ID = this.selectedManageUser.Id.toString();
        domain.USERNAME = this.selectedManageUser.Username;
        domain.CREATE_DT = domain.EDIT_DT = domain.APPROVE_DT = null;
        this.dataService.createDomain(domain)
            .subscribe(() => {
                this.notificationService.printSuccessMessage('Thêm domain thành công');
                this.loadingBarService.complete();
                this.addDomain =new Domain();
            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.printErrorMessage('Lỗi- ' + error);
            });
        }
        else
        {
            this.loadingBarService.start();
            this.loadingBarService.complete();
                this.notificationService.printErrorMessage("Lỗi - Tên miền phải chứa tiền tố 'http://' ");
        }
   //     this.itemsService.addItemToStart<IScheduleT>(this.schedules, schedule);
            //this.loadSchedules();
    }

    viewAddDomain() {
        this.onEdit = false;
        this.addDomain = new Domain();
        this.selectedDomain = new Domain();
        this.addingDomain = true;
        this.loadingBarService.complete();
        this.selectedDomainLoaded = true;
        this.childModal.show();

    }
deleteDomain(domain:Domain)
{
    this.notificationService.openConfirmationDialog('Bạn có chắc muốn xóa?',
            () => {
                this.loadingBarService.start();
                this.dataService.deleteDomain(domain.ID)
                    .subscribe(() => {
                        this.itemsService.removeItemFromArray<Domain>(this.domains, domain);
                        this.notificationService.printSuccessMessage('Xóa domain thành công');
                        this.loadingBarService.complete();
                    },
                    error => {
                        this.loadingBarService.complete();
                        this.notificationService.printErrorMessage('Lỗi ' + ' ' + error);
                    });
            });
}
editDomain(domain: Domain) {
        //console.log(domain);
        if(domain.DOMAIN.includes(DomainListComponent.DOMAIN_PREFIX)){
        console.log(this.selectedManageUser);
        this.selectedDomain.USER_ID =this.selectedManageUser.Id.toString();
        this.selectedDomain.USERNAME = this.selectedManageUser.Username;
        this.loadingBarService.start();
        this.onEdit = true;
        this.dataService.updateDomain(this.selectedDomain)
            .subscribe(() => {
                this.notificationService.printSuccessMessage('Domain đã được cập nhật');
                this.loadingBarService.complete();
            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.printErrorMessage('Cập nhật thất bại ' + error);
            });
        }
        else
        {
            this.loadingBarService.start();
            this.loadingBarService.complete();
                this.notificationService.printErrorMessage("Lỗi - Tên miền phải chứa tiền tố 'http://' ");
        }

    }

    public viewDomainDetails(domain: Domain): void {
        this.addingDomain = false;
        //this.selectedUser = new Domain();
        this.selectedDomain = domain;
        //this.selectedDomain.APPROVE_DT = new Date();
        //this.selectedDomain.EDIT_DT = new Date();
        //this.selectedDomain.CREATE_DT = new Date();
        //this.selectedDomain.CHECKER_ID = '';
        //this.selectedDomain.EDITOR_ID = '';
        //this.selectedDomain.MAKER_ID = '';
        //this.selectedDomain.FULLNAME = '';
        console.log(this.selectedDomain);
        this.selectedManageUser = this.listManageUser.find(val => val.Username == domain.USERNAME);
        //alert(this.addingUser);
        this.loadingBarService.complete();
        this.selectedDomainLoaded = true;

        this.childModal.show();
    }


    public hideChildModal(): void {
        this.childModal.hide();
    }
}