import { Component, OnInit, ɵConsole } from '@angular/core';
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
   }

  ngOnInit() {

  }
  initTable(P=0,Q=0,R=0,S=0){
    let sum=(P?1:0)+(Q?1:0)+(R?1:0)+(S?1:0);
    this.table=[];
    for(let i=0;i<Math.pow(2,sum);i++){
      let pos=sum+1;
      let obj={'P':'0','Q':'0','R':'0','S':'0','X':'0'};
      if(P)pos--;
      obj.P=(i%Math.pow(2,pos)<Math.pow(2,pos-1)?'0':'1');
      if(Q)pos--;
      obj.Q=(i%Math.pow(2,pos)<Math.pow(2,pos-1)?'0':'1');
      if(R)pos--;
      obj.R=(i%Math.pow(2,pos)<Math.pow(2,pos-1)?'0':'1');
      if(S)pos--;
      obj.S=(i%Math.pow(2,pos)<Math.pow(2,pos-1)?'0':'1');
      
      this.table.push(obj);
    }
  }
  write(c:string){
    if(c=='←')
      this.exp = this.exp.slice(0, -1);
    else
      this.exp+=c;
  }
  genTable(){
    let P=this.exp.search('P')+1;
    let Q=this.exp.search('Q')+1;
    let R=this.exp.search('R')+1;
    let S=this.exp.search('S')+1;

    this.displayedColumns=['space'];
    if(P) this.displayedColumns.push('P');
    if(Q) this.displayedColumns.push('Q');
    if(R) this.displayedColumns.push('R');
    if(S) this.displayedColumns.push('S');
    this.displayedColumns.push('RESULTADO');

    this.initTable(P,Q,R,S);
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
