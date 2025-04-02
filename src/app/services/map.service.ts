import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Map } from '../models/map.model';
import { switchMap, map } from 'rxjs/operators';

interface UnitImage {
  url: string;
  timestamp: number;
  id?: string;
}

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

  getUnitImages(userId: string): Observable<UnitImage[]> {
    return this.afs.collection(`users/${userId}/map-units`).snapshotChanges().pipe(
      map(actions => actions.map(action => ({
        ...action.payload.doc.data() as UnitImage,
        id: action.payload.doc.id
      })))
    );
  }

  deleteUnitImage(userId: string, imagePath: string, imageId: string): Promise<void> {
    const ref = this.afStorage.storage.refFromURL(imagePath);
    return ref.delete().then(() => {
      return this.afs.doc(`users/${userId}/map-units/${imageId}`).delete();
    });
  }
}
