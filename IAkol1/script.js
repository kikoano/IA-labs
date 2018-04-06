/**
 * Created by kikoano111 on 5/11/2016.
 */
$(document).ready(function(){
    $(".bt").click(function(){
        var t= $(this).attr("brr");
        $("ul").eq(t).slideToggle();
    });
    var color;
    $(".element").hover(function(c){
            color=$(this).css("backgroundColor");

       $(this).css({backgroundColor:"#1c94c4"})
    },
        function(c) {
            $(this).css({backgroundColor:color})
        }
    );
    $(".element div h2").each(function(entry, index, array){
        var font = $(this).css("fontSize");
        var text=$(this).text();
        font=parseInt(font);
        if(text.length > 40) {
            $(this).css({fontSize: font / 1.3});
            $(this).siblings().css({fontSize: font / 1.3});
        }
    });
    $("a").each(function(index){
        if($(this).prop("href")==window.location.href && index<3){
            $(this).addClass("current");
        }
    });
});