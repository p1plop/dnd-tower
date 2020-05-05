import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./battle-map.component.scss']
})
export class BattleMapComponent implements OnInit {
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
      }
    });
  }

  editUnit(index: number) {
    const dialogRef = this.dialog.open(EditMapUnitComponent, {
      width: '600px',
      maxWidth: '100vw',
      data: this.map.units[index]
    });

    dialogRef.afterClosed().subscribe(unit => {
      if (unit) {
        this.map.units[index] = unit;
        this.mapService.updateMap(this.userId, this.map);
      }
    });
  }

  addUnit() {
    const dialogRef = this.dialog.open(EditMapUnitComponent, {
      width: '600px',
      maxWidth: '100vw'
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

  dropUnit(event: CdkDragEnd, index: number) {
    this.map.units[index].xPosition += event.distance.x;
    this.map.units[index].yPosition += event.distance.y;
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
      position: 'absolute',
      cursor: 'move',
      display: 'inline-block',
      width: `${unit.size}px`,
      height: `${unit.size}px`,
      top: `${unit.yPosition}px`,
      left: `${unit.xPosition}px`,
      'background-color': unit.color,
      'border-radius': `${unit.size}px`
    };
  }

  get isOwner(): boolean {
    return this.authService.user && this.authService.user.uid === this.userId;
  }

}
