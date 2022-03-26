import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export class Tarea{
  id?: string;
  Titulo: string;
  fecha: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private ngFireStore: AngularFirestore
  ) { }
  createTarea(Tarea: Tarea){
    return this.ngFireStore.collection('Tarea').add(Tarea);
  }

  getNotas(){
    return this.ngFireStore.collection('Tarea').snapshotChanges();
  }
  getNota(id: any){
    return this.ngFireStore.collection('Tarea').doc(id).valueChanges();
  }
  updateNotas(id: any, Tarea:Tarea){
    return this.ngFireStore.collection('Tarea').doc(id).update(Tarea);
  }
  deleteNotas(id: any){
    return this.ngFireStore.doc('Tarea/' + id).delete();
  }
}
