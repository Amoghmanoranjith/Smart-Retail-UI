import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyStoreManagerComponent } from './apply-store-manager.component';

describe('ApplyStoreManagerComponent', () => {
  let component: ApplyStoreManagerComponent;
  let fixture: ComponentFixture<ApplyStoreManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyStoreManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyStoreManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
