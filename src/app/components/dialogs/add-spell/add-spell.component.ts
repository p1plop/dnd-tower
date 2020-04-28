import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Spell } from 'src/app/models/spell.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

interface DialogData {
  spells: Spell[];
  characterSpells: Spell[];
}

@Component({
  selector: 'app-add-spell',
  templateUrl: './add-spell.component.html',
  styleUrls: ['./add-spell.component.scss']
})
export class AddSpellComponent implements OnInit {
  spells: Spell[];
  selection = new SelectionModel<Spell>(true, []);
  displayedColumns: string[] = ['select', 'name'];
  dataSource: MatTableDataSource<Spell>;

  constructor(
    public dialogRef: MatDialogRef<AddSpellComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.spells = this.data.spells.filter(spell => {
      return !this.data.characterSpells.some(item => item.id === spell.id);
    });

    this.dataSource = new MatTableDataSource<Spell>(this.spells);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (spell, filter) => {
      return spell.nameRu.trim().toLowerCase().includes(filter) ||
             spell.nameEng.trim().toLowerCase().includes(filter);
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

}
