import {Component, ChangeDetectorRef} from '@angular/core';
import * as d3 from 'd3';
import {booksdata} from '../data';
@Component({
    selector:'app-table-with-bar-chart',
    templateUrl: './table-with-bar-chart.component.html'
})
export class TableWithBarChartCOmponent {
  
  data:any;
  tableColumns: string[] = ['name', 'author', 'year','chart'];
   counter :number=0;
  previousCounter:number=0;
   constructor(private changeDetectorRef: ChangeDetectorRef ) {
  }

  ngOnInit() {

  this.data= booksdata;
  // console.log('ngOnint'+this.counter)
  }


ngDoCheck(){
   // console.log("ngDoCheck "+ this.counter)

}
ngAfterContentInit(){
// console.log("ngAfterContentInit "+ this.counter)
}
ngAfterContentChecked(){
  this.previousCounter=this.counter;
// console.log("ngAfterContentChecked "+ this.counter)

}
  ngAfterViewInit() {
    if (this.previousCounter != this.counter)
      this.counter=this.previousCounter
    // console.log("ngAfterViewInit "+ this.counter)


  }

  ngAfterViewChecked(){
    if (this.previousCounter != this.counter)
    this.counter=this.previousCounter
    // // console.log("ngAfterViewChecked "+ this.counter)

  }

  ngOnDestroy(){

  }
 changed(): void {
  
    this.changeDetectorRef.detectChanges();
  }
increaseCounter(){
  // console.log(this.counter)
this.counter++;
// this.changed(this.counter)

}
getsvg(counterNumber,data){
 
 // console.log("inside svg ", counterNumber)
 
  var margin = {top: 5, right: 5, bottom: 15, left: 15},
    width = 100,
    height = 50;
  var id = 'mychart'+counterNumber;

//d3.select('table-with-bar').selectAll('svg').remove();
var x = d3.scaleBand()
          .range([0, width-margin.left-margin.right])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height-margin.top-margin.bottom, 0]);

var svg = d3.select('#'+id).select("svg")
    .attr("width", width )
    .attr("height", height )
  .append("g")
    .attr("transform", 
          "translate( 0,0)");


  x.domain(data.map(function(d) { return d.month; }));
  y.domain([0, d3.max(data, function(d) { return d.sales; })]);

  
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.month); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.sales); })
      .attr("height", function(d) { return height - y(d.sales); });

     this.increaseCounter();
}


getBoxPlotSvg(counterNumber){

  var data= []
  var margin={ left:15, right:5 ,top:5,bottom:15};
  var width=100,height=100;
  var id= 'BoxPlot'+counterNumber;

  d3.select('#'+id).select('svg').attr('width',width).attr('height',height).attr('transform','translate(0,0)')
  .attr('fill','yellow')
  .append('g')
  .attr('transform',`translate( ${margin.left}, ${margin.top} )`);


}
}