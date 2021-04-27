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