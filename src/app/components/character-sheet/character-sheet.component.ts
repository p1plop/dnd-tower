import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { EditStatComponent } from '../dialogs/edit-stat/edit-stat.component';
import { Skill } from 'src/app/models/skill.model';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Character } from 'src/app/models/character.model';
import { CharactersService } from 'src/app/services/characters.service';
import { MatDialog } from '@angular/material/dialog';
import { AvatarUploadComponent } from '../dialogs/avatar-upload/avatar-upload.component';
import { EditHpComponent } from '../dialogs/edit-hp/edit-hp.component';
import { Note } from 'src/app/models/note.model';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss']
})
export class CharacterSheetComponent implements OnInit {
  characterId: string;
  form: FormGroup;
  loading = true;
  selectedNote: number;
  statsNames = [
    { key: 'strength', value: 'Сила'},
    { key: 'dexterity', value: 'Ловкость'},
    { key: 'constitution', value: 'Телосложение'},
    { key: 'intelligence', value: 'Интеллект'},
    { key: 'wisdom', value: 'Мудрость'},
    { key: 'charisma', value: 'Харизма'}
  ];
  skillsNames = [
    { key: 'acrobatics', value: 'Акробатика (Лов.)'},
    { key: 'athletics', value: 'Атлетика (Сил.)'},
    { key: 'arcana', value: 'Магия (Инт.)'},
    { key: 'deception', value: 'Обман (Хар.)'},
    { key: 'history', value: 'История (Инт.)'},
    { key: 'insight', value: 'Проницательность (Муд.)'},
    { key: 'intimidation', value: 'Запугивание (Хар.)'},
    { key: 'investigation', value: 'Расследование (Инт.)'},
    { key: 'medicine', value: 'Медицина (Муд.)'},
    { key: 'nature', value: 'Природа (Инт.)'},
    { key: 'perception', value: 'Восприятие (Муд.)'},
    { key: 'performance', value: 'Выступление (Хар.)'},
    { key: 'persuasion', value: 'Убеждение (Хар.)'},
    { key: 'religion', value: 'Религия (Инт.)'},
    { key: 'sleightOfHand', value: 'Ловкость рук (Лов.)'},
    { key: 'stealth', value: 'Скрытность (Лов.)'},
    { key: 'survival', value: 'Выживание (Муд.)'},
    { key: 'animalHandling', value: 'Обращение с животными (Муд.)'}
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private bottomSheet: MatBottomSheet,
    private charactersService: CharactersService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      imagePath: [''],
      name: ['', Validators.required],
      classLevel: [''],
      race: [''],
      background: [''],
      alignment: [''],
      ac: [10],
      speed: [30],
      iniciative: [0],
      inspiration: [0],
      proficiencyBonus: [2],
      passivePerception: [10],
      maxHp: [1],
      currentHp: [1],
      temporaryHp: [0],
      stats: this.fb.group({
        strength: [10],
        dexterity: [10],
        constitution: [10],
        intelligence: [10],
        wisdom: [10],
        charisma: [10]
      }),
      savingThrows: this.fb.group({
        strength: this.fb.group({ proficiency: false, modificator: 0, stat: 'strength'}),
        dexterity: this.fb.group({ proficiency: false, modificator: 0, stat: 'dexterity'}),
        constitution: this.fb.group({ proficiency: false, modificator: 0, stat: 'constitution'}),
        intelligence: this.fb.group({ proficiency: false, modificator: 0, stat: 'intelligence'}),
        wisdom: this.fb.group({ proficiency: false, modificator: 0, stat: 'wisdom'}),
        charisma: this.fb.group({ proficiency: false, modificator: 0, stat: 'charisma'}),
      }),
      skills: this.fb.group({
        acrobatics: this.fb.group({ proficiency: false, modificator: 0, stat: 'dexterity'}),
        athletics: this.fb.group({ proficiency: false, modificator: 0, stat: 'strength'}),
        arcana: this.fb.group({ proficiency: false, modificator: 0, stat: 'intelligence'}),
        deception: this.fb.group({ proficiency: false, modificator: 0, stat: 'charisma'}),
        history: this.fb.group({ proficiency: false, modificator: 0, stat: 'intelligence'}),
        insight: this.fb.group({ proficiency: false, modificator: 0, stat: 'wisdom'}),
        intimidation: this.fb.group({ proficiency: false, modificator: 0, stat: 'charisma'}),
        investigation: this.fb.group({ proficiency: false, modificator: 0, stat: 'intelligence'}),
        medicine: this.fb.group({ proficiency: false, modificator: 0, stat: 'wisdom'}),
        nature: this.fb.group({ proficiency: false, modificator: 0, stat: 'intelligence'}),
        perception: this.fb.group({ proficiency: false, modificator: 0, stat: 'wisdom'}),
        performance: this.fb.group({ proficiency: false, modificator: 0, stat: 'charisma'}),
        persuasion: this.fb.group({ proficiency: false, modificator: 0, stat: 'charisma'}),
        religion: this.fb.group({ proficiency: false, modificator: 0, stat: 'intelligence'}),
        sleightOfHand: this.fb.group({ proficiency: false, modificator: 0, stat: 'dexterity'}),
        stealth: this.fb.group({ proficiency: false, modificator: 0, stat: 'dexterity'}),
        survival: this.fb.group({ proficiency: false, modificator: 0, stat: 'wisdom'}),
        animalHandling: this.fb.group({ proficiency: false, modificator: 0, stat: 'wisdom'})
      }),
      inventory: this.fb.group({
        items: [''],
        copper: [''],
        silver: [''],
        gold: [''],
        electrum: [''],
        platinum: ['']
      }),
      notes: this.fb.array([]),
      spellsIds: [[]],
      isDeleted: false
    });
    this.route.params.pipe(switchMap(params => {
      this.characterId = params.id;
      return this.charactersService.getCharacter(this.characterId);
    })).subscribe((character: Character) => {
      this.form.patchValue(character);
      if (character.notes) {
        this.notes.clear();
        for (const note of character.notes) {
          this.addNoteGroup(note);
        }
      }
      this.loading = false;
    });
  }

  formSubmit() {
    this.charactersService.editCharacter(this.characterId, this.form.value);
  }

  noteChange(event: MatSelectionListChange) {
    this.selectedNote = event.option.value;
  }

  removeNote(index: number) {
    this.notes.removeAt(index);
    this.selectedNote = null;
  }

  editAvatar() {
    const dialogRef = this.dialog.open(AvatarUploadComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.charactersService.updateImage(result, this.characterId);
      }
    });
  }

  editStat(fieldName: string, section?: string) {
    const sectionGroup = section ? this.form.get(section) : this.form;
    const bottomSheetRef = this.bottomSheet.open(EditStatComponent, {
      data: sectionGroup.get(fieldName).value,
      disableClose: true
    });

    bottomSheetRef.afterDismissed().subscribe(result => {
      if (result) {
        sectionGroup.get(fieldName).setValue(result);
      }
    });
  }

  getStat(fieldName: string, section?: string) {
    const sectionGroup = section ? this.form.get(section) : this.form;
    return sectionGroup.get(fieldName).value;
  }

  calulateModificator(fieldName: string) {
    const value = this.form.get('stats').get(fieldName).value;

    const result = Math.floor((value - 10) / 2);
    return `${result >= 0 ? '+' : ''}${result}`;
  }

  calculateSkillTotalValue(fieldName: string, sectionName: string) {
    const item: Skill = this.form.get(sectionName).get(fieldName).value;

    let bonus: number = Math.floor((this.form.get('stats').get(item.stat).value - 10) / 2);
    if (item.proficiency) {
      bonus += this.form.get('proficiencyBonus').value;
    }

    return `+ ${bonus} = ${bonus + item.modificator}`;
  }

  editHp() {
    const bottomSheetRef = this.bottomSheet.open(EditHpComponent, {
      data: {
        maxHp: this.maxHp.value,
        currentHp: this.currentHp.value,
        temporaryHp: this.temporaryHp.value
      },
      disableClose: true
    });

    bottomSheetRef.afterDismissed().subscribe(result => {
      if (result) {
        this.maxHp.setValue(result.maxHp);
        this.currentHp.setValue(result.currentHp);
        this.temporaryHp.setValue(result.temporaryHp);
      }
    });
  }

  addNoteGroup(note?: Note) {
    this.notes.push(this.fb.group({
      title: [note ? note.title : 'Заметка', Validators.required],
      text: [note ? note.text : '']
    }));
  }

  get notes(): FormArray {
    return this.form.get('notes') as FormArray;
  }

  get maxHp(): FormControl {
    return this.form.get('maxHp') as FormControl;
  }

  get currentHp(): FormControl {
    return this.form.get('currentHp') as FormControl;
  }

  get temporaryHp(): FormControl {
    return this.form.get('temporaryHp') as FormControl;
  }
}
