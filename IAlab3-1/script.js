/**
 * Created by kikoano111 on 12/11/2016.
 */

$(document).ready(function(){
    var fruits =["Banana","Orange", "Peach","Mango","Apple","Cherry",
        "Pear","Lemon","Banana","Orange", "Peach","Mango","Apple","Cherry",
        "Pear","Lemon"];
    var lastElement="";
    var lastElementIndex=100;
    var points=0;
    var clickDisable=false;

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    shuffleArray(fruits);
    $(".block").hover(function(){
        $(this).addClass("hoverBlock");
    },function(){
        $(this).removeClass("hoverBlock");
    });
        $(".block").click(function () {
            if(clickDisable) return;
            $(this).text(fruits[$(this).index(".block")]);
            $(this).css("fontSize", "20px");
            if ($(this).text() == lastElement && lastElementIndex != $(this).index(".block")) {
                $(this).css("background", "gray");
                $(".block").eq(lastElementIndex).css("background", "gray");
                points++;
                $("#points").text("Points: " + points);
                $(this).off();
                $(this).removeClass("hoverBlock");
                $(".block").eq(lastElementIndex).off();
                lastElement = "";
                lastElementIndex = 100;
            }
            else if (lastElementIndex == 100) {
                lastElement = fruits[$(this).index(".block")];
                lastElementIndex = $(this).index(".block");
            }
            else {
                clickDisable=true;
                var current=$(this);
                setTimeout(function(){
                    $(".block").eq(lastElementIndex).text(lastElementIndex + 1);
                    $(".block").eq(lastElementIndex).css("fontSize", "36px");
                    current.text(current.index(".block") + 1);
                    current.css("fontSize", "36px");
                    lastElement = "";
                    lastElementIndex = 100;
                    clickDisable=false;
                }, 1000);

            }
            if (points == 8) {
                $("#won").css("display","block");
            }
        });
});