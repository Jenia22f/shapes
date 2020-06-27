import { Injectable } from '@angular/core';
import { Application } from 'pixi.js';

@Injectable({
  providedIn: 'root'
})
export class PixiShapesService {

  public polygonsPaths = [
    [50, 0, 0, 100, 100, 100],
    [0, 0, 100, 0, 100, 100, 0, 100],
    [50, 0, 100, 38, 82, 100, 18, 100, 0, 38],
    [25, 0, 75, 0, 100, 50, 75, 100, 25, 100, 0, 50],
    [50, 0, 80, 10, 100, 35, 100, 70, 80, 90, 50, 100, 20, 90, 0, 70, 0, 35, 20, 10],
    [46, 94, 38, 68, 14, 52, 11, 31, 39, 31, 66, 41, 66, 70, 68, 99, 92, 80, 91, 48, 55, 14]
  ];

  constructor() {
  }

  private getRandomInt(max): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getValues(): Array<number> {
   const path = this.polygonsPaths[this.getRandomInt(this.polygonsPaths.length)]

    return path
  }

}
