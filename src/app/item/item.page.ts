import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  formItem:FormGroup;
  id: string;
  hiddenButton: boolean;

  constructor(private fb:FormBuilder, private itemService: ItemService, private router:Router, private route: ActivatedRoute) { 
    this.formItem = this.fb.group({
      title: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]]
    });
    this.route.queryParams.subscribe(params =>{
      console.log('query params',params);
      if(params.id){
        this.id = params.id;
        this.itemService.getSingleItem(params.id).subscribe(item =>{
          this.formItem.get('title').setValue(item.title);
          this.formItem.get('quantity').setValue(item.quantity);
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

    if(this.id){
      item._id = this.id;
      this.itemService.updateItem(item).subscribe(res =>{
      console.log('>>>>> RESULTADO UPDATE', res);  
      this.router.navigate(['list']);

      },err=>{
        console.log(err);
        alert('Ocurrio un error al actualizar el item');
      });
    }else{
      this.itemService.saveItem(item).subscribe(res =>{
        console.log('resultado save', res);
        this.router.navigate(['list']);
      }, err =>{
        console.log(err);
        alert('errer al guardar el item');
      });
    }
  }

  delete(){
    this.itemService.deleteItem(this.id).subscribe(res =>{
    console.log('>>> DELETE', res);  
    this.router.navigate(['list']);

    },err=>{
      console.log(err);
      alert('Ocurrio un error al actualizar el item');
    });
}

}
