/**
 * Created by kikoano111 on 8/12/2016.
 */
$(document).ready(function(){
    var hobbies="";
    $("#dialog").dialog({
        autoOpen: false,
        modal: true,
        close: function() {
            $("#dialog li:eq(0) span").text("");
            $("#dialog li:eq(1) span").text("");
            $("#dialog li:eq(2) span").text("");
            $("#dialog li:eq(3) span").text("");
            $("#dialog li:eq(4) span").text("");
            hobbies = "";
            $("#selectable .ui-selected").each(function () {
                $(this).removeClass("ui-selected");
            });
            $("input").each(function () {
                $(this).val("");
            });

    }
    });
    $("#date").datepicker();
    $(".ui-widget-content").click( function() {
        $(this).toggleClass("ui-selected");
    });
    $("#bt").click(function(){
        if($("#name").val()=="" || $("#surname").val()=="" || $("#password").val()=="" || $("#date").val()=="") {
            if ($("#name").val() == "") {
                $("#name").addClass("invalid");
                $("#name").next().show();
            }
            else {
                $("#name").removeClass("invalid");
                $("#name").next().hide();
            }

            if ($("#surname").val() == "") {
                $("#surname").addClass("invalid");
                $("#surname").next().show();
            }
            else {
                $("#surname").removeClass("invalid");
                $("#surname").next().hide();
            }
            if ($("#password").val() == "") {
                $("#password").addClass("invalid");
                $("#password").next().show();
            }
            else {
                $("#password").removeClass("invalid");
                $("#password").next().hide();
            }
            if ($("#date").val() == "") {
                $("#date").addClass("invalid");
                $("#date").next().show();
            }
            else {
                $("#date").removeClass("invalid");
                $("#date").next().hide();
            }
        }
        else{
            $("#dialog li:eq(0) span").append($("#name").val());
            $("#dialog li:eq(1) span").append($("#surname").val());
            $("#dialog li:eq(2) span").append($("#password").val());
            $("#dialog li:eq(3) span").append($("#date").val());
            $("#selectable .ui-selected").each(function(){
                if(hobbies == "")
                    hobbies=$(this).text();
                else
                hobbies+=", "+$(this).text();
            });
            $("#dialog li:eq(4) span").append(hobbies);
            $("#dialog").dialog("open");
        }
    });
});