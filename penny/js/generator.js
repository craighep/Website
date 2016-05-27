var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var day = getDayOfYear();
var now = new Date();
var month = now.getMonth();
var labnArr = [];
var dataArr = [];
var total = 0;

for(var i=0;i<=month;i++){
	labnArr.push(months[i]);
	total += (getSpecificDay(month,1)/100);
	dataArr.push(round(total));

	for(var x=1;x<daysInMonth(i);x++){
		if(day == getSpecificDay(i,x))
			break;
		else if(x == 6)
			labnArr.push("7");
		else if(x == 13)
			labnArr.push("14");
		else if(x == 20)
			labnArr.push("21");
		else if(x == 27)
			labnArr.push("28");
		else
			labnArr.push("");
		total += (getSpecificDay(i,x+1)/100);
		dataArr.push(round(total));
	}
}

var data = {
    labels: labnArr,
    datasets: [
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: dataArr
        }
    ]
};
Chart.defaults.global.responsive = true;
var options = {
    scaleShowGridLines : true,
    scaleGridLineColor : "rgba(0,0,0,.05)",
    scaleGridLineWidth : 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve : true,
    bezierCurveTension : 0.4,
    pointDot : false,
    pointDotRadius : 4,
    pointDotStrokeWidth : 1,
    pointHitDetectionRadius : 20,
    datasetStroke : true,
    datasetStrokeWidth : 2,
    datasetFill : true
};

var ctx = $("#myChart").get(0).getContext("2d");
var myLineChart = new Chart(ctx).Line(data, options);

var ctx = $("#pie").get(0).getContext("2d");
var data = [
    {
        value: 366-day,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "To go"
    },
    {
        value: day,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Done"
    }
]
var myPieChart = new Chart(ctx).Pie(data);
$( "#date" ).append(now);

var current = round(day/100);
    var totalOwe = 0;
    for(var i=0; i < day; i++){
        totalOwe += current;
        current -= 0.01;
    }
$( "#total" ).append( "<h3><b>£"+ round(totalOwe) +"</b></h3>" );

$( "#today" ).append( "<h4 id='todayInner'>£" + round(day/100) + "</h4>" );

function daysInMonth(month) {
    return new Date(2015, month, 0).getDate();
}

function getDayOfYear(){
	var now = new Date();
	var start = new Date(now.getFullYear(), 0, 0);
	var diff = now - start;
	var oneDay = 1000 * 60 * 60 * 24;
	var day = Math.floor(diff / oneDay);
	return day;
}

function getSpecificDay (month, day) {   // d is a Date object
	var now = new Date();
	var d = new Date(now.getFullYear(), month, day);
	var yn = d.getFullYear();
	var mn = d.getMonth();
	var dn = d.getDate();
	var d1 = new Date(yn,0,1,12,0,0); // noon on Jan. 1
	var d2 = new Date(yn,mn,dn,12,0,0); // noon on input date
	var ddiff = Math.round((d2-d1)/864e5);
	return ddiff+1; 
}

function round(num){
	var result = Math.round((num + 0.00001) * 100) / 100;
	return result;
}

$( "#owed" ).change(function() {
    var owed = $( "#owed" ).val();
    var current = round(day/100);
    var totalOwe = 0;
    for(var i=0; i < owed; i++){
        totalOwe += current;
        current -= 0.01;
    }
    $( "#todayInner" ).html("£" + round(totalOwe));
});
