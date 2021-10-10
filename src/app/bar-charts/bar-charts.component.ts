import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import {SimpleJson,JsonDataForGroupedChart,ComplexJson} from '../data';


import {FormBuilder, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-bar-charts',
  templateUrl: './bar-charts.component.html',
  styleUrls: ['./bar-charts.component.css']
})
export class BarChartsComponent implements OnInit {
  // options: FormGroup;
  constructor() { 
   
  }
data1:any;
JSONList:any;
selectedJson:any;
selectedGraph:any;
ChartList:any;
  ngOnInit() {
    


    this.JSONList=[
      {
      name:"SimpleJson",
      value:SimpleJson  ,
      type:["barchart","lineChart","PieChart"]
      },
      {
        name:"groupdData",
        value:JsonDataForGroupedChart,
        type:["barchart"]
        },
        {
          name:"ComplexJson",
          value:ComplexJson ,
          type:["ScatterPlot"] 
          }
    ];

  }
  onChangejson(selectedjson){
    this.selectedJson=selectedjson;
   // d3.select("#barchart1").selectAll("svg").remove();
for(var i=0;i<this.JSONList.length;i++){
      if(this.JSONList[i].name==selectedjson)
      this.ChartList=[...this.JSONList[i].type];
}
     

  }

  createGraph(selectedJson,selectedGraph){
    console.log(selectedJson,"  ",selectedGraph)
    d3.select("#barchart1").selectAll("svg").remove();
    d3.select("#barchart1").selectAll("div").remove();
    this.createChart("barchart1",selectedJson,selectedGraph);


  }
  createChart(id,selectedJson,selectedGraph){
    var jsonData;
    for(var i=0;i<this.JSONList.length;i++){
      if(this.JSONList[i].name==selectedJson)
      jsonData=this.JSONList[i].value;
    }
console.log(jsonData)

    switch(selectedJson){

      
      case 'SimpleJson':
          switch(selectedGraph){
            case 'barchart':
                this.createSimpleBarChar(id,jsonData);
            break;
            case 'lineChart':
                this.createLineChart(id,jsonData);
              
            break;
            case 'PieChart':
                this.creatPieChart(id,jsonData);
            break;
          }
      break;
      case 'groupdData':
          switch(selectedGraph){
            case 'barchart':
                this.createGroupdChart(id,jsonData)
            break;
            case 'lineChart':
                
            break;

          }
      break;
      case 'ComplexJson':
          switch(selectedGraph){
           
            case 'ScatterPlot':
                this. createScatterPlot(id,jsonData)
            
            break;

          }
      break;
    }




  }
 

 createGroupdChart(id,jdata){

  var 
  width = 600,
  height = 300,
  margin = {top: 30, right: 20, bottom: 30, left: 20},
  barPadding = 0.2,
  axisTicks = {qty: 10, outerSize: 0, dateFormat: '%m-%d'};
var fid="#"+id;

var svg = d3.select(fid)
 .append("svg")
 .attr("width",width).attr("height",height)
.attr("transform", `translate(${0}, ${0})`).style("background-color","white").attr( "viewBox",`${0} ${0} ${width} ${height} `)
.attr("preserveAspectRatio","xMinYMin meet");

svg.append("rect").attr("x",0).attr("y",0)

.attr("fill","white").attr("stroke","white")
.attr("transform", `translate(${margin.left}, ${margin.top})`)
.append("g")
.attr("transform", `translate(${margin.left},${margin.top})`);

var xScale0 = d3.scaleBand().range([0, width  -margin.right]).padding(barPadding);
var xScale1 = d3.scaleBand();
var yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]);





var xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize).tickSize(1);
var yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);

xScale0.domain(jdata.map(d => d.month));
xScale1.domain(['Unplanned', 'Planned']).range([0, xScale0.bandwidth()]);
yScale.domain([0, d3.max(jdata, d => d3.max([d.Unplanned,d.Planned]))]);

var month = svg.selectAll(".month")
.data(jdata)
.enter().append("g")
.attr("class", "month")
.attr("transform", d => `translate(${xScale0(d.month)+25},20)`);

//Add Unplanned bars 
month.selectAll(".bar.Unplanned")
.data(d => [d])
.enter()
.append("rect")
.attr("class", "bar Unplanned")
.style("fill","#525252").style("opacity","0.9")
.attr("x", d => xScale1('Unplanned'))
.attr("y", d => yScale(d.Unplanned))
.attr("width", xScale1.bandwidth())
.attr("height", d => {
  return height - margin.top - margin.bottom - yScale(d.Unplanned);
});

// Add Planned bars 
month.selectAll(".bar.Planned")
.data(d => [d])
.enter()
.append("rect")
.attr("class", "bar Planned")
.style("fill","#BCBCBC").style("opacity","0.99")
.attr("x", d => xScale1('Planned'))
.attr("y", d => yScale(d.Planned))
.attr("width", xScale1.bandwidth())
.attr("height", d => {
  return height - margin.top - margin.bottom - yScale(d.Planned);
});


