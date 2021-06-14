var data = null;

function selectNav(id)
{
//TODO
}


async function getData(){
    data = await fetch("/data").then(response => {
        return response.json();
    }).then(json => {
        console.log(json);
        return json;
    }).catch(err => {
        console.log(err);
    });
}

async function navInterface(arg){
    
    if(arg == undefined)
    {
        arg = "showcase";
    }
    if(typeof(arg)=="string"){
        arg = arg.trim();
    }
    else{
    await getCommonItems();
    }

    if(document.getElementById("showcase-title").innerText.toLowerCase()==arg){
        return;
    }

    switch (arg) {
        case "showcase":
            selectNav("showcase");
            document.getElementById("showcase-title").innerText="showcase";
            await openShowcase();
            break;

        case "info":
            selectNav("info");
            document.getElementById("showcase-title").innerText="info";
            await openInfo();
            break;

        case "updates":
            selectNav("updates");
            document.getElementById("showcase-title").innerText="updates";
            await openUpdates();
            break;
    
        default:
            console.log(arg);
            selectNav("showcase");
            document.getElementById("showcase-title").innerText="showcase";
            openShowcase();
            break;
    }
}



async function showMenu()
{
    var button = document.getElementById("menu-bar");
    button.style.transition="width 1s"

    if(button.style.width && button.style.width != "0vw"){
        button.style.width = "0vw";
    }
    else{
        button.style.width = "100vw";
    }
}


async function getCommonItems()
{
    
    console.log(document.getElementsByTagName("body"));
    var text = document.getElementsByTagName("body")[0];

    text.innerHTML = `
    
    <button id = "menu-button" onclick="showMenu()"><img src="https://raw.githubusercontent.com/houseofgeeks/hg/front-end/client/src/components/Navbar/side-bar.svg" class="blackWave" alt="sidebar"></button>

    <div id="navigation-bar">
        
        <div id="name"><a href="#" onclick = "navInterface('showcase')" >
            <img src="./assets/common/symbol.png">
        </a></div>

        <div id = "menu-bar" > 
            
            <div class = "nav-items" id="info"><a href="#" onclick = "navInterface('info')">Info</a></div>
            <div class = "nav-items" id="updates"><a href="#" onclick = "navInterface('updates')">Updates</a></div>
            <div class = "nav-items" id="showcase"><a href="#" onclick = "navInterface('showcase')">Showcase</a></div>
        </div>
    </div>

 
    <h1 style="text-transform:capitalize" id="showcase-title"></h1>
    <div id="showcase-pallete" class="carousel slide" data-ride="carousel">
 
        
        <ul id="showcase-items" class="carousel-inner"></ul>


        <a class="carousel-control-prev" href="#showcase-pallete" data-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </a>
      <a class="carousel-control-next" href="#showcase-pallete"             data-slide="next">
        <span class="carousel-control-next-icon"></span>
      </a>
    </div>

  

    <div id="footer">
        <div id="left-footer"><p>
            <b>Aman Kumar</b>
            <br>
            Indian Institute of Information Technology
            <br>
            Ranchi
            <br>     
        </p></div>

        <div id="center-footer"><p>
            Based in India
            <br>
            &#169 2021, Aman Kumar
            <br>
        </p></div>
        
        <div id="right-footer">
            <a href="mailto:avy0219@gmail.com"><img src="https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/gmail.svg"></a>
            
            <a href="https://twitter.com/am__a_man"><img src="https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/twitter.svg"></a>

            <a href="https://linkedin.com/in/am--a-man"><img src="https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/linkedin.svg"> </a>
            
            <a href="https://github.com/am-a-man"><img src="https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/github.svg"> </a>
           
            <a href="https://www.instagram.com/am__a_man_/"><img src="https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/instagram.svg"> </a>
            
        </div>
 
    </div>

    `;
    
}





