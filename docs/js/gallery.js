//  Oh, I will find a way to make a pseudodynamic page.
var count = 51;
var index = count-1;
var preview_capacity = 8;
var preview_offset = 0;

function update_image(id, index){
    console.log(id, index);
        document.getElementById(id).src = "/images/gallery/"+index+".png";
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

    for(let i = 0; i<preview_capacity; i++){
        pane.appendChild(create("button", "bt-preview-"+i, "")); 
        button = document.getElementById("bt-preview-"+i);
        button.classList.add("preview-button");
        image = create("img", "preview-img-"+i, "");
        button.appendChild(image);
        text = create("a", "preview-a-"+i, "");
        button.appendChild(text);
        update_image("preview-img-"+i, i);
    }
    pane.appendChild(create("button", "bt-preview-down", ""));
    document.getElementById("bt-preview-down").innerHTML = "&#9660;";
}

$(document).ready(function(){
    $("#bt-pic-bg").click(function(){
        $("#bt-pic-bg").html(function(i, origText){
            var bits = $("#bt-pic-bg").text().split(" ");
            text = bits.pop();
            if(text === "gray"){
                text = "black";
                colorName = "black";
            }
            else if(text === "black"){
                text = "white"
                colorName = "white";
            }
            else if(text === "white"){
                text = "gray";
                colorName = "#202020";
            }
            $("#picture-pane").css("background-color", colorName);
            return "<a>Background: "+text+"</a>";
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
        fetch("/bits/gallery/"+index+".html")
            .then(response => response.text())
            .then(data => { 
                document.getElementById("description-text").innerHTML = data;
            });
        update_image("picture", index);
        document.getElementById("picture-link").href ="https://github.com/Revenge-of-Shadow/Revenge-of-Shadow.github.io/tree/main/docs/images/gallery/"+index+".png";
    }

    document.location.hash=index;
    window.onhashchange();
    update_previews();

});
