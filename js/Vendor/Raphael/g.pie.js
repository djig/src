///*!
// * g.Raphael 0.51 - Charting library, based on Raphaël
// *
// * Copyright (c) 2009-2012 Dmitry Baranovskiy (http://g.raphaeljs.com)
// * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
// */
//(function () {
//    function t(f, k, l, i, d, b) {
//        function t(d, b, c, e, f) { var a = Math.PI / 180, g = d + c * Math.cos(-e * a), i = d + c * Math.cos(-f * a), h = d + c / 2 * Math.cos(-(e + (f - e) / 2) * a), j = b + c * Math.sin(-e * a), k = b + c * Math.sin(-f * a), a = b + c / 2 * Math.sin(-(e + (f - e) / 2) * a), d = ["M", d, b, "L", g, j, "A", c, c, 0, +(180 < Math.abs(f - e)), 1, i, k, "z"]; d.middle = { x: h, y: a }; return d } var b = b || {}, q = [], m = f.set(), a = f.set(), n = f.set(), o = d.length, h = 0, j = 0, p = 0, g = b.maxSlices || 100, e = parseFloat(b.minPercent) || 1, r = Boolean(e); a.covers = m; if (1 == o) n.push(f.circle(k, l, i).attr({
//            fill: b.colors &&
//            b.colors[0] || this.colors[0], stroke: b.stroke || "#fff", "stroke-width": null == b.strokewidth ? 1 : b.strokewidth
//        })), m.push(f.circle(k, l, i).attr(this.shim)), j = d[0], d[0] = { value: d[0], order: 0, valueOf: function () { return this.value } }, b.href && b.href[0] && m[0].attr({ href: b.href[0] }), n[0].middle = { x: k, y: l }, n[0].mangle = 180; else {
//            for (var c = 0; c < o; c++) j += d[c], d[c] = { value: d[c], order: c, valueOf: function () { return this.value } }; d.sort(function (c, d) { return d.value - c.value }); for (c = 0; c < o; c++) if (r && 100 * d[c] / j < e && (g = c, r = !1), c > g) r = !1,
//            d[g].value += d[c], d[g].others = !0, p = d[g].value; o = Math.min(g + 1, d.length); p && d.splice(o) && (d[g].others = !0); for (c = 0; c < o; c++) {
//                p = h - 360 * d[c] / j / 2; c || (h = 90 - p, p = h - 360 * d[c] / j / 2); if (b.init) var s = t(k, l, 1, h, h - 360 * d[c] / j).join(","); g = t(k, l, i, h, h -= 360 * d[c] / j); e = b.matchColors && !0 == b.matchColors ? d[c].order : c; e = f.path(b.init ? s : g).attr({ fill: b.colors && b.colors[e] || this.colors[e] || "#666", stroke: b.stroke || "#fff", "stroke-width": null == b.strokewidth ? 1 : b.strokewidth, "stroke-linejoin": "round" }); e.value = d[c]; e.middle = g.middle;
//                e.mangle = p; q.push(e); n.push(e); b.init && e.animate({ path: g.join(",") }, +b.init - 1 || 1E3, ">")
//            } for (c = 0; c < o; c++) e = f.path(q[c].attr("path")).attr(this.shim), b.href && b.href[c] && e.attr({ href: b.href[c] }), e.attr = function () { }, m.push(e), n.push(e)
//        } a.hover = function (c, b) {
//            for (var b = b || function () { }, e = this, a = 0; a < o; a++) (function (a, f, g) { var h = { sector: a, cover: f, cx: k, cy: l, mx: a.middle.x, my: a.middle.y, mangle: a.mangle, r: i, value: d[g], total: j, label: e.labels && e.labels[g] }; f.mouseover(function () { c.call(h) }).mouseout(function () { b.call(h) }) })(n[a],
//            m[a], a); return this
//        }; a.each = function (c) { for (var b = 0; b < o; b++) { var a = n[b]; c.call({ sector: a, cover: m[b], cx: k, cy: l, x: a.middle.x, y: a.middle.y, mangle: a.mangle, r: i, value: d[b], total: j, label: this.labels && this.labels[b] }) } return this }; a.click = function (b) { for (var c = this, a = 0; a < o; a++) (function (a, e, f) { var g = { sector: a, cover: e, cx: k, cy: l, mx: a.middle.x, my: a.middle.y, mangle: a.mangle, r: i, value: d[f], total: j, label: c.labels && c.labels[f] }; e.click(function () { b.call(g) }) })(n[a], m[a], a); return this }; a.inject = function (a) { a.insertBefore(m[0]) };
//        if (b.legend) {
//            h = b.legend; c = b.legendothers; s = b.legendmark; q = b.legendpos; p = k + i + i / 5; g = l + 10; h = h || []; q = q && q.toLowerCase && q.toLowerCase() || "east"; s = f[s && s.toLowerCase()] || "circle"; a.labels = f.set(); for (e = 0; e < o; e++) {
//                var r = n[e].attr("fill"), u = d[e].order; d[e].others && (h[u] = c || "Others"); h[u] = this.labelise(h[u], d[e], j); a.labels.push(f.set()); a.labels[e].push(f[s](p + 5, g, 5).attr({ fill: r, stroke: "none" })); a.labels[e].push(r = f.text(p + 20, g, h[u] || d[u]).attr(this.txtattr).attr({ fill: b.legendcolor || "#000", "text-anchor": "start" }));
//                m[e].label = a.labels[e]; g += 1.2 * r.getBBox().height
//            } f = a.labels.getBBox(); a.labels.translate.apply(a.labels, { east: [0, -f.height / 2], west: [-f.width - 2 * i - 20, -f.height / 2], north: [-i - f.width / 2, -i - f.height - 10], south: [-i - f.width / 2, i + 10] }[q]); a.push(a.labels)
//        } a.push(n, m); a.series = n; a.covers = m; return a
//    } var v = function () { }; v.prototype = Raphael.g; t.prototype = new v; Raphael.fn.piechart = function (f, k, l, i, d) { return new t(this, f, k, l, i, d) }
//})();


