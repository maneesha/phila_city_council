// <!-- Now comes some highly repetitive javascript -->
// <!-- RACE CHART  -->


var race_colors = d3.scale.ordinal()
  .range(["#1B9E77", "#D95F02", "#7570B3", "#E7298A", "#888888"])


var make_bar_chart = function(demographic_data, django_var, chart_id, demographic_colors, infobox_id) {

series = demographic_data.map(function (d) {
        //define what you're counting by 
        //used only for the legend
        return d[django_var];
    }),

dataset = demographic_data.map(function (d) {
        return d.values.map(function (o, i) {
            // Structure it so that your numeric
            // axis (the stacked amount) is y
            return {
                //all the data that's going to be used in the chart
                //y-axis has the count; x-axis has the year; also passing in names for tooltips
                y: o.count,
                x: o.year,
                n: o.names_list
            };
        });
    }),

stack = d3.layout.stack();

stack(dataset);  //d3 stack function on the dataset defined & modified above

var svg = d3.select(chart_id)
    .append('svg')
    .attr('width', width + margins.left + margins.right + legendPanel.width)
    .attr('height', height + margins.top + margins.bottom)
    .append('g')
    .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')'),

yMax = d3.max(dataset, function (group) {
    return d3.max(group, function (d) {
        return d.y + d.y0;
    });
}),

yScale = d3.scale.linear()
    .domain([0, yMax])
    .range([height, 0]),

years = dataset[0].map(function (d) {
    return d.x;
}),

xScale = d3.scale.ordinal()
    .domain(years)
    .rangeRoundBands([0, width], .1),

xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom'),

yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left'),

colours = demographic_colors,




groups = svg.selectAll('g')
    .data(dataset)
    .enter()
    .append('g')
    .style('fill', function (d, i) {
    return colours(i);
}),



rects = groups.selectAll('rect')
    .data(function (d) {
        return d;
        })
    .enter()
    .append('rect')
    .attr('x', function (d) {
        return xScale(d.x);
        })
    .attr('y', function (d) {
        return yScale(d.y0 + d.y);
        })
    .attr('height', function (d) {
        return yScale(d.y0) - yScale(d.y0 + d.y);
        })
    .attr('width', function (d) {
        return xScale.rangeBand();
        })
    .on('mouseover', function (d) {
        d3.select(infobox_id)
            .text("Councilmembers: " + d.n);
        d3.select(infobox_id).classed('hidden', false);
        })
    .on('mouseout', function (d) {
        d3.select(infobox_id)
        .text("Councilmembers: ")
    })

//draw xAxis, apply styles defined above
svg.append('g')
    .attr('class', 'axis')
    .attr("transform", "translate(0," + (height) + ")")
    .call(xAxis);

//draw yAxis, apply styles defined above
svg.append('g')
    .attr('class', 'axis')
    .call(yAxis);

//Create Y axis label
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0-margins.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Count");

//Create X axis label   
svg.append("text")
.attr("x", width / 2 )
    .attr("y",  height + margins.bottom)
    .style("text-anchor", "middle")
    .text("Year");


//Create Title 
svg.append("text")
.attr("x", width / 2 )
    .attr("y", height/2 - 175)
    .attr("class", "title")
    .style("text-anchor", "middle")
    .text("Councilmembers by ");

//draw legend box, set styles here
svg.append('rect')
    .attr('fill', 'khaki')
    .attr('width', 250)
    .attr('height', 30 * dataset.length)
    .attr('x', width + margins.left - 35)
    .attr('y', 0);

//fill legend box with actual legend
series.forEach(function (s, i) {
    svg.append('text')
        .attr('fill', 'black')
        .attr('x', width + margins.left -30)
        .attr('y', i * 24 + 24)
        .text(s);
    svg.append('rect')
        .attr('fill', colours(i))
        .attr('width', 50)
        .attr('height', 20)
        .attr('x', width + margins.left +  55)
        .attr('y', i * 24 + 6);
});


}


