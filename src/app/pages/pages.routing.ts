import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'users', loadChildren: 'app/pages/users/users.module#UserModule' },
      { path: 'messages', loadChildren: 'app/pages/messages/messages.module#MessageModule' },
      { path: 'messageconfigurations', loadChildren: 'app/pages/messageconfigurations/messageconfigurations.module#MessageConfigurationModule' },
      { path: 'domains', loadChildren: 'app/pages/domains/domains.module#DomainModule' },
      { path: 'optionlinks', loadChildren: 'app/pages/optionlinks/optionlinks.module#OptionLinkModule' },
      { path: 'optionusers', loadChildren: 'app/pages/optionusers/optionusers.module#OptionUserModule' },
   //   { path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule' },
    //  { path: 'editors', loadChildren: 'app/pages/editors/editors.module#EditorsModule' },
    //  { path: 'components', loadChildren: 'app/pages/components/components.module#ComponentsModule' },
    //  { path: 'charts', loadChildren: 'app/pages/charts/charts.module#ChartsModule' },
   //   { path: 'ui', loadChildren: 'app/pages/ui/ui.module#UiModule' },
   //   { path: 'forms', loadChildren: 'app/pages/forms/forms.module#FormsModule' },
      { path: 'tables', loadChildren: 'app/pages/tables/tables.module#TablesModule' },
       { path: 'schedules', loadChildren: 'app/pages/schedules/schedules.module#SchedulesModule' }
  //    { path: 'maps', loadChildren: 'app/pages/maps/maps.module#MapsModule' }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
