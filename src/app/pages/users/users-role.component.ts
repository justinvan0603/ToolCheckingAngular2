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
import { DataService } from "./user.service";
import {ApplicationGroup} from "./applicationGroup";
import {UserGroupService} from "./user-group.service";
import {UserRoleService} from "./user-role.service";
import {ApplicationRole} from "./applicationRole";

@Component({
    // moduleId: module.id,

    selector: 'users',
    templateUrl: 'users-role.component.html',
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
export class ApplicationRoleComponent {
    @ViewChild('childModal') public childModal: ModalDirective;
    users: ApplicationRole[];
    selectedApplicationGroup: ApplicationRole;
    apiHost: string;

    public itemsPerPage: number = 10;
    public totalItems: number = 0;
    public currentPage: number = 1;

    public addApplicationGroup:ApplicationRole;
    // Modal properties
    @ViewChild('modal')
    modal: any;
    items: string[] = ['item1', 'item2', 'item3'];
    selected: string;
    output: string;
    selectedApplicationGroupId: number;
    selectedApplicationGroupLoaded: boolean = false;
    index: number = 0;
    backdropOptions = [true, false, 'static'];
    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string | boolean = true;
    onEdit: boolean = false;
    public adding: boolean = false;
    constructor(
        private dataService: UserRoleService,
        private itemsService: ItemsService,
        private notificationService: NotificationService,
        private configService: ConfigService,
        private loadingBarService: SlimLoadingBarService,
        ) {this.addApplicationGroup = new ApplicationRole();  }

    ngOnInit() {
        this.apiHost = this.configService.getApiHost();
        this.loadRoles();


    }

    loadRoles() {
        this.loadingBarService.start();

        this.dataService.get(this.currentPage, this.itemsPerPage)
            .subscribe((res: PaginatedResult<ApplicationRole[]>) => {
                this.users = res.result;// schedules;
              //  this.totalItems = res.pagination.TotalItems;
                this.loadingBarService.complete();
            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.printErrorMessage('Có lỗi khi tải. ' + error);
            });
    }

    pageChanged(event: any): void {
        this.currentPage = event.page;
        this.loadRoles();

    };


    addNew(usr: ApplicationGroup) {

        //console.log(user);
        console.log(this.selectedApplicationGroup);
        this.loadingBarService.start();
        this.dataService.create(this.selectedApplicationGroup)
            .subscribe(() => {
                this.notificationService.printSuccessMessage('Thêm tài khoản thành công');
                this.loadingBarService.complete();
                this.addApplicationGroup =new ApplicationRole();
                this.loadRoles();
            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.printErrorMessage('Lỗi- ' + error);
            });
   //     this.itemsService.addItemToStart<IScheduleT>(this.schedules, schedule);
            //this.loadSchedules();
    }

    viewAdd() {
        this.onEdit = false;
        this.addApplicationGroup = new ApplicationRole();
        this.selectedApplicationGroup = new ApplicationRole();
        this.adding = true;
        this.loadingBarService.complete();
        this.selectedApplicationGroupLoaded = true;
        this.childModal.show();

    }

  // delete(id:string) {
  //     console.log("u"+id);
  //   this.notificationService.openConfirmationDialog('Bạn có chắc muốn xóa?',
  //     () => {
  //       this.loadingBarService.start();
  //       this.dataService.delete(id)
  //         .subscribe(() => {
  //             this.itemsService.removeItemFromArray<ApplicationRole>(this.users, id);
  //             this.notificationService.printSuccessMessage("usr.Name" + ' has been deleted.');
  //             this.loadingBarService.complete();
  //           },
  //           error => {
  //             this.loadingBarService.complete();
  //             this.notificationService.printErrorMessage('Lỗi ' +"usr.Name" + ' ' + error);
  //           });
  //     });
  // }

  delete(usr: ApplicationRole) {
    console.log("u"+usr);
    this.notificationService.openConfirmationDialog('Bạn có chắc muốn xóa?',
      () => {
        this.loadingBarService.start();
        this.dataService.delete(usr.Id)
          .subscribe(() => {
              this.itemsService.removeItemFromArray<ApplicationRole>(this.users, usr);
              this.notificationService.printSuccessMessage(usr.Name + ' has been deleted.');
              this.loadingBarService.complete();
            },
            error => {
              this.loadingBarService.complete();
              this.notificationService.printErrorMessage('Lỗi ' + usr.Name + ' ' + error);
            });
      });
  }

edit(usr: ApplicationRole) {
        console.log(usr);
        this.loadingBarService.start();
        this.onEdit = true;
        this.dataService.update(usr)
            .subscribe(() => {
                this.notificationService.printSuccessMessage('ApplicationGroup đã được cập nhật');
                this.loadingBarService.complete();
            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.printErrorMessage('Cập nhật thất bại ' + error);
            });

    }

    public viewDetails(usr: ApplicationRole): void {
      console.log(usr);
        this.adding = false;
        this.selectedApplicationGroup = new ApplicationRole();
        this.selectedApplicationGroup = usr;
        //alert(this.addingApplicationGroup);
        this.loadingBarService.complete();
        this.selectedApplicationGroupLoaded = true;

        this.childModal.show();
    }


    public hideChildModal(): void {
        this.childModal.hide();
    }
}
