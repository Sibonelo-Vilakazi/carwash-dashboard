import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateBranch } from 'src/app/interfaces/models/create-branch.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DataAccessService } from 'src/app/services/data-access.service';

@Component({
  selector: 'app-branch-add-delete',
  templateUrl: './branch-add-delete.component.html',
  styleUrls: ['./branch-add-delete.component.scss']
})
export class BranchAddDeleteComponent implements OnInit {

  branchForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    startTime: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required]),
  });
  servicePackages: ServicePackages[] = [];
  isEdit: boolean = false;
  userId: string = '';
  constructor(private dataAccessService: DataAccessService, private router: Router, 
    private toastrService: ToastrService, private authService: AuthService) { }

  ngOnInit(): void {
    console.log('user: ', this.authService.getUserFromLocalStorage());
    this.userId = this.authService.getUserFromLocalStorage().data.user_id;
  }

  handleUpdate() {

  }

  handleCreate(){
    if (this.branchForm.invalid){
      return;
    }
    const data = this.branchForm.value as CreateBranch;
    data.userId = this.userId;
    data.users =[this.userId];
    this.dataAccessService.createBranches(data).subscribe({
      next: (res: any) =>{
       
        this.toastrService.success('You have successfully create a branch');
        this.router.navigateByUrl('branches');
      },
      error: (err: any) =>{
        this.toastrService.error('Something went wrong when trying to create a branch');
        console.error(err);
      }
    })
  }

}
