import { Component,ElementRef, ViewChildren, ViewChild, OnInit } from '@angular/core';
import {ContactService } from '../../services/contact.service';
import { Contacts } from '../model/contact';
@Component({
  selector: 'app-meta-data-demo',
  templateUrl: './meta-data-demo.component.html',
  styleUrls: ['./meta-data-demo.component.css']
})
export class MetaDataDemoComponent implements OnInit {
  newToDo:any;
  error:boolean;
  done:any;
  newToDoObj:any;
  contacts:any;
   todos:any=[{
              desc:"Sign Up for Play",
              done:false
          },
      {
      desc:"Express Courses",
      done:false
  },
  {
      desc:"Start a learning Jounrey",
      done:false
  },
  
  {
      desc:"Play Code Build Repeat",
      done:false
  },
  {
      desc:"Earn Miles",
      done:false
  },
  {
      desc:"Redeem Miles for GEMS",
      done:false
  }];
  
  
    constructor(private contactService:ContactService){
          this.error=false;
          if( this.todos.length!=0){
          this.todos.forEach(element => {
                      element.done=false;
          });
      }
    }
  
    addMore(){
          var desc= this.newToDo;
          this.todos.push({
                  desc:desc,
                  done:false
  
          })
  
  
  
    }
    ngOnInit() {

      
      this.contactService.getContacts().subscribe((data: Contacts) => {
        this.contacts = data ? data.contactsList : [];
        console.log("By  Passing Data: ",this.contacts)

     });
      
      
         
   
     }
    clearAll(){
        this.todos=[];  
      }
      checkValue(event: any){
        console.log(event);
     }
}
