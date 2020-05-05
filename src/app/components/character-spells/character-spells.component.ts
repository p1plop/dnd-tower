import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/models/character.model';
import { switchMap, first } from 'rxjs/operators';
import { CharactersService } from 'src/app/services/characters.service';
import { Spell } from 'src/app/models/spell.model';
import { SpellsService } from 'src/app/services/spells.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewSpellComponent } from '../dialogs/view-spell/view-spell.component';
import { AddSpellComponent } from '../dialogs/add-spell/add-spell.component';

@Component({
  selector: 'app-character-spells',
  templateUrl: './character-spells.component.html',
  styleUrls: ['./character-spells.component.scss']
})
export class CharacterSpellsComponent implements OnInit {
  characterId: string;
  character: Character;
  spells: Spell[];
  characterSpells: Spell[];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private charactersService: CharactersService,
    private spellsService: SpellsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(switchMap(params => {
      this.characterId = params.id;
      return this.charactersService.getCharacter(this.characterId).pipe(switchMap(character => {
        this.character = character;
        return this.spellsService.getSpells();
      }));
    })).subscribe(spells => {
      this.loading = false;
      this.spells = spells;
      this.characterSpells = this.spells.filter(spell => {
        return this.character.spellsIds &&
               this.character.spellsIds.length &&
               this.character.spellsIds.includes(spell.id);
      }).sort((a, b) => {
        return a.level - b.level;
      });
    });
  }

  viewSpell(spell: Spell) {
    const dialogRef = this.dialog.open(ViewSpellComponent, {
      maxWidth: '100vw',
      data: {
        viewedSpell: spell,
        character: this.character
      }
    });

    dialogRef.afterClosed().pipe(first()).subscribe((result: Character) => {
      if (result) {
        this.charactersService.editCharacter(this.characterId, result);
      }
    });
  }

  addSpell() {
    const dialogRef = this.dialog.open(AddSpellComponent, {
      maxWidth: '100vw',
      data: {
        spells: this.spells,
        characterSpells: this.characterSpells
      }
    });

    dialogRef.afterClosed().pipe(first()).subscribe((result: Spell[]) => {
      if (result.length) {
        const ids = result.map(spell => spell.id);
        this.character.spellsIds = this.character.spellsIds
          ? this.character.spellsIds.concat(ids)
          : ids;
        this.charactersService.editCharacter(this.characterId, this.character);
      }
    });
  }

  getSubheader(level: number): string {
    return level === 0 ? 'Заговоры' : `Заклинания ${level} уровня`;
  }

  getIconName(schoolName: string): string {
    switch (schoolName) {
      case 'Ограждение':
        return 'abjuration';
      case 'Вызов':
        return 'conjuration';
      case 'Прорицание':
        return 'divination';
      case 'Очарование':
        return 'enchantment';
      case 'Воплощение':
        return 'evocation';
      case 'Иллюзия':
        return 'illusion';
      case 'Некромантия':
        return 'necromancy';
      case 'Преобразование':
        return 'transmutation';
    }
  }

}
