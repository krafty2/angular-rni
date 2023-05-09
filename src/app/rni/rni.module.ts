import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListLieuComponent } from './list-lieu/list-lieu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MapComponent } from './map/map.component';

import { AuthorizationGuard } from '../guard/authorization.guard';
import { AuthorizationByRolesGuard } from '../guard/authorization-by-roles.guard';
import { NavbarComponent } from './navbar/navbar.component';

const rniRoutes: Routes = [
  {path:'map',component:MapComponent},
  {path:'lieux',component:ListLieuComponent,canActivate:[AuthorizationGuard],data:{roles:['ADMIN']}},
 
];

@NgModule({
  declarations: [
    MapComponent,
    ListLieuComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forChild(rniRoutes)
  ]
})
export class RniModule { }
