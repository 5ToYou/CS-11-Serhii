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


//3.
function isAnagram(str1, str2){
    if (str1.length !== str2.length) return false;

    return str1.split('').sort().join('') === str2.split('').sort().join('');
}
console.log(isAnagram("listen", "silent"));


//4.
function twoSum(arr, target){

}
console.log(twoSum([2, 7, 11, 15], 9));


//5.
function isPalindrome(str){
    let myString = str
    let reversed = myString.split('').reverse().join('');
    if (reversed == str){
        return true
    }
    else{
        return false
    }
}
console.log(isPalindrome("racecar"));


//6.
const cbutton = document.getElementById("cbutton");

function myFunction(){
    var value = document.getElementById("value");
    var output = document.getElementById("end");
    output.innerHTML = value.value;
}

