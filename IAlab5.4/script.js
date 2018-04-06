/**
 * Created by kikoano111 on 8/12/2016.
 */
$(document).ready(function(){
    $("#bt1").click(function(){
        $("#selectable").append("<li class='ui-widget-content'>"+$("#name").val()+"</li>");
    });
    $("#bt2").click(function(){
        $("#selectable .ui-selected").each(function(){
            $(this).remove();
            $("#selected span").next().text("");
            $("#selectable .ui-selected").each(function(){
                $("#selected span").next().append($(this).text()+" ");
            });
        });
    });
    $("#selectable").on("click",".ui-widget-content",function(){
        $(this).toggleClass("ui-selected");
        $("#selected span").next().text("");
        $("#selectable .ui-selected").each(function(){
            $("#selected span").next().append($(this).text()+" ");
        });
    });
});