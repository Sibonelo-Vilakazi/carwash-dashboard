import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchAddDeleteComponent } from './branch-add-delete.component';

describe('BranchAddDeleteComponent', () => {
  let component: BranchAddDeleteComponent;
  let fixture: ComponentFixture<BranchAddDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchAddDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchAddDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
