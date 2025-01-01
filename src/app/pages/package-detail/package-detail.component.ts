import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataAccessService } from 'src/app/services/data-access.service';

@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.scss']
})
export class PackageDetailComponent implements OnInit {

  servicePackageForm: FormGroup = this.fb.group({
    name: [''],
    price: [10, Validators.required],
    description: ['', Validators.required],
    item:[''], 
    items: this.fb.array([])
  });

  servicePackage!: ServicePackages;
  serviceId: string = ''
  isLoadingData = false;
  isEdit = false;

  constructor(private fb: FormBuilder, private dataAccessService: DataAccessService, 
    private activatedRoute: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe((params: any) => {
      this.serviceId= params.service_id;
  
      this.initializeData();
      
      
    })
   
  }


  initializeData(){
    if (this.serviceId){
      this.isEdit = true;
      this.dataAccessService.getServicePackageById(this.serviceId).subscribe({
        next: (res: ServicePackages) =>{
          this.servicePackage = res;
          this.servicePackageForm = this.fb.group({
            name: [res.name, Validators.required],
            item:[''], 
            price: [parseInt(res.price), Validators.required],
            description: [res.description, Validators.required],
            items: this.fb.array(res.items.map((item) =>{
              return this.fb.control( item, Validators.required)
            }))
          });

        },
        error: (error: any) =>{
          console.error(error); 
        }
      }) 
    } else {

    }
  }


  get packageItems() {
    return this.servicePackageForm.get('items') as FormArray;
  }

  getPackageByIndex (item: any) {
    
    return item['controls']['description']
  }



  addingItems(){
    this.packageItems.push(this.fb.control(this.servicePackageForm.get('item').value));
    this.servicePackageForm.get('item').reset();

  }

  removeItem(index: number){
    this.packageItems.removeAt(index);
    
  }


  handleUpdate(){
    
    const submitValue: ServicePackages = Object.assign(this.servicePackage, this.servicePackageForm.value);
    submitValue.date_created = this.servicePackage.date_created;
    delete (submitValue as any).item;

    this.isLoadingData = true;
    this.dataAccessService.updateServicePackage(submitValue).subscribe({
      next: (res: ServicePackages) =>{
        this.initializeData();
        this.isLoadingData = false;
      },
      error: (error: any) =>{
        this.isLoadingData = false;
        console.error(error); 
      }
    });

  }

  handleCreate() {
    const data = {...this.servicePackageForm.value};
    delete data.item;
    const submitValue: ServicePackages = data;
    submitValue.business_id = 'y0T45Qeg7SWqpva7F7qO';
    submitValue.image = "test-image";
    submitValue.service_id="new";
    if (submitValue.items.length === 0) {
      return;
    } 

    this.dataAccessService.createServicePackage(submitValue).subscribe({
      next: (res: ServicePackages) =>{
        
        this.isLoadingData = false;
        this.router.navigateByUrl('service-packages')
      },
      error: (error: any) =>{
        this.isLoadingData = false;
        console.error(error); 
      }
    });
  }
}
