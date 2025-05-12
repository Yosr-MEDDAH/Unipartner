import { Component, Renderer2, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 
})
export class AppComponent implements OnInit{
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private renderer: Renderer2, private el: ElementRef) {}
  ngOnInit(){

   
}}
