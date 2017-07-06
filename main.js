var currentSongNumber = 1;
var willLoop = 0;
var willShuffle = 0;
$('.welcome-screen button').on('click', function() {
    var name = $('#name-input').val();
    if (name.length > 2) {
        var message = "Welcome, " + name;
        $('.main .user-name').text(message);
        $('.welcome-screen').addClass('hidden');//hide welcme screen
        $('.main').removeClass('hidden');//unhide main screen
    }
    else {
        $('#name-input').addClass('error');//add error class to input bar in welcome screen
          }
});

//loop fun()
$('.fa-repeat').on('click',function() {
    $('.fa-repeat').toggleClass('disabled')
    willLoop = 1 - willLoop;
});
//shuffle fun()
$('.fa-random').on('click',function() {
    $('.fa-random').toggleClass('disabled')
    willShuffle = 1 - willShuffle;
});

    function timeJump() {
    var song = document.querySelector('audio')
    song.currentTime = song.duration - 5;
    }
    //FUN() TO GENERATE RANDOM NO.
    function randomExcluded(min, max, excluded) {
        var n = Math.floor(Math.random() * (max-min) + min);
        if (n >= excluded) n++;
        return n;
    }



    $('audio').on('ended',function() {
      var audio = document.querySelector('audio');
      if (willShuffle == 1) {
          var nextSongNumber = randomExcluded(1,4,currentSongNumber); // Calling our function from Stackoverflow
          var nextSongObj = songs[nextSongNumber-1];
          audio.src = nextSongObj.fileName;
          toggleSong();
          changeCurrentSongDetails(nextSongObj);
          currentSongNumber = nextSongNumber;
      }
      else if(currentSongNumber < 4) {
          var nextSongObj = songs[currentSongNumber];
          audio.src = nextSongObj.fileName;
          toggleSong();
          changeCurrentSongDetails(nextSongObj);
          currentSongNumber = currentSongNumber + 1;
      }
      else if(willLoop == 1) {
          var nextSongObj = songs[0];
          audio.src = nextSongObj.fileName;
          toggleSong();
          changeCurrentSongDetails(nextSongObj);
          currentSongNumber =  1;
      }
      else {
          $('.play-icon').removeClass('fa-pause').addClass('fa-play');
          audio.currentTime = 0;
      }
  })

function toggleSong() { //create a toggle function to play and pause song
var song = document.querySelector('audio');
if(song.paused == true) { //check if song is paused
console.log('Playing');
$('.play-icon').removeClass('fa-play').addClass('fa-pause'); //change play icon to pause icon
song.play(); //play song
}
else {
console.log('Pausing');
$('.play-icon').removeClass('fa-pause').addClass('fa-play'); //change pause icon to play icon
song.pause(); // pause song
}
}

