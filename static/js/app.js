var json_file = "../static/js/json_data.json"

var svgWidth = 800
var svgHeight = 600

var margin = { top: 30, right: 30, bottom: 70, left: 60 };
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#viz")
   .append("svg")
   .attr("width", svgWidth)
   .attr("height", svgHeight)
   .attr("style", "background-color:smoke")
   .append("g")
   .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

// X axis
var x = d3.scaleBand()
   .range([0, width])
   .padding(0.2);

var xAxis = svg.append("g")
   .attr("transform", "translate(0," + height + ")");

// Add Y axis
var y = d3.scaleLinear()
   .range([height, 0]);
var yAxis = svg.append("g")
   .attr("class", "myYaxis")

function init() {

   d3.json(json_file).then(data => {
      var game_name = data.game;
      //  var dd1 = d3.select("#dd1");
      var dd1 = d3.select("#dd1").property('value')

      buildCharts(dd1);
   });// close d3 call
}; //close init


// A function that creates / updates the plot for a given variable:
function update(data) {
   console.log(data)
   // Update the X axis
   x.domain(data.map(function (d) { return d.group; }))
   xAxis.call(d3.axisBottom(x))

   // Update the Y axis
   y.domain([0, d3.max(data, function (d) { return d.value })]);
   yAxis.transition().duration(1000).call(d3.axisLeft(y));

   // Create the update variable
   var update_svg = svg.selectAll("rect")
      // .data(data, ({group})=>group)
      .data(data)


   update_svg
      .enter()
      .append("rect") // Add a new rect for each new element
      .merge(update_svg) // get the already existing elements as well
      .transition() // and apply changes to all of them
      .duration(1000)
      .attr("x", function (d) { return x(d.group); })
      .attr("y", function (d) { return y(d.value); })
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return height - y(d.value); })
      .attr("fill", "rgb(133,8,8)")
   
   // If fewer groups in the new dataset, delete the ones not in use anymore
   update_svg
      .exit()
      .remove()
}


// function fetch_data(selected_game) {
//    //connect to collect data from json
//    d3.json('/json_data.json').then(function (data) {
//       var game_name = data.game;
//       var no_players = data.game_data.user_count;
//       var rating = data.game_data.positive_ratings;
//       var game_url = data.game_data.game_url;
//       var game_image = data.game_data.game_image_url;
//       var category = data.game_data.game_category;
//       var filtered_data = data.filter(entry => entry.game == selected_game)
//       // var result = resultArr[0]
//       console.log(filtered_data)
//       var panel = d3.select('#game-stats')
//       panel.html('')
//       Object.entries(filtered_data).forEach(([k, v]) => {
//          panel.append('h6').text(`${k.toUpperCase()}: ${v}`);

//       })// close object.entries
//    })// close d3 call

// };//ends fetch


function buildCharts() {
   //connect to collect data from json
   d3.json(json_file).then(function (data) {
      // var game_cat_list=["Up-and-Coming", "Most Engaging", "Popular", "Top Rated"]
      var dd1 = d3.select("#dd1").property("value")
      var dd2 = d3.select("#dd2").property('value') // default value at pageload
      var category_filter = data.filter(sampleCategory => sampleCategory.game_data.game_category == dd1)
      var game_name = []

      var no_players = [] // category_filter.game_data.user_count;
      var rating = [] //category_filter.data.game_data.positive_ratings;
      var game_url = [] //category_filter.game_data.game_url;
      var game_image = [] //category_filter.game_data.game_image_url;
      var category = [] //category_filter.game_data.game_category;

      var data_rating = []
      var data_no_players = []
      var data1 = {}
      var data2 = {}

      for (var i = 0; i < 10; i++) {
         data1 = { group: category_filter[i].game, value: parseInt(category_filter[i].game_data.user_count) }
         data2 = { group: category_filter[i].game, value: parseInt(category_filter[i].game_data.positive_ratings) }
         data_no_players.push(data1)
         data_rating.push(data2)

      }

      if (dd2=="no_players") {
         update(data_no_players)
      }

      else {
         update(data_rating)
      }

      var rects=svg.selectAll("rect")

      rects.data(data, ({group})=>group)
      .enter()
      .append('g')
      .attr('class', 'group')

      rects.on("click", function(d){
         // console.log("d.game_name", d.group)
         d3.select(this)
            .attr("fill", 'rgb(61,59,59)')
            

      update_bubbles(d.group)

   })
   })// close d3 call


};//build charts end



//https://www.chartjs.org/docs/2.6.0/charts/bubble.html

