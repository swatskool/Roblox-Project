var json_file="../static/js/json_data.json"

function init() {

   
   console.log("hi")
   d3.json(json_file).then(data => {
       var game_name = data.game;
      //  var dd1 = d3.select("#dd1");
       var dd1 = d3.select("#dd1").property('value')
       

       buildCharts(dd1);
   });// close d3 call
}; //close init


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

      })// close object.entries
   })// close d3 call

};//ends fetch

function buildCharts(selected_category){
   //connect to collect data from json
   d3.json(json_file).then(function(data){
      var category_filter = data.filter(sampleCategory=> sampleCategory.game_data.game_category == selected_category)
      var game_name = []

      var no_players = [] // category_filter.game_data.user_count;
      var rating= [] //category_filter.data.game_data.positive_ratings;
      var game_url= [] //category_filter.game_data.game_url;
      var game_image= [] //category_filter.game_data.game_image_url;
      var category= [] //category_filter.game_data.game_category;
      
      for (var i =0;i<10;i++){
         game_name.push(category_filter[i].game)
         no_players.push(parseInt(category_filter[i].game_data.user_count))
         game_url.push(category_filter[i].game_data.game_url)
         game_image.push(category_filter[i].game_data.game_image_url)
         category.push(category_filter[i].game_data.game_category)
         rating.push(parseInt(category_filter[i].game_data.positive_ratings))

      }
      var dd1 = d3. select("#dd1").property("value")
      var dd2=d3.select("#dd2").property('value') // default value at pageload
      var dd3 = d3.select("#dd3").property('value')
      var first_game = game_name[0]

      var barTrace = {
         'x': game_name,
         'y': dd2, 
        'type': 'bar',
        'text' : game_name
         }// close barhtrace
      var barLayout ={
         'title' : `Top 10 Games in Category $(dd1)`
         }
          // Creating the plots

      Plotly.newPlot('bar', [barTrace], barLayout);
    
   })// close d3 call

   
   };//build charts end


d3.select("#bar").on("click", populate_bubbles)

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
      
      // Bubble Chart
      var bubblesLayout = {
         'title': ' Bubble chart',
         'margin': {
            t: 0
         },
         'hovermode' : 'closest',
         'margin' : {t:30}
      };
      var bubblesTrace = {
         'x': ids,
         'y': sampleValues,
         'text':labels,
         'sizemode': 'area',
         'mode': 'markers',
         'marker':{
            'size' : sampleValues,
            'color': ids,
            'colorscale': 'Earth'
           }
         }
    


      // Creating the plots
      Plotly.newPlot('bubble', [bubblesTrace], bubblesLayout);
      console.log('here')
      })
   
   }//populate bubbles
// });

   


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

      
    
}// update plotly
init()
