$(document).ready(function(){
    $("#bt-pic-bg").click(function(){
        $("#bt-pic-bg").text(function(i, origText){
            var bits = origText.split(" ");
            origText = bits.pop();
            if(origText === "gray"){
                origText = "black";
            }
            else if(origText === "black"){
                origText = "white"
            }
            else if(origText === "white"){
                origText = "gray";
                $("#picture-pane").css("background-color", "#181818");
                return "Background: "+origText;
            }
            $("#picture-pane").css("background-color", origText);
            return "Background: "+origText;
        });
    });
});
