import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
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

 // private PAGES_MENU2: any;
  PAGES_MENU2 = [
    {
      path: 'pages',
      children: [

        {
          path: 'messages',
          data: {
            menu: {
              title: 'Thông báo',
              icon: 'ion-android-notifications-none',
              selected: false,
              expanded: false,
              order: 500,
            }
          },
          children: [
            {
              path: 'messagelist',
              data: {
                menu: {
                  title: 'Danh sách thông báo',
                }
              }
            }
          ]
        }]
    },
    {
      path: '',
      children: [

        {
          path: 'fileupload',
          data: {
            menu: {
              title: 'Upload',
              icon: 'ion-android-notifications-none',
              selected: false,
              expanded: false,
              order: 500,
            }
          },
          children: [
            {
              path: 'fileuploadpage',
              data: {
                menu: {
                  title: 'Upload File',
                }
              }
            }
          ]
        }]
    }];

  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
  }
  constructor(private _menuService: BaMenuService,) {
  }



}
