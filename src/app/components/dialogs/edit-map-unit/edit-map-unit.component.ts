import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MapUnit } from 'src/app/models/map-unit.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MapService } from 'src/app/services/map.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';

interface DialogData {
  unit: MapUnit;
  imageWidth?: number;
  imageHeight?: number;
  userId: string;
}

interface SavedImage {
  url: string;
  id: string;
}

@Component({
  selector: 'app-edit-map-unit',
  templateUrl: './edit-map-unit.component.html',
  styleUrls: ['./edit-map-unit.component.scss']
})
export class EditMapUnitComponent implements OnInit {
  form: FormGroup;
  colors: string[] = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#795548',
    '#9e9e9e',
    '#607d8b'
  ];
  image: File;
  imagePreview: string;
  savedImages: SavedImage[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditMapUnitComponent>,
    private fb: FormBuilder,
    private afStorage: AngularFireStorage,
    private mapService: MapService,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private afs: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      size: [24, [Validators.required, Validators.min(1)]],
      color: ['#f44336', Validators.required],
      initiative: 0,
      xPosition: 0,
      yPosition: 0,
      imagePath: ['']
    });

    if (this.data.unit) {
      this.form.patchValue(this.data.unit);
      if (this.data.unit.imagePath) {
        this.imagePreview = this.data.unit.imagePath;
      }
    } else if (this.data.imageWidth && this.data.imageHeight) {
      this.form.get('xPosition').setValue(this.data.imageWidth / 2);
      this.form.get('yPosition').setValue(this.data.imageHeight / 2);
    }

    this.loadSavedImages();
  }

  loadSavedImages() {
    this.mapService.getUnitImages(this.data.userId).subscribe(images => {
      this.savedImages = images.map(img => ({
        url: img.url,
        id: img.id
      }));
    });
  }

  selectColor(color: string) {
    this.color.setValue(color);
  }

  formSubmit() {
    const value = this.form.value;
    if (!value.initiative || !Number.isInteger(value.initiative)) {
      value.initiative = 0;
    }

    if (this.image) {
      const imagePath = `users/${this.data.userId}/map-units/${Date.now()}`;
      const refUrl = `gs://dnd-tower.appspot.com/${imagePath}`;

      from(this.afStorage.upload(imagePath, this.image)).pipe(
        switchMap(() => {
          return from(this.afStorage.storage.refFromURL(refUrl).getDownloadURL());
        })
      ).subscribe(url => {
        value.imagePath = url;
        this.afs.collection(`users/${this.data.userId}/map-units`).add({
          url: url,
          timestamp: Date.now()
        });
        this.dialogRef.close(value);
      });
    } else {
      this.dialogRef.close(value);
    }
  }

  decreaceInitiative() {
    this.initiative.setValue(this.initiative.value - 1);
  }

  increaceInitiative() {
    this.initiative.setValue(this.initiative.value + 1);
  }

  get color(): FormControl {
    return this.form.get('color') as FormControl;
  }

  get initiative(): FormControl {
    return this.form.get('initiative') as FormControl;
  }

  onFileChanged(event) {
    this.image = event.target.files[0];
    if (this.image) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(this.image);
    }
  }

  deleteImage() {
    this.image = null;
    this.imagePreview = null;
    this.form.get('imagePath').setValue('');
  }

  selectSavedImage(image: SavedImage) {
    this.imagePreview = image.url;
    this.form.get('imagePath').setValue(image.url);
  }

  deleteSavedImage(image: SavedImage, event: Event) {
    event.stopPropagation();
    this.mapService.deleteUnitImage(this.data.userId, image.url, image.id).then(() => {
      this.savedImages = this.savedImages.filter(img => img.id !== image.id);
      if (this.imagePreview === image.url) {
        this.imagePreview = null;
        this.form.get('imagePath').setValue('');
      }
      this.snackbar.open('Изображение удалено', null, { duration: 2000 });
    }).catch(error => {
      this.snackbar.open('Ошибка при удалении изображения', null, { duration: 2000 });
    });
  }
}
