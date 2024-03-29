(function (a) {
    var b = {
        $currentImgWrap: null, $magnifier: null, $magnifierImg: null, $magnifierState: null, init: function () {
            b.$magnifier = a('<div id="zm-magnifier"><img style="position:relative;left:0;top:0;"/><span>1X</span></div>').appendTo("body"), b.$magnifierImg = a("img", b.$magnifier), b.$magnifierState = a("span", b.$magnifier), a(document).bind("mousemove", function (a) {
                b.$currentImgWrap && b.movemagnifier(a)
            }), b.$magnifier.mousewheel(function (a, c, d, e) {
                var f = b.$currentImgWrap.get(0).zoominfo, g = e > 0 ? 1 : -1, h = Math.round((f.currentZoom + f.zoomStep * g) * 10) / 10;
                f.zoomRange[1] >= h && h >= f.zoomRange[0] && (f.currentZoom = h, b.$magnifierImg.css({
                    left: -(a.pageX - f.coords.left) * f.currentZoom + f.magnifierSize[0] / 2,
                    top: -(a.pageY - f.coords.top) * f.currentZoom + f.magnifierSize[1] / 2,
                    width: f.imgSize.width * f.currentZoom,
                    height: f.imgSize.height * f.currentZoom
                }), b.$magnifierState.text(f.currentZoom + "X")), a.preventDefault()
            })
        }, setup: function (c, d, e) {
            if (c.parent().attr("id") != "zm-magnifier") {
                var h, i;
                c.wrap('<div class="zm-wrap"></div>');
                var j = c.parent();
                d.hoverEf == "transparent" ? i = a('<div class="zm-hover zm-trans"></div>').appendTo(j) : ( d.hoverEf == "grayscale" ? e.grayscale(i) : d.hoverEf == "blur" && (a.browser.msie ? i.addClass("zm-blur") : e.blur(i, 3))), c.attr(d.largeImgAttr) ? (h = c.attr(d.largeImgAttr), (new Image).src = h) : h = c.attr("src"), j.get(0).zoominfo = {
                    defaultZoom: d.defaultZoom,
                    zoomStep: d.zoomStep,
                    zoomRange: d.zoomRange,
                    showZoomState: d.showZoomState,
                    borderSize: 3,
                    imgSize: null,
                    coords: null,
                    largeImg: null,
                    currentZoom: d.defaultZoom,
                    magnifierSize: d.magnifierSize
                }, j.bind("mouseover", function () {
                    b.$currentImgWrap = a(this);
                    var c = a("img:first", this), e = a(this).get(0).zoominfo;
                    e.coords = {
                        left: c.offset().left,
                        top: c.offset().top,
                        right: c.offset().left + c.width(),
                        bottom: c.offset().top + c.height()
                    }, e.largeImg = c.attr(d.largeImgAttr) ? c.attr(d.largeImgAttr) : c.attr("src"), e.imgSize = {
                        width: c.width(),
                        height: c.height()
                    }, a(this).get(0).zoominfo = e, b.$magnifierImg.attr("src", e.largeImg).css({
                        width: e.currentZoom * e.imgSize.width,
                        height: e.currentZoom * e.imgSize.height
                    }), b.$magnifier.css({
                        width: e.magnifierSize[0],
                        height: e.magnifierSize[1]
                    }).fadeIn(300), e.showZoomState ? b.$magnifierState.text(e.currentZoom + "X").show() : b.$magnifierState.hide(), a(this).find(".zm-hover").fadeIn(400)
                })
            }
        }, movemagnifier: function (a) {
            var c = b.$currentImgWrap.get(0).zoominfo;
            a.pageX >= c.coords.left && c.coords.right >= a.pageX && a.pageY >= c.coords.top && c.coords.bottom >= a.pageY ? (b.$magnifier.css({
                left: a.pageX - c.magnifierSize[0] / 2 - c.borderSize,
                top: a.pageY - c.magnifierSize[1] / 2 - c.borderSize
            }), b.$magnifierImg.css({
                left: -(a.pageX - c.coords.left) * c.currentZoom + c.magnifierSize[0] / 2,
                top: -(a.pageY - c.coords.top) * c.currentZoom + c.magnifierSize[1] / 2
            })) : (b.$currentImgWrap.find(".zm-hover").fadeOut(300), b.$currentImgWrap = null, b.$magnifier.hide())
        }
    };
    (function (a) {
        var c = {
            img2Gray: function (b) {
                try {
                    var c = document.createElement("canvas"), d = c.getContext("2d");
                    c.height = b.height, c.width = b.width, d.drawImage(b, 0, 0, b.width, b.height);
                    for (var e = d.getImageData(0, 0, b.width, b.height), f = 0; e.height > f; f++)for (var g = 0; e.width > g; g++) {
                        var h = f * 4 * e.width + g * 4, i = (e.data[h] + e.data[h + 1] + e.data[h + 2]) / 3;
                        e.data[h] = i, e.data[h + 1] = i, e.data[h + 2] = i
                    }
                    d.putImageData(e, 0, 0, 0, 0, e.width, e.height), a(b).attr("src", c.toDataURL())
                } catch (j) {
                    alert("Canvas can not getImageData from local or corss domain image!")
                }
            }, grayscale: function (b) {
                a.browser.msie ? b.addClass("zm-gray") : c.img2Gray(b.get(0))
            }, blur: function (a, b) {
                function c() {
                    this.r = 0, this.g = 0, this.b = 0, this.a = 0, this.next = null
                }

                var d = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259], e = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
                try {
                    var f = document.createElement("canvas"), g = f.getContext("2d"), h = f.width = a.width(), i = f.height = a.height();
                    g.drawImage(a.get(0), 0, 0, h, i);
                    var l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, j = g.getImageData(0, 0, f.width, f.height), k = j.data, F = b + b + 1, H = h - 1, I = i - 1, J = b + 1, K = J * (J + 1) / 2, L = new c, M = L;
                    for (n = 1; F > n; n++)if (M = M.next = new c, n == J)var N = M;
                    M.next = L;
                    var O = null, P = null;
                    r = q = 0;
                    var Q = d[b], R = e[b];
                    for (m = 0; i > m; m++) {
                        for (y = z = A = s = t = u = 0, v = J * (B = k[q]), w = J * (C = k[q + 1]), x = J * (D = k[q + 2]), s += K * B, t += K * C, u += K * D, M = L, n = 0; J > n; n++)M.r = B, M.g = C, M.b = D, M = M.next;
                        for (n = 1; J > n; n++)o = q + ((n > H ? H : n) << 2), s += (M.r = B = k[o]) * (E = J - n), t += (M.g = C = k[o + 1]) * E, u += (M.b = D = k[o + 2]) * E, y += B, z += C, A += D, M = M.next;
                        for (O = L, P = N, l = 0; h > l; l++)k[q] = s * Q >> R, k[q + 1] = t * Q >> R, k[q + 2] = u * Q >> R, s -= v, t -= w, u -= x, v -= O.r, w -= O.g, x -= O.b, o = r + (H > (o = l + b + 1) ? o : H) << 2, y += O.r = k[o], z += O.g = k[o + 1], A += O.b = k[o + 2], s += y, t += z, u += A, O = O.next, v += B = P.r, w += C = P.g, x += D = P.b, y -= B, z -= C, A -= D, P = P.next, q += 4;
                        r += h
                    }
                    for (l = 0; h > l; l++) {
                        for (z = A = y = t = u = s = 0, q = l << 2, v = J * (B = k[q]), w = J * (C = k[q + 1]), x = J * (D = k[q + 2]), s += K * B, t += K * C, u += K * D, M = L, n = 0; J > n; n++)M.r = B, M.g = C, M.b = D, M = M.next;
                        for (p = h, n = 1; b >= n; n++)q = p + l << 2, s += (M.r = B = k[q]) * (E = J - n), t += (M.g = C = k[q + 1]) * E, u += (M.b = D = k[q + 2]) * E, y += B, z += C, A += D, M = M.next, I > n && (p += h);
                        for (q = l, O = L, P = N, m = 0; i > m; m++)o = q << 2, k[o] = s * Q >> R, k[o + 1] = t * Q >> R, k[o + 2] = u * Q >> R, s -= v, t -= w, u -= x, v -= O.r, w -= O.g, x -= O.b, o = l + (I > (o = m + J) ? o : I) * h << 2, s += y += O.r = k[o], t += z += O.g = k[o + 1], u += A += O.b = k[o + 2], O = O.next, v += B = P.r, w += C = P.g, x += D = P.b, y -= B, z -= C, A -= D, P = P.next, q += h
                    }
                    g.putImageData(j, 0, 0), a.attr("src", f.toDataURL())
                } catch (S) {
                    alert("Canvas can not getImageData from local or corss domain image!")
                }
            }
        };
        a.fn.zoome = function (d) {
            var e = a.extend({
                defaultZoom: 2,
                largeImgAttr: "src",
                zoomRange: [1, 10],
                zoomStep: 1,
                showZoomState: !1,
                magnifierSize: [140, 140],
                borderSize: 3,
                hoverEf: "normal"
            }, d);
            return this.each(function () {
                return this.tagName != "IMG" ? !0 : (a(this).attr("src") && a.trim(a(this).attr("src")) != "" && (this.complete ? b.setup(a(this), e, c) : a(this).one("load", function () {
                    b.setup(a(this), e, c)
                })), void 0)
            })
        }
    })(jQuery), function (a) {
        function d(b) {
            var c = b || window.event, d = [].slice.call(arguments, 1), e = 0, g = 0, h = 0;
            return b = a.event.fix(c), b.type = "mousewheel", c.wheelDelta && (e = c.wheelDelta / 120), c.detail && (e = -c.detail / 3), h = e, c.axis !== void 0 && c.axis === c.HORIZONTAL_AXIS && (h = 0, g = -1 * e), c.wheelDeltaY !== void 0 && (h = c.wheelDeltaY / 120), c.wheelDeltaX !== void 0 && (g = -1 * c.wheelDeltaX / 120), d.unshift(b, e, g, h), (a.event.dispatch || a.event.handle).apply(this, d)
        }

        var b = ["DOMMouseScroll", "mousewheel"];
        if (a.event.fixHooks)for (var c = b.length; c;)a.event.fixHooks[b[--c]] = a.event.mouseHooks;
        a.event.special.mousewheel = {
            setup: function () {
                if (this.addEventListener)for (var a = b.length; a;)this.addEventListener(b[--a], d, !1); else this.onmousewheel = d
            }, teardown: function () {
                if (this.removeEventListener)for (var a = b.length; a;)this.removeEventListener(b[--a], d, !1); else this.onmousewheel = null
            }
        }, a.fn.extend({
            mousewheel: function (a) {
                return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
            }, unmousewheel: function (a) {
                return this.unbind("mousewheel", a)
            }
        })
    }(jQuery), a(function () {
        b.init()
    })
})(jQuery);