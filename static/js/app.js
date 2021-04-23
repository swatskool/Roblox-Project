var json_file='/static/js/json_data.json'

function init() {

   d3.json(json_file).then(data => {
       var game = data.game;
       var dropdownMenu = d3.select("#dropdownMenuButton");

      //  // Creates the dropdown list to choose from
      //  name.forEach((id) => {
      //      dropdownMenu.append("option")
      //          .data(id)
      //          .text(id)
      //          .property("value", id)
      //          .enter()

      //  })

       buildCharts("Most Engaging");
   });
};

function fetch_data(selected_game){
   //connect to collect data from json
   d3.json('/json_data.json').then(function(data){
      //meta data for each sampleID
      var game_name = data.game;
      var no_players = data.game_data.user_count;
      var rating=data.game_data.positive_ratings;
      var game_url=data.game_data.game_url;
      var game_image=data.game_data.game_image_url;
      var category=data.game_data.game_category;
      var filtered_data=data.filter(entry=> entry.game == selected_game)
      // var result = resultArr[0]
      console.log(filtered_data)
      var panel = d3.select('#game-stats')
      panel.html('')
      Object.entries(filtered_data).forEach(([k,v])=>{
         panel.append('h6').text(`${k.toUpperCase()}: ${v}`);

      })
   })

};

function buildCharts(selected_category){
   //connect to collect data from json
   d3.json(json_file).then(function(data){
      var category_filter = data.filter(sampleCategory=> sampleCategory.category == selected_category)
      var game_name = category_filter.game
      var no_players = category_filter.game_data.user_count;
      var rating=category_filter.data.game_data.positive_ratings;
      var game_url=category_filter.game_data.game_url;
      var game_image=category_filter.game_data.game_image_url;
      var category=category_filter.game_data.game_category;
      var dropdown2=d3.select("#dropdownMenuButton2").text()
      //updated the home.html to change id to dropdownMenuButton2
      
      if dropdown2 == "Rating"

         var barhTrace = {
            'x': game,
            'y': rating, 
            
         'type': 'bar',
            'orientation': 'h',
            'text' : game_name

            
         }

      else if dropdown2 == "No. of Players"

         var barhTrace = {
            'x': game_name,
            'y': no_players, 
            
         'type': 'bar',
            'orientation': 'h',
            'text' : game_name

            
         }


      //Horizontal Bar
      var barhLayout ={
         'title' : 'Top 10 Games in Category:'{selected_category},

      };



    


      // Creating the plots
      // Plotly.newPlot('bubble', [bubblesTrace], bubblesLayout);
      Plotly.newPlot('bar', [barhTrace], barhLayout);
      console.log('here')
      })
   
   }
});

d3.select("bar").on("click", populate_bubbles)

function populate_bubbles(selected_game){
   //connect to collect data from json
   d3.json(json_file).then(function(data){
      var video_filter = data.filter(sampleCategory=> sampleCategory.category == selected_category)
      var game_name = category_filter.game
      var no_players = category_filter.game_data.user_count;
      var rating=category_filter.data.game_data.positive_ratings;
      var game_url=category_filter.game_data.game_url;
      var game_image=category_filter.game_data.game_image_url;
      var category=category_filter.game_data.game_category;
      
      // // Bubble Chart
      // var bubblesLayout = {
      //    'title': ' Bubble chart',
      //    'margin': {
      //       t: 0
      //    },
      //    'hovermode' : 'closest',
      //    'margin' : {t:30}
      // };
      // var bubblesTrace = {
      //    'x': ids,
      //    'y': sampleValues,
      //    'text':labels,
      //    'sizemode': 'area',
      //    'mode': 'markers',
      //    'marker':{
      //       'size' : sampleValues,
      //       'color': ids,
      //       'colorscale': 'Earth'
      //      }
      //    }
    


      // Creating the plots
      Plotly.newPlot('bubble', [bubblesTrace], bubblesLayout);
      console.log('here')
      })
   
   }
});

   


   d3.selectAll("#selDataset").on("change", updatePlotly);

   function updatePlotly() {
      
      var dropdownMenu = d3.select("#categoryButton");
      var new_sample = dropdownMenu.property("value");
      d3.json('/json_data.json').then(function(data){
         var samples = data.samples 
         var resultArr = samples.filter(sampleObject=> sampleObject.id == new_sample)

         for (var i =0;i <153;i++){
            if (samples[i].id==new_sample){
               idx = i
           }
         }
         grabData(new_sample)
         buildCharts(new_sample,idx)
     });

      
    
   }

