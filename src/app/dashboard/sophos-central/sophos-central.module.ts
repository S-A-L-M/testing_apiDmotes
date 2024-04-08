import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SophosCentralRoutingModule } from './sophos-central-routing.module';
import { TenantComponent } from './tenant/tenant.component';
import { XdrqueriesComponent } from './xdrqueries/xdrqueries.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TenantComponent,
    XdrqueriesComponent
  ],
  imports: [
    CommonModule,
    SophosCentralRoutingModule,
    SharedModule
  ]
})
export class SophosCentralModule { }
