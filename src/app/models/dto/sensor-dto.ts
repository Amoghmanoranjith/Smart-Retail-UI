import { SensorStatus } from '../enum/sensor-status.enum';
import { SensorLevel } from '../enum/sensor-level.enum';

export interface SensorDTO {
    sensorId: number;
    sensorStatus: SensorStatus;
    sensorLevel: SensorLevel;
    quantity: number;
}