                                             
//-------------------------------------------------------------------------------------------------------------
// Variables
//-------------------------------------------------------------------------------------------------------------

var playlists = [
	{ name: "My playlist", description: "Random music", songs: [ { name: "Sometime (feat. Brasstracks)", artist: "Dallas Cotton", duration: "2:46" },
									{ name: "Moonrise", artist: "Zimmer", duration: "4:02" }
									]},
	{ name: "juans playlist of victory", description: "dem tunes", songs: [ { name: "My Way (Remix)", artist: "Fetty Wap & Drake", duration: "4:56" }]},
];


var songs;

var songsv = [
    { name: "Sometime (feat. Brasstracks)", artist: "Dallas Cotton", duration: "2:46" },
    { name: "All I See", artist: "JACK LNDN", duration: "5:00" },
    { name: "Moonrise", artist: "Zimmer", duration: "4:02" },
    { name: "My Way (Remix)", artist: "Fetty Wap & Drake", duration: "4:56" },
    { name: "Maan! (Weedmix)", artist: "Wiz Khalifa", duration: "4:09" },
    { name: "The Drops (Remix)", artist: "20syl", duration: "2:57" },
    { name: "Ever Fallen In Love", artist: "Nouvelle Vague", duration: "3:23" },
    { name: "Fire Squad", artist: "J. Cole", duration: "4:48" },
    { name: "So Easy", artist: "Röyksopp", duration: "4:09" },
    { name: "Two Weeks", artist: "Grizzly Bear", duration: "4:04" },
    { name: "Demon Host", artist: "Timber Timbre", duration: "3:38" },
    { name: "Luck Of Lucien", artist: "A Tribe Called Quest", duration: "4:33" },
];


//-------------------------------------------------------------------------------------------------------------
// Logic methods
//-------------------------------------------------------------------------------------------------------------

//TODO html parts are not yet there
/**
 * Removes a playlist
 * @return {[type]} [description]
 */
function removePlaylist(plNumber){
	playlists.splice(plNumber,1);

}

/**
 * THis func removes a song from a playlist
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
function rmvSong(songn, playlistNumber){
	if (playlistNumber < playlists.length && playlistNumber >= 0){
		for(var i=0; i<playlists[playlistNumber].songs.length ; i++){
			if (playlists[playlistNumber].songs[i].name == songn){
				playlists[playlistNumber].songs.splice(i,1);
				swal("Removed!", songn+" was successfully removed!", "success")
			}
		}
	}
}

/**
 * Adds a song to a certain playlist
 * @songn {string}
 * @playlistNumber {number}
 */
function addToP(songn, playlistNumber){
	if (playlistNumber < playlists.length && playlistNumber >= 0){
		var cancion;
		for(var i=0; i<songs.length ; i++){
			if (songs[i].name == songn){
				cancion = songs[i];
			}
		}
		if(checkSong(songn, playlistNumber)){
			sweetAlert("Oops...", "This song is already in that playlist!", "error");
		}
		else{
			playlists[playlistNumber].songs.push(cancion);
		}

	}

}
/**
 * This functions tells us if a song (by song name) is inside a playlist
 * @answer {boolean}
 */
function checkSong(songn, playlistNumber){
	var answer = false;
	for(var i = 0; i<playlists[playlistNumber].songs.length ; i++){
		if(playlists[playlistNumber].songs[i].name == songn){
			answer = true;
		}
	}
	return answer;
}



//---------------------------------------------------------------------------------------------------------------
// jQuery listeners
//---------------------------------------------------------------------------------------------------------------

/**
 * Prevents enter button on the search bar
 * @param  {[type]}
 * @return {[type]}
 */
$(document).on("keyup",'#navbarInput-01',function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
	   }
	else{
			var searchParam = $("#navbarInput-01").val();
			var searchBy = $("#searchBy option:selected").text();

	console.log(searchParam);
	if (searchParam){

		if(searchBy == "Artist"){

			var songlist = [];
			for (var i = 0; i < songs.length ; i ++){
				if (songs[i].artist.toLowerCase().indexOf(searchParam.toLowerCase()) > -1){
					songlist.push(songs[i]);
				}
			}
			hbSongTable(songlist);
		}
		else{

			var songlist = [];
			for (var i = 0; i < songs.length ; i ++){
				if (songs[i].name.toLowerCase().indexOf(searchParam.toLowerCase()) > -1 ){
					songlist.push(songs[i]);
				}
			}
			hbSongTable(songlist);
		}
	}
	else{
		hbSongTable(songs);
	}
	}
});
 
