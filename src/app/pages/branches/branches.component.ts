import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateBranch } from 'src/app/interfaces/models/create-branch.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DataAccessService } from 'src/app/services/data-access.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {

  progressStats = true;
  branches: CreateBranch[] = [];
  constructor(private router: Router, private dataAccessService: DataAccessService, 
    private toastrService: ToastrService, private authService: AuthService) { }

  ngOnInit(): void {
    const businessId = this.authService.getUserFromLocalStorage().data.businessId;
    this.getBranches(businessId);
  } 

  getBranches(businessId: string) {
    this.dataAccessService.getBranchesByBusinessId(businessId).subscribe({
      next: (res: CreateBranch[]) => {
        this.branches = res;
      },
      error: (err) => {
        this.toastrService.error('Something went wrong while retreiving record');
      }
    })
  }

  handleAddBranch() {
    // Open a modal/form to add a new branch
    this.router.navigateByUrl('branch/create');
  }
  
  handleEditBranch(branchId: number) {
    // Edit logic

    this.router.navigateByUrl(`branch/edit/${branchId}`);

  }
  
  handleDeleteBranch(branchId: number) {
    // Delete logic
  }

}
