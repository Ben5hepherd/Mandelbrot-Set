import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { complex, multiply, add} from 'mathjs';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  constructor() { }

  scatterChart;

  ngOnInit() {
    this.setupGraph();
  }

  setupGraph(): any {
    if(this.scatterChart) {
      this.scatterChart.destroy();
    }

    let canvas = <HTMLCanvasElement> document.getElementById("myChart");
    let ctx = canvas.getContext("2d");

    this.scatterChart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Madelbrot Set',
          data: this.getData(),
          fill: false
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom'
          }]
        },
        tooltips: {
          enabled: false
        }
      }
    })
  }

  getData() {
    let array = [];

    for(let constantRealAxis  = -1; constantRealAxis < 1; constantRealAxis = constantRealAxis + 0.01) {
      for(let constantImaginaryAxis  = -1; constantImaginaryAxis < 1; constantImaginaryAxis = constantImaginaryAxis + 0.01) {
        array.push(this.getValidConstant(constantRealAxis, constantImaginaryAxis));
      }
    }

    for(let constantImaginaryAxis  = -1; constantImaginaryAxis < 1; constantImaginaryAxis = constantImaginaryAxis + 0.01) {
      for(let constantRealAxis  = -1; constantRealAxis < 1; constantRealAxis = constantRealAxis + 0.01) {
        array.push(this.getValidConstant(constantRealAxis, constantImaginaryAxis));
      }
    }

    return array;
  }

  getValidConstant(constantRealAxis: number, constantImaginaryAxis: number) {
    let array = [];
    let complexNumber = complex(0,0);

    for(let index = 0; index < 100; index++) {
      complexNumber = add(multiply(complexNumber, complexNumber), complex(constantRealAxis, constantImaginaryAxis));
      if(complexNumber.re < 1 && complexNumber.im < 1 && complexNumber.re > -1 && complexNumber.im > -1) {
        array.push({ x: complexNumber.re, y: complexNumber.im });
      }
      else{
        return [];
      }
    }

    return { x: constantRealAxis, y: constantImaginaryAxis };
  }

}

