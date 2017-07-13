var currentSongNumber = 1;
var willLoop = 0;
var willShuffle = 0;
var Playingnumber=0;
var changemenu=0;
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
    song.currentTime = song.duration -15;
    }
    //FUN() TO GENERATE RANDOM NO.
    function randomExcluded(min, max, excluded) {
        var n = Math.floor(Math.random() * (max-min) + min);
        if (n >= excluded) n++;
        return n;
    }



    //$('audio').on('ended',function() {
    //  var audio = document.querySelector('audio');
    //  if (willShuffle == 1) {
      //    var nextSongNumber = randomExcluded(1,4,currentSongNumber); // Calling our function from Stackoverflow
      //    var nextSongObj = songs[nextSongNumber-1];
      //    audio.src = nextSongObj.fileName;
      //    toggleSong();
      //    changeCurrentSongDetails(nextSongObj);
      //    currentSongNumber = nextSongNumber;
    //  }
    //  else if(currentSongNumber < 4) {
      //    var nextSongObj = songs[currentSongNumber];
      //    audio.src = nextSongObj.fileName;
      //    toggleSong();
        //  changeCurrentSongDetails(nextSongObj);
        //  currentSongNumber = currentSongNumber + 1;
    //  }
    //  else if(willLoop == 1) {
      //    var nextSongObj = songs[0];
        //  audio.src = nextSongObj.fileName;
        //  toggleSong();
        //  changeCurrentSongDetails(nextSongObj);
        //  currentSongNumber =  1;
    //  }
    //  else {
      //    $('.play-icon').removeClass('fa-pause').addClass('fa-play');
      //    audio.currentTime = 0;
    //  }
//  })

//The actual looping code. Runs only if looping is enabled.
$('.myaudio').on('ended', function() {
  // Run the following code only if willLoop == 1, i.e., if the player will loop.
  if(willLoop) {
    var audio = document.querySelector('.myaudio');
    if(currentSongNumber < songs.length) {
      // PLay the next song
      var nextSongObj = songs[currentSongNumber];
      audio.src = nextSongObj.fileName;   // Change the source
      toggleSong();   // Play the next song
      changeCurrentSongDetails(nextSongObj);  // Change the song details in the player controls
      currentSongNumber++;  // Increment the current song number.
    }
    else {
      // Play the first song
      audio.src = songs[0].fileName;
      toggleSong();
      changeCurrentSongDetails(songs[0]);
      currentSongNumber = 1;
    }
  }
});

$('.myaudio').on('ended', function() {
  if(willShuffle) {
    audio = document.querySelector('.myaudio');
    currentSongNumber = Math.floor((Math.random() * 4) + 1);
    var nextSongObj = songs[currentSongNumber - 1];
    audio.src = nextSongObj.fileName;
    toggleSong();
    changeCurrentSongDetails(nextSongObj);
  }
});




