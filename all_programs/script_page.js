function change_HTML(url){
    window.location.href = url;
}

document.getElementById("goto_index").onclick = () => {change_HTML("index.html");};