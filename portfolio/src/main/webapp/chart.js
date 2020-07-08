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

google.charts.load('current', {'packages':['scatter']});
google.charts.setOnLoadCallback(drawPlayChart);

/** Creates chart of Google Play Store reviews and adds it to page */
function drawPlayChart() {
    fetch("/playstore-data").then(response => response.json())
    .then((playStoreReviews) => {
        const data = new google.visualization.DataTable();
        data.addColumn("number", "Rating");
        data.addColumn("number", "Installs");

        for (let i = 0; i < playStoreReviews.length; i++) {
            data.addRow([playStoreReviews[i][0], playStoreReviews[i][1]]);
        }

        const options = {
            "title": "Play Store Reviews By Installs",
            "width": 800,
            "height": 500,
            hAxis: {title: "Average Rating"},
            vAxis: {title: "Number of Installs"}
        };

        const chart = new google.charts.Scatter(document.getElementById("chart2"));

        chart.draw(data, google.charts.Scatter.convertOptions(options));
    });
}