import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() numeracion: number;
  @Input() enFavoritos;

  constructor(private iab: InAppBrowser, 
              private actionSheetController: ActionSheetController,
              private socialSharing: SocialSharing,
              private dataLocalService: DataLocalService) { }

  ngOnInit() {}

  abrirNoticia = () => {
    
    console.log(this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system');

  }

  lanzarMenu = async () => {

  let guardarBorrarBtn;

  if (this.enFavoritos) {
    
    guardarBorrarBtn = {
      text: 'Delete Favorite',
      icon: 'trash',
      cssClass: 'action-dark',
      handler: () => {
        console.log('Delete Favorite clicked');
        this.dataLocalService.borrarNoticia(this.noticia);
      }
    };

  }else{

    guardarBorrarBtn = {
      text: 'Favorite',
      icon: 'heart',
      cssClass: 'action-dark',
      handler: () => {
        console.log('Favorite clicked');
        this.dataLocalService.guardarNoticia(this.noticia);
      }
    };

  }

    const actionSheet = await this.actionSheetController.create({
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Share',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      }, 
      guardarBorrarBtn,
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
