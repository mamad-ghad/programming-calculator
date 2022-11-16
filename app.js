let resultBtns = document.querySelectorAll(".result")
let numbBtn = document.querySelectorAll("#numbers-wrapper .btn")
let box = document.querySelector("#value-box span")
let clearAllBtn = document.querySelector("#clear-all")
let deletBack = document.querySelector("#delet-back")
let saveValue = document.querySelector("#save")
let pastValue = document.querySelector("#past")
let valueBox = box.innerText
let inputMabna = 'hex'
let mabnaNumb = 16
let btnValue;
let values =[]
let recentValue;
let valueInMabna10;

resultBtns.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        choseMabna(btn.id)
    })
})



numbBtn.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        btnValue = btn.dataset.btnvalue
        if (btn.classList.contains("active")) {
            switchValue(btnValue)
            addNumb(btnValue)
            calculate()
        }
    })
})

document.addEventListener("keyup",(e)=>{
    if (inputMabna === 'hex') {
        if (e.key === 'a'|| e.key === 'A'||e.key === 'b'||e.key === 'B'||e.key === 'c'||e.key === 'C'||e.key === 'd'||e.key === 'D'||e.key === 'e'||e.key === 'E'||e.key === 'f'||e.key === 'F'||e.key === '1'||e.key === '2'||e.key === '3'||e.key === '4'||e.key === '5'||e.key === '6'||e.key === '7'||e.key === '8'||e.key === '9'||e.key === '0'){
            btnValue = e.key
            keyability(btnValue)
        }
    }
    if (inputMabna === 'dec') {
        if (e.key === '1'||e.key === '2'||e.key === '3'||e.key === '4'||e.key === '5'||e.key === '6'||e.key === '7'||e.key === '8'||e.key === '9'||e.key === '0'){
            btnValue = e.key
            keyability(btnValue)
        }
    }
    if (inputMabna === 'oct') {
        if (e.key === '1'||e.key === '2'||e.key === '3'||e.key === '4'||e.key === '5'||e.key === '6'||e.key === '7'||e.key === '0'){
            btnValue = e.key
            keyability(btnValue)
        }
    }if (inputMabna === 'bin') {
        if (e.key === '1'||e.key === '0'){
            btnValue = e.key
            keyability(btnValue)
        }
    }
})

clearAllBtn.addEventListener("click",(e)=>{
    clearAll()
})

saveValue.addEventListener("click",()=>save())
pastValue.addEventListener("click",()=>past())

function save(){
    localStorage.clear("mabnaValues")
    localStorage.setItem("mabnaValues",values)
}

function past(){
    values = localStorage.getItem("mabnaValues").split(',')
    box.innerText = values.join('')
    calculate() 

}

function keyability(){
    switchValueCapital(btnValue)
    addNumb(btnValue)
    calculate()   
}

function choseMabna(mabna){
    resultBtns.forEach(btn=>{
        btn.classList.remove("active")
        if (btn.id === mabna) {
            btn.classList.add("active")
            inputMabna = mabna
            activateNumbBtn(inputMabna)
        }
    })
}

function activateNumbBtn(mbn){
    let indexNumb =[]
    numbBtn.forEach(nBtn=>{
        nBtn.classList.remove("active")        
    })
    if (mbn === 'hex') {
        numbBtn.forEach(b=>b.classList.add("active"))
    }
    if (mbn === 'dec') {
        indexNumb = [0,1,2,4,5,6,8,9,10,12]
        indexNumb.forEach(inb=>numbBtn[inb].classList.add("active"))
    }
    if (mbn === 'oct') {
        indexNumb = [0,4,5,6,8,9,10,12]
        indexNumb.forEach(inb=>numbBtn[inb].classList.add("active"))
    }
    if (mbn === 'bin') {
        indexNumb = [10,12]
        indexNumb.forEach(inb=>numbBtn[inb].classList.add("active"))
    }
    clearAll()
}

function addNumb(val){
    box.innerText += val
    values.push(val)
}

function switchValue(x) {
    switch (x) {
        case '10':
            btnValue = 'A'
            break;
        case '11':
            btnValue = 'B'
            break;
        case '12':
            btnValue = 'C'
            break;
        case '13':
            btnValue = 'D'
            break;
        case '14':
            btnValue = 'E'
            break;
        case '15':
            btnValue = 'F'
            break;
        default:
            break; 
    }
}

