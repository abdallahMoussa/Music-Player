$(function(){
    //get some song links with its info 
    var sounds=[
        
        {songId:'0', song:'El Molok',singer:'Anba' ,
         src : 'https://serv100.albumaty.com/songs_2020/Albumaty.Com_ahmd_sad_almlwk_-_ma_anbh_wdbl_zwksh.mp3',
        picLink:'https://angartwork.akamaized.net/?id=142590337&size=640',liked:false},
        
         {songId:'1', song:'Unstoppable',singer:'Sia' ,
         src : 'https://www.ceenaija.com/wp-content/uploads/music/2021/06/Sia_-_Unstoppable_CeeNaija.com_.mp3',
        picLink:'https://ra2ej.awicdn.com/site-images/sites/default/files/ra2ej-prod/video/d/2/412075/08648dcb10dc9c72ed9054548e05cfc2ae60e08f-120721084817.jpg?preset=v3.0_1200xDYN&save-png=1&rnd=1519151RND220215',liked:false},
        
        
        {songId:'2', song:'Hey Mama',singer:'Bebe Rexha' ,
         src : 'https://songszilla.net/files/download/id/1511&volume=75&showstop=1&showvolume=1',
        picLink:'https://desire2music.net/wp-content/uploads/2015/04/11100451_401999896650791_1674670447_n1.jpg',liked:false},
        
        
        {songId:'3', song:'Thunder',singer:'Imagine Dragons' ,
         src : 'https://www.naijafinix.com.ng/wp-content/uploads/2021/03/Imagine-Dragons-Thunder-via-Naijafinix.com_.mp3?_=1',
        picLink:'https://i.ytimg.com/vi/fKopy74weus/maxresdefault.jpg',liked:false},
        
        {songId:'4', song:'Believer',singer:'Imagine Dragons' ,
         src : 'https://www.naijafinix.com.ng/wp-content/uploads/2021/04/Imagine-Dragons-Believer-via-Naijafinix.com_.mp3?_=1', picLink:'https://wsbu.files.wordpress.com/2017/02/8d647ff0ebe5843e33a46b856f990e43-1000x1000x1.jpg',liked:false},
        
        {songId:'5', song:'Seto Ana',singer:'Akram Hosny' ,
         src : 'https://serv100.albumaty.com/songs_2020/Albumaty.Com_akrm_hsny_stw_ana_-_mn_mslsl_mktwb_alya.mp3',
        picLink:'https://i.ytimg.com/vi/cx9QFJCqrYA/maxresdefault.jpg',liked:false}
        
    ]
    
    // variables where songs are stored 
    var songsVar=[],
        src = []
    
    for(var i=0 ; i<6 ; i++){
        songsVar[i]=document.createElement('audio');
        src[i]= document.createElement('source');
        $($(src)[i]).attr('src',sounds[i].src).attr('id',sounds[i].songId);
        $($(src)[i]).appendTo(songsVar[i])
    }
    
    // colors which will look the theme 
    var themes=['darkcyan','darkred','yellow','orange','mediumorchid']
  
    
     
   
    /********** set initSong *********/
    
    /* document.createElement('audio'),
        src = document.createElement('source')
        $(src).attr('src',sounds[1].src).attr('id',sounds[1].songId)
    */
    var curSongId = 1,
        song =songsVar[curSongId];
        $('#song-name').text(sounds[curSongId].song)
        $('#singer-name').text(sounds[curSongId].singer)
        $('.img').css({'background-image':'url('+sounds[curSongId].picLink+')'})
       // $(src).appendTo(song)
    if(sounds[curSongId].liked){
        $('.extentions .fa-heart').first().show()
        $('.extentions .fa-heart').last().show()
    }
    
    
    /************* play song *****************/
    //$(src).attr('id')
     
     function playSong(id){ 
         songsVar[curSongId].pause()
         songsVar[curSongId].currentTime=0
         curSongId = id
         clearInterval(setColor)
         color(1)
         time()
         $('.fa-play').hide();
         $('.fa-pause').show();
         $('.fa-play').click()
         changeTitle();
    }
    
  // titles about song(name , img , ..etc)
    function changeTitle(){
        $('.img').css({'background-image':'url('+sounds[curSongId].picLink+')'})
        $('#song-name').text(sounds[curSongId].song)
        $('#singer-name').text(sounds[curSongId].singer)
        $('.fa-heart').hide()
        if(sounds[curSongId].liked){
            $('#like').show()
        }else{
             $('#dislike').show()
        }
    }
    
    
    /********** play & pause & next & prev  ***************/
     $('.fa-play').click(function(){
        $(this).hide();
        $('.fa-pause').show()
        songsVar[curSongId].play();
        Timing();
        coloring(songsVar[curSongId].duration);
    })
    
    $('.fa-pause').click(function(){
        $(this).hide();
        $('.fa-play').show()
        songsVar[curSongId].pause()
        clearInterval(setTime,time())
        clearInterval(setColor)
    })
        
    var eventRun = 0; // flag to inhance the animation look
    
    $('.next').click(function(){
        
        eventRun++;
            while(eventRun > 0){
                
              $('.song').first().animate({'marginTop':'-54px','opacity':'0'},function(){
                    $(this).css({'marginTop':'0px','opacity':'1'}).appendTo('.songs')
                    
              })
             
             $('.songActive').first().removeClass('songActive')
             $($('.song')[2]).addClass('songActive')
            eventRun--
            }
        if(eventRun==0){
            playSong($($('.song')[2]).attr('id'))
        }
        
    })
     $('.prev').click(function(){
         
            
        eventRun++
         while(eventRun > 0){
             
             $('.song').last().clone()
                 .css({'marginTop':'-54px','opacity':'1'}).prependTo('.songs')
                 .animate({'marginTop':'0px'})
             $('.song').last().remove();

             $($('.song')[3]).animate({'opacity':'0'},function(){$(this).css({'opacity':'1'})})

             $('.songActive').first().removeClass('songActive')
                $($('.song')[1]).addClass('songActive')
             eventRun--
         }
         if(eventRun==0){
                if(curSongId == 0){playSong(5)}
                else{playSong(curSongId-1)}
            }
         
    })
    
    /***************** themes *********************/
    // open color box
    $('.color-setting i').click(function(){
        if( $(this).attr('alt')=="off" ){
            $('.theme').fadeIn()
            $('.color-setting').animate({'width':'220px'}).css({'backgroundColor':'gray'})
            $(this).attr('alt',"on")
        }else{
            $('.theme').fadeOut()
             $('.color-setting').animate({'width':'25px'},500).css({'backgroundColor':themes[currentTheme]})
            $(this).attr('alt',"off")
        }
        
    })
    
    // get all elemnts which has same color to change its color
    $(function(){
        $('.body *').each(function(){
            
            if($(this).css('backgroundColor')=="rgb(0, 139, 139)"){
                $(this).addClass('colorBack')
                
            }
            if($(this).css('color')=="rgb(0, 139, 139)"){
                $(this).addClass('colorLine')
            } 
        })
        $('.theme').removeClass('colorBack')
        $('.song').not('songActive').removeClass('colorBack')
        $('.alert').addClass('colorBack')
    })
    
    // now i wanna change the class Attr not the element Attr so..
    $("head").append('<style type="text/css"></style>');
    var newStyle = $("head").children(':last'),
        currentTheme; // current color theme
    
    $('.theme').click(function(){
         
        
        $('.colorLine').css('color',themes[$(this).index()])
        newStyle.html('.activeCell,.activeVolCell{background:'+themes[$(this).index()]+';}.container{background:linear-gradient(to bottom right ,beige,'+themes[$(this).index()]+')}.colorBack{background:'+themes[$(this).index()]+'}');
        
        currentTheme = $(this).index();
        $('.color-setting i').click()
        
    })
    
   
    
    /********** set the playlist *********/
    $.each($('.song'),function(){
        $(this).css('background-image','url('+sounds[$(this).index()].picLink+')').attr('id',$(this).index())
    })  
   
    
    /*************** timing **************/
    
    // set the current time
    function time(){
        var currTime = Math.ceil(songsVar[curSongId].currentTime),
            currMin=0,currSec=0;
        if(currTime>0){
            while(currTime >=60){
                currMin++;
                currTime-=60;
            }
            currSec=currTime
        }
        if(currSec>9){
            $('.cur-time').text('0'+currMin+':'+currSec)    
        }else{
            $('.cur-time').text('0'+currMin+':0'+currSec)
        }
        if(song.currentTime == song.duration){
            $('.next').click()
        }

         
    }
    //colored the playLine
     function color(ind=0){
         $('.cell').first().addClass('activeCell')
         $('.activeCell').last().next().addClass('activeCell')
         if(ind){
             for( var i=ind+1 ; i<186 ; i++){
                $($('.cell')[i]).removeClass('activeCell')
            }
             while(ind>0){
                $($('.cell')[ind--]).addClass('activeCell') 
             }
         }
         
     }
    
    /************* play song ****************/
    var setTime , setColor ,
        colorDur
   
   // set the song length
    function Timing(){
        
        if( $.isNumeric(songsVar[curSongId].duration) ){
            var sec = Math.ceil(songsVar[curSongId].duration)%60,
                min = Math.ceil(songsVar[curSongId].duration)/60
        
        
           $('.len-time').text('0'+Math.floor(min) +':'+sec)
           setTime = setInterval(time,1000)
        }else{
            $(songsVar[curSongId].duration).on("change",function(){timing()})
        }
        
        
       
    }
    // go the playLine
    function coloring(dur){
       
        if( $.isNumeric(dur) ){
            colorDur = Math.ceil(dur)/185;
            colorDur *=1000;
            setColor = setInterval(color,colorDur)   
            
        }else{
           $(dur).on("change",function(){coloring(dur)})
        }
       
    }
    
    
    
    /*********** PlayLine Range ************/ 
    // create custome playLine
    
    function getPlayLine(){
        var cell= document.createElement('div');
        $(cell).addClass('cell')

        for(var i=0 ; i<180 ; i++){
            $(cell).clone().css({'height':(((Math.random()*10)%7)+4) +'px'}).appendTo('.range')
        }
         $(cell).clone().appendTo('.range')
         $(cell).clone().appendTo('.range')
         $(cell).clone().appendTo('.range')

    }
    getPlayLine()
    
    
    $('.cell').click(function(){
        
        songsVar[curSongId].currentTime = $(this).index()*(colorDur/1000);
        color($(this).index())
    })
    
    
    
    
    
    /*********** Volume Range ************/
    // create custome volume range
    function getVolLine(){
        var volCell= $('.volCell');
        for(var i=0; i<10 ; i++){
            $('.volCell').last().clone().css({
                'height':'+=2px'}).appendTo('.volume')
        }
     
        songsVar[curSongId].volume=1
    }
    getVolLine()

    $('.volCell').click(function(){
       
        var ind= $(this).index(),
            i=ind-1;
     
       if(!songsVar[curSongId].muted){
           
            while(ind >0){

                $($('.volCell')[ind]).addClass('activeVolCell')
                ind--
            }
             for( ; i<11 ; i++){
                $($('.volCell')[i]).removeClass('activeVolCell colorBack')
            }
            songsVar[curSongId].volume = ($(this).index()-2)/10
           
       } 
    })
    $($('.volCell')[7]).click()
    
    
      
    /************ volume on & off*******/
    
    $('.fa-volume-slash').hide()
    
    $('.fa-volume').click(function(){
        songsVar[curSongId].muted=true
        $(this).hide()
        $('.fa-volume-slash').show()
        $('.activeVolCell').addClass('muted')
        $('.volCell').css({'cursor': 'not-allowed'})
    })
     $('.fa-volume-slash').click(function(){
         songsVar[curSongId].muted=false
        $(this).hide()
        $('.fa-volume').show()
         $('.activeVolCell').removeClass('muted')
         $('.volCell').css({'cursor': 'pointer'})
     })
    
    /******* like & dislike song ***********/
    
     $('#like').hide();
    $('#like').click(function(){
            $('#like').hide();
            $('#dislike').show();
            sounds[curSongId].liked=false
        })
    
    $('#dislike').click(function(){
        $('#dislike').hide();
        $('#like').show();
        sounds[curSongId].liked=true
    })
    
    // some icons will develop soon
     $('.extentions').find('i').not('.fa-heart').click(function(){
         $('.body').animate({'opacity':'.3'})
         $('.alert').animate({'width':'200px'},400,function(){
             $('.alert span').fadeIn()
         })
         setTimeout(function(){
             $('.body').animate({'opacity':'1'})
             
             $('.alert span').fadeOut('fast',function(){
                 $(this).parent().animate({'width':'0px'})
             })
         },2000)
         
     })
    
    // custome the page size
  // $('.container').css('height',$(window).height() + 'px') 
});