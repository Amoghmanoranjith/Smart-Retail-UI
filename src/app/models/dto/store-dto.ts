import { ShelfDTO } from './shelf-dto';

export interface StoreDTO {
    storeId: number;
    storeName: string;
    location: string;
    type: string;
    size: number;
    numberOfAisles: number;
    operatingHours: string;
    shelves: ShelfDTO[];
}