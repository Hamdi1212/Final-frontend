import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailEquipementComponent } from './detail-equipement/detail-equipement.component';
import { EquipementComponent } from './equipement/equipement.component';
import { LoginComponent } from './login/login.component';
import { NouvelEquipementComponent } from './nouvel-equipement/nouvel-equipement.component';
import { RegisterComponent } from './register/register.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { MouvementStockComponent } from './mouvement-stock/mouvement-stock.component';
import { CategorieComponent } from './categorie/categorie.component';
import { NouvelCategoryComponent } from './nouvel-category/nouvel-category.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeSettingComponent } from './employee-setting/employee-setting.component';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { NewPostComponent } from './Post/new-post/new-post.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { RoleGuard } from './guards/role.guard';
import { DeplacementComponent } from './deplacement/deplacement.component'; // <-- ADD THIS LINE
import { ListDeplacementComponent } from './deplacement/list-deplacement/list-deplacement.component';
import { AddDeplacementComponent } from './deplacement/add-deplacement/add-deplacement.component';
import { ListStoreComponent } from './deplacement/list-store/list-store.component';
import { AddStoreComponent } from './deplacement/add-store/add-store.component';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [RoleGuard]
  },{
    path:'',
    component:DashboardComponent,
    children:[
      {
        path:'statistiques',
        component:StatistiquesComponent
      },{
        path:'equipement',
        component:CategoriesListComponent
      },
      {
        path:'equipementDetails',
        component:EquipementComponent
      }
      ,{
        path:'nouvel-equipement',
        component:NouvelEquipementComponent
      },{
        path:'mouvement-stock',
        component:MouvementStockComponent
      },
      {
        path:'Categories',
        component : CategorieComponent
      },
      {
        path:'nouvel-category',
        component:NouvelCategoryComponent
      },
      {
        path:'Employees',
        component :EmployeesComponent
      },
      {
        path:'Setting',
        component : EmployeeSettingComponent
      },
      {
        path:'Post',
        component : NewPostComponent
      },
        {
      path: 'deplacement',
      component: DeplacementComponent,
      children: [
        { path: '', component: ListDeplacementComponent }, // default listing
        { path: 'add-deplacement', component: AddDeplacementComponent },
        { path: 'list-store', component: ListStoreComponent },
        { path: 'add-store', component: AddStoreComponent }
      ]
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }