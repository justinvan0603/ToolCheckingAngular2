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
import {ApplicationRole} from "./applicationRole";
import {UserRoleService} from "./user-role.service";

@Component({
    // moduleId: module.id,

    selector: 'users',
    templateUrl: 'users-group.component.html',
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
export class ApplicationGroupComponent {
    @ViewChild('childModal') public childModal: ModalDirective;
    users: ApplicationGroup[];
    selectedApplicationGroup: ApplicationGroup;
    apiHost: string;

    public itemsPerPage: number = 10;
    public totalItems: number = 0;
    public currentPage: number = 1;

    public addApplicationGroup:ApplicationGroup;
    applicationRole: ApplicationRole[];
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
    public addingApplicationGroup: boolean = false;
    constructor(
        private dataService: UserGroupService,
        private itemsService: ItemsService,
        private notificationService: NotificationService,
        private configService: ConfigService,
        private loadingBarService: SlimLoadingBarService,
        private roleService: UserRoleService
        ) {this.addApplicationGroup = new ApplicationGroup();  }

    ngOnInit() {
        this.apiHost = this.configService.getApiHost();
        this.loadApplicationGroups();

         this.loadRoleByGroup();

    }

    loadApplicationGroups() {
        this.loadingBarService.start();

        this.dataService.getApplicationGroups(this.currentPage, this.itemsPerPage)
            .subscribe((res: PaginatedResult<ApplicationGroup[]>) => {
                this.users = res.result;// schedules;
                //this.totalItems = res.pagination.TotalItems;
                this.loadingBarService.complete();
            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.printErrorMessage('Có lỗi khi tải. ' + error);
            });
    }

  loadRoleByGroup() {
    this.loadingBarService.start();

    this.roleService.get(this.currentPage, this.itemsPerPage)
      .subscribe((res: PaginatedResult<ApplicationRole[]>) => {
          this.applicationRole = res.result;// schedules;

          // this.totalItems = res.pagination.TotalItems;
          this.loadingBarService.complete();
        },
        error => {
          this.loadingBarService.complete();
          this.notificationService.printErrorMessage('Có lỗi khi tải. ' + error);
        });
  }



    pageChanged(event: any): void {
        this.currentPage = event.page;
        this.loadApplicationGroups();

    };


    addNewApplicationGroup(usr: ApplicationGroup) {
      this.loadingBarService.start();
        this.selectedApplicationGroup.Roles = this.applicationRole;
        console.log(this.selectedApplicationGroup);

        this.dataService.createApplicationGroup(this.selectedApplicationGroup)
            .subscribe(() => {
                this.notificationService.printSuccessMessage('Thêm tài khoản thành công');
                this.loadingBarService.complete();
                this.addApplicationGroup =new ApplicationGroup();
                this.loadApplicationGroups();

            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.printErrorMessage('Lỗi- ' + error);
            });
   //     this.itemsService.addItemToStart<IScheduleT>(this.schedules, schedule);
            //this.loadSchedules();
    }

    viewAddApplicationGroup() {
        this.onEdit = false;

        this.addApplicationGroup = new ApplicationGroup();
        this.selectedApplicationGroup = new ApplicationGroup();
        
         this.selectedApplicationGroup.Roles = this.applicationRole;
         //console.log(this.selectedApplicationGroup.Roles);
        // this.loadRoleByGroup();
        this.addingApplicationGroup = true;
        this.loadingBarService.complete();
        this.selectedApplicationGroupLoaded = true;
        this.childModal.show();

    }
deleteApplicationGroup(usr:ApplicationGroup)
{
    this.notificationService.openConfirmationDialog('Bạn có chắc muốn xóa?',
            () => {
                this.loadingBarService.start();
                this.dataService.deleteApplicationGroup(usr.ID)
                    .subscribe(() => {
                        this.itemsService.removeItemFromArray<ApplicationGroup>(this.users, usr);
                        this.notificationService.printSuccessMessage(usr.Name + ' has been deleted.');
                        this.loadingBarService.complete();
                    },
                    error => {
                        this.loadingBarService.complete();
                        this.notificationService.printErrorMessage('Lỗi ' + usr.Name + ' ' + error);
                    });
            });
}
editApplicationGroup(usr: ApplicationGroup) {
        console.log(usr);
        
        usr.Roles = this.selectedApplicationGroup.Roles;
        this.loadingBarService.start();
        this.onEdit = true;
        this.dataService.updateApplicationGroup(usr)
            .subscribe(() => {
                this.notificationService.printSuccessMessage('ApplicationGroup đã được cập nhật');
                this.loadingBarService.complete();
            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.printErrorMessage('Cập nhật thất bại ' + error);
            });

    }

    public viewApplicationGroupDetails(usr: ApplicationGroup): void {

      this.dataService.getRoleByGroupDetail(this.currentPage, this.itemsPerPage, usr.ID)
        .subscribe((res: PaginatedResult<ApplicationRole[]>) => {
            // this.applicationRole = res.result;// schedules;

            // this.totalItems = res.pagination.TotalItems;
            this.loadingBarService.complete();
            this.addingApplicationGroup = false;
            this.selectedApplicationGroup = new ApplicationGroup();
            this.selectedApplicationGroup = usr;
            this.selectedApplicationGroup.Roles = res.result;
            //alert(this.addingApplicationGroup);
            this.loadingBarService.complete();
            this.selectedApplicationGroupLoaded = true;
            this.childModal.show();
          },
          error => {
            this.loadingBarService.complete();
            this.notificationService.printErrorMessage('Có lỗi khi tải. ' + error);
          });


    }

  // loadRolesByGroupDetail(id: number) {
  //   this.loadingBarService.start();
  //
  //   this.dataService.getRoleByGroupDetail(this.currentPage, this.itemsPerPage, id)
  //     .subscribe((res: PaginatedResult<ApplicationRole[]>) => {
  //         this.applicationRole = res.result;// schedules;
  //
  //         // this.totalItems = res.pagination.TotalItems;
  //         this.loadingBarService.complete();
  //       },
  //       error => {
  //         this.loadingBarService.complete();
  //         this.notificationService.printErrorMessage('Có lỗi khi tải. ' + error);
  //       });
  // }

    public hideChildModal(): void {
        this.childModal.hide();
    }
}
