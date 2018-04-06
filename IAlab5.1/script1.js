/**
 * Created by kikoano111 on 7/12/2016.
 */
$(document).ready(function(){
    $("#add").click(function(){
        $("#dialog-form").dialog("open");
    });
    function create(id,avio,to,option){
        $("#flights").append("<tr><td>"+id+"</td><td>"+avio+"</td><td>"+to+"</td><td>"+option+"</td></tr>>")
    }
    create(12331,"Wizz Air","London","Бизнис")
    $("#dialog-form").dialog({
        autoOpen:false,
        modal: true,
        title:"Create new flight",
        width:350,
        resizable: false,
        buttons:{
            Додади:function(){
                if($("#id").val()==""|| $("#avio").val()==""|| $("#to").val()==""|| $("#classes").val()=="")
                    this+$("small").addClass("invalid");
                else if(isNaN($("#id").val())) {
                    $("#errors").html("<small>Невалидна Шифра!</small>").addClass("invalid");
                }
                else{
                    create($("#id").val(), $("#avio").val(), $("#to").val(), $("#classes").val());
                    $(this).dialog("close");
                }


            },
            Откажи:function(){
                $(this).dialog("close");
            }
        },
        close:function(){
            this+$("input:text").val("");
            $("#errors").html("");
            this+$("small").removeClass("invalid");
            this+$("select").val($("select option:eq(0)").val());
        }
    });

});