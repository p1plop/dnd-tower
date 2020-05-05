import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MapUnit } from 'src/app/models/map-unit.model';

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
    @Inject(MAT_DIALOG_DATA) public unit: MapUnit
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      size: [24, [Validators.required, Validators.min(1)]],
      color: ['#f44336', Validators.required],
      xPosition: 0,
      yPosition: 0
    });

    if (this.unit) {
      this.form.patchValue(this.unit);
    }
  }

  selectColor(color: string) {
    this.color.setValue(color);
  }

  formSubmit() {
    this.dialogRef.close(this.form.value);
  }

  get color(): FormControl {
    return this.form.get('color') as FormControl;
  }

}
