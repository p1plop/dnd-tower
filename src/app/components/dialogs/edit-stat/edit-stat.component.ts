import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-edit-stat',
  templateUrl: './edit-stat.component.html',
  styleUrls: ['./edit-stat.component.scss']
})
export class EditStatComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<EditStatComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: number
  ) { }

  ngOnInit(): void {
  }

  submit() {
    this.bottomSheetRef.dismiss(this.data);
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

  increment() {
    this.data++;
  }

  decrement() {
    this.data--;
  }

}
