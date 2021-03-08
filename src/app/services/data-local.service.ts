import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(private storage: Storage, public toastController: ToastController) { 
    this.cargarFavoritos();
  }

  guardarNoticia = (noticia: Article) => {

    const existe = this.noticias.find(x => x.title === noticia.title);

    if(!existe){
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
      this.presentToast('Added to Favorite');
    }

  } 

  cargarFavoritos = async () => {

    const favoritos = await this.storage.get('favoritos');

    if(favoritos){
      this.noticias = favoritos;
    }
    
  }

  borrarNoticia = (noticia: Article) => {
    this.noticias = this.noticias.filter(x => x.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);
    this.presentToast('Favorite Removed');
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
