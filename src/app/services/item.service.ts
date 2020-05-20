import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private isLoading: Subject<boolean> = new Subject<boolean>();
  endpoint = 'https://supermarket-rest.herokuapp.com/test/eduardo'
  items : Item[] = [];

  constructor(private httpClient: HttpClient) { }

  setIsLoading(loading: boolean) { 
    this.isLoading.next(loading);
  }
 
  getIsLoading() {
    return this.isLoading.asObservable();
  }

  saveItem(item:Item){
    let itermForService = {
      title:item.title,
      quantity: item.quantity.toString(),
      image: item.image
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
      quantity: item.quantity.toString(),
      image: item.image

    };
    return this.httpClient.put(this.endpoint + '/' + item._id, itermForService);
  }

  deleteItem(id:string){
    return this.httpClient.delete<Item>(this.endpoint + '/' + id);
    }
}