// Add the Legends 

svg.append("rect").attr("x",width/4+40).attr("y",2)
.attr("width","20").attr("height","10").attr("fill","#525252");

svg.append("text").attr("x",width/4 + 65).attr("y",10).text("Unplanned").style("font-size","12");

svg.append("rect").attr("x",width/4+150).attr("y",2)
.attr("width","20").attr("height","10").attr("fill","#BCBCBC");

svg.append("text").attr("x",width/4 + 175).attr("y",10).text("Planned").style("font-size","12");

svg.append("text").attr("x",width/3).attr("y",height-5).text("Number of Cases  (By Months)").style("font-size","12");



svg.append("g")
 .attr("class", "x axis")

 .attr("transform", `translate(20,${height-40})`)
 .call(xAxis);
svg.append("g").attr("stroke-opacity", 0)
.attr("transform", "translate(25, 20)")
 .attr("class", "y axis")


.call(yAxis); 

 }

 createSimpleBarChar(id,data)
 {
        var 
       width = 800,
       height = 350,
       margin = {top: 60, right: 50, bottom: 40, left: 50},
       barPadding = 0.2,
       axisTicks = {qty: 10, outerSize: 0, dateFormat: '%m-%d'};
     var fid="#"+id;
 var colors=['red','pink','blue','green','orange'];

 var chartHeight=height-margin.top-margin.bottom, chartWidth=width-margin.left-margin.right;

   var svg = d3.select(fid)
      .append("svg")
      .attr("width",width).attr("height",height)
    .attr("transform", `translate(${0}, ${0})`).style("background-color","white").attr( "viewBox",`${0} ${0} ${width} ${height} `)
.attr("preserveAspectRatio","xMinYMin meet");

     svg.append("rect").attr("x",0).attr("y",0).attr("width",chartWidth).attr("height",chartHeight)
 .style("fill","white").attr("stroke","white")
 .attr("transform", `translate(${margin.left}, ${margin.top})`)
 .append("g")
   .attr("transform", `translate(${margin.left},${margin.top})`);

 var xScale = d3.scaleBand()  .domain(data.map(d => d.country)) .padding(0.3)  .range([0, chartWidth]);
 var yScale = d3.scaleLinear()  .domain([0, d3.max(data, d => d.value)]) .range([chartHeight, 0]);
 var xAxis=	d3.axisBottom(xScale).tickSizeOuter(axisTicks.outerSize).tickSize(1);
   var yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize).ticks(5);





const chart = svg.append('g')
   .attr('transform', `translate(${margin.left},${margin.top})`);

chart.selectAll(".bar")
   .data(data)
   .enter()
   .append('rect')
   .attr('class','bar')
   .attr('x', d => xScale(d.country))
   .attr('y', d => yScale(d.value)) 
   .attr('height', d => (chartHeight- yScale(d.value)))
   .attr('width', d => xScale.bandwidth())
 //.attr('transform', `translate(${0},${-60})`)
 
   .style('fill', function(d,i) { return colors[i];});

 
 chart.selectAll('.bar-label')
   .data(data)
   .enter()
   .append('text')
   .classed('bar-label', true)
   .attr('x', d => xScale(d.country) + xScale.bandwidth()/3)
   .attr('dx', 0)
   .attr('y', d => yScale(d.value))
   .attr('dy', -6)
   .text(d => d.value)
 .style('fill', function(d,i) { return colors[i];});

 ;
 
 
 chart.append("g").attr("class","X- axis").call(xAxis).attr('transform', `translate(${0},${chartHeight})`);
 chart.append("g").attr("class","y-axis").call(yAxis.tickFormat(d3.format(".0s")))
 
 svg.append("rect").attr("x",width/4+150).attr("y",2)
   .attr("width","20").attr("height","10").attr("fill","#BCBCBC");
 
  
  svg.append("text").attr("x",width/3).attr("y",height-5).text("Countries").style("font-size","12");

}


createLineChart(id,jdata){

  var 
    width = 600,
    height = 300,
    margin = {top: 30, right: 20, bottom: 30, left: 50},
    barPadding = 0.2,
    axisTicks = {qty: 5, outerSize: 0, dateFormat: '%m-%d'};

var svg = d3.select("#"+id)
   .append("svg")
   .attr("width", width)
   .attr("height", height)
   .append("g")
   .attr("transform", `translate(${margin.left},${margin.top})`);

var xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).domain(jdata.map(d => d.country)).padding(barPadding);
//var xScale1 = d3.scaleBand().domain(['var1', 'var2']).range([0, xScale0.bandwidth()]);
var yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]).domain([0, d3.max(jdata, d => d3.max([d.value]))]);
;

var xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize);
var yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);


// Add the X Axis
svg.append("g")
   .attr("class", "x axis")
   .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
   .call(xAxis);

