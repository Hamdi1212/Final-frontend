import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { EquipementComponent } from './equipement/equipement.component';
import { DetailEquipementComponent } from './detail-equipement/detail-equipement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Register2Component } from './register2/register2.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ButtonActionComponent } from './button-action/button-action.component';
import { NouvelEquipementComponent } from './nouvel-equipement/nouvel-equipement.component';
import { MouvementStockComponent } from './mouvement-stock/mouvement-stock.component';
import { DetailMouvementStockComponent } from './detail-mouvement-stock/detail-mouvement-stock.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailMvstkEquipementComponent } from './detail-mvstk-equipement/detail-mvstk-equipement.component';
import { CategorieComponent } from './categorie/categorie.component';
import { NouvelCategoryComponent } from './nouvel-category/nouvel-category.component';
import { DatePipe } from '@angular/common';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeSettingComponent } from './employee-setting/employee-setting.component';
import { AppFileUploadComponent } from './employee-setting/app-file-upload/app-file-upload.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TokenInterceptorInterceptor } from './interceptors/token-interceptor.interceptor';
import { NewPostComponent } from './Post/new-post/new-post.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { DeplacementComponent } from './deplacement/deplacement.component';
import { ListDeplacementComponent } from './deplacement/list-deplacement/list-deplacement.component';
import { AddDeplacementComponent } from './deplacement/add-deplacement/add-deplacement.component';
import { ListStoreComponent } from './deplacement/list-store/list-store.component';
import { AddStoreComponent } from './deplacement/add-store/add-store.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    StatistiquesComponent,
    MenuComponent,
    HeaderComponent,
    EquipementComponent,
    DetailEquipementComponent,
    Register2Component,
    PaginationComponent,
    ButtonActionComponent,
    NouvelEquipementComponent,
    MouvementStockComponent,
    DetailMouvementStockComponent,
    DetailMvstkEquipementComponent,
    CategorieComponent,
    NouvelCategoryComponent,
    EmployeesComponent,
    EmployeeSettingComponent,
    AppFileUploadComponent,
    NewPostComponent,
    CategoriesListComponent,
    DeplacementComponent,
    ListDeplacementComponent,
    AddDeplacementComponent,
    ListStoreComponent,
    AddStoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot() 
  ],
  providers: [
    {provide :HTTP_INTERCEPTORS ,
      useClass :TokenInterceptorInterceptor,
      multi : true
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
