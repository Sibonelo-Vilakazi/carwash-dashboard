import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { UserRoles } from 'src/app/enums/UserRoles.enum';
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
    this.authService.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
    .then(async (res) => {
      const tokenResult = await res.user.getIdTokenResult();
      
      const claims = tokenResult.claims; // later I will be using the claims

      this.authService.$currentUser.subscribe((result ) => {
        if(result){
          this.dataAccessService.getUser(result.uid).subscribe( {
            next: (res: AdminUser) => {
             
              // if(res.role !== UserRoles.ADMIN){
              //   this.toastrService.error('Unauthorized user');
              //   return;
              // }
              this.authService.setUserFromLocalStorage(res);
              this.authService.setAccessToken(tokenResult.token);
              this.router.navigateByUrl('dashboard');
              
            },
            error: (error: any) =>{
              console.error(error);
              //this.toastrService.error(error.message);
            }
          })
        }
        
      })
      
    })
    .catch((err) => {
      console.error(err)
    })
  }
}
