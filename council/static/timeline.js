//This script will create the timeline.
//Adapted from the script found here:
//https://github.com/dk8996/Gantt-Chart
//under the Apache License:
//http://www.apache.org/licenses/LICENSE-2.0

d3.gantt = function() {
    var FIT_TIME_DOMAIN_MODE = "fit";
    var FIXED_TIME_DOMAIN_MODE = "fixed";
    
    var margin = {top : 20, right : 40, bottom : 20, left : 50};
    var timeDomainStart = d3.time.day.offset(new Date(),-3);
    var timeDomainEnd = d3.time.hour.offset(new Date(),+3);
    var timeDomainMode = FIT_TIME_DOMAIN_MODE;// fixed or fit
    var councilmembers = [];

    //var departedStyle = [];
    var height = 450;
    var width = 800;

    var tickFormat = "%H:%M";

    var keyFunction = function(d) {
        return d.actual_start_date + d.district + d.actual_end_date;
    };

    var rectTransform = function(d) {
        return "translate(" + x(d.actual_start_date) + "," + y(d.district) + ")";
    };

    var x = d3.time.scale().domain([ timeDomainStart, timeDomainEnd ]).range([ 0, width ]).clamp(true);

    var y = d3.scale.ordinal().domain(councilmembers).rangeRoundBands([ 0, height - margin.top - margin.bottom ], .1);
    
    var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.time.format(tickFormat)).tickSubdivide(true)
        .tickSize(8).tickPadding(8);

    var yAxis = d3.svg.axis().scale(y).orient("left").tickSize(0);

    var initTimeDomain = function() {
        if (timeDomainMode === FIT_TIME_DOMAIN_MODE) {
            if (members === undefined || members.length < 1) {
            timeDomainStart = d3.time.day.offset(new Date(), -3);
            timeDomainEnd = d3.time.hour.offset(new Date(), +3);
            return;
            }
            members.sort(function(a, b) {
            return a.actual_end_date - b.actual_end_date;
            });
            timeDomainEnd = members[members.length - 1].actual_end_date;
            members.sort(function(a, b) {
            return a.actual_start_date - b.actual_start_date;
            });
            timeDomainStart = new Date('1979/01/01');
        }
    };

    
    var initAxis = function() {
        x = d3.time.scale().domain([ timeDomainStart, timeDomainEnd ]).range([ 0, width ]).clamp(true);
        y = d3.scale.ordinal().domain(councilmembers).rangeRoundBands([ 0, height - margin.top - margin.bottom ], .1);
        xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.time.format(tickFormat)).tickSubdivide(true)
            .tickSize(8).tickPadding(8);
        yAxis = d3.svg.axis().scale(y).orient("left").tickSize(0);
    };
    
    function gantt(members) {
        initTimeDomain();
        initAxis();
        
        //in body, create class chart with a width & height
        //create class gantt-chart, give it a width, height, transform
        var svg = d3.select("body")
        .append("svg")
        .attr("class", "chart")
        .attr("width", width + margin.left + margin.right + 200)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("class", "gantt-chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
    
        //define what goes in the tooltip and call it to the svg
        tip = d3.tip().attr('class', 'd3-tip').offset([-10, 0])
          .html(function(d){    
            var formatDate = d3.time.format("%x");
            var termSpan =  ((d.actual_end_date) - (d.actual_start_date))/1000/60/60/24/365
            termSpan = Math.round(termSpan*10)/10
            return (d.councilperson_id_id__first_name + " " + 
                    d.councilperson_id_id__last_name + ": " + 
                    formatDate(d.actual_start_date) + " to " + 
                    formatDate(d.actual_end_date) + "<br>" +
                    termSpan + " years"
                    );
           });
        
        svg.call(tip);

        //select chart, add rectangles & tooltips
        svg.selectAll(".chart")
         .data(members, keyFunction).enter()
         .append("rect")
         //rx & ry set x & y radii
         .attr("rx", 5)
             .attr("ry", 5)
         .attr("class", function(d){ 
             /////////////////if(departedStyle[d.departed] == null){ return "incumbent";}
             if (genderStyle[d.councilperson_id_id__gender] == null) { return "F"; }
             //////////////return departedStyle[d.departed];
             return genderStyle[d.councilperson_id_id__gender];
             }) 
         .attr("y", 0)
         .attr("transform", rectTransform)
         .attr("height", function(d) { return y.rangeBand(); })
         .attr("width", function(d) { 
             return (x(d.actual_end_date) - x(d.actual_start_date)); 
             })
         .on('mouseover', function(d){
            tip.show(d);
            })
         .on('mouseout', function(d){
            tip.hide(d);
            });

         svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0, " + (height - margin.top - margin.bottom) + ")")
            .transition()
            .call(xAxis);
         
         svg.append("svg:g")
            .attr("class", "y axis")
            .transition()
            .call(yAxis);

         svg.append("text")
            .attr("transform", "translate(-200, 0) rotate(-90)")
            .attr("y", 160)
            .attr("x", -190)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-size", "16px")
            .text("District Number");



            //draw legend box, set styles here

        svg.append('rect')
            .attr('rx', 5)
            .attr('ry', 5)
            .attr('fill', 'khaki')
            .attr('width', 170)
            .attr('height', 190)
            .attr('x', width + 20)
            .attr('y', 10);

        //for the legend box
        var color = {
            "defeated": "#F2C249", /* light orange*/
            "resigned" : "#E6772E",  /* orange */
            "retired": "#4DB3B3",  /* light blue */
            "scandal": "#E64A45", /* pinkish red */
            "died": "#3D4C53", /* blue-gray */
            "incumbent": "#888888",
            "M":"yellow",
            "F":"green"
            };

        start_y = 20

        for (i in color) {
            svg.append('rect')
                .attr('rx', 5)
                .attr('ry', 5)
                .attr('width', 50)
                .attr('height', 20)
                .attr('x', width + 30)
                .attr('y', start_y)
                .attr('fill', color[i]);

            svg.append('text')
                .attr('width', 250)
                .attr('height', 20)
                .attr('x', width + 85)
                .attr('y', start_y + 15)
                .style("font-size", "16px") 
                .text(i);
            start_y = start_y + 30;
        }

        return gantt;
        };

    
    gantt.redraw = function(members) {

        initTimeDomain();
        initAxis();

        var svg = d3.select("svg");
        var ganttChartGroup = svg.select(".gantt-chart");
        var rect = ganttChartGroup.selectAll("rect").data(members, keyFunction);
        
        rect.enter()
            .insert("rect",":first-child")
            .attr("rx", 5)
            .attr("ry", 5)
            .attr("class", function(d){ 
            /////////////////if(departedStyle[d.departed] == null)
            ///////////////////   { return "incumbent";}
            //////////////////return departedStyle[d.departed];
            if (genderStyle[d.councilperson_id_id__gender] == null)
                {return "M";}
            return genderStyle[d.councilperson_id_id__gender];



            }) 
            .transition()
            .attr("y", 0)
            .attr("transform", rectTransform)
            .attr("height", function(d) { return y.rangeBand(); })
            .attr("width", function(d) { 
                return (x(d.actual_end_date) - x(d.actual_start_date)); 
             });
        rect.transition()
            .attr("transform", rectTransform)
            .attr("height", function(d) { return y.rangeBand(); })
            .attr("width", function(d) { 
                return (x(d.actual_end_date) - x(d.actual_start_date)); 
             });
            
        rect.exit().remove();

        svg.select(".x").transition().call(xAxis);
        svg.select(".y").transition().call(yAxis);
    
        return gantt;
    };//end gantt.redraw

    gantt.margin = function(value) {
       if (!arguments.length)
          return margin;
        margin = value;
        return gantt;
    };

    gantt.timeDomain = function(value) {
        if (!arguments.length)
            return [ timeDomainStart, timeDomainEnd ];
        timeDomainStart = +value[0], timeDomainEnd = +value[1];
        return gantt;
    };

    /**
     * @param {string}
     *                vale The value can be "fit" - the domain fits the data or
     *                "fixed" - fixed domain.
     */
    gantt.timeDomainMode = function(value) {
        if (!arguments.length)
            return timeDomainMode;
        timeDomainMode = value;
        return gantt;
    };

    gantt.councilmembers = function(value) {
        if (!arguments.length)
            return councilmembers;
        councilmembers = value;
        return gantt;
    };
    
    //////////////////// gantt.departedStyle = function(value) {
    //     if (!arguments.length)
    //         return departedStyle;
    //     departedStyle = value;
    //     return gantt;
    ///////////////// };

    gantt.genderStyle = function(value) {
        if (!arguments.length)
            return genderStyle
        genderStyle = value;
        return gantt;
    };

    gantt.width = function(value) {
        if (!arguments.length)
            return width;
        width = +value;
        return gantt;
    };

    gantt.height = function(value) {
        if (!arguments.length)
            return height;
        height = +value;
        return gantt;
    };

    gantt.tickFormat = function(value) {
        if (!arguments.length)
            return tickFormat;
        tickFormat = value;
        return gantt;
    };

    return gantt;
};


