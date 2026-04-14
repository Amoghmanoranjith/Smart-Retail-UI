import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreDTO } from 'src/app/models/dto/store-dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  dashboardForm: FormGroup;

  readonly quickActions: string[] = [
    'Store Profile',
    'Store Layout & Sensors',
    'Real-Time Stock Levels',
    'Sales Trend Predictions',
    'Auto-Reorder Management',
    'Expiry Date Tracker',
    'Inventory Analytics',
    'Notification Centre',
    'Issue Reporting'
  ];

  private storeData: StoreDTO = {
    storeId: 101,
    storeName: 'SmartRetail Downtown',
    location: 'Downtown Ave, New York',
    type: 'Supermarket',
    size: 3500,
    numberOfAisles: 18,
    operatingHours: '08:00 - 22:00',
    shelves: []
  };

  constructor(private readonly fb: FormBuilder) {
    this.dashboardForm = this.fb.group({
      store: this.fb.group({
        storeName: [this.storeData.storeName, Validators.required],
        location: [this.storeData.location, Validators.required],
        type: [this.storeData.type, Validators.required],
        size: [this.storeData.size, [Validators.required, Validators.min(1)]],
        numberOfAisles: [this.storeData.numberOfAisles, [Validators.required, Validators.min(1)]],
        operatingHours: [this.storeData.operatingHours, Validators.required]
      })
    });
  }

  onUpdateProfile(): void {
    if (this.dashboardForm.invalid) {
      this.dashboardForm.markAllAsTouched();
      return;
    }

    const formValue = this.dashboardForm.value;
    this.storeData = {
      ...this.storeData,
      storeName: formValue.store.storeName,
      location: formValue.store.location,
      type: formValue.store.type,
      size: Number(formValue.store.size),
      numberOfAisles: Number(formValue.store.numberOfAisles),
      operatingHours: formValue.store.operatingHours
    };

    // Replace with API call once backend profile endpoints are ready.
    console.log('Updated store:', this.storeData);
  }

}
