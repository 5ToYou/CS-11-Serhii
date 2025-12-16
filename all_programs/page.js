function change_HTML(url){
    window.location.href = url;
}

document.getElementById("goto_index").onclick = () => {change_HTML("index.html");};



const colorful_case = document.querySelector(".colorful_case")

const min_number = 0;
const max_number = 255;


function my_func(element){
    r1 = Math.floor(Math.random() * (max_number - min_number + 1));
    g2 = Math.floor(Math.random() * (max_number - min_number + 1));
    b3 = Math.floor(Math.random() * (max_number - min_number + 1));
    const rgb_color = `rgb(${r1},${g2},${b3})`;

    element.style.color = rgb_color;
}

function blacker(element){
    element.style.color = "black"
}