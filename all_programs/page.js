function change_HTML(url){
    window.location.href = url;
}

document.getElementById("goto_index").onclick = () => {change_HTML("index.html");};



const colorful_case = document.querySelector(".colorful_case")

const min_number = 0;
const max_number = 360;


function my_func(element){
    random_color = Math.floor(Math.random() * (max_number - min_number + 1));
    const rgb_color = `hsl(${random_color},100%,50%)`;

    element.addEventListener("animationend",() => {
        element.classList.remove("anim")
    }) 
    element.style = `--dynamic-1comma:${rgb_color}`;
    element.classList.add("anim")
}

function blacker(element){
    element.style.color = "black"
}