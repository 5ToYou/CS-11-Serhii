function change_HTML(url){
    window.location.href = url;
}

document.getElementById("goto_page").onclick = () => {change_HTML("page.html");};

function isInside(val, min, max) {
    return val >= min && val <= max;
}

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
const clear_btn = document.getElementById("clear_btn");
const errors = document.getElementById("errors");

function create_element(set_name,set_bio,set_color,custom_image) {

    const final_element = document.createElement("div");
    final_element.classList.add('item');
    final_element.style.backgroundColor = set_color;

    const name = document.createElement("div");
    name.classList.add('name');
    name.textContent = set_name;

    const bio = document.createElement("div");
    bio.classList.add('bio');
    bio.textContent = set_bio;

    const Himage = document.createElement("img");
    Himage.classList.add('img_holder');

    const delete_item = document.createElement("button");
    delete_item.textContent = "delete";

    if(custom_image) {
        Himage.src = custom_image;
    } else {
        Himage.src = "./imgs/placeholder.png";
    }
    

    if(set_name === "tobyfox") {
        Himage.src = "./imgs/tobyfox_dog.gif";
        name.textContent = "IT'S TV"
        bio.textContent = "TIME!"
    }
    else if(set_name === "IM OLD") {
        Himage.src = "./imgs/IM_OLD.gif"
        name.textContent = "IM OLD"
        bio.textContent = "don't you remember me?"
    }

    if(set_color === "black") {
        name.style.color = "white";
        bio.style.color = "white";
    }

    delete_item.onclick = function() {
        final_element.remove();
    }

    final_element.appendChild(name);
    final_element.appendChild(bio);
    final_element.appendChild(Himage);
    final_element.appendChild(delete_item);
    creatures.appendChild(final_element);
}

add_btn.onclick = function() {

    const set_name = document.getElementById("set_name").value.trim();
    const set_bio = document.getElementById("set_bio").value.trim();
    const set_color = document.getElementById("set_color").value.trim();
    const custom_image = document.getElementById("custom_image").value.trim();


    if(set_name.length > 17) {
        errors.textContent = "name is too big";
    }
    else if(set_name.length < 3) {
        errors.textContent = "name is too short";
    }
    
    else if(set_bio.length > 23) {
        errors.textContent =  "bio is too big";
    }

    else {
    
        errors.textContent = "";
        create_element(set_name,set_bio,set_color,custom_image) 
    }

}

clear_btn.onclick = function() {
    creatures.innerHTML = "";
    errors.textContent = "";
}


//program dragging
let activeElement = null;
const container = document.getElementById("container_N5");

let check_1 = false;
let check_2 = false;
let check_3 = false;
let check_4 = false;

let offsetX = 0;
let offsetY = 0;

function startDragging(event, element) {
    activeElement = element;
    activeElement.style.position = "absolute";

    const rect = activeElement.getBoundingClientRect();

    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;

    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', stopDragging);
}

function stopDragging() {
    window.removeEventListener('mousemove', mousemove);
    window.removeEventListener('mouseup', stopDragging);

    activeElement = null;
}

function mousemove(event) {

    if (activeElement) {

        const rect = container.getBoundingClientRect();

        let x = event.clientX - rect.left - offsetX;
        let y = event.clientY - rect.top - offsetY;

        const minX = 0;
        const minY = 0;
        const maxX = rect.width - activeElement.offsetWidth;
        const maxY = rect.height - activeElement.offsetHeight;

        let finalX = Math.max(minX, Math.min(x, maxX));
        let finalY = Math.max(minY, Math.min(y, maxY));

        activeElement.style.left = finalX + "px";
        activeElement.style.top = finalY + "px";

        const targetId = activeElement.getAttribute("data-target");
        const targetTextElement = document.getElementById(targetId);

        if (activeElement.classList.contains("blue")) {
            if (isInside(finalX, 850, 900) && isInside(finalY, 0, 20)) {
                targetTextElement.textContent = "NICE";
                check_1 = true;
            } else {
                targetTextElement.textContent = "";
                check_1 = false;
            }
        } 
        else if (activeElement.classList.contains("red")) {
            if (isInside(finalX, 200, 250) && isInside(finalY, 280, 320)) {
                targetTextElement.textContent = "KEEP UP";
                check_2 = true;
            } else {
                targetTextElement.textContent = "";
                check_2 = false;
            }
        }
        else if (activeElement.classList.contains("pink")) {
            if (isInside(finalX, 500, 550) && isInside(finalY, 350, 400)) {
                targetTextElement.textContent = "UR A GOD";
                check_3 = true;
            } else {
                targetTextElement.textContent = "";
                check_3 = false;
            }
        }
        else if (activeElement.classList.contains("green")) {
            if (isInside(finalX, 300, 350) && isInside(finalY, 0, 50)) {
                targetTextElement.textContent = "ALMOST";
                check_4 = true;
            } else {
                targetTextElement.textContent = "";
                check_4 = false;
            }
        }

    }

    if(check_1 && check_2 && check_3 && check_4){
        document.getElementById("status").classList.add("status");
        document.getElementById("status").textContent = "PUZZLE SOLVED!";
    }
    
}
