// transcriptionsBody.js

var list = document.getElementById("transcriptionlist");
var listMsg = document.getElementById("transcriptionlistMsg");
var totd = document.getElementById("totd");
var totdMsg = document.getElementById("totdMsg");
$("transcriptionlistMsg").show();
$("totdMsg").show();

// Get the song list from the file list.txt
var xmlhttp = sixistLibrary.GetXMLHTTPRequest();

var sourceFile = "songlist.xml";
xmlhttp.open("GET", sourceFile, true);

// Process the song list into something we can output.
xmlhttp.onreadystatechange = function () {

    //var SongList, SongListLength, i, splitLine, Line, song, songname;
    var xmlSongList;

    if (xmlhttp.readyState == 4 && (xmlhttp.status == 200 || xmlhttp.status == 0)) {

        listMsg.innerText = "";
        $("transcriptionlistMsg").hide();
        totdMsg.innerText = "";
        $("totdMsg").hide();

        xmlSongList = xmlhttp.responseXML;

	var SongArrayIndex = 0;
	var SongArray = new Array();
	var FilenameArray = new Array();

	var xmlDoc = $.parseXML(xmlhttp.responseText), 
		xml=$(xmlDoc),
		songs = xml.find("SongList");
	$.each(songs.find("Song"), function(i, el) {
		var song = $(el),
			artist = song.find("Artist").text(), 
			track = song.find("Track").text(),
			filename = song.find("Filename").text()
			;

		songText = artist.trim() + " : " + track.trim();
		list.appendChild(document.createTextNode(songText));
		list.appendChild(document.createElement("br"));
		
		FilenameArray[SongArrayIndex] = filename;
		SongArray[SongArrayIndex] = songText;
		++SongArrayIndex;
	});

	// TOTD

	// Server side version.
	//$.get("http://www.sixist.co.uk/cgi-bin/stime.pl?"+$.now(), function(data) {
	//	UpdateTotD(data, SongArrayIndex, SongArray, FilenameArray);
	//});

	var timeurl= "http://" + window.location.hostname + "/cgi-bin/stime.pl";
	//alert(timeurl);
	$.ajax({
	  url: timeurl,
	  success: function(data) {
		//alert(data);
		UpdateTotD(data, SongArrayIndex, SongArray, FilenameArray);
	  cache: false
	  },
	  error: function(xmlhttp, textStatus, errorThrown) { 
		if (xmlhttp.status == 0) {
		  alert('Check Your Network.');
		} else if (xmlhttp.status == 404) {
		  alert('Requested URL not found.');
		} else if (xmlhttp.status == 500) {
		  alert('Internal Server Error.');
		}  else {
		   alert('Unknown Error.\n' + xmlhttp.responseText);
		}     
	  }
	});	
	
	/*	Client Side Version
	when = new Date();
	Math.seedrandom(when.toLocaleDateString());
	var randomSongIndex= Math.floor((Math.random()*SongArrayIndex)+1);
	var a = document.createElement('a');
	var linkText = document.createTextNode(SongArray[randomSongIndex]);
	a.appendChild(linkText);
	a.title = "Track of the day, " + when.toLocaleDateString();
	a.href = "download/scores/" + FilenameArray[randomSongIndex];
	totd.appendChild(a);
	        
       totd.appendChild(document.createElement("br"));
	*/	
    }
    else if (xmlhttp.readyState == 4) {
        listMsg.innerText = "Unable to process list";
    }
    else {
        listMsg.innerText = "Processing list" ;
    }
}
xmlhttp.send();

function UpdateTotD(data, SongArrayIndex, SongArray, FilenameArray) {
	Math.seedrandom(data);
	var randomSongIndex= Math.floor((Math.random()*SongArrayIndex)+1);
	var a = document.createElement('a');
	var linkText = document.createTextNode(SongArray[randomSongIndex]);
	a.appendChild(linkText);
	a.title = "Track of the day, " + data;
	a.href = "download/scores/" + FilenameArray[randomSongIndex];
	totd.appendChild(a);
			
	totd.appendChild(document.createElement("br"));
}
