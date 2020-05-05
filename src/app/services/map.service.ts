import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Map } from '../models/map.model';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
  ) { }

  getMap(userId: string): Observable<Map> {
    return this.afs.doc(`maps/${userId}`).valueChanges() as Observable<Map>;
  }

  updateMap(userId: string, map: Map): void {
    this.afs.doc(`maps/${userId}`).set(map);
  }

  uploadMap(userId: string, image: File) {
    const mapPath = `maps/${userId}`;
    const imagePath = `maps/${userId}`;
    const refUrl = `gs://dnd-tower.appspot.com/${imagePath}`;

    from(this.afStorage.upload(imagePath, image)).pipe(switchMap(() => {
      return from(this.afStorage.storage.refFromURL(refUrl).getDownloadURL());
    })).subscribe(url => {
        this.afs.doc(mapPath).set({
          image: url,
          units: []
        });
    });
  }
}
