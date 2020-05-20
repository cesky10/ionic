import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoadingController } from '@ionic/angular';
import { ItemService } from './services/item.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private itemService : ItemService,
    private loadingController: LoadingController,

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.itemService.getIsLoading().subscribe(loading=>{
        if(loading){
          this.presentLoging();

        }else{
          this.dismissLoading();
        }

      });
    });
  }

  dismissLoading() {
    setTimeout(() => {
      this.loadingController.getTop().then(top => {
        if (top) {
          this.loadingController.dismiss();
          this.dismissLoading();
        }
      });
    }, 250);
  }

  async presentLoging(){
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }



}
