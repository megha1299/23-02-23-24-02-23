import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public state: any= [];
  constructor(public http: HttpClient) { }

  user= {
    // firstname: 'Megha',
    // lastname: 'Shibu',
    // age: '24',
    // phone: '8078550957',
    // address: 'Valiyaparambil, Thittamel, Chengannur',
    // education: 'B.Tech',
    // email: 'meghashibu221@gmail.com',
    // password: '****',
    // confirmpassword: '****',
    // country: 'India',
    // state: 'Kerala',
    // pin: '689121',
    // message: 'Hello'
 };

  getData() {
    console.log(this.state,'getData');
    return this.state;
  }
  setData(data: any) {
    this.state= data;
    console.log(this.state, 'steDate');
  }
}
