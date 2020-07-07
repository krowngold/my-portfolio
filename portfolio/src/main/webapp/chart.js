google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawUWChart);

/** Creates chart of UW demographics and adds it to page */
function drawUWChart() {
    const data = new google.visualization.DataTable();
    data.addColumn("string", "Ethnicity");
    data.addColumn("number", "Count");
            data.addRows([
                ["African-American", 1754],
                ["American Indian", 495],
                ["Asian", 11358],
                ["Caucasian", 17662],
                ["Hawaiian/Pacific Islander", 411],
                ["Hispanic/Latino", 3606],
                ["International", 7320],
                ["Not Indicated", 1011]
            ]);

    const options = {
        "title": "UW Ethnicity Demographics",
        "width": 500,
        "height": 500
    };

    const chart = new google.visualization.PieChart(
        document.getElementById("chart"));
    chart.draw(data, options);
}