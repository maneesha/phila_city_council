//Set width, height, radius, angle for all charts
var w = 300;
var h = 400;
var r = w/2;

//Gets angle of arc
//Used to position pie slice labels below
var getAngle = function (d) {
  return (180 / Math.PI * (d.startAngle + d.endAngle) / 2 - 90);
  };

var pie = d3.layout.pie().value(function(d){return d.councilperson_id_id__count;});

// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);



//Function to make each demographic chart
var make_chart = function(chart_id, demographic_data_array, demographic_color, django_var, demographic_string) {
    var vis = d3.select(chart_id).append("svg:svg").data(demographic_data_array).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + (r+30) + ") rotate(1.6)");
    // select paths, use arc generator to draw
    var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
    //define what goes in the tooltip and call it to the vis
    var demographic_tip = d3.tip().attr('class', 'd3-tip').offset([0,0])
      .html(function(d){
        var names_list = "";
        for (i=0; i<d.data.councilperson_id_id__count; i++){
           names_list = names_list + d.data.allnames[i] + "<br> "
        }

        names_list = "<span style='font-weight: bold;'>" +  d.data[django_var] + ": Total " + d.data.councilperson_id_id__count + "</span><br>" + names_list;
        return names_list;
        });

    arcs.call(demographic_tip);

    arcs.append("svg:path")
    .attr("fill", function(d, i){
        return demographic_color[d.data[django_var]];
    })
    .attr("d", function (d) {
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
            return demographic_data_array[0][i][django_var];});

    arcs.append("svg:text")
    .attr("transform", "translate(-20, -160)")
    .style("font-weight", "bold")
    .text(demographic_string);

    arcs.on('mouseover', function(d){
            demographic_tip.show(d);})
          .on('mouseout', function(d){
            demographic_tip.hide(d);});

};


//define variable from django data
councilperson_id_id__race = "councilperson_id_id__race";
councilperson_id_id__gender = "councilperson_id_id__gender";
party = "party"

//call function 3x, once for each data set
make_chart('#party-chart', [party_list], party_color, party, "PARTY");
make_chart('#race-chart', [race_list], race_color, councilperson_id_id__race, "RACE");
make_chart('#gender-chart', [gender_list], gender_color, councilperson_id_id__gender, "GENDER");