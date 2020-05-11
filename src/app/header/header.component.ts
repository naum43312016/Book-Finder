import { Component, OnInit } from '@angular/core';
import { BooksService } from '../BooksService.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private booksService:BooksService,private router:Router) { }
  query:string;
  ngOnInit() {
    this.query='';
  }

  onSearch(){
    this.booksService.setQuery(this.query);
    this.booksService.sendMessage(this.query);
    this.router.navigate(['/list']);
  }
}
