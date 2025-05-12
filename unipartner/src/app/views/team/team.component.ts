import { Component, Renderer2, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent implements OnInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    const nativeElement = this.el.nativeElement;
    const box1 = nativeElement.querySelector('.box[data-color="clr1"]');
    const box2 = nativeElement.querySelector('.box[data-color="clr2"]');
    // const box3 = nativeElement.querySelector('.box[data-color="clr3"]');
    // const box4 = nativeElement.querySelector('.box[data-color="clr4"]');
    if (box1) {
      this.renderer.listen(box1, 'mouseover', () => {
        this.renderer.setStyle(
          document.body,
          'background',
          'linear-gradient(245.96deg, #aca5a7 0%, #7E81A1 28.53%, #383a70 75.52%)'
        );
      });

      this.renderer.listen(box1, 'mouseout', () => {
        this.renderer.setStyle(
          document.body,
          'background',
          'linear-gradient(245.96deg, #aca5a7 0%, #ff5757 28.53%, #703838 75.52%)'
        );
      });
    }
    if (box2) {
      this.renderer.listen(box2, 'mouseover', () => {
        this.renderer.setStyle(
          document.body,
          'background',
          'linear-gradient(245.96deg, #aca5a7 0%, #CEBFC4 28.53%, #703852 75.52%)'
        );
      });

      this.renderer.listen(box2, 'mouseout', () => {
        this.renderer.setStyle(
          document.body,
          'background',
          'linear-gradient(245.96deg, #aca5a7 0%, #ff5757 28.53%, #703838 75.52%)'
        );
      });
    }
    // if (box3) {
    //   this.renderer.listen(box3, 'mouseover', () => {
    //     this.renderer.setStyle(document.body, 'background', '#162527');
    //   });

    //   this.renderer.listen(box3, 'mouseout', () => {
    //     this.renderer.setStyle(
    //       document.body,
    //       'background',
    //       'linear-gradient(245.96deg, #aca5a7 0%, #ff5757 28.53%, #703838 75.52%)'
    //     );
    //   });
    // }
    // if (box4) {
    //   this.renderer.listen(box4, 'mouseover', () => {
    //     this.renderer.setStyle(document.body, 'background', '#162527');
    //   });

    //   this.renderer.listen(box4, 'mouseout', () => {
    //     this.renderer.setStyle(
    //       document.body,
    //       'background',
    //       'linear-gradient(245.96deg, #aca5a7 0%, #ff5757 28.53%, #703838 75.52%)'
    //     );
    //   });
    // }

    // Set styles for the body element
    this.renderer.setStyle(document.body, 'display', 'flex');
    this.renderer.setStyle(document.body, 'justify-content', 'center');
    this.renderer.setStyle(document.body, 'align-items', 'center');
    this.renderer.setStyle(document.body, 'min-height', '100vh');
    this.renderer.setStyle(
      document.body,
      'background',
      'linear-gradient(245.96deg, #aca5a7 0%, #ff5757 28.53%, #703838 75.52%)'
    );
    this.renderer.setStyle(document.body, 'transition', '0.5s');
  }
}
