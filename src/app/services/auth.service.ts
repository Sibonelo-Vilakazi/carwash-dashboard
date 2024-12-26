import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AdminUser } from '../interfaces/models/admin-user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $currentUser = this.auth.user;
  USER= 'USER';
  TOKEN = 'TOKEN';
  accessToken = 'ACCESS_TOKEN'
  constructor(private auth: AngularFireAuth, private router: Router) { }

  async signInWithEmailAndPassword (email: string, password: string) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  } 

  async loggingOut() {
    await this.auth.signOut();
    this.router.navigate(['/login']);
    localStorage.clear();
  }


  getUserFromLocalStorage () {
    return JSON.parse(localStorage.getItem(this.USER))
  }

  setUserFromLocalStorage (user: AdminUser) {
    localStorage.setItem(this.USER, JSON.stringify(user));

  }

  setAccessToken (token: string) {
    localStorage.setItem(this.accessToken, token);

  }

  getAccessToken () {
    return localStorage.getItem(this.TOKEN);
  }
}
