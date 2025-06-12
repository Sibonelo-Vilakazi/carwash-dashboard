import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPackCardComponent } from './subscription-pack-card.component';

describe('SubscriptionPackCardComponent', () => {
  let component: SubscriptionPackCardComponent;
  let fixture: ComponentFixture<SubscriptionPackCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionPackCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionPackCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
