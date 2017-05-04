import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { BaMenuService } from '../theme';
import {PageMenuService} from "./pages.menu.service";
import {MembershipService} from "./login/membership.service";
import { PAGES_MENU } from "./pages.menu";
@Component({
//  moduleId: module.id,
  selector: 'pages',
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">

      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; <a href="http://akveo.com"></a>Trang quản trị hệ thống nhận diện thay đổi Website</div>

      </div>
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
    // <ul class="al-share clearfix">
    //       <li><i class="socicon socicon-facebook"></i></li>
    //       <li><i class="socicon socicon-twitter"></i></li>
    //       <li><i class="socicon socicon-google"></i></li>
    //       <li><i class="socicon socicon-github"></i></li>
    //     </ul>
    //<div class="al-footer-right">Created with <i class="ion-heart"></i></div>
})


export class Pages {

 private PAGES_MENU2: any;

  // PAGES_MENU2 = [
  //   {
  //     "path": "pages",
  //     children: [
  //       {
  //         path: 'messages',
  //         data: {
  //           menu: {
  //             title: 'Thông báo',
  //             icon: 'ion-android-notifications-none',
  //             selected: false,
  //             expanded: false,
  //             order: 500,
  //           }
  //         },
  //         children: [
  //           {
  //             path: 'messagelist',
  //             data: {
  //               menu: {
  //                 title: 'Danh sách thông báo',
  //               }
  //             }
  //           }
  //         ]
  //       }]
  //   },
  //   {
  //     path: '',
  //     children: [
  //
  //       {
  //         path: 'fileupload',
  //         data: {
  //           menu: {
  //             title: 'Upload',
  //             icon: 'ion-android-notifications-none',
  //             selected: false,
  //             expanded: false,
  //             order: 500,
  //           }
  //         },
  //         children: [
  //           {
  //             path: 'fileuploadpage',
  //             data: {
  //               menu: {
  //                 title: 'Upload File',
  //               }
  //             }
  //           }
  //         ]
  //       }]
  //   }];

 // PAGES_MENU:any[];

  constructor(private _menuService: BaMenuService, private dataService: PageMenuService, private membershipService:MembershipService) {
    dataService.setToken(this.membershipService.getTokenUser());

    this.loadMessages();
  }
  ngOnInit() {

 //   this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
  }


  loadMessages() {
   // console.log(this.PAGES_MENU2);
    //var _userData = JSON.parse(localStorage.getItem('user'));
    this.dataService.getMenu()
      .subscribe(res => {
          console.log("res"+res.json());
          var data: any = res.json();
          this.PAGES_MENU2 =data;

          // console.log("menu"+this.PAGES_MENU);
          this._menuService.updateMenuByRoutes(<Routes>this.PAGES_MENU2);
        },
        error => {

          if (error.status == 401 || error.status == 302 ||error.status==0 || error.status==404) {

          //  this.utilityService.navigateToSignIn();

          }
          console.error('Error: ' + error)


        },
        () => console.log("Loi"));

  }




}
