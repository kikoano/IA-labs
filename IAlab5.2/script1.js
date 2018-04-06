/**
 * Created by kikoano111 on 7/12/2016.
 */
$(document).ready(function(){

    $.widget( "custom.catcomplete", $.ui.autocomplete, {
        _create: function() {
            this._super();
            this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
        },
        _renderMenu: function( ul, items ) {
            var that = this,
                currentCategory = "";
            $.each( items, function( index, item ) {
                var li;
                if ( item.category != currentCategory ) {
                    ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
                    currentCategory = item.category;
                }
                li = that._renderItemData( ul, item );
                if ( item.category ) {
                    li.attr( "aria-label", item.category + " : " + item.label );
                }
            });
        }
    });


    var letovi=[];
    var registrirani=[];
    $("#add").click(function(){
            $("#dialog-form").dialog("open");
    });
    $("#register").click(function(){
        if($("#dateFrom").val()=="" || $("#dateTo").val()=="")
            alert("Внеси датум!");
        else{
            var finder= $("#search").val();
            for(var i=0;i<letovi.length;i++){
                if(letovi[i].label==finder){
                    create(new Registriran(letovi[i].id,letovi[i].label,letovi[i].to,letovi[i].category,$("#dateFrom").val(),$("#dateTo").val()));
                    break;
                }
            }
            $( "#dateFrom" ).val("");
            $( "#dateTo" ).val("");
            $( "#dateFrom" ).datepicker('change',{
                minDate: null,
                maxDate: null
            });
            $( "#dateTo" ).datepicker('change',{
                minDate: null,
                maxDate: null
            });
        }
    });
    function Let(id,label,to,category){
        this.id=id;
        this.label=label;
        this.to=to;
        this.category=category;
    }
    function Registriran(id,label,to,category,dateFrom,dateTo){
        this.id=id;
        this.label=label;
        this.to=to;
        this.category=category;
        this.dateFrom=dateFrom;
        this.dateTo=dateTo;
    }
    function create(Registriran){
        registrirani.push(Registriran);
        $("#flights2").append("<tr><td>"+Registriran.id+"</td><td>"+Registriran.label+"</td><td>"+Registriran.to+"</td><td>"+Registriran.category+"</td>" +
            "<td>"+Registriran.dateFrom+"</td><td>"+Registriran.dateTo+"</td></tr>>")
    }
    function createNoDate(Let){
        letovi.push(Let);
        $("#flights").append("<tr><td>"+Let.id+"</td><td>"+Let.label+"</td><td>"+Let.to+"</td><td>"+Let.category+"</td></tr>>");
    }
    createNoDate(new Let(12331,"Wizz Air","London","Бизнис","11/11/2015","11/23/2015"));
    $("#dialog-form").dialog({
        autoOpen:false,
        modal: true,
        title:"Create new flight",
        width:350,
        resizable: false,
        buttons:{
            Додади:function(){
                if($("#id").val()==""|| $("#avio").val()==""|| $("#to").val()==""|| $("#classes").val()=="")
                    $("small").addClass("invalid");
                else if(isNaN($("#id").val())) {
                    $("#errors").html("<small>Невалидна Шифра!</small>").addClass("invalid");
                }
                else{
                    createNoDate(new Let($("#id").val(), $("#avio").val(), $("#to").val(), $("#classes").val()));
                    $(this).dialog("close");
                }


            },
            Откажи:function(){
                $(this).dialog("close");
            }
        },
        close:function(){
            $(this).find("input:text").val("");
            $("#errors").html("");
            $("small").removeClass("invalid");
            $("select").val($("select option:eq(0)").val());
        }
    });
    $("#dateFrom").datepicker({
        onClose:function(selectedDate) {
            $("#dateTo").datepicker("option", "minDate", selectedDate);
        }
    });
    $("#dateTo").datepicker({
        onClose:function(selectedDate) {
            $("#dateFrom").datepicker("option", "maxDate", selectedDate);
        }
    });
    $("#search").catcomplete({
        delay: 0,
        source: letovi
    });
});