//1.
function countVowels(str){
    str = str.toLowerCase();
    const vowels = ["a", "e", "i", "o", "u"];
    var count = 0;
    for (let char of str){
        if (vowels.includes(char)){
            count += 1;
        }
    }
    return count;
}
console.log(countVowels("Hello World"));

//2.
function secondLargest(arr){
    largest = -Infinity;
    second = -Infinity;
    for (let num of arr){
        if (num > largest){
            second = largest;
            largest = num;
        } 
        else if (num > second && num < largest) {
            second = num;
        }
    }
    return second;
}
console.log(secondLargest([10, 40, 30, 20, 50]));




//6.
const cbutton = document.getElementById("cbutton");

function myFunction(){
    var value = document.getElementById("value");
    var output = document.getElementById("end");
    output.innerHTML = value.value;
}

