import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MapUnit } from 'src/app/models/map-unit.model';

interface DialogData {
  unit: MapUnit;

  imageWidth?: number;

  imageHeight?: number;
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

  constructor(
    public dialogRef: MatDialogRef<EditMapUnitComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      size: [24, [Validators.required, Validators.min(1)]],
      color: ['#f44336', Validators.required],
      initiative: 0,
      xPosition: 0,
      yPosition: 0
    });

    if (this.data.unit) {
      this.form.patchValue(this.data.unit);
    } else if (this.data.imageWidth && this.data.imageHeight) {
      this.form.get('xPosition').setValue(this.data.imageWidth / 2);
      this.form.get('yPosition').setValue(this.data.imageHeight / 2);
    }
  }

  selectColor(color: string) {
    this.color.setValue(color);
  }

  formSubmit() {
    const value = this.form.value;
    if (!value.initiative || !Number.isInteger(value.initiative)) {
      value.initiative = 0;
    }
    this.dialogRef.close(this.form.value);
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

}
