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
       .text(function(d) { return d3.format(",")(d.Valuation)})
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
