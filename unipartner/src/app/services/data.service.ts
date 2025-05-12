import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private newMessageSubject = new BehaviorSubject<void>(undefined);
  headerAll: any;
  constructor(private http: HttpClient) {
    let token = sessionStorage.getItem('token');
    if (token !== null) {
      this.headerAll = new HttpHeaders({ Authorization: `Bearer ${token}` });
    }
  }

  // =============== Signal ===============================
  addSignal(f: any, id: any) {
    return this.http.post(
      `${environment.urlBackend}api/users/addSignal/${id}`,
      f,
      { headers: this.headerAll }
    );
  }
  updateSignal(f: any, id: any) {
    return this.http.patch(
      `${environment.urlBackend}api/users/updateSignal/${id}`,
      f
    );
  }
  deleteSignal(id: any) {
    return this.http.delete(
      `${environment.urlBackend}api/admin/deleteSignal/${id}`,
      { headers: this.headerAll }
    );
  }
  getSignalsByUserId(id: any) {
    return this.http.get(
      `${environment.urlBackend}api/admin/getSignals/${id}`,
      { headers: this.headerAll }
    );
  }
  getSignalBySignalId(id: any) {
    return this.http.get(`${environment.urlBackend}api/admin/getSignal/${id}`, {
      headers: this.headerAll,
    });
  }

  // ============== Users ================================
  getAllUsers() {
    return this.http.get(`${environment.urlBackend}api/admin/users`, {
      headers: this.headerAll,
    });
  }
  getUser(id: any) {
    return this.http.get(`${environment.urlBackend}api/admin/user/${id}`);
  }

  deleteUser(id: any) {
    return this.http.delete(`${environment.urlBackend}api/admin/user/${id}`, {
      headers: this.headerAll,
    });
  }
  // ===================== recommended users ================
  getRecommendedUsers() {
    return this.http.get(
      `${environment.urlBackend}api/users/recommendedUsers`,
      { headers: this.headerAll }
    );
  }
  // ===================== Like & Match ================
  likeUser(id: any) {
    return this.http.post(
      `${environment.urlBackend}api/users/addLike/${id}`,
      null,
      { headers: this.headerAll }
      );
    }
    
    getMatches(){
      return this.http.get(
        `${environment.urlBackend}api/users/matches`,
        {headers: this.headerAll}
        );
      }
      
  // ===================== Conversation & chat ================
  getAllConversation(){
    return this.http.get(
      `${environment.urlBackend}api/users/conversations`,
        {headers: this.headerAll}
    )
  }
  getConversationById(id:any){
    return this.http.get(
      `${environment.urlBackend}api/users/conversations/${id}`,
        {headers: this.headerAll}
    )
  }
  getNewMessageEvent() {
    return this.newMessageSubject.asObservable();
  }
  addMessage(message: any, id: any) {
    return this.http.post(
      `${environment.urlBackend}api/users/chat/addMessage/${id}`,
      message,
      { headers: this.headerAll }
    )
  }

}
