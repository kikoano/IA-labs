/**
 * Created by kikoano111 on 20/12/2016.
 */
$( document ).ready(function() {
    var pass;
        function validPassword(){
       pass =$("#password").val();
        if(pass.length>=6 && /[^\w\s]/gi.test(pass) && pass == $("#rPassword").val()) {
            $("#error").css("display","none");
            return true;
        }
        else {
            $("#error").css("display","block");
            return false;
        }
    }
    $("#dialogPassword").dialog({
        title:"Set your password",
        resizable:false,
        modal:true,
        draggable:false,
        buttons:{
            "OK":function(){
            if(validPassword())
                $(this).dialog("close");
            }
        }
    });
    $("#dialogSend").dialog({
        title:"Password",
        resizable:false,
        modal:true,
        draggable:false,
        autoOpen:false,
        buttons:{
            "OK":function(){
                if(pass==$("#Cpassword").val()) {
                    $(this).dialog("close");
                    $("#error2").css("display","none");
                }
                else
                    $("#error2").css("display","block");
            }
        }
    });
    $("#dialogMessage").dialog({
        title:"Message Content",
        autoOpen: false,
        resizable:false,
        modal:true,
        draggable:false,
        buttons:{
            "Insert":function(){
                    $(".content").text($("#Mcontent").val());
                    $(this).dialog("close");
            },
            "Clear":function(){
                $("#Mcontent").val("");
            }
        }
    });
    $("#insert2").click(function(){
        $("#Mto span").text($("#to").val());
        $("#Msubject span").text($("#subject").val());
        $("#Mcc span").text($("#cc").val());
        $("#dialogMessage").dialog("open");
    });
    $("#send").click(function(){
        $("#dialogSend").dialog("open");
    });

});