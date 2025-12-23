function update_image(topicid, index){
    document.getElementById("entry-img-"+topicid).src = "/images/creator/"+topicid+index+".png";
}

$(document).ready(function(){
    //  I have no mercy on JavaScript.
    $(".entry-bt-prev").click(function(){
        var topicid=$(this).attr("id").split("-").pop();
        var ind=Number($("#"+topicid+"ind").text())
        var max=Number($("#"+topicid+"max").text());
        (ind == 0)? ind = max : ind--;
        $("#"+topicid+"ind").text(ind);
        update_image(topicid, ind);
    });
    $(".entry-bt-next").click(function(){
        var topicid=$(this).attr("id").split("-").pop();
        var ind=Number($("#"+topicid+"ind").text())
        var max=Number($("#"+topicid+"max").text());
        (ind == max)? ind = 0 : ind++;
        $("#"+topicid+"ind").text(ind);
        update_image(topicid, ind);
    });
});
