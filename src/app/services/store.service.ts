import { trigger } from '@angular/animations';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private fullName$  = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  private matricule$ = new BehaviorSubject<string>("");
  constructor() { }
  public getRoleFromStore(){
    return this.role$.asObservable();
  }
  public getFullNameFromStore(){
    return this.fullName$.asObservable();
  }
  public setRoleFromStore(role :string){
    return this.role$.next(role);
  }
  public setFullNameFromStore(FullName :string){
    return this.fullName$.next(FullName);
  }
  public getMatriculeFromStore(){
    return this.matricule$.asObservable();
  }
  public setMatriculeFromStore(matricule :string){
    return this.matricule$.next(matricule);
  }
  
}
