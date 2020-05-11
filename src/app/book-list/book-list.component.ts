import { Component, OnInit, OnDestroy } from '@angular/core';
import { BooksService } from '../BooksService.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit,OnDestroy  {
  subscription: Subscription;
  searchQuery:string;
  data=[];
  pages=1;
  currPage=1;

  constructor(private booksService:BooksService) { 
    this.subscription = this.booksService.getMessage().subscribe(message => {
      if (message) {
        this.initQuery(message);
      } 
    });
  }

  initQuery(q){
    this.searchQuery=q;
    this.getBooks();
  }

  getBooks(){
    this.booksService.getBooks().subscribe((data : any)=>{
        this.data=data.items;
        this.pages=data.totalItems;
    });
  }

  nextPage(){
    this.currPage=this.currPage+1;
    this.booksService.setPage(this.currPage);
    this.getBooks();
  }
  prevPage(){
    this.currPage=this.currPage-1;
    this.booksService.setPage(this.currPage);
    this.getBooks();
  }

  ngOnInit() {
    this.searchQuery=this.booksService.getQuery();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
