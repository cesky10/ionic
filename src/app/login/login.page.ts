import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin:FormGroup;

  constructor(private fb:FormBuilder, private httpClient: HttpClient, private router: Router, private itemsService: ItemService) { 
    this.formLogin = this.fb.group({
      email: ['eve.holt@reqres.in', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  login(){
    if(this.formLogin.invalid){
      alert('Ingresa los datos correctamente');
      return;
    }
    /*let body = {
      email: this.formLogin.get('email').value,
      password: this.formLogin.get('password').value
    };
    console.log('<<<<<<<< FROM LOGIN ', body)*/
    this.itemsService.setIsLoading(true);

    this.httpClient.post('https://reqres.in/api/login',this.formLogin.value).subscribe(res => {
      console.log('>>>rest', res)
      this.router.navigate(['list'])
      this.itemsService.setIsLoading(false);
    }, err => {
      this.itemsService.setIsLoading(false);
      console.log('error http', err)
      alert(err.error.error);
    } );
  }



  ngOnInit() {
  }

}
