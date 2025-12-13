//program checkbox
const my_check_box = document.getElementById("my_check_box");
const Kris_check = document.getElementById("Kris_check");
const Susie_check = document.getElementById("Susie_check");
const Ralsei_check = document.getElementById("Ralsei_check");
const Spamton_check = document.getElementById("Spamton_check");
const my_submit = document.getElementById("my_submit");
const choice_result = document.getElementById("choice_result");
const image_holder = document.getElementById("image_holder");

const audio_kris = new Audio("./audio/deltarune_weapons_pull.mp3");
const audio_susie = new Audio("./audio/deltarune_susie.wav");
const audio_spamton = new Audio("./audio/spamton_laugh_noise.ogg");
const audio_ralsei = new Audio("./audio/deltarune_explosion.mp3");

my_submit.onclick = function(){
    
    if(Kris_check.checked){
        audio_kris.play();
        image_holder.src = './imgs/Kris.png';
        choice_result.textContent = "You picked Kris"
    }else if(Susie_check.checked){
        audio_susie.play();
        image_holder.src = './imgs/Susie.png';
        choice_result.textContent = "You picked Susie"
    }else if(Ralsei_check.checked){
        audio_ralsei.play();
        image_holder.src = './imgs/Ralsei.webp';
        choice_result.textContent = "You picked Ralsei"
    }else if(Spamton_check.checked){
        audio_spamton.play();
        image_holder.src = './imgs/Spamton.png';
        choice_result.textContent = "You picked Spamton"
    }else{
        choice_result.textContent = "Only one bro"
    }
}

//program random
const min_number = 1;
const max_number = 100;
const random_btn = document.getElementById("random_btn");
const random_num = document.getElementById("random_num");

random_btn.onclick = function(){
    var random_answer = Math.floor(Math.random() * (max_number - min_number + 1));
    random_num.textContent = random_answer;

    const audio_correct = new Audio("./audio/correct.mp3");
    audio_correct.play();

    random_num.classList.remove("pulse_text");
    setTimeout(function() {
        random_num.classList.add("pulse_text");
    }, 0);


}

