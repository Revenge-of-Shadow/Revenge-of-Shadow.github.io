//  Oh, I will find a way to make a pseudodynamic page.
var count = 51;
var index = count-1;

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
            return "<a>Background: <a style=\"color:"+colorName+";\">"+text+"</a></a>";
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
        document.getElementById("picture").src ="/images/gallery/"+index+".png";
        document.getElementById("picture-link").href ="https://github.com/Revenge-of-Shadow/Revenge-of-Shadow.github.io/tree/main/docs/images/gallery/"+index+".png";
    }
    document.location.hash=index;
    window.onhashchange();


});
