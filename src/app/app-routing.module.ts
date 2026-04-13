import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CommonDashboardComponent } from './components/dashboard/common-dashboard/common-dashboard.component';
import { ApplyStoreManagerComponent } from './components/storeManager/apply-store-manager/apply-store-manager.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: CommonDashboardComponent},
  {path: 'apply-store-manager', component: ApplyStoreManagerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
