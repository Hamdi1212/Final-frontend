import { Injectable } from '@angular/core';
import{HttpClient} from "@angular/common/http" 
import { Observable, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "https://localhost:44319/Home/";
  private Payload :any;
  private ActionUrl:string = "https://localhost:44319/api/Action/";
  private TransactionUrl:string="https://localhost:44319/Transaction/";
  private CategorieUrl : string ="https://localhost:44319/api/Categories/categories";
  private EmployeeUrl : string ="https://localhost:44319/api/Users";
  constructor(private http : HttpClient) {
    this.Payload = this.decodeToken();
   }

   logout() {
    localStorage.clear(); // or remove only the token and username if you want
  }
  
  PostAction(equipementobj : any){
    return this.http.post<any>(`${this.ActionUrl}data`,equipementobj)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getAction():Observable<any>{
    return this.http.get<any>(`${this.ActionUrl}get_all_equipement`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteEquipement(serialNumber:string):Observable<any>{
    return this.http.delete<any>(this.ActionUrl+'delet_equipement/'+serialNumber)
    .pipe(map((res : any) =>
    {
      return res;
    }))
  }
  updateEquipement(equipementobj : any):Observable<any>{
    return this.http.put<any>(this.ActionUrl+'update_equipement',equipementobj)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getTransaction():Observable<any>{
    return this.http.get<any>(`${this.TransactionUrl}Get_transactions`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getEquipementByCategoryCode(code : string){
    return this.http.get<any>(this.ActionUrl+'equipement/category/'+code)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  insertEquipement(equipementObj:any[]):Observable<any>{
    return this.http.post<any>(this.ActionUrl+'equipementList',equipementObj)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getStat():Observable<any>{
    return this.http.get<any>(this.EmployeeUrl+'/Stat')
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getStat1():Observable<any>{
    return this.http.get<any>(this.EmployeeUrl+'/Stat1')
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getStat2():Observable<any>{
    return this.http.get<any>(this.EmployeeUrl+'/Stat2')
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  AddCategory(category : any)
  {
    return this.http.post<any>(this.CategorieUrl,category)
  }
  getCategory():Observable<any>
  {
    return this.http.get<any>(this.CategorieUrl)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getUsers():Observable<any>{
    return this.http.get<any>(this.EmployeeUrl+'/Users')
    .pipe(map((res:any)=>{
      return res;
    }))
  }


  register(userObj:any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj)
  }
  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}login`,loginObj)
  } 

  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue);
  }

  isLoggedIn():boolean{
   return !! this.getToken()
  }

  getToken(){
    return localStorage.getItem('token');

  }

  decodeToken(){
   const jwtHelper = new JwtHelperService();
   const token = this.getToken()!;
   return jwtHelper.decodeToken(token)
  }
  getFullNameFromToken(){
    if(this.Payload){
      return this.Payload.name;

    }
  }
  getRoleFromToken(){
    if(this.Payload){
      return this.Payload.role;
    }
  }
  getAdminEmployee(){
    return this.http.get<any>(this.EmployeeUrl+'/Admin')
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteAdminEmployee(matricule:string){
    return this.http.delete<any>(this.EmployeeUrl+'/Admin/'+matricule)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  // createUser()
}


