import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { Spell } from 'src/app/models/spell.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {ViewSpellComponent} from '../view-spell/view-spell.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {fromEvent, Observable} from 'rxjs';
import {map, startWith, takeUntil, throttleTime} from 'rxjs/operators';
import {AbstractDestroySubject} from "../../../helpers/abstract-destroy-subject";
import {IFilterModel} from "./models/filter-model.interface";

interface DialogData {
  spells: Spell[];
  characterSpells: Spell[];
}

const fullColumnsSet: string[] = ['select', 'name', 'school', 'classes', 'source', 'actions'];
const minimumColumnsSet: string[] = ['select', 'name', 'actions'];

@Component({
  selector: 'app-add-spell',
  templateUrl: './add-spell.component.html',
  styleUrls: ['./add-spell.component.scss']
})
export class AddSpellComponent extends AbstractDestroySubject implements OnInit {
  spells: Spell[];
  sources: string[];
  selection = new SelectionModel<Spell>(true, []);
  displayedColumns: string[] = fullColumnsSet;
  dataSource: MatTableDataSource<Spell>;
  filterForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddSpellComponent>,
    private dialog: MatDialog,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    super();
  }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    const checkScreenSize = () => document.body.offsetWidth < 1024;
    const screenSizeChanged$ = fromEvent(window, 'resize').pipe(
      throttleTime(500),
      map(checkScreenSize)
    );
    screenSizeChanged$.pipe(
      startWith(checkScreenSize()),
      takeUntil(this.onDestroy$)
    ).subscribe((res: boolean) => {
      if (res) {
        this.displayedColumns = minimumColumnsSet;
      } else {
        this.displayedColumns = fullColumnsSet;
      }
    });

    this.spells = this.data.spells.filter(spell => {
      return !this.data.characterSpells.some(item => item.id === spell.id);
    });

    this.sources = this.spells
      .map((spell: Spell) => spell.source)
      .filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);

    this.filterForm = this.fb.group({
      searchString: [''],
      source: ['all']
    });

    this.filterForm.valueChanges.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((filterValue: IFilterModel) => {
      filterValue.searchString = filterValue.searchString.trim().toLowerCase();
      this.dataSource.filter = JSON.stringify(filterValue);
    });

    this.dataSource = new MatTableDataSource<Spell>(this.spells);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (spell: Spell, filter: string) => {
      const filterValue: IFilterModel = JSON.parse(filter);
      if (filterValue.source !== 'all' && spell.source !== filterValue.source) {
        return false;
      }
      return spell.nameRu.trim().toLowerCase().includes(filterValue.searchString) ||
             spell.nameEng.trim().toLowerCase().includes(filterValue.searchString);
    };
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

  viewSpell(spell: Spell) {
    this.dialog.open(ViewSpellComponent, {
      maxWidth: '600px',
      data: {
        viewedSpell: spell,
      }
    });
  }

}
