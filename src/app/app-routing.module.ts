import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { FrontPageComponent } from './front-page/front-page.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { LoginComponent } from './login/login.component';
import { MainSupermarketComponent } from './main-supermarket/main-supermarket.component';
import { OtherShopsComponent } from './other-shops/other-shops.component';
import { RegisterComponent } from './register/register.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/frontPage', pathMatch: 'full' }, // root, lcalhost 4200
  { path: 'frontPage', component: FrontPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'mainSupermarket',
    component: MainSupermarketComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'otherShops',
    component: OtherShopsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'details/:id', component: ItemDetailsComponent }, // dynamic route, changes based on id
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
