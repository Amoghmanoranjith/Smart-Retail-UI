import { SensorDTO } from './sensor-dto';

export interface ShelfDTO {
    shelfId: number;
    aisleNumber: number;
    shelfSection: string;
    sensorDTO: SensorDTO;
}