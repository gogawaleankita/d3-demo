import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Contacts } from '../../src/app/model/contact';
///
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  url = 'http://www.mocky.io/v2/5c5d880f3200000e11220880';
contacts = {
  'contactsList': [
    { 'id': 1, 'name': 'Rajesh', 'city': 'bangalore' },
    { 'id': 2, 'name': 'Aarjith', 'city': 'london' },
    { 'id': 3, 'name': 'Anjan', 'city': 'california' },
    { 'id': 4, 'name': 'David', 'city': 'delhi' }
  ]
};

contactList:Contacts;
  constructor(
    private http: HttpClient
  ) { }
  getContacts(): Observable<Contacts> {
    return this.http.get<Contacts>(this.url); 
  }

 getContact() {
 
     return this.contacts; 
    }
}