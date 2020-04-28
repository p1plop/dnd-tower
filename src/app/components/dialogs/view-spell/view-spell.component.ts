import { Component, OnInit, Inject } from '@angular/core';
import { Spell } from 'src/app/models/spell.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Character } from 'src/app/models/character.model';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { first } from 'rxjs/operators';

interface DialogData {
  viewedSpell: Spell;
  character: Character;
}

@Component({
  selector: 'app-view-spell',
  templateUrl: './view-spell.component.html',
  styleUrls: ['./view-spell.component.scss']
})
export class ViewSpellComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ViewSpellComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

  displayClasses(classes: string[]): string {
    return classes.join(', ');
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Подтверждение удаления',
        message: 'Вы уверены, что хотите удалить это заклинание из списка персонажа?',
        cancel: 'Отмена',
        confirm: 'Удалить'
      }
    });

    dialogRef.afterClosed().pipe(first()).subscribe(result => {
      if (result) {
        const index = this.data.character.spellsIds.indexOf(this.data.viewedSpell.id);
        this.data.character.spellsIds.splice(index, 1);

        this.dialogRef.close(this.data.character);
      }
    });
  }

}
