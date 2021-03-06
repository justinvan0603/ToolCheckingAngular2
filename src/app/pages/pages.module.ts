import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { Pages } from './pages.component';
import {PageMenuService} from "./pages.menu.service";
import {ShareModule} from "./shared/shares.module";
import {ConfigService} from "./shared/services/shared/utils/config.service";
import {ItemsService} from "./shared/services/shared/utils/items.service";
import {UtilityService} from "./shared/services/utility.service";
import {NotificationService} from "./shared/utils/notification.service";

@NgModule({
  imports: [CommonModule, NgaModule, routing,ShareModule],
  declarations: [Pages],
  providers: [
    // ConfigService,
    PageMenuService,
    ConfigService,
    ItemsService,
    UtilityService,
    NotificationService
  ]

})

export class PagesModule {
}
