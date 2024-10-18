let name = prompt("Please enter your name")



    


let h2Element = document.querySelector('.card h2');

console.log(h2Element.innerText);



function clock(){
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let day = now.toLocaleDateString('tr-TR', { weekday: 'long' });
 let formattedTime = `${hours}:${minutes}:${seconds}`;
h2Element.innerText = `KODLUOYRUZ\nMerhaba ${name}! Hoş Geldin!\n${formattedTime} ${day} tarihinde \n
Javascript 1.Ödevindesiniz. :)`
}



setInterval(clock,1000);
clock();