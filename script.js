// custom selector karvu hoy to [] vaparvu pade
const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]")
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]")
const upparcaseCheck = document.querySelector("#uppercase")
const lowercaseCheck = document.querySelector("#lowercase")
const nubersCheck = document.querySelector("#Numbers")
const symbleCheck = document.querySelector("#symbols")
const indicator = document.querySelector("[data-indicater]")
const generateBtn = document.querySelector(".generatepassword")
// imp 6e aa
const allCheckBox = document.querySelectorAll("input[type=checkbox]")
const symbols = "~`!@#$%^&*()_+-={[}];:'|?/.,<>";


let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
setIndicator("yellow")

//set strenght circle color to grey

// set Passwordlength 

function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength-min)*100/(max-min)) + "% 100%";
 
}
function setIndicator(color) {

    indicator.style.backgroundColor = color;
    //shadow jate karvu 
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
    
}

function getRandomInteger(min, max) {

   return Math.floor(Math.random() * (max - min)) + min;
    // min to max ni vachye aavse numer math.random ae 0 to 1 ni vachye aavse
}

function generateRandomeNumber() {
    return getRandomInteger(0, 9);
}

function generateLowerCase() {
    return String.fromCharCode(getRandomInteger(97, 123));
}

function generateUpperCase() {
    return String.fromCharCode(getRandomInteger(65, 91));
}

function genetateSymble() {

    const randNum = getRandomInteger(0, symbols.length);

    return symbols.charAt(randNum);

}



async function copyContant() {

    try { 
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied"
    } catch (e) {
        copyMsg.innerText = "failed"
    }
    // samajavu imp 6e mane nai aavdtu la
    copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}


inputSlider.addEventListener('input' ,(e)=>{
   passwordLength = e.target.value;
   handleSlider();
});

copyBtn.addEventListener( 'click',()=> {
      if(passwordDisplay.value){
        copyContant();
      }
});

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


function handleCheckBoxChange(){
    checkCount = 0; 
    allCheckBox.forEach( (checkbox)=> {
        if(checkbox.checked){
            checkCount++;
        }
    });

    //special case
    if(passwordLength < checkCount){
         passwordLength = checkCount;
         handleSlider();  
    }
   
}

allCheckBox.forEach( (checkbox)=> {
    checkbox.addEventListener('change' , handleCheckBoxChange);
});

function calcStregth() {

    let hasUper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if (upparcaseCheck.checked) hasUper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (nubersCheck.checked) hasNum = true;
    if (symbleCheck.checked) hasSym = true;
    console.log()
    if (hasUper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        console.log("hii i am  so strong")
        setIndicator("red");
    } else if ((hasLower || hasUper) && (hasNum || hasSym) && passwordLength >= 6) {
        console.log("hii i am not so strong");
        setIndicator("green");
    } else {
        console.log("hii i am not  strong")
        setIndicator("gray")
    }
}

generateBtn.addEventListener('click' , ()=> {
    if(checkCount == 0) return ;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
    console.log("hii me aa gaya");
    password = "";
    
    // if(upparcaseCheck.checked){
    //     password += generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password += generateLowerCase();
    // }
    // if(nubersCheck.checked){
    //     password += generateRandomeNumber();
    // }
    // if(symbleCheck.checked){
    //     password += genetateSymble();
    // } 

    let funcArr = [];

    if(upparcaseCheck.checked){
        funcArr.push(generateUpperCase);
        console.log("hiii 1" );
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase) ;
        console.log("hiii 2" );
    }
    if(nubersCheck.checked){
        funcArr.push(generateRandomeNumber);
        console.log("hiii 3" );
    }
    if(symbleCheck.checked){
        funcArr.push(genetateSymble);
        console.log("hiii 4")
    } 

    console.log(funcArr.length);

    for(let i = 0;i<funcArr.length;i++){
        password += funcArr[i]();
         console.log(password.length);
    }
    console.log("aadha kam ho gaya");
    for(let i = 0;i< passwordLength - funcArr.length;i++){
        let randIndex = getRandomInteger(0,funcArr.length);
        console.log("hii randome : : ")
        console.log(randIndex)
        password += funcArr[randIndex]() ; 
        console.log(password.length)
    }
    
    //shuffle
    password = shufflePassword(Array.from(password));
    // password = shufflePassword(Array.from(password));
    console.log("kam pura ho gaya");
    passwordDisplay.value = password;
    calcStregth();

     
    
})