// function init(){

//       var dropdown = d3.select('#selDataset');
//       d3.json(json_file).then((data)=>{
//          var dd_list = data.names;
//          dd_list.forEach((sample)=>{
//             dropdown
//                .append('option')
//                .text(sample)
//                .property('value',sample)

//          });

         
//          var firstSample = dd_list[0]
//          grabData(firstSample)
//          buildCharts(firstSample,0)
//       })




// }





init()

//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Assign the value of the dropdown menu option to a variable

// function init() {

//    d3.json('data/samples.json').then(data => {
//        var name = data.names;
//        var dropdownMenu = d3.select("#selDataset");
//        // var selectedName = dropdownMenu.node().value.toString() == "940";

//        // Creates the dropdown list to choose from
//        name.forEach((id) => {
//            dropdownMenu.append("option")
//                .data(id)
//                .text(id)
//                .property("value", id)
//                .enter()

//        })

//        showCharts("940");
//    });
// };

// // This function is called when a dropdown menu item is selected

// function showCharts(selectedName) {
//    // Use D3 to select the dropdown menu
//    d3.json('data/samples.json').then(data => {
//        //Fill in the metadata
//        var name = data.names;
//        var metadata = data.metadata;
//        var filteredMeta = metadata.filter(info => info.id == selectedName)[0];

//        var tableInfo = d3.select("tbody");
//        tableInfo.html("");


//        Object.entries(filteredMeta).forEach(([k, v]) => {
//            var newrow = tableInfo.append('tr');
//            newrow.append('td').text(k.concat(": ", v));
//        });

//        //Create bar chart

//        var samples = data.samples;
//        var filteredSamples = samples.filter(info => info.id == selectedName)[0];
//        var sample_values = filteredSamples.sample_values;

//        var otu_id_prefix = "OTU ";
//        var otu_ids = filteredSamples.otu_ids;
//        var otu_id_label = otu_ids.map(otu_label => otu_id_prefix.concat(" ", otu_label))
//        var otu_labels = filteredSamples.otu_labels;

//        var trace = {
//            x: sample_values.slice(0, 10).reverse(),
//            y: otu_id_label.slice(0, 10).reverse(),
//            text: otu_labels.slice(0, 10),
//            orientation: 'h',
//            type: 'bar'
//        };
//        var data = [trace];

//        var layout = {
//            title: "Top 10 OTUs Found",
//        };

//        Plotly.newPlot("bar", data, layout);

//        //Create bubble chart

//        var trace1 = [{
//            x: otu_ids,
//            y: sample_values,
//            text: otu_labels,
//            mode: 'markers',
//            marker: {
//                color: otu_ids,
//                size: sample_values,
//            }
//        }]

//        var layout_bubble = {
//            xaxis: {
//                title: 'OTU ID',
//                titlefont: {
//                    family: 'Arial, sans-serif',
//                    size: 18,
//                    color: 'orange'
//                }
//            }
//        }
//        Plotly.newPlot('bubble', trace1, layout_bubble);

   //     //Create gauge
   //     var washFrequency = filteredMeta.wfreq;

   //     var gauge_data = [
   //         {
   //             type: "indicator",
   //             mode: "gauge+number",
   //             domain: { 'x': [0, 1], 'y': [0, 1] },
   //             value: washFrequency,
   //             text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9"],
   //             textInfo: "text",
   //             textposition: "inside",
   //             hoverinfo: "text",
   //             gauge: {
   //                 axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
   //                 bar: { color: "deeppink"},
   //                 borderwidth: 1,
   //                 bordercolor: "white",
   //                 steps: [
   //                     { range: [0, 1], color: "oldlace" },
   //                     { range: [1, 2], color: "papayawhip" },
   //                     { range: [2, 3], color: "moccasin" },
   //                     { range: [3, 4], color: "peachpuff" },
   //                     { range: [4, 5], color: "mistyrose" },
   //                     { range: [5, 6], color: "pink" },
   //                     { range: [6, 7], color: "lightpink" },
   //                     { range: [7, 8], color: "palevioletred" },
   //                     { range: [8, 9], color: "mediumvioletred" },
   //                 ],

   //             }
   //         }
   //     ];

   //     var gauge_layout = {
   //         title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week', font: { size: 12 },
   //         width: 500,
   //         height: 400,
   //         margin: { t: 30, r: 0, l: 0, b: 0 },
   //     };
   
   // Plotly.newPlot('gauge', gauge_data, gauge_layout);
//    });
// };


// init();
