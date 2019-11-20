import { Component, OnInit } from '@angular/core';
import basicExp from './basicExp.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  exp="P→Q"
  
  constructor() { }

  ngOnInit() {
  }
  write(c:string){
    if(c=='←')
      this.exp = this.exp.slice(0, -1);
    else
      this.exp+=c;
  }
  genTable(){
    console.log(basicExp('p'));
  }
}
