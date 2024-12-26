import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { AdminUser } from 'src/app/interfaces/models/admin-user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DataAccessService } from 'src/app/services/data-access.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  toastrService = inject(ToastrService);
  constructor(private fb: FormBuilder, private authService: AuthService, 
    private dataAccessService : DataAccessService, private router: Router) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }
  
  handleSignIn() {
    console.log(this.loginForm.value);
    this.authService.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
    .then(async (res) => {
      const tokenResult = await res.user.getIdTokenResult();
      const claims = tokenResult.claims; // later I will be using the claims

      this.authService.$currentUser.subscribe((result ) => {
        this.dataAccessService.getUser(result.uid).subscribe( {
          next: (res: AdminUser) => {
            this.authService.setUserFromLocalStorage(res);
            this.router.navigateByUrl('');
            
          },
          error: (error: any) =>{
            console.error(error);
            this.toastrService.error(error.message);
          }
        })
      })
      
    })
    .catch((err) => {
      console.error(err)
    })
  }
}
