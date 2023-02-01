const API_URL = 'https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=359546444c3acfcc176a86acf9fe5eaf&hash=f61a2e44152d47a0b1c00693258b1f79';
const CONTAINER = document.querySelector('#container');

const marvel = {
    render: () => {
        let contentHTML = '';
        fetch(API_URL)
            .then(res => res.json())
            .then((json) =>{
                for(const comic of json.data.results){
                    contentHTML += createComicHTML(comic);
                }
                CONTAINER.innerHTML = contentHTML;
                CONTAINER.addEventListener("click", function(event){
                    
                    if(event.target.id === "envio"){
                        let t = event.target.parentNode.querySelector("#title").innerHTML;
                        let d = event.target.parentNode.querySelector("#data").innerHTML;
                        let e = event.target.parentNode.querySelector("#editor").innerHTML;
                        let src = event.target.getAttribute("data-src");  

                        document.querySelector("#Title").innerHTML = t;
                        document.querySelector("#Data").innerHTML = d;
                        document.querySelector("#Editor").innerHTML = e;
                        document.querySelector("#comic_envio img").setAttribute('src', src);
                         
                        document.getElementById("sendtomap").classList.remove("hidden");
                        document.getElementById("container").classList.add("hidden");


                    }
                });
            })
    }
};

function createComicHTML(comic) {
    let creatorNames = '';
    let imgSrc = comic.thumbnail.path + '.' + comic.thumbnail.extension;

    for(const creator of comic.creators.items){
        creatorNames += creator.name + ', ';

    }
    return `
    <div class="m-1 relative h-80 ease-in-out duration-300 transform hover:scale-110 hover:z-10"> 
        <div class="absolute h-full w-full text-transparent grid place-content-center hover:bg-black opacity-75 ease-in-out duration-300 hover:text-white">
            <div id="title" class="font-bold">${comic.title}</div>
            <div id="data">${comic.dates[0].date ? new Date(comic.dates[0].date).getFullYear() : ''}</div>
            <div id="editor">${creatorNames}</div>
            <button id="envio"  class="hover:border-2 border-white" data-src="${imgSrc}">Enviar</button>
        </div>
        <img  src="${imgSrc}" class="h-full" alt="">
    </div>`
}

marvel.render();



