function change_HTML(url){
    window.location.href = url;
}

document.getElementById("goto_page").onclick = () => {change_HTML("page.html");};

//program checkbox
const my_check_box = document.getElementById("my_check_box");
const Kris_check = document.getElementById("Kris_check");
const Susie_check = document.getElementById("Susie_check");
const Ralsei_check = document.getElementById("Ralsei_check");
const Spamton_check = document.getElementById("Spamton_check");
const my_submit = document.getElementById("my_submit");
const choice_result = document.getElementById("choice_result");
const image_holder = document.getElementById("image_holder");
const image = document.createElement("img");
image.style.objectFit = "contain";

const audio_kris = new Audio("./audio/deltarune_weapons_pull.mp3");
const audio_susie = new Audio("./audio/deltarune_susie.wav");
const audio_spamton = new Audio("./audio/spamton_laugh_noise.ogg");
const audio_ralsei = new Audio("./audio/deltarune_explosion.mp3");

my_submit.onclick = function(){
    
    if(Kris_check.checked) {
        audio_kris.play();
        image.src = './imgs/Kris.png';
        image_holder.appendChild(image);
        choice_result.textContent = "You picked Kris"
    } else if(Susie_check.checked) {
        audio_susie.play();
        image.src = './imgs/Susie.png';
        image_holder.appendChild(image);
        choice_result.textContent = "You picked Susie"
    } else if(Ralsei_check.checked) {
        audio_ralsei.play();
        image.src = './imgs/Ralsei.webp';
        image_holder.appendChild(image);
        choice_result.textContent = "You picked Ralsei"
    } else if(Spamton_check.checked) {
        audio_spamton.play();
        image.src = './imgs/Spamton.png';
        image_holder.appendChild(image);
        choice_result.textContent = "You picked Spamton"
    } else {
        choice_result.textContent = "Only one bro"
    }
}

//program random
const min_number = 1;
const max_number = 100;
const random_btn = document.getElementById("random_btn");
const random_num = document.getElementById("random_num");

random_btn.onclick = function() {
    var random_answer = Math.floor(Math.random() * (max_number - min_number + 1));
    random_num.textContent = random_answer;

    const audio_correct = new Audio("./audio/correct.mp3");
    audio_correct.play();

    random_num.classList.remove("pulse_text");
    setTimeout(function() {
        random_num.classList.add("pulse_text");
    }, 1);
}

//program music
const player_containers = document.querySelectorAll('.music-player');

player_containers.forEach(player_container => {
    const audio_element = player_container.querySelector('audio');
    const btn_resume = player_container.querySelector('.resume');
    const btn_stop = player_container.querySelector("div:not(.resume)");

    btn_resume.onclick = function() {
        if(audio_element.paused){
            audio_element.play(); 
            btn_resume.src = "./imgs/pause_btn.png"
            
        }else{
        audio_element.pause();
        btn_resume.src = "./imgs/play_btn.png"
        }
        
    }

    btn_stop.onclick = function() {
        audio_element.currentTime = 0;
        audio_element.pause();
        btn_resume.src = "./imgs/play_btn.png"
    }

});

//program dog_creator
const creatures = document.querySelector(".creatures");
const add_btn = document.getElementById("add_btn");


function create_dog() {

    const set_name = document.getElementById("set_name").value;
    const set_hp = document.getElementById("set_hp").value;
    const set_color = document.getElementById("set_color").value;

    const name = document.createElement("div");
    name.classList.add('name');
    name.textContent = set_name;

    const hp = document.createElement("div");
    hp.classList.add('hp');
    hp.textContent = set_hp;

    const dog = document.createElement("img");
    dog.classList.add('dog_holder');
    dog.src = "./imgs/dog.png"

    dog.style.backgroundColor = set_color;

    creatures.appendChild(name)
    creatures.appendChild(hp)
    creatures.appendChild(dog)
    creatures.appendChild(color)
}

add_btn.onclick = function(){

    
    create_dog()
}

