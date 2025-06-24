const database = {value : false}
const admin = {value : false}
const jsFunc = {value : false}
const adaptive = {value : false}
const edit = {value : false}

const site = 'website'
const referat = 'referat'
const presentation = 'presentation'

let activePage = site

function hide(hideObject) {
    document.getElementById(hideObject).classList.toggle('hidden');
}
function activePageHide(newPage){
    if (activePage == newPage){
        console.log(activePage + '=' + newPage)
        return false
    }
    else{
        document.getElementById(newPage).style.textDecoration = 'underline'
        document.getElementById(activePage).style.textDecoration = 'none'
        const functionEl = document.getElementById('function')
        functionEl.style.transform = 'translate(-100%, 0)'
        setTimeout(() =>{
            if (newPage == referat){
                referatPage()
            }
            else if (newPage == site){
                sitePage()
            }
            else if (newPage == presentation){
                presentationPage()
            }
            functionEl.style.transform = 'translate(0%, 0)'
        }, 1000)
        console.log('Страница ' + activePage + ' была изменена на ' + newPage)
        activePage = newPage
    }
}

function startProgramm(){
    document.getElementById("bg").style.animation = 'invisibility 1.5s';
    document.getElementById("cosmo").style.animation = 'downstart 1s';
    document.getElementById("main__menu__text").style.animation = 'upstart 1s';
    setTimeout(()=>{document.getElementById("startmenu").classList.toggle('hidden');}, 900)
    setTimeout(()=>{
        document.getElementById("program").classList.toggle('hidden');
        document.getElementById("footer").classList.toggle('hidden');
        document.getElementById("program_header").classList.toggle('hidden');
        document.getElementById('program_main').classList.toggle('hidden')
        document.getElementById("function").classList.toggle('hidden');
        document.getElementById("send_button").classList.toggle('hidden');
        document.getElementById("send").classList.toggle('hidden');
        }, 1000)
}
function arrowRotate(id){
    document.getElementById(id).classList.toggle('active');
}
function selectAllowed(select, id, stateId, priceId, price){
    document.getElementById(id).innerText = select;
    document.getElementById(stateId).innerText = select;
    if (select == 'Нет'){
        document.getElementById(priceId).textContent = '0'
    }
    else{
        document.getElementById(priceId).textContent = price;
    }
    totalSum()
}
function checkBoxChecked(img){
    document.getElementById(img).classList.toggle('checkbox_active');
}
function checkBoxToggle(checkBoxName, checkBoxId, priceId, price) {
    checkBoxName.value = !checkBoxName.value;
    if (checkBoxName.value == true){
        document.getElementById(checkBoxId).textContent = 'Есть';
        document.getElementById(priceId).textContent = price;
    }
    else if (checkBoxName.value == false){
        document.getElementById(checkBoxId).textContent = 'Нету';
        document.getElementById(priceId).textContent = '0';
    }
    totalSum()
}

function totalSum(){
    const priceSpans = document.querySelectorAll('span.price');
    const pricesArray = Array.from(priceSpans).map(span => span.textContent);

    const totalSum = pricesArray.map(price => parseFloat(price) || 0).reduce((sum, current) => sum + current, 0);
    document.getElementById('sum').innerText = totalSum;

    console.log(totalSum);
}
function referatPage(){
    document.getElementById("page_count_site").style.display = 'none';
    document.getElementById("page_count").style.display = 'block';
    document.getElementById("s2").innerText = 'Программа';
    document.getElementById("s2_soft1").innerText = 'AI';
    document.getElementById("s2_soft2").innerText = 'Человек';
    document.getElementById("s2_soft3").innerText = 'AI + Человек';
    document.getElementById("s2_soft4").style.display = 'none';
    document.getElementById("checkbox_title1").textContent = 'Анти-копи';
    document.getElementById("checkbox_title2").textContent = 'Мини документ';
    document.getElementById("checkbox_block3").style.display = 'none';
    document.getElementById("checkbox_block4").style.display = 'none';
    document.getElementById("inputdisign").placeholder = 'Тема';
}
function sitePage(){
    document.getElementById("page_count_site").style.display = 'block';
    document.getElementById("page_count").style.display = 'none';
    document.getElementById("s2").innerText = 'Фрейм-ворк';
    document.getElementById("s2_soft1").innerText = 'Django';
    document.getElementById("s2_soft2").innerText = 'Laravel';
    document.getElementById("s2_soft3").innerText = 'Flask';

    document.getElementById("checkbox_title1").textContent = 'База-данных';
    document.getElementById("checkbox_title2").textContent = 'Админ-панель';
    document.getElementById("checkbox_block3").style.display = 'flex';

    document.getElementById("checkbox_block4").style.display = 'flex';

    document.getElementById("inputdisign").placeholder = 'Ссылка на Figma';
}
function presentationPage(){
    document.getElementById("page_count_site").style.display = 'block';
    document.getElementById("page_count").style.display = 'block';
    document.getElementById("page_count").placeholder = 'Кол-во слайдов';
    document.getElementById("s1").innerText = 'Генерация';
    document.getElementById("s1_page1").innerText = 'FullAI';
    document.getElementById("s1_page2").innerText = 'Человек';
    document.getElementById("s2").innerText = 'ПО';
    document.getElementById("s2_soft1").innerText = 'Figma';
    document.getElementById("s2_soft2").innerText = 'PowerPoint';
    document.getElementById("s2_soft3").innerText = 'Google Slides';
    document.getElementById("s2_soft4").style.display = 'none';
    document.getElementById("checkbox_title1").textContent = 'Анти-копи';
    document.getElementById("checkbox_title2").textContent = 'Мини документ';
    document.getElementById("checkbox_block3").style.display = 'none';
    document.getElementById("checkbox_block4").style.display = 'none';
    document.getElementById("inputdisign").placeholder = 'Тема';
}