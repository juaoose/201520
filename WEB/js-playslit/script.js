//Variables

var playlists = [
	{ name: "My playlist", description: "Random music", songs: [ { name: "Sometime (feat. Brasstracks)", artist: "Dallas Cotton", duration: "2:46" },
									{ name: "Moonrise", artist: "Zimmer", duration: "4:02" }
									]},
	{ name: "juans playlist of victory", description: "dem tunes", songs: [ { name: "My Way (Remix)", artist: "Fetty Wap & Drake", duration: "4:56" }]},
];

var songs = [
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

/**
 * Adds a new playlist
 * @return {[type]}
 */
function update2(){
		var newTab = document.getElementById( "newPl" );
		var htmlLista =          "";
			//Formulario nueva pl
		htmlLista += "                        <tbody>";
		htmlLista += "                        <tr class=\"new_playlist\">";
		htmlLista += "							<td colspan=\"1\">";
		htmlLista += "                                <input type=\"text\" class=\"form-control playlist_name\"";
		htmlLista += "                                       id=\"playlist_name\" name=\"playlist_name\"";
		htmlLista += "                                       placeholder=\"Playlist name\" required>";
		htmlLista += "                            <\/td>";
		htmlLista += "							<td colspan=\"2\">";
		htmlLista += "                                <input type=\"text\" class=\"form-control desc\"";
		htmlLista += "                                       id=\"desc\" name=\"desc\"";
		htmlLista += "                                       placeholder=\"Description\">";
		htmlLista += "                            <\/td>";
		//btn
		htmlLista += "<td class=\"col-sm-1 col-md-1\">";
		htmlLista += "                                <button onclick=\"newPlaylist()\" type=\"button\" class=\"btn btn-success\">";
		htmlLista += "                                     Create";
		htmlLista += "                                <\/button>";
		htmlLista += "                            <\/td>";

		htmlLista += "                        </tr>";

		newTab.innerHTML = htmlLista;
}

function newPlaylist(){

   		pl = document.getElementsByClassName('new_playlist')[0];
   	if(pl.getElementsByClassName('playlist_name')[0].value){
    	var new_playlist = { name: pl.getElementsByClassName('playlist_name')[0].value, 
    						 description: pl.getElementsByClassName('desc')[0].value, 
    						 songs: [] };

    	//Check if not empty
    	if (new_playlist){
    	playlists.push( new_playlist );
		}
		updatePl();
		update();
	}
	else{
		sweetAlert("Oops...", "You need to provide a name for this playlist!", "error");
	}
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

/**
 * This lil boy renders playlist table and the infor inside it, oh and the form to add a new playlist
 * @return {[type]}
 */
function updatePl(){

	var playlistTable = document.getElementById( "playlistTable" );
		//start table
		var htmlLista =          "";
		htmlLista     += "<!-- Titulos de la tabla -->";
		htmlLista     += "                        <thead>";
		htmlLista     += "                        <tr>";
		htmlLista     += "                            <th colspan=\"2\">Playlist Name<\/th>";
		htmlLista     += "                            <th colspan=\"2\">Description<\/th>";
		htmlLista     += "                        <\/tr>";
		htmlLista     += "                        <\/thead>";
		htmlLista     += "";
		htmlLista     += "                        <!-- Cuerpo de la tabla -->";
		htmlLista     += "                        <tbody>";

		for (var i=0; i <playlists.length ; i++){
			htmlLista += '<tr class=\"active\">';
			htmlLista += '<td colspan=\"2\" class="pl_name">'+playlists[i].name+'</td>';
			htmlLista += '<td colspan=\"2\" class="pl_description aid">'+playlists[i].description+'</td>';
			htmlLista += '</tr>';
			//Draw songlist inside
		if(playlists[i].songs.length>0)
		{
			htmlLista += '<table class=\"ze_table\">';
			htmlLista += '<tr>';
			htmlLista     += "<!-- Titulos de la tabla -->";
			htmlLista     += "                        <thead>";
			htmlLista     += "                        <tr>";
			htmlLista     += "                            <th>Song Name<\/th>";
			htmlLista     += "                            <th>Artist<\/th>";
			htmlLista     += "                            <th>Duration<\/th>";
			htmlLista     += "                            <th>Actions<\/th>";
			htmlLista     += "                        <\/tr>";
			htmlLista     += "                        <\/thead>";
			htmlLista     += "";
			htmlLista     += "                        <!-- Cuerpo de la tabla -->";
			htmlLista     += "                        <tbody>";

			for (var j=0; j<playlists[i].songs.length ; j++){
				htmlLista += '<tr>';
				htmlLista += '<td class="song_name">'+playlists[i].songs[j].name+'</td>';
				htmlLista += '<td class="song_artist">'+playlists[i].songs[j].artist+'</td>';
				htmlLista += '<td class="song">'+playlists[i].songs[j].duration+'</td>';
				htmlLista += '<td><button id=\"removeBtn\" song=\"'+playlists[i].songs[j].name+'\" pl=\"'+i+'\" class="btn btn-sm btn-error" >Remove</button></td>';
				htmlLista += '</tr>'
			}
		}
		else{}
			htmlLista += '</table>';
			htmlLista += '</tr>';
		}

	playlistTable.innerHTML = htmlLista;

}


/**
 * This method draws the song list including the buttons that provide functionality to add them to a playlist
 * it also allows to search a song by its name or artist
 * @return {[type]}
 */
function update(){
		song_name = document.getElementById("navbarInput-01").value;
		var songTable = document.getElementById( "songTable" );
		//start table
		var htmlLista =          "";
		htmlLista     += "<!-- Titulos de la tabla -->";
		htmlLista     += "                        <thead>";
		htmlLista     += "                        <tr>";
		htmlLista     += "                            <th>Name<\/th>";
		htmlLista     += "                            <th>Artist<\/th>";
		htmlLista     += "                            <th>Duration<\/th>";
		htmlLista     += "                            <th>Actions<\/th>";
		htmlLista     += "                        <\/tr>";
		htmlLista     += "                        <\/thead>";
		htmlLista     += "";
		htmlLista     += "                        <!-- Cuerpo de la tabla -->";
		htmlLista     += "                        <tbody>";
		//Table body
	if(song_name){
		console.log("Searching: "+song_name);
		for (var i = 0; i < songs.length ; i++){
			if(songs[i].name.toLowerCase().indexOf(song_name.toLowerCase()) > -1 || songs[i].artist.toLowerCase().indexOf(song_name.toLowerCase()) > -1){
				htmlLista += '<tr>';
				htmlLista += '<td class="song_name">'+songs[i].name+'</td>';
				htmlLista += '<td class="song_artist">'+songs[i].artist+'</td>';
				htmlLista += '<td class="song">'+songs[i].duration+'</td>';
				htmlLista += "<td><div class=\"btn-group closed\">";
				htmlLista += "            <button data-toggle=\"dropdown\" class=\"btn btn-default dropdown-toggle\" type=\"button\">Add to<span class=\"caret\"><\/span><\/button>";
				htmlLista += "            <ul role=\"menu\" class=\"dropdown-menu\">";
				for(var j = 0; j< playlists.length ; j ++){
						htmlLista += "              <li><a href=\"#playlist_mgmt\">"+playlists[j].name+"<\/a><\/li>";
				}
				htmlLista += "            <\/ul>";
				htmlLista += "          <\/div><\/td>";
				htmlLista += '</tr>';
			}
		}
		
	}
	else{

		for(var i=0 ; i < songs.length ; i++){

			htmlLista += '<tr>';
			htmlLista += '<td class="song_name">'+songs[i].name+'</td>';
			htmlLista += '<td class="song_artist">'+songs[i].artist+'</td>';
			htmlLista += '<td class="song">'+songs[i].duration+'</td>';
			// this was actually cool htmlLista += '<td><button id="dropdown'+i+'" data-toggle="dropdown" class="btn btn-sm btn-default dropdown-toggle" type="button">Playlist<span class="caret"></span></button><button class="btn btn-sm btn-success">Add</button></td>'
			htmlLista += "<td><div class=\"btn-group closed\">";
			htmlLista += "            <button data-toggle=\"dropdown\" class=\"btn btn-default dropdown-toggle\" type=\"button\">Add to<span class=\"caret\"><\/span><\/button>";
			htmlLista += "            <ul role=\"menu\" class=\"dropdown-menu\">";
			for(var j = 0; j< playlists.length ; j ++){
				htmlLista += '              <li><a name='+j+' id=\"'+songs[i].name+'\" href=\"#playlist_mgmt\">'+playlists[j].name+'<\/a><\/li>';
			}
			htmlLista += "            <\/ul>";
			htmlLista += "          <\/div><\/td>";
			htmlLista += '</tr>';

		}

	}
		//Finish table
		htmlLista += "                        <\/tbody>";
		songTable.innerHTML = htmlLista;
		
		//jQuery listener for playlist addition
		$(function(){
		
		$(".dropdown-menu li a").click(function(){
			var nombresito_papa = $(this).attr('id');
			var numerito_perro = $(this).attr('name');
			//console.log(nombresito_papa+numerito_perro); 
			addToP(nombresito_papa, numerito_perro ); 
			updatePl();
		});
		
		});

		//end chaos

}

/**
 * Prevents enter button on the search bar
 * @param  {[type]}
 * @return {[type]}
 */
$('#navbarInput-01').keypress(function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
    }
});
/**
 * Table toggle which doesnt work ,k
 * @param  {[type]}
 * @return {[type]}
 */
$('.master_table').click(function(){
        $('.ze_table').slideToggle(10);
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
			updatePl();
});


