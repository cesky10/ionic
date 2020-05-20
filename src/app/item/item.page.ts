import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  formItem:FormGroup;
  id: string;
  hiddenButton: boolean;
  image: string;

  constructor(private fb:FormBuilder, private itemService: ItemService, private router:Router, private route: ActivatedRoute, private camera: Camera) { 
    this.formItem = this.fb.group({
      title: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]]
    });
    this.route.queryParams.subscribe(params =>{
      console.log('query params',params);
      if(params.id){
        this.id = params.id;
        this.itemService.setIsLoading(true);
        this.itemService.getSingleItem(params.id).subscribe(item =>{
          this.formItem.get('title').setValue(item.title);
          this.formItem.get('quantity').setValue(item.quantity);
          this.image = item.image;
          this.itemService.setIsLoading(false);
        });
      }
    });
  }

  ngOnInit() {
    if(this.id){
      this.hiddenButton = false;
    }else{
      this.hiddenButton = true;
    } 
  }

  save(){
    
    let item = new Item();
    item.title = this.formItem.get('title').value;
    item.quantity = this.formItem.get('quantity').value;
    if(this.image){
      item.image = this.image;
    }
    this.itemService.setIsLoading(true);
    if(this.id){
      item._id = this.id;
      this.itemService.updateItem(item).subscribe(res =>{
      console.log('>>>>> RESULTADO UPDATE', res);  
      this.router.navigate(['list']);
      this.itemService.setIsLoading(false);

      },err=>{
        console.log(err);
        alert('Ocurrio un error al actualizar el item');
        this.itemService.setIsLoading(false);
      });
    }else{
      this.itemService.saveItem(item).subscribe(res =>{
        console.log('resultado save', res);
        this.router.navigate(['list']);
        this.itemService.setIsLoading(false);
      }, err =>{
        console.log(err);
        alert('errer al guardar el item');
        this.itemService.setIsLoading(false);
      });
    }
  }

  delete(){
    this.itemService.setIsLoading(true);
    if(this.id){
    this.itemService.deleteItem(this.id).subscribe(res =>{
    console.log('>>> DELETE', res);  
    this.router.navigate(['list']);
    this.itemService.setIsLoading(false);

    },err=>{
      this.itemService.setIsLoading(false);
      console.log(err);
      alert('Ocurrio un error al actualizar el item');
    });
  }
}

addPhoto(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  
  this.camera.getPicture(options).then((imageData) => {
   // imageData is either a base64 encoded string or a file URI
   // If it's base64 (DATA_URL):
   let base64Image = 'data:image/jpeg;base64,' + imageData;
  // this.image = base64Image;
   this.image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkBRQRMB8ZME7NAAABuklEQVRIx6XVv2vTQRzG8VfCN2nS1CgtGm3RwUVBXAQr2gqCW6VQoYM/BlEEl06K4KBL/wwHSyhYQRwK4qBCFSyipSgR4yClHRwUhFLQRpuUONgGKfGb5JtnOTg+9777PNxzR5uKbYw5mRZX/vRtE3DVuO1+twhIWXbHPS5aNCDe8tnjBi05z3tDutxwSRyBK65JghFjukIhZ7xjTY+7XvjsMm76YN44Rnzx0mQooMdaIKEsp6Aih16flPRirwWvDIQCyhJUZR3w2IQsdntk2j50mTTjSCggq/oXEFVZ1QDTKhEBAQEmlCIC0k613ULrF2iLGgNOO9Qe4JbD4QX1PYgZlUDMsv0SRmu53eJBfUDKlII0DvouplPBlFSzJvZ4qttJJfR7o2rVCRkzcs140GdOwZAVcNQc+OGsea/1NQasq+iozfd7W6vsULHejIndZjy3A0m/7ALbPDFrZ7MmJuUVdeq3ADKK8hvPTFMAGBYYMwUCw3VrGsY577owbcT5/3pmVkO1ncayRGRAQjmu6FhkwHEfuWDRQN2ohCtm0JJzgfs6PYzwtXVYcduDzZ33SLcIWPU1cuv/6g/ay3A3X3i0JAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0wNS0yMFQxNzo0ODozMSswMDowMI2go4AAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMDUtMjBUMTc6NDg6MzErMDA6MDD8/Rs8AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==';
  console.log('DATA PHOTO', base64Image)
  }, (err) => {
   alert('Ocurrio un error al tomar la foto',)
  });
}

}
