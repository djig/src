///*!
// * g.Raphael 0.51 - Charting library, based on Raphaël
// *
// * Copyright (c) 2009-2012 Dmitry Baranovskiy (http://g.raphaeljs.com)
// * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
// */ (function () {
//     function B(f, m, i, b, a, h, n, A) {
     
//         var c;
//         if (a && !b || !a && !i) return n ? "" : A.path();
//         h = {
//             round: "round",
//             sharp: "sharp",
//             soft: "soft",
//             square: "square"
//         }[h] || "square";
//         b = Math.round(b);
//         i = Math.round(i);
//         f = Math.round(f);
//         m = Math.round(m);
//         switch (h) {
//             case "round":
//                 a ? (a = ~~(i / 2), c = b < a ? ["M", f - ~~(i / 2), m, "l", 0, 0, "a", ~~(i / 2), b, 0, 0, 1, i, 0, "l", 0, 0, "z"] : ["M", f - a, m, "l", 0, a - b, "a", a, a, 0, 1, 1, i, 0, "l", 0, b - a, "z"]) : (a = ~~(b / 2), c = i < a ? ["M", f + 0.5, m + 0.5 - ~~(b / 2), "l", 0, 0, "a", i, ~~(b / 2), 0, 0, 1, 0, b, "l", 0, 0, "z"] : ["M", f + 0.5, m + 0.5 - a, "l", i - a, 0, "a", a,
//                     a, 0, 1, 1, 0, b, "l", a - i, 0, "z"
//                 ]);
//                 break;
//             case "sharp":
//                 a ? (a = ~~(i / 2), c = ["M", f + a, m, "l", -i, 0, 0, -C(b - a, 0), a, -y(a, b), a, y(a, b), a, "z"]) : (a = ~~(b / 2), c = ["M", f, m + a, "l", 0, -b, C(i - a, 0), 0, y(a, i), a, -y(a, i), a + (2 * a < b), "z"]);
//                 break;
//             case "square":
//                 c = a ? ["M", f + ~~(i / 2), m, "l", 1 - i, 0, 0, -b, i - 1, 0, "z"] : ["M", f, m + ~~(b / 2), "l", 0, -b, i, 0, 0, b, "z"];
//                 break;
//             case "soft":
//                 a ? (a = y(Math.round(i / 5), b), c = ["M", f - ~~(i / 2), m, "l", 0, a - b, "a", a, a, 0, 0, 1, a, -a, "l", i - 2 * a, 0, "a", a, a, 0, 0, 1, a, a, "l", 0, b - a, "z"]) : (a = y(i, Math.round(b / 5)), c = ["M", f + 0.5, m + 0.5 - ~~(b / 2), "l", i - a,
//                     0, "a", a, a, 0, 0, 1, a, a, "l", 0, b - 2 * a, "a", a, a, 0, 0, 1, -a, a, "l", a - i, 0, "z"
//                 ])
//         }
//         return n ? c.join(",") : A.path(c)
//     }
//     function E(f, m, i, b, a, h, n) {
//         var n = n || {}, A = n.type || "square",
//             c = parseFloat(n.gutter || "20%"),
//             s = f.set(),
//             u = f.set(),
//             p = f.set(),
//             t = f.set(),
//             w = Math.max.apply(Math, h),
//             g = [],
//             l = 0,
//             y = n.colors || this.colors,
//             q = h.length;
//         if (Raphael.is(h[0], "array")) {
//             for (var w = [], l = q, q = 0, e = h.length; e--;) u.push(f.set()), w.push(Math.max.apply(Math, h[e])), q = Math.max(q, h[e].length);
//             if (n.stacked) for (e = q; e--;) {
//                 for (var k = 0, d = h.length; d--;) k += +h[d][e] ||
//                         0;
//                 g.push(k)
//             }
//             for (e = h.length; e--;) if (h[e].length < q) for (d = q; d--;) h[e].push(0);
//             w = Math.max.apply(Math, n.stacked ? g : w)
//         }
//         var w = n.to || w,
//             b = 100 * (b / (q * (100 + c) + c)),
//             c = b * c / 100,
//             r = null == n.vgutter ? 20 : n.vgutter,
//             g = [],
//             k = m + c,
//             v = (a - 2 * r) / w;
//         n.stretch || (c = Math.round(c), b = Math.floor(b));
//         !n.stacked && (b /= l || 1);
//         for (e = 0; e < q; e++) {
//             g = [];
//             for (d = 0; d < (l || 1) ; d++) {
//                 var j = Math.round((l ? h[d][e] : h[e]) * v),
//                     x = i + a - r - j,
//                     o = B(Math.round(k + b / 2), x + j, b, j, !0, A, null, f).attr({
//                         stroke: "none",
//                         fill: y[l ? d : e]
//                     });
//                 l ? u[d].push(o) : u.push(o);
//                 o.y = x;
//                 o.x = Math.round(k + b /
//                     2);
//                 o.w = b;
//                 o.h = j;
//                 o.value = l ? h[d][e] : h[e];
//                 n.stacked ? g.push(o) : k += b
//             }
//             if (n.stacked) {
//                 t.push(d = f.rect(g[0].x - g[0].w / 2, i, b, a).attr(this.shim));
//                 d.bars = f.set();
//                 for (var x = 0, z = g.length; z--;) g[z].toFront();
//                 for (var z = 0, D = g.length; z < D; z++) {
//                     var o = g[z],
//                         j = (x + o.value) * v,
//                         H = B(o.x, i + a - r - 0.5 * !!x, b, j, !0, A, 1, f);
//                     d.bars.push(o);
//                     x && o.attr({
//                         path: H
//                     });
//                     o.h = j;
//                     o.y = i + a - r - 0.5 * !!x - j;
//                     p.push(j = f.rect(o.x - o.w / 2, o.y, b, o.value * v).attr(this.shim));
//                     j.bar = o;
//                     j.value = o.value;
//                     x += o.value
//                 }
//                 k += b
//             }
//             k += c
//         }
//         t.toFront();
//         k = m + c;
//         if (!n.stacked) for (e = 0; e < q; e++) {
//             for (d =
//                 0; d < (l || 1) ; d++) p.push(j = f.rect(Math.round(k), i + r, b, a - r).attr(this.shim)), j.bar = l ? u[d][e] : u[e], j.value = j.bar.value, k += b;
//             k += c
//         }
//         s.label = function (b, e) {
//             b = b || [];
//             this.labels = f.set();
//             var d, j = -Infinity;
//             if (n.stacked) for (var c = 0; c < q; c++) for (var m = 0, g = 0; g < (l || 1) ; g++) {
//                 m = m + (l ? h[g][c] : h[c]);
//                 if (g == l - 1) {
//                     d = f.labelise(b[c], m, w);
//                     d = f.text(u[c * (l || 1) + g].x, i + a - r / 2, d).attr(txtattr).insertBefore(p[c * (l || 1) + g]);
//                     var k = d.getBBox();
//                     if (k.x - 7 < j) d.remove();
//                     else {
//                         this.labels.push(d);
//                         j = k.x + k.width
//                     }
//                 }
//             } else for (c = 0; c < q; c++) for (g = 0; g < (l ||
//                         1) ; g++) {
//                 d = f.labelise(l ? b[g] && b[g][c] : b[c], l ? h[g][c] : h[c], w);
//                 d = f.text(u[c * (l || 1) + g].x, e ? i + a - r / 2 : u[c * (l || 1) + g].y - 10, d).attr(txtattr).insertBefore(p[c * (l || 1) + g]);
//                 k = d.getBBox();
//                 if (k.x - 7 < j) d.remove();
//                 else {
//                     this.labels.push(d);
//                     j = k.x + k.width
//                 }
//             }
//             return this
//         };
//         s.hover = function (a, b) {
//             t.hide();
//             p.show();
//             p.mouseover(a).mouseout(b);
//             return this
//         };
//         s.hoverColumn = function (a, b) {
//             p.hide();
//             t.show();
//             t.mouseover(a).mouseout(b || function () { });
//             return this
//         };
//         s.click = function (a) {
//             t.hide();
//             p.show();
//             p.click(a);
//             return this
//         };
//         s.each = function (a) {
//             if (!Raphael.is(a,
//                 "function")) return this;
//             for (var b = p.length; b--;) a.call(p[b]);
//             return this
//         };
//         s.eachColumn = function (a) {
//             if (!Raphael.is(a, "function")) return this;
//             for (var b = t.length; b--;) a.call(t[b]);
//             return this
//         };
//         s.clickColumn = function (a) {
//             p.hide();
//             t.show();
//             t.click(a);
//             return this
//         };
//         s.push(u, p, t);
//         s.bars = u;
//         s.covers = p;
//         return s
//     }
//     function F(f, m, i, b, a, h, n) {
//         var n = n || {}, y = n.type || "square",
//             c = parseFloat(n.gutter || "20%"),
//             s = f.set(),
//             u = f.set(),
//             p = f.set(),
//             t = f.set(),
//             w = Math.max.apply(Math, h),
//             g = [],
//             l = 0,
//             C = n.colors || this.colors,
//             q = h.length;
//         if (Raphael.is(h[0],
//             "array")) {
//             for (var w = [], l = q, q = 0, e = h.length; e--;) u.push(f.set()), w.push(Math.max.apply(Math, h[e])), q = Math.max(q, h[e].length);
//             if (n.stacked) for (e = q; e--;) {
//                 for (var k = 0, d = h.length; d--;) k += +h[d][e] || 0;
//                 g.push(k)
//             }
//             for (e = h.length; e--;) if (h[e].length < q) for (d = q; d--;) h[e].push(0);
//             w = Math.max.apply(Math, n.stacked ? g : w)
//         }
//         var w = n.to || w,
//             r = Math.floor(100 * (a / (q * (100 + c) + c))),
//             a = Math.floor(r * c / 100),
//             c = [],
//             g = i + a,
//             k = (b - 1) / w;
//         !n.stacked && (r /= l || 1);
//         for (e = 0; e < q; e++) {
//             c = [];
//             for (d = 0; d < (l || 1) ; d++) {
//                 var v = l ? h[d][e] : h[e],
//                     j = B(m, g + r / 2, Math.round(v *
//                         k), r - 1, !1, y, null, f).attr({
//                             stroke: "none",
//                             fill: C[l ? d : e]
//                         });
//                 l ? u[d].push(j) : u.push(j);
//                 j.x = m + Math.round(v * k);
//                 j.y = g + r / 2;
//                 j.w = Math.round(v * k);
//                 j.h = r;
//                 j.value = +v;
//                 n.stacked ? c.push(j) : g += r
//             }
//             if (n.stacked) {
//                 d = f.rect(m, c[0].y - c[0].h / 2, b, r).attr(this.shim);
//                 t.push(d);
//                 d.bars = f.set();
//                 for (var x = 0, o = c.length; o--;) c[o].toFront();
//                 for (var o = 0, z = c.length; o < z; o++) {
//                     var j = c[o],
//                         v = Math.round((x + j.value) * k),
//                         D = B(m, j.y, v, r - 1, !1, y, 1, f);
//                     d.bars.push(j);
//                     x && j.attr({
//                         path: D
//                     });
//                     j.w = v;
//                     j.x = m + v;
//                     p.push(v = f.rect(m + x * k, j.y - j.h / 2, j.value * k, r).attr(this.shim));
//                     v.bar = j;
//                     x += j.value
//                 }
//                 g += r
//             }
//             g += a
//         }
//         t.toFront();
//         g = i + a;
//         if (!n.stacked) for (e = 0; e < q; e++) {
//             for (d = 0; d < (l || 1) ; d++) v = f.rect(m, g, b, r).attr(this.shim), p.push(v), v.bar = l ? u[d][e] : u[e], v.value = v.bar.value, g += r;
//             g += a
//         }
//         s.label = function (a, b) {
//             a = a || [];
//             this.labels = f.set();
//             for (var c = 0; c < q; c++) for (var d = 0; d < l; d++) {
//                 var e = f.labelise(l ? a[d] && a[d][c] : a[c], l ? h[d][c] : h[c], w),
//                     g = b ? "end" : "start";
//                 this.labels.push(e = f.text(b ? u[c * (l || 1) + d].x - r / 2 + 3 : m + 5, u[c * (l || 1) + d].y, e).attr(txtattr).attr({
//                     "text-anchor": g
//                 }).insertBefore(p[0]));
//                 e.getBBox().x <
//                     m + 5 ? e.attr({
//                         x: m + 5,
//                         "text-anchor": "start"
//                     }) : u[c * (l || 1) + d].label = e
//             }
//             return this
//         };
//         s.hover = function (a, b) {
//             t.hide();
//             p.show();
//             p.mouseover(a).mouseout(b || function () { });
//             return this
//         };
//         s.hoverColumn = function (a, b) {
//             p.hide();
//             t.show();
//             t.mouseover(a).mouseout(b || function () { });
//             return this
//         };
//         s.each = function (a) {
//             if (!Raphael.is(a, "function")) return this;
//             for (var b = p.length; b--;) a.call(p[b]);
//             return this
//         };
//         s.eachColumn = function (a) {
//             if (!Raphael.is(a, "function")) return this;
//             for (var b = t.length; b--;) a.call(t[b]);
//             return this
//         };
//         s.click = function (a) {
//             t.hide();
//             p.show();
//             p.click(a);
//             return this
//         };
//         s.clickColumn = function (a) {
//             p.hide();
//             t.show();
//             t.click(a);
//             return this
//         };
//         s.push(u, p, t);
//         s.bars = u;
//         s.covers = p;
//         return s
//     }
//     var y = Math.min,
//         C = Math.max,
//         G = function () { };
//     G.prototype = Raphael.g;
//     F.prototype = E.prototype = new G;
//     Raphael.fn.barchart = function (f, m, i, b, a, h) {
//         return new E(this, f, m, i, b, a, h)
//     };
//     Raphael.fn.hbarchart = function (f, m, i, b, a, h) {
//         return new F(this, f, m, i, b, a, h)
//     }

