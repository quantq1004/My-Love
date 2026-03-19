var audio_music=document.getElementById('audio_music'); 
var audio_record=document.getElementById('audio_record'); 

if(typeof(music_json['music_select'])!='undefined' && music_json['music_select']!='null' && music_json['music_select']!=''){
    if(music_json['music_select']=='m_online' && music_json['m_online_url']!='null' && music_json['m_online_url']!=''){ // select from online list
        $('#audio_music').attr('src',music_json['m_online_url']);
    }
    if(music_json['music_select']=='m_upload' && music_json['m_upload_url']!='null' && music_json['m_upload_url']!=''){ // uploaded music
        $('#audio_music').attr('src',music_json['m_upload_url']);
    }
    if(music_json['music_select']=='m_upload' && (music_json['m_upload_url']=='null' || music_json['m_upload_url']=='')){ // selected upload but no file
        console.log('music_select m_upload but m_upload_url is null, set default music');
        var random_music=random_music_as();
        $('#audio_music').attr('src',random_music);
    }
    if(theme!='audio_list' || (theme=='audio_list' && start_id!='null')){
        audio_music.play(); // auto play music
    }else{
        audio_music.pause();
        console.log('audio_list && no start');
    }
}else{ // new or empty project
    console.log('set random music');
    var random_music=random_music_as();
    $('#audio_music').attr('src',random_music);
    if(theme!='audio_list' || (theme=='audio_list' && start_id!='null')){
        audio_music.play();
    }else{
        audio_music.pause();
        console.log('audio_list && no start');
    }
}

if(typeof(record_json['record_bool'])!='undefined' && record_json['record_bool']!='null' && record_json['record_bool']!=''){
    if(record_json['record_bool']=='r_true' && record_json['r_wechat_url']!='null' && record_json['r_wechat_url']!=''){ // use voice recording
        $('#audio_record').attr('src',record_json['r_wechat_url']);
    }
    if(record_json['record_bool']=='r_true' && (record_json['r_wechat_url']=='null' || record_json['r_wechat_url']=='')){ // selected voice but no recording
        $('#div_record').hide(); 
        $('#div_record_tips').hide();
    }
    if(record_json['record_bool']=='r_false'){ // no voice
        $('#div_record').hide();
        $('#div_record_tips').hide();
    }
}else{
    if(theme_content['bool_save']==false){ // new or unsaved project
        console.log('set random record');
        $('#audio_record').attr('src','./images/ffff.mp3');
    }else{ // hide if no voice defined
        $('#div_record').hide();
        $('#div_record_tips').hide();
    }
}

function random_music_as(){  // get random music
    var random_num=Math.floor(Math.random()*(array_as_music.length)); 
    var random_music=array_as_music[random_num];
    return random_music;
}

// control music play/pause
var img_music=document.getElementById('img_music');
var timeout_music;

function music_switch(){ // toggle   
    clearTimeout(timeout_music);  
    if(audio_music.paused){
        console.log('switch music to play');
        audio_music.play();
        audio_record.pause();                
        img_music.style.webkitAnimation="music_play_rotate 1s linear infinite";
        $(".div_music_tips").html("Playing").show();                
        timeout_music=setTimeout(function(){$(".div_music_tips").hide()}, 2500);
    }else{
        console.log('switch music to paused'); 
        audio_music.pause();
        img_music.style.webkitAnimation="";
        $(".div_music_tips").html("Paused").show();  
        timeout_music=setTimeout(function(){$(".div_music_tips").hide()}, 2500); 
    } 
}

var timeout_record;
var div_record=document.getElementById('div_record');

function record_switch(){ // toggle 
    clearTimeout(timeout_record);
    if(audio_record.paused){
        console.log('switch record to play'); 
        audio_record.play();
        audio_music.pause();
        img_music.style.webkitAnimation="";
        div_record.style.webkitAnimation="btn_rotate 1s linear infinite";
        $(".div_record_tips").html("Playing").show(); 
        timeout_record=setTimeout(function(){$(".div_record_tips").hide()}, 2500);
    }else{
        console.log('switch record to pause');  
        audio_record.pause();
        audio_music.play();                
        img_music.style.webkitAnimation="music_play_rotate 1s linear infinite";
        div_record.style.webkitAnimation="";
        $(".div_record_tips").html("Paused").show();  
        timeout_record=setTimeout(function(){$(".div_record_tips").hide()}, 2500); 
    } 
}

// WeChat API ready
wx.ready(function(){
    console.log('wx.ready success to start');
    audio_music.play(); 
    wx.checkJsApi({
        jsApiList: ['updateAppMessageShareData','updateTimelineShareData'],
        success: function(res) {
            console.log('wx.checkJsApi success');
            if(theme!='audio_list' || (theme=='audio_list' && start_id!='null')){
                audio_music.play();
            }else{
                audio_music.pause();
                console.log('audio_list && no start');
            }
        },
        complete: function(res) {
            console.log('wx.checkJsApi complete');
            if(theme!='audio_list' || (theme=='audio_list' && start_id!='null')){
                audio_music.play();
            }else{
                audio_music.pause();
                console.log('audio_list && no start');
            }
        }
    });
});

// WeChat error fallback
wx.error(function(res){
    console.log('wx.error -> '+res);
    audio_music.play();  
    wx.checkJsApi({
        jsApiList: ['updateAppMessageShareData','updateTimelineShareData'],
        success: function(res) {
            console.log('wx.checkJsApi success');
            if(theme!='audio_list' || (theme=='audio_list' && start_id!='null')){
                audio_music.play();
            }else{
                audio_music.pause();
                console.log('audio_list && no start');
            }
        },
        complete: function(res) {
            console.log('wx.checkJsApi complete');
            if(theme!='audio_list' || (theme=='audio_list' && start_id!='null')){
                audio_music.play();
            }else{
                audio_music.pause();
                console.log('audio_list && no start');
            }
        }
    });                  
});

// Flying hearts on click
document.addEventListener('click', function(e){
    var heart = document.createElement('div');
    heart.className = 'flying-heart';
    heart.style.left = (e.clientX - 10) + 'px';
    heart.style.top = (e.clientY - 10) + 'px';
    heart.innerHTML = '❤️';
    document.body.appendChild(heart);

    // Remove after animation
    setTimeout(function(){
        heart.remove();
    }, 1800);
});