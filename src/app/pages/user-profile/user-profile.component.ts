import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BusinessDto } from 'src/app/interfaces/models/Business';
import { AuthService } from 'src/app/services/auth.service';
import { DataAccessService } from 'src/app/services/data-access.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  businessForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    owner: this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.pattern(/^[0-9]{10,15}$/)]
    }),
    logo_url: ['', Validators.pattern(/^(http|https):\/\/[^ "]+$/)],
    description: ['', Validators.maxLength(500)],
    super_admin: [''],
    admins: ['']
  });

  isSubmitting: boolean = false;
  isEdit: boolean = false;
  
  constructor(private fb: FormBuilder, private dataAccessService: DataAccessService,
    private authService: AuthService, private toasterService: ToastrService
  ) { }

  ngOnInit() {
    
  }


  onSubmit(): void {
    const user_id: string = this.authService.getUserFromLocalStorage().data.user_id;
    if (this.businessForm.invalid) {
      this.markFormGroupTouched(this.businessForm);
      return;
    }

    this.isSubmitting = true;
    const businessData: BusinessDto = {...this.businessForm.value, super_admin: user_id, admins: []} as BusinessDto;
    
    // Here you would typically call your service to save the data
    console.log('Submitting business data:', businessData);
    
    this.dataAccessService.createBusinessProfile(businessData).subscribe({
      next: (res: any) =>{
        this.toasterService.success('You have successfully create a business');
        this.isSubmitting = false;
      },
      error: (err) =>{
        this.toasterService.error(err.message);
        this.isSubmitting = false;
      }
    })
    // Reset form after submission if needed
    // this.businessForm.reset();
  
  }

  handleUpdate() {

  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
