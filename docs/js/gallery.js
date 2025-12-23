//  Oh, I will find a way to make a pseudodynamic page.
var count = 401;
var index = count-1;
var preview_capacity = 8;
var preview_offset = Math.trunc(count/preview_capacity)*preview_capacity;
if(preview_offset == count){ preview_offset -= preview_capacity; }

function update_image(id, index){
    console.log(id, index);
        document.getElementById(id).src = "/images/gallery/"+index+".png";
}
function update_text(id, index){
    fetch("/bits/gallery/"+index+".html", { cache: "no-store" })
        .then(response => response.text())
        .then(data => { 
            document.getElementById(id).innerHTML = data;
    });
}

function create(element, id, innerHTML){
    var frag = document.createDocumentFragment(),
        temp = document.createElement(element);
    temp.id = id;
    temp.innerHtml = innerHTML;
    frag.appendChild(temp);
    return frag;
}

function update_previews(){
    pane = document.getElementById("right-pane");
    while(pane.firstChild){
        pane.removeChild(pane.lastChild);
    }
    pane.appendChild(create("button", "bt-preview-up", ""));
    document.getElementById("bt-preview-up").innerHTML = "&#9650;";
    document.getElementById("bt-preview-up").onclick = function(){
        preview_offset-=preview_capacity;
        if(preview_offset < 0) preview_offset = Math.trunc(count/preview_capacity)*preview_capacity;
        update_previews();
    }

    for(let i = 0; i<preview_capacity; i++){
        let ind = preview_offset + i;
        pane.appendChild(create("button", "bt-preview-"+i, "")); 
        button = document.getElementById("bt-preview-"+i);
        button.classList.add("preview-button");
        button.appendChild(create("div", "preview-img-wrapper-"+i, ""));
        imagewrapper  = document.getElementById("preview-img-wrapper-"+i);
        imagewrapper.classList.add("img-wrapper");
        image = create("img", "preview-img-"+i, "");
        imagewrapper.appendChild(image);
        text = create("span", "preview-span-"+i, "");
        button.appendChild(text);

        if(ind > count-1){ continue; }
        
        update_image("preview-img-"+i, ind);
        update_text("preview-span-"+i, ind);
        button.onclick = function(){
            index = ind; 
            document.location.hash=index;
            window.onhashchange();
        }
    }
    pane.appendChild(create("button", "bt-preview-down", ""));
    document.getElementById("bt-preview-down").innerHTML = "&#9660;";
    document.getElementById("bt-preview-down").onclick = function(){
        preview_offset+=preview_capacity;
        if(preview_offset > count) preview_offset = 0;
        update_previews();
    }

}

$(document).ready(function(){
    $("#bt-pic-bg").click(function(){
        $("#bt-pic-bg").html(function(i, origText){
            var bits = $("#bt-pic-bg").text().split(" ");
            text = bits.pop();
            if(text === "dark-gray"){
                text = "black";
                colorName = "black";
            }
            else if(text === "black"){
                text = "white"
                colorName = "white";
            }
            else if(text === "white"){
                text = "gray";
                colorName = "#A8ACB0";
            }
            else if(text === "gray"){
                text = "dark-gray";
                colorName = "#202020";
            }
            $("#picture-pane").css("background-color", colorName);
            return "Background: "+text;
        });
    });
    $("#bt-prev").click(function(){
        (index > 0)? index-- : index = count-1;
        document.location.hash = index;
    });
    $("#bt-next").click(function(){
        (index < count-1)? index++ : index = 0;
        document.location.hash = index;
    });

    window.onhashchange = function(){
        index = Number(document.location.hash.split('#').pop());
        update_text("description-text", index);
        update_image("picture", index);
        document.getElementById("picture-link").href ="https://github.com/Revenge-of-Shadow/Revenge-of-Shadow.github.io/tree/main/docs/images/gallery/"+index+".png";
        update_previews();
    }

    if(document.location.hash === ""){ document.location.hash = index; }
    window.onhashchange();

});
