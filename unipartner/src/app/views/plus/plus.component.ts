import { Component, Renderer2, OnInit, ElementRef } from '@angular/core';
@Component({
  selector: 'app-plus',
  templateUrl: './plus.component.html',
  styleUrls: ['./plus.component.css']
})
export class PlusComponent {

  // images = [
  //   {name : 'cat1.jpg', caption : 'cat 1'},
  //   {name : 'cat2.jpg', caption : 'cat 2'},
  //   {name : 'cat3.jpg', caption : 'cat 3'}
  // ];
  constructor(private renderer: Renderer2, private el: ElementRef) {}
  ngOnInit() {
    
    this.renderer.setStyle(document.body, 'overflow-x', 'hidden');
    window.onload = () => {
      window.addEventListener('scroll', () => {
        let s = window.scrollY;
        let w = window.outerWidth;
        let h = document.getElementsByClassName('paralax')[0].clientWidth;
        let h_b = document.getElementsByClassName('container')[0].clientWidth;
        let p = (s / h) * 100;
        let p_b = (s / h_b) * 100;
        let opas = 1 - (1 / 100) * p_b;
        let z_1 = 1 + (w / 10000) * p_b;
        (
          document.getElementsByClassName('p-item4')[0] as HTMLElement
        ).style.cssText = `transform: scale(${z_1}); opacity: ${opas}`;
        let z_2 = 1 + (w / 5000000) * p;
        (
          document.getElementsByClassName('p-item1')[0] as HTMLElement
        ).style.cssText = `transform: scale(${z_2})`;
        let hr = (w / 2000) * p_b;
        let z_3 = 1 + w * 0.000005 * p_b;
        (
          document.getElementsByClassName('p-item2')[0] as HTMLElement
        ).style.cssText = `transform: translate3d(${hr}px,0,0) scale(${z_3})`;
        let hr_2 = (w / 1500) * p_b;
        let z_4 = 1 + w * 0.00001 * p_b;
        (
          document.getElementsByClassName('p-item3')[0] as HTMLElement
        ).style.cssText = `transform: translate3d(${hr_2}px,0,0) scale(${z_4})`;
      });
    };

  }


}
