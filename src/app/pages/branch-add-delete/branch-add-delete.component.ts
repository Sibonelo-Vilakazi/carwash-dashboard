import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Branch } from 'src/app/interfaces/models/Branch';
import { CreateBranch } from 'src/app/interfaces/models/create-branch.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DataAccessService } from 'src/app/services/data-access.service';

@Component({
  selector: 'app-branch-add-delete',
  templateUrl: './branch-add-delete.component.html',
  styleUrls: ['./branch-add-delete.component.scss']
})
export class BranchAddDeleteComponent implements OnInit {

  // branchForm = new FormGroup({
  //   name: new FormControl('', [Validators.required]),
  //   location: new FormControl('', [Validators.required]),
  //   startTime: new FormControl('', [Validators.required]),
  //   endTime: new FormControl('', [Validators.required]),
  // });
  servicePackages: ServicePackages[] = [];
  isEdit: boolean = false;
  userId: string = '';
  branchId: string = '';
  daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  branchForm = this.fb.group<any>({
    name: ['', Validators.required],
    location: ['', Validators.required],
    lat: [''],
    long: [''],
    userId: [''],
    employees: this.fb.array([]),
    id: [''],
    users: this.fb.array([]),
    operating_hours: this.createOperatingHoursGroup(),
    services: this.fb.array([]),
    created_date: [new Date()],
    status: [true],
    businessId: ['']
  });
  businessId: string = '';

  constructor(private dataAccessService: DataAccessService, private router: Router, 
    private toastrService: ToastrService, private authService: AuthService, private activatedRoute: ActivatedRoute,
  private fb: FormBuilder) { }

  ngOnInit(): void {
    
    this.userId = this.authService.getUserFromLocalStorage().data.user_id;
    this.businessId = this.authService.getUserFromLocalStorage().data.businessId;

    this.dataAccessService.getServicePackagesByBusinessId(this.businessId ?? '').subscribe({
      next: (res) => {
        this.servicePackages = res;
      },
      error: (err) =>{
        console.error(err);
      }
    })
    this.activatedRoute.params.subscribe({
      next: (param: any) =>{
        this.isEdit = false;
        if(param.branchId){
          
          this.branchId = param.branchId;
          this.dataAccessService.getBranchById(this.branchId).subscribe({
            next: (res: Branch) => {
              
              const branch = res as Branch;
              this.branchForm = this.fb.group<any>({
                name: [branch.name, Validators.required],
                location: [branch.location, Validators.required],
                lat: [branch.lat ?? ''],
                long: [branch.long ?? ''],
                userId: [branch.userId ?? ''],
                employees: this.fb.array([]),
                id: [this.branchId],
                users: this.fb.array([]),
                operating_hours: this.createOperatingHoursGroup(),
                services: this.fb.array([]),
                created_date: [new Date()],
                status: [true],
                businessId: [branch.businessId]
              });

              const servicesArray = this.branchForm.get('services') as FormArray;

              res?.services?.map((service: ServicePackages) => 
                (this.branchForm.get('services') as FormArray).push(this.fb.group({
                  service_id: [service.service_id, Validators.required]
                }))
              );
              
              console.log('res: ', this.branchForm.value);
              this.isEdit = true;
            },
            error: (err: any) =>{
              this.isEdit = false;
              console.error(err);
            }
          })
        }else{
          this.isEdit = false;
        }
      }
    })

  }

  createOperatingHoursGroup(): FormGroup {
    return this.fb.group({
      monday: this.createDailyTimeGroup(),
      tuesday: this.createDailyTimeGroup(),
      wednesday: this.createDailyTimeGroup(),
      thursday: this.createDailyTimeGroup(),
      friday: this.createDailyTimeGroup(),
      saturday: this.createDailyTimeGroup(),
      sunday: this.createDailyTimeGroup()
    });
  }

  createDailyTimeGroup(): FormGroup {
    return this.fb.group({
      isOpen: [true],
      openTime: ['09:00'],
      closeTime: ['17:00']
    });
  }

  selectedPackage($event: any, service: ServicePackages){
    if($event.target.checked){
      const servicesArray = this.branchForm.get('services') as FormArray;
      servicesArray.push(this.fb.group({
        service_id: [service.service_id, Validators.required]
      }));
    } else {
      const servicesArray = this.branchForm.get('services') as FormArray;
      const index = servicesArray.controls.findIndex(x => x.get('service_id').value === service.service_id);
      servicesArray.removeAt(index);
    }
  }

  getChecked(id: string){
    const serviceArray = (this.branchForm.get('services') as FormArray);
    console.log('serviceArray.value.findIndex(x => x.service_id === id): ', id);
    return (serviceArray).controls.findIndex((x: any) => x.get('service_id') === id) >= 0;
  }


  handleUpdate() {
    const branch: Branch = this.branchForm.value as unknown as Branch;

    branch.services = branch.services.map((service) => {
      return this.servicePackages.find((item) => item.service_id ===service.service_id);
    });

    this.dataAccessService.createBranches(branch as any).subscribe({
      next: (res: any) =>{
        this.toastrService.success('You have successfully updated a branch');
        this.router.navigateByUrl('branches');
      },
      error: (err: any) =>{
        this.toastrService.error('Something went wrong when trying to create a branch');
        console.error(err);
      }
    })
  }

  handleCreate(){
    if (this.branchForm.invalid){
      return;
    }
    const data = this.branchForm.value as unknown as Branch;
    data.userId = this.userId;
    data.users =[this.userId];
    data.businessId = this.businessId;
    this.dataAccessService.createBranches(data as any).subscribe({
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