var councilperson_id_id__race = 'councilperson_id_id__race';   
make_bar_chart(race_dataset, councilperson_id_id__race, '#race-chart', race_colors, '#race-names');

/*


<!-- GENDER CHART  -->
<script>

var dataset = {{ genders|safe }};
   
series = dataset.map(function (d) {
        //define what you're counting by 
        //used only for the legend
        return d.councilperson_id_id__gender;
    }),

dataset = dataset.map(function (d) {
        return d.values.map(function (o, i) {
            // Structure it so that your numeric
            // axis (the stacked amount) is y
            return {
                //all the data that's going to be used in the chart
                //y-axis has the count; x-axis has the year; also passing in names for tooltips
                y: o.count,
                x: o.year,
                n: o.names_list
            };
        });
    }),

stack = d3.layout.stack();

stack(dataset);  //d3 stack function on the dataset defined & modified above

var svg = d3.select('#gender-chart')
    .append('svg')
    .attr('width', width + margins.left + margins.right + legendPanel.width)
    .attr('height', height + margins.top + margins.bottom)
    .append('g')
    .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')'),

yMax = d3.max(dataset, function (group) {
    return d3.max(group, function (d) {
        return d.y + d.y0;
    });
}),

yScale = d3.scale.linear()
    .domain([0, yMax])
    .range([height, 0]),


years = dataset[0].map(function (d) {
    return d.x;
}),

xScale = d3.scale.ordinal()
    .domain(years)
    .rangeRoundBands([0, width], .1),

xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom'),

yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left'),

colours = d3.scale.ordinal()
  .range(["#CCCC33", "#009933", "#888888"]),

groups = svg.selectAll('g')
    .data(dataset)
    .enter()
    .append('g')
    .style('fill', function (d, i) {
    return colours(i);
}),

rects = groups.selectAll('rect')
    .data(function (d) {
        return d;
        })
    .enter()
    .append('rect')
    .attr('x', function (d) {
        return xScale(d.x);
        })
    .attr('y', function (d) {
        return yScale(d.y0 + d.y);
        })
    .attr('height', function (d) {
        return yScale(d.y0) - yScale(d.y0 + d.y);

        })
    .attr('width', function (d) {
        return xScale.rangeBand();
        })
    .on('mouseover', function (d) {
        d3.select('#gender-names')
            .text("Councilmembers: " + d.n);

        d3.select('#gender-names').classed('hidden', false);
        })
    .on('mouseout', function () {
        d3.select('#gender-names')        
        .text("Councilmembers: ");

    })

//draw xAxis, apply styles defined above
svg.append('g')
    .attr('class', 'axis')
    .attr("transform", "translate(0," + (height) + ")")
    //.attr('transform', 'translate(0,' + (height) + ')')
    .call(xAxis);

//draw yAxis, apply styles defined above
svg.append('g')
    .attr('class', 'axis')
    .call(yAxis);

//Create Y axis label
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0-margins.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Count");

//Create X axis label   
svg.append("text")
.attr("x", width / 2 )
    .attr("y",  height + margins.bottom)
    .style("text-anchor", "middle")
    .text("Year");


//Create Title 
svg.append("text")
.attr("x", width / 2 )
    .attr("y", height/2 - 175)
    .attr("class", "title")
    .style("text-anchor", "middle")
    .text("Councilmembers by Gender");

//draw legend box, set styles here
svg.append('rect')
    .attr('fill', 'khaki')
    .attr('width', 250)
    .attr('height', 30 * dataset.length)
    .attr('x', width + margins.left - 35)
    .attr('y', 0);

//fill legend box with actual legend
series.forEach(function (s, i) {
    svg.append('text')
        .attr('fill', 'black')
        .attr('x', width + margins.left -30)
        .attr('y', i * 24 + 24)
        .text(s);
    svg.append('rect')
        .attr('fill', colours(i))
        .attr('width', 50)
        .attr('height', 20)
        .attr('x', width + margins.left +  55)
        .attr('y', i * 24 + 6);
});

</script>

<!-- PARTY CHART  -->
<script>

var dataset = {{ parties|safe }};
   
series = dataset.map(function (d) {
        //define what you're counting by 
        //used only for the legend
        return d.party;
    }),

dataset = dataset.map(function (d) {
        return d.values.map(function (o, i) {
            // Structure it so that your numeric
            // axis (the stacked amount) is y
            return {
                //all the data that's going to be used in the chart
                //y-axis has the count; x-axis has the year; also passing in names for tooltips
                y: o.count,
                x: o.year,
                n: o.names_list
            };
        });
    }),

stack = d3.layout.stack();

stack(dataset);  //d3 stack function on the dataset defined & modified above

var svg = d3.select('#party-chart')
    .append('svg')
    .attr('width', width + margins.left + margins.right + legendPanel.width)
    .attr('height', height + margins.top + margins.bottom)
    .append('g')
    .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')'),

yMax = d3.max(dataset, function (group) {
    return d3.max(group, function (d) {
        return d.y + d.y0;
    });
}),

yScale = d3.scale.linear()
    .domain([0, yMax])
    .range([height, 0]),

years = dataset[0].map(function (d) {
    return d.x;
}),

xScale = d3.scale.ordinal()
    .domain(years)
    .rangeRoundBands([0, width], .1),

xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom'),

yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left'),

colours = d3.scale.ordinal()
  .range(["#377EB8", "#E41A1C", '#888888']),

groups = svg.selectAll('g')
    .data(dataset)
    .enter()
    .append('g')
    .style('fill', function (d, i) {
    return colours(i);
}),

rects = groups.selectAll('rect')
    .data(function (d) {
        return d;
        })
    .enter()
    .append('rect')
    .attr('x', function (d) {
        return xScale(d.x);
        })
    .attr('y', function (d) {
        return yScale(d.y0 + d.y);
        })
    .attr('height', function (d) {
        return yScale(d.y0) - yScale(d.y0 + d.y);

        })
    .attr('width', function (d) {
        return xScale.rangeBand();
        })
    .on('mouseover', function (d) {
        d3.select('#party-names')
            .text("Councilmembers: " + d.n);

        d3.select('#party-names').classed('hidden', false);
        })
    .on('mouseout', function () {
        d3.select('#party-names')        
        .text("Councilmembers: ")

    })

//draw xAxis, apply styles defined above
svg.append('g')
    .attr('class', 'axis')
    .attr("transform", "translate(0," + (height) + ")")
    //.attr('transform', 'translate(0,' + (height) + ')')
    .call(xAxis);

//draw yAxis, apply styles defined above
svg.append('g')
    .attr('class', 'axis')
    .call(yAxis);

//Create Y axis label
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0-margins.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Count");

//Create X axis label   
svg.append("text")
.attr("x", width / 2 )
    .attr("y",  height + margins.bottom)
    .style("text-anchor", "middle")
    .text("Year");

//Create Title 
svg.append("text")
.attr("x", width / 2 )
    .attr("y", height/2 - 175)
    .attr("class", "title")
    .style("text-anchor", "middle")
    .text("Councilmembers by Party");


//draw legend box, set styles here
svg.append('rect')
    .attr('fill', 'khaki')
    .attr('width', 175)
    .attr('height', 30 * dataset.length)
    .attr('x', width + margins.left - 35)
    .attr('y', 0);

//fill legend box with actual legend
series.forEach(function (s, i) {
    svg.append('text')
        .attr('fill', 'black')
        .attr('x', width + margins.left -30)
        .attr('y', i * 24 + 24)
        .text(s);
    svg.append('rect')
        .attr('fill', colours(i))
        .attr('width', 50)
        .attr('height', 20)
        .attr('x', width + margins.left + 55)
        .attr('y', i * 24 + 6);
});

</script>

*/