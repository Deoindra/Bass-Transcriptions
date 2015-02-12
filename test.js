// test.js


$.get("http://sixist.co.uk/cgi-bin/stimeDOY.pl", function(data) {
	$("#response").html("result " + data);
});
