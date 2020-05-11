import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private subject = new Subject<string>();
  private page:number;
  private booksPerPage=10;
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json"})
  };
  constructor(private http: HttpClient) { }
  query:string;
  api="AIzaSyBb2-l1SdFNVci6oAaKVZKWXT3mDHvPcDM";
  setQuery(q){
    this.query=q;
    this.page=1;
  }
  getQuery(){
    return this.query;
  }

  setPage(p:number){
    this.page=p;
  }

  getBooks(){
    var startIndex = ((this.page-1)*this.booksPerPage)+1;
    return this.http
    .get(`https://www.googleapis.com/books/v1/volumes?q=${this.query}&maxResults=10&startIndex=${startIndex}&key=${this.api}`
    ,this.httpOptions);
  }



  sendMessage(message: string) {
    this.subject.next(message);
    }

    clearMessages() {
        this.subject.next();
    }

    getMessage(): Observable<string> {
        return this.subject.asObservable();
    }
}
