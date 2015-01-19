//Set width, height, radius, angle for all charts
var w = 300;
var h = 400;
var r = w/2;

//Gets angle of arc
//Used to position pie slice labels below
var getAngle = function (d) {
  return (180 / Math.PI * (d.startAngle + d.endAngle) / 2 - 90);
  };

///////////////////////
//Race chart
///////////////////////

//Give the chart a div to go into, root svg element, a data source, attr of width, attr height, g element (groups svg shapes to work with them as if a single element), translate is a transform function that moves object x, y units
var vis = d3.select('#race-chart').append("svg:svg").data([race_list]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + (r+30) + ") rotate(1.6)");
var pie = d3.layout.pie().value(function(d){return d.councilperson_id_id__count;});

console.log("RACE w, h, r:", w, h, r)

// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);

console.log("RACE arc: ", arc);

// select paths, use arc generator to draw
var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");


//define what goes in the tooltip and call it to the vis
race_tip = d3.tip().attr('class', 'd3-tip').offset([0,0])
  .html(function(d){
    var names_list = "";
    for (i=0; i<d.data.councilperson_id_id__count; i++){
       names_list = names_list + d.data.allnames[i] + "<br> "
    }

    names_list = "<span style='font-weight: bold;'>" +  d.data.councilperson_id_id__race + ": Total " + d.data.councilperson_id_id__count + "</span><br>" + names_list;
    return names_list;
    });

arcs.call(race_tip);
 
arcs.append("svg:path")
    .attr("fill", function(d, i){
        return race_color(i);
    })
    .attr("d", function (d) {
        // log the result of the arc generator to show how cool it is :)
        console.log(arc(d));
        return arc(d);
    })

// add the text labels to each slice
arcs.append("svg:text")
    .attr("transform", function(d){
            d.innerRadius = 0;
            d.outerRadius = r;
            return "translate(" + arc.centroid(d) + ") rotate(" + getAngle(d) + ")";})

    .attr("text-anchor", "middle")
    .text( function(d, i) {
        return race_list[i].councilperson_id_id__race + ": " + race_list[i].councilperson_id_id__count;});

arcs.append("svg:text")
.attr("transform", "translate(-20, -160)")
.style("font-weight", "bold")
.text("RACE");

arcs.on('mouseover', function(d){
        race_tip.show(d);})
      .on('mouseout', function(d){
        race_tip.hide(d);})

///////////////////////
//Party Chart
///////////////////////

//Give the chart a div to go into, root svg element, a data source, attr of width, attr height, g element (groups svg shapes to work with them as if a single element), translate is a transform function that moves object x, y units
var vis = d3.select('#party-chart').append("svg:svg").data([party_list]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + (r+30) + ") rotate(1.6)");
var pie = d3.layout.pie().value(function(d){return d.councilperson_id_id__count;});

console.log("PARTY w, h, r:", w, h, r);

// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);

console.log("PARTY arc: ", arc);

// select paths, use arc generator to draw
var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");

//define what goes in the tooltip and call it to the vis
party_tip = d3.tip().attr('class', 'd3-tip').offset([0,0])
  .html(function(d){
    var names_list = "";
    for (i=0; i<d.data.councilperson_id_id__count; i++){
       names_list = names_list + d.data.allnames[i] + "<br> "
    }

    names_list = "<span style='font-weight: bold;'>" +  d.data.party + ": Total " + d.data.councilperson_id_id__count + "</span><br>" + names_list;
    return names_list;
    });

arcs.call(party_tip);

arcs.append("svg:path")
    .attr("fill", function(d, i){
        return party_color(i);
    })
    .attr("d", function (d) {
        // log the result of the arc generator to show how cool it is :)
        console.log(arc(d));
        return arc(d);
    })

// add the text labels to each slice
arcs.append("svg:text")
    .attr("transform", function(d){
            d.innerRadius = 0;
            d.outerRadius = r;
            return "translate(" + arc.centroid(d) + ") rotate(" + getAngle(d) + ")";})

    .attr("text-anchor", "middle")
    .text( function(d, i) {
        return party_list[i].party + ": " + party_list[i].councilperson_id_id__count;});

arcs.append("svg:text")
.attr("transform", "translate(-20, -160)")
.style("font-weight", "bold")
.text("PARTY");

arcs.on('mouseover', function(d){
        party_tip.show(d);})
      .on('mouseout', function(d){
        party_tip.hide(d);})


///////////////////////
//Gender Chart
///////////////////////

//Give the chart a div to go into, root svg element, a data source, attr of width, attr height, g element (groups svg shapes to work with them as if a single element), translate is a transform function that moves object x, y units
var vis = d3.select('#gender-chart').append("svg:svg").data([gender_list]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + (r+30) + ") rotate(1.6)");
var pie = d3.layout.pie().value(function(d){return d.councilperson_id_id__count;});

console.log("GENDER w, h, r:", w, h, r)
// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);


console.log("GENDER arc: ", arc);
// select paths, use arc generator to draw
var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");

//define what goes in the tooltip and call it to the vis
gender_tip = d3.tip().attr('class', 'd3-tip').offset([0,0])
  .html(function(d){
    console.log("MAKE SOMETHING SHOW UP!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    var names_list = "";
    for (i=0; i<d.data.councilperson_id_id__count; i++){
       names_list = names_list + d.data.allnames[i] + "<br> "
    } 

    names_list = "<span style='font-weight: bold;'>" +  d.data.councilperson_id_id__gender + ": Total " + d.data.councilperson_id_id__count + "</span><br>" + names_list;
    return names_list;
    });

arcs.call(gender_tip);

arcs.append("svg:path")
    .attr("fill", function(d, i){
        return gender_color(i);
    })
    .attr("d", function (d) {
        // log the result of the arc generator to show how cool it is :)
        console.log(arc(d));
        return arc(d);
    })

// add the text labels to each slice
arcs.append("svg:text")
    .attr("transform", function(d){
            d.innerRadius = 0;
            d.outerRadius = r;
            return "translate(" + arc.centroid(d) + ") rotate(" + getAngle(d) + ")";})

    .attr("text-anchor", "middle")
    .text( function(d, i) {
        return gender_list[i].councilperson_id_id__gender + ": " + gender_list[i].councilperson_id_id__count;});

arcs.append("svg:text")
.attr("transform", "translate(-20, -160)")
.style("font-weight", "bold")
.text("GENDER");

arcs.on('mouseover', function(d){
        gender_tip.show(d);})
      .on('mouseout', function(d){
        gender_tip.hide(d);})
