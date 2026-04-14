import { SensorStatus } from '../enum/sensor-status.enum';
import { SensorLevel } from '../enum/sensor-level.enum';
import { ProductDTO } from './product-dto';

export interface SensorDTO {
    sensorId: number;
    sensorStatus: SensorStatus;
    sensorLevel: SensorLevel;
    productExpiryDate: Date;
    quantity: number;
    capacity: number;
    productDTO: ProductDTO;
}