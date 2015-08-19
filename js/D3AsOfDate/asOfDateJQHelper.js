function d3AsOfMouseLeave(e){
  //stuff to do on mouse leave
    $(e).removeClass("margA");
    $(".mainC2:nth-child(2)").removeClass("margA",1000);
    var id= $(e).attr("id");
    $("#"+id+" ~ .mainC2").removeClass("margA",1000);
}
