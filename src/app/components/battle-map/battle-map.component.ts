import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditMapUnitComponent } from '../dialogs/edit-map-unit/edit-map-unit.component';
import { MapUnit } from 'src/app/models/map-unit.model';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MapService } from 'src/app/services/map.service';
import { Map } from 'src/app/models/map.model';
import { AuthService } from 'src/app/services/auth.service';
import { AvatarUploadComponent } from '../dialogs/avatar-upload/avatar-upload.component';

@Component({
  selector: 'app-battle-map',
  templateUrl: './battle-map.component.html',
  styleUrls: ['./battle-map.component.scss'],
})
export class BattleMapComponent implements OnInit {
  @ViewChild('image') image: ElementRef<HTMLImageElement>;
  map: Map = {
    units: [],
    image: ''
  };
  userId: string;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private mapService: MapService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(switchMap(params => {
      this.userId = params.userId;
      return this.mapService.getMap(this.userId);
    })).subscribe(map => {
      if (map) {
        this.map = map;
        this.map.units = this.map.units.sort((a, b) => {
          return b.initiative - a.initiative;
        });
      }
    });
  }

  editUnit(index: number) {
    const dialogRef = this.dialog.open(EditMapUnitComponent, {
      width: '600px',
      maxWidth: '100vw',
      data: {
        unit: this.map.units[index],
        userId: this.userId,
        isOwner: this.isOwner,
      }
    });

    dialogRef.afterClosed().subscribe((unit: MapUnit) => {
      if (unit) {
        this.map.units[index] = unit;
        this.mapService.updateMap(this.userId, this.map);
      }
    });
  }

  addUnit() {
    const dialogRef = this.dialog.open(EditMapUnitComponent, {
      width: '600px',
      maxWidth: '100vw',
      data: {
        imageWidth: this.image.nativeElement.width,
        imageHeight: this.image.nativeElement.height,
        userId: this.userId,
        isOwner: this.isOwner,
      }
    });

    dialogRef.afterClosed().subscribe((unit: MapUnit) => {
      if (unit) {
        this.map.units.push(unit);
        this.mapService.updateMap(this.userId, this.map);
      }
    });
  }

  removeUnit(index: number) {
    this.map.units.splice(index, 1);
    this.mapService.updateMap(this.userId, this.map);
  }

  getHpPercentage(unit: MapUnit) {
    return unit.currentHp && unit.maxHp ? unit.currentHp / unit.maxHp * 100 : null;
  }

  dropUnit(event: CdkDragEnd, index: number) {
    let unitX = this.map.units[index].xPosition + event.distance.x;
    let unitY = this.map.units[index].yPosition + event.distance.y;

    if (unitX > this.image.nativeElement.width) {
      unitX = this.image.nativeElement.width - this.map.units[index].size;
    }
    if (unitX < 0) {
      unitX = 0;
    }

    if (unitY > this.image.nativeElement.height) {
      unitY = this.image.nativeElement.height - this.map.units[index].size;
    }
    if (unitY < 0) {
      unitY = 0;
    }

    this.map.units[index].xPosition = unitX;
    this.map.units[index].yPosition = unitY;

    event.source.reset();
    this.mapService.updateMap(this.userId, this.map);
  }

  uploadImage() {
    const dialogRef = this.dialog.open(AvatarUploadComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.mapService.uploadMap(this.userId, result);
      }
    });
  }

  getUnitStyle(unit: MapUnit) {
    return {
      top: `${unit.yPosition}px`,
      left: `${unit.xPosition}px`,
    };
  }

  getTokenStyle(unit: MapUnit) {
    return {
      width: `${unit.size}px`,
      height: `${unit.size}px`,
      'background-color': unit.color,
      'border-radius': `${unit.size}px`
    };
  }

  getLabelBackgroundColor(unit: MapUnit): string {
    const percentage = this.getHpPercentage(unit);
    if (percentage === null) {
      return 'rgba(0, 0, 0, 0.5)';
    }

    let r: number;
    let g: number;
    let b: number;

    if (percentage >= 50) {
      // От зеленого к желтому (50-100%)
      const ratio = (percentage - 50) / 50;
      r = Math.round(255 * (1 - ratio));
      g = 255;
      b = 0;
    } else {
      // От желтого к красному (0-50%)
      const ratio = percentage / 50;
      r = 255;
      g = Math.round(255 * ratio);
      b = 0;
    }

    return `rgba(${r}, ${g}, ${b}, 0.5)`;
  }

  get isOwner(): boolean {
    return this.authService.user && this.authService.user.uid === this.userId;
  }

}
