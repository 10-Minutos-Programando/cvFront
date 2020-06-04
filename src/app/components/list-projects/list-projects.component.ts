import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss']
})
export class ListProjectsComponent implements OnInit {
  arrProyectos: Project[];
  categorias: string[];
  constructor(private projectservices: ProjectService) { }

  ngOnInit(): void {
    this.obtenerProyectos();
  }

  async obtenerProyectos() {
    this.arrProyectos = await this.projectservices.getAllProjects();
    // console.log(this.arrProyectos);
    const arrCategoriasTexto = this.arrProyectos.map(proyecto => proyecto.categoria);
    this.categorias = Array.from(new Set(arrCategoriasTexto));
    //console.log(this.categorias);
  }

  async cargarCategoria(pCategoria = '') {

    if (pCategoria !== '') {
      //console.log(pCategoria);
      this.arrProyectos = await this.projectservices.getProjectByCategory(pCategoria);
      //console.log(this.arrProyectos);
    } else {
      this.arrProyectos = await this.projectservices.getAllProjects();
    }

  }

}