// })();



/*!
 * g.Raphael 0.51 - Charting library, based on Raphaël
 *
 * Copyright (c) 2009-2012 Dmitry Baranovskiy (http://g.raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
(function () {
    var mmin = Math.min,
        mmax = Math.max;

    function finger(x, y, width, height, dir, ending, isPath, paper) {
        var path,
            ends = { round: 'round', sharp: 'sharp', soft: 'soft', square: 'square' };

        // dir 0 for horizontal and 1 for vertical
        if ((dir && !height) || (!dir && !width)) {
            return isPath ? "" : paper.path();
        }

        ending = ends[ending] || "square";
        height = Math.round(height);
        width = Math.round(width);
        x = Math.round(x);
        y = Math.round(y);

        switch (ending) {
            case "round":
                if (!dir) {
                    var r = ~~(height / 2);

                    if (width < r) {
                        r = width;
                        path = [
                            "M", x + .5, y + .5 - ~~(height / 2),
                            "l", 0, 0,
                            "a", r, ~~(height / 2), 0, 0, 1, 0, height,
                            "l", 0, 0,
                            "z"
                        ];
                    } else {
                        path = [
                            "M", x + .5, y + .5 - r,
                            "l", width - r, 0,
                            "a", r, r, 0, 1, 1, 0, height,
                            "l", r - width, 0,
                            "z"
                        ];
                    }
                } else {
                    r = ~~(width / 2);

                    if (height < r) {
                        r = height;
                        path = [
                            "M", x - ~~(width / 2), y,
                            "l", 0, 0,
                            "a", ~~(width / 2), r, 0, 0, 1, width, 0,
                            "l", 0, 0,
                            "z"
                        ];
                    } else {
                        path = [
                            "M", x - r, y,
                            "l", 0, r - height,
                            "a", r, r, 0, 1, 1, width, 0,
                            "l", 0, height - r,
                            "z"
                        ];
                    }
                }
                break;
            case "sharp":
                if (!dir) {
                    var half = ~~(height / 2);

                    path = [
                        "M", x, y + half,
                        "l", 0, -height, mmax(width - half, 0), 0, mmin(half, width), half, -mmin(half, width), half + (half * 2 < height),
                        "z"
                    ];
                } else {
                    half = ~~(width / 2);
                    path = [
                        "M", x + half, y,
                        "l", -width, 0, 0, -mmax(height - half, 0), half, -mmin(half, height), half, mmin(half, height), half,
                        "z"
                    ];
                }
                break;
            case "square":
                if (!dir) {
                    path = [
                        "M", x, y + ~~(height / 2),
                        "l", 0, -height, width, 0, 0, height,
                        "z"
                    ];
                } else {
                    path = [
                        "M", x + ~~(width / 2), y,
                        "l", 1 - width, 0, 0, -height, width - 1, 0,
                        "z"
                    ];
                }
                break;
            case "soft":
                if (!dir) {
                    r = mmin(width, Math.round(height / 5));
                    path = [
                        "M", x + .5, y + .5 - ~~(height / 2),
                        "l", width - r, 0,
                        "a", r, r, 0, 0, 1, r, r,
                        "l", 0, height - r * 2,
                        "a", r, r, 0, 0, 1, -r, r,
                        "l", r - width, 0,
                        "z"
                    ];
                } else {
                    r = mmin(Math.round(width / 5), height);
                    path = [
                        "M", x - ~~(width / 2), y,
                        "l", 0, r - height,
                        "a", r, r, 0, 0, 1, r, -r,
                        "l", width - 2 * r, 0,
                        "a", r, r, 0, 0, 1, r, r,
                        "l", 0, height - r,
                        "z"
                    ];
                }
        }

        if (isPath) {
            return path.join(",");
        } else {
            return paper.path(path);
        }
    }

    /*\
     * Paper.vbarchart
     [ method ]
     **
     * Creates a vertical bar chart
     **
     > Parameters
     **
     - x (number) x coordinate of the chart
     - y (number) y coordinate of the chart
     - width (number) width of the chart (respected by all elements in the set)
     - height (number) height of the chart (respected by all elements in the set)
     - values (array) values
     - opts (object) options for the chart
     o {
     o type (string) type of endings of the bar. Default: 'square'. Other options are: 'round', 'sharp', 'soft'.
     o gutter (number)(string) default '20%' (WHAT DOES IT DO?)
     o vgutter (number)
     o colors (array) colors be used repeatedly to plot the bars. If multicolumn bar is used each sequence of bars with use a different color.
     o stacked (boolean) whether or not to tread values as in a stacked bar chart
     o to
     o stretch (boolean)
     o }
     **
     = (object) path element of the popup
     > Usage
     | r.vbarchart(0, 0, 620, 260, [76, 70, 67, 71, 69], {})
     \*/

    function VBarchart(paper, x, y, width, height, values, opts) {
        opts = opts || {};

        var chartinst = this,
            type = opts.type || "square",
            gutter = parseFloat(opts.gutter || "20%"),
            chart = paper.set(),
            bars = paper.set(),
            covers = paper.set(),
            covers2 = paper.set(),
            total = Math.max.apply(Math, values),
            stacktotal = [],
            multi = 0,
            colors = opts.colors || chartinst.colors,
            len = values.length;
        var barsForLabel = []
        if (Raphael.is(values[0], "array")) {
            total = [];
            multi = len;
            len = 0;

            for (var i = values.length; i--;) {
                bars.push(paper.set());
                total.push(Math.max.apply(Math, values[i]));
                len = Math.max(len, values[i].length);
            }

            if (opts.stacked) {
                for (var i = len; i--;) {
                    var tot = 0;

                    for (var j = values.length; j--;) {
                        tot += +values[j][i] || 0;
                    }

                    stacktotal.push(tot);
                }
            }

            for (var i = values.length; i--;) {
                if (values[i].length < len) {
                    for (var j = len; j--;) {
                        values[i].push(0);
                    }
                }
            }

            total = Math.max.apply(Math, opts.stacked ? stacktotal : total);
        }

        total = (opts.to) || total;

        var barwidth = width / (len * (100 + gutter) + gutter) * 100,
            barhgutter = barwidth * gutter / 100,
            barvgutter = opts.vgutter == null ? 20 : opts.vgutter,
            stack = [],
            X = x + barhgutter,
            Y = (height - 2 * barvgutter) / total;

        if (!opts.stretch) {
            barhgutter = Math.round(barhgutter);
            barwidth = Math.floor(barwidth);
        }

        !opts.stacked && (barwidth /= multi || 1);

        for (var i = 0; i < len; i++) {
            stack = [];

            for (var j = 0; j < (multi || 1) ; j++) {
                var h = Math.round((multi ? values[j][i] : values[i]) * Y),
                    top = y + height - barvgutter - h,
                    bar = finger(Math.round(X + barwidth / 2), top + h, barwidth, h, true, type, null, paper).attr({ stroke: "none", fill: colors[multi ? j : i] });
                    //cust code
                barsForLabel[barsForLabel.length] = { x: Math.round(X + barwidth / 2), y: (top + h), bar: bar, height: h }
                //cust code

                if (multi) {
                    bars[j].push(bar);
                } else {
                    bars.push(bar);
                }

                bar.y = top;
                bar.x = Math.round(X + barwidth / 2);
                bar.w = barwidth;
                bar.h = h;
                bar.value = multi ? values[j][i] : values[i];

                if (!opts.stacked) {
                    X += barwidth;
                } else {
                    stack.push(bar);
                }
            }

            if (opts.stacked) {
                var cvr;

                covers2.push(cvr = paper.rect(stack[0].x - stack[0].w / 2, y, barwidth, height).attr(chartinst.shim));
                cvr.bars = paper.set();

                var size = 0;

                for (var s = stack.length; s--;) {
                    stack[s].toFront();
                }

                for (var s = 0, ss = stack.length; s < ss; s++) {
                    var bar = stack[s],
                        cover,
                        h = (size + bar.value) * Y,
                        path = finger(bar.x, y + height - barvgutter - !!size * .5, barwidth, h, true, type, 1, paper);

                    cvr.bars.push(bar);
                    size && bar.attr({ path: path });
                    bar.h = h;
                    bar.y = y + height - barvgutter - !!size * .5 - h;
                    covers.push(cover = paper.rect(bar.x - bar.w / 2, bar.y, barwidth, bar.value * Y).attr(chartinst.shim));
                    cover.bar = bar;
                    cover.value = bar.value;
                    size += bar.value;
                }

                X += barwidth;
            }

            X += barhgutter;
        }

        covers2.toFront();
        X = x + barhgutter;

        if (!opts.stacked) {
            for (var i = 0; i < len; i++) {
                for (var j = 0; j < (multi || 1) ; j++) {
                    var cover;

                    covers.push(cover = paper.rect(Math.round(X), y + barvgutter, barwidth, height - barvgutter).attr(chartinst.shim));
                    cover.bar = multi ? bars[j][i] : bars[i];
                    cover.value = cover.bar.value;
                    X += barwidth;
                }

                X += barhgutter;
            }
        }

        //Simple function to draw the xaxis labels for bar charts and non-bar charts
        chart.drawXAxis = function (xlabels, options) {
             
            if (xlabels && xlabels.length > 0) {
                options = options || {};
                options.attr = options.attr || { font: "12px Arial", fill: "#000", "font-weight": "regular" };
                options.rotate = options.rotate || 0;
                options.stacked = options.stacked || false;

                var barsLen = barsForLabel.length;
                var labelsLen = xlabels.length;

                //actual height of label
                var labelHeight = 0;
                if (options.stacked) {
                    for (var i = 0; i < barsLen; i++) {

                        /*
                          In case of bar charts, we have two bars combined into one.
                          ex: bar 0 and 1 is actually bar 1.
    
                          In such a situation, you only want to label the even numbered bars.
                        */
                        if ((i % 2) == 0 || i == 0) {
                            var bar = barsForLabel[i];
                            // Zero cannot be divided by 2
                            if (i == 0) {
                                xlabel = xlabels[0];
                            } else {
                                xlabel = xlabels[i / 2];
                            };
                            var t = paper.text(bar.x - 4, bar.y + 2 + (labelHeight / 2), xlabel)
                                 .attr(options.attr)
                                 .rotate(options.rotate)
                                 .insertBefore(bar.bar);

                            //
                            if (!labelHeight) {
                                labelHeight = t.getBBox().height;
                                //Now render the text
                                t.remove();
                                t = paper.text(bar.x - 4, bar.y + 2 + (labelHeight / 2), xlabel)
                                  .attr(options.attr)
                                  .rotate(options.rotate)
                                 .insertBefore(bar.bar);
                            }
                        };

                    } // closing for loop
                } else {
                    console.log("TS");
                    for (var i = 0; i < barsLen; i++) {
                        var bar = barsForLabel[i];
                        xlabel = xlabels[i];
                        var t = paper.text(bar.x - 4, bar.y + 2 + (labelHeight / 2), xlabel)
                             .attr(options.attr)
                             .rotate(options.rotate)
                             .insertBefore(bar.bar);

                        //
                        if (!labelHeight) {
                            labelHeight = t.getBBox().height;
                            console.log(xlabel);
                            //Now render the text
                            t.remove();
                            t = paper.text(bar.x - 4, bar.y + 2 + (labelHeight / 2), xlabel)
                              .attr(options.attr)
                              .rotate(options.rotate)
                              .insertBefore(bar.bar);
                        }
                    } // closing for loop

                }; // If else loop close

            }
            return this;
        };

        chart.drawYAxis = function (ylabels, min_y, max_y, options) {
            //TODO: If min and max value is not given then try to find from ylabels.
            if (!(Raphael.is(min_y, "number") && isFinite(min_y) && Raphael.is(max_y, "number") && isFinite(max_y)) || (min_y == max_y)) {
                //throw new Exception('Min-Max values are invalid.');
                return this;
            }
            console.log("one");
            console.log(max_y);
            try {
                options = (options || {});
                var txtattr = (options || {}).txtattr || { font: "9px Arial", fill: "#222222", "font-weight": "regular", color: "#0B648C" };
                ylabels = ylabels || [];
                var default_num_ticks = (ylabels.length == 0 ? 10 : ylabels.length);

                var paddingLeft = options.paddingLeft || options.padding || 50;
                var paddingBottom = options.paddingBottom || options.padding || 100;
                console.log("bottom");
                console.log(paddingBottom);
                var bar = barsForLabel[0];

                var helper = {
                    _generate_y_ticks: function (data, max_y, min_y) {
                        var y_ticks = [];
                        for (i = 0; i < default_num_ticks; i++) {
                            var ytick_amount = (max_y) / (default_num_ticks - 1);
                            var y_rounded = Math.round(i * ytick_amount * 100) / 100;
                            y_ticks.push(y_rounded);
                        }
                        return y_ticks;
                    },

                    /*
                      This function has been changed based on the current needs only.
                    */
                    _draw_y_axis_ticks: function (y_ticks, max_y, min_y, y_ticks_labels) {
                        if (y_ticks_labels == null || y_ticks_labels.length == 0) {
                            y_ticks_labels = y_ticks
                        }
                        for (var i = 0; i < y_ticks.length; i++) {
                            var y_tick = y_ticks[i];
                            // var y = (this.get_height() * y_tick) / max_y + this.get_origin_y();
                            var y = (148 * y_tick) / max_y + this.get_origin_y();

                            // var wx = this.l2w_x(this.get_origin_x());
                            var wx = this.l2w_x(15);
                            var wy = this.l2w_y(y);

                            paper.path("M" + (wx - 2) + " " + wy + "l4 0").attr(txtattr);
                            paper.text(wx - 10, wy, y_ticks_labels[i]).attr(txtattr);

                        }
                    },

                    _draw_y_axis: function () {
                        
                        paper.path("M" + this.get_origin_x() + " " + this.get_origin_y()
                                        + "L" + this.get_origin_x() + " "
                                        + (this.get_origin_y() + this.get_height())
                                        ).attr(txtattr);
                    },

                    get_width: function () {
                        return paper.width - paddingLeft;
                    },
                    get_height: function () {
                        //per pixcel unit for bar value * max value
                        console.log("Height");
                        console.log(Y * max_y);
                        console.log(paper.height);
                        
                        return (Y * max_y) || paper.height;
                    },
                    get_origin_x: function () {
                        console.log("Origin X");
                        console.log(paddingLeft);
                        return paddingLeft / 2;
                    },
                    get_origin_y: function () {
                        console.log("Origin Y");
                        console.log(barvgutter);
                       // return (y + barvgutter) || (2 + barvgutter);
                        return 350;
                    },

                    l2w_x: function (x) {
                        console.log("Origin X");
                        console.log(x);
                        return 10;
                        //return x;
                    },

                    l2w_y: function (y) {
                        return paper.height - y - 1;
                    },
                };

                // helper._draw_y_axis();

                //Draw axis ticks
                var y_ticks = helper._generate_y_ticks(ylabels, max_y, min_y);
                helper._draw_y_axis_ticks(y_ticks, max_y, min_y, ylabels);
            } catch (e) {

            }
            return this;
        };
        
        chart.label = function (labels, isBottom) {
            labels = labels || [];
            this.labels = paper.set();
       
         
            var L, l = -Infinity;

            if (opts.stacked) {
                for (var i = 0; i < len; i++) {
                    var tot = 0;

                    for (var j = 0; j < (multi || 1) ; j++) {
                        tot += multi ? values[j][i] : values[i];

                        if (j == multi - 1) {
                            var label = paper.labelise(labels[i], tot, total);
                            
                            L = paper.text(bars[i * (multi || 1) + j].x, y + height - barvgutter / 2, label).attr(txtattr).insertBefore(covers[i * (multi || 1) + j]);

                            var bb = L.getBBox();

                            if (bb.x - 7 < l) {
                                L.remove();
                            } else {
                                this.labels.push(L);
                                l = bb.x + bb.width;
                            }
                        }
                    }
                }
            } else {
                for (var i = 0; i < len; i++) {
                    for (var j = 0; j < (multi || 1) ; j++) {
                        var label = paper.labelise(multi ? labels[j] && labels[j][i] : labels[i], multi ? values[j][i] : values[i], total);
                         
                       // L = paper.text(bars[i * (multi || 1) + j].x, isBottom ? y + height - barvgutter / 2 : bars[i * (multi || 1) + j].y - 10, label).attr(txtattr).insertBefore(covers[i * (multi || 1) + j]);
                        //text(label_x, label_y, label_text).attr(label_attr).toBack();

                        //App Specific Jignesh
                        var attrObj;
                        if (label.indexOf("12/31") > -1) {
                            
                            attrObj= { fill: "rgba(0,0,255,.2)", font: "11px 'Helvetica'" } ;
                            // bc.labels[iBar].attr({ stroke: "Green" });
                        }
                        else {
                             
                            attrObj = { fill: "Lightgrey", font: "10px 'Helvetica'" };
                        }


                        L = paper.text(bars[i * (multi || 1) + j].x,
                            isBottom ? y + height - barvgutter / 2 : bars[i * (multi || 1) + j].y - 10, label).attr(attrObj);
                        //App Specific Jignesh Ends
                        var bb = L.getBBox() ;
                      
                        if (bb.x - 7 < l && label.indexOf("12/31") <= -1) {
                            
                         

                                L.remove();
                           
                           
                        } else {
                            this.labels.push(L);
                            l = bb.x + bb.width;
                        }
                    }
                }
            }
            return this;
        };

        chart.hover = function (fin, fout) {
            covers2.hide();
            covers.show();
            covers.mouseover(fin).mouseout(fout);
            return this;
        };

        chart.hoverColumn = function (fin, fout) {
            covers.hide();
            covers2.show();
            fout = fout || function () { };
            covers2.mouseover(fin).mouseout(fout);
            return this;
        };

        chart.click = function (f) {
           
            covers2.hide();
            covers.show();
            covers.click(f);
            return this;
        };

        chart.each = function (f) {
            if (!Raphael.is(f, "function")) {
                return this;
            }
            for (var i = covers.length; i--;) {
                f.call(covers[i]);
            }
            return this;
        };

        chart.eachColumn = function (f) {
            if (!Raphael.is(f, "function")) {
                return this;
            }
            for (var i = covers2.length; i--;) {
                f.call(covers2[i]);
            }
            return this;
        };

        chart.clickColumn = function (f) {
            covers.hide();
            covers2.show();
            covers2.click(f);
         
            return this;
        };

        chart.push(bars, covers, covers2);
        chart.bars = bars;
        chart.covers = covers;
        return chart;
    };

    //inheritance
    var F = function () { };
    F.prototype = Raphael.g;
    HBarchart.prototype = VBarchart.prototype = new F; //prototype reused by hbarchart

    Raphael.fn.barchart = function (x, y, width, height, values, opts) {
        return new VBarchart(this, x, y, width, height, values, opts);
    };

    /*\
     * Paper.barchart
     [ method ]
     **
     * Creates a horizontal bar chart
     **
     > Parameters
     **
     - x (number) x coordinate of the chart
     - y (number) y coordinate of the chart
     - width (number) width of the chart (respected by all elements in the set)
     - height (number) height of the chart (respected by all elements in the set)
     - values (array) values
     - opts (object) options for the chart
     o {
     o type (string) type of endings of the bar. Default: 'square'. Other options are: 'round', 'sharp', 'soft'.
     o gutter (number)(string) default '20%' (WHAT DOES IT DO?)
     o vgutter (number)
     o colors (array) colors be used repeatedly to plot the bars. If multicolumn bar is used each sequence of bars with use a different color.
     o stacked (boolean) whether or not to tread values as in a stacked bar chart
     o to
     o stretch (boolean)
     o }
     **
     = (object) path element of the popup
     > Usage
     | r.barchart(0, 0, 620, 260, [76, 70, 67, 71, 69], {})
     \*/

    function HBarchart(paper, x, y, width, height, values, opts) {
        opts = opts || {};

        var chartinst = this,
            type = opts.type || "square",
            gutter = parseFloat(opts.gutter || "20%"),
            chart = paper.set(),
            bars = paper.set(),
            covers = paper.set(),
            covers2 = paper.set(),
            total = Math.max.apply(Math, values),
            stacktotal = [],
            multi = 0,
            colors = opts.colors || chartinst.colors,
            len = values.length;

        if (Raphael.is(values[0], "array")) {
            total = [];
            multi = len;
            len = 0;

            for (var i = values.length; i--;) {
                bars.push(paper.set());
                total.push(Math.max.apply(Math, values[i]));
                len = Math.max(len, values[i].length);
            }

            if (opts.stacked) {
                for (var i = len; i--;) {
                    var tot = 0;
                    for (var j = values.length; j--;) {
                        tot += +values[j][i] || 0;
                    }
                    stacktotal.push(tot);
                }
            }

            for (var i = values.length; i--;) {
                if (values[i].length < len) {
                    for (var j = len; j--;) {
                        values[i].push(0);
                    }
                }
            }

            total = Math.max.apply(Math, opts.stacked ? stacktotal : total);
        }

        total = (opts.to) || total;

        var barheight = Math.floor(height / (len * (100 + gutter) + gutter) * 100),
            bargutter = Math.floor(barheight * gutter / 100),
            stack = [],
            Y = y + bargutter,
            X = (width - 1) / total;

        !opts.stacked && (barheight /= multi || 1);

        for (var i = 0; i < len; i++) {
            stack = [];

            for (var j = 0; j < (multi || 1) ; j++) {
                var val = multi ? values[j][i] : values[i],
                    bar = finger(x, Y + barheight / 2, Math.round(val * X), barheight - 1, false, type, null, paper).attr({ stroke: "none", fill: colors[multi ? j : i] });

                if (multi) {
                    bars[j].push(bar);
                } else {
                    bars.push(bar);
                }

                bar.x = x + Math.round(val * X);
                bar.y = Y + barheight / 2;
                bar.w = Math.round(val * X);
                bar.h = barheight;
                bar.value = +val;

                if (!opts.stacked) {
                    Y += barheight;
                } else {
                    stack.push(bar);
                }
            }

            if (opts.stacked) {
                var cvr = paper.rect(x, stack[0].y - stack[0].h / 2, width, barheight).attr(chartinst.shim);

                covers2.push(cvr);
                cvr.bars = paper.set();

                var size = 0;

                for (var s = stack.length; s--;) {
                    stack[s].toFront();
                }

                for (var s = 0, ss = stack.length; s < ss; s++) {
                    var bar = stack[s],
                        cover,
                        val = Math.round((size + bar.value) * X),
                        path = finger(x, bar.y, val, barheight - 1, false, type, 1, paper);

                    cvr.bars.push(bar);
                    size && bar.attr({ path: path });
                    bar.w = val;
                    bar.x = x + val;
                    covers.push(cover = paper.rect(x + size * X, bar.y - bar.h / 2, bar.value * X, barheight).attr(chartinst.shim));
                    cover.bar = bar;
                    size += bar.value;
                }

                Y += barheight;
            }

            Y += bargutter;
        }

        covers2.toFront();
        Y = y + bargutter;

        if (!opts.stacked) {
            for (var i = 0; i < len; i++) {
                for (var j = 0; j < (multi || 1) ; j++) {
                    var cover = paper.rect(x, Y, width, barheight).attr(chartinst.shim);

                    covers.push(cover);
                    cover.bar = multi ? bars[j][i] : bars[i];
                    cover.value = cover.bar.value;
                    Y += barheight;
                }

                Y += bargutter;
            }
        }

        chart.label = function (labels, isRight) {
            labels = labels || [];
            this.labels = paper.set();

            for (var i = 0; i < len; i++) {
                for (var j = 0; j < multi; j++) {
                    var label = paper.labelise(multi ? labels[j] && labels[j][i] : labels[i], multi ? values[j][i] : values[i], total),
                        X = isRight ? bars[i * (multi || 1) + j].x - barheight / 2 + 3 : x + 5,
                        A = isRight ? "end" : "start",
                        L;

                    this.labels.push(L = paper.text(X, bars[i * (multi || 1) + j].y, label).attr(txtattr).attr({ "text-anchor": A }).insertBefore(covers[0]));

                    if (L.getBBox().x < x + 5) {
                        L.attr({ x: x + 5, "text-anchor": "start" });
                    } else {
                        bars[i * (multi || 1) + j].label = L;
                    }
                }
            }

            return this;
        };

        chart.hover = function (fin, fout) {
            covers2.hide();
            covers.show();
            fout = fout || function () { };
            covers.mouseover(fin).mouseout(fout);
            return this;
        };

        chart.hoverColumn = function (fin, fout) {
            covers.hide();
            covers2.show();
            fout = fout || function () { };
            covers2.mouseover(fin).mouseout(fout);
            return this;
        };

        chart.each = function (f) {
            if (!Raphael.is(f, "function")) {
                return this;
            }
            for (var i = covers.length; i--;) {
                f.call(covers[i]);
            }
            return this;
        };

        chart.eachColumn = function (f) {
            if (!Raphael.is(f, "function")) {
                return this;
            }
            for (var i = covers2.length; i--;) {
                f.call(covers2[i]);
            }
            return this;
        };

        chart.click = function (f) {
            covers2.hide();
            covers.show();
            covers.click(f);
            return this;
        };

        chart.clickColumn = function (f) {
            covers.hide();
            covers2.show();
            covers2.click(f);
            return this;
        };

        chart.push(bars, covers, covers2);
        chart.bars = bars;
        chart.covers = covers;
        return chart;
    };

    Raphael.fn.hbarchart = function (x, y, width, height, values, opts) {
        return new HBarchart(this, x, y, width, height, values, opts);
    };

})();