function toggleSong() {

  if(changemenu==0)
  {
   //create a toggle function to play and pause song
var song = document.querySelector('.myaudio');
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
          var song = document.querySelector('.myaudio');
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
        'name': '1. Ishq Mubarak (Title Track)',
        'artist': 'Arijit Singh',
        'album': 'Tum Bin 2',
        'duration': '4:56',
       'fileName': 'song1.mp3',
         'image':'song1.jpg'
    },


    {
        'name': '2. The Breakup Song',
        'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
        'album': 'Ae Dil Hai Mushkil',
        'duration': '4:12',
        'fileName': 'song2.mp3',
        'image':'song2.jpg'
    },

    {
        'name': '3. Yaad Hai Na',
        'artist': 'Arijit Singh',
        'album': 'Raaz: Reboot',
        'duration': '4:06',
        'fileName': 'song3.mp3',
          'image':'song3.jpg'
    },
    {
        'name': '4.  Koi Ishara',
        'artist': 'Arman Malik, Amaal Malik',
        'album': 'Force 2',
        'duration': '4:11',
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

  //  $('#songs').DataTable();
    $('#songs').DataTable({
    paging: false
    });

          updateCurrentTime();
           // setTimeout(function() {//we want the function to wait 1 sec and then run code inside function
            setInterval(function() { //jitne milliseconds bolte ho, unte samay ke baad,again jo function ke andar code hai usko run karta rehta hai
            updateCurrentTime();
          },1000);




          }




          var songNumber=1;
        //  function addSongNameClickEvent(songObj,position) {



          //      var songName = songObj.fileName; // New Variable
        //  function addSongNameClickEvent(songName,position) {
          //  var id = '#song' + position; //if song position is 1 then song is"song1"
        //  $(id).click(function() {


            //func for song 1
          //    Playingnumber=position-1;
          //  var audio = document.querySelector('audio');
          //  var currentSong = audio.src;
          //  if(songNumber !=position)  //If the string is not found, it gives us the -1 value else location of string

          //  {audio.src =songName;
          //    songNumber=position;
                //toggleSong();
            //    changeCurrentSongDetails(songObj); // Function Call
            //  }
            //  else {
            //    toggleSong();
            //  }

          //  });



        //}

        function addSongNameClickEvent(song, position) {
  var songId = '#song' + position;
  var fileName = song.fileName;
  $(songId).on('click', function() {
    currentSongNumber = (position > 0 && position <= songs.length) ? position : ((position > songs.length) ? songs.length : 1);
    var audio = document.querySelector('.myaudio');
    if(audio.src.search(fileName) != -1) {
      toggleSong();
    }
    else {
      audio.src = fileName;
      toggleSong();
      changeCurrentSongDetails(song);
    }
  });
}





        //  $(".fa-step-forward").click(function(){
          //  if(Playingnumber==songs.length-1){
            //    console.log("1");
            //  Playingnumber=0;
          //    changesong();
          //  }
          //  else {
            //  console.log("2");
            //  console.log("Playingnumber")
            //  Playingnumber++;
            // changesong();
          //  }
        //  })

        $('.fa-step-forward').on('click', function() {
          var audio = document.querySelector('.myaudio');
          if(currentSongNumber < songs.length) {
            currentSongNumber++;
            var nextSongObj = songs[currentSongNumber - 1];
            audio.src = nextSongObj.fileName;
            toggleSong();
            changeCurrentSongDetails(nextSongObj);
          }
          else {
            currentSongNumber = 1;
            audio.src = songs[0].fileName;
            toggleSong();
            changeCurrentSongDetails(songs[0]);
          }
        });




      //    $(".fa-step-backward").click(function(){
          //  if(Playingnumber==0){
          //      console.log("1");
          //      Playingnumber=songs.length-1;
          //      changesong();
          //    }
          //    else {
          //        Playingnumber--;
            //      changesong();
            ////  }
          //  })





        //  function changesong()
          //{
          //  var music=songs[Playingnumber].fileName;
          //  var song=document.querySelector("audio");
          //  song.src=music;
          //  toggleSong();
          //  changeCurrentSongDetails(songs[Playingnumber])
          //  updateTimer();
        //  }
        $('.fa-step-backward').on('click', function() {
  var audio = document.querySelector('.myaudio');
  if(currentSongNumber >= 1) {
    currentSongNumber--;
    var prevSongObj = songs[currentSongNumber - 1];
    audio.src = prevSongObj.fileName;
    toggleSong();
    changeCurrentSongDetails(prevSongObj);
  }
  else {
    currentSongNumber = songs.length;
    audio.src = songs[currentSongNumber - 1].fileName;
    toggleSong();
    changeCurrentSongDetails(songs[currentSongNumber - 1]);
  }
});

          function updateTimer()
            {
              var song=document.querySelector('.myaudio');
              var ct=song.currentTime;
              var td=song.duration;
              var percentage=(ct/td)*100;
              $(".progress-filled").css('width',percentage+"%");
            }
            $(".player-progress").click(function(event){
              var $this=$(this);
              var widthclicked=event.pageX-$this.offset().left;
              var totalwidth= $this.width();
              var calc=(widthclicked/totalwidth)*100;
              var song =document.querySelector('.myaudio');
              song.currentTime=(song.duration*calc)/100;
              updateTimer();

            });

            $('.myaudio').on('timeupdate', function() {
              var audio = document.querySelector('.myaudio');
              $('.progress-filled').stop().animate({'width': (audio.currentTime) / audio.duration * 100 + '%'}, 250, 'linear');
            });

            // The 'scrub' function: it updates the current time whenever the user clicks
            // anywhere on the progress bar.
            $('.player-progress').on('click', function(event) {
              var audio = document.querySelector('.myaudio');
              var progress = document.querySelector('.player-progress');

              var scrubTime = (event.offsetX / progress.offsetWidth) * audio.duration;
              audio.currentTime = scrubTime;
            });

            //function for skip forward
            $('.fa-caret-square-o-right').on('click', function() {
              skip(10); //skip song for 10sec forward
              });

              //fun() for skip backward
              $('.fa-caret-square-o-left').on('click', function() {
                skip1(10);//skip song for 10sec backward
                });

              function skip(value)
              {
                var song = document.querySelector('.myaudio')
                song.currentTime += value;
              }

              function skip1(value)
              {
                var song = document.querySelector('.myaudio')
                song.currentTime -= value;
              }





              function removeTransition(e) {
    if (e.propertyName !== 'transform')
    return;
    e.target.classList.remove('playing');
  }

  function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (!audio)
    return;

    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
  }

  const keys = Array.from(document.querySelectorAll('.key'));
  keys.forEach(key => key.addEventListener('transitionend', removeTransition));
  window.addEventListener('keydown', playSound);


  $('.fa-signal').on('click',function() {
     $('.fa-signal').toggleClass('disabled');
        changemenu = 1 - changemenu;
        console.log(changemenu);
       if (changemenu == 1)
  {
        $('.mymenu').removeClass('hidden');
          $('.drumplaylist').removeClass('hidden');
          $('.fa-repeat').addClass('disabled');
            $('.fa-random').addClass('disabled');
            $('.fa-step-backward').addClass('disabled');
            $('.fa-step-forward').addClass('disabled');
           $('.fa-caret-square-o-right').addClass('disabled');
            $('.fa-caret-square-o-left').addClass('disabled');
            $('.fa-play').addClass('disabled');
            $('.fa-pause').addClass('disabled');
            $('.content').addClass('hidden');

      }
        else
        {
          $('.content').removeClass('hidden');
          $('.fa-step-backward').removeClass('disabled');
          $('.fa-step-forward').removeClass('disabled');
          $('.fa-caret-square-o-right').removeClass('disabled');
           $('.fa-caret-square-o-left').removeClass('disabled');
           $('.fa-play').removeClass('disabled');
           $('.fa-pause').removeClass('disabled');
             $('.drumplaylist').addClass('hidden');
          $('.mymenu').addClass('hidden');
        }
     });






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
