import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PricingComponent } from './pricing/pricing.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'pricing', component: PricingComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' }, // redirect to `dashboard`
  { path: '**', redirectTo: '/auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
