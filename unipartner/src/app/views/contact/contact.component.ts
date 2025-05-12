import { Component, Renderer2, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  constructor(private renderer: Renderer2, private el: ElementRef) {}
  ngOnInit(){

    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

}
