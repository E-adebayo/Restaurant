import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie } from './class/categorie';
@Injectable({
  providedIn: 'root'
})
export class CategorieserviceService {
  list_length!: number

  constructor(private http: HttpClient) { }
  getData(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>('http://localhost:3000/Categorie')
  }

  getDataLength() {
    this.http.get<Categorie[]>('http://localhost:3000/Categorie').subscribe(data => {
      this.list_length = (data).length
    })
  }

  addCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>('http://localhost:3000/Categorie', categorie)
  }
}