$('.play-icon').on('click', function() {//on click button function
  //  var song = document.querySelector('audio');
  //  if (song.paused == true) {//check if song is paused
    //    console.log('Playing');
    //    $('.play-icon').removeClass('fa-play').addClass('fa-pause');//change play icon to pause icon
    //   song.play();//play song
      toggleSong();
  //  }
    //else {
      //  console.log('Pausing');
      //  $('.play-icon').removeClass('fa-pause').addClass('fa-play');//change pause icon to play icon
      //  song.pause();// pause song
  //  }
});
        $('body').on('keypress', function(event) {//on keypress function
      var target = event.target;
      if (event.keyCode == 32 && target.tagName !='INPUT')//first checks if the spacebar key is pressed and then check if
      {
          //  if (event.keyCode == 32) { //spacebar key code is 32
              toggleSong();

              //  var song = document.querySelector('audio');
              //  if (song.paused == true) {
              //      console.log('Playing');
                //    $('.play-icon').removeClass('fa-play').addClass('fa-pause');//change play icon to pause icon
                //    song.play();//play song
              //  } else {
              //      console.log('Pausing');
              //      $('.play-icon').removeClass('fa-pause').addClass('fa-play');//change pause icon to play icon
              //      song.pause();// pause song
              //  }
           }
        });

        function fancyTimeFormat(time)
        {
          // Hours, minutes and seconds
          var hrs = ~~(time / 3600);
          var mins = ~~((time % 3600) / 60);
          var secs = time % 60;

          // Output like "1:01" or "4:03:59" or "123:03:59"
          var ret = "";

          if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
          }

          ret += "" + mins + ":" + (secs < 10 ? "0" : "");
          ret += "" + secs;
          return ret;
        }


        function updateCurrentTime() {//create a function to show current time and duration of song
          var song = document.querySelector('audio');
        //  console.log(song.currentTime);//shows how much we have listen song
        //  console.log(song.duration);//shows total duration of song
        var currentTime = Math.floor(song.currentTime);//convert all decimal no. to int math.floor()
        currentTime = fancyTimeFormat(currentTime); // call fun fancytimeformat
        var duration = Math.floor(song.duration); //convert all decimal no. to int math.floor()
         duration = fancyTimeFormat(duration) // call fun fancytimeformat
        $('.time-elapsed').text(currentTime); //show current time
        $('.song-duration').text(duration); //show duration of song
        }
        //var songName1 = 'Badri Ki Dulhania (Title Track)';
        //var songName2 = 'Humma Song';
        //var songName3 = 'Nashe Si Chadh Gayi';
      //  var songName4 = 'The Breakup Song';

    //using array to create a list of songs name, artist name, song duration
  //  var songList = ['Badri Ki Dulhania (Title Track)', 'Humma Song', 'Nashe Si Chadh Gayi', 'The Breakup Song'];
  //  var artistList = [' Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi','Badshah, Jubin Nautiyal, Shashaa Tirupati','Arijit Singh','Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi'];
  //  var durationList = ['2:56','3:15','2:34','2:29'];
  //  var fileNames = ['song1.mp3','song2.mp3','song3.mp3','song4.mp3'];
  //  var albumList = ['Badrinath ki Dulhania','Ok Jaanu','Befikre','Ae Dil Hai Mushkil'];

  //Array of objects
  var songs = [{
        'name': 'Badri Ki Dulhania (Title Track)',
        'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
        'album': 'Badrinath ki Dulhania',
        'duration': '2:56',
       'fileName': 'song1.mp3',
         'image':'song1.jpg'
    },
    {
        'name': 'Humma Song',
        'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
        'album': 'Ok Jaanu',
        'duration': '3:15',
        'fileName': 'song2.mp3',
          'image':'song2.jpg'
    },
    {
        'name': 'Nashe Si Chadh Gayi',
        'artist': 'Arijit Singh',
        'album': 'Befikre',
        'duration': '2:34',
        'fileName': 'song3.mp3',
          'image':'song3.jpg'
    },
    {
        'name': 'The Breakup Song',
        'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
        'album': 'Ae Dil Hai Mushkil',
        'duration': '2:29',
        'fileName': 'song4.mp3',
        'image':'song4.jpg'
    }]
    function changeCurrentSongDetails(songObj) {
    $('.current-song-image').attr('src','img/' + songObj.image)
    $('.current-song-name').text(songObj.name)
    $('.current-song-album').text(songObj.album)
}


    window.onload = function() {//ask the website to load and once its loaded run function code inside it
       changeCurrentSongDetails(songs[0]);
      //    $('#song1 .song-name').text(songList[0]);//songlist[0] repreasent 1st song
        //  $('#song2 .song-name').text(songList[1]);//songlist[1] repreasent 2nd song
        //  $('#song3 .song-name').text(songList[2]);//songlist[2] repreasent 3rd song
        //  $('#song4 .song-name').text(songList[3]);//songlist[3] repreasent 4th song
        //  $('#song1 .song-artist').text(artistList[0]);
        //  $('#song2 .song-artist').text(artistList[1]);
        //  $('#song3 .song-artist').text(artistList[2]);
        //  $('#song4 .song-artist').text(artistList[3]);
      //  for(var i =0; i < songList.length;i++) {
      //  var name = '#song' + (i+1);
      //  var song = $(name);
      //  song.find('.song-name').text(songList[i]); //find() used to find .song name class inside of song var value
      //  song.find('.song-artist').text(artistList[i]);
      //  song.find('.song-album').text(albumList[i]); // Added
      // song.find('.song-length').text(durationList[i]); // Added
      for(var i =0; i < songs.length;i++) {
       var obj = songs[i];//Save the song object in variable 'obj'
       var name = '#song' + (i+1);
       var song = $(name);
       song.find('.song-name').text(obj.name);// Pick the relevant object property and show it in the website
       song.find('.song-artist').text(obj.artist);
       song.find('.song-album').text(obj.album);
       song.find('.song-length').text(obj.duration);
       addSongNameClickEvent(obj,i+1);//Add a click event on each song

    }
          updateCurrentTime();
           // setTimeout(function() {//we want the function to wait 1 sec and then run code inside function
            setInterval(function() { //jitne milliseconds bolte ho, unte samay ke baad,again jo function ke andar code hai usko run karta rehta hai
            updateCurrentTime();
          },1000);
          }
        //  $('#songs').DataTable();

        $('#songs').DataTable({
        paging: false
      });

          var songNumber=1;
          function addSongNameClickEvent(songObj,position) {
              var songName = songObj.fileName; // New Variable

        //  function addSongNameClickEvent(songName,position) {
            var id = '#song' + position; //if song position is 1 then song is"song1"
          $(id).click(function() {//func for song 1
            var audio = document.querySelector('audio');
            var currentSong = audio.src;
            if(songNumber !=position)  //If the string is not found, it gives us the -1 value else location of string

            {audio.src =songName;
              songNumber=position;
                //toggleSong();
                changeCurrentSongDetails(songObj); // Function Call
              }
            //  else {
                toggleSong();
            //  }
            });
          }
        //  addSongNameClickEvent(fileNames[0],1);//first param is song name and 2nd is position of song
        //  addSongNameClickEvent(fileNames[1],2);//first param is song name and 2nd is position of song
        //  addSongNameClickEvent(fileNames[2],3);//first param is song name and 2nd is position of song
        //  addSongNameClickEvent(fileNames[3],4);//first param is song name and 2nd is position of song

      //  for (var i = 0; i < fileNames.length ; i++) { //we put the function in a loop
        //    addSongNameClickEvent(fileNames[i],i+1) //1st arg is filename and 2nd is position of song
      //  }




          /* $('#song2').click(function() {
              var audio = document.querySelector('audio');
              var currentSong = audio.src;
             if(currentSong.search(fileNames[1]) != -1)
              {
                toggleSong();
              }
              else {
                audio.src = fileNames[1];
                toggleSong();
              }
            });

            $('#song3').click(function() {
              var audio = document.querySelector('audio');
              var currentSong = audio.src;
              if(currentSong.search(fileNames[2]) != -1)
              {
                toggleSong();
              }
              else {
                audio.src = fileNames[2];
                toggleSong();
              }
            });

            $('#song4').click(function() {
              var audio = document.querySelector('audio');
              var currentSong = audio.src;
              if(currentSong.search(fileNames[3]) != -1)
              {
                toggleSong();
              }
              else {
                audio.src = fileNames[3];
                toggleSong();
              }
            });  */
