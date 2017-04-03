import { Routes, RouterModule }  from '@angular/router';


import { ModuleWithProviders } from '@angular/core';
import { UserListComponent } from "./users-list.component";
import { Users } from "./users.component";

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Users ,
    children: [
      { path: 'userlist', component: UserListComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