// Add the Y Axis
svg.append("g")
   .attr("class", "y axis")
   .call(yAxis); 

    
    var line1 = d3.line()
  .x(function(d) {
    return xScale0(d.country);
  })
  .y(function(d) {
    return yScale((d.value));
  });

  svg.append("g")
   .attr("class", "x axis")
   .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
   .call(xAxis);

// Add the Y Axis
svg.append("g")
   .attr("class", "y axis")
   .call(yAxis); 

var country = svg.selectAll(".country")
  .data(jdata)
  .enter().append("g")
  .attr("class", "country")
  .attr("transform", d => `translate(${xScale0(d.country)},0)`);

  svg.append('path').attr("class","l1") .attr('d', line1(jdata)).style(
    "stroke","red").style( "fill","white");

}

creatPieChart(id,data){
  var text = "";

var width = 200;
var height = 200;
var thickness = 40;
var duration = 750;
var padding = 10;
var opacity = .8;
var opacityHover = 1;
var otherOpacityOnHover = .8;
var tooltipMargin = 13;

var radius = Math.min(width-padding, height-padding) / 2;
var color = d3.scaleOrdinal(d3.schemeCategory10);



var svg = d3.select("#"+id)
.append('svg')
.attr('class', 'pie')
.attr('width', width)
.attr('height', height);

var g = svg.append('g')
.attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');

var arc = d3.arc()
.innerRadius(0)
.outerRadius(radius);

var pie = d3.pie()
.value(function(d) { return d.value; })
.sort(null);

var path = g.selectAll('path')
  .data(pie(data))
  .enter()
  .append("g")  
  .append('path')
  .attr('d', arc)
  .attr('fill', (d,i) => color(i))
  .style('opacity', opacity)
  .style('stroke', 'white')
  .on("mouseover", function(d) {
      d3.selectAll('path')
        .style("opacity", otherOpacityOnHover);
      d3.select(this) 
        .style("opacity", opacityHover);

      let g = d3.select("svg")
        .style("cursor", "pointer")
        .append("g")
        .attr("class", "tooltip")
        .style("opacity", 0);
 
      g.append("text")
        .attr("class", "country-text")
        .text(`${d.data.country} (${d.data.value})`)
        .attr('text-anchor', 'middle');
    
      let text = g.select("text");
      let bbox = text.node().getBBox();
      let padding = 2;
      g.insert("rect", "text")
        .attr("x", bbox.x - padding)
        .attr("y", bbox.y - padding)
        .attr("width", bbox.width + (padding*2))
        .attr("height", bbox.height + (padding*2))
        .style("fill", "white")
        .style("opacity", 0.75);
    })
  .on("mousemove", function(d) {
        let mousePosition = d3.mouse(this);
        let x = mousePosition[0] + width/2;
        let y = mousePosition[1] + height/2 - tooltipMargin;
    
        let text = d3.select('.tooltip text');
        let bbox = text.node().getBBox();
        if(x - bbox.width/2 < 0) {
          x = bbox.width/2;
        }
        else if(width - x - bbox.width/2 < 0) {
          x = width - bbox.width/2;
        }
    
        if(y - bbox.height/2 < 0) {
          y = bbox.height + tooltipMargin * 2;
        }
        else if(height - y - bbox.height/2 < 0) {
          y = height - bbox.height/2;
        }
    
        d3.select('.tooltip')
          .style("opacity", 1)
          .attr('transform',`translate(${x}, ${y})`);
    })
  .on("mouseout", function(d) {   
      d3.select("svg")
        .style("cursor", "none")  
        .select(".tooltip").remove();
    d3.selectAll('path')
        .style("opacity", opacity);
    })
  .on("touchstart", function(d) {
      d3.select("svg")
        .style("cursor", "none");    
  })
  .each(function(d, i) { this._current = i; });

let legend = d3.select("#"+id).append('div')
			.attr('class', 'legend')
			.style('margin-top', '30px');

let keys = legend.selectAll('.key')
			.data(data)
			.enter().append('div')
			.attr('class', 'key')
			.style('display', 'flex')
			.style('align-items', 'center')
			.style('margin-right', '20px');

		keys.append('div')
			.attr('class', 'symbol')
			.style('height', '10px')
			.style('width', '10px')
			.style('margin', '5px 5px')
			.style('background-color', (d, i) => color(i));

		keys.append('div')
			.attr('class', 'country')
			.text(d => `${d.country} (${d.value})`);

		keys.exit().remove();
}

createScatterPlot(id,data){
  var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#"+id)
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");



  // Add X axis
  var x = d3.scaleLinear()
    .domain([4, 8])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 9])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Color scale: give me a specie name, I return a color
  var color = d3.scaleOrdinal()
    .domain(["setosa", "versicolor", "virginica" ])
    .range([ "#440154ff", "#21908dff", "#fde725ff"])

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.Sepal_Length); } )
      .attr("cy", function (d) { return y(d.Petal_Length); } )
      .attr("r", 5)
      .style("fill", function (d) { return color(d.Species) } )



}
}
