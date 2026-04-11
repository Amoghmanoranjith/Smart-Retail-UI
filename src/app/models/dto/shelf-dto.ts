import { ProductDTO } from './product-dto';
import { SensorDTO } from './sensor-dto';

export interface ShelfDTO {
    shelfId: number;
    aisleNumber: number;
    shelfSection: string;
    shelfCapacity: number;
    expiryDate: Date;
    productDTO: ProductDTO;
    sensorDTO: SensorDTO;
}