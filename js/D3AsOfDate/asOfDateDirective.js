ddApp.directive('d3Aot', function() {
  return {
      restrict: 'EA',
      scope: {
          options: '=',       // The typeahead configuration options (https://github.com/twitter/typeahead.js/blob/master/doc/jquery_typeahead.md#options)
          vals: '='       // The typeahead datasets to use (https://github.com/twitter/typeahead.js/blob/master/doc/jquery_typeahead.md#datasets)
      },
      templateUrl: "partials/_asOfDate.html",
        link: function(scope, element, attr) {
          var gmonth = new Array();
          gmonth[0] = "Jan";
          gmonth[1] = "Feb";
          gmonth[2] = "Mar";
          gmonth[3] = "Apr";
          gmonth[4] = "May";
          gmonth[5] = "Jun";
          gmonth[6] = "Jul";
          gmonth[7] = "Aug";
          gmonth[8] = "Sep";
          gmonth[9] = "Oct";
          gmonth[10] = "Nov";
          gmonth[11] = "Dec";
          var appcolors = [
                 "RGBA(131,159,182,.49)",
                      "RGBA(101,178,106,.499)",

                      " RGBA(0, 123, 131, .499)",
                      "RGBA(131, 159, 182, .41)",
                      "RGBA(0,123,183,.41)",
                      "RGBA(94,181,184,.41)",
                        "RGBA(0,111,81,.49)",
                          " RGBA(90, 124, 194, .49)",
                      "RGBA(141, 182, 145, .41)",
                     " RGBA(0, 123, 131, .499)",
                      "RGBA(56,72,0,.71)",
                      "RGBA(139, 69, 19, .71)",
                      "RGBA(30, 144, 255, .46)",
                      "RGBA(139, 34, 82, .56)",
                      "RGBA(18, 42, 76, .59)",
                      "RGBA(159,182,205,.56)",
                      "RGBA(190, 0, 50, .18)",
                      "RGBA(101,178,106,.199)",
                        " RGBA(0, 123, 131, .199)",
                      "RGBA(131, 159, 182, 1)",
                      "RGBA(0,123,183,1)",
                      "RGBA(94,181,184,1)",
                        "RGBA(0,111,81,.99)",
                          " RGBA(90, 124, 194, .9)",
                      "RGBA(141, 182, 145, 1)",
                      "RGBA(213,225,242,1)",
                      "RGBA(56,72,0,1)",
                      "RGBA(139, 69, 19, 1)",
                      "RGBA(30, 144, 255, .6)",
                      "RGBA(139, 34, 82, .6)",
                      "RGBA(18, 42, 76, .9)",
                      "RGBA(101,178,106,.99)",
                      " RGBA(0, 123, 131, .99)",
                      "RGBA(131, 159, 182, 1)",
                      "RGBA(0,123,183,1)",
                      "RGBA(94,181,184,1)",
                        "RGBA(0,111,81,.99)",


                      " RGBA(90, 124, 194, .9)",
                      "RGBA(141, 182, 145, 1)",
                      "RGBA(213,225,242,1)",
                      "RGBA(56,72,0,1)",
                      "RGBA(139, 69, 19, 1)",
                      "RGBA(30, 144, 255, .6)",
                      "RGBA(139, 34, 82, .6)",
                      "RGBA(18, 42, 76, .9)"
            ];
            var date1 = new Date();


         var options = scope.options;
           var zfactor=options.factor !== undefined?options.factor: 1;
           var activeMonth=options.activeMonth !== undefined?options.activeMonth:'';
           var svgWraper=$("#"+element[0].id +" .svgWraper");
        //   console.log(svgWraper);
           $(svgWraper).css({
             height:180*zfactor,
             width:180*zfactor,
             'margin-top':180-(180*zfactor)
           });

           var arrCircle = [
          {id:-2 , radius: 30*zfactor, x: 90*zfactor, y: 90*zfactor, color: 'rgba(244, 250, 244, 0.000)' },
               {id:-1 , radius: 30*zfactor, x: 90*zfactor, y: 90*zfactor, color: 'rgba(244, 250, 244, 0.478431)' }
           ];

              var vals = scope.vals;
            for (i = 0; i < 12; i++) {
                var objCircle = {};
                objCircle.id = i;
                var iR;
                iR = i + 3;
                if (iR > 11) { iR = iR - 12; }


                var multiplier =   (vals[iR] / (Math.max.apply(Math, vals)))*1.1;
                //console.log(vals[iR]);
                //console.log(multiplier);
                objCircle.radius = 12 * multiplier*zfactor;
                //console.log(objCircle.radius);
                objCircle.angle = (Math.PI * i)/6;
                objCircle.cos = Math.cos(objCircle.angle);
                objCircle.sin = Math.sin(objCircle.angle);
                objCircle.mv = '$'+ vals[i]+'MM';
                objCircle.x = (90 + (50 * Math.cos(objCircle.angle) )) *zfactor;
                objCircle.y = (90 + (50 * Math.sin(objCircle.angle)))*zfactor;
                var color=appcolors[i+1];
                objCircle.selected=false;
                if(activeMonth===gmonth[iR]){
                    color="Red";
                    //console.log(color);
                    objCircle.selected=true;

                }

                objCircle.color = color;
               arrCircle.push(objCircle);
            }
            var dr = 200;


            var width = options.width !== undefined?options.width: 180,
              height = options.height !== undefined?options.height: 180;

              scope.width=width;
          var svg2 = d3.select("#"+element[0].id +" .mainC2").append("svg")
              .attr("width", 180*zfactor)
              .attr("height", 180*zfactor);
            svg2.selectAll("circle")
               .data(arrCircle)
             .enter().append("circle")
              .attr("cx", function (d) { return d.x; })
               .attr("cy", function (d) { return d.y; })
                .attr("opacity", .3)
                .attr("cursor", "pointer")
                .on("click", function (d) {
                  var iR;
                  iR = d.id + 3;
                  if (iR > 11) { iR = iR - 12; }

                      scope.$emit('asofDateEventClick',gmonth[iR],options.year);
                      zoomC(d, d.id, 'mi');
                    })
                .on("mouseover", function (d) {
                      var date2 = new Date();
                      var diff =  date2   - date1 ;
                    //  console.log(diff/1000 );
                      if((diff/1000)>2){
                        zoomC(d,d.id,'mi');
                      }

                   })
                .on("mouseout", function (d) {
                  var date2 = new Date();
                  var diff =  date2   - date1 ;
                //  console.log(diff/1000 );
                  if((diff/1000)>2){
                      zoomC(d, d.id, 'mo');
                  }

                })
                .style("fill", function (d) {
                   return d.color;
                 })
               .style("stroke", function (d) {
                    if (d.id === -1)
                    {
                        return "green";
                    }
                    else {
                        return "rgba(255, 255, 255, 0)";
                    }
                  })
                  .style("stroke-width", function (d) {
                    if (d.id === -1) {
                        return "2px";
                    }
                    else {
                        return "0px";
                    }
                  })
              .style('opacity', 0)
                .attr("r", function (d) { return d.radius+ 50; })
               .transition()
              .duration(function (d) {

                  if (d.id === 9) {
                      return dr;
                  }
                  else if (d.id > 9) {
                      return dr+((d.id-9)*300);
                  }
                  else if (d.id > -1 && d.id< 9) {
                      return dr*(d.id+3);
                  }

                  else if (d.id === -1) {
                      return dr * 12;
                  }
                  else{
                    return dr * 12;
                  }

                  // return d.id * 200;
                  // return "Black";
              })
              .attr("r", function (d) {
                if (d.id === -2) {
                  return d.radius;
                }
                else {
                  return d.radius;
                }

              })

              .style('opacity', .3);
            var drawTextLabel = function (mode) {
                var textLabels = text
                         .attr("id", function (d) {
                             return "svgText" + d.id;
                         })
                         .attr("x", function (d) {
                             if (d.id === -1) {
                                 return d.x - 17;
                             }
                             else if (d.id === 0) { return d.x + 15; }
                             else if (d.id === 6) { return d.x - 40; }
                             else { return d.x - 8; }
                           })
                        .attr("y", function (d) {
                            if (d.id === 3) { return d.y + 25 ; }
                            else if (d.id === 9) { return d.y - 15; }
                            else if(d.id===-1 ) { return 15}
                            else { return d.y + 5; }
                      })
                     .text(function (d) {
                         if (d.id % 3 === 0) {
                             // console.log(d.id);
                             var iR;
                             iR = d.id + 3;
                             if (iR > 10) { iR = iR - 12; }
                             return gmonth[iR]
                         } else if (d.id === -1)
                         { return textYear }
                         else

                             return '';
                     })
                        // .attr("font-size", "8px")
                         .attr("font-size", function (d) {
                             if (d.id === -1 )
                             { return "18px" }
                             else
                                 return "12px";

                         })
                         .attr("fill", "rgba(0,0,255,.6)")
                         .attr("letter-spacing", "2")
                         .attr("font-weight", function (d) {
                             if (d.id === -1 )
                             { return "500" }


                         })
                         .attr("letter-spacing", function (d) {
                             if (d.id === -1 )
                             { return "4" }
                             else
                                 return "2";

                         })
                     .attr("font-family", "helvetica")
                     .style('opacity', 0)
                        .transition()
                        .duration(function (d) {

                            if (d.id === 9) {
                                return dr;
                            }
                            else if (d.id > 9) {
                                return dr + ((d.id - 9) * 300);
                            }
                            else if (d.id > -1 && d.id < 9) {
                                return dr * (d.id + 3);
                            }

                            else if (d.id === -1 || d.id === -2) {
                                return dr * 12;
                            }

                            // return d.id * 200;
                            // return "Black";
                        })
                           .style('opacity', function(d){
                              if (d.id === -1){
                                return 1;
                              }
                              else {
                                return   options.isActive;
                              }
                           });
                return textLabels;
            };
            var textYear =options.year;
             //console.log(textYear);

            var text = svg2.selectAll("text")
            .data(arrCircle)
             .enter()
             .append("text");
            drawTextLabel('initialload');

            //find selected circle
            selectedLine();


      // <line x1="90" y1="90" x2="115" y2="66" stroke="rgba(255,0,0,0.5)" stroke-width="1"></line>

            function selectedLine(){
              var lx2=0;
              var ly2=0;
              var sw=0;
              for(cr in arrCircle){
                if(arrCircle[cr].selected===true)
                {
                  lx2=arrCircle[cr].x;
                  ly2=arrCircle[cr].y;
                  sw=1;
                }
              }

              var ln = svg2.append("line")
                                  .attr("x1", 90)
                                  .attr("y1", 90)
                                 .attr("x2", 90)
                                .attr("y2", 90)
                                .attr("stroke", 'rgba(255,0,0,0.5)')
                               .attr("stroke-width", 0);
            }
            function zoomC(d, i, mode) {


                var t = svg2.transition()
                    .duration(d3.event.altKey ? 7500 : 750);
                t.selectAll("circle")
                  .attr("r", function (d) {
                        return d.radius;
                      })
                      .style("stroke", function (d) {
                           if (d.id === -1 && mode !== 'mi')
                           {
                               return "green";
                           }
                           else  if (d.id === -1 && mode === 'mi')
                            {
                                return "rgba(255, 255, 255, .20)  ";
                            }
                           else {
                               return "rgba(255, 255, 255, 0)";
                           }
                         })
                  .style("fill", function (d) {
                      if (d.id === i && mode === 'mi') {
                          return "rgba(0,255,0,.98)";
                      }
                      else   if (d.id === -1 && mode === 'mi') {
                            return "rgba(0,255,0,.5)";
                        }
                        else {
                            return d.color;
                        }
                      })
                      .style("z-index", function (d) {
                        if (d.id === i && mode === 'mi') {
                             return -1;
                         }
                         else {
                             return 11;
                    }
                     })
                    .attr("cx", function (d) {   return d.x;

                    })
                .attr("cy", function (d) {
                   return d.y;

                    } );



                    var zlx2=0;
                    var zly2=0;
                    var zsw=0;
                    console.log(d);
                    zlx2=d.x;
                    zly2=d.y;
                    zsw=1;



               t.selectAll("line").attr("x1", 90)
                   .attr("y1", 90)
                  .attr("x2", zlx2)
                 .attr("y2", zly2)
                 .attr("stroke", 'rgba(255,0,0,0.5)')
                 .attr("stroke-width", function(){
                     if ( mode==='mi'   ){
                       return 1;
                     }
                      else {

                        return 0;

                     }
                 });

              var txt=  t.selectAll("text")
                          .text(function (d) {
                            if (d.id === -2 && mode==='mi'  ){
                              var iR;
                              iR = i + 3;
                              if (iR > 11) { iR = iR - 12; }

                              return   arrCircle[iR+2].mv;
                          }
                        if (d.id === i && mode === 'mi' && d.id!==-1) {
                             var iR;
                             iR = d.id + 3;
                             if (iR > 11) { iR = iR - 12; }
                             return gmonth[iR] + ',';
                           }
                         else {
                           if (d.id % 3 === 0) {
                                 var iR;
                                 iR = d.id + 3;
                                 if (iR > 11) { iR = iR - 12; }
                                 return gmonth[iR]
                             }
                             else if (d.id === -1)
                             { return textYear }
                             else if (d.id === -2 )
                             { return

                               arrCircle[i].mv;}
                             else{
                              //  console.log("tst");
                                return " "
                             }
                         }

                     })
                     .attr("font-size", function (d) {
                         if (d.id === -1 && mode === 'mi')
                         { return "10px" }
                         else    if (d.id === -1 && mode !== 'mi')
                            { return "20px" }
                         else
                             return "12px";

                     })
                    .attr("x", function (d) {
                        if (d.id === i && mode === 'mi') {
                              return 60;
                            }
                        else if (d.id === -1 && mode === 'mi') {
                            return d.x+5  ;
                        }
                        else if (d.id === -2 && mode === 'mi') {
                            return d.x-25  ;
                        }
                        else {
                            if (d.id === -1) {
                                return d.x - 17;
                            }
                            else if (d.id === 0) { return d.x + 15; }
                            else if (d.id === 6) { return d.x - 40; }
                            else { return d.x - 8; }
                        }
                      })
                .attr("y", function (d) {
                    if (d.id === i && mode === 'mi') {
                         return 80*zfactor
                        }
                        else if (d.id === -2 && mode !== 'mi') {

                            return 90*zfactor;
                        }
                        else if (d.id === -1 && mode !== 'mi') {
                            return 15;
                            //return d.y + 4;
                        }

                        else if (d.id === -1 && mode === 'mi') {

                            return d.y - 10;
                        }
                    else {
                        if (d.id === 3) { return d.y + 25; }
                        else if (d.id === 9) { return d.y - 15; }
                        else { return d.y + 5; }
                    }

                })

                 .attr("fill", function (d) {
                     if (d.id === i && mode === 'mi') {
                         return "green";
                     }
                     else
                     {
                       return "rgba(0,0,255,.6)";
                 }
                 })
                 .style('opacity', function(d){
                    if (mode === 'mi' || d.id === -1 ){
                      return 1;
                    }
                    else {
                      return  options.isActive ;
                    }
                 });
                ;


                node = d;
                d3.event.stopPropagation();
            }


    }
  };
});
