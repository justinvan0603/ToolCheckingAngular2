import {NgModule} from "@angular/core";
import {CommonModule, HashLocationStrategy, LocationStrategy} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgaModule} from "../../theme/nga.module";

import {Login} from "./login.component";
import {routing} from "./login.routing";
import {DataShareService} from "../shared/services/dataShare.service";
import {MembershipService} from "./membership.service";
import {NotificationService} from "../shared/utils/notification.service";
import {BaseRequestOptions, Headers, RequestOptions} from "@angular/http";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Login
  ],
  providers: [
    DataShareService,
    MembershipService,
    NotificationService
  ]
})
export class LoginModule {

  constructor() {
  }
}