function reversSwitchValue(x) {
    switch (x) {
        case 'A':
            return '10'
        case 'B':
            return '11'
        case 'C':
            return '12'
        case 'D':
            return '13'
        case 'E':
            return '14'
        case 'F':
            return '15'
        default:
            return x
    }
}

function switchValueCapital(x) {
    switch (x) {
        case 'a':
            btnValue = 'A'
            break;
        case 'b':
            btnValue = 'B'
            break;
        case 'c':
            btnValue = 'C'
            break;
        case 'd':
            btnValue = 'D'
            break;
        case 'e':
            btnValue = 'E'
            break;
        case 'f':
            btnValue = 'F'
            break;
        default:
            break; 
    }
}

function changeBackValue(x){
        switch (x) {
        case 10 :
            return 'A'
        case 11 :
            return 'B'
        case 12 :
            return 'C'
        case 13 :
            return 'D'
        case 14 :
            return 'E'
        case 15 :
            return 'F'
        default :
            return x;
    }
}

function clearAll(){
    btnValue;
    values =[]
    recentValue;
    box.innerText=""
    valueBox = box.innerText
    resultBtns.forEach(mabn=> mabn.lastElementChild.innerText = 0)
}

deletBack.addEventListener("click",()=>clearBack(5))
document.addEventListener("keyup",(e)=>{
    if (e.key === "Backspace") {
        clearBack()
    }
})
function clearBack(){
    values.pop()
    box.innerText = values.join('')
    calculate()  
}

function calculate(){
    recentValue = values.toString().split(',')
    recentValue.forEach((val,i)=>{
        val = reversSwitchValue(val)
        recentValue[i] = val
        switch (inputMabna) {
            case 'hex':
                mabnaNumb = 16
                break;
            case 'dec':
                mabnaNumb = 10
                break;
            case 'oct':
                mabnaNumb = 8
                break;
            case 'bin':
                mabnaNumb = 2
                break;
        }
    })
    valueInMabna10 = valueBox
    findValueInMabna10()
    nextCalculate()
}

function findValueInMabna10(){
    let amount1 = 0;
    recentValue.reverse().forEach((val,i)=>{
        amount1 += val*(mabnaNumb**i)
    })
    valueInMabna10 = amount1
}

function nextCalculate(){
    let javab;
    let baghiMandeh;
    let mabna2;
    let answwerHEX =[]
    let answwerDEC =[]
    let answwerOCT =[]
    let answwerBIN =[]
    resultBtns.forEach(mabn=>{
        mabna2 = mabn.id
        switch (mabna2) {
            case 'hex':
                mabna2 = 16
                break;
            case 'dec':
                mabna2 = 10
                break;
            case 'oct':
                mabna2 = 8
                break;
            case 'bin':
                mabna2 = 2
                break;
        }
        javab = valueInMabna10
        while (javab >= mabna2) {
            baghiMandeh = javab % mabna2
            javab = Math.floor(javab / mabna2)
            if (mabna2 === 16) {
                baghiMandeh = changeBackValue(baghiMandeh)
                answwerHEX.push(baghiMandeh)
            }
            if (mabna2 === 10) answwerDEC.push(baghiMandeh)
            if (mabna2 === 8) answwerOCT.push(baghiMandeh)
            if (mabna2 === 2) answwerBIN.push(baghiMandeh)
        }        
        if (mabna2 === 16) {
            javab = changeBackValue(javab)
            answwerHEX.push(javab)
            mabn.lastElementChild.innerText = answwerHEX.reverse().join('')
        }
        if (mabna2 === 10) {
            answwerDEC.push(javab)
            mabn.lastElementChild.innerText = answwerDEC.reverse().join('') 
        }
        if (mabna2 === 8) {
            answwerOCT.push(javab)
            mabn.lastElementChild.innerText = answwerOCT.reverse().join('') 
        }
        if (mabna2 === 2) {
            answwerBIN.push(javab)
            mabn.lastElementChild.innerText = answwerBIN.reverse().join('') 
        }
        
    })
}





