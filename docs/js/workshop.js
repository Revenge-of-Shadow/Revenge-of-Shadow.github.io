function update_image(topicid, index){
    document.getElementById("workshop-img-"+topicid).src = "/images/workshop/"+topicid+index+".png";
}

$(document).ready(function(){
    //  I have no mercy on JavaScript.
    $(".workshop-bt-prev").click(function(){
        var topicid=$(this).attr("id").split("-").pop();
        var ind=Number($("#"+topicid+"ind").text())
        var max=Number($("#"+topicid+"max").text());
        (ind == 0)? ind = max : ind--;
        $("#"+topicid+"ind").text(ind);
        update_image(topicid, ind);
    });
    $(".workshop-bt-next").click(function(){
        var topicid=$(this).attr("id").split("-").pop();
        var ind=Number($("#"+topicid+"ind").text())
        var max=Number($("#"+topicid+"max").text());
        (ind == max)? ind = 0 : ind++;
        $("#"+topicid+"ind").text(ind);
        update_image(topicid, ind);
    });
});
