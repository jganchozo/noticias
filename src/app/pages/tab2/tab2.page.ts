import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  categorias = ['business','entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(){
    this.segment.value = this.categorias[0];

    this.cargarNoticias(this.categorias[0]);
  }

  cambioCategoria = (event) => {
    this.noticias = [];
    this.cargarNoticias(event.detail.value);
  }

  cargarNoticias = (categoria: string) => {

    this.noticiasService.getTopHeadlinesCategoria(categoria).subscribe(noticias => {
      console.log(noticias);
      this.noticias.push(...noticias.articles);
    });

  }
}
