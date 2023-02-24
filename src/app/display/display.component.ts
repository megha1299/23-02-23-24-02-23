import { Component } from '@angular/core';
import { ServiceService } from '../Services/service.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent {

  display: any;

  constructor(public service: ServiceService){}

  ngOnInit(){
    this.display = this.service.getData();
  }
}
