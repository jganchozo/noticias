import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';


const apiKey = environment.apiKey;
const apiEndPoint = environment.apiEndPoint;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headLinesPage = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery = <T>(query: string) => {

    query = `${apiEndPoint}${query}`;

    return this.http.get<T>(query, { headers });
  }

  getTopHeadlines = () => {
    
    //return this.http.get<RespuestaTopHeadlines>(`http://newsapi.org/v2/top-headlines?country=us&apiKey=193c0ad7e99d403bb272a9ee67224f7b`);
    this.headLinesPage ++;
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headLinesPage}`);
  }

  getTopHeadlinesCategoria = (categoria: string) => {

    if (this.categoriaActual === categoria) {
      this.categoriaPage ++;
    }else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    //return this.http.get<RespuestaTopHeadlines>(`http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=193c0ad7e99d403bb272a9ee67224f7b`);
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);
  }

}
