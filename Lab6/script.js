var Myvideo = document.getElementById("video")

function playpause(){
    if (Myvideo.pause()){
        Myvideo.play(); 
        console.log("Video is playing");
    }
    else{
        Myvideo.pause();
        console.log("Video is paused");  
    }
    
}