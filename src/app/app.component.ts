import { Component ,OnInit} from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import {ContactService } from '../services/contact.service';
import {Contacts,Contact} from './model/contact';
@Component({
  selector: 'app-root',
templateUrl:"./app.component.html"
  // styleUrls: ['./app.component.css'],
  // template:
  // " <h1 my-hightlighter [innerHTML]='message' >there ,is My first angular app</h1>"
})
export class AppComponent implements OnInit  {
  // userforms=new FormGroup({
  //   name: new FormControl(),
  //   address: new FormGroup({
  //     street:new FormControl(),
  //     city: new FormControl()
  //   })  });

  constructor(private _fb:FormBuilder,private contactService:ContactService){}

  userforms=this._fb.group({
    name: ['Ankita',]
  });
  name:any="John Doe";
  show:boolean=false;
  message="hey there";
  contacts: Contact[];

  ngOnInit() {

   //console.log(this.contactService.getContacts())
  //  this.contactService.getContact().subscribe((data: Contacts) => {
  //   this.contacts = data && data.contactsList ? data.contactsList : [];
  //   console.log("by url : ",this.contacts)
  // });
    

  }


  welcomeMe(username){
    if(username!=null && username!=" " && username!=""){
    this.name=username;
     this.show=true;
  }
  
  }
 }
