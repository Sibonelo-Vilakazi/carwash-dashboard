import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserRoles } from 'src/app/enums/UserRoles.enum';
import { BusinessDto } from 'src/app/interfaces/models/Business';
import { AdminUser } from 'src/app/interfaces/models/admin-user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DataAccessService } from 'src/app/services/data-access.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    displayName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', Validators.email],
    role: [UserRoles.SUPER_ADMIN],
    is_active: [true],
    location: ['']
  });
  constructor(private fb: FormBuilder, private dataAccessService: DataAccessService,
    private authService: AuthService, private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
  }

  handleRegister() {
    this.dataAccessService.createSuperAdmin(this.registerForm.value as AdminUser).subscribe({
      next: (res: any) => {
        const user_id = res.user_id;
        this.createBusiness(user_id);
      }, 
      error: (err: any) => {
        console.error(err);
      }
    });
    
  }

  createBusiness(user_id: string) {
    const business: BusinessDto = {
      name: this.registerForm.get('displayName').value,
      owner: {
        email: this.registerForm.get('email').value,
        name: this.registerForm.get('displayName').value,
        phone: this.registerForm.get('phoneNumber').value
      },
      logo_url: '',
      description: '',
      super_admin: user_id,
      admins: []
    }
    this.dataAccessService.createBusinessProfile(business).subscribe({
      next: () => {
        this.handleSignIn();
        this.toastrService.success('You have successfully registered your business');
      },
      error: (err) =>{
        console.error(err)
        this.toastrService.error('Failed to create business in after registeration');
      }
    })
  }


  handleSignIn() {
    this.authService.signInWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password)
    .then(async (res) => {
      const tokenResult = await res.user.getIdTokenResult();
      
      const claims = tokenResult.claims; // later I will be using the claims

      this.authService.$currentUser.subscribe((result ) => {
        if(result){
          this.dataAccessService.getUser(result.uid).subscribe( {
            next: (res: AdminUser) => {
              this.authService.setUserFromLocalStorage(res);
              this.authService.setAccessToken(tokenResult.token);
              this.router.navigateByUrl('dashboard');
              
            },
            error: (error: any) =>{
              console.error(error);
              this.toastrService.error('Failed to sign user in after registeration');
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
