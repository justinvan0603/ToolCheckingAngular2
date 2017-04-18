import {
  Component, OnInit, ViewChild, Input, Output,
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/core';

import {ModalDirective} from 'ng2-bootstrap';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

// import { DateFormatPipe } from '../shared/pipes/date-format.pipe';
import {ItemsService} from '../shared/utils/items.service';
import {ConfigService} from '../shared/utils/config.service';
import {Pagination, PaginatedResult} from '../shared/interfaces';
import {NotificationService} from "../shared/utils/notification.service";
import {User} from "./user";
import {DataService} from "./user.service";
import {UserManagerService} from "./user-manager.service";
import {UserManager} from "./user-manager";
import {ApplicationGroup} from "./applicationGroup";
import {UserGroupService} from "./user-group.service";
import { ChecklistDirective } from 'ng2-checklist';
@Component({
  // moduleId: module.id,

  selector: 'users',
  templateUrl: 'users-manager.component.html',
  animations: [
    trigger('flyInOut', [
      state('in', style({opacity: 1, transform: 'translateX(0)'})),
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
export class UserManagerComponent {

  @ViewChild('childModal') public childModal: ModalDirective;
  users: UserManager[];
  applicationgroups: ApplicationGroup[];
  selectedUser: UserManager;
  apiHost: string;

  public itemsPerPage: number = 10;
  public totalItems: number = 0;
  public currentPage: number = 1;

  public addUser: UserManager;
  // Modal properties
  @ViewChild('modal')
  modal: any;
  items: string[] = ['item1', 'item2', 'item3'];
  selected: string;
  output: string;
  selectedUserLoaded: boolean = false;
  index: number = 0;
  animation: boolean = true;
  onEdit: boolean = false;
  public addingUser: boolean = false;
  constructor(private dataService: UserManagerService,
              private itemsService: ItemsService,
              private notificationService: NotificationService,
              private configService: ConfigService,
              private loadingBarService: SlimLoadingBarService,
              private groupService: UserGroupService
  ) {
    this.addUser = new UserManager();
  }

  ngOnInit() {
    this.apiHost = this.configService.getApiHost();
    this.loadUsers();
   // this.loadGroupsByUser("58e8abf3-a789-44fd-94ba-926ffd655cba");
    this.loadGroups();
  }

  loadUsers() {
    this.loadingBarService.start();

    this.dataService.getUsers(this.currentPage, this.itemsPerPage)
      .subscribe((res: PaginatedResult<UserManager[]>) => {
          this.users = res.result;// schedules;
          this.totalItems = res.pagination.TotalItems;
          this.loadingBarService.complete();
        },
        error => {
          this.loadingBarService.complete();
          this.notificationService.printErrorMessage('Có lỗi khi tải. ' + error);
        });
  }
  loadGroups() {
    this.loadingBarService.start();

    this.groupService.getApplicationGroups(this.currentPage, this.itemsPerPage)
      .subscribe((res: PaginatedResult<ApplicationGroup[]>) => {
          this.applicationgroups = res.result;// schedules;
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
    this.loadUsers();

  };


  addNewUser(usr: UserManager) {

    //console.log(user);
    // this.selectedUser.Groups = this.selectedUser.Groups.filter(opt => opt.Check);
    // console.log(this.selectedUser);
    this.loadingBarService.start();
    this.dataService.createUser(this.selectedUser)
      .subscribe(() => {
          this.notificationService.printSuccessMessage('Thêm tài khoản thành công');
          this.loadingBarService.complete();
          this.addUser = new UserManager();
          this.loadUsers();
        },
        error => {
          this.loadingBarService.complete();
          this.notificationService.printErrorMessage('Lỗi- ' + error);
        });
    //     this.itemsService.addItemToStart<IScheduleT>(this.schedules, schedule);
    //this.loadSchedules();
  }

  viewAddUser() {
    //   console.log(this.applicationgroups);
    this.loadingBarService.start();
    this.onEdit = false;
    this.addUser = new UserManager();
    this.selectedUser = new UserManager();
    this.selectedUser.Groups = this.applicationgroups;
    this.addingUser = true;
    this.loadingBarService.complete();
    this.selectedUserLoaded = true;
    this.loadingBarService.complete();
    this.childModal.show();
  }

  deleteUser(usr: UserManager) {
    this.notificationService.openConfirmationDialog('Bạn có chắc muốn xóa?',
      () => {
        this.loadingBarService.start();
        this.dataService.deleteUser(usr.Id)
          .subscribe(() => {
              this.itemsService.removeItemFromArray<UserManager>(this.users, usr);
              this.notificationService.printSuccessMessage(usr.UserName + ' đã được xóa.');
              this.loadingBarService.complete();
            },
            error => {
              this.loadingBarService.complete();
              this.notificationService.printErrorMessage('Lỗi ' + usr.UserName + ' ' + error);
            });
      });
  }

  editUser(usr: UserManager) {
    console.log(usr);
   // usr.Groups = usr.Groups.filter(x=>x.Check);
    this.loadingBarService.start();
    this.onEdit = true;
    this.dataService.updateUser(usr)
      .subscribe(() => {
          this.notificationService.printSuccessMessage('User đã được cập nhật');
          this.loadingBarService.complete();
        },
        error => {
          this.loadingBarService.complete();
          this.notificationService.printErrorMessage('Cập nhật thất bại ' + error);
        });

  }

  public viewUserDetails(usr: UserManager): void {

    this.loadingBarService.start();

    this.dataService.getGroupsByUser(this.currentPage, this.itemsPerPage, usr.Id)
      .subscribe((res: PaginatedResult<ApplicationGroup[]>) => {
      //    this.applicationgroups = res.result;// schedules;
         // this.selectedUser.Groups = this.applicationgroups;

          // this.totalItems = res.pagination.TotalItems;

          this.addingUser = false;
          this.selectedUser = new UserManager();
          this.selectedUser = usr;
          this.selectedUser.Groups = res.result;
          //alert(this.addingUser);
      //  console.log("a"+res.result);
      //     for (let entry of this.selectedUser.Groups) {
      //       console.log(entry); // 1, "string", false
      //     }
          this.loadingBarService.complete();
          this.selectedUserLoaded = true;
          this.childModal.show();
        },
        error => {
          this.loadingBarService.complete();
          this.notificationService.printErrorMessage('Có lỗi khi tải. ' + error);
        });


  }


  public hideChildModal(): void {
    this.childModal.hide();
  }
}
