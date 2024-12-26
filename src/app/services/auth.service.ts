import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AdminUser } from '../interfaces/models/admin-user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $currentUser = this.auth.user;
  USER= 'USER';
  TOKEN = 'TOKEN';
  constructor(private auth: AngularFireAuth) { }

  async signInWithEmailAndPassword (email: string, password: string) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  } 

  async loggingOut() {
    await this.auth.signOut();
    localStorage.clear();
  }


  getUserFromLocalStorage () {
    return JSON.parse(localStorage.getItem(this.USER))
  }

  setUserFromLocalStorage (user: AdminUser) {
    localStorage.setItem(this.USER, JSON.stringify(user));

  }

}
