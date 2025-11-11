

function Videoplay(){
    const Myvideo = document.getElementById("video");
    let video_button = document.getElementById("video_button");

    if (Myvideo.paused){
        Myvideo.play(); 
        video_button.textContent = "playing";
        console.log("Video is playing");
    }else{
        Myvideo.pause();
        video_button.textContent = "video"
        console.log("Video is paused");  
    };
}


function Audioplay(){
    const Myaudio = document.getElementById("audio");
    let audio_button = document.getElementById("audio_button");

    if (Myaudio.paused){
        Myaudio.play();
        audio_button.textContent = "playing";
        console.log("Audio is playing");
    }else{
        Myaudio.pause();
        audio_button.textContent = "audio";
        console.log("Audio is paused");  
    }
    
}