/*!
 * g.Raphael 0.51 - Charting library, based on Raphaël
 *
 * Copyright (c) 2009-2012 Dmitry Baranovskiy (http://g.raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */

/*
* piechart method on paper
*/
/*\
 * Paper.piechart
 [ method ]
 **
 * Creates a pie chart
 **
 > Parameters
 **
 - cx (number) x coordinate of the chart
 - cy (number) y coordinate of the chart
 - r (integer) radius of the chart
 - values (array) values used to plot
 - opts (object) options for the chart
 o {
 o minPercent (number) minimal percent threshold which will have a slice rendered. Sliced corresponding to data points below this threshold will be collapsed into 1 additional slice. [default `1`]
 o maxSlices (number) a threshold for how many slices should be rendered before collapsing all remaining slices into 1 additional slice (to focus on most important data points). [default `100`]
 o stroke (string) color of the circle stroke in HTML color format [default `"#FFF"`]
 o strokewidth (integer) width of the chart stroke [default `1`]
 o init (boolean) whether or not to show animation when the chart is ready [default `false`]
 o colors (array) colors be used to plot the chart
 o href (array) urls to to set up clicks on chart slices
 o legend (array) array containing strings that will be used in a legend. Other label options work if legend is defined.
 o legendcolor (string) color of text in legend [default `"#000"`]
 o legendothers (string) text that will be used in legend to describe options that are collapsed into 1 slice, because they are too small to render [default `"Others"`]
 o legendmark (string) symbol used as a bullet point in legend that has the same colour as the chart slice [default `"circle"`]
 o legendpos (string) position of the legend on the chart [default `"east"`]. Other options are `"north"`, `"south"`, `"west"`
 o }
 **
 = (object) path element of the popup
 > Usage
 | r.piechart(cx, cy, r, values, opts)
 \*/

