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
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === target) {
                return [i, j];
            }
        }
    }
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
function myFunction(){
    var num = (document.getElementById("Input").value);

    const romanNumerals = [
                ["M",1000], ["CM",900], ["D",500], ["CD",400],
                ["C",100], ["XC",90], ["L",50], ["XL",40],
                ["X",10], ["IX",9], ["V",5], ["IV",4], ["I",1]
    ];

    let result = "";
    let tempNum = num;

    for (let [roman, value] of romanNumerals) {
        while (tempNum >= value) {
            result += roman;
            tempNum -= value;
        }
    }

    document.getElementById("end").textContent = result;
}

