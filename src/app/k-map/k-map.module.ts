import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KMapComponent } from './k-map.component';



@NgModule({
  declarations: [KMapComponent],
  imports: [
    CommonModule
  ],
  exports: [KMapComponent]
})
export class KMapModule { }