function update_bubbles() {
   //connect to collect data from json
   d3.json(json_file).then(function (data) {
      var dd3 = d3.select("#dd3").property('value')
      var video_filter = data.filter(videos => videos.video_data == dd3)
      console.log(video_filter)
      var game_name = video_filter.game
      var video_views = video_filter.video_data.yt_views;
      var video_likes = video_filter.video_data.yt_likes;
      var video_comments = video_filter.video_data.yt_comments;
      var video_date = video_filter.video_data.pub_date;
      var video_url = video_filter.video_data.video_url;
      var video_name=video_filter.video_data.video_name;
      var first_game = game_name[0]
         // game_name.push(category_filter[i].game)
         // no_players.push(parseInt(category_filter[i].game_data.user_count))
         // game_url.push(category_filter[i].game_data.game_url)
         // game_image.push(category_filter[i].game_data.game_image_url)
         // category.push(category_filter[i].game_data.game_category)
         // rating.push(parseInt(category_filter[i].game_data.positive_ratings))   
      var bubble_chart_data = {}
      var bubble_options = {}
      var bubble_data = {}
    
      for (var i = 0; i < 5; i++) {
         bubble_data = { x: video_filter[i].video_data.video_name, y: i, r:parseInt(video_views[i])/parseInt(video_views)}
         bubble_chart_data.push(bubble_data)
         bubble_text={title: { display: true, text: `You Tube Videos for $(video_filter[i].game)`}}
         bubble_options.push(bubble_text)


      }

      // if (dd3=="Views"){
      //    update_bubbles(video_views)
      // }
      // else if (dd3=="Likes"){
      //    update_bubbles(video_likes)
      // }
      // else if (dd3=="Comment Count"){
      //    update_bubbles(video_comments)
      // }
      // else {
      //    update_bubbles(video_date)
      // }

      // Bubble Chart

      // var myBubblechart= new chartGroup(ctx,{
      //    type: 'bubble',
      //    data: { bubble_chart_data
      //    }
      //    options: {
      //       title: {
      //          display: true,
      //          text: `You Tube videos for ${selected_game}`
      //       }
      //    }
      // });
      var bubblesLayout = {
         'title': `You Tube videos for ${selected_game}`,
         'margin': {
            t: 0
         },
         'hovermode': 'closest',
         'margin': { t: 30 }
      };
      var bubblesTrace = {
         'x': ids,
         'y': sampleValues,
         'text': labels,
         'sizemode': 'area',
         'mode': 'markers',
         'marker': {
            'size': sampleValues,
            'color': ids,
            'colorscale': 'Earth'
         }
      }




      // Creating the plots
      // Plotly.newPlot('bubble', [bubblesTrace], bubblesLayout);
      // console.log('here')
   })

}//populate bubbles
// });




d3.selectAll("#selDataset").on("change", updatePlotly);

function updatePlotly() {

   var dropdownMenu = d3.select("#categoryButton");
   var new_sample = dropdownMenu.property("value");
   d3.json('/json_data.json').then(function (data) {
      var samples = data.samples
      var resultArr = samples.filter(sampleObject => sampleObject.id == new_sample)

      for (var i = 0; i < 153; i++) {
         if (samples[i].id == new_sample) {
            idx = i
         }
      }
      grabData(new_sample)
      buildCharts(new_sample, idx)
   });



}// update plotly

function sankeyDiagram() {
   var sankey = d3.sankey()
      .nodeWidth(36)
      .nodePadding(40)
      .size([width, height])

   var path = sankey.link()

   //connect to collect data from json
   d3.json(json_file).then(function (error, data) {

      // set up graph in same style as original example but empty
      graph = {"nodes": [], :"links": []};

      data.forEach(function (d) {
         graph.nodes.push({"game title": d.game})
         graph.nodes.push({"game category": d.game_data.game_category});
         graph.links({"source": d.game,
                     "target": d.game_data.game_category});
                     // "value": +d.value});
      });

      // return only the distinct / unique nodes
      graph.nodes = d3.keys(d3.nest()
      .key(function (d) { return d.game; })
      .object(graph.nodes));

      // loop through each link replacing the text with its index from node
      graph.links.forEach(function (d,i){
         graph.links[i].game = graph.nodes.indexof(graph.links[i].game);
         graph.links[i].game_category = graph.nodes.indexof(graph.links[i].game_category);
      });

      // now loop through each nodes to make nodes an array of objects
      // rather than an array of strings
      graph.nodes.forEach(function(d,i) {
         graph.nodes[i]= {"name": d};
      });

      sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(32);

      // add in the links
      var link = svg.append("g").selectAll(".link")
            .data(graph.links)
         .enter().append("path")
   }

}

init()
