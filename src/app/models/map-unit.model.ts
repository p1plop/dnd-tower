export interface MapUnit {
  name: string;

  size: number;

  color: string;

  initiative: number;

  xPosition: number;

  yPosition: number;

  imagePath?: string;

  maxHp: number;

  currentHp: number;
}
