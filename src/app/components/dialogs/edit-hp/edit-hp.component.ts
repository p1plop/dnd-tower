import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

interface DialogData {
  maxHp: number;
  currentHp: number;
  temporaryHp: number;
}

@Component({
  selector: 'app-edit-hp',
  templateUrl: './edit-hp.component.html',
  styleUrls: ['./edit-hp.component.scss']
})
export class EditHpComponent implements OnInit {
  form: FormGroup;
  newCurrent = this.data.currentHp;
  newTemporary = this.data.temporaryHp;

  constructor(
    public bottomSheetRef: MatBottomSheetRef<EditHpComponent>,
    private fb: FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      healing: 0,
      damage: 0,
      maxHp: this.data.maxHp,
      temporaryHp: this.data.temporaryHp
    });

    this.healing.valueChanges.subscribe(() => {
      this.damage.setValue(0, {emitEvent: false});
    });

    this.damage.valueChanges.subscribe(() => {
      this.healing.setValue(0, {emitEvent: false});
    });

    this.form.valueChanges.subscribe(form => {
      const modifiedDamage = form.temporaryHp && form.damage
        ? form.damage - form.temporaryHp
        : form.damage;

      this.newTemporary = (form.temporaryHp - form.damage) >= 0
        ? form.temporaryHp - form.damage
        : 0;

      this.newCurrent = this.data.currentHp + form.healing - modifiedDamage;
      if (this.newCurrent < 0) {
        this.newCurrent = 0;
      }
      if (this.newCurrent > form.maxHp) {
        this.newCurrent = form.maxHp;
      }
    });
  }

  formSubmit() {
    const form = this.form.value;
    const result = {
      maxHp: form.maxHp > 0 ? form.maxHp : 0,
      currentHp: this.newCurrent,
      temporaryHp: this.newTemporary
    };
    this.bottomSheetRef.dismiss(result);
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

  increaceHeal() {
    this.healing.setValue(this.healing.value + 1);
  }

  increaceDamage() {
    this.damage.setValue(this.damage.value + 1);
  }

  get temporaryHp(): FormControl {
    return this.form.get('temporaryHp') as FormControl;
  }

  get maxHp(): FormControl {
    return this.form.get('maxHp') as FormControl;
  }

  get healing(): FormControl {
    return this.form.get('healing') as FormControl;
  }

  get damage(): FormControl {
    return this.form.get('damage') as FormControl;
  }

  private calculateChanges() {

  }

}
