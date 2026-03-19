function init_onlyyou(){
    // Initialize the height of two divs
    $("#div_onlyyou").css({"height":$(window).height()+260+"px"});
    $("#div_oy_inner").css({"height":$(window).height()+260+"px"});

    // Set custom background
    var start_bg_img=start_content['bg_img'];
    if(typeof(start_content['bg_style'])!='undefined' && start_content['bg_style']=='bg_custom'){
        if(typeof(start_bg_img)!='undefined' && start_bg_img!=''){
            $("#div_onlyyou").css({"background-image": 'url('+start_bg_img+')'});
        }
    }

    if(typeof(start_content['chase_title'])!='undefined' && start_content['chase_title']!=''){
        $('.div_oy_text h1').html(start_content['chase_title']); // load custom content
    }else{
        $('.div_oy_text h1').html('Will you be my girlfriend?'); // default text
    }

    if(typeof(start_content['chase_text'])!='undefined' && start_content['chase_text']!=''){ 
        $('.div_oy_text .p_oy_text').html(start_content['chase_text']); // load custom content
    }else{ // default text
        $('.div_oy_text .p_oy_text').html('Xin chào em iu của anh, anh yêu em nhiều lắm áaaa. Không chỉ khi nhìn thấy em, ngay cả khi nghĩ về em cũng khiến tim anh đập nhanh. Anh hứa sẽ chăm sóc em thật tốt. Em nhớ phải ăn uống đầy đủ, giữ gìn sức khỏe nhaaa. Yêu em nhiềuuu');
    }
    
    // Set the image before the main text
    if(typeof(start_content['img_bool'])!='undefined' && start_content['img_bool']=='img_true'){
        if(typeof(start_content['img_src'])!='undefined' && start_content['img_src']!=''){
            $(".img_oy_text").attr('src', start_content['img_src']);
        }
    } 
    if(typeof(start_content['img_bool'])=='undefined' || typeof(start_content['chase_text'])=='undefined'){
        var random_img=random_img_as();
        $(".img_oy_text").attr('src', random_img);
    }
    // $('#span_pw_typed').addClass('heart-cursor');
} 


var array_oy_benefit; 

// Load content or set default values
if(typeof(start_content['chase_benefit'])!='undefined'){
    array_oy_benefit=start_content['chase_benefit']; 
    
    if(array_oy_benefit[0]==''){
        array_oy_benefit[0]='I will love you more with every passing day';
    }
    if(array_oy_benefit[1]==''){
        array_oy_benefit[1]='I will cherish every moment we share together';
    }
    if(array_oy_benefit[2]==''){
        array_oy_benefit[2]='I will tell you stories when you can’t sleep';
    }
    if(array_oy_benefit[3]==''){
        array_oy_benefit[3]='I will give you the freedom to do what you love';
    }            
}else{
    array_oy_benefit=[
        'I will love you more with every passing day',
        'I will cherish every moment we share together',
        'I will tell you stories when you can’t sleep',
        'I will give you the freedom to do what you love'
    ];
}

console.log(array_oy_benefit); 

var index_text_oy=0; 
var count_text_oy=array_oy_benefit.length;

console.log('Total conditions: '+count_text_oy);

function oy_show_benefit(){
    var oy_text_height=$(".div_oy_text").height();
    if(index_text_oy<count_text_oy){  
        console.log('current index -> '+index_text_oy);                
        console.log('current benefit -> '+array_oy_benefit[index_text_oy]);

        $(".li_oy_benefit").eq(index_text_oy).html(array_oy_benefit[index_text_oy]).show();

        // Adjust height dynamically as text increases
        if($(document).height()-oy_text_height<520){
            $("#div_onlyyou").css({"height":$(document).height()+160+"px"});
            $("#div_oy_inner").css({"height":$(document).height()+"px"});
            console.log('updated document height');
        } 

        index_text_oy++;
    } else{
        oy_show_note();
    }
}

function oy_show_note(){
    $("#div_oy_note").show(); 
}

function oy_hide_note(){
    $("#div_oy_note").hide(); 
}

function oy_go_next(){  
    $("#div_oy_yes").show();
    setTimeout(function(){                
        $('#div_onlyyou').fadeOut();
        init_theme(); 
    },2000);
    // setTimeout(function(){ 
    //     $('#div_onlyyou').remove();
    // },3000);
}

function random_img_as(){  // get random template image
    var random_num=Math.floor(Math.random()*(array_as_pics_s.length)); 
    var random_img=array_as_pics_s[random_num];
    return random_img;
}
