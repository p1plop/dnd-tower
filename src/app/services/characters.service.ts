import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { Character } from '../models/character.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { from, Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private afStorage: AngularFireStorage,
    private snackbar: MatSnackBar
  ) { }

  createNewCharacter(characterName: string, image?: File) {
    const character: Character = {
      name: characterName,
      classLevel: '',
      race: '',
      background: '',
      alignment: '',
      ac: 10,
      speed: 30,
      iniciative: 0,
      inspiration: 0,
      proficiencyBonus: 2,
      passivePerception: 10,
      maxHp: 1,
      currentHp: 1,
      stats: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10
      },
      savingThrows: {
        strength: {proficiency: false, modificator: 0, stat: 'strength'},
        dexterity: {proficiency: false, modificator: 0, stat: 'dexterity'},
        constitution: {proficiency: false, modificator: 0, stat: 'constitution'},
        intelligence: {proficiency: false, modificator: 0, stat: 'intelligence'},
        wisdom: {proficiency: false, modificator: 0, stat: 'wisdom'},
        charisma: {proficiency: false, modificator: 0, stat: 'charisma'}
      },
      skills: {
        acrobatics: {proficiency: false, modificator: 0, stat: 'dexterity'},
        athletics: {proficiency: false, modificator: 0, stat: 'strength'},
        arcana: {proficiency: false, modificator: 0, stat: 'intelligence'},
        deception: {proficiency: false, modificator: 0, stat: 'charisma'},
        history: {proficiency: false, modificator: 0, stat: 'intelligence'},
        insight: {proficiency: false, modificator: 0, stat: 'wisdom'},
        intimidation: {proficiency: false, modificator: 0, stat: 'charisma'},
        investigation: {proficiency: false, modificator: 0, stat: 'intelligence'},
        medicine: {proficiency: false, modificator: 0, stat: 'wisdom'},
        nature: {proficiency: false, modificator: 0, stat: 'intelligence'},
        perception: {proficiency: false, modificator: 0, stat: 'wisdom'},
        performance: {proficiency: false, modificator: 0, stat: 'charisma'},
        persuasion: {proficiency: false, modificator: 0, stat: 'charisma'},
        religion: {proficiency: false, modificator: 0, stat: 'intelligence'},
        sleightOfHand: {proficiency: false, modificator: 0, stat: 'dexterity'},
        stealth: {proficiency: false, modificator: 0, stat: 'dexterity'},
        survival: {proficiency: false, modificator: 0, stat: 'wisdom'},
        animalHandling: {proficiency: false, modificator: 0, stat: 'wisdom'},
      },
      inventory: {
        items: '',
        copper: '',
        silver: '',
        gold: '',
        electrum: '',
        platinum: ''
      }
    };

    const characterPath = `users/${this.authService.user.uid}/characters`;
    let characterId;
    from(this.afs.collection(characterPath).add(character)).pipe(switchMap(document => {
      if (image) {
        characterId = document.id;
        const imagePath = `users/${this.authService.user.uid}/characters/${document.id}`;
        const refUrl = `gs://dnd-tower.appspot.com/${imagePath}`;
        return from(this.afStorage.upload(imagePath, image)).pipe(switchMap(() => {
          return from(this.afStorage.storage.refFromURL(refUrl).getDownloadURL());
        }));
      } else {
        return of(null);
      }
    })).subscribe(url => {
      if (url) {
        this.afs.collection(characterPath).doc(characterId).update({imagePath: url});
      }
    });
  }

  editCharacter(characterId: string, character: Character) {
    this.afs.doc(`users/${this.authService.user.uid}/characters/${characterId}`).set(character);
    this.snackbar.open('Сохранено', null, {duration: 2000});
  }

  getCharacters(): Observable<Character[]> {
    const path = `users/${this.authService.user.uid}/characters`;
    return this.afs.collection(path).snapshotChanges().pipe(
      map((res: DocumentChangeAction<Character>[]) => {
        return res.map((action: DocumentChangeAction<Character>) => {
          return {id: action.payload.doc.id, ...action.payload.doc.data()};
        });
      })
    );
  }

  getCharacter(characterId: string): Observable<Character> {
    const path = `users/${this.authService.user.uid}/characters/${characterId}`;
    return this.afs.doc(path).valueChanges() as Observable<Character>;
  }

  updateImage(image: File, characterId: string) {
    const characterPath = `users/${this.authService.user.uid}/characters`;
    const imagePath = `users/${this.authService.user.uid}/characters/${characterId}`;
    const refUrl = `gs://dnd-tower.appspot.com/${imagePath}`;

    from(this.afStorage.upload(imagePath, image)).pipe(switchMap(() => {
      return from(this.afStorage.storage.refFromURL(refUrl).getDownloadURL());
    })).subscribe(url => {
        this.afs.collection(characterPath).doc(characterId).update({imagePath: url});
    });
  }
}
