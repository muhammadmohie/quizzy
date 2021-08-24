const html = document.getElementById('html');
const css = document.getElementById('css');
const js = document.getElementById('js');
const hello = document.getElementById('hello');
let time_counter=81;


html.addEventListener('click',()=>{

    html.parentNode.parentNode.style.display='none';
    timer(time_counter);
    
})
css.addEventListener('click',()=>{

    css.parentNode.parentNode.style.display='none';
    timer(time_counter);

})
js.addEventListener('click',()=>{

    js.parentNode.parentNode.style.display='none';
    timer(time_counter);

})



function timer(time_counter){

hello.style.display='block';

const countdown = setInterval(()=>{

    time_counter--;
    allTime(time_counter);
    if(time_counter<1){
        clearInterval(countdown);
        finshed();
    }
},1000)



function allTime (second){
        let min = Math.floor(second/60);
        let sec = Math.floor(second%60);
        hello.innerHTML = `${min<10 ? '0' : ''}${min}:${sec<10 ? '0' : ''}${sec}`;

}


function finshed(){
    hello.style.display= 'none';
    html.parentNode.parentNode.style.display = 'block';
}


}