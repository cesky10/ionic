import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  endpoint = 'https://crudcrud.com/api/91546e954bca47b4920ff5a6fb3c5229/items'
  items : Item[] = [];

  constructor(private httpClient: HttpClient) { }

  saveItem(item:Item){
    let itermForService = {
      title:item.title,
      quantity: item.quantity.toString()
    };
    return this.httpClient.post(this.endpoint, itermForService);
    //console.log('>>>>>item', this.items.length);
    //this.items.push(item);
    //console.log('>>>>>item', this.items.length);
  }

  getItems(){
    return this.httpClient.get<[Item]>(this.endpoint);
  }

  getSingleItem(id:string){
  return this.httpClient.get<Item>(this.endpoint + '/' + id);
  }

  updateItem(item:Item){
    let itermForService ={
      title:item.title,
      quantity: item.quantity.toString()

    };
    return this.httpClient.put(this.endpoint + '/' + item._id, itermForService);
  }

  deleteItem(id:string){
    return this.httpClient.delete<Item>(this.endpoint + '/' + id);
    }
}

