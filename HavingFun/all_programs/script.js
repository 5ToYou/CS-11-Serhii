//program checkbox
const my_check_box = document.getElementById("my_check_box");
const Kris_check = document.getElementById("Kris_check");
const Susie_check = document.getElementById("Susie_check");
const Ralsei_check = document.getElementById("Ralsei_check");
const Spamton_check = document.getElementById("Spamton_check");
const my_submit = document.getElementById("my_submit");
const choice_result = document.getElementById("choice_result");


my_submit.onclick = function(){
    
    if(Kris_check.checked){
        choice_result.textContent = "You picked Kris"
    }else if(Susie_check.checked){
        choice_result.textContent = "You picked Susie"
    }else if(Ralsei_check.checked){
        choice_result.textContent = "You picked Ralsei"
    }else if(Spamton_check.checked){
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

    const audio = new Audio("./audio/correct.mp3");
    audio.play();

    random_num.classList.remove("RGB_text");
    setTimeout(function() {
        random_num.classList.add("RGB_text");
    }, 0);


}

