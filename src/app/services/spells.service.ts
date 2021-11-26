import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Spell } from '../models/spell.model';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

const SPELLS_PATH = 'spells';
interface ISpellList {
  list: Spell[];
}

@Injectable({
  providedIn: 'root'
})
export class SpellsService {
  constructor(
    private afs: AngularFirestore
  ) { }

  getSpells(): Observable<Spell[]> {
    return this.afs.collection(SPELLS_PATH).snapshotChanges().pipe(
      map((res: DocumentChangeAction<ISpellList>[]) => res
        .map((action: DocumentChangeAction<ISpellList>) => action.payload.doc.data().list)
        .reduce((accumulator: Spell[], value: Spell[]) => accumulator.concat(value), [])
      )
    );
  }
}
