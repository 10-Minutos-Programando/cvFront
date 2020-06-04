import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  arrProyectos: Project[];
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://cvback-10min.herokuapp.com/api/proyectos/';
    this.getToken();
  }

  getToken(): void {
    let objetoToken;
    this.httpClient.get('https://cvback-10min.herokuapp.com/api/token').subscribe(valor => {
      objetoToken = valor;
      localStorage.setItem('token', objetoToken.token);
    });
  }

  getAllProjects(): Promise<Project[]> {

    const httpOptions = {
      headers: new HttpHeaders({
        'access-token': localStorage.getItem('token')
      })
    };
    return this.httpClient.get<Project[]>(this.baseUrl, httpOptions).toPromise();
  }

  getProjectByCategory(pCategory: string): Promise<Project[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'access-token': localStorage.getItem('token')
      })
    };

    return this.httpClient.get<Project[]>(this.baseUrl + 'categoria/' + pCategory, httpOptions).toPromise();
  }

  getProjectById(pId: number): Promise<Project> {
    const httpOptions = {
      headers: new HttpHeaders({
        'access-token': localStorage.getItem('token')
      })
    };
    return this.httpClient.get<Project>(this.baseUrl + pId, httpOptions).toPromise();
  }

}
