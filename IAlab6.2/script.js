/**
 * Created by kikoano111 on 20/12/2016.
 */
$(document).ready(function(){
    var localEmail = "";
    var selectedSocial = null;
    $("#share_interface").hide();
    $(".result_container").hide();

    $(".results_list").sortable({
        connectWith: ".favorites_list"
    });
    $(".favorites_list").sortable();
    $("#search").click(function(){
        $(".result_container").show();
        $(".results_list").empty();
        var search=$("#searchTerm").val();
        if(search == "")
            return false;
        $.ajax({
            type:"GET",
            dataType:"json",
            url: "http://www.flickr.com/services/feeds/photos_public.gne?tags="+search+"&format=json&jsoncallback=?",
            success: function(data){
                $.each(data.items,function(i,el){
                    var title =el.title;
                    var link=el.link;
                    var media=(el.media.m).replace("_m.jpg", "_s.jpg");
                    var published=el.published;

                    var full = "<li class='' title='"+title+
                        "' link='"+link+"' media='"+media+"' published='"+
                        published+"'><a href='"+link+"'><img src='"+media+
                        "' style='float:left;margin:5px;' />"+title+
                        "</a><br/>(Published:"+published+")</li>";
                    $(".results_list").append(full);
                })
            },
            error: function (e){
                alert("Error "+ e);
            }
        })
    });
    $("div.email_insert").dialog({
        modal:true,
        autoOpen:false,
        open: function(event, ui){
            $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
            $("#error").hide();
        },
        buttons:{
            OK: function(event, ui){
                var email = $("#ins_email").val();
                var exp = new RegExp("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}");
                if (exp.test(email)){
                    localEmail = email;
                    $("div.email_insert").dialog("close");
                } else {
                    $("#error").show();
                }
            }
        },
        closeOnEscape: false
    });

    $(".share_dialog").dialog({
        autoOpen:false,
        modal:true,
        buttons:{
            OK:function(){
                $(".share_dialog").dialog("close").html("");
            }
        },
        open:function() {
            var s = $(".share_dialog");
            s.html("");
            s.append("<div>Social Media: "+selectedSocial.title+"</div>");
            s.append("<div>Link: <a href='"+selectedSocial.href +"'>"+selectedSocial.href+"</a></div>");
            s.append("<div>Email: "+localEmail+"</div>");
            var txt = "<ul>";
            $("ul.favorites_list li").not(".ui-state-disabled").each(function(index, elem){
              //  alert($(elem).attr("media"));
                txt += "<li>"+elem.title+
                    "<img src="+$(elem).attr("media")+" style=float:left;margin:5px; />"
                    +"</li>";
            });
            txt += "</ul>";
            s.append(txt);
        }
    });
    $("#share_dialog_call").on("click", function(){
        $(".share_dialog").dialog("open");
    });
    $("#selectable").selectable({
        stop:function(event, ui){
            $(event.target).children('.ui-selected').not(':first').removeClass('ui-selected');
            $(event.target).children().children('.ui-selected').not(':first').removeClass('ui-selected');
            var title = $(event.target).children('.ui-selected').attr("title");
            var link = $(event.target).children('.ui-selected').children("a").attr("href");
            selectedSocial = {"title":title, "href":link};
        }
    });

    $("#share_button").click( function(){
        if (localEmail == ""){
            $("div.email_insert").dialog("open");
        }
        $(this).addClass("active");
        $(".result_container").show();
        $("#search_button").removeClass("active");
        $(".results").hide();
        $(".favorites").show();
        $("#search_interface").hide();
        $("#share_interface").show();

    });
    $("#search_button").click( function() {
        $("#search_interface").show();
        $(".results").show();
         $("#share_interface").hide();
         $(".result_container").hide();
        $(this).addClass("active");
        $("#share_button").removeClass("active");
    });
});