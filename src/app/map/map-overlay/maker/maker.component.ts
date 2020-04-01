import { Component, OnInit, ElementRef, Input } from '@angular/core'

@Component({
  selector: 'app-maker',
  templateUrl: './maker.component.html',
  styleUrls: ['./maker.component.scss']
})
export class MakerComponent implements OnInit {
  @Input() overlayer: ol.Overlay
  content
  constructor(private el: ElementRef) {}

  ngOnInit() {}

  getNativeElement() {
    return this.el.nativeElement
  }
  setContent(hdms: string) {
    this.content = hdms
  }

  send() {
    console.log(23)
    this.overlayer.setPosition(undefined)
  }
}
