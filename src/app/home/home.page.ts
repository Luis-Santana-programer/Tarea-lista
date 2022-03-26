import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
export class Tarea{
  id?: string;
  Titulo: string;
  fecha: string;
  status: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  Tareas: Tarea[]= [];
  Tarea: Tarea;
  constructor(
    private crud: CrudService
  ) {
    this.Tarea=new Tarea;
  }

  ngOnInit(){
    this.getNotas();
  }

  getNotas(){
    this.crud.getNotas().subscribe(result => {
      this.Tareas=result.map(n => {
        return{
        id:n.payload.doc.id,
        ...n.payload.doc.data() as Tarea
        }
      })
      console.log(this.Tareas);
    })
  }

  crear(){
    this.Tarea.fecha=this.Tarea.fecha.substring(0,19)
    this.Tarea.status="SIN COMPLETAR";
    //console.log(this.Tarea);
    this.crud.createTarea(
      {
  fecha: this.Tarea.fecha,
  Titulo: this.Tarea.Titulo,
  status: this.Tarea.status
}
    ).then(() => {
      this.Tarea = new Tarea;
      this.getNotas();
    });
  }

  Completar(id:any, Tarea: Tarea){

    Tarea.status="COMPLETADA"
   this.crud.updateNotas(id, {  
     fecha: Tarea.fecha,
    Titulo: Tarea.Titulo,
    status: Tarea.status}).then(()=> {
      this.getNotas();
    })
  }

  incompletar(id:any, Tarea: Tarea){

    Tarea.status="SIN COMPLETAR"
   this.crud.updateNotas(id, {  
     fecha: Tarea.fecha,
    Titulo:Tarea.Titulo,
    status: Tarea.status}).then(()=> {
      this.getNotas();
    })
  }
  

}
