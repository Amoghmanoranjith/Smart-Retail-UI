import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { GetProductService } from 'src/app/services/product/get-product.service';
import { RegisterStoreService } from 'src/app/services/store/register-store.service';
import { ProductDTO } from 'src/app/models/dto/product-dto';
import { SensorLevel } from 'src/app/models/enum/sensor-level.enum';
import { SensorStatus } from 'src/app/models/enum/sensor-status.enum';
import { STORE_TIER_OPTIONS } from 'src/app/models/enum/store-tier.enum';
import { StoreTier } from 'src/app/models/enum/store-tier.enum';

// ── Custom validator: date must be strictly after today ──────────────────────
function futureDateValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const selected = new Date(control.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // strip time so today itself is rejected
  return selected > today ? null : { notFutureDate: true };
}

// ── Cross-field validator: sensor quantity ≤ shelf shelfCapacity ─────────────
function quantityWithinCapacityValidator(shelfGroup: AbstractControl): ValidationErrors | null {
  const capacity = shelfGroup.get('shelfCapacity')?.value ?? 0;
  const quantity = shelfGroup.get('sensor.quantity') // not available at shelf level
    ?? (shelfGroup.get('sensor') as FormGroup)?.get('quantity');
  if (quantity == null) return null;
  return quantity.value <= capacity ? null : { quantityExceedsCapacity: true };
}

@Component({
  selector: 'app-apply-store-manager',
  templateUrl: './apply-store-manager.component.html',
  styleUrls: ['./apply-store-manager.component.css']
})
export class ApplyStoreManagerComponent implements OnInit {

  storeForm: FormGroup;
  products: ProductDTO[] = [];
  sensorLevels  = Object.values(SensorLevel);
  sensorStatuses = Object.values(SensorStatus);
  readonly storeTierOptions = STORE_TIER_OPTIONS;

  // ── Hardcoded Indian cities ──────────────────────────────────────────────
  readonly cities: string[] = [
    'Mumbai',
    'Delhi',
    'Bengaluru',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Pune',
    'Ahmedabad',
    'Jaipur',
    'Surat'
  ];

  constructor(
    private fb: FormBuilder,
    private getProductService: GetProductService,
    private registerStoreService: RegisterStoreService
  ) {
    this.storeForm = this.fb.group({
      // Defaults are for faster manual testing; shelves are intentionally empty.
      storeName:       ['My Store', Validators.required],
      location:        [this.cities[0] ?? '', Validators.required],
      type:            [StoreTier.TIER_1, Validators.required],
      size:            [100, [Validators.required, Validators.min(1)]],
      numberOfAisles:  [1, [Validators.required, Validators.min(1)]],
      operatingHours:  ['9:00 AM – 10:00 PM', Validators.required],
      shelves:         this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.getProductService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products.data;
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  get shelves(): FormArray {
    return this.storeForm.get('shelves') as FormArray;
  }

  // Allow "Add Shelf" only when there are no shelves yet, or the last shelf is valid
  validateShelves(): boolean {
    if (this.shelves.length === 0) return true;
    const lastShelf = this.shelves.at(this.shelves.length - 1);
    return lastShelf.valid;
  }

  addShelf(): void {
    const shelfGroup = this.fb.group(
      {
        aisleNumber:   [1, [Validators.required, Validators.min(1)]],
        shelfSection:  ['1',   Validators.required],
        shelfCapacity: [10, [Validators.required, Validators.min(1), Validators.max(200)]],
        expiryDate:    [new Date(),   [Validators.required, futureDateValidator]],
        productId:     [1, Validators.required],
        sensor: this.fb.group({
          sensorStatus: [SensorStatus.ONLINE, Validators.required],
          sensorLevel:  [SensorLevel.MEDIUM, Validators.required],
          quantity:     [5,  [Validators.required, Validators.min(0)]]
        })
      },
      { validators: quantityWithinCapacityValidator } 
    );

    // Re-run the cross-field validator whenever shelfCapacity changes
    shelfGroup.get('shelfCapacity')?.valueChanges.subscribe(() => {
      shelfGroup.get('sensor.quantity')?.updateValueAndValidity();
      shelfGroup.updateValueAndValidity();
    });

    this.shelves.push(shelfGroup);
  }

  removeShelf(index: number): void {
    this.shelves.removeAt(index);
  }

  private formatExpiryDate(dateValue: string | Date): string {
    const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
    const isoString = date.toISOString(); // yyyy-MM-ddTHH:mm:ss.sssZ
    return isoString;
  }

  onSubmit(): void {
    if (this.shelves.length < 1) {
      this.storeForm.markAllAsTouched();
      alert('Please add at least 1 shelf before submitting.');
      return;
    }

    if (this.storeForm.valid) {
      const formValue = this.storeForm.value;
      const storeData = {
        ...formValue,
        shelves: formValue.shelves.map((shelf: any) => ({
          aisleNumber: shelf.aisleNumber,
          shelfSection: shelf.shelfSection,
          shelfCapacity: shelf.shelfCapacity,
          expiryDate: this.formatExpiryDate(shelf.expiryDate),
          productDTO: this.products.find(p => p.productId ===  shelf.productId), // convert shelf.productId to number
          sensorDTO:  shelf.sensor
        }))
      };
      console.log(storeData); //****************************************** logging
      const product = this.products.find(p => p.productId == Number(1));
      console.log(product); //****************************************** logging
      this.registerStoreService.registerStore(storeData).subscribe({
        next:  (response) => console.log('Store registered successfully:', response),
        error: (error)    => console.error('Error registering store:', error)
      });
    }
  }
}