(function () {

    function Piechart(paper, cx, cy, r, values, opts) {
        opts = opts || {};

        var chartinst = this,
            sectors = [],
            covers = paper.set(),
            chart = paper.set(),
            series = paper.set(),
            order = [],
            len = values.length,
            angle = 0,
            total = 0,
            others = 0,
            cut = opts.maxSlices || 100,
            minPercent = parseFloat(opts.minPercent) || 1,
            defcut = Boolean(minPercent);

        function sector(cx, cy, r, startAngle, endAngle, fill) {
            var rad = Math.PI / 180,
                x1 = cx + r * Math.cos(-startAngle * rad),
                x2 = cx + r * Math.cos(-endAngle * rad),
                xm = cx + r / 2 * Math.cos(-(startAngle + (endAngle - startAngle) / 2) * rad),
                y1 = cy + r * Math.sin(-startAngle * rad),
                y2 = cy + r * Math.sin(-endAngle * rad),
                ym = cy + r / 2 * Math.sin(-(startAngle + (endAngle - startAngle) / 2) * rad),
                res = [
                    "M", cx, cy,
                    "L", x1, y1,
                    "A", r, r, 0, +(Math.abs(endAngle - startAngle) > 180), 1, x2, y2,
                    "z"
                ];
            

            res.middle = { x: xm, y: ym };
            return res;
        }

        chart.covers = covers;

        if (len == 1) {
            series.push(paper.circle(cx, cy, r).attr({ cursor: "pointer", fill: opts.colors && opts.colors[0] || chartinst.colors[0], stroke: opts.stroke || "#fff", "stroke-width": opts.strokewidth == null ? 1 : opts.strokewidth }));
            covers.push(paper.circle(cx, cy, r).attr(chartinst.shim));
            total = values[0];
            values[0] = { value: values[0], order: 0, valueOf: function () { return this.value; } };
            opts.href && opts.href[0] && covers[0].attr({ href: opts.href[0] });
            series[0].middle = { x: cx, y: cy };
            series[0].mangle = 180;
        } else {
            for (var i = 0; i < len; i++) {
                total += values[i];
                values[i] = { value: values[i], order: i, valueOf: function () { return this.value; } };
            }

            //values are sorted numerically
            values.sort(function (a, b) {
                return b.value - a.value;
            });

            for (i = 0; i < len; i++) {
                if (defcut && values[i] * 100 / total < minPercent) {
                    cut = i;
                    defcut = false;
                }

                if (i > cut) {
                    defcut = false;
                    values[cut].value += values[i];
                    values[cut].others = true;
                    others = values[cut].value;
                }
            }

            len = Math.min(cut + 1, values.length);
            others && values.splice(len) && (values[cut].others = true);

            for (i = 0; i < len; i++) {
                var mangle = angle - 360 * values[i] / total / 2;

                if (!i) {
                    angle = 90 - mangle;
                    mangle = angle - 360 * values[i] / total / 2;
                }

                if (opts.init) {
                    //var ipath = sector(cx, cy, 1, angle, angle - 360 * values[i] / total).join(",");
                    var ipath = sector(cx, cy, 1, angle, angle - 360 * values[i] / total);
                }

                var path = sector(cx, cy, r, angle, angle -= 360 * values[i] / total);
                var j = (opts.matchColors && opts.matchColors == true) ? values[i].order : i;
                var p = paper.path(opts.init ? ipath : path).attr({ fill: opts.colors && opts.colors[j] || chartinst.colors[j] || "#666", stroke: opts.stroke || "#fff", "stroke-width": (opts.strokewidth == null ? 1 : opts.strokewidth), "stroke-linejoin": "round" });
                
                //var p = paper.path(path).attr({ cursor: "pointer", fill: opts.colors && opts.colors[j] || chartinst.colors[j] || "#666", stroke: opts.stroke || "#fff", "stroke-width": (opts.strokewidth == null ? 1 : opts.strokewidth), "stroke-linejoin": "round" });
                //console.log(ipath);
                //console.log(ipath);
                p.value = values[i];
                p.middle = path.middle;
                p.mangle = mangle;

             

               

                sectors.push(p);
                series.push(p);
            
                opts.init &&
                //p.animate({ arc: [100, 100, values[i], total, 90] }, 1000);
                //p.animate({ arc: [values[i], total, 90] }, 900, ">");
                p.animate({ path: path.join(",") }, (+opts.init - 1) || 1000, ">");
            }

            for (i = 0; i < len; i++) {
                 p = paper.path(sectors[i].attr("path")).attr(chartinst.shim);
                //p = paper.path(sectors[i].attr("arc")).attr(chartinst.shim);
                opts.href && opts.href[i] && p.attr({ href: opts.href[i] });
                p.attr = function () { };
                
                
                    covers.push(p);
                    series.push(p);
                 
            }
        }

        chart.hover = function (fin, fout) {
            fout = fout || function () { };

            var that = this;

            for (var i = 0; i < len; i++) {
                (function (sector, cover, j) {
                    var o = {
                        sector: sector,
                        cover: cover,
                        cx: cx,
                        cy: cy,
                        mx: sector.middle.x,
                        my: sector.middle.y,
                        mangle: sector.mangle,
                        r: r,
                        value: values[j],
                        total: total,
                        label: that.labels && that.labels[j]
                    };
                    cover.mouseover(function () {
                        //console.log("Before:" );
                        //sector.matrix.a = 1;
                        //sector.matrix.d = 1;
                        //sector.matrix.e = 0;
                        ////console.log(sector.matrix);
                        //console.log(o);
                        fin.call(o);

                        //console.log("After:");
                        //console.log(o);
                        //console.log("mangle:" + sector.mangle);
                        

                    }).mouseout(function () {
                        fout.call(o);
                    });
                })(series[i], covers[i], i);
            }
            return this;
        };

        // x: where label could be put
        // y: where label could be put
        // value: value to show
        // total: total number to count %
        chart.each = function (f) {
            var that = this;

            for (var i = 0; i < len; i++) {
                (function (sector, cover, j) {
                    var o = {
                        sector: sector,
                        cover: cover,
                        cx: cx,
                        cy: cy,
                        x: sector.middle.x,
                        y: sector.middle.y,
                        mangle: sector.mangle,
                        r: r,
                        value: values[j],
                        total: total,
                        label: that.labels && that.labels[j]
                    };
                    f.call(o);
                })(series[i], covers[i], i);
            }
            return this;
        };

        chart.click = function (f) {
            var that = this;

            for (var i = 0; i < len; i++) {
                (function (sector, cover, j) {
                    var o = {
                        sector: sector,
                        cover: cover,
                        cx: cx,
                        cy: cy,
                        mx: sector.middle.x,
                        my: sector.middle.y,
                        mangle: sector.mangle,
                        r: r,
                        value: values[j],
                        total: total,
                        label: that.labels && that.labels[j]
                    };
                    cover.click(function () { f.call(o); });
                })(series[i], covers[i], i);
            }
            return this;
        };

        chart.inject = function (element) {
            element.insertBefore(covers[0]);
        };

        var legend = function (labels, otherslabel, mark, dir) {
            var x = cx + r + r / 5,
                y = cy,
                h = y + 10;

            labels = labels || [];
            dir = (dir && dir.toLowerCase && dir.toLowerCase()) || "east";
            mark = paper[mark && mark.toLowerCase()] || "circle";
            chart.labels = paper.set();

            for (var i = 0; i < len; i++) {
                var clr = series[i].attr("fill"),
                    j = values[i].order,
                    txt;

                values[i].others && (labels[j] = otherslabel || "Others");
                labels[j] = chartinst.labelise(labels[j], values[i], total);
                chart.labels.push(paper.set());
                chart.labels[i].push(paper[mark](x + 5, h, 5).attr({ fill: clr, stroke: "none" }));
                chart.labels[i].push(txt = paper.text(x + 20, h, labels[j] || values[j]).attr(chartinst.txtattr).attr({ fill: opts.legendcolor || "#000", "text-anchor": "start" }));
                covers[i].label = chart.labels[i];
                h += txt.getBBox().height * 1.2;
            }

            var bb = chart.labels.getBBox(),
                tr = {
                    east: [0, -bb.height / 2],
                    west: [-bb.width - 2 * r - 20, -bb.height / 2],
                    north: [-r - bb.width / 2, -r - bb.height - 10],
                    south: [-r - bb.width / 2, r + 10]
                }[dir];

            chart.labels.translate.apply(chart.labels, tr);
            chart.push(chart.labels);
        };

        if (opts.legend) {
            legend(opts.legend, opts.legendothers, opts.legendmark, opts.legendpos);
        }

        chart.push(series, covers);
        chart.series = series;
        chart.covers = covers;

        return chart;
    };

    //inheritance
    var F = function () { };
    F.prototype = Raphael.g;
    Piechart.prototype = new F;

    //public
   
    Raphael.fn.piechart = function (cx, cy, r, values, opts) {
        return new Piechart(this, cx, cy, r, values, opts);
    }

})();