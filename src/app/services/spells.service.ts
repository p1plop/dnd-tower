import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Spell } from '../models/spell.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, map } from 'rxjs/operators';
import { QueryDocumentSnapshot, DocumentChange, Action, DocumentSnapshot } from '@angular/fire/firestore/interfaces';

const SPELLS_PATH = 'spells/3ff80920-8217-11ea-a425-37443ccbfdee';

@Injectable({
  providedIn: 'root'
})
export class SpellsService {
  constructor(
    private afs: AngularFirestore
  ) { }

  getSpells(): Observable<Spell[]> {
    return this.afs.doc(SPELLS_PATH).snapshotChanges().pipe(map((action: Action<DocumentSnapshot<any>>) => {
      return action.payload.data().spellList;
    }));
  }
}
