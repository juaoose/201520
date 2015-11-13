var app = angular.module( "conferencesApp" );

app.factory( "mainServices", [ '$firebaseArray', function( $window , $firebaseArray) {

  var conferences;
  var comments;
  var loggedUser = "none";

  return {
   
    conferences: function(){
      return conferences;
    },

    comments: function(conferenceId){
      var commentsAns = [];
      for (var i=0; i<comments.length ; i++){
        var comm = comments[i];
        if(String(comm.event) === String(conferenceId)){
          commentsAns.push(comm);
        }

      }
      return commentsAns;
    },

    updateConf: function (conferencs){
      return conferences = conferencs;
    },

    updateComms: function (commentz){
      console.log("Updated comments");
      return comments = commentz;
    },
    
    validateLogin : function ( login, password ) {
      console.log('login: '+ login+'pass: '+ password);
      if ( login === password) {
        loggedUser = login;
        return true;
      } else {
        return false;
      }
    },

    logout: function(){
      this.loggedUser = "none";
    },

    isLogged: function(){
      var ret = true;
      if (loggedUser === "none"){
        ret = false;
      }

      return ret;
    },
    
    getCurrentUser: function () {
      return loggedUser;
    },

    getConferenceById: function(conferenceId){
      for (var i = 0;i < conferences.length ; i++){
        var conf = conferences[i];
        if(String(conf.id) === String(conferenceId)){
          return conf;
        }
      }
    },

    
  };

}]);