async function openInfo(){
    var showcaseItems = document.getElementById('showcase-items');

 
    if(data==null)
        await getData();
        
    var keys = Object.keys(data['info']);

    var UL = document.createElement('UL');

    var UL2 = document.createElement('ul');
    UL2.setAttribute("class","carousel-indicators");
    for(var i = 0; i < keys.length; i++)
    {
        var LI2 = document.createElement('li')
        LI2.setAttribute("data-target","#showcase-pallete");
        LI2.setAttribute("data-slide-to",`${i}`);
        if(i==0)
            LI2.setAttribute("class","active");
    
        UL2.appendChild(LI2);
        var A = document.createElement('A');
        var DIV = document.createElement("div");
        DIV.setAttribute("class" , "carousel-caption");
        var H1 = document.createElement('H1');
        var P = document.createElement('P')
        DIV.appendChild(H1);
        DIV.appendChild(P);

        H1.innerText = `${data['info'][keys[i]]['title']}:`;
        P.innerText = data['info'][keys[i]]['detail'];

        A.appendChild(DIV);

        A.setAttribute('href', data['info'][keys[i]]['href']);
    
        var LI = document.createElement('LI');
        LI.appendChild(A);
        if(i==0)
            LI.setAttribute("class", "carousel-item active")
        else
            LI.setAttribute("class", "carousel-item")
        UL.appendChild(LI);
    }
    document.getElementById("showcase-pallete").appendChild(UL2);

    var listItems=UL.innerHTML;
    showcaseItems.innerHTML = listItems;
}


async function openUpdates(){
    var showcaseItems = document.getElementById('showcase-items');

    if(data==null)
        await getData();
    
    var keys = Object.keys(data['updates']);
 
    var UL = document.createElement('ul');
    var UL2 = document.createElement('ul');
    UL2.setAttribute("class","carousel-indicators");
    for(var i = 0; i < keys.length; i++)
    {
        var LI2 = document.createElement('li')
        LI2.setAttribute("data-target","#showcase-pallete");
        LI2.setAttribute("data-slide-to",`${i}`);
        if(i==0)
            LI2.setAttribute("class","active");
        UL2.appendChild(LI2);
        var A = document.createElement('A');
        
        var H1 = document.createElement('H1');
        var P = document.createElement('P')
        var DIV = document.createElement("div");
        DIV.setAttribute("class" , "carousel-caption");
        H1.innerText = `${data['updates'][keys[i]]['title']}:`;
        P.innerText = data['updates'][keys[i]]['detail'];

        DIV.appendChild(H1);
        DIV.appendChild(P);
        A.appendChild(DIV);
        A.setAttribute('href', data['updates'][keys[i]]['href']);
    
        var LI = document.createElement('LI');
        LI.appendChild(A);
        if(i==0)
            LI.setAttribute("class", "carousel-item active")
        else
            LI.setAttribute("class", "carousel-item")
        
        UL.appendChild(LI);
        
    }
    document.getElementById("showcase-pallete").appendChild(UL2);
    var listItems=UL.innerHTML;
    showcaseItems.innerHTML=listItems;
}





async function openShowcase()
{
    var showcaseItems = document.getElementById('showcase-items');
    
    if(data==null)
    await getData();
    
    var keys = Object.keys(data['projects']);
    
    
    var UL = document.createElement('UL');
    var UL2 = document.createElement('ul');
    UL2.setAttribute("class","carousel-indicators");
 
    for(var i = 0; i < keys.length; i++)
    {
        var LI2 = document.createElement('li')
        LI2.setAttribute("data-target","#showcase-pallete");
        LI2.setAttribute("data-slide-to",`${i}`);
        if(i==0)
            LI2.setAttribute("class","active");
        UL2.appendChild(LI2);
        var A = document.createElement('A');
        var DIV = document.createElement("div");
        DIV.setAttribute("class" , "carousel-caption");
        var IMG = document.createElement("IMG");
        var H1 = document.createElement('H1');
        var P = document.createElement('P')
        
        DIV.appendChild(H1);
        DIV.appendChild(P);
        
        H1.innerText = `${data['projects'][keys[i]]['title']}:`;
        P.innerText = data['projects'][keys[i]]['stack'];

        IMG.setAttribute("src", `${data['projects'][keys[i]]["logo"]}`)
        IMG.setAttribute("alt",  "Project-logo");
        
        A.appendChild(IMG);
        A.appendChild(DIV); 
        
        A.setAttribute('href', data['projects'][keys[i]]['href']);
        
        var LI = document.createElement('LI');
        LI.appendChild(A);
        if(i==0)
            LI.setAttribute("class", "carousel-item active")
        else
            LI.setAttribute("class", "carousel-item")
        UL.appendChild(LI);
    };
    document.getElementById("showcase-pallete").appendChild(UL2);

    var listItems = UL.innerHTML;
    showcaseItems.innerHTML = listItems;

}



// function responsiveScreen(x){
//     if(x.matches){
//         document.getElementsByTagName('body')[0].style.backgroundColor = "black";
//     }
// }


function start(){
    try{
    window.onload = navInterface;
    }
    catch(error){
        console.log(error);
    }

}


start();