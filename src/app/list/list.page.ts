import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item.model';
import { ItemService } from '../services/item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  items:Item[] = []


  constructor(private itemService:ItemService, private router: Router) {
    
  }

  ionViewWillEnter(){
    this.itemService.getItems().subscribe(res =>{
      console.log('>>REST CONSULTA', res);
      this.items = res;
   }, err =>{
     alert(err);
   });

  }

  ngOnInit() {
  }

  newItem(){
    this.router.navigate(['item']);
  }

  edit(item:Item){
    //console.log('>>>>detalle', item);
    this.router.navigateByUrl('/item?id=' + item._id);


  }

}
