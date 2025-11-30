//program checkbox
const my_check_box = document.getElementById("my_check_box");
const visa_btn = document.getElementById("visa_btn");
const master_btn = document.getElementById("master_btn");
const pay_btn = document.getElementById("pay_btn");
const my_submit = document.getElementById("my_submit");
const sub_result = document.getElementById("sub_result");
const payment_result = document.getElementById("payment_result");


my_submit.onclick = function(){
    if(my_check_box.checked){
        sub_result.textContent = "you are subed";
    }else{
        sub_result.textContent = "not subed";
    }
    
    if(visa_btn.checked){
        payment_result.textContent = "paying with visa"
    }else if(master_btn.checked){
        payment_result.textContent = "paying with master"
    }else if(pay_btn.checked){
        payment_result.textContent = "paying with pay"
    }else{
        payment_result.textContent = "choose payment method"
    }
}

//program random
const min_number = 1;
const max_number = 100;
const random_btn = document.getElementById("random_btn");
const random_num = document.getElementById("random_num");

random_btn.onclick = function(){
    var random_answer = Math.floor(Math.random() * (max_number - min_number + 1));
    random_num.textContent = "your random number is " + random_answer;
}