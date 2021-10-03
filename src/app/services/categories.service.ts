import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private db: AngularFireDatabase) {
  }

  getCategories(): AngularFireList<{ name: string }> {
    return this.db.list('/categories');
  }
}
