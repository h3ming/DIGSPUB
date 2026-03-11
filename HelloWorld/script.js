function hello() {
    let name = prompt("What is your name?");
    if (name) {
        document.getElementById("greeting").innerHTML = `Hello, ${name}!`;
    }
}



function splat() {
    let sfx = new Audio("tomato-squash.mp3");
    sfx.play()

    const img = document.createElement('img');
    img.source = "tomato_splatter.png";
    img.id = 'tomato'
    img.display 

    const randomPx = Math.floor(Math.random() * 300) + 120;
    // img.style.width = randomPx + 'px';  
    // img.style.height = 'auto';  

    img.style.width = 80 + 'px';
    img.style.height = 80 + 'px';
    
    const randomX = Math.random() * (1680 - randomPx);  
    const randomY = Math.random() * (880 - randomPx); 
    console.log("X:", randomX)
    console.log("Y:", randomY)
    img.style.position = 'absolute';
    img.style.left = randomX + 'px';
    img.style.top = randomY + 'px';
    // const randomRotation = Math.floor(Math.random() * 20) - 10; 
    // img.style.transform = `rotate(${randomRotation}deg)`;

    document.querySelector('body').appendChild(img);
}

