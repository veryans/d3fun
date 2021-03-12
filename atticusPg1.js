

           d3.select('#pageTitle')
       .append("text")
          .text("Overview")
          //.style("color","black")
          .style("font-size", "24px")
          .style("font-weight", "bold")
           .attr("transform", "translate(5,10)");
           
      d3.select('#addressLine')
       .append("text")
          .text(avmResult.address)
          .style("color","#bcbdc8")
      .attr("transform", "translate(5,10)");





          // append the svg object to the body of the page
     topBanner = d3.select("#topBanner") 
        .append("svg")
        .attr("width", 810)
        .attr("height", 140);


     var gradient = topBanner.append("defs")
     .append("linearGradient")
       .attr("id", "gradient")
       .attr("x1", "0%")
       .attr("y1", "0%")
       .attr("x2", "0%")
       .attr("y2", "100%");


       gradient.append("stop")
           .attr("offset", "0%")
           .attr("stop-color", "#5FC7C0")
           .attr("stop-opacity", 1);

       gradient.append("stop")
           .attr("offset", "100%")
           .attr("stop-color", "#50B1B7")
           .attr("stop-opacity", 1);

       topBanner.append('rect')
        .attr("width", 810)
        .attr("height", 120)
          .style('fill','url(#gradient)') 
                 .attr("transform", "translate(5,10)");

          var topBannerData = 
       [
         {description: "Market value estimate, Resimetrics AVM", data: "€" +  avmResult.avmValuation + "k", xpos:0},
         {description: "AVM value range", data:"€" + avmResult.avmValuationRangeLow + "k-€"+avmResult.avmValuationRangeHigh+"k", xpos:1,},
         {description: "Confidence level", data:avmResult.confidence, xpos:2, },
         {description: "Valuation date", data:avmResult.valuationDate, xpos:3}
       ];


       var topBannerScale = d3.scaleLinear()
       .domain([0,4]) 
       .range([0, 810]);


           topBanner.append("g")
           .selectAll('text')
           .data(topBannerData)
           .enter() 
           .append('text')
           .attr('x', function(d) { return topBannerScale(d.xpos); })
           .attr('y', 0)
           .attr('dy',"1em")
           .text(function(d) { return d.description; })
           .attr("transform", "translate(25,25)")
           .style("fill", "white")
             .call(wrap,150);

           topBanner.append("g")
           .selectAll('text')
           .data(topBannerData)
           .enter() 
           .append('text')
             //.attr("class", "circleKey")
           .attr('x', function(d) { return topBannerScale(d.xpos); })
           .attr('y', 37)
           .attr('dy',"1em")
           .text(function(d)  { return d.data; })
           .attr("transform", "translate(27,25)")
           .style("fill", "white")
           .style("font-size", 24)

           topBanner.append("g")
           .append('text')
           .text('This property has been valued using Resimetrics Automated Valuation Model (AVM).')
             .attr("transform", "translate(25,115)")
                 .style("fill", "white")
                 .style("font-size", 12);






      var circleKeyData = 
       [
         {dataSource: "Resimetrics", xpos:0, colour: "#5BC0BD"},
         {dataSource: "Property listings", xpos:.58,  colour: "#81B8F9"},
         {dataSource: "Sales records", xpos:1.32, colour: "#9C78D0"},
         {dataSource: "Historic valuations", xpos:1.95, colour: "#B3B4C0"},
         {dataSource: "Professional valuations", xpos:2.77, colour: "#336DD1"}
       ];

         var circleKeyScale = d3.scaleLinear()
           .domain([0,4]) 
           .range([0, 700]);

           // append the svg object to the body of the page
         circleKey = d3.select("#circleKey")


          .append("svg")
            .attr("width", 900)
            .attr("height", 30);  


         circleKey.append("g")
           .selectAll('circle')
           .data(circleKeyData)
           .enter() 
           .append('circle')
           .attr('r', circleSize)
           .attr('cx', function(d) { return circleKeyScale(d.xpos); })
           .attr("transform", "translate(10,20)")
           .style("fill", function(d) { return d.colour; } );

         circleKey.append("g")
           .selectAll('text')
           .data(circleKeyData)
           .enter() 
           .append('text')
             .attr("class", "circleKey")
           .attr('x', function(d) { return circleKeyScale(d.xpos)+9; })
           .attr('y', 4.5)
           .text(function(d) { return d.dataSource; })
           .attr("transform", "translate(10,20)")
           .style("fill", function(d) { return d.colour; } );







       var avmValuationRange = "(" + avmResult.avmValuationRangeLow + "k-"+avmResult.avmValuationRangeHigh+"k)"
       var avmValuationSquRange = "(" + avmResult.avmValuationRangeLowSqu + "k-"+avmResult.avmValuationRangeHighSqu+"k)"


      // set the dimensions and margins of the lollipop graph
       var lollipop1Margin = {top:4, right: 20, bottom: 40, left: 220},
           lollipop1Width = 550 - lollipop1Margin.left - lollipop1Margin.right,
           lollipop1Height = 200 - lollipop1Margin.top - lollipop1Margin.bottom;

       var svgCanvas1Height = lollipop1Height + lollipop1Margin.top + lollipop1Margin.bottom;
       var svgCanvas1Width = 900

        // append the svg object to the body of the page
     lineAndTitle1 = d3.select("#lineAndTitle1")

        .append("svg")
        .attr("width", 810)
        .attr("height", 40);


        svgCanvasTitle = lineAndTitle1.append("g")
         .append("line")
            .style("stroke", "lightgrey")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 810)
            .attr("y2", 0)
             .attr("transform", "translate(5,10)");

        svgCanvasTitle = lineAndTitle1.append("g")
         .append("text")
         .text("Subject property values, €")
           .attr("transform", "translate(5,30)");



     // append the svg object to the body of the page
     svgCanvas1 = d3.select("#svgCanvas1")


      .append("svg")
        .attr("width", svgCanvas1Width)
        .attr("height", svgCanvas1Height);


      lollipop1 = svgCanvas1.append("g")
          .attr("transform",
                "translate(" + lollipop1Margin.left + "," + lollipop1Margin.top + ")");




      // Parse the URL data for valuations
      d3.csv(valuationsUrl, function(data)

           { 

     // this adds a blank row so that we get the gap between the AVM result and the rest
      var dataPushed = data;
      var row1 = [dataPushed.shift()];

      var rowBlank = {ValuationType: "", ValuationMethod: "", Valuation: " ", ValuationDate: " "};
      var dataPushed = row1.concat(rowBlank).concat(dataPushed);

      var circleColorRange = [ ,"#5BC0BD" ,, "#81B8F9", "#9C78D0", "#B3B4C0", "#B3B4C0", "#B3B4C0"]
      var circleColor = d3.scaleOrdinal()
      .domain(function(d) { return d.ValuationType})
      .range(circleColorRange);

      var circleValueColorRange = [ ,"#4EADB6" ,, "#81B8F9", "#9C78D0", "#797B90", "#797B90", "#797B90"]
      var circleValueColor = d3.scaleOrdinal()
      .domain(function(d) { return d.ValuationType})
      .range(circleValueColorRange);

  //console.log(circleValueColor)


      //To set the domain of the x axis we need to find the max
      var maxValuation = d3.max(dataPushed, function(d) { return +d.Valuation;} );



      // Add X axis
      var x = d3.scaleLinear()
        .domain([0, maxValuation])
        .range([ 0, lollipop1Width]);


     // Y axis
     var y = d3.scaleBand()
     .domain(dataPushed.map(function(d) { return d.ValuationType})) 
     .range([ 0, lollipop1Height ])
      .padding(1);


     lollipop1.append("g")
        .attr("class", "axisHidden")
        .call(d3.axisLeft(y).tickSize(0))
        .selectAll("text")
          .attr("transform", "translate(-20)")
          .attr("class","lables")
          .style('fill', function(d) {
                         if (d == "MV Estimate (AVM)") {
                             return "#5BC0BD"
                         } else {
                             return "#202347";
                         }
                     })


     // this creates the "new" Y axis
      var maxY = d3.max(dataPushed, function(d) { return y(d.ValuationType);} );
      var minY = d3.min(dataPushed, function(d) { return y(d.ValuationType);} );
        lollipop1.append('line')
            .style("stroke", "grey")
        .style("stroke-linecap", "round")
            .attr("x1", 0)
            .attr("y1", minY)
            .attr("x2", 0)
            .attr("y2", maxY);



     // Lollipop Lines (couldn't get class to work here #tidyupatsomepoint)
     lollipop1.selectAll("myline")
      .data(dataPushed)
      .enter()
      .append("line")
        .attr("x1", function(d) { return x(d.Valuation); })
        .attr("x2", x(0))
        .attr("y1", function(d) { return y(d.ValuationType); })
        .attr("y2", function(d) { return y(d.ValuationType); })
          .attr('stroke', function(d) {
                         if (d.ValuationType == "MV Estimate (AVM)") {
                             return "#B5E7E9"
                         } else {
                             return "#D2D3DA ";
                         }
                     })
          .attr('stroke-width', 2)




     //MV Estimate plumb line
     lollipop1.selectAll("plumbline")
      .data(dataPushed.filter(function(d){return d.ValuationType == "MV Estimate (AVM)";}))
      .enter()
      .append("line")
        .attr("x1", function(d) { return x(d.Valuation); })
        .attr("x2", function(d) { return x(d.Valuation); })
        .attr("y1", function(d) { return y(d.ValuationType); })
        .attr("y2", function(d) { return y(d.ValuationType)+150; })
        .attr("stroke", "#B5E7E9")

     //MV Estimate plumb line weight
     lollipop1.selectAll("PlumblineWeight")
      .data(dataPushed.filter(function(d){return d.ValuationType == "MV Estimate (AVM)";}))
      .enter()
        .append("circle")
          .attr("cx", function(d) { return x(d.Valuation); })
          .attr("cy", function(d) { return y(d.ValuationType)+150; })
          .attr("r", circleSize)
        .attr("fill", "#5BC0BD")

        //This creates the value range bar
       lollipop1.selectAll("avmValRangeBar")
      .data(dataPushed.filter(function(d){return d.ValuationType == "MV Estimate (AVM)";}))
      .enter()
      .append("line")
        .attr("x1", function(d) { return x(avmResult.avmValuationRangeLow); })
        .attr("x2", function(d) { return x(avmResult.avmValuationRangeHigh); })
        .attr("y1", function(d) { return y(d.ValuationType); })
        .attr("y2", function(d) { return y(d.ValuationType); })
          .attr('stroke',  "#B5E7E9")
          .attr('stroke-width', circleSize*2)
          .style("stroke-linecap", "round")



     // Circles
     lollipop1.selectAll("circles")
      .data(dataPushed)
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.Valuation); })
        .attr("cy", function(d) { return y(d.ValuationType); })
        .attr("r", circleSize)
        .style('fill', function(d) {return circleColor(d.ValuationType); })
          .style('display', function(d) {
                         if (x(d.Valuation) === 0) {
                             return "none";
                         } else {
                             return "visible";
                         }
                     })

     // Values next to circles
     lollipop1.selectAll("textLables")
      .data(dataPushed)
      .enter()
      .append("text")
        .attr("x", function(d) {
                         if (d.ValuationType == "MV Estimate (AVM)") {
                             return  x(avmResult.avmValuationRangeHigh)+18
                         } else {
                             return x(d.Valuation)+18
                         }
                     })
        .attr("y", function(d) { return y(d.ValuationType)+5; })
        .text(function(d) { return d.Valuation+"k"})
        .style('fill', function(d) {return circleValueColor(d.ValuationType); })

          .style('display', function(d) {
                         if (x(d.Valuation) == 0) {
                             return "none";
                         } else {
                             return "visible";
                         }
                     })
          .style('font-weight', function(d) {
                         if (d.ValuationType == "MV Estimate (AVM)") {
                             return "bold"
                         } else {
                             return "normal";
                         }
                     })


     // AVM Value Range
     lollipop1.selectAll("avmValRange")
      .data(dataPushed.filter(function(d){return d.ValuationType == "MV Estimate (AVM)";}))
      .enter()
      .append("text")
        .attr("x", function(d) { return x(avmResult.avmValuationRangeHigh)+57})
        .attr("y", function(d) { return y(d.ValuationType)+5; })
        .text(avmValuationRange)
        .style('fill', function(d) {return circleColor(d.ValuationType); })



     //////now the data tablen on the right
       var table1OriginX = 400 + lollipop1Margin.left + lollipop1Margin.right,
           table1OriginY = lollipop1Margin.top,
           table1Margin = {top: 10, right: 50, bottom: 40, left: 220},
           table1Width = 250 - lollipop1Margin.right,
           table1Height = 250 - lollipop1Margin.top - lollipop1Margin.bottom;


      // set up the plot area
      table1 = svgCanvas1.append("g")
          .attr("transform", 
                "translate(" + table1OriginX + "," + table1OriginY + ")");
        /*   
                    var svgCanvas1Border = table1.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("height", table1Height)
                .attr("width", table1Width)
                .style("stroke", "grey")
                .style("fill", "none")
                .style("stroke-width", 3);
         */

        //Valuation type (methods) column
        table1.selectAll("tablelables")

       var yscale = d3.scaleLinear() 
         .domain([0, dataPushed.length-1]) 
         .range([0,maxY-minY]); 

       var y_axis = d3.axisRight().scale(yscale) 
       .tickValues(d3.range(0, dataPushed.length)) 
       .tickFormat((d, i) => dataPushed.map(function(d) { return d.ValuationMethod;})[i])
           .tickSize(0);

       table1.append("g") 
         .attr("transform", "translate(0, 18)") 
         .call(y_axis)
                 .attr("class", "axisHidden")
                        .selectAll("text")
                        .attr("class","lables")
                        .style('fill', function(d) {
                                           if (d == 0) {
                                               return "#5BC0BD"
                                           } else {
                                               return "#202347";
                                           }
                                       })

        //Valuation Date column
        table1.selectAll("tablelables")

       var yscale = d3.scaleLinear() 
         .domain([0, dataPushed.length-1]) 
         .range([0,maxY-minY]); 

       var y_axis = d3.axisRight().scale(yscale) 
       .tickValues(d3.range(0, dataPushed.length)) 
       .tickFormat((d, i) => dataPushed.map(function(d) { return d.ValuationDate;})[i])
           .tickSize(0);

       table1.append("g") 
         .attr("transform", "translate(100, 18)") 
         .call(y_axis)
                 .attr("class", "axisHidden")
                        .selectAll("text")
                        .attr("class","lables")
                        .style('fill', function(d) {
                                           if (d == 0) {
                                               return "#5BC0BD"
                                           } else {
                                               return "#202347";
                                           }
                                       })





       //Column heading Valuation TYpe
            table1.selectAll("text")
              table1.append("text")
               .attr("transform", "translate(3,3)")
                .text("VALUATION TYPE")
                 .attr("class","columnHeadings")

        //Column heading Valuation Date
        table1.selectAll("text")
              table1.append("text")
               .attr("transform", "translate(103,3)")
                .text("DATE")
                .attr("class","columnHeadings")

   })  
      ///////////////////////////////////
      
            // append the svg object to the body of the page
     lineAndTitle2 = d3.select("#lineAndTitle2")
   
        .append("svg")
        .attr("width", 810)
        .attr("height", 40);


        svgCanvasTitle2 = lineAndTitle2.append("g")
         .append("line")
            .style("stroke", "lightgrey")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 810)
            .attr("y2", 0)
             .attr("transform", "translate(5,10)");

        svgCanvasTitle2 = lineAndTitle2.append("g")
         .append("text")
         .text("Subject property values, € per m²")
           .attr("transform", "translate(5,30)");
        
       var valuationsSquUrl = "https://raw.githubusercontent.com/veryans/d3fun/main/AtticusSquFt.csv"

        var Lollipop2 = d3.csv(valuationsSquUrl, function(data) {
        
        //build a new array that has the right gaps and includes the avm result
        var ValuationsSqu = data,
            newFirstRow = [{ValuationType: "MV Estimate (AVM)", ValuationMethod: "AVM", Valuation: avmResult.avmValuationSqu, ValuationDate: "31 Dec 2019"}],
            blankRow = [{ValuationType: "", ValuationMethod: "", Valuation: "", ValuationDate: ""}],
            ValuationsSqu = blankRow.concat(data.slice(-3)),
            ValuationsSqu = data.slice(6,-3).concat(ValuationsSqu),
            ValuationsSqu = blankRow.concat(ValuationsSqu),
            ValuationsSqu = data.slice(3,-6).concat(ValuationsSqu),
            ValuationsSqu = blankRow.concat(ValuationsSqu),
            ValuationsSqu = data.slice(0,-9).concat(ValuationsSqu),
            ValuationsSqu = blankRow.concat(ValuationsSqu),
            ValuationsSqu = newFirstRow.concat(ValuationsSqu),
          
            lollipop2Height = 300    
   
            y = d3.scaleLinear()
                .domain([0,16])
                .range([0,lollipop2Height])      

         
        //Add the list of valuations
        svgCanvas2 = d3.select("#svgCanvas2")
        .append("svg")
        .attr("width", 810)
        .attr("height", 500);
          
          
     // Valuation Type Lables
         svgCanvas2.append("g")
           .selectAll("text")
           .data(ValuationsSqu)
           .enter()
           .append("text")
           .attr("class","lables")
           .text(function(d) {return d.ValuationType;})
           .attr('y', function(d, i) {return y(i);}) 
           .style('fill', function(d) {
                         if (d.ValuationType == "MV Estimate (AVM)") {
                                 return "rgb(91, 192, 189)"
                             } else {
                                 return "rgb(32, 35, 71)"
                             }})
           .attr("transform", "translate(197,30)")
           .attr("text-anchor", "end");
          
          var maxValuationSqu = d3.max(ValuationsSqu, function(d) { return +d.Valuation;} )
              
              
          // Add X axis
          var x = d3.scaleLinear()
            .domain([0, maxValuationSqu])
            .range([ 0, lollipop1Width]);
          
          
          var ValuationsSquColours = [,"#5BC0BD",,"#B3B4C0","#B3B4C0","#B3B4C0","#81B8F9","#81B8F9","#81B8F9","#9C78D0","#9C78D0","#9C78D0","#336DD1","#336DD1","#336DD1"]
          var ValuationsSquColoursScale = d3.scaleOrdinal()
          .domain(function(d) { return d.ValuationType})
          .range(ValuationsSquColours); 
          

          
          
              // this creates the Y axis
        svgCanvas2.append('line')
            .style("stroke", "grey")
            .style("stroke-linecap", "round")
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", 0)
                .attr("y2", lollipop2Height)
                .attr("transform", "translate(220, 26)");
          
          
              svgCanvas2.selectAll("g")
              .selectAll("lines")
              .data(ValuationsSqu)
              .enter()
              .append("line")
                .attr("x1", function(d) { return x(d.Valuation)-20; })
                .attr("x2", x(0))
                .attr("y1", function(d, i) {return y(i);})
                .attr("y2", function(d, i) {return y(i);})
                .attr('stroke', function(d) {
                              if (d.ValuationType == "MV Estimate (AVM)") {
                                return "#B5E7E9"
                              } else {
                                return "#D2D3DA ";
                              }
                            })
                  .style('display', function(d) {
                         if (x(d.Valuation) === 0) {
                             return "none";
                         } else {
                             return "visible";
                         }
                     })
                  .attr('stroke-width', 2)
                  .attr("transform", "translate(220, 26)");
          
          
     //MV Estimate plumb line
     svgCanvas2.selectAll("plumbline")
      .data(ValuationsSqu.filter(function(d){return d.ValuationType == "MV Estimate (AVM)";}))
      .enter() 
      .append("line")
        .attr("x1", function(d) { return x(d.Valuation); })
        .attr("x2", function(d) { return x(d.Valuation); })
        .attr("y1", function(d, i) {return y(i); })
        .attr("y2", function(d, i) {return y(i)+350; })
        .attr("stroke", "#B5E7E9")
        .attr("transform", "translate(200, 26)")
      
         //MV Estimate plumb line weight
     svgCanvas2.selectAll("PlumblineWeight")
      .data(ValuationsSqu.filter(function(d){return d.ValuationType == "MV Estimate (AVM)";}))
      .enter()
        .append("circle")
          .attr("cx", function(d) { return x(d.Valuation); })
          .attr("cy", function(d, i) {return y(i)+350; })
          .attr("r", circleSize)
        .attr("fill", "#5BC0BD")
        .attr("transform", "translate(200, 26)")
       
        //This creates the value range bar
       svgCanvas2.selectAll("avmValRangeBar")
      .data(ValuationsSqu.filter(function(d){return d.ValuationType == "MV Estimate (AVM)";}))
      .enter()
      .append("line")
        .attr("x1", function(d) { return x(avmResult.avmValuationRangeLowSqu); })
        .attr("x2", function(d) { return x(avmResult.avmValuationRangeHighSqu); })
        .attr("y1", function(d, i) {return y(i); })
        .attr("y2", function(d, i) {return y(i); })
          .attr('stroke',  "#B5E7E9")
          .attr('stroke-width', circleSize*2)
          .style("stroke-linecap", "round")
              .attr("transform", "translate(200, 26)")
          
          
          
         //Add the circles
         svgCanvas2.append("g") 
           .selectAll("circles")
           .data(ValuationsSqu)
           .enter()
           .append("circle")
                .attr("cx", function (d) {return x(d.Valuation)})
                .attr("cy", function(d, i) {return y(i);})
                .attr("r", circleSize)
                .attr("fish", function(d) {return d;})

                     .style('display', function(d) {
                         if (x(d.Valuation) === 0) {
                             return "none";
                         } else {
                             return "visible";
                         }
                     })
                 .style('fill', function(d) {return ValuationsSquColoursScale(d.ValuationType); })
           .attr("transform", "translate(200, 26)");
           
          
     // Values next to circles
     svgCanvas2.selectAll("textLables")
      .data(ValuationsSqu)
      .enter()
      .append("text")
        .attr("x", function(d) {
                         if (d.ValuationType == "MV Estimate (AVM)") {
                             return  x(avmResult.avmValuationRangeHighSqu)+18
                         } else {
                             return x(d.Valuation)+18
                         }
                     })
        .attr("y", function(d, i) {return y(i)+5;})
        .text(function(d) { return d.Valuation+"k"})
         .attr("transform", "translate(200, 26)")
                         .style('display', function(d) {
                         if (x(d.Valuation) === 0) {
                             return "none";
                         } else {
                             return "visible";
                         }
                     })

          .style('font-weight', function(d) {
                         if (d.ValuationType == "MV Estimate (AVM)") {
                             return "bold"
                         } else {
                             return "normal";
                         }
                     })
           .style('fill', function(d) {return ValuationsSquColoursScale(d.ValuationType); })
     
     
     // AVM Value Range
     svgCanvas2.selectAll("avmValRange")
      .data(ValuationsSqu.filter(function(d){return d.ValuationType == "MV Estimate (AVM)";}))
      .enter()
      .append("text")
        .attr("x", function(d) { return x(avmResult.avmValuationRangeHighSqu)+67})
        .attr("y", function(d, i) {return y(i)+5; })
        .text(avmValuationSquRange)
        .style('fill', function(d) {return ValuationsSquColoursScale(d.ValuationType); })
        .attr("transform", "translate(200, 26)");
          
          
     // Valuation Method Lables
         svgCanvas2.append("g")
           .selectAll("text")
           .data(ValuationsSqu)
           .enter()
           .append("text")
           .attr("class","lables")
           .text(function(d) {return d.ValuationMethod;})
           .attr('y', function(d, i) {return y(i);}) 
           .style('fill', function(d) {
                         if (d.ValuationType == "MV Estimate (AVM)") {
                                 return "rgb(91, 192, 189)"
                             } else {
                                 return "rgb(32, 35, 71)"
                             }})
           .attr("transform", "translate(643,30)")     
         
     // Valuation Method Dates
         svgCanvas2.append("g")
           .selectAll("text")
           .data(ValuationsSqu)
           .enter()
           .append("text")
           .attr("class","lables")
           .text(function(d) {return d.ValuationDate;})
           .attr('y', function(d, i) {return y(i);}) 
           .style('fill', function(d) {
                         if (d.ValuationType == "MV Estimate (AVM)") {
                                 return "rgb(91, 192, 189)"
                             } else {
                                 return "rgb(32, 35, 71)"
                             }})
           .attr("transform", "translate(743,30)")  
          
          
          
  });   
         