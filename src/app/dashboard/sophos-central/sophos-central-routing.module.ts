import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantComponent } from './tenant/tenant.component';
import { XdrqueriesComponent } from './xdrqueries/xdrqueries.component';

const routes: Routes = [
  {path: 'tenant', component:TenantComponent},
  {path:'xdr',component:XdrqueriesComponent  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SophosCentralRoutingModule { }
