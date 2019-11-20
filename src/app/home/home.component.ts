import { Component, OnInit } from '@angular/core';
import basicExp from './basicExp.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  exp="";
  table=[];
  displayedColumns: string[] = ['space','P', 'Q', 'R', 'S','RESULTADO'];
  constructor() {
    this.initTable();
   }

  ngOnInit() {
  }
  initTable(){
    for(let i=0;i<Math.pow(2,4);i++){
      this.table.push({'P':(i%16<8?'0':'1'),'Q':(i%8<4?'0':'1'),'R':(i%4<2?'0':'1'),'S':(i%2<1?'0':'1')})
    }
  }
  write(c:string){
    if(c=='←')
      this.exp = this.exp.slice(0, -1);
    else
      this.exp+=c;
  }
  genTable(){
    this.initTable();
    this.table.forEach((row)=>{
      row.X=this.evaluate(this.exp,row.P,row.Q,row.R,row.S);
    })
    console.log(this.table);
  }
  evaluate(exp:string,P="0",Q='0',R='0',S='0'){
    let ret=1;
    let fpos:number,lpos:number;
    let substr;

    exp=exp.replace(/P/gi,P);
    exp=exp.replace(/Q/gi,Q);
    exp=exp.replace(/R/gi,R);
    exp=exp.replace(/S/gi,S);
    exp='('+exp+')';

    while(exp.length>1&&ret!=-1){
      for(let i=0;i<exp.length;i++){
        if(exp[i]=='(')
          fpos=i;
        else if(exp[i]==')'){
          lpos=i;
          substr=exp.substring(fpos+1,lpos);
          ret=basicExp(substr);
          if(ret==-1)
            return -1;
          exp=exp.substring(0,fpos)+ret+exp.substring(lpos+1,exp.length);
          break;
        }
      }
    }
    return exp;
  }
}
