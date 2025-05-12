import { Component, Renderer2, OnInit, ElementRef } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('2600ms ease', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('0ms', style({ opacity: 1 }))]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  animationState: string = 'hidden';
  constructor(private renderer: Renderer2, private el: ElementRef) {}
  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'overflow-x', 'hidden');
    this.triggerFadeInAnimation();
  }

  private triggerFadeInAnimation(): void {
    this.animationState = 'visible';
  }

  menu() {
    const menu = document.getElementById('menu-icon') as HTMLElement;
    const navlist = document.getElementById('navlist') as HTMLElement;

    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
  }
}
