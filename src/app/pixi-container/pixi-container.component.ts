import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PixiShapesService} from "../services/pixi-shapes.service";


@Component({
  selector: 'app-pixi-container',
  templateUrl: './pixi-container.component.html',
  styleUrls: ['./pixi-container.component.css']
})
export class PixiContainerComponent implements OnInit, AfterViewInit {
  
  @ViewChild("pixi", {static: false})
  pixiCont: any;

  app = new PIXI.Application({width: window.innerWidth, backgroundColor: 0x1099bb});
  container = new PIXI.Container();
  public gravity: number = 4;
  public numOfShapesPerSec: Array<number> = [1];
  public figure: Array<any> = [];
  public numOfShapes: number = 0;
  public surface: number = 0;


  constructor(private service: PixiShapesService) {
  }


  ngOnInit() {
  }

  ngAfterViewInit() {
    this.pixiCont.nativeElement.appendChild(this.app.view);
    this.app.stage.addChild(this.container);
    setInterval(() => {
      this.drawShape();
    }, 1000)
  }

  public generateShape(): any {
    this.drawShape(event);
  }

  drawShape(e?) {
    this.surface = this.app.view.width * this.app.view.height;
    this.numOfShapesPerSec.forEach(item => {
      var shape = new PIXI.Graphics();
      shape.interactive = true;
      shape.buttonMode = true;
      shape.lineStyle(100, Math.random() * 0xFFFFFF, 1);
      shape.drawPolygon(this.service.getValues());
      shape.beginFill(Math.random() * 0xFFFFFF, 0.5);
      this.shapesCoords(shape, e);
      shape.endFill();
      shape.zIndex = 10000;
      this.numOfShapes += 1;
      this.app.stage.addChild(shape);
      this.dropShapes(shape)
      shape.on('click', () => {
        shape.clear();
      });
    })


  }

  shapesCoords(shape, e) {
    if (e) {
      shape.position.x = e.offsetX - 50;
      shape.position.y = e.offsetY;
    } else {
      shape.position.y = -200;
      shape.position.x = Math.floor(Math.random() * this.app.view.width - 100)
    }
  }

  dropShapes(shape) {
    this.app.ticker.add(() => {
      shape.position.y += this.gravity;
      shape.closePath();
      this.disapearedShapes(shape);
    });
  }

  disapearedShapes(shape) {
    if (shape.position.y > this.app.view.height + 50 ) {
      shape.clear()
    }
    if (shape.position.y === this.app.view.height ) {
      this.numOfShapes -= 1;
    }
  }

  changeGravityValue(value) {
    if (value) {
      this.gravity += 1;
    } else {
      if (this.gravity === 0) {
        this.gravity = 0;
      } else {
        this.gravity -= 1;
      }
    }
  }


  changeNumOfShapesPerSec(value) {
    if (value) {
      this.numOfShapesPerSec.push(1);
    } else {
      if (this.numOfShapesPerSec.length === 0) {
        this.numOfShapesPerSec = [];
      } else {
        this.numOfShapesPerSec.splice(1, 1);
      }
    }
  }

}
