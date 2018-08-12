// D3 Scatterplot Assignment

// Students:
// =========
// Follow your written instructions and create a scatter plot with D3.js.
var svgWidth = 760;
var svgHeight = 400;


var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("data/data.csv", function(error, stateData) {
    if (error) throw error;

    console.log(stateData);

    stateData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });

    // Step 2: Create scale functions
  // ==============================
  var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(stateData, d => d.poverty)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(stateData, d => d.healthcare)])
    .range([height, 0]);

  // Step 3: Create axis functions
  // ==============================
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Step 4: Append Axes to the chart
  // ==============================
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

   // Step 5: Create Circles
  // ==============================
  var circlesGroup = chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "10")
    .attr("fill", "blue")
    .attr("opacity", ".5")
    .text(function(d){return d.abbr});


  // Create axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Lacks Healthcare (%)");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("In Poverty (%)");

    // // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
    // var xBandScale = d3.scaleBand()
    //   .domain(data.map(d => d.name))
    //   .range([0, chartWidth])
    //   .padding(0.1);
  
    // // Create a linear scale for the vertical axis.
    // var yLinearScale = d3.scaleLinear()
    //   .domain([0, d3.max(data, d => d.hours)])
    //   .range([chartHeight, 0]);
  
    // // Create two new functions passing our scales in as arguments
    // // These will be used to create the chart's axes
    // var bottomAxis = d3.axisBottom(xBandScale);
    // var leftAxis = d3.axisLeft(yLinearScale).ticks(10);
  
    // // Append two SVG group elements to the chartGroup area,
    // // and create the bottom and left axes inside of them
    // chartGroup.append("g")
    //   .call(leftAxis);
  
    // chartGroup.append("g")
    //   .attr("transform", `translate(0, ${chartHeight})`)
    //   .call(bottomAxis);

    // var circlesGroup = chartGroup.selectAll("circle")
    //   .data(data)
    //   .enter()
    //   .append("circle")
    //   .attr("cx", d => xBandScale(d.poverty))
    //   .attr("cy", d => yLinearScale(d.healthcare))
    //   .attr("r", 20)
    //   .attr("fill", "blue")
    //   .attr("opacity", ".5");
  
    // Create one SVG rectangle per piece of tvData
    // Use the linear and band scales to position each rectangle within the chart
    // chartGroup.selectAll(".bar")
    //   .data(tvData)
    //   .enter()
    //   .append("rect")
    //   .attr("class", "bar")
    //   .attr("x", d => xBandScale(d.name))
    //   .attr("y", d => yLinearScale(d.hours))
    //   .attr("width", xBandScale.bandwidth())
    //   .attr("height", d => chartHeight - yLinearScale(d.hours));
});