/**
 * Since theyre all called the same i use .on
 * @param  {[type]}
 * @return {[type]}
 */
$(document).on("click touchend", "#removeBtn", function () {
     		var songname = $(this).attr('song');
			var plnumba = $(this).attr('pl');
			rmvSong(songname, plnumba);
			hbPlaylists();
});

/**
 * This function listens to any click on the dropboxes to add a song to a certain playlist
 * @param  {[type]} ){	console.log("asd");			var nombresito_papa [description]
 * @return {[type]}                               [description]
 */
$(document).on("click", ".dropdown-menu li a", function(){
			var nombresito_papa = $(this).parent().parent().attr('cancion');
			var numerito_perro = $(this).attr('numero');
			addToP(nombresito_papa, numerito_perro ); 
			hbPlaylists();
});

/**
 * Download songs
 * @param  {[type]} el){return el;});}     [description]
 * @return {[type]}             [description]
 */
$.getJSON("https://raw.githubusercontent.com/juaoose/201520/master/WEB/js-playslit/test.json", function(json){
	songs = $.map(json, function(el){return el;});

	for(var i = 0; i < songs.length ; i++){
		songs[i].rating = 0;
	}
});

/**
 * On ready, dunno why it works like that, probably because of .getJSON()
 * @param  {[type]} ){	hbSongTable();	hbSongTable();	updatePl();	} [description]
 * @return {[type]}                                                  [description]
 */
$(document).ready(function(){
	hbSongTable(songs);
});

/**
 * Listener to create new playlists
 * @param  {[type]} ){	var nombrePlaylist [description]
 * @return {[type]}         [description]
 */
$(document).on("click", "#btnNewPl", function(){
	var nombrePlaylist = $('#new_playlist_name').val();
	var descripcionPlaylist = $('#new_playlist_desc').val();

	if(nombrePlaylist){
		var new_playlist = { name: nombrePlaylist, 
    						 description: descripcionPlaylist, 
    						 songs: [] };
    	playlists.push( new_playlist );
    	hbSongTable(songs);
    	hbPlaylists();
	}
	else{
		sweetAlert("Oops...", "You need to provide a name for this playlist!", "error");
	}

});

$(document).on("click touchend", "#uprating", function () {
	var nombre = $(this).parent().attr('cancion');
	for(var i=0; i < songs.length ; i++){
		if(songs[i].name == nombre){
			if(songs[i].rating < 10){
			songs[i].rating ++;
		}
		}
	}
	hbSongTable(songs);
});

$(document).on("click touchend", "#downrating", function () {
	var nombre = $(this).parent().attr('cancion');
	for(var i=0; i < songs.length ; i++){
		if(songs[i].name == nombre){
			if(songs[i].rating >  0){
			songs[i].rating --;
		}
		}
	}
	hbSongTable(songs);
});


//---------------------------------------------------------------------------------------------------------------
//Handlebars
//---------------------------------------------------------------------------------------------------------------

/**
 * Compiles the template used to shoy the song list.
 * @return {[type]} [description]
 */
function hbSongTable(canciones){
	var plantillaCanciones = $("#template-songs").html();
	var plantilla = Handlebars.compile( plantillaCanciones );
	var html = plantilla( canciones);
	$("#songTable").html( html );	
	hbDropdown();
	hbPlaylists();
}

/**
 * Compiles the template used to show the playlists in the dropdowns for each song
 * @return {[type]} [description]
 */
function hbDropdown(){
	var plantillaDropdown = $("#template-dropdown").html();
	var plantillad = Handlebars.compile(plantillaDropdown);
	var html1 = plantillad(playlists);
	$('.dropdown-menu').html(html1);
}

/**
 * Compiles the template used to show the playlists
 * @return {[type]} [description]
 */
function hbPlaylists(){
	var plantillaO = $("#template-playlists").html();
	var plantilla = Handlebars.compile(plantillaO);
	var html2 = plantilla(playlists);
	$("#playlistTable").html(String(html2));
}

//http://axiacore.com/blog/check-if-item-array-handlebars/

