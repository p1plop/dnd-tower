import { Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/services/characters.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateCharacterComponent } from '../dialogs/create-character/create-character.component';
import { Character } from 'src/app/models/character.model';
import { ConfirmationComponent } from '../dialogs/confirmation/confirmation.component';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {
  characters: Character[];
  noImagePath = 'https://firebasestorage.googleapis.com/' +
  'v0/b/dnd-tower.appspot.com/o/no-image.png?alt=media&token=59ad07d9-665f-4f00-8a1d-1b7f4e7d82f9';

  constructor(
    private charactersService: CharactersService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.charactersService.getCharacters().subscribe(characters => {
      this.characters = characters.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (b.name > a.name) {
          return -1;
        }
        return 0;
      });
    });
  }

  delete(character: Character) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Подтверждение удаления',
        message: 'Вы уверены, что хотите удалить этого персонажа?',
        cancel: 'Отмена',
        confirm: 'Удалить'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.charactersService.deleteCharacter(character.id);
      }
    });
  }

  createCharacter() {
    this.dialog.open(CreateCharacterComponent, {
      width: '400px'
    });
  }
}
