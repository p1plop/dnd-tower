import { MapUnit } from './map-unit.model';

export interface Map {
  image: string;

  units: MapUnit[];
}
