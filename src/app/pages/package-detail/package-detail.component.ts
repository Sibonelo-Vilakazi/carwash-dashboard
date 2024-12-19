import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    items: this.fb.array([])
  });


  constructor(private fb: FormBuilder, private dataAccessService: DataAccessService, 
    private activatedRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      const service_id = params.service_id;
      console.log(service_id)
      if (service_id){
        this.dataAccessService.getServicePackageById(service_id).subscribe({
          next: (res: ServicePackages) =>{
            this.servicePackageForm = this.fb.group({
              name: [res.name],
              price: [parseInt(res.price), Validators.required],
              description: [res.description, Validators.required],
              items: this.fb.array(res.items.map((item) =>{
                return [item]
              }))
            });
          },
          error: (error: any) =>{
            console.error(error); 
          }
        }) 
      }
    })
   
  }

}
