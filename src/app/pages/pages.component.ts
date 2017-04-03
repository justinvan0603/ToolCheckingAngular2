import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';

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

  constructor(private _menuService: BaMenuService,) {
  }

  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
  }
}
