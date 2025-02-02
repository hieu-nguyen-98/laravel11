! function(a, b) {
"function" == typeof define && define.amd ? define(["jquery"], function(a) {
    return b(a)
}) : "object" == typeof module && module.exports ? module.exports = b(require("jquery")) : b(a.jQuery)
}(this, function(a) {
    ! function() {
        "use strict";

        function b(b, d) {
            if (this.el = b, this.$el = a(b), this.s = a.extend({}, c, d), this.s.dynamic && "undefined" !== this.s.dynamicEl && this.s.dynamicEl.constructor === Array && !this.s.dynamicEl.length) throw "When using dynamic mode, you must also define dynamicEl as an Array.";
            return this.modules = {}, this.lGalleryOn = !1, this.lgBusy = !1, this.hideBarTimeout = !1, this.isTouch = "ontouchstart" in document.documentElement, this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = !1), this.s.dynamic ? this.$items = this.s.dynamicEl : "this" === this.s.selector ? this.$items = this.$el : "" !== this.s.selector ? this.s.selectWithin ? this.$items = a(this.s.selectWithin).find(this.s.selector) : this.$items = this.$el.find(a(this.s.selector)) : this.$items = this.$el.children(), this.$slide = "", this.$outer = "", this.init(), this
        }
        var c = {
            mode: "lg-slide",
            cssEasing: "ease",
            easing: "linear",
            speed: 600,
            height: "100%",
            width: "100%",
            addClass: "",
            startClass: "lg-start-zoom",
            backdropDuration: 150,
            hideBarsDelay: 6e3,
            useLeft: !1,
            ariaLabelledby: "",
            ariaDescribedby: "",
            closable: !0,
            loop: !0,
            escKey: !0,
            keyPress: !0,
            controls: !0,
            slideEndAnimatoin: !0,
            hideControlOnEnd: !1,
            mousewheel: !0,
            getCaptionFromTitleOrAlt: !0,
            appendSubHtmlTo: ".lg-sub-html",
            subHtmlSelectorRelative: !1,
            preload: 1,
            showAfterLoad: !0,
            selector: "",
            selectWithin: "",
            nextHtml: "",
            prevHtml: "",
            index: !1,
            iframeMaxWidth: "100%",
            download: !0,
            counter: !0,
            appendCounterTo: ".lg-toolbar",
            swipeThreshold: 50,
            enableSwipe: !0,
            enableDrag: !0,
            dynamic: !1,
            dynamicEl: [],
            galleryId: 1,
            supportLegacyBrowser: !0
        };
        b.prototype.init = function() {
            var b = this;
            b.s.preload > b.$items.length && (b.s.preload = b.$items.length);
            var c = window.location.hash;
            c.indexOf("lg=" + this.s.galleryId) > 0 && (b.index = parseInt(c.split("&slide=")[1], 10), a("body").addClass("lg-from-hash"), a("body").hasClass("lg-on") || (setTimeout(function() {
                b.build(b.index)
            }), a("body").addClass("lg-on"))), b.s.dynamic ? (b.$el.trigger("onBeforeOpen.lg"), b.index = b.s.index || 0, a("body").hasClass("lg-on") || setTimeout(function() {
                b.build(b.index), a("body").addClass("lg-on")
            })) : b.$items.on("click.lgcustom", function(c) {
                try {
                    c.preventDefault(), c.preventDefault()
                } catch (a) {
                    c.returnValue = !1
                }
                b.$el.trigger("onBeforeOpen.lg"), b.index = b.s.index || b.$items.index(this), a("body").hasClass("lg-on") || (b.build(b.index), a("body").addClass("lg-on"))
            })
        }, b.prototype.build = function(b) {
            var c = this;
            c.structure(), a.each(a.fn.lightGallery.modules, function(b) {
                c.modules[b] = new a.fn.lightGallery.modules[b](c.el)
            }), c.slide(b, !1, !1, !1), c.s.keyPress && c.keyPress(), c.$items.length > 1 ? (c.arrow(), setTimeout(function() {
                c.enableDrag(), c.enableSwipe()
            }, 50), c.s.mousewheel && c.mousewheel()) : c.$slide.on("click.lg", function() {
                c.$el.trigger("onSlideClick.lg")
            }), c.counter(), c.closeGallery(), c.$el.trigger("onAfterOpen.lg"), c.s.hideBarsDelay > 0 && c.$outer.on("mousemove.lg click.lg touchstart.lg", function() {
                c.$outer.removeClass("lg-hide-items"), clearTimeout(c.hideBarTimeout), c.hideBarTimeout = setTimeout(function() {
                    c.$outer.addClass("lg-hide-items")
                }, c.s.hideBarsDelay)
            }), c.$outer.trigger("mousemove.lg")
        }, b.prototype.structure = function() {
            var b, c = "",
                d = "",
                e = 0,
                f = "",
                g = this;
            for (a("body").append('<div class="lg-backdrop"></div>'), a(".lg-backdrop").css("transition-duration", this.s.backdropDuration + "ms"), e = 0; e < this.$items.length; e++) c += '<div class="lg-item"></div>';
            if (this.s.controls && this.$items.length > 1 && (d = '<div class="lg-actions"><button type="button" aria-label="Previous slide" class="lg-prev lg-icon">' + this.s.prevHtml + '</button><button type="button" aria-label="Next slide" class="lg-next lg-icon">' + this.s.nextHtml + "</button></div>"), ".lg-sub-html" === this.s.appendSubHtmlTo && (f = '<div role="status" aria-live="polite" class="lg-sub-html"></div>'), b = '<div tabindex="-1" aria-modal="true" ' + (this.s.ariaLabelledby ? 'aria-labelledby="' + this.s.ariaLabelledby + '"' : "") + " " + (this.s.ariaDescribedby ? 'aria-describedby="' + this.s.ariaDescribedby + '"' : "") + ' role="dialog" class="lg-outer ' + this.s.addClass + " " + this.s.startClass + '"><div class="lg" style="width:' + this.s.width + "; height:" + this.s.height + '"><div class="lg-inner">' + c + '</div><div class="lg-toolbar lg-group"><button type="button" aria-label="Close gallery" class="lg-close lg-icon"></button></div>' + d + f + "</div></div>", a("body").append(b), this.$outer = a(".lg-outer"), this.$outer.focus(), this.$slide = this.$outer.find(".lg-item"), this.s.useLeft ? (this.$outer.addClass("lg-use-left"), this.s.mode = "lg-slide") : this.$outer.addClass("lg-use-css3"), g.setTop(), a(window).on("resize.lg orientationchange.lg", function() {
                    setTimeout(function() {
                        g.setTop()
                    }, 100)
                }), this.$slide.eq(this.index).addClass("lg-current"), this.doCss() ? this.$outer.addClass("lg-css3") : (this.$outer.addClass("lg-css"), this.s.speed = 0), this.$outer.addClass(this.s.mode), this.s.enableDrag && this.$items.length > 1 && this.$outer.addClass("lg-grab"), this.s.showAfterLoad && this.$outer.addClass("lg-show-after-load"), this.doCss()) {
                var h = this.$outer.find(".lg-inner");
                h.css("transition-timing-function", this.s.cssEasing), h.css("transition-duration", this.s.speed + "ms")
            }
            setTimeout(function() {
                a(".lg-backdrop").addClass("in")
            }), setTimeout(function() {
                g.$outer.addClass("lg-visible")
            }, this.s.backdropDuration), this.s.download && this.$outer.find(".lg-toolbar").append('<a id="lg-download" aria-label="Download" target="_blank" download class="lg-download lg-icon"></a>'), this.prevScrollTop = a(window).scrollTop()
        }, b.prototype.setTop = function() {
            if ("100%" !== this.s.height) {
                var b = a(window).height(),
                    c = (b - parseInt(this.s.height, 10)) / 2,
                    d = this.$outer.find(".lg");
                b >= parseInt(this.s.height, 10) ? d.css("top", c + "px") : d.css("top", "0px")
            }
        }, b.prototype.doCss = function() {
            return !! function() {
                var a = ["transition", "MozTransition", "WebkitTransition", "OTransition", "msTransition", "KhtmlTransition"],
                    b = document.documentElement,
                    c = 0;
                for (c = 0; c < a.length; c++)
                    if (a[c] in b.style) return !0
            }()
        }, b.prototype.isVideo = function(a, b) {
            var c;
            if (c = this.s.dynamic ? this.s.dynamicEl[b].html : this.$items.eq(b).attr("data-html"), !a) return c ? {
                html5: !0
            } : (console.error("lightGallery :- data-src is not provided on slide item " + (b + 1) + ". Please make sure the selector property is properly configured. More info - http://sachinchoolur.github.io/lightGallery/demos/html-markup.html"), !1);
            var d = a.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i),
                e = a.match(/\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)/i),
                f = a.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i),
                g = a.match(/\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i);
            return d ? {
                youtube: d
            } : e ? {
                vimeo: e
            } : f ? {
                dailymotion: f
            } : g ? {
                vk: g
            } : void 0
        }, b.prototype.counter = function() {
            this.s.counter && a(this.s.appendCounterTo).append('<div id="lg-counter" role="status" aria-live="polite"><span id="lg-counter-current">' + (parseInt(this.index, 10) + 1) + '</span> / <span id="lg-counter-all">' + this.$items.length + "</span></div>")
        }, b.prototype.addHtml = function(b) {
            var c, d, e = null;
            if (this.s.dynamic ? this.s.dynamicEl[b].subHtmlUrl ? c = this.s.dynamicEl[b].subHtmlUrl : e = this.s.dynamicEl[b].subHtml : (d = this.$items.eq(b), d.attr("data-sub-html-url") ? c = d.attr("data-sub-html-url") : (e = d.attr("data-sub-html"), this.s.getCaptionFromTitleOrAlt && !e && (e = d.attr("title") || d.find("img").first().attr("alt")))), !c)
                if (void 0 !== e && null !== e) {
                    var f = e.substring(0, 1);
                    "." !== f && "#" !== f || (e = this.s.subHtmlSelectorRelative && !this.s.dynamic ? d.find(e).html() : a(e).html())
                } else e = "";
            ".lg-sub-html" === this.s.appendSubHtmlTo ? c ? this.$outer.find(this.s.appendSubHtmlTo).load(c) : this.$outer.find(this.s.appendSubHtmlTo).html(e) : c ? this.$slide.eq(b).load(c) : this.$slide.eq(b).append(e), void 0 !== e && null !== e && ("" === e ? this.$outer.find(this.s.appendSubHtmlTo).addClass("lg-empty-html") : this.$outer.find(this.s.appendSubHtmlTo).removeClass("lg-empty-html")), this.$el.trigger("onAfterAppendSubHtml.lg", [b])
        }, b.prototype.preload = function(a) {
            var b = 1,
                c = 1;
            for (b = 1; b <= this.s.preload && !(b >= this.$items.length - a); b++) this.loadContent(a + b, !1, 0);
            for (c = 1; c <= this.s.preload && !(a - c < 0); c++) this.loadContent(a - c, !1, 0)
        }, b.prototype.loadContent = function(b, c, d) {
            var e, f, g, h, i, j, k, l = this,
                m = !1,
                n = function(b) {
                    for (var c = [], d = [], e = 0; e < b.length; e++) {
                        var g = b[e].split(" ");
                        "" === g[0] && g.splice(0, 1), d.push(g[0]), c.push(g[1])
                    }
                    for (var h = a(window).width(), i = 0; i < c.length; i++)
                        if (parseInt(c[i], 10) > h) {
                            f = d[i];
                            break
                        }
                };
            if (l.s.dynamic) {
                if (l.s.dynamicEl[b].poster && (m = !0, g = l.s.dynamicEl[b].poster), j = l.s.dynamicEl[b].html, f = l.s.dynamicEl[b].src, k = l.s.dynamicEl[b].alt, l.s.dynamicEl[b].responsive) {
                    n(l.s.dynamicEl[b].responsive.split(","))
                }
                h = l.s.dynamicEl[b].srcset, i = l.s.dynamicEl[b].sizes
            } else {
                var o = l.$items.eq(b);
                if (o.attr("data-poster") && (m = !0, g = o.attr("data-poster")), j = o.attr("data-html"), f = o.attr("href") || o.attr("data-src"), k = o.attr("title") || o.find("img").first().attr("alt"), o.attr("data-responsive")) {
                    n(o.attr("data-responsive").split(","))
                }
                h = o.attr("data-srcset"), i = o.attr("data-sizes")
            }
            var p = !1;
            l.s.dynamic ? l.s.dynamicEl[b].iframe && (p = !0) : "true" === l.$items.eq(b).attr("data-iframe") && (p = !0);
            var q = l.isVideo(f, b);
            if (!l.$slide.eq(b).hasClass("lg-loaded")) {
                if (p) l.$slide.eq(b).prepend('<div class="lg-video-cont lg-has-iframe" style="max-width:' + l.s.iframeMaxWidth + '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' + f + '"  allowfullscreen="true"></iframe></div></div>');
                else if (m) {
                    var r = "";
                    r = q && q.youtube ? "lg-has-youtube" : q && q.vimeo ? "lg-has-vimeo" : "lg-has-html5", l.$slide.eq(b).prepend('<div class="lg-video-cont ' + r + ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' + g + '" /></div></div>')
                } else q ? (l.$slide.eq(b).prepend('<div class="lg-video-cont "><div class="lg-video"></div></div>'), l.$el.trigger("hasVideo.lg", [b, f, j])) : (k = k ? 'alt="' + k + '"' : "", l.$slide.eq(b).prepend('<div class="lg-img-wrap"><img class="lg-object lg-image" ' + k + ' src="' + f + '" /></div>'));
                if (l.$el.trigger("onAferAppendSlide.lg", [b]), e = l.$slide.eq(b).find(".lg-object"), i && e.attr("sizes", i), h && (e.attr("srcset", h), this.s.supportLegacyBrowser)) try {
                    picturefill({
                        elements: [e[0]]
                    })
                } catch (a) {
                    console.warn("lightGallery :- If you want srcset to be supported for older browser please include picturefil version 2 javascript library in your document.")
                }
                ".lg-sub-html" !== this.s.appendSubHtmlTo && l.addHtml(b), l.$slide.eq(b).addClass("lg-loaded")
            }
            l.$slide.eq(b).find(".lg-object").on("load.lg error.lg", function() {
                var c = 0;
                d && !a("body").hasClass("lg-from-hash") && (c = d), setTimeout(function() {
                    l.$slide.eq(b).addClass("lg-complete"), l.$el.trigger("onSlideItemLoad.lg", [b, d || 0])
                }, c)
            }), q && q.html5 && !m && l.$slide.eq(b).addClass("lg-complete"), !0 === c && (l.$slide.eq(b).hasClass("lg-complete") ? l.preload(b) : l.$slide.eq(b).find(".lg-object").on("load.lg error.lg", function() {
                l.preload(b)
            }))
        }, b.prototype.slide = function(b, c, d, e) {
            var f = this.$outer.find(".lg-current").index(),
                g = this;
            if (!g.lGalleryOn || f !== b) {
                var h = this.$slide.length,
                    i = g.lGalleryOn ? this.s.speed : 0;
                if (!g.lgBusy) {
                    if (this.s.download) {
                        var j;
                        j = g.s.dynamic ? !1 !== g.s.dynamicEl[b].downloadUrl && (g.s.dynamicEl[b].downloadUrl || g.s.dynamicEl[b].src) : "false" !== g.$items.eq(b).attr("data-download-url") && (g.$items.eq(b).attr("data-download-url") || g.$items.eq(b).attr("href") || g.$items.eq(b).attr("data-src")), j ? (a("#lg-download").attr("href", j), g.$outer.removeClass("lg-hide-download")) : g.$outer.addClass("lg-hide-download")
                    }
                    if (this.$el.trigger("onBeforeSlide.lg", [f, b, c, d]), g.lgBusy = !0, clearTimeout(g.hideBarTimeout), ".lg-sub-html" === this.s.appendSubHtmlTo && setTimeout(function() {
                            g.addHtml(b)
                        }, i), this.arrowDisable(b), e || (b < f ? e = "prev" : b > f && (e = "next")), c) {
                        this.$slide.removeClass("lg-prev-slide lg-current lg-next-slide");
                        var k, l;
                        h > 2 ? (k = b - 1, l = b + 1, 0 === b && f === h - 1 ? (l = 0, k = h - 1) : b === h - 1 && 0 === f && (l = 0, k = h - 1)) : (k = 0, l = 1), "prev" === e ? g.$slide.eq(l).addClass("lg-next-slide") : g.$slide.eq(k).addClass("lg-prev-slide"), g.$slide.eq(b).addClass("lg-current")
                    } else g.$outer.addClass("lg-no-trans"), this.$slide.removeClass("lg-prev-slide lg-next-slide"), "prev" === e ? (this.$slide.eq(b).addClass("lg-prev-slide"), this.$slide.eq(f).addClass("lg-next-slide")) : (this.$slide.eq(b).addClass("lg-next-slide"), this.$slide.eq(f).addClass("lg-prev-slide")), setTimeout(function() {
                        g.$slide.removeClass("lg-current"), g.$slide.eq(b).addClass("lg-current"), g.$outer.removeClass("lg-no-trans")
                    }, 50);
                    g.lGalleryOn ? (setTimeout(function() {
                        g.loadContent(b, !0, 0)
                    }, this.s.speed + 50), setTimeout(function() {
                        g.lgBusy = !1, g.$el.trigger("onAfterSlide.lg", [f, b, c, d])
                    }, this.s.speed)) : (g.loadContent(b, !0, g.s.backdropDuration), g.lgBusy = !1, g.$el.trigger("onAfterSlide.lg", [f, b, c, d])), g.lGalleryOn = !0, this.s.counter && a("#lg-counter-current").text(b + 1)
                }
                g.index = b
            }
        }, b.prototype.goToNextSlide = function(a) {
            var b = this,
                c = b.s.loop;
            a && b.$slide.length < 3 && (c = !1), b.lgBusy || (b.index + 1 < b.$slide.length ? (b.index++, b.$el.trigger("onBeforeNextSlide.lg", [b.index]), b.slide(b.index, a, !1, "next")) : c ? (b.index = 0, b.$el.trigger("onBeforeNextSlide.lg", [b.index]), b.slide(b.index, a, !1, "next")) : b.s.slideEndAnimatoin && !a && (b.$outer.addClass("lg-right-end"), setTimeout(function() {
                b.$outer.removeClass("lg-right-end")
            }, 400)))
        }, b.prototype.goToPrevSlide = function(a) {
            var b = this,
                c = b.s.loop;
            a && b.$slide.length < 3 && (c = !1), b.lgBusy || (b.index > 0 ? (b.index--, b.$el.trigger("onBeforePrevSlide.lg", [b.index, a]), b.slide(b.index, a, !1, "prev")) : c ? (b.index = b.$items.length - 1, b.$el.trigger("onBeforePrevSlide.lg", [b.index, a]), b.slide(b.index, a, !1, "prev")) : b.s.slideEndAnimatoin && !a && (b.$outer.addClass("lg-left-end"), setTimeout(function() {
                b.$outer.removeClass("lg-left-end")
            }, 400)))
        }, b.prototype.keyPress = function() {
            var b = this;
            this.$items.length > 1 && a(window).on("keyup.lg", function(a) {
                b.$items.length > 1 && (37 === a.keyCode && (a.preventDefault(), b.goToPrevSlide()), 39 === a.keyCode && (a.preventDefault(), b.goToNextSlide()))
            }), a(window).on("keydown.lg", function(a) {
                !0 === b.s.escKey && 27 === a.keyCode && (a.preventDefault(), b.$outer.hasClass("lg-thumb-open") ? b.$outer.removeClass("lg-thumb-open") : b.destroy())
            })
        }, b.prototype.arrow = function() {
            var a = this;
            this.$outer.find(".lg-prev").on("click.lg", function() {
                a.goToPrevSlide()
            }), this.$outer.find(".lg-next").on("click.lg", function() {
                a.goToNextSlide()
            })
        }, b.prototype.arrowDisable = function(a) {
            !this.s.loop && this.s.hideControlOnEnd && (a + 1 < this.$slide.length ? this.$outer.find(".lg-next").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-next").attr("disabled", "disabled").addClass("disabled"), a > 0 ? this.$outer.find(".lg-prev").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-prev").attr("disabled", "disabled").addClass("disabled"))
        }, b.prototype.setTranslate = function(a, b, c) {
            this.s.useLeft ? a.css("left", b) : a.css({
                transform: "translate3d(" + b + "px, " + c + "px, 0px)"
            })
        }, b.prototype.touchMove = function(b, c) {
            var d = c - b;
            Math.abs(d) > 15 && (this.$outer.addClass("lg-dragging"), this.setTranslate(this.$slide.eq(this.index), d, 0), this.setTranslate(a(".lg-prev-slide"), -this.$slide.eq(this.index).width() + d, 0), this.setTranslate(a(".lg-next-slide"), this.$slide.eq(this.index).width() + d, 0))
        }, b.prototype.touchEnd = function(a) {
            var b = this;
            "lg-slide" !== b.s.mode && b.$outer.addClass("lg-slide"), this.$slide.not(".lg-current, .lg-prev-slide, .lg-next-slide").css("opacity", "0"), setTimeout(function() {
                b.$outer.removeClass("lg-dragging"), a < 0 && Math.abs(a) > b.s.swipeThreshold ? b.goToNextSlide(!0) : a > 0 && Math.abs(a) > b.s.swipeThreshold ? b.goToPrevSlide(!0) : Math.abs(a) < 5 && b.$el.trigger("onSlideClick.lg"), b.$slide.removeAttr("style")
            }), setTimeout(function() {
                b.$outer.hasClass("lg-dragging") || "lg-slide" === b.s.mode || b.$outer.removeClass("lg-slide")
            }, b.s.speed + 100)
        }, b.prototype.enableSwipe = function() {
            var a = this,
                b = 0,
                c = 0,
                d = !1;
            a.s.enableSwipe && a.doCss() && (a.$slide.on("touchstart.lg", function(c) {
                a.$outer.hasClass("lg-zoomed") || a.lgBusy || (c.preventDefault(), a.manageSwipeClass(), b = c.originalEvent.targetTouches[0].pageX)
            }), a.$slide.on("touchmove.lg", function(e) {
                a.$outer.hasClass("lg-zoomed") || (e.preventDefault(), c = e.originalEvent.targetTouches[0].pageX, a.touchMove(b, c), d = !0)
            }), a.$slide.on("touchend.lg", function() {
                a.$outer.hasClass("lg-zoomed") || (d ? (d = !1, a.touchEnd(c - b)) : a.$el.trigger("onSlideClick.lg"))
            }))
        }, b.prototype.enableDrag = function() {
            var b = this,
                c = 0,
                d = 0,
                e = !1,
                f = !1;
            b.s.enableDrag && b.doCss() && (b.$slide.on("mousedown.lg", function(d) {
                b.$outer.hasClass("lg-zoomed") || b.lgBusy || a(d.target).text().trim() || (d.preventDefault(), b.manageSwipeClass(), c = d.pageX, e = !0, b.$outer.scrollLeft += 1, b.$outer.scrollLeft -= 1, b.$outer.removeClass("lg-grab").addClass("lg-grabbing"), b.$el.trigger("onDragstart.lg"))
            }), a(window).on("mousemove.lg", function(a) {
                e && (f = !0, d = a.pageX, b.touchMove(c, d), b.$el.trigger("onDragmove.lg"))
            }), a(window).on("mouseup.lg", function(g) {
                f ? (f = !1, b.touchEnd(d - c), b.$el.trigger("onDragend.lg")) : (a(g.target).hasClass("lg-object") || a(g.target).hasClass("lg-video-play")) && b.$el.trigger("onSlideClick.lg"), e && (e = !1, b.$outer.removeClass("lg-grabbing").addClass("lg-grab"))
            }))
        }, b.prototype.manageSwipeClass = function() {
            var a = this.index + 1,
                b = this.index - 1;
            this.s.loop && this.$slide.length > 2 && (0 === this.index ? b = this.$slide.length - 1 : this.index === this.$slide.length - 1 && (a = 0)), this.$slide.removeClass("lg-next-slide lg-prev-slide"), b > -1 && this.$slide.eq(b).addClass("lg-prev-slide"), this.$slide.eq(a).addClass("lg-next-slide")
        }, b.prototype.mousewheel = function() {
            var a = this;
            a.$outer.on("mousewheel.lg", function(b) {
                b.deltaY && (b.deltaY > 0 ? a.goToPrevSlide() : a.goToNextSlide(), b.preventDefault())
            })
        }, b.prototype.closeGallery = function() {
            var b = this,
                c = !1;
            this.$outer.find(".lg-close").on("click.lg", function() {
                b.destroy()
            }), b.s.closable && (b.$outer.on("mousedown.lg", function(b) {
                c = !!(a(b.target).is(".lg-outer") || a(b.target).is(".lg-item ") || a(b.target).is(".lg-img-wrap"))
            }), b.$outer.on("mousemove.lg", function() {
                c = !1
            }), b.$outer.on("mouseup.lg", function(d) {
                (a(d.target).is(".lg-outer") || a(d.target).is(".lg-item ") || a(d.target).is(".lg-img-wrap") && c) && (b.$outer.hasClass("lg-dragging") || b.destroy())
            }))
        }, b.prototype.destroy = function(b) {
            var c = this;
            b || (c.$el.trigger("onBeforeClose.lg"), a(window).scrollTop(c.prevScrollTop)), b && (c.s.dynamic || this.$items.off("click.lg click.lgcustom"), a.removeData(c.el, "lightGallery")), this.$el.off(".lg.tm"), a.each(a.fn.lightGallery.modules, function(a) {
                c.modules[a] && c.modules[a].destroy()
            }), this.lGalleryOn = !1, clearTimeout(c.hideBarTimeout), this.hideBarTimeout = !1, a(window).off(".lg"), a("body").removeClass("lg-on lg-from-hash"), c.$outer && c.$outer.removeClass("lg-visible"), a(".lg-backdrop").removeClass("in"), setTimeout(function() {
                c.$outer && c.$outer.remove(), a(".lg-backdrop").remove(), b || c.$el.trigger("onCloseAfter.lg"), c.$el.focus()
            }, c.s.backdropDuration + 50)
        }, a.fn.lightGallery = function(c) {
            return this.each(function() {
                if (a.data(this, "lightGallery")) try {
                    a(this).data("lightGallery").init()
                } catch (a) {
                    console.error("lightGallery has not initiated properly", a)
                } else a.data(this, "lightGallery", new b(this, c))
            })
        }, a.fn.lightGallery.modules = {}
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof module && module.exports ? module.exports = b(require("jquery")) : b(a.jQuery)
}(this, function(a) {
    ! function() {
        "use strict";
        var b = {
                autoplay: !1,
                pause: 5e3,
                progressBar: !0,
                fourceAutoplay: !1,
                autoplayControls: !0,
                appendAutoplayControlsTo: ".lg-toolbar"
            },
            c = function(c) {
                return this.core = a(c).data("lightGallery"), this.$el = a(c), !(this.core.$items.length < 2) && (this.core.s = a.extend({}, b, this.core.s), this.interval = !1, this.fromAuto = !0, this.canceledOnTouch = !1, this.fourceAutoplayTemp = this.core.s.fourceAutoplay, this.core.doCss() || (this.core.s.progressBar = !1), this.init(), this)
            };
        c.prototype.init = function() {
            var a = this;
            a.core.s.autoplayControls && a.controls(), a.core.s.progressBar && a.core.$outer.find(".lg").append('<div class="lg-progress-bar"><div class="lg-progress"></div></div>'), a.progress(), a.core.s.autoplay && a.$el.one("onSlideItemLoad.lg.tm", function() {
                a.startlAuto()
            }), a.$el.on("onDragstart.lg.tm touchstart.lg.tm", function() {
                a.interval && (a.cancelAuto(), a.canceledOnTouch = !0)
            }), a.$el.on("onDragend.lg.tm touchend.lg.tm onSlideClick.lg.tm", function() {
                !a.interval && a.canceledOnTouch && (a.startlAuto(), a.canceledOnTouch = !1)
            })
        }, c.prototype.progress = function() {
            var a, b, c = this;
            c.$el.on("onBeforeSlide.lg.tm", function() {
                c.core.s.progressBar && c.fromAuto && (a = c.core.$outer.find(".lg-progress-bar"), b = c.core.$outer.find(".lg-progress"), c.interval && (b.removeAttr("style"), a.removeClass("lg-start"), setTimeout(function() {
                    b.css("transition", "width " + (c.core.s.speed + c.core.s.pause) + "ms ease 0s"), a.addClass("lg-start")
                }, 20))), c.fromAuto || c.core.s.fourceAutoplay || c.cancelAuto(), c.fromAuto = !1
            })
        }, c.prototype.controls = function() {
            var b = this;
            a(this.core.s.appendAutoplayControlsTo).append('<button type="button" aria-label="Toggle autoplay" class="lg-autoplay-button lg-icon"></button>'), b.core.$outer.find(".lg-autoplay-button").on("click.lg", function() {
                a(b.core.$outer).hasClass("lg-show-autoplay") ? (b.cancelAuto(), b.core.s.fourceAutoplay = !1) : b.interval || (b.startlAuto(), b.core.s.fourceAutoplay = b.fourceAutoplayTemp)
            })
        }, c.prototype.startlAuto = function() {
            var a = this;
            a.core.$outer.find(".lg-progress").css("transition", "width " + (a.core.s.speed + a.core.s.pause) + "ms ease 0s"), a.core.$outer.addClass("lg-show-autoplay"), a.core.$outer.find(".lg-progress-bar").addClass("lg-start"), a.interval = setInterval(function() {
                a.core.index + 1 < a.core.$items.length ? a.core.index++ : a.core.index = 0, a.fromAuto = !0, a.core.slide(a.core.index, !1, !1, "next")
            }, a.core.s.speed + a.core.s.pause)
        }, c.prototype.cancelAuto = function() {
            clearInterval(this.interval), this.interval = !1, this.core.$outer.find(".lg-progress").removeAttr("style"), this.core.$outer.removeClass("lg-show-autoplay"), this.core.$outer.find(".lg-progress-bar").removeClass("lg-start")
        }, c.prototype.destroy = function() {
            this.cancelAuto(), this.core.$outer.find(".lg-progress-bar").remove()
        }, a.fn.lightGallery.modules.autoplay = c
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof module && module.exports ? module.exports = b(require("jquery")) : b(a.jQuery)
}(this, function(a) {
    ! function() {
        "use strict";

        function b() {
            return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement
        }
        var c = {
                fullScreen: !0
            },
            d = function(b) {
                return this.core = a(b).data("lightGallery"), this.$el = a(b), this.core.s = a.extend({}, c, this.core.s), this.init(), this
            };
        d.prototype.init = function() {
            var a = "";
            if (this.core.s.fullScreen) {
                if (!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled)) return;
                a = '<button type="button" aria-label="Toggle fullscreen" class="lg-fullscreen lg-icon"></button>', this.core.$outer.find(".lg-toolbar").append(a), this.fullScreen()
            }
        }, d.prototype.requestFullscreen = function() {
            var a = document.documentElement;
            a.requestFullscreen ? a.requestFullscreen() : a.msRequestFullscreen ? a.msRequestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullscreen && a.webkitRequestFullscreen()
        }, d.prototype.exitFullscreen = function() {
            document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()
        }, d.prototype.fullScreen = function() {
            var c = this;
            a(document).on("fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg", function() {
                c.core.$outer.toggleClass("lg-fullscreen-on")
            }), this.core.$outer.find(".lg-fullscreen").on("click.lg", function() {
                b() ? c.exitFullscreen() : c.requestFullscreen()
            })
        }, d.prototype.destroy = function() {
            b() && this.exitFullscreen(), a(document).off("fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg")
        }, a.fn.lightGallery.modules.fullscreen = d
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(0, function(a) {
    ! function() {
        "use strict";
        var b = {
                pager: !1
            },
            c = function(c) {
                return this.core = a(c).data("lightGallery"), this.$el = a(c), this.core.s = a.extend({}, b, this.core.s), this.core.s.pager && this.core.$items.length > 1 && this.init(), this
            };
        c.prototype.init = function() {
            var b, c, d, e = this,
                f = "";
            if (e.core.$outer.find(".lg").append('<div class="lg-pager-outer"></div>'), e.core.s.dynamic)
                for (var g = 0; g < e.core.s.dynamicEl.length; g++) f += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + e.core.s.dynamicEl[g].thumb + '" /></div></span>';
            else e.core.$items.each(function() {
                e.core.s.exThumbImage ? f += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + a(this).attr(e.core.s.exThumbImage) + '" /></div></span>' : f += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + a(this).find("img").attr("src") + '" /></div></span>'
            });
            c = e.core.$outer.find(".lg-pager-outer"), c.html(f), b = e.core.$outer.find(".lg-pager-cont"), b.on("click.lg touchend.lg", function() {
                var b = a(this);
                e.core.index = b.index(), e.core.slide(e.core.index, !1, !0, !1)
            }), c.on("mouseover.lg", function() {
                clearTimeout(d), c.addClass("lg-pager-hover")
            }), c.on("mouseout.lg", function() {
                d = setTimeout(function() {
                    c.removeClass("lg-pager-hover")
                })
            }), e.core.$el.on("onBeforeSlide.lg.tm", function(a, c, d) {
                b.removeClass("lg-pager-active"), b.eq(d).addClass("lg-pager-active")
            })
        }, c.prototype.destroy = function() {}, a.fn.lightGallery.modules.pager = c
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof module && module.exports ? module.exports = b(require("jquery")) : b(a.jQuery)
}(this, function(a) {
    ! function() {
        "use strict";
        var b = {
                thumbnail: !0,
                animateThumb: !0,
                currentPagerPosition: "middle",
                thumbWidth: 100,
                thumbHeight: "80px",
                thumbContHeight: 100,
                thumbMargin: 5,
                exThumbImage: !1,
                showThumbByDefault: !0,
                toogleThumb: !0,
                pullCaptionUp: !0,
                enableThumbDrag: !0,
                enableThumbSwipe: !0,
                swipeThreshold: 50,
                loadYoutubeThumbnail: !0,
                youtubeThumbSize: 1,
                loadVimeoThumbnail: !0,
                vimeoThumbSize: "thumbnail_small",
                loadDailymotionThumbnail: !0
            },
            c = function(c) {
                return this.core = a(c).data("lightGallery"), this.core.s = a.extend({}, b, this.core.s), this.$el = a(c), this.$thumbOuter = null, this.thumbOuterWidth = 0, this.thumbTotalWidth = this.core.$items.length * (this.core.s.thumbWidth + this.core.s.thumbMargin), this.thumbIndex = this.core.index, this.core.s.animateThumb && (this.core.s.thumbHeight = "100%"), this.left = 0, this.init(), this
            };
        c.prototype.init = function() {
            var a = this;
            this.core.s.thumbnail && this.core.$items.length > 1 && (this.core.s.showThumbByDefault && setTimeout(function() {
                a.core.$outer.addClass("lg-thumb-open")
            }, 700), this.core.s.pullCaptionUp && this.core.$outer.addClass("lg-pull-caption-up"), this.build(), this.core.s.animateThumb && this.core.doCss() ? (this.core.s.enableThumbDrag && this.enableThumbDrag(), this.core.s.enableThumbSwipe && this.enableThumbSwipe(), this.thumbClickable = !1) : this.thumbClickable = !0, this.toogle(), this.thumbkeyPress())
        }, c.prototype.build = function() {
            function b(a, b, c) {
                var g, h = d.core.isVideo(a, c) || {},
                    i = "";
                h.youtube || h.vimeo || h.dailymotion ? h.youtube ? g = d.core.s.loadYoutubeThumbnail ? "//img.youtube.com/vi/" + h.youtube[1] + "/" + d.core.s.youtubeThumbSize + ".jpg" : b : h.vimeo ? d.core.s.loadVimeoThumbnail ? (g = "//i.vimeocdn.com/video/error_" + f + ".jpg", i = h.vimeo[1]) : g = b : h.dailymotion && (g = d.core.s.loadDailymotionThumbnail ? "//www.dailymotion.com/thumbnail/video/" + h.dailymotion[1] : b) : g = b, e += '<div data-vimeo-id="' + i + '" class="lg-thumb-item" style="width:' + d.core.s.thumbWidth + "px; height: " + d.core.s.thumbHeight + "; margin-right: " + d.core.s.thumbMargin + 'px"><img src="' + g + '" /></div>', i = ""
            }
            var c, d = this,
                e = "",
                f = "",
                g = '<div class="lg-thumb-outer"><div class="lg-thumb lg-group"></div></div>';
            switch (this.core.s.vimeoThumbSize) {
                case "thumbnail_large":
                    f = "640";
                    break;
                case "thumbnail_medium":
                    f = "200x150";
                    break;
                case "thumbnail_small":
                    f = "100x75"
            }
            if (d.core.$outer.addClass("lg-has-thumb"), d.core.$outer.find(".lg").append(g), d.$thumbOuter = d.core.$outer.find(".lg-thumb-outer"), d.thumbOuterWidth = d.$thumbOuter.width(), d.core.s.animateThumb && d.core.$outer.find(".lg-thumb").css({
                    width: d.thumbTotalWidth + "px",
                    position: "relative"
                }), this.core.s.animateThumb && d.$thumbOuter.css("height", d.core.s.thumbContHeight + "px"), d.core.s.dynamic)
                for (var h = 0; h < d.core.s.dynamicEl.length; h++) b(d.core.s.dynamicEl[h].src, d.core.s.dynamicEl[h].thumb, h);
            else d.core.$items.each(function(c) {
                d.core.s.exThumbImage ? b(a(this).attr("href") || a(this).attr("data-src"), a(this).attr(d.core.s.exThumbImage), c) : b(a(this).attr("href") || a(this).attr("data-src"), a(this).find("img").attr("src"), c)
            });
            d.core.$outer.find(".lg-thumb").html(e), c = d.core.$outer.find(".lg-thumb-item"), c.each(function() {
                var b = a(this),
                    c = b.attr("data-vimeo-id");
                c && a.getJSON("//www.vimeo.com/api/v2/video/" + c + ".json?callback=?", {
                    format: "json"
                }, function(a) {
                    b.find("img").attr("src", a[0][d.core.s.vimeoThumbSize])
                })
            }), c.eq(d.core.index).addClass("active"), d.core.$el.on("onBeforeSlide.lg.tm", function() {
                c.removeClass("active"), c.eq(d.core.index).addClass("active")
            }), c.on("click.lg touchend.lg", function() {
                var b = a(this);
                setTimeout(function() {
                    (d.thumbClickable && !d.core.lgBusy || !d.core.doCss()) && (d.core.index = b.index(), d.core.slide(d.core.index, !1, !0, !1))
                }, 50)
            }), d.core.$el.on("onBeforeSlide.lg.tm", function() {
                d.animateThumb(d.core.index)
            }), a(window).on("resize.lg.thumb orientationchange.lg.thumb", function() {
                setTimeout(function() {
                    d.animateThumb(d.core.index), d.thumbOuterWidth = d.$thumbOuter.width()
                }, 200)
            })
        }, c.prototype.setTranslate = function(a) {
            this.core.$outer.find(".lg-thumb").css({
                transform: "translate3d(-" + a + "px, 0px, 0px)"
            })
        }, c.prototype.animateThumb = function(a) {
            var b = this.core.$outer.find(".lg-thumb");
            if (this.core.s.animateThumb) {
                var c;
                switch (this.core.s.currentPagerPosition) {
                    case "left":
                        c = 0;
                        break;
                    case "middle":
                        c = this.thumbOuterWidth / 2 - this.core.s.thumbWidth / 2;
                        break;
                    case "right":
                        c = this.thumbOuterWidth - this.core.s.thumbWidth
                }
                this.left = (this.core.s.thumbWidth + this.core.s.thumbMargin) * a - 1 - c, this.left > this.thumbTotalWidth - this.thumbOuterWidth && (this.left = this.thumbTotalWidth - this.thumbOuterWidth), this.left < 0 && (this.left = 0), this.core.lGalleryOn ? (b.hasClass("on") || this.core.$outer.find(".lg-thumb").css("transition-duration", this.core.s.speed + "ms"), this.core.doCss() || b.animate({
                    left: -this.left + "px"
                }, this.core.s.speed)) : this.core.doCss() || b.css("left", -this.left + "px"), this.setTranslate(this.left)
            }
        }, c.prototype.enableThumbDrag = function() {
            var b = this,
                c = 0,
                d = 0,
                e = !1,
                f = !1,
                g = 0;
            b.$thumbOuter.addClass("lg-grab"), b.core.$outer.find(".lg-thumb").on("mousedown.lg.thumb", function(a) {
                b.thumbTotalWidth > b.thumbOuterWidth && (a.preventDefault(), c = a.pageX, e = !0, b.core.$outer.scrollLeft += 1, b.core.$outer.scrollLeft -= 1, b.thumbClickable = !1, b.$thumbOuter.removeClass("lg-grab").addClass("lg-grabbing"))
            }), a(window).on("mousemove.lg.thumb", function(a) {
                e && (g = b.left, f = !0, d = a.pageX, b.$thumbOuter.addClass("lg-dragging"), g -= d - c, g > b.thumbTotalWidth - b.thumbOuterWidth && (g = b.thumbTotalWidth - b.thumbOuterWidth), g < 0 && (g = 0), b.setTranslate(g))
            }), a(window).on("mouseup.lg.thumb", function() {
                f ? (f = !1, b.$thumbOuter.removeClass("lg-dragging"), b.left = g, Math.abs(d - c) < b.core.s.swipeThreshold && (b.thumbClickable = !0)) : b.thumbClickable = !0, e && (e = !1, b.$thumbOuter.removeClass("lg-grabbing").addClass("lg-grab"))
            })
        }, c.prototype.enableThumbSwipe = function() {
            var a = this,
                b = 0,
                c = 0,
                d = !1,
                e = 0;
            a.core.$outer.find(".lg-thumb").on("touchstart.lg", function(c) {
                a.thumbTotalWidth > a.thumbOuterWidth && (c.preventDefault(), b = c.originalEvent.targetTouches[0].pageX, a.thumbClickable = !1)
            }), a.core.$outer.find(".lg-thumb").on("touchmove.lg", function(f) {
                a.thumbTotalWidth > a.thumbOuterWidth && (f.preventDefault(), c = f.originalEvent.targetTouches[0].pageX, d = !0, a.$thumbOuter.addClass("lg-dragging"), e = a.left, e -= c - b, e > a.thumbTotalWidth - a.thumbOuterWidth && (e = a.thumbTotalWidth - a.thumbOuterWidth), e < 0 && (e = 0), a.setTranslate(e))
            }), a.core.$outer.find(".lg-thumb").on("touchend.lg", function() {
                a.thumbTotalWidth > a.thumbOuterWidth && d ? (d = !1, a.$thumbOuter.removeClass("lg-dragging"), Math.abs(c - b) < a.core.s.swipeThreshold && (a.thumbClickable = !0), a.left = e) : a.thumbClickable = !0
            })
        }, c.prototype.toogle = function() {
            var a = this;
            a.core.s.toogleThumb && (a.core.$outer.addClass("lg-can-toggle"), a.$thumbOuter.append('<button type="button" aria-label="Toggle thumbnails" class="lg-toogle-thumb lg-icon"></button>'), a.core.$outer.find(".lg-toogle-thumb").on("click.lg", function() {
                a.core.$outer.toggleClass("lg-thumb-open")
            }))
        }, c.prototype.thumbkeyPress = function() {
            var b = this;
            a(window).on("keydown.lg.thumb", function(a) {
                38 === a.keyCode ? (a.preventDefault(), b.core.$outer.addClass("lg-thumb-open")) : 40 === a.keyCode && (a.preventDefault(), b.core.$outer.removeClass("lg-thumb-open"))
            })
        }, c.prototype.destroy = function() {
            this.core.s.thumbnail && this.core.$items.length > 1 && (a(window).off("resize.lg.thumb orientationchange.lg.thumb keydown.lg.thumb"), this.$thumbOuter.remove(), this.core.$outer.removeClass("lg-has-thumb"))
        }, a.fn.lightGallery.modules.Thumbnail = c
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof module && module.exports ? module.exports = b(require("jquery")) : b(a.jQuery)
}(this, function(a) {
    ! function() {
        "use strict";

        function b(a, b, c, d) {
            var e = this;
            if (e.core.$slide.eq(b).find(".lg-video").append(e.loadVideo(c, "lg-object", !0, b, d)), d)
                if (e.core.s.videojs) try {
                    videojs(e.core.$slide.eq(b).find(".lg-html5").get(0), e.core.s.videojsOptions, function() {
                        !e.videoLoaded && e.core.s.autoplayFirstVideo && this.play()
                    })
                } catch (a) {
                    console.error("Make sure you have included videojs")
                } else !e.videoLoaded && e.core.s.autoplayFirstVideo && e.core.$slide.eq(b).find(".lg-html5").get(0).play()
        }

        function c(a, b) {
            var c = this.core.$slide.eq(b).find(".lg-video-cont");
            c.hasClass("lg-has-iframe") || (c.css("max-width", this.core.s.videoMaxWidth), this.videoLoaded = !0)
        }

        function d(b, c, d) {
            var e = this,
                f = e.core.$slide.eq(c),
                g = f.find(".lg-youtube").get(0),
                h = f.find(".lg-vimeo").get(0),
                i = f.find(".lg-dailymotion").get(0),
                j = f.find(".lg-vk").get(0),
                k = f.find(".lg-html5").get(0);
            if (g) g.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
            else if (h) try {
                    $f(h).api("pause")
                } catch (a) {
                    console.error("Make sure you have included froogaloop2 js")
                } else if (i) i.contentWindow.postMessage("pause", "*");
                else if (k)
                if (e.core.s.videojs) try {
                    videojs(k).pause()
                } catch (a) {
                    console.error("Make sure you have included videojs")
                } else k.pause();
            j && a(j).attr("src", a(j).attr("src").replace("&autoplay", "&noplay"));
            var l;
            l = e.core.s.dynamic ? e.core.s.dynamicEl[d].src : e.core.$items.eq(d).attr("href") || e.core.$items.eq(d).attr("data-src");
            var m = e.core.isVideo(l, d) || {};
            (m.youtube || m.vimeo || m.dailymotion || m.vk) && e.core.$outer.addClass("lg-hide-download")
        }
        var e = {
                videoMaxWidth: "855px",
                autoplayFirstVideo: !0,
                youtubePlayerParams: !1,
                vimeoPlayerParams: !1,
                dailymotionPlayerParams: !1,
                vkPlayerParams: !1,
                videojs: !1,
                videojsOptions: {}
            },
            f = function(b) {
                return this.core = a(b).data("lightGallery"), this.$el = a(b), this.core.s = a.extend({}, e, this.core.s), this.videoLoaded = !1, this.init(), this
            };
        f.prototype.init = function() {
            var e = this;
            e.core.$el.on("hasVideo.lg.tm", b.bind(this)), e.core.$el.on("onAferAppendSlide.lg.tm", c.bind(this)), e.core.doCss() && e.core.$items.length > 1 && (e.core.s.enableSwipe || e.core.s.enableDrag) ? e.core.$el.on("onSlideClick.lg.tm", function() {
                var a = e.core.$slide.eq(e.core.index);
                e.loadVideoOnclick(a)
            }) : e.core.$slide.on("click.lg", function() {
                e.loadVideoOnclick(a(this))
            }), e.core.$el.on("onBeforeSlide.lg.tm", d.bind(this)), e.core.$el.on("onAfterSlide.lg.tm", function(a, b) {
                e.core.$slide.eq(b).removeClass("lg-video-playing")
            }), e.core.s.autoplayFirstVideo && e.core.$el.on("onAferAppendSlide.lg.tm", function(a, b) {
                if (!e.core.lGalleryOn) {
                    var c = e.core.$slide.eq(b);
                    setTimeout(function() {
                        e.loadVideoOnclick(c)
                    }, 100)
                }
            })
        }, f.prototype.loadVideo = function(b, c, d, e, f) {
            var g, h = this,
                i = "",
                j = 1,
                k = "",
                l = this.core.isVideo(b, e) || {};
            if (g = h.core.s.dynamic ? h.core.s.dynamicEl[h.core.index].title : h.core.$items.eq(h.core.index).attr("title") || h.core.$items.eq(h.core.index).find("img").first().attr("alt"), g = g ? 'title="' + g + '"' : "", d && (j = this.videoLoaded ? 0 : this.core.s.autoplayFirstVideo ? 1 : 0), l.youtube) k = "?wmode=opaque&autoplay=" + j + "&enablejsapi=1", this.core.s.youtubePlayerParams && (k = k + "&" + a.param(this.core.s.youtubePlayerParams)), i = '<iframe class="lg-video-object lg-youtube ' + c + '" ' + g + ' width="560" height="315" src="//www.youtube.com/embed/' + l.youtube[1] + k + '" frameborder="0" allowfullscreen></iframe>';
            else if (l.vimeo) k = "?autoplay=" + j + "&api=1", this.core.s.vimeoPlayerParams && (k = k + "&" + a.param(this.core.s.vimeoPlayerParams)), i = '<iframe class="lg-video-object lg-vimeo ' + c + '" ' + g + ' width="560" height="315"  src="//player.vimeo.com/video/' + l.vimeo[1] + k + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
            else if (l.dailymotion) k = "?wmode=opaque&autoplay=" + j + "&api=postMessage", this.core.s.dailymotionPlayerParams && (k = k + "&" + a.param(this.core.s.dailymotionPlayerParams)), i = '<iframe class="lg-video-object lg-dailymotion ' + c + '" ' + g + ' width="560" height="315" src="//www.dailymotion.com/embed/video/' + l.dailymotion[1] + k + '" frameborder="0" allowfullscreen></iframe>';
            else if (l.html5) {
                var m = f.substring(0, 1);
                "." !== m && "#" !== m || (f = a(f).html()), i = f
            } else l.vk && (k = "&autoplay=" + j, this.core.s.vkPlayerParams && (k = k + "&" + a.param(this.core.s.vkPlayerParams)), i = '<iframe class="lg-video-object lg-vk ' + c + '" ' + g + ' width="560" height="315" src="//vk.com/video_ext.php?' + l.vk[1] + k + '" frameborder="0" allowfullscreen></iframe>');
            return i
        }, f.prototype.loadVideoOnclick = function(a) {
            var b = this;
            if (a.find(".lg-object").hasClass("lg-has-poster") && a.find(".lg-object").is(":visible"))
                if (a.hasClass("lg-has-video")) {
                    var c = a.find(".lg-youtube").get(0),
                        d = a.find(".lg-vimeo").get(0),
                        e = a.find(".lg-dailymotion").get(0),
                        f = a.find(".lg-html5").get(0);
                    if (c) c.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
                    else if (d) try {
                            $f(d).api("play")
                        } catch (a) {
                            console.error("Make sure you have included froogaloop2 js")
                        } else if (e) e.contentWindow.postMessage("play", "*");
                        else if (f)
                        if (b.core.s.videojs) try {
                            videojs(f).play()
                        } catch (a) {
                            console.error("Make sure you have included videojs")
                        } else f.play();
                    a.addClass("lg-video-playing")
                } else {
                    a.addClass("lg-video-playing lg-has-video");
                    var g, h, i = function(c, d) {
                        if (a.find(".lg-video").append(b.loadVideo(c, "", !1, b.core.index, d)), d)
                            if (b.core.s.videojs) try {
                                videojs(b.core.$slide.eq(b.core.index).find(".lg-html5").get(0), b.core.s.videojsOptions, function() {
                                    this.play()
                                })
                            } catch (a) {
                                console.error("Make sure you have included videojs")
                            } else b.core.$slide.eq(b.core.index).find(".lg-html5").get(0).play()
                    };
                    b.core.s.dynamic ? (g = b.core.s.dynamicEl[b.core.index].src, h = b.core.s.dynamicEl[b.core.index].html, i(g, h)) : (g = b.core.$items.eq(b.core.index).attr("href") || b.core.$items.eq(b.core.index).attr("data-src"), h = b.core.$items.eq(b.core.index).attr("data-html"), i(g, h));
                    var j = a.find(".lg-object");
                    a.find(".lg-video").append(j), a.find(".lg-video-object").hasClass("lg-html5") || (a.removeClass("lg-complete"), a.find(".lg-video-object").on("load.lg error.lg", function() {
                        a.addClass("lg-complete")
                    }))
                }
        }, f.prototype.destroy = function() {
            this.videoLoaded = !1
        }, a.fn.lightGallery.modules.video = f
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof module && module.exports ? module.exports = b(require("jquery")) : b(a.jQuery)
}(this, function(a) {
    ! function() {
        "use strict";
        var b = function() {
                var a = !1,
                    b = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
                return b && parseInt(b[2], 10) < 54 && (a = !0), a
            },
            c = {
                scale: 1,
                zoom: !0,
                actualSize: !0,
                enableZoomAfter: 300,
                useLeftForZoom: b()
            },
            d = function(b) {
                return this.core = a(b).data("lightGallery"), this.core.s = a.extend({}, c, this.core.s), this.core.s.zoom && this.core.doCss() && (this.init(), this.zoomabletimeout = !1, this.pageX = a(window).width() / 2, this.pageY = a(window).height() / 2 + a(window).scrollTop()), this
            };
        d.prototype.init = function() {
            var b = this,
                c = '<button type="button" aria-label="Zoom in" id="lg-zoom-in" class="lg-icon"></button><button type="button" aria-label="Zoom out" id="lg-zoom-out" class="lg-icon"></button>';
            b.core.s.actualSize && (c += '<button type="button" aria-label="Actual size" id="lg-actual-size" class="lg-icon"></button>'), b.core.s.useLeftForZoom ? b.core.$outer.addClass("lg-use-left-for-zoom") : b.core.$outer.addClass("lg-use-transition-for-zoom"), this.core.$outer.find(".lg-toolbar").append(c), b.core.$el.on("onSlideItemLoad.lg.tm.zoom", function(c, d, e) {
                var f = b.core.s.enableZoomAfter + e;
                a("body").hasClass("lg-from-hash") && e ? f = 0 : a("body").removeClass("lg-from-hash"), b.zoomabletimeout = setTimeout(function() {
                    b.core.$slide.eq(d).addClass("lg-zoomable")
                }, f + 30)
            });
            var d = 1,
                e = function(c) {
                    var d, e, f = b.core.$outer.find(".lg-current .lg-image"),
                        g = (a(window).width() - f.prop("offsetWidth")) / 2,
                        h = (a(window).height() - f.prop("offsetHeight")) / 2 + a(window).scrollTop();
                    d = b.pageX - g, e = b.pageY - h;
                    var i = (c - 1) * d,
                        j = (c - 1) * e;
                    f.css("transform", "scale3d(" + c + ", " + c + ", 1)").attr("data-scale", c), b.core.s.useLeftForZoom ? f.parent().css({
                        left: -i + "px",
                        top: -j + "px"
                    }).attr("data-x", i).attr("data-y", j) : f.parent().css("transform", "translate3d(-" + i + "px, -" + j + "px, 0)").attr("data-x", i).attr("data-y", j)
                },
                f = function() {
                    d > 1 ? b.core.$outer.addClass("lg-zoomed") : b.resetZoom(), d < 1 && (d = 1), e(d)
                },
                g = function(c, e, g, h) {
                    var i, j = e.prop("offsetWidth");
                    i = b.core.s.dynamic ? b.core.s.dynamicEl[g].width || e[0].naturalWidth || j : b.core.$items.eq(g).attr("data-width") || e[0].naturalWidth || j;
                    var k;
                    b.core.$outer.hasClass("lg-zoomed") ? d = 1 : i > j && (k = i / j, d = k || 2), h ? (b.pageX = a(window).width() / 2, b.pageY = a(window).height() / 2 + a(window).scrollTop()) : (b.pageX = c.pageX || c.originalEvent.targetTouches[0].pageX, b.pageY = c.pageY || c.originalEvent.targetTouches[0].pageY), f(), setTimeout(function() {
                        b.core.$outer.removeClass("lg-grabbing").addClass("lg-grab")
                    }, 10)
                },
                h = !1;
            b.core.$el.on("onAferAppendSlide.lg.tm.zoom", function(a, c) {
                var d = b.core.$slide.eq(c).find(".lg-image");
                d.on("dblclick", function(a) {
                    g(a, d, c)
                }), d.on("touchstart", function(a) {
                    h ? (clearTimeout(h), h = null, g(a, d, c)) : h = setTimeout(function() {
                        h = null
                    }, 300), a.preventDefault()
                })
            }), a(window).on("resize.lg.zoom scroll.lg.zoom orientationchange.lg.zoom", function() {
                b.pageX = a(window).width() / 2, b.pageY = a(window).height() / 2 + a(window).scrollTop(), e(d)
            }), a("#lg-zoom-out").on("click.lg", function() {
                b.core.$outer.find(".lg-current .lg-image").length && (d -= b.core.s.scale, f())
            }), a("#lg-zoom-in").on("click.lg", function() {
                b.core.$outer.find(".lg-current .lg-image").length && (d += b.core.s.scale, f())
            }), a("#lg-actual-size").on("click.lg", function(a) {
                g(a, b.core.$slide.eq(b.core.index).find(".lg-image"), b.core.index, !0)
            }), b.core.$el.on("onBeforeSlide.lg.tm", function() {
                d = 1, b.resetZoom()
            }), b.zoomDrag(), b.zoomSwipe()
        }, d.prototype.getCurrentTransform = function(a) {
            if (!a) return 0;
            var b = window.getComputedStyle(a, null),
                c = b.getPropertyValue("-webkit-transform") || b.getPropertyValue("-moz-transform") || b.getPropertyValue("-ms-transform") || b.getPropertyValue("-o-transform") || b.getPropertyValue("transform") || "none";
            return "none" !== c ? c.split("(")[1].split(")")[0].split(",") : 0
        }, d.prototype.getCurrentRotation = function(a) {
            if (!a) return 0;
            var b = this.getCurrentTransform(a);
            return b ? Math.round(Math.atan2(b[1], b[0]) * (180 / Math.PI)) : 0
        }, d.prototype.getModifier = function(a, b, c) {
            var d = a;
            a = Math.abs(a);
            var e = this.getCurrentTransform(c);
            if (!e) return 1;
            var f = 1;
            if ("X" === b) {
                var g = Math.sign(parseFloat(e[0]));
                0 === a || 180 === a ? f = 1 : 90 === a && (f = -90 === d && 1 === g || 90 === d && -1 === g ? -1 : 1), f *= g
            } else {
                var h = Math.sign(parseFloat(e[3]));
                if (0 === a || 180 === a) f = 1;
                else if (90 === a) {
                    var i = parseFloat(e[1]),
                        j = parseFloat(e[2]);
                    f = Math.sign(i * j * d * h)
                }
                f *= h
            }
            return f
        }, d.prototype.getImageSize = function(a, b, c) {
            var d = {
                y: "offsetHeight",
                x: "offsetWidth"
            };
            return 90 === b && (c = "x" === c ? "y" : "x"), a.prop(d[c])
        }, d.prototype.getDragCords = function(a, b) {
            return 90 === b ? {
                x: a.pageY,
                y: a.pageX
            } : {
                x: a.pageX,
                y: a.pageY
            }
        }, d.prototype.getSwipeCords = function(a, b) {
            var c = a.originalEvent.targetTouches[0].pageX,
                d = a.originalEvent.targetTouches[0].pageY;
            return 90 === b ? {
                x: d,
                y: c
            } : {
                x: c,
                y: d
            }
        }, d.prototype.getPossibleDragCords = function(a, b) {
            var c = (this.core.$outer.find(".lg").height() - this.getImageSize(a, b, "y")) / 2,
                d = Math.abs(this.getImageSize(a, b, "y") * Math.abs(a.attr("data-scale")) - this.core.$outer.find(".lg").height() + c),
                e = (this.core.$outer.find(".lg").width() - this.getImageSize(a, b, "x")) / 2,
                f = Math.abs(this.getImageSize(a, b, "x") * Math.abs(a.attr("data-scale")) - this.core.$outer.find(".lg").width() + e);
            return 90 === b ? {
                minY: e,
                maxY: f,
                minX: c,
                maxX: d
            } : {
                minY: c,
                maxY: d,
                minX: e,
                maxX: f
            }
        }, d.prototype.getDragAllowedAxises = function(a, b) {
            var c = this.getImageSize(a, b, "y") * a.attr("data-scale") > this.core.$outer.find(".lg").height(),
                d = this.getImageSize(a, b, "x") * a.attr("data-scale") > this.core.$outer.find(".lg").width();
            return 90 === b ? {
                allowX: c,
                allowY: d
            } : {
                allowX: d,
                allowY: c
            }
        }, d.prototype.resetZoom = function() {
            this.core.$outer.removeClass("lg-zoomed"), this.core.$slide.find(".lg-img-wrap").removeAttr("style data-x data-y"), this.core.$slide.find(".lg-image").removeAttr("style data-scale"), this.pageX = a(window).width() / 2, this.pageY = a(window).height() / 2 + a(window).scrollTop()
        }, d.prototype.zoomSwipe = function() {
            var a, b = this,
                c = {},
                d = {},
                e = !1,
                f = !1,
                g = !1,
                h = 0;
            b.core.$slide.on("touchstart.lg", function(d) {
                if (b.core.$outer.hasClass("lg-zoomed")) {
                    var e = b.core.$slide.eq(b.core.index).find(".lg-object");
                    a = b.core.$slide.eq(b.core.index).find(".lg-img-rotate")[0], h = b.getCurrentRotation(a);
                    var i = b.getDragAllowedAxises(e, Math.abs(h));
                    g = i.allowY, f = i.allowX, (f || g) && (d.preventDefault(), c = b.getSwipeCords(d, Math.abs(h)))
                }
            }), b.core.$slide.on("touchmove.lg", function(i) {
                if (b.core.$outer.hasClass("lg-zoomed")) {
                    var j, k, l = b.core.$slide.eq(b.core.index).find(".lg-img-wrap");
                    i.preventDefault(), e = !0, d = b.getSwipeCords(i, Math.abs(h)), b.core.$outer.addClass("lg-zoom-dragging"), k = g ? -Math.abs(l.attr("data-y")) + (d.y - c.y) * b.getModifier(h, "Y", a) : -Math.abs(l.attr("data-y")), j = f ? -Math.abs(l.attr("data-x")) + (d.x - c.x) * b.getModifier(h, "X", a) : -Math.abs(l.attr("data-x")), (Math.abs(d.x - c.x) > 15 || Math.abs(d.y - c.y) > 15) && (b.core.s.useLeftForZoom ? l.css({
                        left: j + "px",
                        top: k + "px"
                    }) : l.css("transform", "translate3d(" + j + "px, " + k + "px, 0)"))
                }
            }), b.core.$slide.on("touchend.lg", function() {
                b.core.$outer.hasClass("lg-zoomed") && e && (e = !1, b.core.$outer.removeClass("lg-zoom-dragging"), b.touchendZoom(c, d, f, g, h))
            })
        }, d.prototype.zoomDrag = function() {
            var b, c = this,
                d = {},
                e = {},
                f = !1,
                g = !1,
                h = !1,
                i = !1,
                j = 0;
            c.core.$slide.on("mousedown.lg.zoom", function(e) {
                b = c.core.$slide.eq(c.core.index).find(".lg-img-rotate")[0], j = c.getCurrentRotation(b);
                var g = c.core.$slide.eq(c.core.index).find(".lg-object"),
                    k = c.getDragAllowedAxises(g, Math.abs(j));
                i = k.allowY, h = k.allowX, c.core.$outer.hasClass("lg-zoomed") && a(e.target).hasClass("lg-object") && (h || i) && (e.preventDefault(), d = c.getDragCords(e, Math.abs(j)), f = !0, c.core.$outer.scrollLeft += 1, c.core.$outer.scrollLeft -= 1, c.core.$outer.removeClass("lg-grab").addClass("lg-grabbing"))
            }), a(window).on("mousemove.lg.zoom", function(a) {
                if (f) {
                    var k, l, m = c.core.$slide.eq(c.core.index).find(".lg-img-wrap");
                    g = !0, e = c.getDragCords(a, Math.abs(j)), c.core.$outer.addClass("lg-zoom-dragging"), l = i ? -Math.abs(m.attr("data-y")) + (e.y - d.y) * c.getModifier(j, "Y", b) : -Math.abs(m.attr("data-y")), k = h ? -Math.abs(m.attr("data-x")) + (e.x - d.x) * c.getModifier(j, "X", b) : -Math.abs(m.attr("data-x")), c.core.s.useLeftForZoom ? m.css({
                        left: k + "px",
                        top: l + "px"
                    }) : m.css("transform", "translate3d(" + k + "px, " + l + "px, 0)")
                }
            }), a(window).on("mouseup.lg.zoom", function(a) {
                f && (f = !1, c.core.$outer.removeClass("lg-zoom-dragging"), !g || d.x === e.x && d.y === e.y || (e = c.getDragCords(a, Math.abs(j)), c.touchendZoom(d, e, h, i, j)), g = !1), c.core.$outer.removeClass("lg-grabbing").addClass("lg-grab")
            })
        }, d.prototype.touchendZoom = function(a, b, c, d, e) {
            var f = this,
                g = f.core.$slide.eq(f.core.index).find(".lg-img-wrap"),
                h = f.core.$slide.eq(f.core.index).find(".lg-object"),
                i = f.core.$slide.eq(f.core.index).find(".lg-img-rotate")[0],
                j = -Math.abs(g.attr("data-x")) + (b.x - a.x) * f.getModifier(e, "X", i),
                k = -Math.abs(g.attr("data-y")) + (b.y - a.y) * f.getModifier(e, "Y", i),
                l = f.getPossibleDragCords(h, Math.abs(e));
            (Math.abs(b.x - a.x) > 15 || Math.abs(b.y - a.y) > 15) && (d && (k <= -l.maxY ? k = -l.maxY : k >= -l.minY && (k = -l.minY)), c && (j <= -l.maxX ? j = -l.maxX : j >= -l.minX && (j = -l.minX)), d ? g.attr("data-y", Math.abs(k)) : k = -Math.abs(g.attr("data-y")), c ? g.attr("data-x", Math.abs(j)) : j = -Math.abs(g.attr("data-x")), f.core.s.useLeftForZoom ? g.css({
                left: j + "px",
                top: k + "px"
            }) : g.css("transform", "translate3d(" + j + "px, " + k + "px, 0)"))
        }, d.prototype.destroy = function() {
            var b = this;
            b.core.$el.off(".lg.zoom"), a(window).off(".lg.zoom"), b.core.$slide.off(".lg.zoom"), b.core.$el.off(".lg.tm.zoom"), b.resetZoom(), clearTimeout(b.zoomabletimeout), b.zoomabletimeout = !1
        }, a.fn.lightGallery.modules.zoom = d
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(0, function(a) {
    ! function() {
        "use strict";
        var b = {
                hash: !0
            },
            c = function(c) {
                return this.core = a(c).data("lightGallery"), this.core.s = a.extend({}, b, this.core.s), this.core.s.hash && (this.oldHash = window.location.hash, this.init()), this
            };
        c.prototype.init = function() {
            var b, c = this;
            c.core.$el.on("onAfterSlide.lg.tm", function(a, b, d) {
                history.replaceState ? history.replaceState(null, null, window.location.pathname + window.location.search + "#lg=" + c.core.s.galleryId + "&slide=" + d) : window.location.hash = "lg=" + c.core.s.galleryId + "&slide=" + d
            }), a(window).on("hashchange.lg.hash", function() {
                b = window.location.hash;
                var a = parseInt(b.split("&slide=")[1], 10);
                b.indexOf("lg=" + c.core.s.galleryId) > -1 ? c.core.slide(a, !1, !1) : c.core.lGalleryOn && c.core.destroy()
            })
        }, c.prototype.destroy = function() {
            this.core.s.hash && (this.oldHash && this.oldHash.indexOf("lg=" + this.core.s.galleryId) < 0 ? history.replaceState ? history.replaceState(null, null, this.oldHash) : window.location.hash = this.oldHash : history.replaceState ? history.replaceState(null, document.title, window.location.pathname + window.location.search) : window.location.hash = "", this.core.$el.off(".lg.hash"))
        }, a.fn.lightGallery.modules.hash = c
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof module && module.exports ? module.exports = b(require("jquery")) : b(a.jQuery)
}(this, function(a) {
    ! function() {
        "use strict";
        var b = {
                share: !0,
                facebook: !0,
                facebookDropdownText: "Facebook",
                twitter: !0,
                twitterDropdownText: "Twitter",
                googlePlus: !0,
                googlePlusDropdownText: "GooglePlus",
                pinterest: !0,
                pinterestDropdownText: "Pinterest"
            },
            c = function(c) {
                return this.core = a(c).data("lightGallery"), this.core.s = a.extend({}, b, this.core.s), this.core.s.share && this.init(), this
            };
        c.prototype.init = function() {
            var b = this,
                c = '<button type="button" aria-label="Share" id="lg-share" class="lg-icon" aria-haspopup="true" aria-expanded="false"><ul class="lg-dropdown" style="position: absolute;">';
            c += b.core.s.facebook ? '<li><a id="lg-share-facebook" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.facebookDropdownText + "</span></a></li>" : "", c += b.core.s.twitter ? '<li><a id="lg-share-twitter" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.twitterDropdownText + "</span></a></li>" : "", c += b.core.s.googlePlus ? '<li><a id="lg-share-googleplus" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.googlePlusDropdownText + "</span></a></li>" : "", c += b.core.s.pinterest ? '<li><a id="lg-share-pinterest" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.pinterestDropdownText + "</span></a></li>" : "", c += "</ul></button>", this.core.$outer.find(".lg-toolbar").append(c), this.core.$outer.find(".lg").append('<div id="lg-dropdown-overlay"></div>'), a("#lg-share").on("click.lg", function() {
                b.core.$outer.toggleClass("lg-dropdown-active");
                var c = a("#lg-share").attr("aria-expanded");
                a("#lg-share").attr("aria-expanded", "true" !== c)
            }), a("#lg-dropdown-overlay").on("click.lg", function() {
                b.core.$outer.removeClass("lg-dropdown-active"), a("#lg-share").attr("aria-expanded", !1)
            }), b.core.$el.on("onAfterSlide.lg.tm", function(c, d, e) {
                setTimeout(function() {
                    a("#lg-share-facebook").attr("href", "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(b.getSahreProps(e, "facebookShareUrl") || window.location.href)), a("#lg-share-twitter").attr("href", "https://twitter.com/intent/tweet?text=" + b.getSahreProps(e, "tweetText") + "&url=" + encodeURIComponent(b.getSahreProps(e, "twitterShareUrl") || window.location.href)), a("#lg-share-googleplus").attr("href", "https://plus.google.com/share?url=" + encodeURIComponent(b.getSahreProps(e, "googleplusShareUrl") || window.location.href)), a("#lg-share-pinterest").attr("href", "http://www.pinterest.com/pin/create/button/?url=" + encodeURIComponent(b.getSahreProps(e, "pinterestShareUrl") || window.location.href) + "&media=" + encodeURIComponent(b.getSahreProps(e, "src")) + "&description=" + b.getSahreProps(e, "pinterestText"))
                }, 100)
            })
        }, c.prototype.getSahreProps = function(a, b) {
            var c = "";
            if (this.core.s.dynamic) c = this.core.s.dynamicEl[a][b];
            else {
                var d = this.core.$items.eq(a).attr("href"),
                    e = this.core.$items.eq(a).data(b);
                c = "src" === b ? d || e : e
            }
            return c
        }, c.prototype.destroy = function() {}, a.fn.lightGallery.modules.share = c
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof module && module.exports ? module.exports = b(require("jquery")) : b(a.jQuery)
}(this, function(a) {
    ! function() {
        "use strict";
        var b = {
                rotate: !0,
                rotateLeft: !0,
                rotateRight: !0,
                flipHorizontal: !0,
                flipVertical: !0
            },
            c = function(c) {
                return this.core = a(c).data("lightGallery"), this.core.s = a.extend({}, b, this.core.s), this.core.s.rotate && this.core.doCss() && this.init(), this
            };
        c.prototype.buildTemplates = function() {
            var a = "";
            this.core.s.flipVertical && (a += '<button aria-label="Flip vertical" class="lg-flip-ver lg-icon"></button>'), this.core.s.flipHorizontal && (a += '<button aria-label="flip horizontal" class="lg-flip-hor lg-icon"></button>'), this.core.s.rotateLeft && (a += '<button aria-label="Rotate left" class="lg-rotate-left lg-icon"></button>'), this.core.s.rotateRight && (a += '<button aria-label="Rotate right" class="lg-rotate-right lg-icon"></button>'), this.core.$outer.find(".lg-toolbar").append(a)
        }, c.prototype.init = function() {
            var a = this;
            this.buildTemplates(), this.rotateValuesList = {}, this.core.$el.on("onAferAppendSlide.lg.tm.rotate", function(b, c) {
                a.core.$slide.eq(c).find(".lg-img-wrap").wrap('<div class="lg-img-rotate"></div>')
            }), this.core.$outer.find(".lg-rotate-left").on("click.lg", this.rotateLeft.bind(this)), this.core.$outer.find(".lg-rotate-right").on("click.lg", this.rotateRight.bind(this)), this.core.$outer.find(".lg-flip-hor").on("click.lg", this.flipHorizontal.bind(this)), this.core.$outer.find(".lg-flip-ver").on("click.lg", this.flipVertical.bind(this)), this.core.$el.on("onBeforeSlide.lg.tm.rotate", function(b, c, d) {
                a.rotateValuesList[d] || (a.rotateValuesList[d] = {
                    rotate: 0,
                    flipHorizontal: 1,
                    flipVertical: 1
                })
            })
        }, c.prototype.applyStyles = function() {
            this.core.$slide.eq(this.core.index).find(".lg-img-rotate").css("transform", "rotate(" + this.rotateValuesList[this.core.index].rotate + "deg) scale3d(" + this.rotateValuesList[this.core.index].flipHorizontal + ", " + this.rotateValuesList[this.core.index].flipVertical + ", 1)")
        }, c.prototype.getCurrentRotation = function(a) {
            if (!a) return 0;
            var b = window.getComputedStyle(a, null),
                c = b.getPropertyValue("-webkit-transform") || b.getPropertyValue("-moz-transform") || b.getPropertyValue("-ms-transform") || b.getPropertyValue("-o-transform") || b.getPropertyValue("transform") || "none";
            if ("none" !== c) {
                var d = c.split("(")[1].split(")")[0].split(",");
                if (d) {
                    var e = Math.round(Math.atan2(d[1], d[0]) * (180 / Math.PI));
                    return e < 0 ? e + 360 : e
                }
            }
            return 0
        }, c.prototype.rotateLeft = function() {
            this.rotateValuesList[this.core.index].rotate -= 90, this.applyStyles()
        }, c.prototype.rotateRight = function() {
            this.rotateValuesList[this.core.index].rotate += 90, this.applyStyles()
        }, c.prototype.flipHorizontal = function() {
            var a = this.core.$slide.eq(this.core.index).find(".lg-img-rotate")[0],
                b = this.getCurrentRotation(a),
                c = "flipHorizontal";
            90 !== b && 270 !== b || (c = "flipVertical"), this.rotateValuesList[this.core.index][c] *= -1, this.applyStyles()
        }, c.prototype.flipVertical = function() {
            var a = this.core.$slide.eq(this.core.index).find(".lg-img-rotate")[0],
                b = this.getCurrentRotation(a),
                c = "flipVertical";
            90 !== b && 270 !== b || (c = "flipHorizontal"), this.rotateValuesList[this.core.index][c] *= -1, this.applyStyles()
        }, c.prototype.destroy = function() {
            this.core.$el.off(".lg.tm.rotate"), this.rotateValuesList = {}
        }, a.fn.lightGallery.modules.rotate = c
    }()
});;
/*! jQuery UI - v1.13.0 - 2021-10-30
 * http://jqueryui.com
 * Includes: widget.js, jquery-patch.js, keycode.js, widgets/mouse.js, widgets/slider.js
 * Copyright jQuery Foundation and other contributors; Licensed MIT */
! function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
}(function(l) {
    "use strict";
    l.ui = l.ui || {};
    l.ui.version = "1.13.0";
    var n, i = 0,
        o = Array.prototype.hasOwnProperty,
        h = Array.prototype.slice;
    l.cleanData = (n = l.cleanData, function(e) {
        for (var t, i, s = 0; null != (i = e[s]); s++)(t = l._data(i, "events")) && t.remove && l(i).triggerHandler("remove");
        n(e)
    }), l.widget = function(e, i, t) {
        var s, n, a, o = {},
            h = e.split(".")[0],
            r = h + "-" + (e = e.split(".")[1]);
        return t || (t = i, i = l.Widget), Array.isArray(t) && (t = l.extend.apply(null, [{}].concat(t))), l.expr.pseudos[r.toLowerCase()] = function(e) {
            return !!l.data(e, r)
        }, l[h] = l[h] || {}, s = l[h][e], n = l[h][e] = function(e, t) {
            if (!this._createWidget) return new n(e, t);
            arguments.length && this._createWidget(e, t)
        }, l.extend(n, s, {
            version: t.version,
            _proto: l.extend({}, t),
            _childConstructors: []
        }), (a = new i).options = l.widget.extend({}, a.options), l.each(t, function(t, s) {
            function n() {
                return i.prototype[t].apply(this, arguments)
            }

            function a(e) {
                return i.prototype[t].apply(this, e)
            }
            o[t] = "function" == typeof s ? function() {
                var e, t = this._super,
                    i = this._superApply;
                return this._super = n, this._superApply = a, e = s.apply(this, arguments), this._super = t, this._superApply = i, e
            } : s
        }), n.prototype = l.widget.extend(a, {
            widgetEventPrefix: s && a.widgetEventPrefix || e
        }, o, {
            constructor: n,
            namespace: h,
            widgetName: e,
            widgetFullName: r
        }), s ? (l.each(s._childConstructors, function(e, t) {
            var i = t.prototype;
            l.widget(i.namespace + "." + i.widgetName, n, t._proto)
        }), delete s._childConstructors) : i._childConstructors.push(n), l.widget.bridge(e, n), n
    }, l.widget.extend = function(e) {
        for (var t, i, s = h.call(arguments, 1), n = 0, a = s.length; n < a; n++)
            for (t in s[n]) i = s[n][t], o.call(s[n], t) && void 0 !== i && (l.isPlainObject(i) ? e[t] = l.isPlainObject(e[t]) ? l.widget.extend({}, e[t], i) : l.widget.extend({}, i) : e[t] = i);
        return e
    }, l.widget.bridge = function(a, t) {
        var o = t.prototype.widgetFullName || a;
        l.fn[a] = function(i) {
            var e = "string" == typeof i,
                s = h.call(arguments, 1),
                n = this;
            return e ? this.length || "instance" !== i ? this.each(function() {
                var e, t = l.data(this, o);
                return "instance" === i ? (n = t, !1) : t ? "function" != typeof t[i] || "_" === i.charAt(0) ? l.error("no such method '" + i + "' for " + a + " widget instance") : (e = t[i].apply(t, s)) !== t && void 0 !== e ? (n = e && e.jquery ? n.pushStack(e.get()) : e, !1) : void 0 : l.error("cannot call methods on " + a + " prior to initialization; attempted to call method '" + i + "'")
            }) : n = void 0 : (s.length && (i = l.widget.extend.apply(null, [i].concat(s))), this.each(function() {
                var e = l.data(this, o);
                e ? (e.option(i || {}), e._init && e._init()) : l.data(this, o, new t(i, this))
            })), n
        }
    }, l.Widget = function() {}, l.Widget._childConstructors = [], l.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            classes: {},
            disabled: !1,
            create: null
        },
        _createWidget: function(e, t) {
            t = l(t || this.defaultElement || this)[0], this.element = l(t), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = l(), this.hoverable = l(), this.focusable = l(), this.classesElementLookup = {}, t !== this && (l.data(t, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(e) {
                    e.target === t && this.destroy()
                }
            }), this.document = l(t.style ? t.ownerDocument : t.document || t), this.window = l(this.document[0].defaultView || this.document[0].parentWindow)), this.options = l.widget.extend({}, this.options, this._getCreateOptions(), e), this._create(), this.options.disabled && this._setOptionDisabled(this.options.disabled), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: function() {
            return {}
        },
        _getCreateEventData: l.noop,
        _create: l.noop,
        _init: l.noop,
        destroy: function() {
            var i = this;
            this._destroy(), l.each(this.classesElementLookup, function(e, t) {
                i._removeClass(t, e)
            }), this.element.off(this.eventNamespace).removeData(this.widgetFullName), this.widget().off(this.eventNamespace).removeAttr("aria-disabled"), this.bindings.off(this.eventNamespace)
        },
        _destroy: l.noop,
        widget: function() {
            return this.element
        },
        option: function(e, t) {
            var i, s, n, a = e;
            if (0 === arguments.length) return l.widget.extend({}, this.options);
            if ("string" == typeof e)
                if (a = {}, e = (i = e.split(".")).shift(), i.length) {
                    for (s = a[e] = l.widget.extend({}, this.options[e]), n = 0; n < i.length - 1; n++) s[i[n]] = s[i[n]] || {}, s = s[i[n]];
                    if (e = i.pop(), 1 === arguments.length) return void 0 === s[e] ? null : s[e];
                    s[e] = t
                } else {
                    if (1 === arguments.length) return void 0 === this.options[e] ? null : this.options[e];
                    a[e] = t
                } return this._setOptions(a), this
        },
        _setOptions: function(e) {
            for (var t in e) this._setOption(t, e[t]);
            return this
        },
        _setOption: function(e, t) {
            return "classes" === e && this._setOptionClasses(t), this.options[e] = t, "disabled" === e && this._setOptionDisabled(t), this
        },
        _setOptionClasses: function(e) {
            var t, i, s;
            for (t in e) s = this.classesElementLookup[t], e[t] !== this.options.classes[t] && s && s.length && (i = l(s.get()), this._removeClass(s, t), i.addClass(this._classes({
                element: i,
                keys: t,
                classes: e,
                add: !0
            })))
        },
        _setOptionDisabled: function(e) {
            this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!e), e && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"))
        },
        enable: function() {
            return this._setOptions({
                disabled: !1
            })
        },
        disable: function() {
            return this._setOptions({
                disabled: !0
            })
        },
        _classes: function(n) {
            var a = [],
                o = this;

            function e(e, t) {
                for (var i, s = 0; s < e.length; s++) i = o.classesElementLookup[e[s]] || l(), i = n.add ? (n.element.each(function(e, t) {
                    l.map(o.classesElementLookup, function(e) {
                        return e
                    }).some(function(e) {
                        return e.is(t)
                    }) || o._on(l(t), {
                        remove: "_untrackClassesElement"
                    })
                }), l(l.uniqueSort(i.get().concat(n.element.get())))) : l(i.not(n.element).get()), o.classesElementLookup[e[s]] = i, a.push(e[s]), t && n.classes[e[s]] && a.push(n.classes[e[s]])
            }
            return (n = l.extend({
                element: this.element,
                classes: this.options.classes || {}
            }, n)).keys && e(n.keys.match(/\S+/g) || [], !0), n.extra && e(n.extra.match(/\S+/g) || []), a.join(" ")
        },
        _untrackClassesElement: function(i) {
            var s = this;
            l.each(s.classesElementLookup, function(e, t) {
                -1 !== l.inArray(i.target, t) && (s.classesElementLookup[e] = l(t.not(i.target).get()))
            }), this._off(l(i.target))
        },
        _removeClass: function(e, t, i) {
            return this._toggleClass(e, t, i, !1)
        },
        _addClass: function(e, t, i) {
            return this._toggleClass(e, t, i, !0)
        },
        _toggleClass: function(e, t, i, s) {
            var n = "string" == typeof e || null === e,
                i = {
                    extra: n ? t : i,
                    keys: n ? e : t,
                    element: n ? this.element : e,
                    add: s = "boolean" == typeof s ? s : i
                };
            return i.element.toggleClass(this._classes(i), s), this
        },
        _on: function(n, a, e) {
            var o, h = this;
            "boolean" != typeof n && (e = a, a = n, n = !1), e ? (a = o = l(a), this.bindings = this.bindings.add(a)) : (e = a, a = this.element, o = this.widget()), l.each(e, function(e, t) {
                function i() {
                    if (n || !0 !== h.options.disabled && !l(this).hasClass("ui-state-disabled")) return ("string" == typeof t ? h[t] : t).apply(h, arguments)
                }
                "string" != typeof t && (i.guid = t.guid = t.guid || i.guid || l.guid++);
                var s = e.match(/^([\w:-]*)\s*(.*)$/),
                    e = s[1] + h.eventNamespace,
                    s = s[2];
                s ? o.on(e, s, i) : a.on(e, i)
            })
        },
        _off: function(e, t) {
            t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.off(t), this.bindings = l(this.bindings.not(e).get()), this.focusable = l(this.focusable.not(e).get()), this.hoverable = l(this.hoverable.not(e).get())
        },
        _delay: function(e, t) {
            var i = this;
            return setTimeout(function() {
                return ("string" == typeof e ? i[e] : e).apply(i, arguments)
            }, t || 0)
        },
        _hoverable: function(e) {
            this.hoverable = this.hoverable.add(e), this._on(e, {
                mouseenter: function(e) {
                    this._addClass(l(e.currentTarget), null, "ui-state-hover")
                },
                mouseleave: function(e) {
                    this._removeClass(l(e.currentTarget), null, "ui-state-hover")
                }
            })
        },
        _focusable: function(e) {
            this.focusable = this.focusable.add(e), this._on(e, {
                focusin: function(e) {
                    this._addClass(l(e.currentTarget), null, "ui-state-focus")
                },
                focusout: function(e) {
                    this._removeClass(l(e.currentTarget), null, "ui-state-focus")
                }
            })
        },
        _trigger: function(e, t, i) {
            var s, n, a = this.options[e];
            if (i = i || {}, (t = l.Event(t)).type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), t.target = this.element[0], n = t.originalEvent)
                for (s in n) s in t || (t[s] = n[s]);
            return this.element.trigger(t, i), !("function" == typeof a && !1 === a.apply(this.element[0], [t].concat(i)) || t.isDefaultPrevented())
        }
    }, l.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(a, o) {
        l.Widget.prototype["_" + a] = function(t, e, i) {
            var s, n = (e = "string" == typeof e ? {
                effect: e
            } : e) ? !0 !== e && "number" != typeof e && e.effect || o : a;
            "number" == typeof(e = e || {}) ? e = {
                duration: e
            }: !0 === e && (e = {}), s = !l.isEmptyObject(e), e.complete = i, e.delay && t.delay(e.delay), s && l.effects && l.effects.effect[n] ? t[a](e) : n !== a && t[n] ? t[n](e.duration, e.easing, i) : t.queue(function(e) {
                l(this)[a](), i && i.call(t[0]), e()
            })
        }
    });
    var t, s;
    l.widget;
    l.expr.pseudos || (l.expr.pseudos = l.expr[":"]), l.uniqueSort || (l.uniqueSort = l.unique), l.escapeSelector || (t = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, s = function(e, t) {
        return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
    }, l.escapeSelector = function(e) {
        return (e + "").replace(t, s)
    }), l.fn.even && l.fn.odd || l.fn.extend({
        even: function() {
            return this.filter(function(e) {
                return e % 2 == 0
            })
        },
        odd: function() {
            return this.filter(function(e) {
                return e % 2 == 1
            })
        }
    });
    l.ui.keyCode = {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
    }, l.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    var a = !1;
    l(document).on("mouseup", function() {
        a = !1
    });
    l.widget("ui.mouse", {
        version: "1.13.0",
        options: {
            cancel: "input, textarea, button, select, option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var t = this;
            this.element.on("mousedown." + this.widgetName, function(e) {
                return t._mouseDown(e)
            }).on("click." + this.widgetName, function(e) {
                if (!0 === l.data(e.target, t.widgetName + ".preventClickEvent")) return l.removeData(e.target, t.widgetName + ".preventClickEvent"), e.stopImmediatePropagation(), !1
            }), this.started = !1
        },
        _mouseDestroy: function() {
            this.element.off("." + this.widgetName), this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(e) {
            if (!a) {
                this._mouseMoved = !1, this._mouseStarted && this._mouseUp(e), this._mouseDownEvent = e;
                var t = this,
                    i = 1 === e.which,
                    s = !("string" != typeof this.options.cancel || !e.target.nodeName) && l(e.target).closest(this.options.cancel).length;
                return i && !s && this._mouseCapture(e) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    t.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = !1 !== this._mouseStart(e), !this._mouseStarted) ? (e.preventDefault(), !0) : (!0 === l.data(e.target, this.widgetName + ".preventClickEvent") && l.removeData(e.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(e) {
                    return t._mouseMove(e)
                }, this._mouseUpDelegate = function(e) {
                    return t._mouseUp(e)
                }, this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate), e.preventDefault(), a = !0)) : !0
            }
        },
        _mouseMove: function(e) {
            if (this._mouseMoved) {
                if (l.ui.ie && (!document.documentMode || document.documentMode < 9) && !e.button) return this._mouseUp(e);
                if (!e.which)
                    if (e.originalEvent.altKey || e.originalEvent.ctrlKey || e.originalEvent.metaKey || e.originalEvent.shiftKey) this.ignoreMissingWhich = !0;
                    else if (!this.ignoreMissingWhich) return this._mouseUp(e)
            }
            return (e.which || e.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, e), this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted)
        },
        _mouseUp: function(e) {
            this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && l.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer), this.ignoreMissingWhich = !1, a = !1, e.preventDefault()
        },
        _mouseDistanceMet: function(e) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0
        }
    }), l.widget("ui.slider", l.ui.mouse, {
        version: "1.13.0",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            classes: {
                "ui-slider": "ui-corner-all",
                "ui-slider-handle": "ui-corner-all",
                "ui-slider-range": "ui-corner-all ui-widget-header"
            },
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        numPages: 5,
        _create: function() {
            this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this._addClass("ui-slider ui-slider-" + this.orientation, "ui-widget ui-widget-content"), this._refresh(), this._animateOff = !1
        },
        _refresh: function() {
            this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
        },
        _createHandles: function() {
            var e, t = this.options,
                i = this.element.find(".ui-slider-handle"),
                s = [],
                n = t.values && t.values.length || 1;
            for (i.length > n && (i.slice(n).remove(), i = i.slice(0, n)), e = i.length; e < n; e++) s.push("<span tabindex='0'></span>");
            this.handles = i.add(l(s.join("")).appendTo(this.element)), this._addClass(this.handles, "ui-slider-handle", "ui-state-default"), this.handle = this.handles.eq(0), this.handles.each(function(e) {
                l(this).data("ui-slider-handle-index", e).attr("tabIndex", 0)
            })
        },
        _createRange: function() {
            var e = this.options;
            e.range ? (!0 === e.range && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [e.values[0], e.values[0]] : Array.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? (this._removeClass(this.range, "ui-slider-range-min ui-slider-range-max"), this.range.css({
                left: "",
                bottom: ""
            })) : (this.range = l("<div>").appendTo(this.element), this._addClass(this.range, "ui-slider-range")), "min" !== e.range && "max" !== e.range || this._addClass(this.range, "ui-slider-range-" + e.range)) : (this.range && this.range.remove(), this.range = null)
        },
        _setupEvents: function() {
            this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles)
        },
        _destroy: function() {
            this.handles.remove(), this.range && this.range.remove(), this._mouseDestroy()
        },
        _mouseCapture: function(e) {
            var i, s, n, a, t, o, h = this,
                r = this.options;
            return !r.disabled && (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            }, this.elementOffset = this.element.offset(), o = {
                x: e.pageX,
                y: e.pageY
            }, i = this._normValueFromMouse(o), s = this._valueMax() - this._valueMin() + 1, this.handles.each(function(e) {
                var t = Math.abs(i - h.values(e));
                (t < s || s === t && (e === h._lastChangedValue || h.values(e) === r.min)) && (s = t, n = l(this), a = e)
            }), !1 !== this._start(e, a) && (this._mouseSliding = !0, this._handleIndex = a, this._addClass(n, null, "ui-state-active"), n.trigger("focus"), t = n.offset(), o = !l(e.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = o ? {
                left: 0,
                top: 0
            } : {
                left: e.pageX - t.left - n.width() / 2,
                top: e.pageY - t.top - n.height() / 2 - (parseInt(n.css("borderTopWidth"), 10) || 0) - (parseInt(n.css("borderBottomWidth"), 10) || 0) + (parseInt(n.css("marginTop"), 10) || 0)
            }, this.handles.hasClass("ui-state-hover") || this._slide(e, a, i), this._animateOff = !0))
        },
        _mouseStart: function() {
            return !0
        },
        _mouseDrag: function(e) {
            var t = {
                    x: e.pageX,
                    y: e.pageY
                },
                t = this._normValueFromMouse(t);
            return this._slide(e, this._handleIndex, t), !1
        },
        _mouseStop: function(e) {
            return this._removeClass(this.handles, null, "ui-state-active"), this._mouseSliding = !1, this._stop(e, this._handleIndex), this._change(e, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1
        },
        _detectOrientation: function() {
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function(e) {
            var t, e = "horizontal" === this.orientation ? (t = this.elementSize.width, e.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (t = this.elementSize.height, e.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)),
                e = e / t;
            return (e = 1 < e ? 1 : e) < 0 && (e = 0), "vertical" === this.orientation && (e = 1 - e), t = this._valueMax() - this._valueMin(), t = this._valueMin() + e * t, this._trimAlignValue(t)
        },
        _uiHash: function(e, t, i) {
            var s = {
                handle: this.handles[e],
                handleIndex: e,
                value: void 0 !== t ? t : this.value()
            };
            return this._hasMultipleValues() && (s.value = void 0 !== t ? t : this.values(e), s.values = i || this.values()), s
        },
        _hasMultipleValues: function() {
            return this.options.values && this.options.values.length
        },
        _start: function(e, t) {
            return this._trigger("start", e, this._uiHash(t))
        },
        _slide: function(e, t, i) {
            var s, n = this.value(),
                a = this.values();
            this._hasMultipleValues() && (s = this.values(t ? 0 : 1), n = this.values(t), 2 === this.options.values.length && !0 === this.options.range && (i = 0 === t ? Math.min(s, i) : Math.max(s, i)), a[t] = i), i !== n && !1 !== this._trigger("slide", e, this._uiHash(t, i, a)) && (this._hasMultipleValues() ? this.values(t, i) : this.value(i))
        },
        _stop: function(e, t) {
            this._trigger("stop", e, this._uiHash(t))
        },
        _change: function(e, t) {
            this._keySliding || this._mouseSliding || (this._lastChangedValue = t, this._trigger("change", e, this._uiHash(t)))
        },
        value: function(e) {
            return arguments.length ? (this.options.value = this._trimAlignValue(e), this._refreshValue(), void this._change(null, 0)) : this._value()
        },
        values: function(e, t) {
            var i, s, n;
            if (1 < arguments.length) return this.options.values[e] = this._trimAlignValue(t), this._refreshValue(), void this._change(null, e);
            if (!arguments.length) return this._values();
            if (!Array.isArray(e)) return this._hasMultipleValues() ? this._values(e) : this.value();
            for (i = this.options.values, s = e, n = 0; n < i.length; n += 1) i[n] = this._trimAlignValue(s[n]), this._change(null, n);
            this._refreshValue()
        },
        _setOption: function(e, t) {
            var i, s = 0;
            switch ("range" === e && !0 === this.options.range && ("min" === t ? (this.options.value = this._values(0), this.options.values = null) : "max" === t && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), Array.isArray(this.options.values) && (s = this.options.values.length), this._super(e, t), e) {
                case "orientation":
                    this._detectOrientation(), this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-" + this.orientation), this._refreshValue(), this.options.range && this._refreshRange(t), this.handles.css("horizontal" === t ? "bottom" : "left", "");
                    break;
                case "value":
                    this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                    break;
                case "values":
                    for (this._animateOff = !0, this._refreshValue(), i = s - 1; 0 <= i; i--) this._change(null, i);
                    this._animateOff = !1;
                    break;
                case "step":
                case "min":
                case "max":
                    this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;
                    break;
                case "range":
                    this._animateOff = !0, this._refresh(), this._animateOff = !1
            }
        },
        _setOptionDisabled: function(e) {
            this._super(e), this._toggleClass(null, "ui-state-disabled", !!e)
        },
        _value: function() {
            var e = this.options.value;
            return e = this._trimAlignValue(e)
        },
        _values: function(e) {
            var t, i;
            if (arguments.length) return e = this.options.values[e], e = this._trimAlignValue(e);
            if (this._hasMultipleValues()) {
                for (t = this.options.values.slice(), i = 0; i < t.length; i += 1) t[i] = this._trimAlignValue(t[i]);
                return t
            }
            return []
        },
        _trimAlignValue: function(e) {
            if (e <= this._valueMin()) return this._valueMin();
            if (e >= this._valueMax()) return this._valueMax();
            var t = 0 < this.options.step ? this.options.step : 1,
                i = (e - this._valueMin()) % t,
                e = e - i;
            return 2 * Math.abs(i) >= t && (e += 0 < i ? t : -t), parseFloat(e.toFixed(5))
        },
        _calculateNewMax: function() {
            var e = this.options.max,
                t = this._valueMin(),
                i = this.options.step;
            (e = Math.round((e - t) / i) * i + t) > this.options.max && (e -= i), this.max = parseFloat(e.toFixed(this._precision()))
        },
        _precision: function() {
            var e = this._precisionOf(this.options.step);
            return e = null !== this.options.min ? Math.max(e, this._precisionOf(this.options.min)) : e
        },
        _precisionOf: function(e) {
            var t = e.toString(),
                e = t.indexOf(".");
            return -1 === e ? 0 : t.length - e - 1
        },
        _valueMin: function() {
            return this.options.min
        },
        _valueMax: function() {
            return this.max
        },
        _refreshRange: function(e) {
            "vertical" === e && this.range.css({
                width: "",
                left: ""
            }), "horizontal" === e && this.range.css({
                height: "",
                bottom: ""
            })
        },
        _refreshValue: function() {
            var t, i, e, s, n, a = this.options.range,
                o = this.options,
                h = this,
                r = !this._animateOff && o.animate,
                u = {};
            this._hasMultipleValues() ? this.handles.each(function(e) {
                i = (h.values(e) - h._valueMin()) / (h._valueMax() - h._valueMin()) * 100, u["horizontal" === h.orientation ? "left" : "bottom"] = i + "%", l(this).stop(1, 1)[r ? "animate" : "css"](u, o.animate), !0 === h.options.range && ("horizontal" === h.orientation ? (0 === e && h.range.stop(1, 1)[r ? "animate" : "css"]({
                    left: i + "%"
                }, o.animate), 1 === e && h.range[r ? "animate" : "css"]({
                    width: i - t + "%"
                }, {
                    queue: !1,
                    duration: o.animate
                })) : (0 === e && h.range.stop(1, 1)[r ? "animate" : "css"]({
                    bottom: i + "%"
                }, o.animate), 1 === e && h.range[r ? "animate" : "css"]({
                    height: i - t + "%"
                }, {
                    queue: !1,
                    duration: o.animate
                }))), t = i
            }) : (e = this.value(), s = this._valueMin(), n = this._valueMax(), i = n !== s ? (e - s) / (n - s) * 100 : 0, u["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[r ? "animate" : "css"](u, o.animate), "min" === a && "horizontal" === this.orientation && this.range.stop(1, 1)[r ? "animate" : "css"]({
                width: i + "%"
            }, o.animate), "max" === a && "horizontal" === this.orientation && this.range.stop(1, 1)[r ? "animate" : "css"]({
                width: 100 - i + "%"
            }, o.animate), "min" === a && "vertical" === this.orientation && this.range.stop(1, 1)[r ? "animate" : "css"]({
                height: i + "%"
            }, o.animate), "max" === a && "vertical" === this.orientation && this.range.stop(1, 1)[r ? "animate" : "css"]({
                height: 100 - i + "%"
            }, o.animate))
        },
        _handleEvents: {
            keydown: function(e) {
                var t, i, s, n = l(e.target).data("ui-slider-handle-index");
                switch (e.keyCode) {
                    case l.ui.keyCode.HOME:
                    case l.ui.keyCode.END:
                    case l.ui.keyCode.PAGE_UP:
                    case l.ui.keyCode.PAGE_DOWN:
                    case l.ui.keyCode.UP:
                    case l.ui.keyCode.RIGHT:
                    case l.ui.keyCode.DOWN:
                    case l.ui.keyCode.LEFT:
                        if (e.preventDefault(), !this._keySliding && (this._keySliding = !0, this._addClass(l(e.target), null, "ui-state-active"), !1 === this._start(e, n))) return
                }
                switch (s = this.options.step, t = i = this._hasMultipleValues() ? this.values(n) : this.value(), e.keyCode) {
                    case l.ui.keyCode.HOME:
                        i = this._valueMin();
                        break;
                    case l.ui.keyCode.END:
                        i = this._valueMax();
                        break;
                    case l.ui.keyCode.PAGE_UP:
                        i = this._trimAlignValue(t + (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case l.ui.keyCode.PAGE_DOWN:
                        i = this._trimAlignValue(t - (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case l.ui.keyCode.UP:
                    case l.ui.keyCode.RIGHT:
                        if (t === this._valueMax()) return;
                        i = this._trimAlignValue(t + s);
                        break;
                    case l.ui.keyCode.DOWN:
                    case l.ui.keyCode.LEFT:
                        if (t === this._valueMin()) return;
                        i = this._trimAlignValue(t - s)
                }
                this._slide(e, n, i)
            },
            keyup: function(e) {
                var t = l(e.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1, this._stop(e, t), this._change(e, t), this._removeClass(l(e.target), null, "ui-state-active"))
            }
        }
    })
});;
! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).Sweetalert2 = e()
}(this, function() {
    "use strict";

    function r(t) {
        return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
    }

    function s(t, e, n) {
        return e && o(t.prototype, e), n && o(t, n), t
    }

    function c() {
        return (c = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o])
            }
            return t
        }).apply(this, arguments)
    }

    function u(t) {
        return (u = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
    }

    function l(t, e) {
        return (l = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e, t
        })(t, e)
    }

    function d() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
        } catch (t) {
            return !1
        }
    }

    function i(t, e, n) {
        return (i = d() ? Reflect.construct : function(t, e, n) {
            var o = [null];
            o.push.apply(o, e);
            var i = new(Function.bind.apply(t, o));
            return n && l(i, n.prototype), i
        }).apply(null, arguments)
    }

    function p(t, e) {
        return !e || "object" != typeof e && "function" != typeof e ? function(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }(t) : e
    }

    function f(t, e, n) {
        return (f = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(t, e, n) {
            var o = function(t, e) {
                for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = u(t)););
                return t
            }(t, e);
            if (o) {
                var i = Object.getOwnPropertyDescriptor(o, e);
                return i.get ? i.get.call(n) : i.value
            }
        })(t, e, n || t)
    }

    function m(e) {
        return Object.keys(e).map(function(t) {
            return e[t]
        })
    }

    function h(t) {
        return Array.prototype.slice.call(t)
    }

    function g(t, e) {
        var n;
        n = '"'.concat(t, '" is deprecated and will be removed in the next major release. Please use "').concat(e, '" instead.'), -1 === Y.indexOf(n) && (Y.push(n), W(n))
    }

    function v(t) {
        return t && "function" == typeof t.toPromise
    }

    function y(t) {
        return v(t) ? t.toPromise() : Promise.resolve(t)
    }

    function b(t) {
        return t && Promise.resolve(t) === t
    }

    function w(t) {
        return t instanceof Element || "object" === r(e = t) && e.jquery;
        var e
    }

    function t(t) {
        var e = {};
        for (var n in t) e[t[n]] = "swal2-" + t[n];
        return e
    }

    function C() {
        return document.body.querySelector(".".concat($.container))
    }

    function k(t) {
        var e = C();
        return e ? e.querySelector(t) : null
    }

    function e(t) {
        return k(".".concat(t))
    }

    function x() {
        return e($.popup)
    }

    function n() {
        var t = x();
        return h(t.querySelectorAll(".".concat($.icon)))
    }

    function B() {
        var t = n().filter(function(t) {
            return bt(t)
        });
        return t.length ? t[0] : null
    }

    function A() {
        return e($.title)
    }

    function P() {
        return e($.content)
    }

    function E() {
        return e($.image)
    }

    function O() {
        return e($["progress-steps"])
    }

    function S() {
        return e($["validation-message"])
    }

    function T() {
        return k(".".concat($.actions, " .").concat($.confirm))
    }

    function L() {
        return k(".".concat($.actions, " .").concat($.deny))
    }

    function D() {
        return k(".".concat($.loader))
    }

    function I() {
        return k(".".concat($.actions, " .").concat($.cancel))
    }

    function q() {
        return e($.actions)
    }

    function j() {
        return e($.header)
    }

    function M() {
        return e($.footer)
    }

    function V() {
        return e($["timer-progress-bar"])
    }

    function H() {
        return e($.close)
    }

    function R() {
        var t = h(x().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort(function(t, e) {
                return t = parseInt(t.getAttribute("tabindex")), (e = parseInt(e.getAttribute("tabindex"))) < t ? 1 : t < e ? -1 : 0
            }),
            e = h(x().querySelectorAll('\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n')).filter(function(t) {
                return "-1" !== t.getAttribute("tabindex")
            });
        return function(t) {
            for (var e = [], n = 0; n < t.length; n++) - 1 === e.indexOf(t[n]) && e.push(t[n]);
            return e
        }(t.concat(e)).filter(function(t) {
            return bt(t)
        })
    }

    function N() {
        return !X() && !document.body.classList.contains($["no-backdrop"])
    }

    function U(e, t) {
        var n;
        e.textContent = "", t && (n = (new DOMParser).parseFromString(t, "text/html"), h(n.querySelector("head").childNodes).forEach(function(t) {
            e.appendChild(t)
        }), h(n.querySelector("body").childNodes).forEach(function(t) {
            e.appendChild(t)
        }))
    }

    function _(t, e) {
        if (e) {
            for (var n = e.split(/\s+/), o = 0; o < n.length; o++)
                if (!t.classList.contains(n[o])) return;
            return 1
        }
    }

    function F(t, e, n) {
        var o, i;
        if (i = e, h((o = t).classList).forEach(function(t) {
                -1 === m($).indexOf(t) && -1 === m(J).indexOf(t) && -1 === m(i.showClass).indexOf(t) && o.classList.remove(t)
            }), e.customClass && e.customClass[n]) {
            if ("string" != typeof e.customClass[n] && !e.customClass[n].forEach) return W("Invalid type of customClass.".concat(n, '! Expected string or iterable object, got "').concat(r(e.customClass[n]), '"'));
            gt(t, e.customClass[n])
        }
    }
    var z = "SweetAlert2:",
        W = function(t) {
            console.warn("".concat(z, " ").concat(t))
        },
        K = function(t) {
            console.error("".concat(z, " ").concat(t))
        },
        Y = [],
        Z = function(t) {
            return "function" == typeof t ? t() : t
        },
        Q = Object.freeze({
            cancel: "cancel",
            backdrop: "backdrop",
            close: "close",
            esc: "esc",
            timer: "timer"
        }),
        $ = t(["container", "shown", "height-auto", "iosfix", "popup", "modal", "no-backdrop", "no-transition", "toast", "toast-shown", "toast-column", "show", "hide", "close", "title", "header", "content", "html-container", "actions", "confirm", "deny", "cancel", "footer", "icon", "icon-content", "image", "input", "file", "range", "select", "radio", "checkbox", "label", "textarea", "inputerror", "input-label", "validation-message", "progress-steps", "active-progress-step", "progress-step", "progress-step-line", "loader", "loading", "styled", "top", "top-start", "top-end", "top-left", "top-right", "center", "center-start", "center-end", "center-left", "center-right", "bottom", "bottom-start", "bottom-end", "bottom-left", "bottom-right", "grow-row", "grow-column", "grow-fullscreen", "rtl", "timer-progress-bar", "timer-progress-bar-container", "scrollbar-measure", "icon-success", "icon-warning", "icon-info", "icon-question", "icon-error"]),
        J = t(["success", "warning", "info", "question", "error"]),
        X = function() {
            return document.body.classList.contains($["toast-shown"])
        },
        G = {
            previousBodyPadding: null
        };

    function tt(t, e) {
        if (!e) return null;
        switch (e) {
            case "select":
            case "textarea":
            case "file":
                return yt(t, $[e]);
            case "checkbox":
                return t.querySelector(".".concat($.checkbox, " input"));
            case "radio":
                return t.querySelector(".".concat($.radio, " input:checked")) || t.querySelector(".".concat($.radio, " input:first-child"));
            case "range":
                return t.querySelector(".".concat($.range, " input"));
            default:
                return yt(t, $.input)
        }
    }

    function et(t) {
        var e;
        t.focus(), "file" !== t.type && (e = t.value, t.value = "", t.value = e)
    }

    function nt(t, e, n) {
        t && e && ("string" == typeof e && (e = e.split(/\s+/).filter(Boolean)), e.forEach(function(e) {
            t.forEach ? t.forEach(function(t) {
                n ? t.classList.add(e) : t.classList.remove(e)
            }) : n ? t.classList.add(e) : t.classList.remove(e)
        }))
    }

    function ot(t, e, n) {
        n || 0 === parseInt(n) ? t.style[e] = "number" == typeof n ? "".concat(n, "px") : n : t.style.removeProperty(e)
    }

    function it(t, e) {
        var n = 1 < arguments.length && void 0 !== e ? e : "flex";
        t.style.display = n
    }

    function rt(t) {
        t.style.display = "none"
    }

    function at(t, e, n, o) {
        var i = t.querySelector(e);
        i && (i.style[n] = o)
    }

    function st(t, e, n) {
        e ? it(t, n) : rt(t)
    }

    function ct(t) {
        return !!(t.scrollHeight > t.clientHeight)
    }

    function ut(t) {
        var e = window.getComputedStyle(t),
            n = parseFloat(e.getPropertyValue("animation-duration") || "0"),
            o = parseFloat(e.getPropertyValue("transition-duration") || "0");
        return 0 < n || 0 < o
    }

    function lt(t, e) {
        var n = 1 < arguments.length && void 0 !== e && e,
            o = V();
        bt(o) && (n && (o.style.transition = "none", o.style.width = "100%"), setTimeout(function() {
            o.style.transition = "width ".concat(t / 1e3, "s linear"), o.style.width = "0%"
        }, 10))
    }

    function dt() {
        return "undefined" == typeof window || "undefined" == typeof document
    }

    function pt(t) {
        wn.isVisible() && ht !== t.target.value && wn.resetValidationMessage(), ht = t.target.value
    }

    function ft(t, e) {
        t instanceof HTMLElement ? e.appendChild(t) : "object" === r(t) ? kt(t, e) : t && U(e, t)
    }

    function mt(t, e) {
        var n = q(),
            o = D(),
            i = T(),
            r = L(),
            a = I();
        e.showConfirmButton || e.showDenyButton || e.showCancelButton || rt(n), F(n, e, "actions"), At(i, "confirm", e), At(r, "deny", e), At(a, "cancel", e), o.innerHTML = e.loaderHtml, e.buttonsStyling ? function(t, e, n, o) {
            gt([t, e, n], $.styled), o.confirmButtonColor && (t.style.backgroundColor = o.confirmButtonColor);
            o.denyButtonColor && (e.style.backgroundColor = o.denyButtonColor);
            o.cancelButtonColor && (n.style.backgroundColor = o.cancelButtonColor)
        }(i, r, a, e) : vt([i, r, a], $.styled), e.reverseButtons && (n.insertBefore(a, o), n.insertBefore(r, o), n.insertBefore(i, o))
    }
    var ht, gt = function(t, e) {
            nt(t, e, !0)
        },
        vt = function(t, e) {
            nt(t, e, !1)
        },
        yt = function(t, e) {
            for (var n = 0; n < t.childNodes.length; n++)
                if (_(t.childNodes[n], e)) return t.childNodes[n]
        },
        bt = function(t) {
            return !(!t || !(t.offsetWidth || t.offsetHeight || t.getClientRects().length))
        },
        wt = '\n <div aria-labelledby="'.concat($.title, '" aria-describedby="').concat($.content, '" class="').concat($.popup, '" tabindex="-1">\n   <div class="').concat($.header, '">\n     <ul class="').concat($["progress-steps"], '"></ul>\n     <div class="').concat($.icon, " ").concat(J.error, '"></div>\n     <div class="').concat($.icon, " ").concat(J.question, '"></div>\n     <div class="').concat($.icon, " ").concat(J.warning, '"></div>\n     <div class="').concat($.icon, " ").concat(J.info, '"></div>\n     <div class="').concat($.icon, " ").concat(J.success, '"></div>\n     <img class="').concat($.image, '" />\n     <h2 class="').concat($.title, '" id="').concat($.title, '"></h2>\n     <button type="button" class="').concat($.close, '"></button>\n   </div>\n   <div class="').concat($.content, '">\n     <div id="').concat($.content, '" class="').concat($["html-container"], '"></div>\n     <input class="').concat($.input, '" />\n     <input type="file" class="').concat($.file, '" />\n     <div class="').concat($.range, '">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="').concat($.select, '"></select>\n     <div class="').concat($.radio, '"></div>\n     <label for="').concat($.checkbox, '" class="').concat($.checkbox, '">\n       <input type="checkbox" />\n       <span class="').concat($.label, '"></span>\n     </label>\n     <textarea class="').concat($.textarea, '"></textarea>\n     <div class="').concat($["validation-message"], '" id="').concat($["validation-message"], '"></div>\n   </div>\n   <div class="').concat($.actions, '">\n     <div class="').concat($.loader, '"></div>\n     <button type="button" class="').concat($.confirm, '"></button>\n     <button type="button" class="').concat($.deny, '"></button>\n     <button type="button" class="').concat($.cancel, '"></button>\n   </div>\n   <div class="').concat($.footer, '"></div>\n   <div class="').concat($["timer-progress-bar-container"], '">\n     <div class="').concat($["timer-progress-bar"], '"></div>\n   </div>\n </div>\n').replace(/(^|\n)\s*/g, ""),
        Ct = function(t) {
            var e, n, o, i, r, a, s, c, u, l, d, p, f, m, h, g = !!(e = C()) && (e.parentNode.removeChild(e), vt([document.documentElement, document.body], [$["no-backdrop"], $["toast-shown"], $["has-column"]]), !0);
            dt() ? K("SweetAlert2 requires document to initialize") : ((n = document.createElement("div")).className = $.container, g && gt(n, $["no-transition"]), U(n, wt), (o = "string" == typeof(i = t.target) ? document.querySelector(i) : i).appendChild(n), r = t, (a = x()).setAttribute("role", r.toast ? "alert" : "dialog"), a.setAttribute("aria-live", r.toast ? "polite" : "assertive"), r.toast || a.setAttribute("aria-modal", "true"), s = o, "rtl" === window.getComputedStyle(s).direction && gt(C(), $.rtl), c = P(), u = yt(c, $.input), l = yt(c, $.file), d = c.querySelector(".".concat($.range, " input")), p = c.querySelector(".".concat($.range, " output")), f = yt(c, $.select), m = c.querySelector(".".concat($.checkbox, " input")), h = yt(c, $.textarea), u.oninput = pt, l.onchange = pt, f.onchange = pt, m.onchange = pt, h.oninput = pt, d.oninput = function(t) {
                pt(t), p.value = d.value
            }, d.onchange = function(t) {
                pt(t), d.nextSibling.value = d.value
            })
        },
        kt = function(t, e) {
            t.jquery ? xt(e, t) : U(e, t.toString())
        },
        xt = function(t, e) {
            if (t.textContent = "", 0 in e)
                for (var n = 0; n in e; n++) t.appendChild(e[n].cloneNode(!0));
            else t.appendChild(e.cloneNode(!0))
        },
        Bt = function() {
            if (dt()) return !1;
            var t = document.createElement("div"),
                e = {
                    WebkitAnimation: "webkitAnimationEnd",
                    OAnimation: "oAnimationEnd oanimationend",
                    animation: "animationend"
                };
            for (var n in e)
                if (Object.prototype.hasOwnProperty.call(e, n) && void 0 !== t.style[n]) return e[n];
            return !1
        }();

    function At(t, e, n) {
        var o;
        st(t, n["show".concat((o = e).charAt(0).toUpperCase() + o.slice(1), "Button")], "inline-block"), U(t, n["".concat(e, "ButtonText")]), t.setAttribute("aria-label", n["".concat(e, "ButtonAriaLabel")]), t.className = $[e], F(t, n, "".concat(e, "Button")), gt(t, n["".concat(e, "ButtonClass")])
    }

    function Pt(t, e) {
        var n, o, i, r, a, s, c, u, l = C();
        l && (n = l, "string" == typeof(o = e.backdrop) ? n.style.background = o : o || gt([document.documentElement, document.body], $["no-backdrop"]), !e.backdrop && e.allowOutsideClick && W('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`'), i = l, (r = e.position) in $ ? gt(i, $[r]) : (W('The "position" parameter is not valid, defaulting to "center"'), gt(i, $.center)), a = l, !(s = e.grow) || "string" != typeof s || (c = "grow-".concat(s)) in $ && gt(a, $[c]), F(l, e, "container"), (u = document.body.getAttribute("data-swal2-queue-step")) && (l.setAttribute("data-queue-step", u), document.body.removeAttribute("data-swal2-queue-step")))
    }

    function Et(t, e) {
        t.placeholder && !e.inputPlaceholder || (t.placeholder = e.inputPlaceholder)
    }

    function Ot(t, e, n) {
        var o, i;
        n.inputLabel && (t.id = $.input, o = document.createElement("label"), i = $["input-label"], o.setAttribute("for", t.id), o.className = i, o.innerText = n.inputLabel, e.insertAdjacentElement("beforebegin", o))
    }
    var St = {
            promise: new WeakMap,
            innerParams: new WeakMap,
            domCache: new WeakMap
        },
        Tt = ["input", "file", "range", "select", "radio", "checkbox", "textarea"],
        Lt = function(t) {
            if (!jt[t.input]) return K('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'.concat(t.input, '"'));
            var e = qt(t.input),
                n = jt[t.input](e, t);
            it(n), setTimeout(function() {
                et(n)
            })
        },
        Dt = function(t, e) {
            var n = tt(P(), t);
            if (n)
                for (var o in ! function(t) {
                        for (var e = 0; e < t.attributes.length; e++) {
                            var n = t.attributes[e].name; - 1 === ["type", "value", "style"].indexOf(n) && t.removeAttribute(n)
                        }
                    }(n), e) "range" === t && "placeholder" === o || n.setAttribute(o, e[o])
        },
        It = function(t) {
            var e = qt(t.input);
            t.customClass && gt(e, t.customClass.input)
        },
        qt = function(t) {
            var e = $[t] ? $[t] : $.input;
            return yt(P(), e)
        },
        jt = {};
    jt.text = jt.email = jt.password = jt.number = jt.tel = jt.url = function(t, e) {
        return "string" == typeof e.inputValue || "number" == typeof e.inputValue ? t.value = e.inputValue : b(e.inputValue) || W('Unexpected type of inputValue! Expected "string", "number" or "Promise", got "'.concat(r(e.inputValue), '"')), Ot(t, t, e), Et(t, e), t.type = e.input, t
    }, jt.file = function(t, e) {
        return Ot(t, t, e), Et(t, e), t
    }, jt.range = function(t, e) {
        var n = t.querySelector("input"),
            o = t.querySelector("output");
        return n.value = e.inputValue, n.type = e.input, o.value = e.inputValue, Ot(n, t, e), t
    }, jt.select = function(t, e) {
        var n;
        return t.textContent = "", e.inputPlaceholder && (n = document.createElement("option"), U(n, e.inputPlaceholder), n.value = "", n.disabled = !0, n.selected = !0, t.appendChild(n)), Ot(t, t, e), t
    }, jt.radio = function(t) {
        return t.textContent = "", t
    }, jt.checkbox = function(t, e) {
        var n = tt(P(), "checkbox");
        n.value = 1, n.id = $.checkbox, n.checked = Boolean(e.inputValue);
        var o = t.querySelector("span");
        return U(o, e.inputPlaceholder), t
    }, jt.textarea = function(e, t) {
        var n, o;
        return e.value = t.inputValue, Et(e, t), Ot(e, e, t), "MutationObserver" in window && (n = parseInt(window.getComputedStyle(x()).width), o = parseInt(window.getComputedStyle(x()).paddingLeft) + parseInt(window.getComputedStyle(x()).paddingRight), new MutationObserver(function() {
            var t = e.offsetWidth + o;
            x().style.width = n < t ? "".concat(t, "px") : null
        }).observe(e, {
            attributes: !0,
            attributeFilter: ["style"]
        })), e
    };

    function Mt(t, e) {
        var n, o, i, r, a, s = P().querySelector("#".concat($.content));
        e.html ? (ft(e.html, s), it(s, "block")) : e.text ? (s.textContent = e.text, it(s, "block")) : rt(s), n = t, o = e, i = P(), r = St.innerParams.get(n), a = !r || o.input !== r.input, Tt.forEach(function(t) {
            var e = $[t],
                n = yt(i, e);
            Dt(t, o.inputAttributes), n.className = e, a && rt(n)
        }), o.input && (a && Lt(o), It(o)), F(P(), e, "content")
    }

    function Vt() {
        return C() && C().getAttribute("data-queue-step")
    }

    function Ht(t, c) {
        var u = O();
        if (!c.progressSteps || 0 === c.progressSteps.length) return rt(u), 0;
        it(u), u.textContent = "";
        var l = parseInt(void 0 === c.currentProgressStep ? Vt() : c.currentProgressStep);
        l >= c.progressSteps.length && W("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"), c.progressSteps.forEach(function(t, e) {
            var n, o, i, r, a, s = (n = t, o = document.createElement("li"), gt(o, $["progress-step"]), U(o, n), o);
            u.appendChild(s), e === l && gt(s, $["active-progress-step"]), e !== c.progressSteps.length - 1 && (r = c, a = document.createElement("li"), gt(a, $["progress-step-line"]), r.progressStepsDistance && (a.style.width = r.progressStepsDistance), i = a, u.appendChild(i))
        })
    }

    function Rt(t, e) {
        var n, o, i, r, a, s, c, u, l = j();
        F(l, e, "header"), Ht(0, e), n = t, o = e, (r = St.innerParams.get(n)) && o.icon === r.icon && B() ? Ft(B(), o) : (_t(), o.icon && (-1 !== Object.keys(J).indexOf(o.icon) ? (i = k(".".concat($.icon, ".").concat(J[o.icon])), it(i), Wt(i, o), Ft(i, o), gt(i, o.showClass.icon)) : K('Unknown icon! Expected "success", "error", "warning", "info" or "question", got "'.concat(o.icon, '"')))),
            function(t) {
                var e = E();
                if (!t.imageUrl) return rt(e);
                it(e, ""), e.setAttribute("src", t.imageUrl), e.setAttribute("alt", t.imageAlt), ot(e, "width", t.imageWidth), ot(e, "height", t.imageHeight), e.className = $.image, F(e, t, "image")
            }(e), a = e, s = A(), st(s, a.title || a.titleText), a.title && ft(a.title, s), a.titleText && (s.innerText = a.titleText), F(s, a, "title"), c = e, u = H(), U(u, c.closeButtonHtml), F(u, c, "closeButton"), st(u, c.showCloseButton), u.setAttribute("aria-label", c.closeButtonAriaLabel)
    }

    function Nt(t, e) {
        var n, o, i, r;
        n = e, o = x(), ot(o, "width", n.width), ot(o, "padding", n.padding), n.background && (o.style.background = n.background), Qt(o, n), Pt(0, e), Rt(t, e), Mt(t, e), mt(0, e), i = e, r = M(), st(r, i.footer), i.footer && ft(i.footer, r), F(r, i, "footer"), "function" == typeof e.didRender ? e.didRender(x()) : "function" == typeof e.onRender && e.onRender(x())
    }

    function Ut() {
        return T() && T().click()
    }
    var _t = function() {
            for (var t = n(), e = 0; e < t.length; e++) rt(t[e])
        },
        Ft = function(t, e) {
            Kt(t, e), zt(), F(t, e, "icon")
        },
        zt = function() {
            for (var t = x(), e = window.getComputedStyle(t).getPropertyValue("background-color"), n = t.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix"), o = 0; o < n.length; o++) n[o].style.backgroundColor = e
        },
        Wt = function(t, e) {
            t.textContent = "", e.iconHtml ? U(t, Yt(e.iconHtml)) : "success" === e.icon ? U(t, '\n      <div class="swal2-success-circular-line-left"></div>\n      <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n      <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n      <div class="swal2-success-circular-line-right"></div>\n    ') : "error" === e.icon ? U(t, '\n      <span class="swal2-x-mark">\n        <span class="swal2-x-mark-line-left"></span>\n        <span class="swal2-x-mark-line-right"></span>\n      </span>\n    ') : U(t, Yt({
                question: "?",
                warning: "!",
                info: "i"
            } [e.icon]))
        },
        Kt = function(t, e) {
            if (e.iconColor) {
                t.style.color = e.iconColor, t.style.borderColor = e.iconColor;
                for (var n = 0, o = [".swal2-success-line-tip", ".swal2-success-line-long", ".swal2-x-mark-line-left", ".swal2-x-mark-line-right"]; n < o.length; n++) {
                    at(t, o[n], "backgroundColor", e.iconColor)
                }
                at(t, ".swal2-success-ring", "borderColor", e.iconColor)
            }
        },
        Yt = function(t) {
            return '<div class="'.concat($["icon-content"], '">').concat(t, "</div>")
        },
        Zt = [],
        Qt = function(t, e) {
            t.className = "".concat($.popup, " ").concat(bt(t) ? e.showClass.popup : ""), e.toast ? (gt([document.documentElement, document.body], $["toast-shown"]), gt(t, $.toast)) : gt(t, $.modal), F(t, e, "popup"), "string" == typeof e.customClass && gt(t, e.customClass), e.icon && gt(t, $["icon-".concat(e.icon)])
        };

    function $t() {
        var t = x();
        t || wn.fire(), t = x();
        var e = q(),
            n = T(),
            o = D();
        it(e), rt(n), gt([t, e], $.loading), it(o), t.setAttribute("data-loading", !0), t.setAttribute("aria-busy", !0), t.focus()
    }

    function Jt() {
        return new Promise(function(t) {
            var e = window.scrollX,
                n = window.scrollY;
            oe.restoreFocusTimeout = setTimeout(function() {
                oe.previousActiveElement && oe.previousActiveElement.focus ? (oe.previousActiveElement.focus(), oe.previousActiveElement = null) : document.body && document.body.focus(), t()
            }, 100), void 0 !== e && void 0 !== n && window.scrollTo(e, n)
        })
    }

    function Xt() {
        if (oe.timeout) return function() {
            var t = V(),
                e = parseInt(window.getComputedStyle(t).width);
            t.style.removeProperty("transition"), t.style.width = "100%";
            var n = parseInt(window.getComputedStyle(t).width),
                o = parseInt(e / n * 100);
            t.style.removeProperty("transition"), t.style.width = "".concat(o, "%")
        }(), oe.timeout.stop()
    }

    function Gt() {
        if (oe.timeout) {
            var t = oe.timeout.start();
            return lt(t), t
        }
    }

    function te(t) {
        return Object.prototype.hasOwnProperty.call(ie, t)
    }

    function ee(t) {
        return ae[t]
    }

    function ne(t) {
        for (var e in t) te(i = e) || W('Unknown parameter "'.concat(i, '"')), t.toast && (o = e, -1 !== se.indexOf(o) && W('The parameter "'.concat(o, '" is incompatible with toasts'))), ee(n = e) && g(n, ee(n));
        var n, o, i
    }
    var oe = {},
        ie = {
            title: "",
            titleText: "",
            text: "",
            html: "",
            footer: "",
            icon: void 0,
            iconColor: void 0,
            iconHtml: void 0,
            toast: !1,
            animation: !0,
            showClass: {
                popup: "swal2-show",
                backdrop: "swal2-backdrop-show",
                icon: "swal2-icon-show"
            },
            hideClass: {
                popup: "swal2-hide",
                backdrop: "swal2-backdrop-hide",
                icon: "swal2-icon-hide"
            },
            customClass: void 0,
            target: "body",
            backdrop: !0,
            heightAuto: !0,
            allowOutsideClick: !0,
            allowEscapeKey: !0,
            allowEnterKey: !0,
            stopKeydownPropagation: !0,
            keydownListenerCapture: !1,
            showConfirmButton: !0,
            showDenyButton: !1,
            showCancelButton: !1,
            preConfirm: void 0,
            confirmButtonText: "OK",
            confirmButtonAriaLabel: "",
            confirmButtonColor: void 0,
            denyButtonText: "No",
            denyButtonAriaLabel: "",
            denyButtonColor: void 0,
            cancelButtonText: "Cancel",
            cancelButtonAriaLabel: "",
            cancelButtonColor: void 0,
            buttonsStyling: !0,
            reverseButtons: !1,
            focusConfirm: !0,
            focusDeny: !1,
            focusCancel: !1,
            showCloseButton: !1,
            closeButtonHtml: "&times;",
            closeButtonAriaLabel: "Close this dialog",
            loaderHtml: "",
            showLoaderOnConfirm: !1,
            imageUrl: void 0,
            imageWidth: void 0,
            imageHeight: void 0,
            imageAlt: "",
            timer: void 0,
            timerProgressBar: !1,
            width: void 0,
            padding: void 0,
            background: void 0,
            input: void 0,
            inputPlaceholder: "",
            inputLabel: "",
            inputValue: "",
            inputOptions: {},
            inputAutoTrim: !0,
            inputAttributes: {},
            inputValidator: void 0,
            returnInputValueOnDeny: !1,
            validationMessage: void 0,
            grow: !1,
            position: "center",
            progressSteps: [],
            currentProgressStep: void 0,
            progressStepsDistance: void 0,
            onBeforeOpen: void 0,
            onOpen: void 0,
            willOpen: void 0,
            didOpen: void 0,
            onRender: void 0,
            didRender: void 0,
            onClose: void 0,
            onAfterClose: void 0,
            willClose: void 0,
            didClose: void 0,
            onDestroy: void 0,
            didDestroy: void 0,
            scrollbarPadding: !0
        },
        re = ["allowEscapeKey", "allowOutsideClick", "background", "buttonsStyling", "cancelButtonAriaLabel", "cancelButtonColor", "cancelButtonText", "closeButtonAriaLabel", "closeButtonHtml", "confirmButtonAriaLabel", "confirmButtonColor", "confirmButtonText", "currentProgressStep", "customClass", "denyButtonAriaLabel", "denyButtonColor", "denyButtonText", "didClose", "didDestroy", "footer", "hideClass", "html", "icon", "iconColor", "imageAlt", "imageHeight", "imageUrl", "imageWidth", "onAfterClose", "onClose", "onDestroy", "progressSteps", "reverseButtons", "showCancelButton", "showCloseButton", "showConfirmButton", "showDenyButton", "text", "title", "titleText", "willClose"],
        ae = {
            animation: 'showClass" and "hideClass',
            onBeforeOpen: "willOpen",
            onOpen: "didOpen",
            onRender: "didRender",
            onClose: "willClose",
            onAfterClose: "didClose",
            onDestroy: "didDestroy"
        },
        se = ["allowOutsideClick", "allowEnterKey", "backdrop", "focusConfirm", "focusDeny", "focusCancel", "heightAuto", "keydownListenerCapture"],
        ce = Object.freeze({
            isValidParameter: te,
            isUpdatableParameter: function(t) {
                return -1 !== re.indexOf(t)
            },
            isDeprecatedParameter: ee,
            argsToParams: function(o) {
                var i = {};
                return "object" !== r(o[0]) || w(o[0]) ? ["title", "html", "icon"].forEach(function(t, e) {
                    var n = o[e];
                    "string" == typeof n || w(n) ? i[t] = n : void 0 !== n && K("Unexpected type of ".concat(t, '! Expected "string" or "Element", got ').concat(r(n)))
                }) : c(i, o[0]), i
            },
            isVisible: function() {
                return bt(x())
            },
            clickConfirm: Ut,
            clickDeny: function() {
                return L() && L().click()
            },
            clickCancel: function() {
                return I() && I().click()
            },
            getContainer: C,
            getPopup: x,
            getTitle: A,
            getContent: P,
            getHtmlContainer: function() {
                return e($["html-container"])
            },
            getImage: E,
            getIcon: B,
            getIcons: n,
            getInputLabel: function() {
                return e($["input-label"])
            },
            getCloseButton: H,
            getActions: q,
            getConfirmButton: T,
            getDenyButton: L,
            getCancelButton: I,
            getHeader: j,
            getFooter: M,
            getTimerProgressBar: V,
            getFocusableElements: R,
            getValidationMessage: S,
            isLoading: function() {
                return x().hasAttribute("data-loading")
            },
            fire: function() {
                for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                return i(this, e)
            },
            mixin: function(r) {
                return function(t) {
                    ! function(t, e) {
                        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                        t.prototype = Object.create(e && e.prototype, {
                            constructor: {
                                value: t,
                                writable: !0,
                                configurable: !0
                            }
                        }), e && l(t, e)
                    }(i, t);
                    var n, o, e = (n = i, o = d(), function() {
                        var t, e = u(n);
                        return p(this, o ? (t = u(this).constructor, Reflect.construct(e, arguments, t)) : e.apply(this, arguments))
                    });

                    function i() {
                        return a(this, i), e.apply(this, arguments)
                    }
                    return s(i, [{
                        key: "_main",
                        value: function(t) {
                            return f(u(i.prototype), "_main", this).call(this, c({}, r, t))
                        }
                    }]), i
                }(this)
            },
            queue: function(t) {
                var r = this;
                Zt = t;

                function a(t, e) {
                    Zt = [], t(e)
                }
                var s = [];
                return new Promise(function(i) {
                    ! function e(n, o) {
                        n < Zt.length ? (document.body.setAttribute("data-swal2-queue-step", n), r.fire(Zt[n]).then(function(t) {
                            void 0 !== t.value ? (s.push(t.value), e(n + 1, o)) : a(i, {
                                dismiss: t.dismiss
                            })
                        })) : a(i, {
                            value: s
                        })
                    }(0)
                })
            },
            getQueueStep: Vt,
            insertQueueStep: function(t, e) {
                return e && e < Zt.length ? Zt.splice(e, 0, t) : Zt.push(t)
            },
            deleteQueueStep: function(t) {
                void 0 !== Zt[t] && Zt.splice(t, 1)
            },
            showLoading: $t,
            enableLoading: $t,
            getTimerLeft: function() {
                return oe.timeout && oe.timeout.getTimerLeft()
            },
            stopTimer: Xt,
            resumeTimer: Gt,
            toggleTimer: function() {
                var t = oe.timeout;
                return t && (t.running ? Xt : Gt)()
            },
            increaseTimer: function(t) {
                if (oe.timeout) {
                    var e = oe.timeout.increase(t);
                    return lt(e, !0), e
                }
            },
            isTimerRunning: function() {
                return oe.timeout && oe.timeout.isRunning()
            }
        });

    function ue() {
        var t, e = St.innerParams.get(this);
        e && (t = St.domCache.get(this), rt(t.loader), e.showConfirmButton ? it(t.confirmButton, "inline-block") : e.showConfirmButton || e.showCancelButton || rt(t.actions), vt([t.popup, t.actions], $.loading), t.popup.removeAttribute("aria-busy"), t.popup.removeAttribute("data-loading"), t.confirmButton.disabled = !1, t.denyButton.disabled = !1, t.cancelButton.disabled = !1)
    }

    function le() {
        null === G.previousBodyPadding && document.body.scrollHeight > window.innerHeight && (G.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")), document.body.style.paddingRight = "".concat(G.previousBodyPadding + function() {
            var t = document.createElement("div");
            t.className = $["scrollbar-measure"], document.body.appendChild(t);
            var e = t.getBoundingClientRect().width - t.clientWidth;
            return document.body.removeChild(t), e
        }(), "px"))
    }

    function de() {
        return !!window.MSInputMethodContext && !!document.documentMode
    }

    function pe() {
        var t = C(),
            e = x();
        t.style.removeProperty("align-items"), e.offsetTop < 0 && (t.style.alignItems = "flex-start")
    }
    var fe = function() {
            navigator.userAgent.match(/(CriOS|FxiOS|EdgiOS|YaBrowser|UCBrowser)/i) || x().scrollHeight > window.innerHeight - 44 && (C().style.paddingBottom = "".concat(44, "px"))
        },
        me = function() {
            var e, t = C();
            t.ontouchstart = function(t) {
                e = he(t)
            }, t.ontouchmove = function(t) {
                e && (t.preventDefault(), t.stopPropagation())
            }
        },
        he = function(t) {
            var e = t.target,
                n = C();
            return (!t.touches || !t.touches.length || "stylus" !== t.touches[0].touchType) && (e === n || !(ct(n) || "INPUT" === e.tagName || ct(P()) && P().contains(e)))
        },
        ge = {
            swalPromiseResolve: new WeakMap
        };

    function ve(t, e, n, o) {
        var i;
        n ? Ce(t, o) : (Jt().then(function() {
            return Ce(t, o)
        }), oe.keydownTarget.removeEventListener("keydown", oe.keydownHandler, {
            capture: oe.keydownListenerCapture
        }), oe.keydownHandlerAdded = !1), e.parentNode && !document.body.getAttribute("data-swal2-queue-step") && e.parentNode.removeChild(e), N() && (null !== G.previousBodyPadding && (document.body.style.paddingRight = "".concat(G.previousBodyPadding, "px"), G.previousBodyPadding = null), _(document.body, $.iosfix) && (i = parseInt(document.body.style.top, 10), vt(document.body, $.iosfix), document.body.style.top = "", document.body.scrollTop = -1 * i), "undefined" != typeof window && de() && window.removeEventListener("resize", pe), h(document.body.children).forEach(function(t) {
            t.hasAttribute("data-previous-aria-hidden") ? (t.setAttribute("aria-hidden", t.getAttribute("data-previous-aria-hidden")), t.removeAttribute("data-previous-aria-hidden")) : t.removeAttribute("aria-hidden")
        })), vt([document.documentElement, document.body], [$.shown, $["height-auto"], $["no-backdrop"], $["toast-shown"], $["toast-column"]])
    }

    function ye(t) {
        var e, n, o, i = x();
        i && (t = function(t) {
            return void 0 !== t ? c({
                isConfirmed: !1,
                isDenied: !1,
                isDismissed: !1
            }, t) : {
                isConfirmed: !1,
                isDenied: !1,
                isDismissed: !0
            }
        }(t), (e = St.innerParams.get(this)) && !_(i, e.hideClass.popup) && (n = ge.swalPromiseResolve.get(this), vt(i, e.showClass.popup), gt(i, e.hideClass.popup), o = C(), vt(o, e.showClass.backdrop), gt(o, e.hideClass.backdrop), function(t, e, n) {
            var o = C(),
                i = Bt && ut(e),
                r = n.onClose,
                a = n.onAfterClose,
                s = n.willClose,
                c = n.didClose;
            if (be(e, s, r), i) {
                we(t, e, o, c || a)
            } else {
                ve(t, o, X(), c || a)
            }
        }(this, i, e), n(t)))
    }
    var be = function(t, e, n) {
            null !== e && "function" == typeof e ? e(t) : null !== n && "function" == typeof n && n(t)
        },
        we = function(t, e, n, o) {
            oe.swalCloseEventFinishedCallback = ve.bind(null, t, n, X(), o), e.addEventListener(Bt, function(t) {
                t.target === e && (oe.swalCloseEventFinishedCallback(), delete oe.swalCloseEventFinishedCallback)
            })
        },
        Ce = function(t, e) {
            setTimeout(function() {
                "function" == typeof e && e(), t._destroy()
            })
        };

    function ke(t, e, n) {
        var o = St.domCache.get(t);
        e.forEach(function(t) {
            o[t].disabled = n
        })
    }

    function xe(t, e) {
        if (!t) return !1;
        if ("radio" === t.type)
            for (var n = t.parentNode.parentNode.querySelectorAll("input"), o = 0; o < n.length; o++) n[o].disabled = e;
        else t.disabled = e
    }
    var Be = function() {
            function n(t, e) {
                a(this, n), this.callback = t, this.remaining = e, this.running = !1, this.start()
            }
            return s(n, [{
                key: "start",
                value: function() {
                    return this.running || (this.running = !0, this.started = new Date, this.id = setTimeout(this.callback, this.remaining)), this.remaining
                }
            }, {
                key: "stop",
                value: function() {
                    return this.running && (this.running = !1, clearTimeout(this.id), this.remaining -= new Date - this.started), this.remaining
                }
            }, {
                key: "increase",
                value: function(t) {
                    var e = this.running;
                    return e && this.stop(), this.remaining += t, e && this.start(), this.remaining
                }
            }, {
                key: "getTimerLeft",
                value: function() {
                    return this.running && (this.stop(), this.start()), this.remaining
                }
            }, {
                key: "isRunning",
                value: function() {
                    return this.running
                }
            }]), n
        }(),
        Ae = {
            email: function(t, e) {
                return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(t) ? Promise.resolve() : Promise.resolve(e || "Invalid email address")
            },
            url: function(t, e) {
                return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(t) ? Promise.resolve() : Promise.resolve(e || "Invalid URL")
            }
        };

    function Pe(t) {
        var e, n;
        (e = t).inputValidator || Object.keys(Ae).forEach(function(t) {
            e.input === t && (e.inputValidator = Ae[t])
        }), t.showLoaderOnConfirm && !t.preConfirm && W("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request"), t.animation = Z(t.animation), (n = t).target && ("string" != typeof n.target || document.querySelector(n.target)) && ("string" == typeof n.target || n.target.appendChild) || (W('Target parameter is not valid, defaulting to "body"'), n.target = "body"), "string" == typeof t.title && (t.title = t.title.split("\n").join("<br />")), Ct(t)
    }

    function Ee(t) {
        var e = C(),
            n = x();
        "function" == typeof t.willOpen ? t.willOpen(n) : "function" == typeof t.onBeforeOpen && t.onBeforeOpen(n);
        var o = window.getComputedStyle(document.body).overflowY;
        Ne(e, n, t), setTimeout(function() {
            He(e, n)
        }, 10), N() && (Re(e, t.scrollbarPadding, o), h(document.body.children).forEach(function(t) {
            t === C() || function(t, e) {
                if ("function" == typeof t.contains) return t.contains(e)
            }(t, C()) || (t.hasAttribute("aria-hidden") && t.setAttribute("data-previous-aria-hidden", t.getAttribute("aria-hidden")), t.setAttribute("aria-hidden", "true"))
        })), X() || oe.previousActiveElement || (oe.previousActiveElement = document.activeElement), Ve(n, t), vt(e, $["no-transition"])
    }

    function Oe(t) {
        var e, n = x();
        t.target === n && (e = C(), n.removeEventListener(Bt, Oe), e.style.overflowY = "auto")
    }

    function Se(t, e) {
        "select" === e.input || "radio" === e.input ? ze(t, e) : -1 !== ["text", "email", "number", "tel", "textarea"].indexOf(e.input) && (v(e.inputValue) || b(e.inputValue)) && We(t, e)
    }

    function Te(t, e) {
        t.disableButtons(), e.input ? Ze(t, e, "confirm") : Je(t, e, !0)
    }

    function Le(t, e) {
        t.disableButtons(), e.returnInputValueOnDeny ? Ze(t, e, "deny") : $e(t, !1)
    }

    function De(t, e) {
        t.disableButtons(), e(Q.cancel)
    }

    function Ie(t, e) {
        t.closePopup({
            isConfirmed: !0,
            value: e
        })
    }

    function qe(e, t, n, o) {
        t.keydownTarget && t.keydownHandlerAdded && (t.keydownTarget.removeEventListener("keydown", t.keydownHandler, {
            capture: t.keydownListenerCapture
        }), t.keydownHandlerAdded = !1), n.toast || (t.keydownHandler = function(t) {
            return en(e, t, o)
        }, t.keydownTarget = n.keydownListenerCapture ? window : x(), t.keydownListenerCapture = n.keydownListenerCapture, t.keydownTarget.addEventListener("keydown", t.keydownHandler, {
            capture: t.keydownListenerCapture
        }), t.keydownHandlerAdded = !0)
    }

    function je(t, e, n) {
        var o = R(),
            i = 0;
        if (i < o.length) return (e += n) === o.length ? e = 0 : -1 === e && (e = o.length - 1), o[e].focus();
        x().focus()
    }

    function Me(t, e, n) {
        St.innerParams.get(t).toast ? sn(t, e, n) : (un(e), ln(e), dn(t, e, n))
    }
    var Ve = function(t, e) {
            "function" == typeof e.didOpen ? setTimeout(function() {
                return e.didOpen(t)
            }) : "function" == typeof e.onOpen && setTimeout(function() {
                return e.onOpen(t)
            })
        },
        He = function(t, e) {
            Bt && ut(e) ? (t.style.overflowY = "hidden", e.addEventListener(Bt, Oe)) : t.style.overflowY = "auto"
        },
        Re = function(t, e, n) {
            var o;
            (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream || "MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints) && !_(document.body, $.iosfix) && (o = document.body.scrollTop, document.body.style.top = "".concat(-1 * o, "px"), gt(document.body, $.iosfix), me(), fe()), "undefined" != typeof window && de() && (pe(), window.addEventListener("resize", pe)), e && "hidden" !== n && le(), setTimeout(function() {
                t.scrollTop = 0
            })
        },
        Ne = function(t, e, n) {
            gt(t, n.showClass.backdrop), e.style.setProperty("opacity", "0", "important"), it(e), setTimeout(function() {
                gt(e, n.showClass.popup), e.style.removeProperty("opacity")
            }, 10), gt([document.documentElement, document.body], $.shown), n.heightAuto && n.backdrop && !n.toast && gt([document.documentElement, document.body], $["height-auto"])
        },
        Ue = function(t) {
            return t.checked ? 1 : 0
        },
        _e = function(t) {
            return t.checked ? t.value : null
        },
        Fe = function(t) {
            return t.files.length ? null !== t.getAttribute("multiple") ? t.files : t.files[0] : null
        },
        ze = function(e, n) {
            function o(t) {
                return Ke[n.input](i, Ye(t), n)
            }
            var i = P();
            v(n.inputOptions) || b(n.inputOptions) ? ($t(), y(n.inputOptions).then(function(t) {
                e.hideLoading(), o(t)
            })) : "object" === r(n.inputOptions) ? o(n.inputOptions) : K("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(r(n.inputOptions)))
        },
        We = function(e, n) {
            var o = e.getInput();
            rt(o), y(n.inputValue).then(function(t) {
                o.value = "number" === n.input ? parseFloat(t) || 0 : "".concat(t), it(o), o.focus(), e.hideLoading()
            }).catch(function(t) {
                K("Error in inputValue promise: ".concat(t)), o.value = "", it(o), o.focus(), e.hideLoading()
            })
        },
        Ke = {
            select: function(t, e, i) {
                function r(t, e, n) {
                    var o = document.createElement("option");
                    o.value = n, U(o, e), i.inputValue.toString() === n.toString() && (o.selected = !0), t.appendChild(o)
                }
                var a = yt(t, $.select);
                e.forEach(function(t) {
                    var e, n = t[0],
                        o = t[1];
                    Array.isArray(o) ? ((e = document.createElement("optgroup")).label = n, e.disabled = !1, a.appendChild(e), o.forEach(function(t) {
                        return r(e, t[1], t[0])
                    })) : r(a, o, n)
                }), a.focus()
            },
            radio: function(t, e, a) {
                var s = yt(t, $.radio);
                e.forEach(function(t) {
                    var e = t[0],
                        n = t[1],
                        o = document.createElement("input"),
                        i = document.createElement("label");
                    o.type = "radio", o.name = $.radio, o.value = e, a.inputValue.toString() === e.toString() && (o.checked = !0);
                    var r = document.createElement("span");
                    U(r, n), r.className = $.label, i.appendChild(o), i.appendChild(r), s.appendChild(i)
                });
                var n = s.querySelectorAll("input");
                n.length && n[0].focus()
            }
        },
        Ye = function o(n) {
            var i = [];
            return "undefined" != typeof Map && n instanceof Map ? n.forEach(function(t, e) {
                var n = t;
                "object" === r(n) && (n = o(n)), i.push([e, n])
            }) : Object.keys(n).forEach(function(t) {
                var e = n[t];
                "object" === r(e) && (e = o(e)), i.push([t, e])
            }), i
        },
        Ze = function(t, e, n) {
            var o = function(t, e) {
                var n = t.getInput();
                if (!n) return null;
                switch (e.input) {
                    case "checkbox":
                        return Ue(n);
                    case "radio":
                        return _e(n);
                    case "file":
                        return Fe(n);
                    default:
                        return e.inputAutoTrim ? n.value.trim() : n.value
                }
            }(t, e);
            e.inputValidator ? Qe(t, e, o) : t.getInput().checkValidity() ? "deny" === n ? $e(t, o) : Je(t, e, o) : (t.enableButtons(), t.showValidationMessage(e.validationMessage))
        },
        Qe = function(e, n, o) {
            e.disableInput(), Promise.resolve().then(function() {
                return y(n.inputValidator(o, n.validationMessage))
            }).then(function(t) {
                e.enableButtons(), e.enableInput(), t ? e.showValidationMessage(t) : Je(e, n, o)
            })
        },
        $e = function(t, e) {
            t.closePopup({
                isDenied: !0,
                value: e
            })
        },
        Je = function(e, t, n) {
            t.showLoaderOnConfirm && $t(), t.preConfirm ? (e.resetValidationMessage(), Promise.resolve().then(function() {
                return y(t.preConfirm(n, t.validationMessage))
            }).then(function(t) {
                bt(S()) || !1 === t ? e.hideLoading() : Ie(e, void 0 === t ? n : t)
            })) : Ie(e, n)
        },
        Xe = ["ArrowRight", "ArrowDown", "Right", "Down"],
        Ge = ["ArrowLeft", "ArrowUp", "Left", "Up"],
        tn = ["Escape", "Esc"],
        en = function(t, e, n) {
            var o = St.innerParams.get(t);
            o.stopKeydownPropagation && e.stopPropagation(), "Enter" === e.key ? nn(t, e, o) : "Tab" === e.key ? on(e, o) : -1 !== [].concat(Xe, Ge).indexOf(e.key) ? rn(e.key) : -1 !== tn.indexOf(e.key) && an(e, o, n)
        },
        nn = function(t, e, n) {
            if (!e.isComposing && e.target && t.getInput() && e.target.outerHTML === t.getInput().outerHTML) {
                if (-1 !== ["textarea", "file"].indexOf(n.input)) return;
                Ut(), e.preventDefault()
            }
        },
        on = function(t) {
            for (var e = t.target, n = R(), o = -1, i = 0; i < n.length; i++)
                if (e === n[i]) {
                    o = i;
                    break
                } t.shiftKey ? je(0, o, -1) : je(0, o, 1), t.stopPropagation(), t.preventDefault()
        },
        rn = function(t) {
            var e, n; - 1 !== [T(), L(), I()].indexOf(document.activeElement) && (e = -1 !== Xe.indexOf(t) ? "nextElementSibling" : "previousElementSibling", (n = document.activeElement[e]) && n.focus())
        },
        an = function(t, e, n) {
            Z(e.allowEscapeKey) && (t.preventDefault(), n(Q.esc))
        },
        sn = function(e, t, n) {
            t.popup.onclick = function() {
                var t = St.innerParams.get(e);
                t.showConfirmButton || t.showDenyButton || t.showCancelButton || t.showCloseButton || t.input || n(Q.close)
            }
        },
        cn = !1,
        un = function(e) {
            e.popup.onmousedown = function() {
                e.container.onmouseup = function(t) {
                    e.container.onmouseup = void 0, t.target === e.container && (cn = !0)
                }
            }
        },
        ln = function(e) {
            e.container.onmousedown = function() {
                e.popup.onmouseup = function(t) {
                    e.popup.onmouseup = void 0, t.target !== e.popup && !e.popup.contains(t.target) || (cn = !0)
                }
            }
        },
        dn = function(n, o, i) {
            o.container.onclick = function(t) {
                var e = St.innerParams.get(n);
                cn ? cn = !1 : t.target === o.container && Z(e.allowOutsideClick) && i(Q.backdrop)
            }
        };
    var pn = function(t, e, n) {
            var o = V();
            rt(o), e.timer && (t.timeout = new Be(function() {
                n("timer"), delete t.timeout
            }, e.timer), e.timerProgressBar && (it(o), setTimeout(function() {
                t.timeout.running && lt(e.timer)
            })))
        },
        fn = function(t, e) {
            if (!e.toast) return Z(e.allowEnterKey) ? void(mn(t, e) || je(0, -1, 1)) : hn()
        },
        mn = function(t, e) {
            return e.focusDeny && bt(t.denyButton) ? (t.denyButton.focus(), !0) : e.focusCancel && bt(t.cancelButton) ? (t.cancelButton.focus(), !0) : !(!e.focusConfirm || !bt(t.confirmButton)) && (t.confirmButton.focus(), !0)
        },
        hn = function() {
            document.activeElement && "function" == typeof document.activeElement.blur && document.activeElement.blur()
        };
    var gn, vn = function(t) {
            for (var e in t) t[e] = new WeakMap
        },
        yn = Object.freeze({
            hideLoading: ue,
            disableLoading: ue,
            getInput: function(t) {
                var e = St.innerParams.get(t || this),
                    n = St.domCache.get(t || this);
                return n ? tt(n.content, e.input) : null
            },
            close: ye,
            closePopup: ye,
            closeModal: ye,
            closeToast: ye,
            enableButtons: function() {
                ke(this, ["confirmButton", "denyButton", "cancelButton"], !1)
            },
            disableButtons: function() {
                ke(this, ["confirmButton", "denyButton", "cancelButton"], !0)
            },
            enableInput: function() {
                return xe(this.getInput(), !1)
            },
            disableInput: function() {
                return xe(this.getInput(), !0)
            },
            showValidationMessage: function(t) {
                var e = St.domCache.get(this),
                    n = St.innerParams.get(this);
                U(e.validationMessage, t), e.validationMessage.className = $["validation-message"], n.customClass && n.customClass.validationMessage && gt(e.validationMessage, n.customClass.validationMessage), it(e.validationMessage);
                var o = this.getInput();
                o && (o.setAttribute("aria-invalid", !0), o.setAttribute("aria-describedBy", $["validation-message"]), et(o), gt(o, $.inputerror))
            },
            resetValidationMessage: function() {
                var t = St.domCache.get(this);
                t.validationMessage && rt(t.validationMessage);
                var e = this.getInput();
                e && (e.removeAttribute("aria-invalid"), e.removeAttribute("aria-describedBy"), vt(e, $.inputerror))
            },
            getProgressSteps: function() {
                return St.domCache.get(this).progressSteps
            },
            _main: function(t) {
                ne(t), oe.currentInstance && oe.currentInstance._destroy(), oe.currentInstance = this;
                var e = function(t) {
                    var e = c({}, ie.showClass, t.showClass),
                        n = c({}, ie.hideClass, t.hideClass),
                        o = c({}, ie, t);
                    if (o.showClass = e, o.hideClass = n, t.animation === false) {
                        o.showClass = {
                            popup: "swal2-noanimation",
                            backdrop: "swal2-noanimation"
                        };
                        o.hideClass = {}
                    }
                    return o
                }(t);
                Pe(e), Object.freeze(e), oe.timeout && (oe.timeout.stop(), delete oe.timeout), clearTimeout(oe.restoreFocusTimeout);
                var n = function(t) {
                    var e = {
                        popup: x(),
                        container: C(),
                        content: P(),
                        actions: q(),
                        confirmButton: T(),
                        denyButton: L(),
                        cancelButton: I(),
                        loader: D(),
                        closeButton: H(),
                        validationMessage: S(),
                        progressSteps: O()
                    };
                    return St.domCache.set(t, e), e
                }(this);
                return Nt(this, e), St.innerParams.set(this, e),
                    function(n, o, i) {
                        return new Promise(function(t) {
                            var e = function t(e) {
                                n.closePopup({
                                    isDismissed: true,
                                    dismiss: e
                                })
                            };
                            ge.swalPromiseResolve.set(n, t);
                            o.confirmButton.onclick = function() {
                                return Te(n, i)
                            };
                            o.denyButton.onclick = function() {
                                return Le(n, i)
                            };
                            o.cancelButton.onclick = function() {
                                return De(n, e)
                            };
                            o.closeButton.onclick = function() {
                                return e(Q.close)
                            };
                            Me(n, o, e);
                            qe(n, oe, i, e);
                            if (i.toast && (i.input || i.footer || i.showCloseButton)) {
                                gt(document.body, $["toast-column"])
                            } else {
                                vt(document.body, $["toast-column"])
                            }
                            Se(n, i);
                            Ee(i);
                            pn(oe, i, e);
                            fn(o, i);
                            setTimeout(function() {
                                o.container.scrollTop = 0
                            })
                        })
                    }(this, n, e)
            },
            update: function(e) {
                var t = x(),
                    n = St.innerParams.get(this);
                if (!t || _(t, n.hideClass.popup)) return W("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");
                var o = {};
                Object.keys(e).forEach(function(t) {
                    wn.isUpdatableParameter(t) ? o[t] = e[t] : W('Invalid parameter to update: "'.concat(t, '". Updatable params are listed here: https://github.com/sweetalert2/sweetalert2/blob/master/src/utils/params.js\n\nIf you think this parameter should be updatable, request it here: https://github.com/sweetalert2/sweetalert2/issues/new?template=02_feature_request.md'))
                });
                var i = c({}, n, o);
                Nt(this, i), St.innerParams.set(this, i), Object.defineProperties(this, {
                    params: {
                        value: c({}, this.params, e),
                        writable: !1,
                        enumerable: !0
                    }
                })
            },
            _destroy: function() {
                var t = St.domCache.get(this),
                    e = St.innerParams.get(this);
                e && (t.popup && oe.swalCloseEventFinishedCallback && (oe.swalCloseEventFinishedCallback(), delete oe.swalCloseEventFinishedCallback), oe.deferDisposalTimer && (clearTimeout(oe.deferDisposalTimer), delete oe.deferDisposalTimer), function(t) {
                    if (typeof t.didDestroy === "function") {
                        t.didDestroy()
                    } else if (typeof t.onDestroy === "function") {
                        t.onDestroy()
                    }
                }(e), delete this.params, delete oe.keydownHandler, delete oe.keydownTarget, vn(St), vn(ge))
            }
        }),
        bn = function() {
            function r() {
                if (a(this, r), "undefined" != typeof window) {
                    "undefined" == typeof Promise && K("This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)"), gn = this;
                    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                    var o = Object.freeze(this.constructor.argsToParams(e));
                    Object.defineProperties(this, {
                        params: {
                            value: o,
                            writable: !1,
                            enumerable: !0,
                            configurable: !0
                        }
                    });
                    var i = this._main(this.params);
                    St.promise.set(this, i)
                }
            }
            return s(r, [{
                key: "then",
                value: function(t) {
                    return St.promise.get(this).then(t)
                }
            }, {
                key: "finally",
                value: function(t) {
                    return St.promise.get(this).finally(t)
                }
            }]), r
        }();
    c(bn.prototype, yn), c(bn, ce), Object.keys(yn).forEach(function(t) {
        bn[t] = function() {
            if (gn) return gn[t].apply(gn, arguments)
        }
    }), bn.DismissReason = Q, bn.version = "10.6.1";
    var wn = bn;
    return wn.default = wn
}), void 0 !== this && this.Sweetalert2 && (this.swal = this.sweetAlert = this.Swal = this.SweetAlert = this.Sweetalert2);;
! function(e) {
    var t = {};

    function n(o) {
        if (t[o]) return t[o].exports;
        var l = t[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(l.exports, l, l.exports, n), l.l = !0, l.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, o) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: o
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var o = Object.create(null);
        if (n.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var l in e) n.d(o, l, function(t) {
                return e[t]
            }.bind(null, l));
        return o
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 0)
}([function(e, t, n) {
    (function(o) {
        var l, r, i;
        ! function(o, s) {
            r = [], l = function(e) {
                "use strict";
                var t, o, l, r = n(2),
                    i = {},
                    s = {},
                    c = n(3),
                    a = n(4),
                    u = !!(e && e.document && e.document.querySelector && e.addEventListener);
                if ("undefined" == typeof window && !u) return;
                var d = Object.prototype.hasOwnProperty;

                function f(e, t, n) {
                    var o, l;
                    return t || (t = 250),
                        function() {
                            var r = n || this,
                                i = +new Date,
                                s = arguments;
                            o && i < o + t ? (clearTimeout(l), l = setTimeout(function() {
                                o = i, e.apply(r, s)
                            }, t)) : (o = i, e.apply(r, s))
                        }
                }
                return s.destroy = function() {
                    if (!i.skipRendering) try {
                        document.querySelector(i.tocSelector).innerHTML = ""
                    } catch (e) {
                        console.warn("Element not found: " + i.tocSelector)
                    }
                    i.scrollContainer && document.querySelector(i.scrollContainer) ? (document.querySelector(i.scrollContainer).removeEventListener("scroll", this._scrollListener, !1), document.querySelector(i.scrollContainer).removeEventListener("resize", this._scrollListener, !1), t && document.querySelector(i.scrollContainer).removeEventListener("click", this._clickListener, !1)) : (document.removeEventListener("scroll", this._scrollListener, !1), document.removeEventListener("resize", this._scrollListener, !1), t && document.removeEventListener("click", this._clickListener, !1))
                }, s.init = function(e) {
                    if (u && (i = function() {
                            for (var e = {}, t = 0; t < arguments.length; t++) {
                                var n = arguments[t];
                                for (var o in n) d.call(n, o) && (e[o] = n[o])
                            }
                            return e
                        }(r, e || {}), this.options = i, this.state = {}, i.scrollSmooth && (i.duration = i.scrollSmoothDuration, i.offset = i.scrollSmoothOffset, s.scrollSmooth = n(5).initSmoothScrolling(i)), t = c(i), o = a(i), this._buildHtml = t, this._parseContent = o, s.destroy(), null !== (l = o.selectHeadings(i.contentSelector, i.headingSelector)))) {
                        var m = o.nestHeadingsArray(l).nest;
                        i.skipRendering || t.render(i.tocSelector, m), this._scrollListener = f(function(e) {
                            t.updateToc(l);
                            var n = e && e.target && e.target.scrollingElement && 0 === e.target.scrollingElement.scrollTop;
                            (e && (0 === e.eventPhase || null === e.currentTarget) || n) && (t.updateToc(l), i.scrollEndCallback && i.scrollEndCallback(e))
                        }, i.throttleTimeout), this._scrollListener(), i.scrollContainer && document.querySelector(i.scrollContainer) ? (document.querySelector(i.scrollContainer).addEventListener("scroll", this._scrollListener, !1), document.querySelector(i.scrollContainer).addEventListener("resize", this._scrollListener, !1)) : (document.addEventListener("scroll", this._scrollListener, !1), document.addEventListener("resize", this._scrollListener, !1));
                        var h = null;
                        return this._clickListener = f(function(e) {
                            i.scrollSmooth && t.disableTocAnimation(e), t.updateToc(l), h && clearTimeout(h), h = setTimeout(function() {
                                t.enableTocAnimation()
                            }, i.scrollSmoothDuration)
                        }, i.throttleTimeout), i.scrollContainer && document.querySelector(i.scrollContainer) ? document.querySelector(i.scrollContainer).addEventListener("click", this._clickListener, !1) : document.addEventListener("click", this._clickListener, !1), this
                    }
                }, s.refresh = function(e) {
                    s.destroy(), s.init(e || this.options)
                }, e.tocbot = s, s
            }(o), void 0 === (i = "function" == typeof l ? l.apply(t, r) : l) || (e.exports = i)
        }(void 0 !== o ? o : this.window || this.global)
    }).call(this, n(1))
}, function(e, t) {
    var n;
    n = function() {
        return this
    }();
    try {
        n = n || Function("return this")() || (0, eval)("this")
    } catch (e) {
        "object" == typeof window && (n = window)
    }
    e.exports = n
}, function(e, t) {
    e.exports = {
        tocSelector: ".js-toc",
        contentSelector: ".js-toc-content",
        headingSelector: "h1, h2, h3",
        ignoreSelector: ".js-toc-ignore",
        hasInnerContainers: !1,
        linkClass: "toc-link",
        extraLinkClasses: "",
        activeLinkClass: "is-active-link",
        listClass: "toc-list",
        extraListClasses: "",
        isCollapsedClass: "is-collapsed",
        collapsibleClass: "is-collapsible",
        listItemClass: "toc-list-item",
        activeListItemClass: "is-active-li",
        collapseDepth: 0,
        scrollSmooth: !0,
        scrollSmoothDuration: 420,
        scrollSmoothOffset: 0,
        scrollEndCallback: function(e) {},
        headingsOffset: 1,
        throttleTimeout: 50,
        positionFixedSelector: null,
        positionFixedClass: "is-position-fixed",
        fixedSidebarOffset: "auto",
        includeHtml: !1,
        onClick: function(e) {},
        orderedList: !0,
        scrollContainer: null,
        skipRendering: !1,
        headingLabelCallback: !1,
        ignoreHiddenElements: !1,
        headingObjectCallback: null,
        basePath: ""
    }
}, function(e, t) {
    e.exports = function(e) {
        var t = [].forEach,
            n = [].some,
            o = document.body,
            l = !0,
            r = " ";

        function i(n, o) {
            var l = o.appendChild(function(n) {
                var o = document.createElement("li"),
                    l = document.createElement("a");
                e.listItemClass && o.setAttribute("class", e.listItemClass);
                e.onClick && (l.onclick = e.onClick);
                e.includeHtml && n.childNodes.length ? t.call(n.childNodes, function(e) {
                    l.appendChild(e.cloneNode(!0))
                }) : l.textContent = n.textContent;
                return l.setAttribute("href", e.basePath + "#" + n.id), l.setAttribute("class", e.linkClass + r + "node-name--" + n.nodeName + r + e.extraLinkClasses), o.appendChild(l), o
            }(n));
            if (n.children.length) {
                var c = s(n.isCollapsed);
                n.children.forEach(function(e) {
                    i(e, c)
                }), l.appendChild(c)
            }
        }

        function s(t) {
            var n = e.orderedList ? "ol" : "ul",
                o = document.createElement(n),
                l = e.listClass + r + e.extraListClasses;
            return t && (l += r + e.collapsibleClass, l += r + e.isCollapsedClass), o.setAttribute("class", l), o
        }
        return {
            enableTocAnimation: function() {
                l = !0
            },
            disableTocAnimation: function(t) {
                var n = t.target || t.srcElement;
                "string" == typeof n.className && -1 !== n.className.indexOf(e.linkClass) && (l = !1)
            },
            render: function(e, t) {
                var n = s(!1);
                t.forEach(function(e) {
                    i(e, n)
                });
                var o = document.querySelector(e);
                if (null !== o) return o.firstChild && o.removeChild(o.firstChild), 0 === t.length ? o : o.appendChild(n)
            },
            updateToc: function(i) {
                var s;
                s = e.scrollContainer && document.querySelector(e.scrollContainer) ? document.querySelector(e.scrollContainer).scrollTop : document.documentElement.scrollTop || o.scrollTop, e.positionFixedSelector && function() {
                    var t;
                    t = e.scrollContainer && document.querySelector(e.scrollContainer) ? document.querySelector(e.scrollContainer).scrollTop : document.documentElement.scrollTop || o.scrollTop;
                    var n = document.querySelector(e.positionFixedSelector);
                    "auto" === e.fixedSidebarOffset && (e.fixedSidebarOffset = document.querySelector(e.tocSelector).offsetTop), t > e.fixedSidebarOffset ? -1 === n.className.indexOf(e.positionFixedClass) && (n.className += r + e.positionFixedClass) : n.className = n.className.split(r + e.positionFixedClass).join("")
                }();
                var c, a = i;
                if (l && null !== document.querySelector(e.tocSelector) && a.length > 0) {
                    n.call(a, function(t, n) {
                        return function t(n) {
                            var o = 0;
                            return n !== document.querySelector(e.contentSelector && null != n) && (o = n.offsetTop, e.hasInnerContainers && (o += t(n.offsetParent))), o
                        }(t) > s + e.headingsOffset + 10 ? (c = a[0 === n ? n : n - 1], !0) : n === a.length - 1 ? (c = a[a.length - 1], !0) : void 0
                    });
                    var u = document.querySelector(e.tocSelector).querySelectorAll("." + e.linkClass);
                    t.call(u, function(t) {
                        t.className = t.className.split(r + e.activeLinkClass).join("")
                    });
                    var d = document.querySelector(e.tocSelector).querySelectorAll("." + e.listItemClass);
                    t.call(d, function(t) {
                        t.className = t.className.split(r + e.activeListItemClass).join("")
                    });
                    var f = document.querySelector(e.tocSelector).querySelector("." + e.linkClass + ".node-name--" + c.nodeName + '[href="' + e.basePath + "#" + c.id.replace(/([ #;&,.+*~':"!^$[\]()=>|/@])/g, "\\$1") + '"]'); - 1 === f.className.indexOf(e.activeLinkClass) && (f.className += r + e.activeLinkClass);
                    var m = f.parentNode;
                    m && -1 === m.className.indexOf(e.activeListItemClass) && (m.className += r + e.activeListItemClass);
                    var h = document.querySelector(e.tocSelector).querySelectorAll("." + e.listClass + "." + e.collapsibleClass);
                    t.call(h, function(t) {
                            -1 === t.className.indexOf(e.isCollapsedClass) && (t.className += r + e.isCollapsedClass)
                        }), f.nextSibling && -1 !== f.nextSibling.className.indexOf(e.isCollapsedClass) && (f.nextSibling.className = f.nextSibling.className.split(r + e.isCollapsedClass).join("")),
                        function t(n) {
                            return -1 !== n.className.indexOf(e.collapsibleClass) && -1 !== n.className.indexOf(e.isCollapsedClass) ? (n.className = n.className.split(r + e.isCollapsedClass).join(""), t(n.parentNode.parentNode)) : n
                        }(f.parentNode.parentNode)
                }
            }
        }
    }
}, function(e, t) {
    e.exports = function(e) {
        var t = [].reduce;

        function n(e) {
            return e[e.length - 1]
        }

        function o(t) {
            if (!(t instanceof window.HTMLElement)) return t;
            if (e.ignoreHiddenElements && (!t.offsetHeight || !t.offsetParent)) return null;
            var n = {
                id: t.id,
                children: [],
                nodeName: t.nodeName,
                headingLevel: function(e) {
                    return +e.nodeName.split("H").join("")
                }(t),
                textContent: e.headingLabelCallback ? String(e.headingLabelCallback(t.textContent)) : t.textContent.trim()
            };
            return e.includeHtml && (n.childNodes = t.childNodes), e.headingObjectCallback ? e.headingObjectCallback(n, t) : n
        }
        return {
            nestHeadingsArray: function(l) {
                return t.call(l, function(t, l) {
                    var r = o(l);
                    return r && function(t, l) {
                        for (var r = o(t), i = r.headingLevel, s = l, c = n(s), a = i - (c ? c.headingLevel : 0); a > 0;)(c = n(s)) && void 0 !== c.children && (s = c.children), a--;
                        i >= e.collapseDepth && (r.isCollapsed = !0), s.push(r)
                    }(r, t.nest), t
                }, {
                    nest: []
                })
            },
            selectHeadings: function(t, n) {
                var o = n;
                e.ignoreSelector && (o = n.split(",").map(function(t) {
                    return t.trim() + ":not(" + e.ignoreSelector + ")"
                }));
                try {
                    return document.querySelector(t).querySelectorAll(o)
                } catch (e) {
                    return console.warn("Element not found: " + t), null
                }
            }
        }
    }
}, function(e, t) {
    function n(e, t) {
        var n = window.pageYOffset,
            o = {
                duration: t.duration,
                offset: t.offset || 0,
                callback: t.callback,
                easing: t.easing || d
            },
            l = document.querySelector('[id="' + decodeURI(e).split("#").join("") + '"]'),
            r = typeof e === "string" ? o.offset + (e ? l && l.getBoundingClientRect().top || 0 : -(document.documentElement.scrollTop || document.body.scrollTop)) : e,
            i = typeof o.duration === "function" ? o.duration(r) : o.duration,
            s, c;

        function a(e) {
            c = e - s;
            window.scrollTo(0, o.easing(c, n, r, i));
            if (c < i) {
                requestAnimationFrame(a)
            } else {
                u()
            }
        }

        function u() {
            if (window.scrollTo(0, n + r), "function" == typeof o.callback) {
                o.callback()
            }
        }

        function d(e, t, n, o) {
            return (e /= o / 2) < 1 ? n / 2 * e * e + t : -n / 2 * (--e * (e - 2) - 1) + t
        }
        requestAnimationFrame(function(e) {
            s = e;
            a(e)
        })
    }
    t.initSmoothScrolling = function(e) {
        document.documentElement.style;
        var t = e.duration,
            o = e.offset,
            l = location.hash ? r(location.href) : location.href;

        function r(e) {
            return e.slice(0, e.lastIndexOf("#"))
        }! function() {
            document.body.addEventListener("click", function(i) {
                if (! function(e) {
                        return "a" === e.tagName.toLowerCase() && (e.hash.length > 0 || "#" === e.href.charAt(e.href.length - 1)) && (r(e.href) === l || r(e.href) + "#" === l)
                    }(i.target) || i.target.className.indexOf("no-smooth-scroll") > -1 || "#" === i.target.href.charAt(i.target.href.length - 2) && "!" === i.target.href.charAt(i.target.href.length - 1) || -1 === i.target.className.indexOf(e.linkClass)) return;
                n(i.target.hash, {
                    duration: t,
                    offset: o,
                    callback: function() {
                        ! function(e) {
                            var t = document.getElementById(e.substring(1));
                            t && (/^(?:a|select|input|button|textarea)$/i.test(t.tagName) || (t.tabIndex = -1), t.focus())
                        }(i.target.hash)
                    }
                })
            }, !1)
        }()
    }
}]);;
/*!
 * dist/jquery.inputmask.min
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2021 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.0.7-beta.28
 */
! function(e, t) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = t(require("jquery"));
    else if ("function" == typeof define && define.amd) define(["jquery"], t);
    else {
        var i = "object" == typeof exports ? t(require("jquery")) : t(e.jQuery);
        for (var a in i)("object" == typeof exports ? exports : e)[a] = i[a]
    }
}(self, (function(e) {
    return function() {
        "use strict";
        var t = {
                3046: function(e, t, i) {
                    var a;
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.default = void 0, i(3851), i(219), i(207), i(5296);
                    var n = ((a = i(2394)) && a.__esModule ? a : {
                        default: a
                    }).default;
                    t.default = n
                },
                8741: function(e, t) {
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.default = void 0;
                    var i = !("undefined" == typeof window || !window.document || !window.document.createElement);
                    t.default = i
                },
                3976: function(e, t, i) {
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.default = void 0;
                    var a, n = (a = i(5581)) && a.__esModule ? a : {
                        default: a
                    };
                    var r = {
                        _maxTestPos: 500,
                        placeholder: "_",
                        optionalmarker: ["[", "]"],
                        quantifiermarker: ["{", "}"],
                        groupmarker: ["(", ")"],
                        alternatormarker: "|",
                        escapeChar: "\\",
                        mask: null,
                        regex: null,
                        oncomplete: function() {},
                        onincomplete: function() {},
                        oncleared: function() {},
                        repeat: 0,
                        greedy: !1,
                        autoUnmask: !1,
                        removeMaskOnSubmit: !1,
                        clearMaskOnLostFocus: !0,
                        insertMode: !0,
                        insertModeVisual: !0,
                        clearIncomplete: !1,
                        alias: null,
                        onKeyDown: function() {},
                        onBeforeMask: null,
                        onBeforePaste: function(e, t) {
                            return "function" == typeof t.onBeforeMask ? t.onBeforeMask.call(this, e, t) : e
                        },
                        onBeforeWrite: null,
                        onUnMask: null,
                        showMaskOnFocus: !0,
                        showMaskOnHover: !0,
                        onKeyValidation: function() {},
                        skipOptionalPartCharacter: " ",
                        numericInput: !1,
                        rightAlign: !1,
                        undoOnEscape: !0,
                        radixPoint: "",
                        _radixDance: !1,
                        groupSeparator: "",
                        keepStatic: null,
                        positionCaretOnTab: !0,
                        tabThrough: !1,
                        supportsInputType: ["text", "tel", "url", "password", "search"],
                        ignorables: [n.default.BACKSPACE, n.default.TAB, n.default["PAUSE/BREAK"], n.default.ESCAPE, n.default.PAGE_UP, n.default.PAGE_DOWN, n.default.END, n.default.HOME, n.default.LEFT, n.default.UP, n.default.RIGHT, n.default.DOWN, n.default.INSERT, n.default.DELETE, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229],
                        isComplete: null,
                        preValidation: null,
                        postValidation: null,
                        staticDefinitionSymbol: void 0,
                        jitMasking: !1,
                        nullable: !0,
                        inputEventOnly: !1,
                        noValuePatching: !1,
                        positionCaretOnClick: "lvp",
                        casing: null,
                        inputmode: "text",
                        importDataAttributes: !0,
                        shiftPositions: !0,
                        usePrototypeDefinitions: !0,
                        validationEventTimeOut: 3e3,
                        substitutes: {}
                    };
                    t.default = r
                },
                7392: function(e, t) {
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.default = void 0;
                    t.default = {
                        9: {
                            validator: "[0-9\uff10-\uff19]",
                            definitionSymbol: "*"
                        },
                        a: {
                            validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                            definitionSymbol: "*"
                        },
                        "*": {
                            validator: "[0-9\uff10-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]"
                        }
                    }
                },
                3287: function(e, t, i) {
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.default = void 0;
                    var a, n = (a = i(8254)) && a.__esModule ? a : {
                        default: a
                    };
                    if (void 0 === n.default) throw "jQuery not loaded!";
                    var r = n.default;
                    t.default = r
                },
                9845: function(e, t, i) {
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.iphone = t.iemobile = t.mobile = t.ie = t.ua = void 0;
                    var a, n = (a = i(9380)) && a.__esModule ? a : {
                        default: a
                    };
                    var r = n.default.navigator && n.default.navigator.userAgent || "",
                        o = r.indexOf("MSIE ") > 0 || r.indexOf("Trident/") > 0,
                        s = "ontouchstart" in n.default,
                        l = /iemobile/i.test(r),
                        u = /iphone/i.test(r) && !l;
                    t.iphone = u, t.iemobile = l, t.mobile = s, t.ie = o, t.ua = r
                },
                7184: function(e, t) {
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.default = function(e) {
                        return e.replace(i, "\\$1")
                    };
                    var i = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"].join("|\\") + ")", "gim")
                },
                6030: function(e, t, i) {
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.EventHandlers = void 0;
                    var a, n = i(8711),
                        r = (a = i(5581)) && a.__esModule ? a : {
                            default: a
                        },
                        o = i(9845),
                        s = i(7215),
                        l = i(7760),
                        u = i(4713);

                    function c(e, t) {
                        var i = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                        if (!i) {
                            if (Array.isArray(e) || (i = function(e, t) {
                                    if (!e) return;
                                    if ("string" == typeof e) return f(e, t);
                                    var i = Object.prototype.toString.call(e).slice(8, -1);
                                    "Object" === i && e.constructor && (i = e.constructor.name);
                                    if ("Map" === i || "Set" === i) return Array.from(e);
                                    if ("Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)) return f(e, t)
                                }(e)) || t && e && "number" == typeof e.length) {
                                i && (e = i);
                                var a = 0,
                                    n = function() {};
                                return {
                                    s: n,
                                    n: function() {
                                        return a >= e.length ? {
                                            done: !0
                                        } : {
                                            done: !1,
                                            value: e[a++]
                                        }
                                    },
                                    e: function(e) {
                                        throw e
                                    },
                                    f: n
                                }
                            }
                            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                        }
                        var r, o = !0,
                            s = !1;
                        return {
                            s: function() {
                                i = i.call(e)
                            },
                            n: function() {
                                var e = i.next();
                                return o = e.done, e
                            },
                            e: function(e) {
                                s = !0, r = e
                            },
                            f: function() {
                                try {
                                    o || null == i.return || i.return()
                                } finally {
                                    if (s) throw r
                                }
                            }
                        }
                    }

                    function f(e, t) {
                        (null == t || t > e.length) && (t = e.length);
                        for (var i = 0, a = new Array(t); i < t; i++) a[i] = e[i];
                        return a
                    }
                    var d = {
                        keydownEvent: function(e) {
                            var t = this.inputmask,
                                i = t.opts,
                                a = t.dependencyLib,
                                c = t.maskset,
                                f = this,
                                d = a(f),
                                p = e.keyCode,
                                h = n.caret.call(t, f),
                                v = i.onKeyDown.call(this, e, n.getBuffer.call(t), h, i);
                            if (void 0 !== v) return v;
                            if (p === r.default.BACKSPACE || p === r.default.DELETE || o.iphone && p === r.default.BACKSPACE_SAFARI || e.ctrlKey && p === r.default.X && !("oncut" in f)) e.preventDefault(), s.handleRemove.call(t, f, p, h), (0, l.writeBuffer)(f, n.getBuffer.call(t, !0), c.p, e, f.inputmask._valueGet() !== n.getBuffer.call(t).join(""));
                            else if (p === r.default.END || p === r.default.PAGE_DOWN) {
                                e.preventDefault();
                                var m = n.seekNext.call(t, n.getLastValidPosition.call(t));
                                n.caret.call(t, f, e.shiftKey ? h.begin : m, m, !0)
                            } else p === r.default.HOME && !e.shiftKey || p === r.default.PAGE_UP ? (e.preventDefault(), n.caret.call(t, f, 0, e.shiftKey ? h.begin : 0, !0)) : i.undoOnEscape && p === r.default.ESCAPE && !0 !== e.altKey ? ((0, l.checkVal)(f, !0, !1, t.undoValue.split("")), d.trigger("click")) : !0 === i.tabThrough && p === r.default.TAB ? !0 === e.shiftKey ? (h.end = n.seekPrevious.call(t, h.end, !0), !0 === u.getTest.call(t, h.end - 1).match.static && h.end--, h.begin = n.seekPrevious.call(t, h.end, !0), h.begin >= 0 && h.end > 0 && (e.preventDefault(), n.caret.call(t, f, h.begin, h.end))) : (h.begin = n.seekNext.call(t, h.begin, !0), h.end = n.seekNext.call(t, h.begin, !0), h.end < c.maskLength && h.end--, h.begin <= c.maskLength && (e.preventDefault(), n.caret.call(t, f, h.begin, h.end))) : e.shiftKey || i.insertModeVisual && !1 === i.insertMode && (p === r.default.RIGHT ? setTimeout((function() {
                                var e = n.caret.call(t, f);
                                n.caret.call(t, f, e.begin)
                            }), 0) : p === r.default.LEFT && setTimeout((function() {
                                var e = n.translatePosition.call(t, f.inputmask.caretPos.begin);
                                n.translatePosition.call(t, f.inputmask.caretPos.end);
                                t.isRTL ? n.caret.call(t, f, e + (e === c.maskLength ? 0 : 1)) : n.caret.call(t, f, e - (0 === e ? 0 : 1))
                            }), 0));
                            t.ignorable = i.ignorables.includes(p)
                        },
                        keypressEvent: function(e, t, i, a, o) {
                            var u = this.inputmask || this,
                                c = u.opts,
                                f = u.dependencyLib,
                                d = u.maskset,
                                p = u.el,
                                h = f(p),
                                v = e.keyCode;
                            if (!(!0 === t || e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || u.ignorable)) return v === r.default.ENTER && u.undoValue !== u._valueGet(!0) && (u.undoValue = u._valueGet(!0), setTimeout((function() {
                                h.trigger("change")
                            }), 0)), u.skipInputEvent = !0, !0;
                            if (v) {
                                44 !== v && 46 !== v || 3 !== e.location || "" === c.radixPoint || (v = c.radixPoint.charCodeAt(0));
                                var m, g = t ? {
                                        begin: o,
                                        end: o
                                    } : n.caret.call(u, p),
                                    k = String.fromCharCode(v);
                                k = c.substitutes[k] || k, d.writeOutBuffer = !0;
                                var y = s.isValid.call(u, g, k, a, void 0, void 0, void 0, t);
                                if (!1 !== y && (n.resetMaskSet.call(u, !0), m = void 0 !== y.caret ? y.caret : n.seekNext.call(u, y.pos.begin ? y.pos.begin : y.pos), d.p = m), m = c.numericInput && void 0 === y.caret ? n.seekPrevious.call(u, m) : m, !1 !== i && (setTimeout((function() {
                                        c.onKeyValidation.call(p, v, y)
                                    }), 0), d.writeOutBuffer && !1 !== y)) {
                                    var b = n.getBuffer.call(u);
                                    (0, l.writeBuffer)(p, b, m, e, !0 !== t)
                                }
                                if (e.preventDefault(), t) return !1 !== y && (y.forwardPosition = m), y
                            }
                        },
                        keyupEvent: function(e) {
                            var t = this.inputmask;
                            !t.isComposing || e.keyCode !== r.default.KEY_229 && e.keyCode !== r.default.ENTER || t.$el.trigger("input")
                        },
                        pasteEvent: function(e) {
                            var t, i = this.inputmask,
                                a = i.opts,
                                r = i._valueGet(!0),
                                o = n.caret.call(i, this);
                            i.isRTL && (t = o.end, o.end = n.translatePosition.call(i, o.begin), o.begin = n.translatePosition.call(i, t));
                            var s = r.substr(0, o.begin),
                                u = r.substr(o.end, r.length);
                            if (s == (i.isRTL ? n.getBufferTemplate.call(i).slice().reverse() : n.getBufferTemplate.call(i)).slice(0, o.begin).join("") && (s = ""), u == (i.isRTL ? n.getBufferTemplate.call(i).slice().reverse() : n.getBufferTemplate.call(i)).slice(o.end).join("") && (u = ""), window.clipboardData && window.clipboardData.getData) r = s + window.clipboardData.getData("Text") + u;
                            else {
                                if (!e.clipboardData || !e.clipboardData.getData) return !0;
                                r = s + e.clipboardData.getData("text/plain") + u
                            }
                            var f = r;
                            if (i.isRTL) {
                                f = f.split("");
                                var d, p = c(n.getBufferTemplate.call(i));
                                try {
                                    for (p.s(); !(d = p.n()).done;) {
                                        var h = d.value;
                                        f[0] === h && f.shift()
                                    }
                                } catch (e) {
                                    p.e(e)
                                } finally {
                                    p.f()
                                }
                                f = f.join("")
                            }
                            if ("function" == typeof a.onBeforePaste) {
                                if (!1 === (f = a.onBeforePaste.call(i, f, a))) return !1;
                                f || (f = r)
                            }(0, l.checkVal)(this, !0, !1, f.toString().split(""), e), e.preventDefault()
                        },
                        inputFallBackEvent: function(e) {
                            var t = this.inputmask,
                                i = t.opts,
                                a = t.dependencyLib;
                            var s = this,
                                c = s.inputmask._valueGet(!0),
                                f = (t.isRTL ? n.getBuffer.call(t).slice().reverse() : n.getBuffer.call(t)).join(""),
                                p = n.caret.call(t, s, void 0, void 0, !0);
                            if (f !== c) {
                                var h = function(e, a, r) {
                                    for (var o, s, l, c = e.substr(0, r.begin).split(""), f = e.substr(r.begin).split(""), d = a.substr(0, r.begin).split(""), p = a.substr(r.begin).split(""), h = c.length >= d.length ? c.length : d.length, v = f.length >= p.length ? f.length : p.length, m = "", g = [], k = "~"; c.length < h;) c.push(k);
                                    for (; d.length < h;) d.push(k);
                                    for (; f.length < v;) f.unshift(k);
                                    for (; p.length < v;) p.unshift(k);
                                    var y = c.concat(f),
                                        b = d.concat(p);
                                    for (s = 0, o = y.length; s < o; s++) switch (l = u.getPlaceholder.call(t, n.translatePosition.call(t, s)), m) {
                                        case "insertText":
                                            b[s - 1] === y[s] && r.begin == y.length - 1 && g.push(y[s]), s = o;
                                            break;
                                        case "insertReplacementText":
                                        case "deleteContentBackward":
                                            y[s] === k ? r.end++ : s = o;
                                            break;
                                        default:
                                            y[s] !== b[s] && (y[s + 1] !== k && y[s + 1] !== l && void 0 !== y[s + 1] || (b[s] !== l || b[s + 1] !== k) && b[s] !== k ? b[s + 1] === k && b[s] === y[s + 1] ? (m = "insertText", g.push(y[s]), r.begin--, r.end--) : y[s] !== l && y[s] !== k && (y[s + 1] === k || b[s] !== y[s] && b[s + 1] === y[s + 1]) ? (m = "insertReplacementText", g.push(y[s]), r.begin--) : y[s] === k ? (m = "deleteContentBackward", (n.isMask.call(t, n.translatePosition.call(t, s), !0) || b[s] === i.radixPoint) && r.end++) : s = o : (m = "insertText", g.push(y[s]), r.begin--, r.end--))
                                    }
                                    return {
                                        action: m,
                                        data: g,
                                        caret: r
                                    }
                                }(c = function(e, i, a) {
                                    if (o.iemobile) {
                                        var r = i.replace(n.getBuffer.call(t).join(""), "");
                                        if (1 === r.length) {
                                            var s = i.split("");
                                            s.splice(a.begin, 0, r), i = s.join("")
                                        }
                                    }
                                    return i
                                }(0, c, p), f, p);
                                switch ((s.inputmask.shadowRoot || s.ownerDocument).activeElement !== s && s.focus(), (0, l.writeBuffer)(s, n.getBuffer.call(t)), n.caret.call(t, s, p.begin, p.end, !0), h.action) {
                                    case "insertText":
                                    case "insertReplacementText":
                                        h.data.forEach((function(e, i) {
                                            var n = new a.Event("keypress");
                                            n.keyCode = e.charCodeAt(0), t.ignorable = !1, d.keypressEvent.call(s, n)
                                        })), setTimeout((function() {
                                            t.$el.trigger("keyup")
                                        }), 0);
                                        break;
                                    case "deleteContentBackward":
                                        var v = new a.Event("keydown");
                                        v.keyCode = r.default.BACKSPACE, d.keydownEvent.call(s, v);
                                        break;
                                    default:
                                        (0, l.applyInputValue)(s, c)
                                }
                                e.preventDefault()
                            }
                        },
                        compositionendEvent: function(e) {
                            var t = this.inputmask;
                            t.isComposing = !1, t.$el.trigger("input")
                        },
                        setValueEvent: function(e) {
                            var t = this.inputmask,
                                i = this,
                                a = e && e.detail ? e.detail[0] : arguments[1];
                            void 0 === a && (a = i.inputmask._valueGet(!0)), (0, l.applyInputValue)(i, a), (e.detail && void 0 !== e.detail[1] || void 0 !== arguments[2]) && n.caret.call(t, i, e.detail ? e.detail[1] : arguments[2])
                        },
                        focusEvent: function(e) {
                            var t = this.inputmask,
                                i = t.opts,
                                a = this,
                                r = a.inputmask._valueGet();
                            i.showMaskOnFocus && r !== n.getBuffer.call(t).join("") && (0, l.writeBuffer)(a, n.getBuffer.call(t), n.seekNext.call(t, n.getLastValidPosition.call(t))), !0 !== i.positionCaretOnTab || !1 !== t.mouseEnter || s.isComplete.call(t, n.getBuffer.call(t)) && -1 !== n.getLastValidPosition.call(t) || d.clickEvent.apply(a, [e, !0]), t.undoValue = t._valueGet(!0)
                        },
                        invalidEvent: function(e) {
                            this.inputmask.validationEvent = !0
                        },
                        mouseleaveEvent: function() {
                            var e = this.inputmask,
                                t = e.opts,
                                i = this;
                            e.mouseEnter = !1, t.clearMaskOnLostFocus && (i.inputmask.shadowRoot || i.ownerDocument).activeElement !== i && (0, l.HandleNativePlaceholder)(i, e.originalPlaceholder)
                        },
                        clickEvent: function(e, t) {
                            var i = this.inputmask,
                                a = this;
                            if ((a.inputmask.shadowRoot || a.ownerDocument).activeElement === a) {
                                var r = n.determineNewCaretPosition.call(i, n.caret.call(i, a), t);
                                void 0 !== r && n.caret.call(i, a, r)
                            }
                        },
                        cutEvent: function(e) {
                            var t = this.inputmask,
                                i = t.maskset,
                                a = this,
                                o = n.caret.call(t, a),
                                u = t.isRTL ? n.getBuffer.call(t).slice(o.end, o.begin) : n.getBuffer.call(t).slice(o.begin, o.end),
                                c = t.isRTL ? u.reverse().join("") : u.join("");
                            window.navigator.clipboard ? window.navigator.clipboard.writeText(c) : window.clipboardData && window.clipboardData.getData && window.clipboardData.setData("Text", c), s.handleRemove.call(t, a, r.default.DELETE, o), (0, l.writeBuffer)(a, n.getBuffer.call(t), i.p, e, t.undoValue !== t._valueGet(!0))
                        },
                        blurEvent: function(e) {
                            var t = this.inputmask,
                                i = t.opts,
                                a = (0, t.dependencyLib)(this),
                                r = this;
                            if (r.inputmask) {
                                (0, l.HandleNativePlaceholder)(r, t.originalPlaceholder);
                                var o = r.inputmask._valueGet(),
                                    u = n.getBuffer.call(t).slice();
                                "" !== o && (i.clearMaskOnLostFocus && (-1 === n.getLastValidPosition.call(t) && o === n.getBufferTemplate.call(t).join("") ? u = [] : l.clearOptionalTail.call(t, u)), !1 === s.isComplete.call(t, u) && (setTimeout((function() {
                                    a.trigger("incomplete")
                                }), 0), i.clearIncomplete && (n.resetMaskSet.call(t), u = i.clearMaskOnLostFocus ? [] : n.getBufferTemplate.call(t).slice())), (0, l.writeBuffer)(r, u, void 0, e)), t.undoValue !== t._valueGet(!0) && (t.undoValue = t._valueGet(!0), a.trigger("change"))
                            }
                        },
                        mouseenterEvent: function() {
                            var e = this.inputmask,
                                t = e.opts,
                                i = this;
                            if (e.mouseEnter = !0, (i.inputmask.shadowRoot || i.ownerDocument).activeElement !== i) {
                                var a = (e.isRTL ? n.getBufferTemplate.call(e).slice().reverse() : n.getBufferTemplate.call(e)).join("");
                                e.placeholder !== a && i.placeholder !== e.originalPlaceholder && (e.originalPlaceholder = i.placeholder), t.showMaskOnHover && (0, l.HandleNativePlaceholder)(i, a)
                            }
                        },
                        submitEvent: function() {
                            var e = this.inputmask,
                                t = e.opts;
                            e.undoValue !== e._valueGet(!0) && e.$el.trigger("change"), -1 === n.getLastValidPosition.call(e) && e._valueGet && e._valueGet() === n.getBufferTemplate.call(e).join("") && e._valueSet(""), t.clearIncomplete && !1 === s.isComplete.call(e, n.getBuffer.call(e)) && e._valueSet(""), t.removeMaskOnSubmit && (e._valueSet(e.unmaskedvalue(), !0), setTimeout((function() {
                                (0, l.writeBuffer)(e.el, n.getBuffer.call(e))
                            }), 0))
                        },
                        resetEvent: function() {
                            var e = this.inputmask;
                            e.refreshValue = !0, setTimeout((function() {
                                (0, l.applyInputValue)(e.el, e._valueGet(!0))
                            }), 0)
                        }
                    };
                    t.EventHandlers = d
                },
                9716: function(e, t, i) {
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.EventRuler = void 0;
                    var a = s(i(2394)),
                        n = s(i(5581)),
                        r = i(8711),
                        o = i(7760);

                    function s(e) {
                        return e && e.__esModule ? e : {
                            default: e
                        }
                    }
                    var l = {
                        on: function(e, t, i) {
                            var s = e.inputmask.dependencyLib,
                                l = function(t) {
                                    t.originalEvent && (t = t.originalEvent || t, arguments[0] = t);
                                    var l, u = this,
                                        c = u.inputmask,
                                        f = c ? c.opts : void 0;
                                    if (void 0 === c && "FORM" !== this.nodeName) {
                                        var d = s.data(u, "_inputmask_opts");
                                        s(u).off(), d && new a.default(d).mask(u)
                                    } else {
                                        if (["submit", "reset", "setvalue"].includes(t.type) || "FORM" === this.nodeName || !(u.disabled || u.readOnly && !("keydown" === t.type && t.ctrlKey && 67 === t.keyCode || !1 === f.tabThrough && t.keyCode === n.default.TAB))) {
                                            switch (t.type) {
                                                case "input":
                                                    if (!0 === c.skipInputEvent || t.inputType && "insertCompositionText" === t.inputType) return c.skipInputEvent = !1, t.preventDefault();
                                                    break;
                                                case "keydown":
                                                    c.skipKeyPressEvent = !1, c.skipInputEvent = c.isComposing = t.keyCode === n.default.KEY_229;
                                                    break;
                                                case "keyup":
                                                case "compositionend":
                                                    c.isComposing && (c.skipInputEvent = !1);
                                                    break;
                                                case "keypress":
                                                    if (!0 === c.skipKeyPressEvent) return t.preventDefault();
                                                    c.skipKeyPressEvent = !0;
                                                    break;
                                                case "click":
                                                case "focus":
                                                    return c.validationEvent ? (c.validationEvent = !1, e.blur(), (0, o.HandleNativePlaceholder)(e, (c.isRTL ? r.getBufferTemplate.call(c).slice().reverse() : r.getBufferTemplate.call(c)).join("")), setTimeout((function() {
                                                        e.focus()
                                                    }), f.validationEventTimeOut), !1) : (l = arguments, setTimeout((function() {
                                                        e.inputmask && i.apply(u, l)
                                                    }), 0), !1)
                                            }
                                            var p = i.apply(u, arguments);
                                            return !1 === p && (t.preventDefault(), t.stopPropagation()), p
                                        }
                                        t.preventDefault()
                                    }
                                };
                            ["submit", "reset"].includes(t) ? (l = l.bind(e), null !== e.form && s(e.form).on(t, l)) : s(e).on(t, l), e.inputmask.events[t] = e.inputmask.events[t] || [], e.inputmask.events[t].push(l)
                        },
                        off: function(e, t) {
                            if (e.inputmask && e.inputmask.events) {
                                var i = e.inputmask.dependencyLib,
                                    a = e.inputmask.events;
                                for (var n in t && ((a = [])[t] = e.inputmask.events[t]), a) {
                                    for (var r = a[n]; r.length > 0;) {
                                        var o = r.pop();
                                        ["submit", "reset"].includes(n) ? null !== e.form && i(e.form).off(n, o) : i(e).off(n, o)
                                    }
                                    delete e.inputmask.events[n]
                                }
                            }
                        }
                    };
                    t.EventRuler = l
                },
                219: function(e, t, i) {
                    var a = c(i(2394)),
                        n = c(i(5581)),
                        r = c(i(7184)),
                        o = i(8711),
                        s = i(4713);

                    function l(e) {
                        return (l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                            return typeof e
                        } : function(e) {
                            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                        })(e)
                    }

                    function u(e, t) {
                        for (var i = 0; i < t.length; i++) {
                            var a = t[i];
                            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
                        }
                    }

                    function c(e) {
                        return e && e.__esModule ? e : {
                            default: e
                        }
                    }
                    var f = a.default.dependencyLib,
                        d = function() {
                            function e(t, i, a) {
                                ! function(e, t) {
                                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                                }(this, e), this.mask = t, this.format = i, this.opts = a, this._date = new Date(1, 0, 1), this.initDateObject(t, this.opts)
                            }
                            var t, i, a;
                            return t = e, (i = [{
                                key: "date",
                                get: function() {
                                    return void 0 === this._date && (this._date = new Date(1, 0, 1), this.initDateObject(void 0, this.opts)), this._date
                                }
                            }, {
                                key: "initDateObject",
                                value: function(e, t) {
                                    var i;
                                    for (b(t).lastIndex = 0; i = b(t).exec(this.format);) {
                                        var a = new RegExp("\\d+$").exec(i[0]),
                                            n = a ? i[0][0] + "x" : i[0],
                                            r = void 0;
                                        if (void 0 !== e) {
                                            if (a) {
                                                var o = b(t).lastIndex,
                                                    s = _(i.index, t);
                                                b(t).lastIndex = o, r = e.slice(0, e.indexOf(s.nextMatch[0]))
                                            } else r = e.slice(0, n.length);
                                            e = e.slice(r.length)
                                        }
                                        Object.prototype.hasOwnProperty.call(v, n) && this.setValue(this, r, n, v[n][2], v[n][1])
                                    }
                                }
                            }, {
                                key: "setValue",
                                value: function(e, t, i, a, n) {
                                    if (void 0 !== t && (e[a] = "ampm" === a ? t : t.replace(/[^0-9]/g, "0"), e["raw" + a] = t.replace(/\s/g, "_")), void 0 !== n) {
                                        var r = e[a];
                                        ("day" === a && 29 === parseInt(r) || "month" === a && 2 === parseInt(r)) && (29 !== parseInt(e.day) || 2 !== parseInt(e.month) || "" !== e.year && void 0 !== e.year || e._date.setFullYear(2012, 1, 29)), "day" === a && (h = !0, 0 === parseInt(r) && (r = 1)), "month" === a && (h = !0), "year" === a && (h = !0, r.length < 4 && (r = E(r, 4, !0))), "" === r || isNaN(r) || n.call(e._date, r), "ampm" === a && n.call(e._date, r)
                                    }
                                }
                            }, {
                                key: "reset",
                                value: function() {
                                    this._date = new Date(1, 0, 1)
                                }
                            }, {
                                key: "reInit",
                                value: function() {
                                    this._date = void 0, this.date
                                }
                            }]) && u(t.prototype, i), a && u(t, a), e
                        }(),
                        p = (new Date).getFullYear(),
                        h = !1,
                        v = {
                            d: ["[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", Date.prototype.getDate],
                            dd: ["0[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", function() {
                                return E(Date.prototype.getDate.call(this), 2)
                            }],
                            ddd: [""],
                            dddd: [""],
                            m: ["[1-9]|1[012]", function(e) {
                                var t = e ? parseInt(e) : 0;
                                return t > 0 && t--, Date.prototype.setMonth.call(this, t)
                            }, "month", function() {
                                return Date.prototype.getMonth.call(this) + 1
                            }],
                            mm: ["0[1-9]|1[012]", function(e) {
                                var t = e ? parseInt(e) : 0;
                                return t > 0 && t--, Date.prototype.setMonth.call(this, t)
                            }, "month", function() {
                                return E(Date.prototype.getMonth.call(this) + 1, 2)
                            }],
                            mmm: [""],
                            mmmm: [""],
                            yy: ["[0-9]{2}", Date.prototype.setFullYear, "year", function() {
                                return E(Date.prototype.getFullYear.call(this), 2)
                            }],
                            yyyy: ["[0-9]{4}", Date.prototype.setFullYear, "year", function() {
                                return E(Date.prototype.getFullYear.call(this), 4)
                            }],
                            h: ["[1-9]|1[0-2]", Date.prototype.setHours, "hours", Date.prototype.getHours],
                            hh: ["0[1-9]|1[0-2]", Date.prototype.setHours, "hours", function() {
                                return E(Date.prototype.getHours.call(this), 2)
                            }],
                            hx: [function(e) {
                                return "[0-9]{".concat(e, "}")
                            }, Date.prototype.setHours, "hours", function(e) {
                                return Date.prototype.getHours
                            }],
                            H: ["1?[0-9]|2[0-3]", Date.prototype.setHours, "hours", Date.prototype.getHours],
                            HH: ["0[0-9]|1[0-9]|2[0-3]", Date.prototype.setHours, "hours", function() {
                                return E(Date.prototype.getHours.call(this), 2)
                            }],
                            Hx: [function(e) {
                                return "[0-9]{".concat(e, "}")
                            }, Date.prototype.setHours, "hours", function(e) {
                                return function() {
                                    return E(Date.prototype.getHours.call(this), e)
                                }
                            }],
                            M: ["[1-5]?[0-9]", Date.prototype.setMinutes, "minutes", Date.prototype.getMinutes],
                            MM: ["0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setMinutes, "minutes", function() {
                                return E(Date.prototype.getMinutes.call(this), 2)
                            }],
                            s: ["[1-5]?[0-9]", Date.prototype.setSeconds, "seconds", Date.prototype.getSeconds],
                            ss: ["0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setSeconds, "seconds", function() {
                                return E(Date.prototype.getSeconds.call(this), 2)
                            }],
                            l: ["[0-9]{3}", Date.prototype.setMilliseconds, "milliseconds", function() {
                                return E(Date.prototype.getMilliseconds.call(this), 3)
                            }],
                            L: ["[0-9]{2}", Date.prototype.setMilliseconds, "milliseconds", function() {
                                return E(Date.prototype.getMilliseconds.call(this), 2)
                            }],
                            t: ["[ap]", g, "ampm", k, 1],
                            tt: ["[ap]m", g, "ampm", k, 2],
                            T: ["[AP]", g, "ampm", k, 1],
                            TT: ["[AP]M", g, "ampm", k, 2],
                            Z: [""],
                            o: [""],
                            S: [""]
                        },
                        m = {
                            isoDate: "yyyy-mm-dd",
                            isoTime: "HH:MM:ss",
                            isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
                            isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
                        };

                    function g(e) {
                        var t = this.getHours();
                        e.toLowerCase().includes("p") ? this.setHours(t + 12) : e.toLowerCase().includes("a") && t >= 12 && this.setHours(t - 12)
                    }

                    function k() {}

                    function y(e) {
                        var t = new RegExp("\\d+$").exec(e[0]);
                        if (t && void 0 !== t[0]) {
                            var i = v[e[0][0] + "x"].slice("");
                            return i[0] = i[0](t[0]), i[3] = i[3](t[0]), i
                        }
                        if (v[e[0]]) return v[e[0]]
                    }

                    function b(e) {
                        if (!e.tokenizer) {
                            var t = [],
                                i = [];
                            for (var a in v)
                                if (/\.*x$/.test(a)) {
                                    var n = a[0] + "\\d+"; - 1 === i.indexOf(n) && i.push(n)
                                } else - 1 === t.indexOf(a[0]) && t.push(a[0]);
                            e.tokenizer = "(" + (i.length > 0 ? i.join("|") + "|" : "") + t.join("+|") + ")+?|.", e.tokenizer = new RegExp(e.tokenizer, "g")
                        }
                        return e.tokenizer
                    }

                    function x(e, t, i) {
                        if (!h) return !0;
                        if (void 0 === e.rawday || !isFinite(e.rawday) && new Date(e.date.getFullYear(), isFinite(e.rawmonth) ? e.month : e.date.getMonth() + 1, 0).getDate() >= e.day || "29" == e.day && (!isFinite(e.rawyear) || void 0 === e.rawyear || "" === e.rawyear) || new Date(e.date.getFullYear(), isFinite(e.rawmonth) ? e.month : e.date.getMonth() + 1, 0).getDate() >= e.day) return t;
                        if ("29" == e.day) {
                            var a = _(t.pos, i);
                            if ("yyyy" === a.targetMatch[0] && t.pos - a.targetMatchIndex == 2) return t.remove = t.pos + 1, t
                        } else if ("02" == e.month && "30" == e.day && void 0 !== t.c) return e.day = "03", e.date.setDate(3), e.date.setMonth(1), t.insert = [{
                            pos: t.pos,
                            c: "0"
                        }, {
                            pos: t.pos + 1,
                            c: t.c
                        }], t.caret = o.seekNext.call(this, t.pos + 1), t;
                        return !1
                    }

                    function P(e, t, i, a) {
                        var n, o, s = "";
                        for (b(i).lastIndex = 0; n = b(i).exec(e);) {
                            if (void 0 === t)
                                if (o = y(n)) s += "(" + o[0] + ")";
                                else switch (n[0]) {
                                    case "[":
                                        s += "(";
                                        break;
                                    case "]":
                                        s += ")?";
                                        break;
                                    default:
                                        s += (0, r.default)(n[0])
                                } else if (o = y(n))
                                    if (!0 !== a && o[3]) s += o[3].call(t.date);
                                    else o[2] ? s += t["raw" + o[2]] : s += n[0];
                            else s += n[0]
                        }
                        return s
                    }

                    function E(e, t, i) {
                        for (e = String(e), t = t || 2; e.length < t;) e = i ? e + "0" : "0" + e;
                        return e
                    }

                    function S(e, t, i) {
                        return "string" == typeof e ? new d(e, t, i) : e && "object" === l(e) && Object.prototype.hasOwnProperty.call(e, "date") ? e : void 0
                    }

                    function w(e, t) {
                        return P(t.inputFormat, {
                            date: e
                        }, t)
                    }

                    function _(e, t) {
                        var i, a, n = 0,
                            r = 0;
                        for (b(t).lastIndex = 0; a = b(t).exec(t.inputFormat);) {
                            var o = new RegExp("\\d+$").exec(a[0]);
                            if ((n += r = o ? parseInt(o[0]) : a[0].length) >= e + 1) {
                                i = a, a = b(t).exec(t.inputFormat);
                                break
                            }
                        }
                        return {
                            targetMatchIndex: n - r,
                            nextMatch: a,
                            targetMatch: i
                        }
                    }
                    a.default.extendAliases({
                        datetime: {
                            mask: function(e) {
                                return e.numericInput = !1, v.S = e.i18n.ordinalSuffix.join("|"), e.inputFormat = m[e.inputFormat] || e.inputFormat, e.displayFormat = m[e.displayFormat] || e.displayFormat || e.inputFormat, e.outputFormat = m[e.outputFormat] || e.outputFormat || e.inputFormat, e.placeholder = "" !== e.placeholder ? e.placeholder : e.inputFormat.replace(/[[\]]/, ""), e.regex = P(e.inputFormat, void 0, e), e.min = S(e.min, e.inputFormat, e), e.max = S(e.max, e.inputFormat, e), null
                            },
                            placeholder: "",
                            inputFormat: "isoDateTime",
                            displayFormat: void 0,
                            outputFormat: void 0,
                            min: null,
                            max: null,
                            skipOptionalPartCharacter: "",
                            i18n: {
                                dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                                monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                                ordinalSuffix: ["st", "nd", "rd", "th"]
                            },
                            preValidation: function(e, t, i, a, n, r, o, s) {
                                if (s) return !0;
                                if (isNaN(i) && e[t] !== i) {
                                    var l = _(t, n);
                                    if (l.nextMatch && l.nextMatch[0] === i && l.targetMatch[0].length > 1) {
                                        var u = v[l.targetMatch[0]][0];
                                        if (new RegExp(u).test("0" + e[t - 1])) return e[t] = e[t - 1], e[t - 1] = "0", {
                                            fuzzy: !0,
                                            buffer: e,
                                            refreshFromBuffer: {
                                                start: t - 1,
                                                end: t + 1
                                            },
                                            pos: t + 1
                                        }
                                    }
                                }
                                return !0
                            },
                            postValidation: function(e, t, i, a, n, r, o, l) {
                                var u, c;
                                if (o) return !0;
                                if (!1 === a && (((u = _(t + 1, n)).targetMatch && u.targetMatchIndex === t && u.targetMatch[0].length > 1 && void 0 !== v[u.targetMatch[0]] || (u = _(t + 2, n)).targetMatch && u.targetMatchIndex === t + 1 && u.targetMatch[0].length > 1 && void 0 !== v[u.targetMatch[0]]) && (c = v[u.targetMatch[0]][0]), void 0 !== c && (void 0 !== r.validPositions[t + 1] && new RegExp(c).test(i + "0") ? (e[t] = i, e[t + 1] = "0", a = {
                                        pos: t + 2,
                                        caret: t
                                    }) : new RegExp(c).test("0" + i) && (e[t] = "0", e[t + 1] = i, a = {
                                        pos: t + 2
                                    })), !1 === a)) return a;
                                if (a.fuzzy && (e = a.buffer, t = a.pos), (u = _(t, n)).targetMatch && u.targetMatch[0] && void 0 !== v[u.targetMatch[0]]) {
                                    var f = v[u.targetMatch[0]];
                                    c = f[0];
                                    var d = e.slice(u.targetMatchIndex, u.targetMatchIndex + u.targetMatch[0].length);
                                    if (!1 === new RegExp(c).test(d.join("")) && 2 === u.targetMatch[0].length && r.validPositions[u.targetMatchIndex] && r.validPositions[u.targetMatchIndex + 1] && (r.validPositions[u.targetMatchIndex + 1].input = "0"), "year" == f[2])
                                        for (var h = s.getMaskTemplate.call(this, !1, 1, void 0, !0), m = t + 1; m < e.length; m++) e[m] = h[m], delete r.validPositions[m]
                                }
                                var g = a,
                                    k = S(e.join(""), n.inputFormat, n);
                                return g && k.date.getTime() == k.date.getTime() && (n.prefillYear && (g = function(e, t, i) {
                                    if (e.year !== e.rawyear) {
                                        var a = p.toString(),
                                            n = e.rawyear.replace(/[^0-9]/g, ""),
                                            r = a.slice(0, n.length),
                                            o = a.slice(n.length);
                                        if (2 === n.length && n === r) {
                                            var s = new Date(p, e.month - 1, e.day);
                                            e.day == s.getDate() && (!i.max || i.max.date.getTime() >= s.getTime()) && (e.date.setFullYear(p), e.year = a, t.insert = [{
                                                pos: t.pos + 1,
                                                c: o[0]
                                            }, {
                                                pos: t.pos + 2,
                                                c: o[1]
                                            }])
                                        }
                                    }
                                    return t
                                }(k, g, n)), g = function(e, t, i, a, n) {
                                    if (!t) return t;
                                    if (t && i.min && i.min.date.getTime() == i.min.date.getTime()) {
                                        var r;
                                        for (e.reset(), b(i).lastIndex = 0; r = b(i).exec(i.inputFormat);) {
                                            var o;
                                            if ((o = y(r)) && o[3]) {
                                                for (var s = o[1], l = e[o[2]], u = i.min[o[2]], c = i.max ? i.max[o[2]] : u, f = [], d = !1, p = 0; p < u.length; p++) void 0 !== a.validPositions[p + r.index] || d ? (f[p] = l[p], d = d || l[p] > u[p]) : (f[p] = u[p], "year" === o[2] && l.length - 1 == p && u != c && (f = (parseInt(f.join("")) + 1).toString().split("")), "ampm" === o[2] && u != c && i.min.date.getTime() > e.date.getTime() && (f[p] = c[p]));
                                                s.call(e._date, f.join(""))
                                            }
                                        }
                                        t = i.min.date.getTime() <= e.date.getTime(), e.reInit()
                                    }
                                    return t && i.max && i.max.date.getTime() == i.max.date.getTime() && (t = i.max.date.getTime() >= e.date.getTime()), t
                                }(k, g = x.call(this, k, g, n), n, r)), void 0 !== t && g && a.pos !== t ? {
                                    buffer: P(n.inputFormat, k, n).split(""),
                                    refreshFromBuffer: {
                                        start: t,
                                        end: a.pos
                                    },
                                    pos: a.caret || a.pos
                                } : g
                            },
                            onKeyDown: function(e, t, i, a) {
                                e.ctrlKey && e.keyCode === n.default.RIGHT && (this.inputmask._valueSet(w(new Date, a)), f(this).trigger("setvalue"))
                            },
                            onUnMask: function(e, t, i) {
                                return t ? P(i.outputFormat, S(e, i.inputFormat, i), i, !0) : t
                            },
                            casing: function(e, t, i, a) {
                                return 0 == t.nativeDef.indexOf("[ap]") ? e.toLowerCase() : 0 == t.nativeDef.indexOf("[AP]") ? e.toUpperCase() : e
                            },
                            onBeforeMask: function(e, t) {
                                return "[object Date]" === Object.prototype.toString.call(e) && (e = w(e, t)), e
                            },
                            insertMode: !1,
                            shiftPositions: !1,
                            keepStatic: !1,
                            inputmode: "numeric",
                            prefillYear: !0
                        }
                    })
                },
                3851: function(e, t, i) {
                    var a, n = (a = i(2394)) && a.__esModule ? a : {
                            default: a
                        },
                        r = i(8711),
                        o = i(4713);
                    n.default.extendDefinitions({
                        A: {
                            validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                            casing: "upper"
                        },
                        "&": {
                            validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                            casing: "upper"
                        },
                        "#": {
                            validator: "[0-9A-Fa-f]",
                            casing: "upper"
                        }
                    });
                    var s = new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]");

                    function l(e, t, i, a, n) {
                        return i - 1 > -1 && "." !== t.buffer[i - 1] ? (e = t.buffer[i - 1] + e, e = i - 2 > -1 && "." !== t.buffer[i - 2] ? t.buffer[i - 2] + e : "0" + e) : e = "00" + e, s.test(e)
                    }
                    n.default.extendAliases({
                        cssunit: {
                            regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"
                        },
                        url: {
                            regex: "(https?|ftp)://.*",
                            autoUnmask: !1,
                            keepStatic: !1,
                            tabThrough: !0
                        },
                        ip: {
                            mask: "i[i[i]].j[j[j]].k[k[k]].l[l[l]]",
                            definitions: {
                                i: {
                                    validator: l
                                },
                                j: {
                                    validator: l
                                },
                                k: {
                                    validator: l
                                },
                                l: {
                                    validator: l
                                }
                            },
                            onUnMask: function(e, t, i) {
                                return e
                            },
                            inputmode: "numeric"
                        },
                        email: {
                            mask: function(e) {
                                var t = "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]";
                                return void 0 !== e.separator ? "".concat(t, "(").concat(e.separator).concat(t, "){*}") : t
                            },
                            greedy: !1,
                            casing: "lower",
                            separator: void 0,
                            skipOptionalPartCharacter: "",
                            onBeforePaste: function(e, t) {
                                return (e = e.toLowerCase()).replace("mailto:", "")
                            },
                            definitions: {
                                "*": {
                                    validator: "[0-9\uff11-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5!#$%&'*+/=?^_`{|}~-]"
                                },
                                "-": {
                                    validator: "[0-9A-Za-z-]"
                                }
                            },
                            onUnMask: function(e, t, i) {
                                return e
                            },
                            inputmode: "email"
                        },
                        mac: {
                            mask: "##:##:##:##:##:##"
                        },
                        vin: {
                            mask: "V{13}9{4}",
                            definitions: {
                                V: {
                                    validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
                                    casing: "upper"
                                }
                            },
                            clearIncomplete: !0,
                            autoUnmask: !0
                        },
                        ssn: {
                            mask: "999-99-9999",
                            postValidation: function(e, t, i, a, n, s, l) {
                                var u = o.getMaskTemplate.call(this, !0, r.getLastValidPosition.call(this), !0, !0);
                                return /^(?!219-09-9999|078-05-1120)(?!666|000|9.{2}).{3}-(?!00).{2}-(?!0{4}).{4}$/.test(u.join(""))
                            }
                        }
                    })
                },
                207: function(e, t, i) {
                    var a = s(i(2394)),
                        n = s(i(5581)),
                        r = s(i(7184)),
                        o = i(8711);

                    function s(e) {
                        return e && e.__esModule ? e : {
                            default: e
                        }
                    }
                    var l = a.default.dependencyLib;

                    function u(e, t) {
                        for (var i = "", n = 0; n < e.length; n++) a.default.prototype.definitions[e.charAt(n)] || t.definitions[e.charAt(n)] || t.optionalmarker[0] === e.charAt(n) || t.optionalmarker[1] === e.charAt(n) || t.quantifiermarker[0] === e.charAt(n) || t.quantifiermarker[1] === e.charAt(n) || t.groupmarker[0] === e.charAt(n) || t.groupmarker[1] === e.charAt(n) || t.alternatormarker === e.charAt(n) ? i += "\\" + e.charAt(n) : i += e.charAt(n);
                        return i
                    }

                    function c(e, t, i, a) {
                        if (e.length > 0 && t > 0 && (!i.digitsOptional || a)) {
                            var n = e.indexOf(i.radixPoint),
                                r = !1;
                            i.negationSymbol.back === e[e.length - 1] && (r = !0, e.length--), -1 === n && (e.push(i.radixPoint), n = e.length - 1);
                            for (var o = 1; o <= t; o++) isFinite(e[n + o]) || (e[n + o] = "0")
                        }
                        return r && e.push(i.negationSymbol.back), e
                    }

                    function f(e, t) {
                        var i = 0;
                        if ("+" === e) {
                            for (i in t.validPositions);
                            i = o.seekNext.call(this, parseInt(i))
                        }
                        for (var a in t.tests)
                            if ((a = parseInt(a)) >= i)
                                for (var n = 0, r = t.tests[a].length; n < r; n++)
                                    if ((void 0 === t.validPositions[a] || "-" === e) && t.tests[a][n].match.def === e) return a + (void 0 !== t.validPositions[a] && "-" !== e ? 1 : 0);
                        return i
                    }

                    function d(e, t) {
                        var i = -1;
                        for (var a in t.validPositions) {
                            var n = t.validPositions[a];
                            if (n && n.match.def === e) {
                                i = parseInt(a);
                                break
                            }
                        }
                        return i
                    }

                    function p(e, t, i, a, n) {
                        var r = t.buffer ? t.buffer.indexOf(n.radixPoint) : -1,
                            o = (-1 !== r || a && n.jitMasking) && new RegExp(n.definitions[9].validator).test(e);
                        return n._radixDance && -1 !== r && o && null == t.validPositions[r] ? {
                            insert: {
                                pos: r === i ? r + 1 : r,
                                c: n.radixPoint
                            },
                            pos: i
                        } : o
                    }
                    a.default.extendAliases({
                        numeric: {
                            mask: function(e) {
                                e.repeat = 0, e.groupSeparator === e.radixPoint && e.digits && "0" !== e.digits && ("." === e.radixPoint ? e.groupSeparator = "," : "," === e.radixPoint ? e.groupSeparator = "." : e.groupSeparator = ""), " " === e.groupSeparator && (e.skipOptionalPartCharacter = void 0), e.placeholder.length > 1 && (e.placeholder = e.placeholder.charAt(0)), "radixFocus" === e.positionCaretOnClick && "" === e.placeholder && (e.positionCaretOnClick = "lvp");
                                var t = "0",
                                    i = e.radixPoint;
                                !0 === e.numericInput && void 0 === e.__financeInput ? (t = "1", e.positionCaretOnClick = "radixFocus" === e.positionCaretOnClick ? "lvp" : e.positionCaretOnClick, e.digitsOptional = !1, isNaN(e.digits) && (e.digits = 2), e._radixDance = !1, i = "," === e.radixPoint ? "?" : "!", "" !== e.radixPoint && void 0 === e.definitions[i] && (e.definitions[i] = {}, e.definitions[i].validator = "[" + e.radixPoint + "]", e.definitions[i].placeholder = e.radixPoint, e.definitions[i].static = !0, e.definitions[i].generated = !0)) : (e.__financeInput = !1, e.numericInput = !0);
                                var a, n = "[+]";
                                if (n += u(e.prefix, e), "" !== e.groupSeparator ? (void 0 === e.definitions[e.groupSeparator] && (e.definitions[e.groupSeparator] = {}, e.definitions[e.groupSeparator].validator = "[" + e.groupSeparator + "]", e.definitions[e.groupSeparator].placeholder = e.groupSeparator, e.definitions[e.groupSeparator].static = !0, e.definitions[e.groupSeparator].generated = !0), n += e._mask(e)) : n += "9{+}", void 0 !== e.digits && 0 !== e.digits) {
                                    var o = e.digits.toString().split(",");
                                    isFinite(o[0]) && o[1] && isFinite(o[1]) ? n += i + t + "{" + e.digits + "}" : (isNaN(e.digits) || parseInt(e.digits) > 0) && (e.digitsOptional || e.jitMasking ? (a = n + i + t + "{0," + e.digits + "}", e.keepStatic = !0) : n += i + t + "{" + e.digits + "}")
                                } else e.inputmode = "numeric";
                                return n += u(e.suffix, e), n += "[-]", a && (n = [a + u(e.suffix, e) + "[-]", n]), e.greedy = !1,
                                    function(e) {
                                        void 0 === e.parseMinMaxOptions && (null !== e.min && (e.min = e.min.toString().replace(new RegExp((0, r.default)(e.groupSeparator), "g"), ""), "," === e.radixPoint && (e.min = e.min.replace(e.radixPoint, ".")), e.min = isFinite(e.min) ? parseFloat(e.min) : NaN, isNaN(e.min) && (e.min = Number.MIN_VALUE)), null !== e.max && (e.max = e.max.toString().replace(new RegExp((0, r.default)(e.groupSeparator), "g"), ""), "," === e.radixPoint && (e.max = e.max.replace(e.radixPoint, ".")), e.max = isFinite(e.max) ? parseFloat(e.max) : NaN, isNaN(e.max) && (e.max = Number.MAX_VALUE)), e.parseMinMaxOptions = "done")
                                    }(e), "" !== e.radixPoint && (e.substitutes["." == e.radixPoint ? "," : "."] = e.radixPoint), n
                            },
                            _mask: function(e) {
                                return "(" + e.groupSeparator + "999){+|1}"
                            },
                            digits: "*",
                            digitsOptional: !0,
                            enforceDigitsOnBlur: !1,
                            radixPoint: ".",
                            positionCaretOnClick: "radixFocus",
                            _radixDance: !0,
                            groupSeparator: "",
                            allowMinus: !0,
                            negationSymbol: {
                                front: "-",
                                back: ""
                            },
                            prefix: "",
                            suffix: "",
                            min: null,
                            max: null,
                            SetMaxOnOverflow: !1,
                            step: 1,
                            inputType: "text",
                            unmaskAsNumber: !1,
                            roundingFN: Math.round,
                            inputmode: "decimal",
                            shortcuts: {
                                k: "000",
                                m: "000000"
                            },
                            placeholder: "0",
                            greedy: !1,
                            rightAlign: !0,
                            insertMode: !0,
                            autoUnmask: !1,
                            skipOptionalPartCharacter: "",
                            usePrototypeDefinitions: !1,
                            definitions: {
                                0: {
                                    validator: p
                                },
                                1: {
                                    validator: p,
                                    definitionSymbol: "9"
                                },
                                9: {
                                    validator: "[0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]",
                                    definitionSymbol: "*"
                                },
                                "+": {
                                    validator: function(e, t, i, a, n) {
                                        return n.allowMinus && ("-" === e || e === n.negationSymbol.front)
                                    }
                                },
                                "-": {
                                    validator: function(e, t, i, a, n) {
                                        return n.allowMinus && e === n.negationSymbol.back
                                    }
                                }
                            },
                            preValidation: function(e, t, i, a, n, r, o, s) {
                                var l;
                                if (!1 !== n.__financeInput && i === n.radixPoint) return !1;
                                if (l = n.shortcuts && n.shortcuts[i]) {
                                    if (l.length > 1)
                                        for (var u = [], c = 0; c < l.length; c++) u.push({
                                            pos: t + c,
                                            c: l[c],
                                            strict: !1
                                        });
                                    return {
                                        insert: u
                                    }
                                }
                                var p = e.indexOf(n.radixPoint),
                                    h = t;
                                if (t = function(e, t, i, a, n) {
                                        return n._radixDance && n.numericInput && t !== n.negationSymbol.back && e <= i && (i > 0 || t == n.radixPoint) && (void 0 === a.validPositions[e - 1] || a.validPositions[e - 1].input !== n.negationSymbol.back) && (e -= 1), e
                                    }(t, i, p, r, n), "-" === i || i === n.negationSymbol.front) {
                                    if (!0 !== n.allowMinus) return !1;
                                    var v = !1,
                                        m = d("+", r),
                                        g = d("-", r);
                                    return -1 !== m && (v = [m, g]), !1 !== v ? {
                                        remove: v,
                                        caret: h - n.negationSymbol.back.length
                                    } : {
                                        insert: [{
                                            pos: f.call(this, "+", r),
                                            c: n.negationSymbol.front,
                                            fromIsValid: !0
                                        }, {
                                            pos: f.call(this, "-", r),
                                            c: n.negationSymbol.back,
                                            fromIsValid: void 0
                                        }],
                                        caret: h + n.negationSymbol.back.length
                                    }
                                }
                                if (i === n.groupSeparator) return {
                                    caret: h
                                };
                                if (s) return !0;
                                if (-1 !== p && !0 === n._radixDance && !1 === a && i === n.radixPoint && void 0 !== n.digits && (isNaN(n.digits) || parseInt(n.digits) > 0) && p !== t) return {
                                    caret: n._radixDance && t === p - 1 ? p + 1 : p
                                };
                                if (!1 === n.__financeInput)
                                    if (a) {
                                        if (n.digitsOptional) return {
                                            rewritePosition: o.end
                                        };
                                        if (!n.digitsOptional) {
                                            if (o.begin > p && o.end <= p) return i === n.radixPoint ? {
                                                insert: {
                                                    pos: p + 1,
                                                    c: "0",
                                                    fromIsValid: !0
                                                },
                                                rewritePosition: p
                                            } : {
                                                rewritePosition: p + 1
                                            };
                                            if (o.begin < p) return {
                                                rewritePosition: o.begin - 1
                                            }
                                        }
                                    } else if (!n.showMaskOnHover && !n.showMaskOnFocus && !n.digitsOptional && n.digits > 0 && "" === this.__valueGet.call(this.el)) return {
                                    rewritePosition: p
                                };
                                return {
                                    rewritePosition: t
                                }
                            },
                            postValidation: function(e, t, i, a, n, r, o) {
                                if (!1 === a) return a;
                                if (o) return !0;
                                if (null !== n.min || null !== n.max) {
                                    var s = n.onUnMask(e.slice().reverse().join(""), void 0, l.extend({}, n, {
                                        unmaskAsNumber: !0
                                    }));
                                    if (null !== n.min && s < n.min && (s.toString().length > n.min.toString().length || s < 0)) return !1;
                                    if (null !== n.max && s > n.max) return !!n.SetMaxOnOverflow && {
                                        refreshFromBuffer: !0,
                                        buffer: c(n.max.toString().replace(".", n.radixPoint).split(""), n.digits, n).reverse()
                                    }
                                }
                                return a
                            },
                            onUnMask: function(e, t, i) {
                                if ("" === t && !0 === i.nullable) return t;
                                var a = e.replace(i.prefix, "");
                                return a = (a = a.replace(i.suffix, "")).replace(new RegExp((0, r.default)(i.groupSeparator), "g"), ""), "" !== i.placeholder.charAt(0) && (a = a.replace(new RegExp(i.placeholder.charAt(0), "g"), "0")), i.unmaskAsNumber ? ("" !== i.radixPoint && -1 !== a.indexOf(i.radixPoint) && (a = a.replace(r.default.call(this, i.radixPoint), ".")), a = (a = a.replace(new RegExp("^" + (0, r.default)(i.negationSymbol.front)), "-")).replace(new RegExp((0, r.default)(i.negationSymbol.back) + "$"), ""), Number(a)) : a
                            },
                            isComplete: function(e, t) {
                                var i = (t.numericInput ? e.slice().reverse() : e).join("");
                                return i = (i = (i = (i = (i = i.replace(new RegExp("^" + (0, r.default)(t.negationSymbol.front)), "-")).replace(new RegExp((0, r.default)(t.negationSymbol.back) + "$"), "")).replace(t.prefix, "")).replace(t.suffix, "")).replace(new RegExp((0, r.default)(t.groupSeparator) + "([0-9]{3})", "g"), "$1"), "," === t.radixPoint && (i = i.replace((0, r.default)(t.radixPoint), ".")), isFinite(i)
                            },
                            onBeforeMask: function(e, t) {
                                var i = t.radixPoint || ",";
                                isFinite(t.digits) && (t.digits = parseInt(t.digits)), "number" != typeof e && "number" !== t.inputType || "" === i || (e = e.toString().replace(".", i));
                                var a = "-" === e.charAt(0) || e.charAt(0) === t.negationSymbol.front,
                                    n = e.split(i),
                                    o = n[0].replace(/[^\-0-9]/g, ""),
                                    s = n.length > 1 ? n[1].replace(/[^0-9]/g, "") : "",
                                    l = n.length > 1;
                                e = o + ("" !== s ? i + s : s);
                                var u = 0;
                                if ("" !== i && (u = t.digitsOptional ? t.digits < s.length ? t.digits : s.length : t.digits, "" !== s || !t.digitsOptional)) {
                                    var f = Math.pow(10, u || 1);
                                    e = e.replace((0, r.default)(i), "."), isNaN(parseFloat(e)) || (e = (t.roundingFN(parseFloat(e) * f) / f).toFixed(u)), e = e.toString().replace(".", i)
                                }
                                if (0 === t.digits && -1 !== e.indexOf(i) && (e = e.substring(0, e.indexOf(i))), null !== t.min || null !== t.max) {
                                    var d = e.toString().replace(i, ".");
                                    null !== t.min && d < t.min ? e = t.min.toString().replace(".", i) : null !== t.max && d > t.max && (e = t.max.toString().replace(".", i))
                                }
                                return a && "-" !== e.charAt(0) && (e = "-" + e), c(e.toString().split(""), u, t, l).join("")
                            },
                            onBeforeWrite: function(e, t, i, a) {
                                function n(e, t) {
                                    if (!1 !== a.__financeInput || t) {
                                        var i = e.indexOf(a.radixPoint); - 1 !== i && e.splice(i, 1)
                                    }
                                    if ("" !== a.groupSeparator)
                                        for (; - 1 !== (i = e.indexOf(a.groupSeparator));) e.splice(i, 1);
                                    return e
                                }
                                var o, s = function(e, t) {
                                    var i = new RegExp("(^" + ("" !== t.negationSymbol.front ? (0, r.default)(t.negationSymbol.front) + "?" : "") + (0, r.default)(t.prefix) + ")(.*)(" + (0, r.default)(t.suffix) + ("" != t.negationSymbol.back ? (0, r.default)(t.negationSymbol.back) + "?" : "") + "$)").exec(e.slice().reverse().join("")),
                                        a = i ? i[2] : "",
                                        n = !1;
                                    return a && (a = a.split(t.radixPoint.charAt(0))[0], n = new RegExp("^[0" + t.groupSeparator + "]*").exec(a)), !(!n || !(n[0].length > 1 || n[0].length > 0 && n[0].length < a.length)) && n
                                }(t, a);
                                if (s)
                                    for (var u = t.join("").lastIndexOf(s[0].split("").reverse().join("")) - (s[0] == s.input ? 0 : 1), f = s[0] == s.input ? 1 : 0, d = s[0].length - f; d > 0; d--) delete this.maskset.validPositions[u + d], delete t[u + d];
                                if (e) switch (e.type) {
                                    case "blur":
                                    case "checkval":
                                        if (null !== a.min) {
                                            var p = a.onUnMask(t.slice().reverse().join(""), void 0, l.extend({}, a, {
                                                unmaskAsNumber: !0
                                            }));
                                            if (null !== a.min && p < a.min) return {
                                                refreshFromBuffer: !0,
                                                buffer: c(a.min.toString().replace(".", a.radixPoint).split(""), a.digits, a).reverse()
                                            }
                                        }
                                        if (t[t.length - 1] === a.negationSymbol.front) {
                                            var h = new RegExp("(^" + ("" != a.negationSymbol.front ? (0, r.default)(a.negationSymbol.front) + "?" : "") + (0, r.default)(a.prefix) + ")(.*)(" + (0, r.default)(a.suffix) + ("" != a.negationSymbol.back ? (0, r.default)(a.negationSymbol.back) + "?" : "") + "$)").exec(n(t.slice(), !0).reverse().join(""));
                                            0 == (h ? h[2] : "") && (o = {
                                                refreshFromBuffer: !0,
                                                buffer: [0]
                                            })
                                        } else if ("" !== a.radixPoint) {
                                            t.indexOf(a.radixPoint) === a.suffix.length && (o && o.buffer ? o.buffer.splice(0, 1 + a.suffix.length) : (t.splice(0, 1 + a.suffix.length), o = {
                                                refreshFromBuffer: !0,
                                                buffer: n(t)
                                            }))
                                        }
                                        if (a.enforceDigitsOnBlur) {
                                            var v = (o = o || {}) && o.buffer || t.slice().reverse();
                                            o.refreshFromBuffer = !0, o.buffer = c(v, a.digits, a, !0).reverse()
                                        }
                                }
                                return o
                            },
                            onKeyDown: function(e, t, i, a) {
                                var r, o = l(this);
                                if (e.ctrlKey) switch (e.keyCode) {
                                    case n.default.UP:
                                        return this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) + parseInt(a.step)), o.trigger("setvalue"), !1;
                                    case n.default.DOWN:
                                        return this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) - parseInt(a.step)), o.trigger("setvalue"), !1
                                }
                                if (!e.shiftKey && (e.keyCode === n.default.DELETE || e.keyCode === n.default.BACKSPACE || e.keyCode === n.default.BACKSPACE_SAFARI) && i.begin !== t.length) {
                                    if (t[e.keyCode === n.default.DELETE ? i.begin - 1 : i.end] === a.negationSymbol.front) return r = t.slice().reverse(), "" !== a.negationSymbol.front && r.shift(), "" !== a.negationSymbol.back && r.pop(), o.trigger("setvalue", [r.join(""), i.begin]), !1;
                                    if (!0 === a._radixDance) {
                                        var s = t.indexOf(a.radixPoint);
                                        if (a.digitsOptional) {
                                            if (0 === s) return (r = t.slice().reverse()).pop(), o.trigger("setvalue", [r.join(""), i.begin >= r.length ? r.length : i.begin]), !1
                                        } else if (-1 !== s && (i.begin < s || i.end < s || e.keyCode === n.default.DELETE && i.begin === s)) return i.begin !== i.end || e.keyCode !== n.default.BACKSPACE && e.keyCode !== n.default.BACKSPACE_SAFARI || i.begin++, (r = t.slice().reverse()).splice(r.length - i.begin, i.begin - i.end + 1), r = c(r, a.digits, a).join(""), o.trigger("setvalue", [r, i.begin >= r.length ? s + 1 : i.begin]), !1
                                    }
                                }
                            }
                        },
                        currency: {
                            prefix: "",
                            groupSeparator: ",",
                            alias: "numeric",
                            digits: 2,
                            digitsOptional: !1
                        },
                        decimal: {
                            alias: "numeric"
                        },
                        integer: {
                            alias: "numeric",
                            inputmode: "numeric",
                            digits: 0
                        },
                        percentage: {
                            alias: "numeric",
                            min: 0,
                            max: 100,
                            suffix: " %",
                            digits: 0,
                            allowMinus: !1
                        },
                        indianns: {
                            alias: "numeric",
                            _mask: function(e) {
                                return "(" + e.groupSeparator + "99){*|1}(" + e.groupSeparator + "999){1|1}"
                            },
                            groupSeparator: ",",
                            radixPoint: ".",
                            placeholder: "0",
                            digits: 2,
                            digitsOptional: !1
                        }
                    })
                },
                9380: function(e, t, i) {
                    var a;
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.default = void 0;
                    var n = ((a = i(8741)) && a.__esModule ? a : {
                        default: a
                    }).default ? window : {};
                    t.default = n
                },
                7760: function(e, t, i) {
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.applyInputValue = c, t.clearOptionalTail = f, t.checkVal = d, t.HandleNativePlaceholder = function(e, t) {
                        var i = e ? e.inputmask : this;
                        if (l.ie) {
                            if (e.inputmask._valueGet() !== t && (e.placeholder !== t || "" === e.placeholder)) {
                                var a = o.getBuffer.call(i).slice(),
                                    n = e.inputmask._valueGet();
                                if (n !== t) {
                                    var r = o.getLastValidPosition.call(i); - 1 === r && n === o.getBufferTemplate.call(i).join("") ? a = [] : -1 !== r && f.call(i, a), p(e, a)
                                }
                            }
                        } else e.placeholder !== t && (e.placeholder = t, "" === e.placeholder && e.removeAttribute("placeholder"))
                    }, t.unmaskedvalue = function(e) {
                        var t = e ? e.inputmask : this,
                            i = t.opts,
                            a = t.maskset;
                        if (e) {
                            if (void 0 === e.inputmask) return e.value;
                            e.inputmask && e.inputmask.refreshValue && c(e, e.inputmask._valueGet(!0))
                        }
                        var n = [],
                            r = a.validPositions;
                        for (var s in r) r[s] && r[s].match && (1 != r[s].match.static || Array.isArray(a.metadata) && !0 !== r[s].generatedInput) && n.push(r[s].input);
                        var l = 0 === n.length ? "" : (t.isRTL ? n.reverse() : n).join("");
                        if ("function" == typeof i.onUnMask) {
                            var u = (t.isRTL ? o.getBuffer.call(t).slice().reverse() : o.getBuffer.call(t)).join("");
                            l = i.onUnMask.call(t, u, l, i)
                        }
                        return l
                    }, t.writeBuffer = p;
                    var a, n = (a = i(5581)) && a.__esModule ? a : {
                            default: a
                        },
                        r = i(4713),
                        o = i(8711),
                        s = i(7215),
                        l = i(9845),
                        u = i(6030);

                    function c(e, t) {
                        var i = e ? e.inputmask : this,
                            a = i.opts;
                        e.inputmask.refreshValue = !1, "function" == typeof a.onBeforeMask && (t = a.onBeforeMask.call(i, t, a) || t), d(e, !0, !1, t = t.toString().split("")), i.undoValue = i._valueGet(!0), (a.clearMaskOnLostFocus || a.clearIncomplete) && e.inputmask._valueGet() === o.getBufferTemplate.call(i).join("") && -1 === o.getLastValidPosition.call(i) && e.inputmask._valueSet("")
                    }

                    function f(e) {
                        e.length = 0;
                        for (var t, i = r.getMaskTemplate.call(this, !0, 0, !0, void 0, !0); void 0 !== (t = i.shift());) e.push(t);
                        return e
                    }

                    function d(e, t, i, a, n) {
                        var l = e ? e.inputmask : this,
                            c = l.maskset,
                            f = l.opts,
                            d = l.dependencyLib,
                            h = a.slice(),
                            v = "",
                            m = -1,
                            g = void 0,
                            k = f.skipOptionalPartCharacter;
                        f.skipOptionalPartCharacter = "", o.resetMaskSet.call(l), c.tests = {}, m = f.radixPoint ? o.determineNewCaretPosition.call(l, {
                            begin: 0,
                            end: 0
                        }, !1, !1 === f.__financeInput ? "radixFocus" : void 0).begin : 0, c.p = m, l.caretPos = {
                            begin: m
                        };
                        var y = [],
                            b = l.caretPos;
                        if (h.forEach((function(e, t) {
                                if (void 0 !== e) {
                                    var a = new d.Event("_checkval");
                                    a.keyCode = e.toString().charCodeAt(0), v += e;
                                    var n = o.getLastValidPosition.call(l, void 0, !0);
                                    ! function(e, t) {
                                        for (var i = r.getMaskTemplate.call(l, !0, 0).slice(e, o.seekNext.call(l, e, !1, !1)).join("").replace(/'/g, ""), a = i.indexOf(t); a > 0 && " " === i[a - 1];) a--;
                                        var n = 0 === a && !o.isMask.call(l, e) && (r.getTest.call(l, e).match.nativeDef === t.charAt(0) || !0 === r.getTest.call(l, e).match.static && r.getTest.call(l, e).match.nativeDef === "'" + t.charAt(0) || " " === r.getTest.call(l, e).match.nativeDef && (r.getTest.call(l, e + 1).match.nativeDef === t.charAt(0) || !0 === r.getTest.call(l, e + 1).match.static && r.getTest.call(l, e + 1).match.nativeDef === "'" + t.charAt(0)));
                                        if (!n && a > 0 && !o.isMask.call(l, e, !1, !0)) {
                                            var s = o.seekNext.call(l, e);
                                            l.caretPos.begin < s && (l.caretPos = {
                                                begin: s
                                            })
                                        }
                                        return n
                                    }(m, v) ? (g = u.EventHandlers.keypressEvent.call(l, a, !0, !1, i, l.caretPos.begin)) && (m = l.caretPos.begin + 1, v = "") : g = u.EventHandlers.keypressEvent.call(l, a, !0, !1, i, n + 1), g ? (void 0 !== g.pos && c.validPositions[g.pos] && !0 === c.validPositions[g.pos].match.static && void 0 === c.validPositions[g.pos].alternation && (y.push(g.pos), l.isRTL || (g.forwardPosition = g.pos + 1)), p.call(l, void 0, o.getBuffer.call(l), g.forwardPosition, a, !1), l.caretPos = {
                                        begin: g.forwardPosition,
                                        end: g.forwardPosition
                                    }, b = l.caretPos) : void 0 === c.validPositions[t] && h[t] === r.getPlaceholder.call(l, t) && o.isMask.call(l, t, !0) ? l.caretPos.begin++ : l.caretPos = b
                                }
                            })), y.length > 0) {
                            var x, P, E = o.seekNext.call(l, -1, void 0, !1);
                            if (!s.isComplete.call(l, o.getBuffer.call(l)) && y.length <= E || s.isComplete.call(l, o.getBuffer.call(l)) && y.length > 0 && y.length !== E && 0 === y[0])
                                for (var S = E; void 0 !== (x = y.shift());) {
                                    var w = new d.Event("_checkval");
                                    if ((P = c.validPositions[x]).generatedInput = !0, w.keyCode = P.input.charCodeAt(0), (g = u.EventHandlers.keypressEvent.call(l, w, !0, !1, i, S)) && void 0 !== g.pos && g.pos !== x && c.validPositions[g.pos] && !0 === c.validPositions[g.pos].match.static) y.push(g.pos);
                                    else if (!g) break;
                                    S++
                                }
                        }
                        t && p.call(l, e, o.getBuffer.call(l), g ? g.forwardPosition : l.caretPos.begin, n || new d.Event("checkval"), n && ("input" === n.type && l.undoValue !== o.getBuffer.call(l).join("") || "paste" === n.type)), f.skipOptionalPartCharacter = k
                    }

                    function p(e, t, i, a, r) {
                        var l = e ? e.inputmask : this,
                            u = l.opts,
                            c = l.dependencyLib;
                        if (a && "function" == typeof u.onBeforeWrite) {
                            var f = u.onBeforeWrite.call(l, a, t, i, u);
                            if (f) {
                                if (f.refreshFromBuffer) {
                                    var d = f.refreshFromBuffer;
                                    s.refreshFromBuffer.call(l, !0 === d ? d : d.start, d.end, f.buffer || t), t = o.getBuffer.call(l, !0)
                                }
                                void 0 !== i && (i = void 0 !== f.caret ? f.caret : i)
                            }
                        }
                        if (void 0 !== e && (e.inputmask._valueSet(t.join("")), void 0 === i || void 0 !== a && "blur" === a.type || o.caret.call(l, e, i, void 0, void 0, void 0 !== a && "keydown" === a.type && (a.keyCode === n.default.DELETE || a.keyCode === n.default.BACKSPACE)), !0 === r)) {
                            var p = c(e),
                                h = e.inputmask._valueGet();
                            e.inputmask.skipInputEvent = !0, p.trigger("input"), setTimeout((function() {
                                h === o.getBufferTemplate.call(l).join("") ? p.trigger("cleared") : !0 === s.isComplete.call(l, t) && p.trigger("complete")
                            }), 0)
                        }
                    }
                },
                2394: function(e, t, i) {
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.default = void 0, i(7149), i(3194);
                    var a = i(157),
                        n = m(i(3287)),
                        r = m(i(9380)),
                        o = i(2391),
                        s = i(4713),
                        l = i(8711),
                        u = i(7215),
                        c = i(7760),
                        f = i(9716),
                        d = m(i(7392)),
                        p = m(i(3976)),
                        h = m(i(8741));

                    function v(e) {
                        return (v = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                            return typeof e
                        } : function(e) {
                            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                        })(e)
                    }

                    function m(e) {
                        return e && e.__esModule ? e : {
                            default: e
                        }
                    }
                    var g = r.default.document,
                        k = "_inputmask_opts";

                    function y(e, t, i) {
                        if (h.default) {
                            if (!(this instanceof y)) return new y(e, t, i);
                            this.dependencyLib = n.default, this.el = void 0, this.events = {}, this.maskset = void 0, !0 !== i && ("[object Object]" === Object.prototype.toString.call(e) ? t = e : (t = t || {}, e && (t.alias = e)), this.opts = n.default.extend(!0, {}, this.defaults, t), this.noMasksCache = t && void 0 !== t.definitions, this.userOptions = t || {}, b(this.opts.alias, t, this.opts)), this.refreshValue = !1, this.undoValue = void 0, this.$el = void 0, this.skipKeyPressEvent = !1, this.skipInputEvent = !1, this.validationEvent = !1, this.ignorable = !1, this.maxLength, this.mouseEnter = !1, this.originalPlaceholder = void 0, this.isComposing = !1
                        }
                    }

                    function b(e, t, i) {
                        var a = y.prototype.aliases[e];
                        return a ? (a.alias && b(a.alias, void 0, i), n.default.extend(!0, i, a), n.default.extend(!0, i, t), !0) : (null === i.mask && (i.mask = e), !1)
                    }
                    y.prototype = {
                        dataAttribute: "data-inputmask",
                        defaults: p.default,
                        definitions: d.default,
                        aliases: {},
                        masksCache: {},
                        get isRTL() {
                            return this.opts.isRTL || this.opts.numericInput
                        },
                        mask: function(e) {
                            var t = this;
                            return "string" == typeof e && (e = g.getElementById(e) || g.querySelectorAll(e)), (e = e.nodeName ? [e] : Array.isArray(e) ? e : Array.from(e)).forEach((function(e, i) {
                                var s = n.default.extend(!0, {}, t.opts);
                                if (function(e, t, i, a) {
                                        function o(t, n) {
                                            var o = "" === a ? t : a + "-" + t;
                                            null !== (n = void 0 !== n ? n : e.getAttribute(o)) && ("string" == typeof n && (0 === t.indexOf("on") ? n = r.default[n] : "false" === n ? n = !1 : "true" === n && (n = !0)), i[t] = n)
                                        }
                                        if (!0 === t.importDataAttributes) {
                                            var s, l, u, c, f = e.getAttribute(a);
                                            if (f && "" !== f && (f = f.replace(/'/g, '"'), l = JSON.parse("{" + f + "}")), l)
                                                for (c in u = void 0, l)
                                                    if ("alias" === c.toLowerCase()) {
                                                        u = l[c];
                                                        break
                                                    } for (s in o("alias", u), i.alias && b(i.alias, i, t), t) {
                                                if (l)
                                                    for (c in u = void 0, l)
                                                        if (c.toLowerCase() === s.toLowerCase()) {
                                                            u = l[c];
                                                            break
                                                        } o(s, u)
                                            }
                                        }
                                        n.default.extend(!0, t, i), ("rtl" === e.dir || t.rightAlign) && (e.style.textAlign = "right");
                                        ("rtl" === e.dir || t.numericInput) && (e.dir = "ltr", e.removeAttribute("dir"), t.isRTL = !0);
                                        return Object.keys(i).length
                                    }(e, s, n.default.extend(!0, {}, t.userOptions), t.dataAttribute)) {
                                    var l = (0, o.generateMaskSet)(s, t.noMasksCache);
                                    void 0 !== l && (void 0 !== e.inputmask && (e.inputmask.opts.autoUnmask = !0, e.inputmask.remove()), e.inputmask = new y(void 0, void 0, !0), e.inputmask.opts = s, e.inputmask.noMasksCache = t.noMasksCache, e.inputmask.userOptions = n.default.extend(!0, {}, t.userOptions), e.inputmask.el = e, e.inputmask.$el = (0, n.default)(e), e.inputmask.maskset = l, n.default.data(e, k, t.userOptions), a.mask.call(e.inputmask))
                                }
                            })), e && e[0] && e[0].inputmask || this
                        },
                        option: function(e, t) {
                            return "string" == typeof e ? this.opts[e] : "object" === v(e) ? (n.default.extend(this.userOptions, e), this.el && !0 !== t && this.mask(this.el), this) : void 0
                        },
                        unmaskedvalue: function(e) {
                            if (this.maskset = this.maskset || (0, o.generateMaskSet)(this.opts, this.noMasksCache), void 0 === this.el || void 0 !== e) {
                                var t = ("function" == typeof this.opts.onBeforeMask && this.opts.onBeforeMask.call(this, e, this.opts) || e).split("");
                                c.checkVal.call(this, void 0, !1, !1, t), "function" == typeof this.opts.onBeforeWrite && this.opts.onBeforeWrite.call(this, void 0, l.getBuffer.call(this), 0, this.opts)
                            }
                            return c.unmaskedvalue.call(this, this.el)
                        },
                        remove: function() {
                            if (this.el) {
                                n.default.data(this.el, k, null);
                                var e = this.opts.autoUnmask ? (0, c.unmaskedvalue)(this.el) : this._valueGet(this.opts.autoUnmask);
                                e !== l.getBufferTemplate.call(this).join("") ? this._valueSet(e, this.opts.autoUnmask) : this._valueSet(""), f.EventRuler.off(this.el), Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.el), "value") && this.__valueGet && Object.defineProperty(this.el, "value", {
                                    get: this.__valueGet,
                                    set: this.__valueSet,
                                    configurable: !0
                                }) : g.__lookupGetter__ && this.el.__lookupGetter__("value") && this.__valueGet && (this.el.__defineGetter__("value", this.__valueGet), this.el.__defineSetter__("value", this.__valueSet)), this.el.inputmask = void 0
                            }
                            return this.el
                        },
                        getemptymask: function() {
                            return this.maskset = this.maskset || (0, o.generateMaskSet)(this.opts, this.noMasksCache), l.getBufferTemplate.call(this).join("")
                        },
                        hasMaskedValue: function() {
                            return !this.opts.autoUnmask
                        },
                        isComplete: function() {
                            return this.maskset = this.maskset || (0, o.generateMaskSet)(this.opts, this.noMasksCache), u.isComplete.call(this, l.getBuffer.call(this))
                        },
                        getmetadata: function() {
                            if (this.maskset = this.maskset || (0, o.generateMaskSet)(this.opts, this.noMasksCache), Array.isArray(this.maskset.metadata)) {
                                var e = s.getMaskTemplate.call(this, !0, 0, !1).join("");
                                return this.maskset.metadata.forEach((function(t) {
                                    return t.mask !== e || (e = t, !1)
                                })), e
                            }
                            return this.maskset.metadata
                        },
                        isValid: function(e) {
                            if (this.maskset = this.maskset || (0, o.generateMaskSet)(this.opts, this.noMasksCache), e) {
                                var t = ("function" == typeof this.opts.onBeforeMask && this.opts.onBeforeMask.call(this, e, this.opts) || e).split("");
                                c.checkVal.call(this, void 0, !0, !1, t)
                            } else e = this.isRTL ? l.getBuffer.call(this).slice().reverse().join("") : l.getBuffer.call(this).join("");
                            for (var i = l.getBuffer.call(this), a = l.determineLastRequiredPosition.call(this), n = i.length - 1; n > a && !l.isMask.call(this, n); n--);
                            return i.splice(a, n + 1 - a), u.isComplete.call(this, i) && e === (this.isRTL ? l.getBuffer.call(this).slice().reverse().join("") : l.getBuffer.call(this).join(""))
                        },
                        format: function(e, t) {
                            this.maskset = this.maskset || (0, o.generateMaskSet)(this.opts, this.noMasksCache);
                            var i = ("function" == typeof this.opts.onBeforeMask && this.opts.onBeforeMask.call(this, e, this.opts) || e).split("");
                            c.checkVal.call(this, void 0, !0, !1, i);
                            var a = this.isRTL ? l.getBuffer.call(this).slice().reverse().join("") : l.getBuffer.call(this).join("");
                            return t ? {
                                value: a,
                                metadata: this.getmetadata()
                            } : a
                        },
                        setValue: function(e) {
                            this.el && (0, n.default)(this.el).trigger("setvalue", [e])
                        },
                        analyseMask: o.analyseMask
                    }, y.extendDefaults = function(e) {
                        n.default.extend(!0, y.prototype.defaults, e)
                    }, y.extendDefinitions = function(e) {
                        n.default.extend(!0, y.prototype.definitions, e)
                    }, y.extendAliases = function(e) {
                        n.default.extend(!0, y.prototype.aliases, e)
                    }, y.format = function(e, t, i) {
                        return y(t).format(e, i)
                    }, y.unmask = function(e, t) {
                        return y(t).unmaskedvalue(e)
                    }, y.isValid = function(e, t) {
                        return y(t).isValid(e)
                    }, y.remove = function(e) {
                        "string" == typeof e && (e = g.getElementById(e) || g.querySelectorAll(e)), (e = e.nodeName ? [e] : e).forEach((function(e) {
                            e.inputmask && e.inputmask.remove()
                        }))
                    }, y.setValue = function(e, t) {
                        "string" == typeof e && (e = g.getElementById(e) || g.querySelectorAll(e)), (e = e.nodeName ? [e] : e).forEach((function(e) {
                            e.inputmask ? e.inputmask.setValue(t) : (0, n.default)(e).trigger("setvalue", [t])
                        }))
                    }, y.dependencyLib = n.default, r.default.Inputmask = y;
                    var x = y;
                    t.default = x
                },
                5296: function(e, t, i) {
                    function a(e) {
                        return (a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                            return typeof e
                        } : function(e) {
                            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                        })(e)
                    }
                    var n = p(i(9380)),
                        r = p(i(2394)),
                        o = p(i(8741));

                    function s(e, t) {
                        if (t && ("object" === a(t) || "function" == typeof t)) return t;
                        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                        return function(e) {
                            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return e
                        }(e)
                    }

                    function l(e) {
                        var t = "function" == typeof Map ? new Map : void 0;
                        return (l = function(e) {
                            if (null === e || (i = e, -1 === Function.toString.call(i).indexOf("[native code]"))) return e;
                            var i;
                            if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
                            if (void 0 !== t) {
                                if (t.has(e)) return t.get(e);
                                t.set(e, a)
                            }

                            function a() {
                                return u(e, arguments, d(this).constructor)
                            }
                            return a.prototype = Object.create(e.prototype, {
                                constructor: {
                                    value: a,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), f(a, e)
                        })(e)
                    }

                    function u(e, t, i) {
                        return (u = c() ? Reflect.construct : function(e, t, i) {
                            var a = [null];
                            a.push.apply(a, t);
                            var n = new(Function.bind.apply(e, a));
                            return i && f(n, i.prototype), n
                        }).apply(null, arguments)
                    }

                    function c() {
                        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                        if (Reflect.construct.sham) return !1;
                        if ("function" == typeof Proxy) return !0;
                        try {
                            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
                        } catch (e) {
                            return !1
                        }
                    }

                    function f(e, t) {
                        return (f = Object.setPrototypeOf || function(e, t) {
                            return e.__proto__ = t, e
                        })(e, t)
                    }

                    function d(e) {
                        return (d = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                            return e.__proto__ || Object.getPrototypeOf(e)
                        })(e)
                    }

                    function p(e) {
                        return e && e.__esModule ? e : {
                            default: e
                        }
                    }
                    var h = n.default.document;
                    if (o.default && h && h.head && h.head.attachShadow && n.default.customElements && void 0 === n.default.customElements.get("input-mask")) {
                        var v = function(e) {
                            ! function(e, t) {
                                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                                e.prototype = Object.create(t && t.prototype, {
                                    constructor: {
                                        value: e,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }), t && f(e, t)
                            }(n, e);
                            var t, i, a = (t = n, i = c(), function() {
                                var e, a = d(t);
                                if (i) {
                                    var n = d(this).constructor;
                                    e = Reflect.construct(a, arguments, n)
                                } else e = a.apply(this, arguments);
                                return s(this, e)
                            });

                            function n() {
                                var e;
                                ! function(e, t) {
                                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                                }(this, n);
                                var t = (e = a.call(this)).getAttributeNames(),
                                    i = e.attachShadow({
                                        mode: "closed"
                                    }),
                                    o = h.createElement("input");
                                for (var s in o.type = "text", i.appendChild(o), t) Object.prototype.hasOwnProperty.call(t, s) && o.setAttribute(t[s], e.getAttribute(t[s]));
                                var l = new r.default;
                                return l.dataAttribute = "", l.mask(o), o.inputmask.shadowRoot = i, e
                            }
                            return n
                        }(l(HTMLElement));
                        n.default.customElements.define("input-mask", v)
                    }
                },
                443: function(e, t, i) {
                    var a = o(i(8254)),
                        n = o(i(2394));

                    function r(e) {
                        return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                            return typeof e
                        } : function(e) {
                            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                        })(e)
                    }

                    function o(e) {
                        return e && e.__esModule ? e : {
                            default: e
                        }
                    }
                    void 0 === a.default.fn.inputmask && (a.default.fn.inputmask = function(e, t) {
                        var i, o = this[0];
                        if (void 0 === t && (t = {}), "string" == typeof e) switch (e) {
                            case "unmaskedvalue":
                                return o && o.inputmask ? o.inputmask.unmaskedvalue() : (0, a.default)(o).val();
                            case "remove":
                                return this.each((function() {
                                    this.inputmask && this.inputmask.remove()
                                }));
                            case "getemptymask":
                                return o && o.inputmask ? o.inputmask.getemptymask() : "";
                            case "hasMaskedValue":
                                return !(!o || !o.inputmask) && o.inputmask.hasMaskedValue();
                            case "isComplete":
                                return !o || !o.inputmask || o.inputmask.isComplete();
                            case "getmetadata":
                                return o && o.inputmask ? o.inputmask.getmetadata() : void 0;
                            case "setvalue":
                                n.default.setValue(o, t);
                                break;
                            case "option":
                                if ("string" != typeof t) return this.each((function() {
                                    if (void 0 !== this.inputmask) return this.inputmask.option(t)
                                }));
                                if (o && void 0 !== o.inputmask) return o.inputmask.option(t);
                                break;
                            default:
                                return t.alias = e, i = new n.default(t), this.each((function() {
                                    i.mask(this)
                                }))
                        } else {
                            if (Array.isArray(e)) return t.alias = e, i = new n.default(t), this.each((function() {
                                i.mask(this)
                            }));
                            if ("object" == r(e)) return i = new n.default(e), void 0 === e.mask && void 0 === e.alias ? this.each((function() {
                                if (void 0 !== this.inputmask) return this.inputmask.option(e);
                                i.mask(this)
                            })) : this.each((function() {
                                i.mask(this)
                            }));
                            if (void 0 === e) return this.each((function() {
                                (i = new n.default(t)).mask(this)
                            }))
                        }
                    })
                },
                2391: function(e, t, i) {
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.generateMaskSet = function(e, t) {
                        var i;

                        function n(e, i, n) {
                            var o, s, l = !1;
                            if (null !== e && "" !== e || ((l = null !== n.regex) ? e = (e = n.regex).replace(/^(\^)(.*)(\$)$/, "$2") : (l = !0, e = ".*")), 1 === e.length && !1 === n.greedy && 0 !== n.repeat && (n.placeholder = ""), n.repeat > 0 || "*" === n.repeat || "+" === n.repeat) {
                                var u = "*" === n.repeat ? 0 : "+" === n.repeat ? 1 : n.repeat;
                                e = n.groupmarker[0] + e + n.groupmarker[1] + n.quantifiermarker[0] + u + "," + n.repeat + n.quantifiermarker[1]
                            }
                            return s = l ? "regex_" + n.regex : n.numericInput ? e.split("").reverse().join("") : e, !1 !== n.keepStatic && (s = "ks_" + s), void 0 === r.default.prototype.masksCache[s] || !0 === t ? (o = {
                                mask: e,
                                maskToken: r.default.prototype.analyseMask(e, l, n),
                                validPositions: {},
                                _buffer: void 0,
                                buffer: void 0,
                                tests: {},
                                excludes: {},
                                metadata: i,
                                maskLength: void 0,
                                jitOffset: {}
                            }, !0 !== t && (r.default.prototype.masksCache[s] = o, o = a.default.extend(!0, {}, r.default.prototype.masksCache[s]))) : o = a.default.extend(!0, {}, r.default.prototype.masksCache[s]), o
                        }
                        "function" == typeof e.mask && (e.mask = e.mask(e));
                        if (Array.isArray(e.mask)) {
                            if (e.mask.length > 1) {
                                null === e.keepStatic && (e.keepStatic = !0);
                                var o = e.groupmarker[0];
                                return (e.isRTL ? e.mask.reverse() : e.mask).forEach((function(t) {
                                    o.length > 1 && (o += e.groupmarker[1] + e.alternatormarker + e.groupmarker[0]), void 0 !== t.mask && "function" != typeof t.mask ? o += t.mask : o += t
                                })), n(o += e.groupmarker[1], e.mask, e)
                            }
                            e.mask = e.mask.pop()
                        }
                        null === e.keepStatic && (e.keepStatic = !1);
                        i = e.mask && void 0 !== e.mask.mask && "function" != typeof e.mask.mask ? n(e.mask.mask, e.mask, e) : n(e.mask, e.mask, e);
                        return i
                    }, t.analyseMask = function(e, t, i) {
                        var a, o, s, l, u, c, f = /(?:[?*+]|\{[0-9+*]+(?:,[0-9+*]*)?(?:\|[0-9+*]*)?\})|[^.?*+^${[]()|\\]+|./g,
                            d = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
                            p = !1,
                            h = new n.default,
                            v = [],
                            m = [],
                            g = !1;

                        function k(e, a, n) {
                            n = void 0 !== n ? n : e.matches.length;
                            var o = e.matches[n - 1];
                            if (t) 0 === a.indexOf("[") || p && /\\d|\\s|\\w]/i.test(a) || "." === a ? e.matches.splice(n++, 0, {
                                fn: new RegExp(a, i.casing ? "i" : ""),
                                static: !1,
                                optionality: !1,
                                newBlockMarker: void 0 === o ? "master" : o.def !== a,
                                casing: null,
                                def: a,
                                placeholder: void 0,
                                nativeDef: a
                            }) : (p && (a = a[a.length - 1]), a.split("").forEach((function(t, a) {
                                o = e.matches[n - 1], e.matches.splice(n++, 0, {
                                    fn: /[a-z]/i.test(i.staticDefinitionSymbol || t) ? new RegExp("[" + (i.staticDefinitionSymbol || t) + "]", i.casing ? "i" : "") : null,
                                    static: !0,
                                    optionality: !1,
                                    newBlockMarker: void 0 === o ? "master" : o.def !== t && !0 !== o.static,
                                    casing: null,
                                    def: i.staticDefinitionSymbol || t,
                                    placeholder: void 0 !== i.staticDefinitionSymbol ? t : void 0,
                                    nativeDef: (p ? "'" : "") + t
                                })
                            }))), p = !1;
                            else {
                                var s = i.definitions && i.definitions[a] || i.usePrototypeDefinitions && r.default.prototype.definitions[a];
                                s && !p ? e.matches.splice(n++, 0, {
                                    fn: s.validator ? "string" == typeof s.validator ? new RegExp(s.validator, i.casing ? "i" : "") : new function() {
                                        this.test = s.validator
                                    } : new RegExp("."),
                                    static: s.static || !1,
                                    optionality: s.optional || !1,
                                    newBlockMarker: void 0 === o || s.optional ? "master" : o.def !== (s.definitionSymbol || a),
                                    casing: s.casing,
                                    def: s.definitionSymbol || a,
                                    placeholder: s.placeholder,
                                    nativeDef: a,
                                    generated: s.generated
                                }) : (e.matches.splice(n++, 0, {
                                    fn: /[a-z]/i.test(i.staticDefinitionSymbol || a) ? new RegExp("[" + (i.staticDefinitionSymbol || a) + "]", i.casing ? "i" : "") : null,
                                    static: !0,
                                    optionality: !1,
                                    newBlockMarker: void 0 === o ? "master" : o.def !== a && !0 !== o.static,
                                    casing: null,
                                    def: i.staticDefinitionSymbol || a,
                                    placeholder: void 0 !== i.staticDefinitionSymbol ? a : void 0,
                                    nativeDef: (p ? "'" : "") + a
                                }), p = !1)
                            }
                        }

                        function y() {
                            if (v.length > 0) {
                                if (k(l = v[v.length - 1], o), l.isAlternator) {
                                    u = v.pop();
                                    for (var e = 0; e < u.matches.length; e++) u.matches[e].isGroup && (u.matches[e].isGroup = !1);
                                    v.length > 0 ? (l = v[v.length - 1]).matches.push(u) : h.matches.push(u)
                                }
                            } else k(h, o)
                        }

                        function b(e) {
                            var t = new n.default(!0);
                            return t.openGroup = !1, t.matches = e, t
                        }

                        function x() {
                            if ((s = v.pop()).openGroup = !1, void 0 !== s)
                                if (v.length > 0) {
                                    if ((l = v[v.length - 1]).matches.push(s), l.isAlternator) {
                                        u = v.pop();
                                        for (var e = 0; e < u.matches.length; e++) u.matches[e].isGroup = !1, u.matches[e].alternatorGroup = !1;
                                        v.length > 0 ? (l = v[v.length - 1]).matches.push(u) : h.matches.push(u)
                                    }
                                } else h.matches.push(s);
                            else y()
                        }

                        function P(e) {
                            var t = e.pop();
                            return t.isQuantifier && (t = b([e.pop(), t])), t
                        }
                        t && (i.optionalmarker[0] = void 0, i.optionalmarker[1] = void 0);
                        for (; a = t ? d.exec(e) : f.exec(e);) {
                            if (o = a[0], t) {
                                switch (o.charAt(0)) {
                                    case "?":
                                        o = "{0,1}";
                                        break;
                                    case "+":
                                    case "*":
                                        o = "{" + o + "}";
                                        break;
                                    case "|":
                                        if (0 === v.length) {
                                            var E = b(h.matches);
                                            E.openGroup = !0, v.push(E), h.matches = [], g = !0
                                        }
                                }
                                switch (o) {
                                    case "\\d":
                                        o = "[0-9]"
                                }
                            }
                            if (p) y();
                            else switch (o.charAt(0)) {
                                case "$":
                                case "^":
                                    t || y();
                                    break;
                                case i.escapeChar:
                                    p = !0, t && y();
                                    break;
                                case i.optionalmarker[1]:
                                case i.groupmarker[1]:
                                    x();
                                    break;
                                case i.optionalmarker[0]:
                                    v.push(new n.default(!1, !0));
                                    break;
                                case i.groupmarker[0]:
                                    v.push(new n.default(!0));
                                    break;
                                case i.quantifiermarker[0]:
                                    var S = new n.default(!1, !1, !0),
                                        w = (o = o.replace(/[{}?]/g, "")).split("|"),
                                        _ = w[0].split(","),
                                        M = isNaN(_[0]) ? _[0] : parseInt(_[0]),
                                        O = 1 === _.length ? M : isNaN(_[1]) ? _[1] : parseInt(_[1]),
                                        T = isNaN(w[1]) ? w[1] : parseInt(w[1]);
                                    "*" !== M && "+" !== M || (M = "*" === O ? 0 : 1), S.quantifier = {
                                        min: M,
                                        max: O,
                                        jit: T
                                    };
                                    var A = v.length > 0 ? v[v.length - 1].matches : h.matches;
                                    if ((a = A.pop()).isAlternator) {
                                        A.push(a), A = a.matches;
                                        var C = new n.default(!0),
                                            D = A.pop();
                                        A.push(C), A = C.matches, a = D
                                    }
                                    a.isGroup || (a = b([a])), A.push(a), A.push(S);
                                    break;
                                case i.alternatormarker:
                                    if (v.length > 0) {
                                        var j = (l = v[v.length - 1]).matches[l.matches.length - 1];
                                        c = l.openGroup && (void 0 === j.matches || !1 === j.isGroup && !1 === j.isAlternator) ? v.pop() : P(l.matches)
                                    } else c = P(h.matches);
                                    if (c.isAlternator) v.push(c);
                                    else if (c.alternatorGroup ? (u = v.pop(), c.alternatorGroup = !1) : u = new n.default(!1, !1, !1, !0), u.matches.push(c), v.push(u), c.openGroup) {
                                        c.openGroup = !1;
                                        var B = new n.default(!0);
                                        B.alternatorGroup = !0, v.push(B)
                                    }
                                    break;
                                default:
                                    y()
                            }
                        }
                        g && x();
                        for (; v.length > 0;) s = v.pop(), h.matches.push(s);
                        h.matches.length > 0 && (! function e(a) {
                            a && a.matches && a.matches.forEach((function(n, r) {
                                var o = a.matches[r + 1];
                                (void 0 === o || void 0 === o.matches || !1 === o.isQuantifier) && n && n.isGroup && (n.isGroup = !1, t || (k(n, i.groupmarker[0], 0), !0 !== n.openGroup && k(n, i.groupmarker[1]))), e(n)
                            }))
                        }(h), m.push(h));
                        (i.numericInput || i.isRTL) && function e(t) {
                            for (var a in t.matches = t.matches.reverse(), t.matches)
                                if (Object.prototype.hasOwnProperty.call(t.matches, a)) {
                                    var n = parseInt(a);
                                    if (t.matches[a].isQuantifier && t.matches[n + 1] && t.matches[n + 1].isGroup) {
                                        var r = t.matches[a];
                                        t.matches.splice(a, 1), t.matches.splice(n + 1, 0, r)
                                    }
                                    void 0 !== t.matches[a].matches ? t.matches[a] = e(t.matches[a]) : t.matches[a] = ((o = t.matches[a]) === i.optionalmarker[0] ? o = i.optionalmarker[1] : o === i.optionalmarker[1] ? o = i.optionalmarker[0] : o === i.groupmarker[0] ? o = i.groupmarker[1] : o === i.groupmarker[1] && (o = i.groupmarker[0]), o)
                                } var o;
                            return t
                        }(m[0]);
                        return m
                    };
                    var a = o(i(3287)),
                        n = o(i(9695)),
                        r = o(i(2394));

                    function o(e) {
                        return e && e.__esModule ? e : {
                            default: e
                        }
                    }
                },
                157: function(e, t, i) {
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.mask = function() {
                        var e = this,
                            t = this.opts,
                            i = this.el,
                            a = this.dependencyLib;
                        s.EventRuler.off(i);
                        var f = function(t, i) {
                            "textarea" !== t.tagName.toLowerCase() && i.ignorables.push(n.default.ENTER);
                            var l = t.getAttribute("type"),
                                u = "input" === t.tagName.toLowerCase() && i.supportsInputType.includes(l) || t.isContentEditable || "textarea" === t.tagName.toLowerCase();
                            if (!u)
                                if ("input" === t.tagName.toLowerCase()) {
                                    var c = document.createElement("input");
                                    c.setAttribute("type", l), u = "text" === c.type, c = null
                                } else u = "partial";
                            return !1 !== u ? function(t) {
                                var n, l;

                                function u() {
                                    return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : -1 !== r.getLastValidPosition.call(e) || !0 !== i.nullable ? (this.inputmask.shadowRoot || this.ownerDocument).activeElement === this && i.clearMaskOnLostFocus ? (e.isRTL ? o.clearOptionalTail.call(e, r.getBuffer.call(e).slice()).reverse() : o.clearOptionalTail.call(e, r.getBuffer.call(e).slice())).join("") : n.call(this) : "" : n.call(this)
                                }

                                function c(e) {
                                    l.call(this, e), this.inputmask && (0, o.applyInputValue)(this, e)
                                }
                                if (!t.inputmask.__valueGet) {
                                    if (!0 !== i.noValuePatching) {
                                        if (Object.getOwnPropertyDescriptor) {
                                            var f = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(t), "value") : void 0;
                                            f && f.get && f.set ? (n = f.get, l = f.set, Object.defineProperty(t, "value", {
                                                get: u,
                                                set: c,
                                                configurable: !0
                                            })) : "input" !== t.tagName.toLowerCase() && (n = function() {
                                                return this.textContent
                                            }, l = function(e) {
                                                this.textContent = e
                                            }, Object.defineProperty(t, "value", {
                                                get: u,
                                                set: c,
                                                configurable: !0
                                            }))
                                        } else document.__lookupGetter__ && t.__lookupGetter__("value") && (n = t.__lookupGetter__("value"), l = t.__lookupSetter__("value"), t.__defineGetter__("value", u), t.__defineSetter__("value", c));
                                        t.inputmask.__valueGet = n, t.inputmask.__valueSet = l
                                    }
                                    t.inputmask._valueGet = function(t) {
                                        return e.isRTL && !0 !== t ? n.call(this.el).split("").reverse().join("") : n.call(this.el)
                                    }, t.inputmask._valueSet = function(t, i) {
                                        l.call(this.el, null == t ? "" : !0 !== i && e.isRTL ? t.split("").reverse().join("") : t)
                                    }, void 0 === n && (n = function() {
                                        return this.value
                                    }, l = function(e) {
                                        this.value = e
                                    }, function(t) {
                                        if (a.valHooks && (void 0 === a.valHooks[t] || !0 !== a.valHooks[t].inputmaskpatch)) {
                                            var n = a.valHooks[t] && a.valHooks[t].get ? a.valHooks[t].get : function(e) {
                                                    return e.value
                                                },
                                                s = a.valHooks[t] && a.valHooks[t].set ? a.valHooks[t].set : function(e, t) {
                                                    return e.value = t, e
                                                };
                                            a.valHooks[t] = {
                                                get: function(t) {
                                                    if (t.inputmask) {
                                                        if (t.inputmask.opts.autoUnmask) return t.inputmask.unmaskedvalue();
                                                        var a = n(t);
                                                        return -1 !== r.getLastValidPosition.call(e, void 0, void 0, t.inputmask.maskset.validPositions) || !0 !== i.nullable ? a : ""
                                                    }
                                                    return n(t)
                                                },
                                                set: function(e, t) {
                                                    var i = s(e, t);
                                                    return e.inputmask && (0, o.applyInputValue)(e, t), i
                                                },
                                                inputmaskpatch: !0
                                            }
                                        }
                                    }(t.type), function(t) {
                                        s.EventRuler.on(t, "mouseenter", (function() {
                                            var t = this.inputmask._valueGet(!0);
                                            t !== (e.isRTL ? r.getBuffer.call(e).reverse() : r.getBuffer.call(e)).join("") && (0, o.applyInputValue)(this, t)
                                        }))
                                    }(t))
                                }
                            }(t) : t.inputmask = void 0, u
                        }(i, t);
                        if (!1 !== f) {
                            e.originalPlaceholder = i.placeholder, e.maxLength = void 0 !== i ? i.maxLength : void 0, -1 === e.maxLength && (e.maxLength = void 0), "inputMode" in i && null === i.getAttribute("inputmode") && (i.inputMode = t.inputmode, i.setAttribute("inputmode", t.inputmode)), !0 === f && (t.showMaskOnFocus = t.showMaskOnFocus && -1 === ["cc-number", "cc-exp"].indexOf(i.autocomplete), l.iphone && (t.insertModeVisual = !1), s.EventRuler.on(i, "submit", c.EventHandlers.submitEvent), s.EventRuler.on(i, "reset", c.EventHandlers.resetEvent), s.EventRuler.on(i, "blur", c.EventHandlers.blurEvent), s.EventRuler.on(i, "focus", c.EventHandlers.focusEvent), s.EventRuler.on(i, "invalid", c.EventHandlers.invalidEvent), s.EventRuler.on(i, "click", c.EventHandlers.clickEvent), s.EventRuler.on(i, "mouseleave", c.EventHandlers.mouseleaveEvent), s.EventRuler.on(i, "mouseenter", c.EventHandlers.mouseenterEvent), s.EventRuler.on(i, "paste", c.EventHandlers.pasteEvent), s.EventRuler.on(i, "cut", c.EventHandlers.cutEvent), s.EventRuler.on(i, "complete", t.oncomplete), s.EventRuler.on(i, "incomplete", t.onincomplete), s.EventRuler.on(i, "cleared", t.oncleared), !0 !== t.inputEventOnly && (s.EventRuler.on(i, "keydown", c.EventHandlers.keydownEvent), s.EventRuler.on(i, "keypress", c.EventHandlers.keypressEvent), s.EventRuler.on(i, "keyup", c.EventHandlers.keyupEvent)), (l.mobile || t.inputEventOnly) && i.removeAttribute("maxLength"), s.EventRuler.on(i, "input", c.EventHandlers.inputFallBackEvent), s.EventRuler.on(i, "compositionend", c.EventHandlers.compositionendEvent)), s.EventRuler.on(i, "setvalue", c.EventHandlers.setValueEvent), r.getBufferTemplate.call(e).join(""), e.undoValue = e._valueGet(!0);
                            var d = (i.inputmask.shadowRoot || i.ownerDocument).activeElement;
                            if ("" !== i.inputmask._valueGet(!0) || !1 === t.clearMaskOnLostFocus || d === i) {
                                (0, o.applyInputValue)(i, i.inputmask._valueGet(!0), t);
                                var p = r.getBuffer.call(e).slice();
                                !1 === u.isComplete.call(e, p) && t.clearIncomplete && r.resetMaskSet.call(e), t.clearMaskOnLostFocus && d !== i && (-1 === r.getLastValidPosition.call(e) ? p = [] : o.clearOptionalTail.call(e, p)), (!1 === t.clearMaskOnLostFocus || t.showMaskOnFocus && d === i || "" !== i.inputmask._valueGet(!0)) && (0, o.writeBuffer)(i, p), d === i && r.caret.call(e, i, r.seekNext.call(e, r.getLastValidPosition.call(e)))
                            }
                        }
                    };
                    var a, n = (a = i(5581)) && a.__esModule ? a : {
                            default: a
                        },
                        r = i(8711),
                        o = i(7760),
                        s = i(9716),
                        l = i(9845),
                        u = i(7215),
                        c = i(6030)
                },
                9695: function(e, t) {
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.default = function(e, t, i, a) {
                        this.matches = [], this.openGroup = e || !1, this.alternatorGroup = !1, this.isGroup = e || !1, this.isOptional = t || !1, this.isQuantifier = i || !1, this.isAlternator = a || !1, this.quantifier = {
                            min: 1,
                            max: 1
                        }
                    }
                },
                3194: function() {
                    Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
                        value: function(e, t) {
                            if (null == this) throw new TypeError('"this" is null or not defined');
                            var i = Object(this),
                                a = i.length >>> 0;
                            if (0 === a) return !1;
                            for (var n = 0 | t, r = Math.max(n >= 0 ? n : a - Math.abs(n), 0); r < a;) {
                                if (i[r] === e) return !0;
                                r++
                            }
                            return !1
                        }
                    })
                },
                7149: function() {
                    function e(t) {
                        return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                            return typeof e
                        } : function(e) {
                            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                        })(t)
                    }
                    "function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" === e("test".__proto__) ? function(e) {
                        return e.__proto__
                    } : function(e) {
                        return e.constructor.prototype
                    })
                },
                8711: function(e, t, i) {
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.caret = function(e, t, i, a, n) {
                        var r, o = this,
                            s = this.opts;
                        if (void 0 === t) return "selectionStart" in e && "selectionEnd" in e ? (t = e.selectionStart, i = e.selectionEnd) : window.getSelection ? (r = window.getSelection().getRangeAt(0)).commonAncestorContainer.parentNode !== e && r.commonAncestorContainer !== e || (t = r.startOffset, i = r.endOffset) : document.selection && document.selection.createRange && (r = document.selection.createRange(), t = 0 - r.duplicate().moveStart("character", -e.inputmask._valueGet().length), i = t + r.text.length), {
                            begin: a ? t : u.call(o, t),
                            end: a ? i : u.call(o, i)
                        };
                        if (Array.isArray(t) && (i = o.isRTL ? t[0] : t[1], t = o.isRTL ? t[1] : t[0]), void 0 !== t.begin && (i = o.isRTL ? t.begin : t.end, t = o.isRTL ? t.end : t.begin), "number" == typeof t) {
                            t = a ? t : u.call(o, t), i = "number" == typeof(i = a ? i : u.call(o, i)) ? i : t;
                            var l = parseInt(((e.ownerDocument.defaultView || window).getComputedStyle ? (e.ownerDocument.defaultView || window).getComputedStyle(e, null) : e.currentStyle).fontSize) * i;
                            if (e.scrollLeft = l > e.scrollWidth ? l : 0, e.inputmask.caretPos = {
                                    begin: t,
                                    end: i
                                }, s.insertModeVisual && !1 === s.insertMode && t === i && (n || i++), e === (e.inputmask.shadowRoot || e.ownerDocument).activeElement)
                                if ("setSelectionRange" in e) e.setSelectionRange(t, i);
                                else if (window.getSelection) {
                                if (r = document.createRange(), void 0 === e.firstChild || null === e.firstChild) {
                                    var c = document.createTextNode("");
                                    e.appendChild(c)
                                }
                                r.setStart(e.firstChild, t < e.inputmask._valueGet().length ? t : e.inputmask._valueGet().length), r.setEnd(e.firstChild, i < e.inputmask._valueGet().length ? i : e.inputmask._valueGet().length), r.collapse(!0);
                                var f = window.getSelection();
                                f.removeAllRanges(), f.addRange(r)
                            } else e.createTextRange && ((r = e.createTextRange()).collapse(!0), r.moveEnd("character", i), r.moveStart("character", t), r.select())
                        }
                    }, t.determineLastRequiredPosition = function(e) {
                        var t, i, r = this,
                            s = this.maskset,
                            l = this.dependencyLib,
                            u = a.getMaskTemplate.call(r, !0, o.call(r), !0, !0),
                            c = u.length,
                            f = o.call(r),
                            d = {},
                            p = s.validPositions[f],
                            h = void 0 !== p ? p.locator.slice() : void 0;
                        for (t = f + 1; t < u.length; t++) i = a.getTestTemplate.call(r, t, h, t - 1), h = i.locator.slice(), d[t] = l.extend(!0, {}, i);
                        var v = p && void 0 !== p.alternation ? p.locator[p.alternation] : void 0;
                        for (t = c - 1; t > f && (((i = d[t]).match.optionality || i.match.optionalQuantifier && i.match.newBlockMarker || v && (v !== d[t].locator[p.alternation] && 1 != i.match.static || !0 === i.match.static && i.locator[p.alternation] && n.checkAlternationMatch.call(r, i.locator[p.alternation].toString().split(","), v.toString().split(",")) && "" !== a.getTests.call(r, t)[0].def)) && u[t] === a.getPlaceholder.call(r, t, i.match)); t--) c--;
                        return e ? {
                            l: c,
                            def: d[c] ? d[c].match : void 0
                        } : c
                    }, t.determineNewCaretPosition = function(e, t, i) {
                        var n = this,
                            u = this.maskset,
                            c = this.opts;
                        t && (n.isRTL ? e.end = e.begin : e.begin = e.end);
                        if (e.begin === e.end) {
                            switch (i = i || c.positionCaretOnClick) {
                                case "none":
                                    break;
                                case "select":
                                    e = {
                                        begin: 0,
                                        end: r.call(n).length
                                    };
                                    break;
                                case "ignore":
                                    e.end = e.begin = l.call(n, o.call(n));
                                    break;
                                case "radixFocus":
                                    if (function(e) {
                                            if ("" !== c.radixPoint && 0 !== c.digits) {
                                                var t = u.validPositions;
                                                if (void 0 === t[e] || t[e].input === a.getPlaceholder.call(n, e)) {
                                                    if (e < l.call(n, -1)) return !0;
                                                    var i = r.call(n).indexOf(c.radixPoint);
                                                    if (-1 !== i) {
                                                        for (var o in t)
                                                            if (t[o] && i < o && t[o].input !== a.getPlaceholder.call(n, o)) return !1;
                                                        return !0
                                                    }
                                                }
                                            }
                                            return !1
                                        }(e.begin)) {
                                        var f = r.call(n).join("").indexOf(c.radixPoint);
                                        e.end = e.begin = c.numericInput ? l.call(n, f) : f;
                                        break
                                    }
                                default:
                                    var d = e.begin,
                                        p = o.call(n, d, !0),
                                        h = l.call(n, -1 !== p || s.call(n, 0) ? p : -1);
                                    if (d <= h) e.end = e.begin = s.call(n, d, !1, !0) ? d : l.call(n, d);
                                    else {
                                        var v = u.validPositions[p],
                                            m = a.getTestTemplate.call(n, h, v ? v.match.locator : void 0, v),
                                            g = a.getPlaceholder.call(n, h, m.match);
                                        if ("" !== g && r.call(n)[h] !== g && !0 !== m.match.optionalQuantifier && !0 !== m.match.newBlockMarker || !s.call(n, h, c.keepStatic, !0) && m.match.def === g) {
                                            var k = l.call(n, h);
                                            (d >= k || d === h) && (h = k)
                                        }
                                        e.end = e.begin = h
                                    }
                            }
                            return e
                        }
                    }, t.getBuffer = r, t.getBufferTemplate = function() {
                        var e = this.maskset;
                        void 0 === e._buffer && (e._buffer = a.getMaskTemplate.call(this, !1, 1), void 0 === e.buffer && (e.buffer = e._buffer.slice()));
                        return e._buffer
                    }, t.getLastValidPosition = o, t.isMask = s, t.resetMaskSet = function(e) {
                        var t = this.maskset;
                        t.buffer = void 0, !0 !== e && (t.validPositions = {}, t.p = 0)
                    }, t.seekNext = l, t.seekPrevious = function(e, t) {
                        var i = this,
                            n = e - 1;
                        if (e <= 0) return 0;
                        for (; n > 0 && (!0 === t && (!0 !== a.getTest.call(i, n).match.newBlockMarker || !s.call(i, n, void 0, !0)) || !0 !== t && !s.call(i, n, void 0, !0));) n--;
                        return n
                    }, t.translatePosition = u;
                    var a = i(4713),
                        n = i(7215);

                    function r(e) {
                        var t = this.maskset;
                        return void 0 !== t.buffer && !0 !== e || (t.buffer = a.getMaskTemplate.call(this, !0, o.call(this), !0), void 0 === t._buffer && (t._buffer = t.buffer.slice())), t.buffer
                    }

                    function o(e, t, i) {
                        var a = this.maskset,
                            n = -1,
                            r = -1,
                            o = i || a.validPositions;
                        for (var s in void 0 === e && (e = -1), o) {
                            var l = parseInt(s);
                            o[l] && (t || !0 !== o[l].generatedInput) && (l <= e && (n = l), l >= e && (r = l))
                        }
                        return -1 === n || n == e ? r : -1 == r || e - n < r - e ? n : r
                    }

                    function s(e, t, i) {
                        var n = this,
                            r = this.maskset,
                            o = a.getTestTemplate.call(n, e).match;
                        if ("" === o.def && (o = a.getTest.call(n, e).match), !0 !== o.static) return o.fn;
                        if (!0 === i && void 0 !== r.validPositions[e] && !0 !== r.validPositions[e].generatedInput) return !0;
                        if (!0 !== t && e > -1) {
                            if (i) {
                                var s = a.getTests.call(n, e);
                                return s.length > 1 + ("" === s[s.length - 1].match.def ? 1 : 0)
                            }
                            var l = a.determineTestTemplate.call(n, e, a.getTests.call(n, e)),
                                u = a.getPlaceholder.call(n, e, l.match);
                            return l.match.def !== u
                        }
                        return !1
                    }

                    function l(e, t, i) {
                        var n = this;
                        void 0 === i && (i = !0);
                        for (var r = e + 1;
                            "" !== a.getTest.call(n, r).match.def && (!0 === t && (!0 !== a.getTest.call(n, r).match.newBlockMarker || !s.call(n, r, void 0, !0)) || !0 !== t && !s.call(n, r, void 0, i));) r++;
                        return r
                    }

                    function u(e) {
                        var t = this.opts,
                            i = this.el;
                        return !this.isRTL || "number" != typeof e || t.greedy && "" === t.placeholder || !i || (e = Math.abs(this._valueGet().length - e)), e
                    }
                },
                4713: function(e, t) {
                    function i(e, t) {
                        var i = (null != e.alternation ? e.mloc[a(e)] : e.locator).join("");
                        if ("" !== i)
                            for (; i.length < t;) i += "0";
                        return i
                    }

                    function a(e) {
                        var t = e.locator[e.alternation];
                        return "string" == typeof t && t.length > 0 && (t = t.split(",")[0]), void 0 !== t ? t.toString() : ""
                    }

                    function n(e, t, i) {
                        var a = this.opts,
                            n = this.maskset;
                        if (void 0 !== (t = t || s.call(this, e).match).placeholder || !0 === i) return "function" == typeof t.placeholder ? t.placeholder(a) : t.placeholder;
                        if (!0 === t.static) {
                            if (e > -1 && void 0 === n.validPositions[e]) {
                                var r, o = u.call(this, e),
                                    l = [];
                                if (o.length > 1 + ("" === o[o.length - 1].match.def ? 1 : 0))
                                    for (var c = 0; c < o.length; c++)
                                        if ("" !== o[c].match.def && !0 !== o[c].match.optionality && !0 !== o[c].match.optionalQuantifier && (!0 === o[c].match.static || void 0 === r || !1 !== o[c].match.fn.test(r.match.def, n, e, !0, a)) && (l.push(o[c]), !0 === o[c].match.static && (r = o[c]), l.length > 1 && /[0-9a-bA-Z]/.test(l[0].match.def))) return a.placeholder.charAt(e % a.placeholder.length)
                            }
                            return t.def
                        }
                        return a.placeholder.charAt(e % a.placeholder.length)
                    }

                    function r(e, t, i) {
                        return this.maskset.validPositions[e] || o.call(this, e, u.call(this, e, t ? t.slice() : t, i))
                    }

                    function o(e, t) {
                        var a = this.opts;
                        e = e > 0 ? e - 1 : 0;
                        for (var n, r, o, l = i(s.call(this, e)), u = 0; u < t.length; u++) {
                            var c = t[u];
                            n = i(c, l.length);
                            var f = Math.abs(n - l);
                            (void 0 === r || "" !== n && f < r || o && !a.greedy && o.match.optionality && "master" === o.match.newBlockMarker && (!c.match.optionality || !c.match.newBlockMarker) || o && o.match.optionalQuantifier && !c.match.optionalQuantifier) && (r = f, o = c)
                        }
                        return o
                    }

                    function s(e, t) {
                        var i = this.maskset;
                        return i.validPositions[e] ? i.validPositions[e] : (t || u.call(this, e))[0]
                    }

                    function l(e, t, i) {
                        function a(e) {
                            for (var t, i = [], a = -1, n = 0, r = e.length; n < r; n++)
                                if ("-" === e.charAt(n))
                                    for (t = e.charCodeAt(n + 1); ++a < t;) i.push(String.fromCharCode(a));
                                else a = e.charCodeAt(n), i.push(e.charAt(n));
                            return i.join("")
                        }
                        return e.match.def === t.match.nativeDef || !(!(i.regex || e.match.fn instanceof RegExp && t.match.fn instanceof RegExp) || !0 === e.match.static || !0 === t.match.static) && -1 !== a(t.match.fn.toString().replace(/[[\]/]/g, "")).indexOf(a(e.match.fn.toString().replace(/[[\]/]/g, "")))
                    }

                    function u(e, t, i) {
                        var a, n = this,
                            r = this.dependencyLib,
                            s = this.maskset,
                            u = this.opts,
                            c = this.el,
                            f = s.maskToken,
                            d = t ? i : 0,
                            p = t ? t.slice() : [0],
                            h = [],
                            v = !1,
                            m = t ? t.join("") : "";

                        function g(t, i, n, r) {
                            function o(n, r, f) {
                                function p(e, t) {
                                    var i = 0 === t.matches.indexOf(e);
                                    return i || t.matches.every((function(a, n) {
                                        return !0 === a.isQuantifier ? i = p(e, t.matches[n - 1]) : Object.prototype.hasOwnProperty.call(a, "matches") && (i = p(e, a)), !i
                                    })), i
                                }

                                function k(e, t, i) {
                                    var a, n;
                                    if ((s.tests[e] || s.validPositions[e]) && (s.tests[e] || [s.validPositions[e]]).every((function(e, r) {
                                            if (e.mloc[t]) return a = e, !1;
                                            var o = void 0 !== i ? i : e.alternation,
                                                s = void 0 !== e.locator[o] ? e.locator[o].toString().indexOf(t) : -1;
                                            return (void 0 === n || s < n) && -1 !== s && (a = e, n = s), !0
                                        })), a) {
                                        var r = a.locator[a.alternation];
                                        return (a.mloc[t] || a.mloc[r] || a.locator).slice((void 0 !== i ? i : a.alternation) + 1)
                                    }
                                    return void 0 !== i ? k(e, t) : void 0
                                }

                                function y(e, t) {
                                    var i = e.alternation,
                                        a = void 0 === t || i === t.alternation && -1 === e.locator[i].toString().indexOf(t.locator[i]);
                                    if (!a && i > t.alternation)
                                        for (var n = t.alternation; n < i; n++)
                                            if (e.locator[n] !== t.locator[n]) {
                                                i = n, a = !0;
                                                break
                                            } if (a) {
                                        e.mloc = e.mloc || {};
                                        var r = e.locator[i];
                                        if (void 0 !== r) {
                                            if ("string" == typeof r && (r = r.split(",")[0]), void 0 === e.mloc[r] && (e.mloc[r] = e.locator.slice()), void 0 !== t) {
                                                for (var o in t.mloc) "string" == typeof o && (o = o.split(",")[0]), void 0 === e.mloc[o] && (e.mloc[o] = t.mloc[o]);
                                                e.locator[i] = Object.keys(e.mloc).join(",")
                                            }
                                            return !0
                                        }
                                        e.alternation = void 0
                                    }
                                    return !1
                                }

                                function b(e, t) {
                                    if (e.locator.length !== t.locator.length) return !1;
                                    for (var i = e.alternation + 1; i < e.locator.length; i++)
                                        if (e.locator[i] !== t.locator[i]) return !1;
                                    return !0
                                }
                                if (d > e + u._maxTestPos) throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + s.mask;
                                if (d === e && void 0 === n.matches) {
                                    if (h.push({
                                            match: n,
                                            locator: r.reverse(),
                                            cd: m,
                                            mloc: {}
                                        }), !0 !== n.optionality || void 0 !== f || !(u.definitions && u.definitions[n.nativeDef] && u.definitions[n.nativeDef].optional || Inputmask.prototype.definitions[n.nativeDef] && Inputmask.prototype.definitions[n.nativeDef].optional)) return !0;
                                    v = !0, d = e
                                } else if (void 0 !== n.matches) {
                                    if (n.isGroup && f !== n) {
                                        if (n = o(t.matches[t.matches.indexOf(n) + 1], r, f)) return !0
                                    } else if (n.isOptional) {
                                        var x = n,
                                            P = h.length;
                                        if (n = g(n, i, r, f)) {
                                            if (h.forEach((function(e, t) {
                                                    t >= P && (e.match.optionality = !0)
                                                })), a = h[h.length - 1].match, void 0 !== f || !p(a, x)) return !0;
                                            v = !0, d = e
                                        }
                                    } else if (n.isAlternator) {
                                        var E, S = n,
                                            w = [],
                                            _ = h.slice(),
                                            M = r.length,
                                            O = !1,
                                            T = i.length > 0 ? i.shift() : -1;
                                        if (-1 === T || "string" == typeof T) {
                                            var A, C = d,
                                                D = i.slice(),
                                                j = [];
                                            if ("string" == typeof T) j = T.split(",");
                                            else
                                                for (A = 0; A < S.matches.length; A++) j.push(A.toString());
                                            if (void 0 !== s.excludes[e]) {
                                                for (var B = j.slice(), R = 0, L = s.excludes[e].length; R < L; R++) {
                                                    var I = s.excludes[e][R].toString().split(":");
                                                    r.length == I[1] && j.splice(j.indexOf(I[0]), 1)
                                                }
                                                0 === j.length && (delete s.excludes[e], j = B)
                                            }(!0 === u.keepStatic || isFinite(parseInt(u.keepStatic)) && C >= u.keepStatic) && (j = j.slice(0, 1));
                                            for (var F = 0; F < j.length; F++) {
                                                A = parseInt(j[F]), h = [], i = "string" == typeof T && k(d, A, M) || D.slice();
                                                var N = S.matches[A];
                                                if (N && o(N, [A].concat(r), f)) n = !0;
                                                else if (0 === F && (O = !0), N && N.matches && N.matches.length > S.matches[0].matches.length) break;
                                                E = h.slice(), d = C, h = [];
                                                for (var V = 0; V < E.length; V++) {
                                                    var G = E[V],
                                                        H = !1;
                                                    G.match.jit = G.match.jit || O, G.alternation = G.alternation || M, y(G);
                                                    for (var K = 0; K < w.length; K++) {
                                                        var U = w[K];
                                                        if ("string" != typeof T || void 0 !== G.alternation && j.includes(G.locator[G.alternation].toString())) {
                                                            if (G.match.nativeDef === U.match.nativeDef) {
                                                                H = !0, y(U, G);
                                                                break
                                                            }
                                                            if (l(G, U, u)) {
                                                                y(G, U) && (H = !0, w.splice(w.indexOf(U), 0, G));
                                                                break
                                                            }
                                                            if (l(U, G, u)) {
                                                                y(U, G);
                                                                break
                                                            }
                                                            if (W = U, !0 === (Q = G).match.static && !0 !== W.match.static && W.match.fn.test(Q.match.def, s, e, !1, u, !1)) {
                                                                b(G, U) || void 0 !== c.inputmask.userOptions.keepStatic ? y(G, U) && (H = !0, w.splice(w.indexOf(U), 0, G)) : u.keepStatic = !0;
                                                                break
                                                            }
                                                        }
                                                    }
                                                    H || w.push(G)
                                                }
                                            }
                                            h = _.concat(w), d = e, v = h.length > 0, n = w.length > 0, i = D.slice()
                                        } else n = o(S.matches[T] || t.matches[T], [T].concat(r), f);
                                        if (n) return !0
                                    } else if (n.isQuantifier && f !== t.matches[t.matches.indexOf(n) - 1])
                                        for (var $ = n, q = i.length > 0 ? i.shift() : 0; q < (isNaN($.quantifier.max) ? q + 1 : $.quantifier.max) && d <= e; q++) {
                                            var z = t.matches[t.matches.indexOf($) - 1];
                                            if (n = o(z, [q].concat(r), z)) {
                                                if ((a = h[h.length - 1].match).optionalQuantifier = q >= $.quantifier.min, a.jit = (q + 1) * (z.matches.indexOf(a) + 1) > $.quantifier.jit, a.optionalQuantifier && p(a, z)) {
                                                    v = !0, d = e;
                                                    break
                                                }
                                                return a.jit && (s.jitOffset[e] = z.matches.length - z.matches.indexOf(a)), !0
                                            }
                                        } else if (n = g(n, i, r, f)) return !0
                                } else d++;
                                var Q, W
                            }
                            for (var f = i.length > 0 ? i.shift() : 0; f < t.matches.length; f++)
                                if (!0 !== t.matches[f].isQuantifier) {
                                    var p = o(t.matches[f], [f].concat(n), r);
                                    if (p && d === e) return p;
                                    if (d > e) break
                                }
                        }
                        if (e > -1) {
                            if (void 0 === t) {
                                for (var k, y = e - 1; void 0 === (k = s.validPositions[y] || s.tests[y]) && y > -1;) y--;
                                void 0 !== k && y > -1 && (p = function(e, t) {
                                    var i, a = [];
                                    return Array.isArray(t) || (t = [t]), t.length > 0 && (void 0 === t[0].alternation || !0 === u.keepStatic ? 0 === (a = o.call(n, e, t.slice()).locator.slice()).length && (a = t[0].locator.slice()) : t.forEach((function(e) {
                                        "" !== e.def && (0 === a.length ? (i = e.alternation, a = e.locator.slice()) : e.locator[i] && -1 === a[i].toString().indexOf(e.locator[i]) && (a[i] += "," + e.locator[i]))
                                    }))), a
                                }(y, k), m = p.join(""), d = y)
                            }
                            if (s.tests[e] && s.tests[e][0].cd === m) return s.tests[e];
                            for (var b = p.shift(); b < f.length; b++) {
                                if (g(f[b], p, [b]) && d === e || d > e) break
                            }
                        }
                        return (0 === h.length || v) && h.push({
                            match: {
                                fn: null,
                                static: !0,
                                optionality: !1,
                                casing: null,
                                def: "",
                                placeholder: ""
                            },
                            locator: [],
                            mloc: {},
                            cd: m
                        }), void 0 !== t && s.tests[e] ? r.extend(!0, [], h) : (s.tests[e] = r.extend(!0, [], h), s.tests[e])
                    }
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.determineTestTemplate = o, t.getDecisionTaker = a, t.getMaskTemplate = function(e, t, i, a, s) {
                        var l = this,
                            c = this.opts,
                            f = this.maskset,
                            d = c.greedy;
                        s && (c.greedy = !1);
                        t = t || 0;
                        var p, h, v, m, g = [],
                            k = 0;
                        do {
                            if (!0 === e && f.validPositions[k]) v = s && !0 === f.validPositions[k].match.optionality && void 0 === f.validPositions[k + 1] && (!0 === f.validPositions[k].generatedInput || f.validPositions[k].input == c.skipOptionalPartCharacter && k > 0) ? o.call(l, k, u.call(l, k, p, k - 1)) : f.validPositions[k], h = v.match, p = v.locator.slice(), g.push(!0 === i ? v.input : !1 === i ? h.nativeDef : n.call(l, k, h));
                            else {
                                v = r.call(l, k, p, k - 1), h = v.match, p = v.locator.slice();
                                var y = !0 !== a && (!1 !== c.jitMasking ? c.jitMasking : h.jit);
                                (m = (m && h.static && h.def !== c.groupSeparator && null === h.fn || f.validPositions[k - 1] && h.static && h.def !== c.groupSeparator && null === h.fn) && f.tests[k] && 1 === f.tests[k].length) || !1 === y || void 0 === y || "number" == typeof y && isFinite(y) && y > k ? g.push(!1 === i ? h.nativeDef : n.call(l, k, h)) : m = !1
                            }
                            k++
                        } while (!0 !== h.static || "" !== h.def || t > k);
                        "" === g[g.length - 1] && g.pop();
                        !1 === i && void 0 !== f.maskLength || (f.maskLength = k - 1);
                        return c.greedy = d, g
                    }, t.getPlaceholder = n, t.getTest = s, t.getTests = u, t.getTestTemplate = r, t.isSubsetOf = l
                },
                7215: function(e, t, i) {
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.alternate = l, t.checkAlternationMatch = function(e, t, i) {
                        for (var a, n = this.opts.greedy ? t : t.slice(0, 1), r = !1, o = void 0 !== i ? i.split(",") : [], s = 0; s < o.length; s++) - 1 !== (a = e.indexOf(o[s])) && e.splice(a, 1);
                        for (var l = 0; l < e.length; l++)
                            if (n.includes(e[l])) {
                                r = !0;
                                break
                            } return r
                    }, t.isComplete = c, t.isValid = f, t.refreshFromBuffer = p, t.revalidateMask = v, t.handleRemove = function(e, t, i, a, s) {
                        var u = this,
                            c = this.maskset,
                            f = this.opts;
                        if ((f.numericInput || u.isRTL) && (t === r.default.BACKSPACE ? t = r.default.DELETE : t === r.default.DELETE && (t = r.default.BACKSPACE), u.isRTL)) {
                            var d = i.end;
                            i.end = i.begin, i.begin = d
                        }
                        var p, h = o.getLastValidPosition.call(u, void 0, !0);
                        i.end >= o.getBuffer.call(u).length && h >= i.end && (i.end = h + 1);
                        t === r.default.BACKSPACE ? i.end - i.begin < 1 && (i.begin = o.seekPrevious.call(u, i.begin)) : t === r.default.DELETE && i.begin === i.end && (i.end = o.isMask.call(u, i.end, !0, !0) ? i.end + 1 : o.seekNext.call(u, i.end) + 1);
                        if (!1 !== (p = v.call(u, i))) {
                            if (!0 !== a && !1 !== f.keepStatic || null !== f.regex && -1 !== n.getTest.call(u, i.begin).match.def.indexOf("|")) {
                                var m = l.call(u, !0);
                                if (m) {
                                    var g = void 0 !== m.caret ? m.caret : m.pos ? o.seekNext.call(u, m.pos.begin ? m.pos.begin : m.pos) : o.getLastValidPosition.call(u, -1, !0);
                                    (t !== r.default.DELETE || i.begin > g) && i.begin
                                }
                            }!0 !== a && (c.p = t === r.default.DELETE ? i.begin + p : i.begin, c.p = o.determineNewCaretPosition.call(u, {
                                begin: c.p,
                                end: c.p
                            }, !1).begin)
                        }
                    };
                    var a, n = i(4713),
                        r = (a = i(5581)) && a.__esModule ? a : {
                            default: a
                        },
                        o = i(8711),
                        s = i(6030);

                    function l(e, t, i, a, r, s) {
                        var u, c, d, p, h, v, m, g, k, y, b, x = this,
                            P = this.dependencyLib,
                            E = this.opts,
                            S = x.maskset,
                            w = P.extend(!0, {}, S.validPositions),
                            _ = P.extend(!0, {}, S.tests),
                            M = !1,
                            O = !1,
                            T = void 0 !== r ? r : o.getLastValidPosition.call(x);
                        if (s && (y = s.begin, b = s.end, s.begin > s.end && (y = s.end, b = s.begin)), -1 === T && void 0 === r) u = 0, c = (p = n.getTest.call(x, u)).alternation;
                        else
                            for (; T >= 0; T--)
                                if ((d = S.validPositions[T]) && void 0 !== d.alternation) {
                                    if (p && p.locator[d.alternation] !== d.locator[d.alternation]) break;
                                    u = T, c = S.validPositions[u].alternation, p = d
                                } if (void 0 !== c) {
                            m = parseInt(u), S.excludes[m] = S.excludes[m] || [], !0 !== e && S.excludes[m].push((0, n.getDecisionTaker)(p) + ":" + p.alternation);
                            var A = [],
                                C = -1;
                            for (h = m; h < o.getLastValidPosition.call(x, void 0, !0) + 1; h++) - 1 === C && e <= h && void 0 !== t && (A.push(t), C = A.length - 1), (v = S.validPositions[h]) && !0 !== v.generatedInput && (void 0 === s || h < y || h >= b) && A.push(v.input), delete S.validPositions[h];
                            for (-1 === C && void 0 !== t && (A.push(t), C = A.length - 1); void 0 !== S.excludes[m] && S.excludes[m].length < 10;) {
                                for (S.tests = {}, o.resetMaskSet.call(x, !0), M = !0, h = 0; h < A.length && (g = M.caret || o.getLastValidPosition.call(x, void 0, !0) + 1, k = A[h], M = f.call(x, g, k, !1, a, !0)); h++) h === C && (O = M), 1 == e && M && (O = {
                                    caretPos: h
                                });
                                if (M) break;
                                if (o.resetMaskSet.call(x), p = n.getTest.call(x, m), S.validPositions = P.extend(!0, {}, w), S.tests = P.extend(!0, {}, _), !S.excludes[m]) {
                                    O = l.call(x, e, t, i, a, m - 1, s);
                                    break
                                }
                                var D = (0, n.getDecisionTaker)(p);
                                if (-1 !== S.excludes[m].indexOf(D + ":" + p.alternation)) {
                                    O = l.call(x, e, t, i, a, m - 1, s);
                                    break
                                }
                                for (S.excludes[m].push(D + ":" + p.alternation), h = m; h < o.getLastValidPosition.call(x, void 0, !0) + 1; h++) delete S.validPositions[h]
                            }
                        }
                        return O && !1 === E.keepStatic || delete S.excludes[m], O
                    }

                    function u(e, t, i) {
                        var a = this.opts,
                            n = this.maskset;
                        switch (a.casing || t.casing) {
                            case "upper":
                                e = e.toUpperCase();
                                break;
                            case "lower":
                                e = e.toLowerCase();
                                break;
                            case "title":
                                var o = n.validPositions[i - 1];
                                e = 0 === i || o && o.input === String.fromCharCode(r.default.SPACE) ? e.toUpperCase() : e.toLowerCase();
                                break;
                            default:
                                if ("function" == typeof a.casing) {
                                    var s = Array.prototype.slice.call(arguments);
                                    s.push(n.validPositions), e = a.casing.apply(this, s)
                                }
                        }
                        return e
                    }

                    function c(e) {
                        var t = this,
                            i = this.opts,
                            a = this.maskset;
                        if ("function" == typeof i.isComplete) return i.isComplete(e, i);
                        if ("*" !== i.repeat) {
                            var r = !1,
                                s = o.determineLastRequiredPosition.call(t, !0),
                                l = o.seekPrevious.call(t, s.l);
                            if (void 0 === s.def || s.def.newBlockMarker || s.def.optionality || s.def.optionalQuantifier) {
                                r = !0;
                                for (var u = 0; u <= l; u++) {
                                    var c = n.getTestTemplate.call(t, u).match;
                                    if (!0 !== c.static && void 0 === a.validPositions[u] && !0 !== c.optionality && !0 !== c.optionalQuantifier || !0 === c.static && e[u] !== n.getPlaceholder.call(t, u, c)) {
                                        r = !1;
                                        break
                                    }
                                }
                            }
                            return r
                        }
                    }

                    function f(e, t, i, a, r, s, d) {
                        var m = this,
                            g = this.dependencyLib,
                            k = this.opts,
                            y = m.maskset;

                        function b(e) {
                            return m.isRTL ? e.begin - e.end > 1 || e.begin - e.end == 1 : e.end - e.begin > 1 || e.end - e.begin == 1
                        }
                        i = !0 === i;
                        var x = e;

                        function P(e) {
                            if (void 0 !== e) {
                                if (void 0 !== e.remove && (Array.isArray(e.remove) || (e.remove = [e.remove]), e.remove.sort((function(e, t) {
                                        return t.pos - e.pos
                                    })).forEach((function(e) {
                                        v.call(m, {
                                            begin: e,
                                            end: e + 1
                                        })
                                    })), e.remove = void 0), void 0 !== e.insert && (Array.isArray(e.insert) || (e.insert = [e.insert]), e.insert.sort((function(e, t) {
                                        return e.pos - t.pos
                                    })).forEach((function(e) {
                                        "" !== e.c && f.call(m, e.pos, e.c, void 0 === e.strict || e.strict, void 0 !== e.fromIsValid ? e.fromIsValid : a)
                                    })), e.insert = void 0), e.refreshFromBuffer && e.buffer) {
                                    var t = e.refreshFromBuffer;
                                    p.call(m, !0 === t ? t : t.start, t.end, e.buffer), e.refreshFromBuffer = void 0
                                }
                                void 0 !== e.rewritePosition && (x = e.rewritePosition, e = !0)
                            }
                            return e
                        }

                        function E(t, i, r) {
                            var s = !1;
                            return n.getTests.call(m, t).every((function(l, c) {
                                var f = l.match;
                                if (o.getBuffer.call(m, !0), !1 !== (s = (!f.jit || void 0 !== y.validPositions[o.seekPrevious.call(m, t)]) && (null != f.fn ? f.fn.test(i, y, t, r, k, b(e)) : (i === f.def || i === k.skipOptionalPartCharacter) && "" !== f.def && {
                                        c: n.getPlaceholder.call(m, t, f, !0) || f.def,
                                        pos: t
                                    }))) {
                                    var d = void 0 !== s.c ? s.c : i,
                                        p = t;
                                    return d = d === k.skipOptionalPartCharacter && !0 === f.static ? n.getPlaceholder.call(m, t, f, !0) || f.def : d, !0 !== (s = P(s)) && void 0 !== s.pos && s.pos !== t && (p = s.pos), !0 !== s && void 0 === s.pos && void 0 === s.c ? !1 : (!1 === v.call(m, e, g.extend({}, l, {
                                        input: u.call(m, d, f, p)
                                    }), a, p) && (s = !1), !1)
                                }
                                return !0
                            })), s
                        }
                        void 0 !== e.begin && (x = m.isRTL ? e.end : e.begin);
                        var S = !0,
                            w = g.extend(!0, {}, y.validPositions);
                        if (!1 === k.keepStatic && void 0 !== y.excludes[x] && !0 !== r && !0 !== a)
                            for (var _ = x; _ < (m.isRTL ? e.begin : e.end); _++) void 0 !== y.excludes[_] && (y.excludes[_] = void 0, delete y.tests[_]);
                        if ("function" == typeof k.preValidation && !0 !== a && !0 !== s && (S = P(S = k.preValidation.call(m, o.getBuffer.call(m), x, t, b(e), k, y, e, i || r))), !0 === S) {
                            if (S = E(x, t, i), (!i || !0 === a) && !1 === S && !0 !== s) {
                                var M = y.validPositions[x];
                                if (!M || !0 !== M.match.static || M.match.def !== t && t !== k.skipOptionalPartCharacter) {
                                    if (k.insertMode || void 0 === y.validPositions[o.seekNext.call(m, x)] || e.end > x) {
                                        var O = !1;
                                        if (y.jitOffset[x] && void 0 === y.validPositions[o.seekNext.call(m, x)] && !1 !== (S = f.call(m, x + y.jitOffset[x], t, !0, !0)) && (!0 !== r && (S.caret = x), O = !0), e.end > x && (y.validPositions[x] = void 0), !O && !o.isMask.call(m, x, k.keepStatic && 0 === x))
                                            for (var T = x + 1, A = o.seekNext.call(m, x, !1, 0 !== x); T <= A; T++)
                                                if (!1 !== (S = E(T, t, i))) {
                                                    S = h.call(m, x, void 0 !== S.pos ? S.pos : T) || S, x = T;
                                                    break
                                                }
                                    }
                                } else S = {
                                    caret: o.seekNext.call(m, x)
                                }
                            }!1 !== S || !k.keepStatic || !c.call(m, o.getBuffer.call(m)) && 0 !== x || i || !0 === r ? b(e) && y.tests[x] && y.tests[x].length > 1 && k.keepStatic && !i && !0 !== r && (S = l.call(m, !0)) : S = l.call(m, x, t, i, a, void 0, e), !0 === S && (S = {
                                pos: x
                            })
                        }
                        if ("function" == typeof k.postValidation && !0 !== a && !0 !== s) {
                            var C = k.postValidation.call(m, o.getBuffer.call(m, !0), void 0 !== e.begin ? m.isRTL ? e.end : e.begin : e, t, S, k, y, i, d);
                            void 0 !== C && (S = !0 === C ? S : C)
                        }
                        S && void 0 === S.pos && (S.pos = x), !1 === S || !0 === s ? (o.resetMaskSet.call(m, !0), y.validPositions = g.extend(!0, {}, w)) : h.call(m, void 0, x, !0);
                        var D = P(S);
                        void 0 !== m.maxLength && (o.getBuffer.call(m).length > m.maxLength && !a && (o.resetMaskSet.call(m, !0), y.validPositions = g.extend(!0, {}, w), D = !1));
                        return D
                    }

                    function d(e, t, i) {
                        for (var a = this.maskset, r = !1, o = n.getTests.call(this, e), s = 0; s < o.length; s++) {
                            if (o[s].match && (o[s].match.nativeDef === t.match[i.shiftPositions ? "def" : "nativeDef"] && (!i.shiftPositions || !t.match.static) || o[s].match.nativeDef === t.match.nativeDef || i.regex && !o[s].match.static && o[s].match.fn.test(t.input))) {
                                r = !0;
                                break
                            }
                            if (o[s].match && o[s].match.def === t.match.nativeDef) {
                                r = void 0;
                                break
                            }
                        }
                        return !1 === r && void 0 !== a.jitOffset[e] && (r = d.call(this, e + a.jitOffset[e], t, i)), r
                    }

                    function p(e, t, i) {
                        var a, n, r = this,
                            l = this.maskset,
                            u = this.opts,
                            c = this.dependencyLib,
                            f = u.skipOptionalPartCharacter,
                            d = r.isRTL ? i.slice().reverse() : i;
                        if (u.skipOptionalPartCharacter = "", !0 === e) o.resetMaskSet.call(r), l.tests = {}, e = 0, t = i.length, n = o.determineNewCaretPosition.call(r, {
                            begin: 0,
                            end: 0
                        }, !1).begin;
                        else {
                            for (a = e; a < t; a++) delete l.validPositions[a];
                            n = e
                        }
                        var p = new c.Event("keypress");
                        for (a = e; a < t; a++) {
                            p.keyCode = d[a].toString().charCodeAt(0), r.ignorable = !1;
                            var h = s.EventHandlers.keypressEvent.call(r, p, !0, !1, !1, n);
                            !1 !== h && void 0 !== h && (n = h.forwardPosition)
                        }
                        u.skipOptionalPartCharacter = f
                    }

                    function h(e, t, i) {
                        var a = this,
                            r = this.maskset,
                            s = this.dependencyLib;
                        if (void 0 === e)
                            for (e = t - 1; e > 0 && !r.validPositions[e]; e--);
                        for (var l = e; l < t; l++) {
                            if (void 0 === r.validPositions[l] && !o.isMask.call(a, l, !1))
                                if (0 == l ? n.getTest.call(a, l) : r.validPositions[l - 1]) {
                                    var u = n.getTests.call(a, l).slice();
                                    "" === u[u.length - 1].match.def && u.pop();
                                    var c, d = n.determineTestTemplate.call(a, l, u);
                                    if (d && (!0 !== d.match.jit || "master" === d.match.newBlockMarker && (c = r.validPositions[l + 1]) && !0 === c.match.optionalQuantifier) && ((d = s.extend({}, d, {
                                            input: n.getPlaceholder.call(a, l, d.match, !0) || d.match.def
                                        })).generatedInput = !0, v.call(a, l, d, !0), !0 !== i)) {
                                        var p = r.validPositions[t].input;
                                        return r.validPositions[t] = void 0, f.call(a, t, p, !0, !0)
                                    }
                                }
                        }
                    }

                    function v(e, t, i, a) {
                        var r = this,
                            s = this.maskset,
                            l = this.opts,
                            u = this.dependencyLib;

                        function c(e, t, i) {
                            var a = t[e];
                            if (void 0 !== a && !0 === a.match.static && !0 !== a.match.optionality && (void 0 === t[0] || void 0 === t[0].alternation)) {
                                var n = i.begin <= e - 1 ? t[e - 1] && !0 === t[e - 1].match.static && t[e - 1] : t[e - 1],
                                    r = i.end > e + 1 ? t[e + 1] && !0 === t[e + 1].match.static && t[e + 1] : t[e + 1];
                                return n && r
                            }
                            return !1
                        }
                        var p = 0,
                            h = void 0 !== e.begin ? e.begin : e,
                            v = void 0 !== e.end ? e.end : e,
                            m = !0;
                        if (e.begin > e.end && (h = e.end, v = e.begin), a = void 0 !== a ? a : h, h !== v || l.insertMode && void 0 !== s.validPositions[a] && void 0 === i || void 0 === t || t.match.optionalQuantifier || t.match.optionality) {
                            var g, k = u.extend(!0, {}, s.validPositions),
                                y = o.getLastValidPosition.call(r, void 0, !0);
                            for (s.p = h, g = y; g >= h; g--) delete s.validPositions[g], void 0 === t && delete s.tests[g + 1];
                            var b, x, P = a,
                                E = P;
                            for (t && (s.validPositions[a] = u.extend(!0, {}, t), E++, P++), g = t ? v : v - 1; g <= y; g++) {
                                if (void 0 !== (b = k[g]) && !0 !== b.generatedInput && (g >= v || g >= h && c(g, k, {
                                        begin: h,
                                        end: v
                                    }))) {
                                    for (;
                                        "" !== n.getTest.call(r, E).match.def;) {
                                        if (!1 !== (x = d.call(r, E, b, l)) || "+" === b.match.def) {
                                            "+" === b.match.def && o.getBuffer.call(r, !0);
                                            var S = f.call(r, E, b.input, "+" !== b.match.def, !0);
                                            if (m = !1 !== S, P = (S.pos || E) + 1, !m && x) break
                                        } else m = !1;
                                        if (m) {
                                            void 0 === t && b.match.static && g === e.begin && p++;
                                            break
                                        }
                                        if (!m && E > s.maskLength) break;
                                        E++
                                    }
                                    "" == n.getTest.call(r, E).match.def && (m = !1), E = P
                                }
                                if (!m) break
                            }
                            if (!m) return s.validPositions = u.extend(!0, {}, k), o.resetMaskSet.call(r, !0), !1
                        } else t && n.getTest.call(r, a).match.cd === t.match.cd && (s.validPositions[a] = u.extend(!0, {}, t));
                        return o.resetMaskSet.call(r, !0), p
                    }
                },
                8254: function(t) {
                    t.exports = e
                },
                5581: function(e) {
                    e.exports = JSON.parse('{"BACKSPACE":8,"BACKSPACE_SAFARI":127,"DELETE":46,"DOWN":40,"END":35,"ENTER":13,"ESCAPE":27,"HOME":36,"INSERT":45,"LEFT":37,"PAGE_DOWN":34,"PAGE_UP":33,"RIGHT":39,"SPACE":32,"TAB":9,"UP":38,"X":88,"Z":90,"CONTROL":17,"PAUSE/BREAK":19,"WINDOWS_LEFT":91,"WINDOWS_RIGHT":92,"KEY_229":229}')
                }
            },
            i = {};

        function a(e) {
            var n = i[e];
            if (void 0 !== n) return n.exports;
            var r = i[e] = {
                exports: {}
            };
            return t[e](r, r.exports, a), r.exports
        }
        var n = {};
        return function() {
            var e = n;
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var t, i = (t = a(3046)) && t.__esModule ? t : {
                default: t
            };
            a(443);
            var r = i.default;
            e.default = r
        }(), n
    }()
}));;
'use strict';
var nhMain = {
    dataInit: [],
    lang: null,
    csrfToken: null,
    isMobile: false,
    fullUrl: null,
    hostName: null,
    protocol: null,
    fullPath: null,
    cdnUrl: null,
    init: function() {
        var self = this;
        self.fullUrl = window.location.href;
        self.hostName = window.location.hostname;
        self.protocol = window.location.protocol;
        self.pathname = window.location.pathname;
        self.fullPath = self.fullUrl.replace(self.protocol + '//' + self.hostName, '');
        self.lang = $('html').attr('lang');
        self.csrfToken = $('html').attr('csrf-token');
        self.dataInit = self.utilities.parseJsonToObject($('input#nh-data-init').val());
        self.cdnUrl = self.utilities.notEmpty(self.dataInit.cdn_url) ? self.dataInit.cdn_url : '';
        self.initLibrary();
        self.initEvent();
        self.initForBlock();
    },
    initLibrary: function(wrap = null) {
        var self = this;
        self.isMobile = typeof(self.dataInit.device) != _UNDEFINED && self.dataInit.device == 1 ? true : false;
        $('body').toggleClass('is-mobile', self.isMobile);
        var wrapElement = $(document);
        if (wrap != null && wrap != _UNDEFINED && wrap.length > 0) {
            wrapElement = wrap;
        }
        if (wrapElement.find('[data-toggle="tooltip"]').length > 0 && !self.isMobile) {
            wrapElement.find('[data-toggle="tooltip"]').tooltip({
                container: 'body'
            });
        }
        wrapElement.find('div[nh-light-gallery]').each(function(index) {
            var config = self.utilities.parseJsonToObject($(this).attr('nh-light-gallery'));
            $(this).lightGallery(config);
        });
        wrapElement.find('div[nh-owl-slick][loaded!="1"]').each(function(index) {
            var config = self.utilities.parseJsonToObject($(this).attr('nh-owl-slick'));
            $(this).slick(config);
            $(this).on('beforeChange', function(event, slick, direction) {
                $(this).find('img[src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="]').each(function(index) {
                    $(this).attr('src', $(this).attr('data-src'));
                });
            });
            $(this).attr('loaded', 1);
            $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
                $('div[nh-owl-slick]').slick('setPosition');
            });
        });
        if (wrapElement.find('.selectpicker').length > 0) {
            wrapElement.find('.selectpicker').selectpicker();
        }
        if (wrapElement.find('[nh-date]').length > 0) {
            wrapElement.find('[nh-date]').datepicker({
                language: self.lang,
                todayHighlight: true
            });
        }
        wrapElement.find('.number-input').each(function() {
            nhMain.input.inputMask.init($(this), 'number');
        });
        wrapElement.on('show.bs.modal', function() {
            $(this).find('[nh-lazy]').each(function() {
                var imgLazy = $(this);
                imgLazy.attr('src', imgLazy.data('src'));
            });
        });
        wrapElement.on('show.bs.dropdown', function() {
            $(this).find('[nh-lazy]').each(function() {
                var imgLazy = $(this);
                imgLazy.attr('src', imgLazy.data('src'));
            });
        });
        wrapElement.on('show.bs.collapse', function() {
            $(this).find('[nh-lazy]').each(function() {
                var imgLazy = $(this);
                imgLazy.attr('src', imgLazy.data('src'));
            });
        });
        wrapElement.on("show.bs.collapse", function() {
            $(this).find('[nh-owl-slick]').slick('setPosition');
        });
        if (wrap == null) {
            var template = typeof(self.dataInit.template) != _UNDEFINED ? self.dataInit.template : {};
            if (self.utilities.getParamInUrl('nh-config-block') > 0 && typeof(template.url) != _UNDEFINED) {
                var cssUrl = template.url + 'assets/lib/nh-config-block/block.css';
                var jsUrl = template.url + 'assets/lib/nh-config-block/block.js';
                $('<link/>', {
                    rel: 'stylesheet',
                    type: 'text/css',
                    href: cssUrl
                }).appendTo('body');
                $.getScript(jsUrl);
            }
            self.embedCode.init();
            self.social.init();
            self.reCaptcha.init();
        }
    },
    initEvent: function() {
        var self = this;
        if (($('a[href="' + self.fullPath + '"]').length > 0 || $('a[nh-link-redirect="' + self.fullPath + '"]').length > 0) && !self.isMobile) {
            $('a[href="' + self.fullPath + '"]').each(function(index) {
                $(this).addClass('active');
            });
            $('a[nh-link-redirect="' + self.fullPath + '"]').each(function(index) {
                $(this).addClass('active');
            });
        }
        $(document).on('click', 'a[nh-link-redirect]', function(e) {
            e.preventDefault();
            if (!nhMain.utilities.notEmpty($(this))) return false;
            var redirectHref = $(this).attr('nh-link-redirect');
            window.location = redirectHref;
        });
        $(document).on('click', '[nh-active-language]', function(e) {
            self.showLoading.page();
            var lang = $(this).attr('nh-active-language');
            nhMain.callAjax({
                url: '/language/active',
                data: {
                    lang: lang
                },
            }).done(function(response) {
                var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                if (!nhMain.utilities.notEmpty(data.url_redirect)) {
                    location.reload();
                    return false;
                };
                document.location.href = data.url_redirect;
            });
        });
        $(document).on('click', '[nh-active-currency]', function(e) {
            self.showLoading.page();
            var currency = $(this).attr('nh-active-currency');
            nhMain.callAjax({
                url: '/currency/active',
                data: {
                    currency: currency
                },
            }).done(function(response) {
                location.reload();
            });
        });
        $(document).on('click', '[nh-toggle]', function(e) {
            $(this).toggleClass('open');
            var key = $(this).attr('nh-toggle');
            var element = $('[nh-toggle-element="' + key + '"]');
            if (element.length > 0) {
                element.toggle();
            }
        });
        $(document).on('click', 'a[nh-to-anchor]', function(e) {
            e.preventDefault();
            var anchor = $("[nh-anchor='" + $(this).attr('nh-to-anchor') + "']");
            if (anchor.length) {
                $('html,body').animate({
                    scrollTop: anchor.offset().top - 50
                }, 'slow');
            }
        });
        $(document).on('click', '[nh-show-password]', function(e) {
            e.preventDefault();
            var inputPassword = $(this).closest('.form-group').find('input[name="password"]');
            var attrType = inputPassword.attr('type') == 'password' ? 'text' : 'password';
            inputPassword.attr('type', attrType);
        });
    },
    initForBlock: function() {
        var self = this;
        $('div[nh-block][type-load="document-ready"]').each(function(index) {
            var blockCode = $(this).attr('nh-block')
            self.ajaxLoadBlock(blockCode);
        });
        $(document).on('click', '[nh-active-block]', function(e) {
            var blockCode = $(this).attr('nh-active-block');
            var wrapBlock = $('div[nh-block="' + blockCode + '"][type-load="active"]');
            if (wrapBlock.length > 0 && wrapBlock.attr('loaded') != 1) {
                self.ajaxLoadBlock(blockCode);
            }
        });
        $(document).on('click', '[nh-active-tab]', function(e) {
            var blockCode = $(this).closest('[nh-block]').attr('nh-block');
            var tabIndex = $(this).attr('nh-active-tab');
            var wrapBlock = $(this).closest('[nh-block]').find('div[nh-tab-content="' + tabIndex + '"]');
            if (wrapBlock.length > 0 && wrapBlock.attr('loaded') != 1) {
                self.ajaxLoadBlockTab(blockCode, tabIndex);
            }
        });
    },
    ajaxLoadBlock: function(blockCode = null) {
        var self = this;
        if (typeof(blockCode) == _UNDEFINED || blockCode == null || blockCode.length == 0) return;
        var wrapBlock = $('div[nh-block="' + blockCode + '"]');
        self.showLoading.block(wrapBlock);
        self.callAjax({
            url: '/block/ajax-load-content/' + blockCode,
            dataType: _HTML,
        }).done(function(response) {
            wrapBlock.attr('loaded', '1').html(response);
            self.initLibrary(wrapBlock);
            if (typeof(nhLazy) != _UNDEFINED) {
                nhLazy.init();
            }
            self.showLoading.remove(wrapBlock)
        });
    },
    ajaxLoadBlockTab: function(blockCode = null, tabIndex = null) {
        var self = this;
        if (typeof(blockCode) == _UNDEFINED || blockCode == null || blockCode.length == 0) return;
        var wrapBlock = $('div[nh-block="' + blockCode + '"]');
        var tabContentElement = wrapBlock.find('[nh-tab-content="' + tabIndex + '"]');
        if (tabContentElement.length == 0) return;
        self.showLoading.block(wrapBlock);
        self.callAjax({
            url: '/block/ajax-load-content/' + blockCode,
            data: {
                'tab_index': typeof(tabIndex) != _UNDEFINED ? tabIndex : '',
            },
            dataType: _HTML,
        }).done(function(response) {
            tabContentElement.attr('loaded', '1').html(response);
            self.initLibrary(wrapBlock);
            if (typeof(nhLazy) != _UNDEFINED) {
                nhLazy.init();
            }
            self.showLoading.remove(wrapBlock);
        });
    },
    callAjax: function(params = {}) {
        var self = this;
        var options = {
            headers: {
                'X-CSRF-Token': self.csrfToken
            },
            async: typeof(params.async) != _UNDEFINED ? params.async : true,
            url: typeof(params.url) != _UNDEFINED ? params.url : '',
            type: typeof(params.type) != _UNDEFINED ? params.type : 'POST',
            dataType: typeof(params.dataType) != _UNDEFINED ? params.dataType : 'json',
            data: typeof(params.data) != _UNDEFINED ? params.data : {},
            cache: typeof(params.cache) != _UNDEFINED ? params.cache : false
        };
        if (typeof(params.processData) != _UNDEFINED) {
            options.processData = params.processData;
        }
        if (typeof(params.contentType) != _UNDEFINED) {
            options.contentType = params.contentType;
        }
        var ajax = $.ajax(options).fail(function(jqXHR, textStatus, errorThrown) {
            if (typeof(params.not_show_error) == _UNDEFINED) {
                self.showLog(errorThrown);
            }
        });
        return ajax;
    },
    getLabel: function(key = null) {
        if (typeof(locales[key]) == _UNDEFINED) {
            return key;
        }
        return locales[key];
    },
    showLog: function(message = null) {
        if (message == null || message.length == 0) return false;
        console.log('%cWeb4s: ' + message, 'color: #fd397a; font-size: 12px');
    },
    utilities: {
        notEmpty: function(value = null) {
            if (typeof(value) == _UNDEFINED) {
                return false;
            }
            if (value == null) {
                return false;
            }
            if (value.length == 0) {
                return false;
            }
            return true;
        },
        parseNumberToTextMoney: function(number = null) {
            if (typeof(number) != 'number' || isNaN(number) || typeof(number) == _UNDEFINED) {
                return 0;
            }
            return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
        },
        parseTextMoneyToNumber: function(text_number = null) {
            if (typeof(text_number) == _UNDEFINED) {
                return 0;
            }
            var number = parseFloat(text_number.toString().replace(/,/g, ''));
            if (isNaN(number)) number = 0;
            return number;
        },
        parseFloat: function(number = null) {
            if (isNaN(number) || typeof(number) == _UNDEFINED || number == null) {
                return 0;
            }
            number = parseFloat(number);
            if (isNaN(number)) {
                return 0;
            }
            return number;
        },
        parseInt: function(number = null) {
            if (isNaN(number) || typeof(number) == _UNDEFINED || number == null) {
                return 0;
            }
            number = parseInt(number);
            if (isNaN(number)) {
                return 0;
            }
            return number;
        },
        parseIntToDateString: function(number = null) {
            var self = this;
            var date_string = '';
            var int_number = nhMain.utilities.parseInt(number);
            if (int_number > 0) {
                var date = new Date(int_number * 1000);
                date_string = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            }
            return date_string;
        },
        parseIntToDateTimeString: function(number = null) {
            var self = this;
            var date_string = '';
            var int_number = nhMain.utilities.parseInt(number);
            if (int_number > 0) {
                var date = new Date(int_number * 1000);
                var minutes = date.getMinutes();
                if (minutes < 10) {
                    minutes = '0' + minutes;
                }
                var hours = date.getHours();
                if (hours < 10) {
                    hours = '0' + hours;
                }
                date_string = hours + ':' + minutes + ' - ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            }
            return date_string;
        },
        parseJsonToObject: function(json_string = null) {
            var result = {};
            try {
                result = JSON.parse(json_string);
            } catch (e) {
                return {};
            }
            return result;
        },
        replaceUrlParam: function(url = null, param = null, value = null) {
            if (url == null || typeof(url) == _UNDEFINED || url.length == 0) {
                return '';
            }
            if (param == null || typeof(param) == _UNDEFINED || param.length == 0) {
                return url;
            }
            if (value == null || typeof(param) == _UNDEFINED) {
                value = '';
            }
            var pattern = new RegExp('\\b(' + param + '=).*?(&|#|$)');
            if (url.search(pattern) >= 0) {
                return url.replace(pattern, '$1' + value + '$2');
            }
            url = url.replace(/[?#]$/, '');
            return url + (url.indexOf('?') > 0 ? '&' : '?') + param + '=' + value;
        },
        getParamInUrl: function(param_name = null, url = null) {
            var self = this;
            if (!self.notEmpty(param_name)) return null;
            if (!self.notEmpty(url)) {
                url = nhMain.fullUrl
            }
            param_name = param_name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + param_name + "(=([^&#]*)|&|#|$)");
            var results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },
        getUrlVars: function() {
            var vars = {},
                hash;
            var url_decode = decodeURIComponent(window.location.href);
            if (url_decode.indexOf('?') > 0) {
                var hashes = url_decode.slice(url_decode.indexOf('?') + 1).split('&');
                for (var i = 0; i < hashes.length; i++) {
                    hash = hashes[i].split('=');
                    vars[hash[0]] = hash[1];
                }
            }
            return vars;
        },
        noUnicode: function(text) {
            var self = this;
            if (!self.notEmpty(text)) return '';
            text = text.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẩ|ă|ằ|ắ|ẳ|ặ|ẵ/g, 'a');
            text = text.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ă|Ằ|Ắ|Ặ|Ẵ|ẵ/g, 'a');
            text = text.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ+/g, 'e');
            text = text.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ+/g, 'e');
            text = text.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
            text = text.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'i');
            text = text.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ+/g, 'o');
            text = text.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ+/g, 'o');
            text = text.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
            text = text.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'u');
            text = text.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
            text = text.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'y');
            text = text.replace(/đ/g, 'd');
            text = text.replace(/Đ/g, 'd');
            return text.toLowerCase().trim();
        },
        getThumbImage: function(url = null, size = 150) {
            var self = this;
            if (!self.notEmpty(url)) return '';
            if ($.inArray(size, [50, 150, 250, 350]) == -1) size = 150;
            var urlSplit = url.split('/');
            urlSplit[1] = 'thumbs';
            var fileName = self.getFileName(url);
            var ext = fileName.split('.').pop();
            if (!self.notEmpty(ext)) return '';
            var newFile = fileName.replace('.' + ext, '');
            newFile += '_thumb_' + size + '.' + ext;
            urlSplit[urlSplit.length - 1] = newFile;
            return urlSplit.join('/');
        },
        getFileName: function(path = null) {
            var self = this;
            path = path.substring(path.lastIndexOf('/') + 1);
            return (path.match(/[^.]+(\.[^?#]+)?/) || [])[0];
        }
    },
    location: {
        idWrap: null,
        init: function(params = {}) {
            var self = this;
            self.idWrap = typeof(params.idWrap) != _UNDEFINED ? params.idWrap : [];
            $.each(self.idWrap, function(index, idWrap) {
                $(document).on('change', idWrap + ' #city_id', function(e) {
                    var wardSelect = $(idWrap + ' #ward_id');
                    wardSelect.find('option:not([value=""])').remove();
                    wardSelect.selectpicker('refresh');
                    var districtSelect = $(idWrap + ' #district_id');
                    districtSelect.find('option:not([value=""])').remove();
                    districtSelect.selectpicker('refresh');
                    var city_id = $(this).val();
                    if (city_id > 0) {
                        var _data = {};
                        _data[_PAGINATION] = {};
                        _data[_PAGINATION][_PERPAGE] = 200;
                        nhMain.callAjax({
                            async: false,
                            url: '/location/district/json/' + city_id,
                            data: _data,
                        }).done(function(response) {
                            var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                            var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                            var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                            if (code == _SUCCESS) {
                                if (!$.isEmptyObject(data)) {
                                    var listOption = '';
                                    $.each(data, function(key, item) {
                                        listOption += '<option value="' + item.id + '">' + item.name + '</option>';
                                    });
                                    districtSelect.append(listOption);
                                    districtSelect.selectpicker('refresh');
                                }
                            } else {
                                nhMain.showLog(message);
                            }
                        });
                    }
                });
                $(document).on('change', idWrap + ' #district_id', function(e) {
                    var wardSelect = $(idWrap + ' #ward_id');
                    wardSelect.find('option:not([value=""])').remove();
                    wardSelect.selectpicker('refresh');
                    var district_id = $(this).val();
                    if (district_id > 0) {
                        var _data = {};
                        _data[_PAGINATION] = {};
                        _data[_PAGINATION][_PERPAGE] = 200;
                        nhMain.callAjax({
                            async: false,
                            url: '/location/ward/json/' + district_id,
                            data: _data,
                        }).done(function(response) {
                            var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                            var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                            var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                            if (code == _SUCCESS) {
                                if (!$.isEmptyObject(data)) {
                                    var listOption = '';
                                    $.each(data, function(key, item) {
                                        listOption += '<option value="' + item.id + '">' + item.name + '</option>';
                                    });
                                    wardSelect.append(listOption);
                                    wardSelect.selectpicker('refresh');
                                }
                            } else {
                                nhMain.showLog(message);
                            }
                        });
                    }
                });
            });
        }
    },
    showAlert: function(type = null, message = null, callback = null, params = {}) {
        var self = this;
        if (typeof(callback) != 'function') {
            callback = function() {};
        }
        if (type == null && $.inArray(type, [_ERROR, _WARNING, _SUCCESS, _INFO]) == -1) {
            type = _ERROR;
        }
        if (message == null) {
            message = 'Error';
        }
        var optionsSwal = {
            position: 'bottom',
            text: message,
            showCloseButton: true,
            showCancelButton: false,
            showDenyButton: false,
            confirmButtonText: self.getLabel('dong_y'),
            denyButtonText: self.getLabel('khong')
        };
        switch (type) {
            case _ERROR:
                optionsSwal['background'] = '#c33';
                optionsSwal['icon'] = 'error';
                optionsSwal['showConfirmButton'] = false;
                optionsSwal['onClose'] = function(e) {
                    callback();
                }
                swal.fire(optionsSwal);
                break;
            case _SUCCESS:
                optionsSwal['background'] = '#390';
                optionsSwal['icon'] = 'success';
                optionsSwal['showConfirmButton'] = false;
                optionsSwal['onClose'] = function(e) {
                    callback();
                }
                swal.fire(optionsSwal);
                break;
            case _WARNING:
                optionsSwal['background'] = '#d39e00';
                optionsSwal['icon'] = 'warning';
                optionsSwal['showConfirmButton'] = true;
                optionsSwal['showDenyButton'] = true;
                optionsSwal['allowOutsideClick'] = false;
                optionsSwal['showCloseButton'] = false;
                swal.fire(optionsSwal).then((result) => {
                    if (result.isConfirmed) {
                        callback();
                    }
                });
                break;
            case _INFO:
                optionsSwal['background'] = '#007bff';
                optionsSwal['icon'] = 'info';
                optionsSwal['showConfirmButton'] = false;
                optionsSwal['showCloseButton'] = true;
                if (typeof(params.html) != _UNDEFINED && params.html) {
                    optionsSwal['html'] = message;
                }
                optionsSwal['onClose'] = function(e) {
                    callback();
                }
                swal.fire(optionsSwal);
                break;
        }
    },
    showLoading: {
        htmlTemplate: '\
   <div class="bg-overlay"></div>\
   <div class="sk-flow">\
    <div class="sk-flow-dot"></div>\
    <div class="sk-flow-dot"></div>\
    <div class="sk-flow-dot"></div>\
   </div>',
        block: function(element = null) {
            var self = this;
            if (element == null || typeof(element) == _UNDEFINED || element.length == 0) {
                nhMain.showLog(nhMain.getLabel('doi_tuong_hien_thi_loading_khong_ton_tai'));
                return false;
            }
            var htmlLoading = $('<div nh-loading class="loading-block">').append(self.htmlTemplate)
            element.append(htmlLoading);
        },
        page: function() {
            var self = this;
            var htmlLoading = $('<div nh-loading class="loading-page">').append(self.htmlTemplate);
            $('body').append(htmlLoading);
        },
        remove: function(element = null) {
            var wrapElement = $(document);
            if (element != null && element != _UNDEFINED && element.length > 0) {
                wrapElement = element;
            }
            wrapElement.find('div[nh-loading]').each(function(index) {
                $(this).remove();
            });
        }
    },
    validation: {
        error: {
            show: function(input = null, message = null, callback) {
                if (input.length > 0 && message.length > 0) {
                    input.next('div.error').remove();
                    if (typeof(callback) != 'function') {
                        callback = function() {};
                    }
                    input.closest('.form-group').addClass('is-invalid');
                    var name = typeof(input.attr('name')) != _UNDEFINED ? input.attr('name') + '-error' : '';
                    var error = '<div id="' + name + '" class="error invalid-feedback">' + message + '</label>';
                    input.after(error).focus();
                    callback();
                }
            },
            clear: function(wrapForm = null) {
                if (wrapForm.length > 0) {
                    wrapForm.find('.form-group').removeClass('is-invalid');
                    wrapForm.find('div.error').remove();
                }
            }
        },
        isEmail: function(email = null) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        },
        isPhone: function(phone = null) {
            var regex = /[0-9]{10,11}/;
            return regex.test(phone);
        },
        phoneVn: function() {
            $.validator.addMethod('phoneVN', function(phone_number, element) {
                phone_number = phone_number.replace(/\(|\)|\s+|-/g, '');
                return this.optional(element) || phone_number.length > 9 && phone_number.match(/^(01|02|03|04|05|06|07|08|09)+([0-9]{8,9})\b$/);
            }, nhMain.getLabel('so_dien_thoai_chua_dung_dinh_dang'));
        }
    },
    reCaptcha: {
        config: {},
        init: function() {
            var self = this;
            self.config = typeof(nhMain.dataInit.recaptcha) != _UNDEFINED && nhMain.dataInit.recaptcha != null ? nhMain.dataInit.recaptcha : {};
            if (typeof(self.config.use_recaptcha) != _UNDEFINED && Boolean(self.config.use_recaptcha)) {
                $('<script />', {
                    type: 'text/javascript',
                    src: 'https://www.google.com/recaptcha/api.js?render=' + self.config.site_key
                }).appendTo('head');
            }
        },
        check: function(callback = null) {
            var self = this;
            if (typeof(callback) != 'function') {
                callback = function() {};
            }
            if (Boolean(self.config.use_recaptcha) && grecaptcha != _UNDEFINED) {
                grecaptcha.ready(function() {
                    grecaptcha.execute(self.config.site_key, {
                        action: 'submit'
                    }).then(function(token) {
                        callback(token);
                    });
                });
            } else {
                callback(null);
            }
        }
    },
    embedCode: {
        init: function() {
            var self = this;
            var embed = typeof(nhMain.dataInit.embed_code) != _UNDEFINED && nhMain.dataInit.embed_code != null ? nhMain.dataInit.embed_code : {};
            var timeDelay = typeof(embed.time_delay) != _UNDEFINED ? nhMain.utilities.parseInt(embed.time_delay) : 0;
            if (timeDelay > 0) {
                setTimeout(function() {
                    self.loadEmbedDelay();
                }, timeDelay);
            }
        },
        loadEmbedDelay: function() {
            nhMain.callAjax({
                async: false,
                url: '/embed/load-content',
            }).done(function(response) {
                var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                if (code == _SUCCESS) {
                    var head = nhMain.utilities.notEmpty(data.head) ? data.head : '';
                    var top_body = nhMain.utilities.notEmpty(data.top_body) ? data.top_body : '';
                    var bottom_body = nhMain.utilities.notEmpty(data.bottom_body) ? data.bottom_body : '';
                    if (head.length > 0) {
                        $('head').append(head);
                    }
                    if (top_body.length > 0) {
                        $('head').prepend(top_body);
                    }
                    if (bottom_body.length > 0) {
                        $('body').append(bottom_body);
                    }
                }
            });
        }
    },
    social: {
        init: function() {
            var self = this;
            var social = typeof(nhMain.dataInit.social) != _UNDEFINED && nhMain.dataInit.social != null ? nhMain.dataInit.social : {};
            var loadSkdFacebook = typeof(social.facebook_load_sdk) != _UNDEFINED ? nhMain.utilities.parseInt(social.facebook_load_sdk) : 0;
            var facebookSdkDelay = typeof(social.facebook_sdk_delay) != _UNDEFINED ? nhMain.utilities.parseInt(social.facebook_sdk_delay) : 0;
            if (loadSkdFacebook > 0 && facebookSdkDelay > 0) {
                setTimeout(function() {
                    self.loadSdkDelay('facebook');
                }, facebookSdkDelay);
            }
            var loadSkdGoogle = typeof(social.google_load_sdk) != _UNDEFINED ? nhMain.utilities.parseInt(social.google_load_sdk) : 0;
            var googleSdkDelay = typeof(social.google_sdk_delay) != _UNDEFINED ? nhMain.utilities.parseInt(social.google_sdk_delay) : 0;
            if (loadSkdGoogle > 0 && googleSdkDelay > 0) {
                setTimeout(function() {
                    self.loadSdkDelay('google');
                }, facebookSdkDelay);
            }
        },
        loadSdkDelay: function(type = null) {
            var self = this;
            if (!nhMain.utilities.notEmpty(type)) return false;
            nhMain.callAjax({
                async: false,
                dataType: 'html',
                url: '/social/load-sdk/' + type,
            }).done(function(response) {
                $('body').append(response);
            });
        }
    },
    input: {
        inputMask: {
            init: function(el, type = null) {
                var self = this;
                var options = {};
                switch (type) {
                    case 'email':
                        options = self.options.email;
                        el.inputmask(options);
                        break;
                    case 'number':
                        options = self.options.number;
                        el.inputmask('decimal', options);
                        el.focus(function() {
                            $(this).select();
                        });
                        break;
                    default:
                        break;
                }
            },
            options: {
                number: {
                    integerDigits: 13,
                    autoGroup: true,
                    groupSeparator: ',',
                    groupSize: 3,
                    rightAlign: false,
                    allowPlus: false,
                    allowMinus: false,
                    placeholder: ''
                },
                email: {
                    mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
                    greedy: false,
                    onBeforePaste: function(pastedValue, opts) {
                        pastedValue = pastedValue.toLowerCase();
                        return pastedValue.replace("mailto:", "");
                    },
                    definitions: {
                        '*': {
                            validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
                            cardinality: 1,
                            casing: "lower"
                        }
                    }
                }
            }
        }
    }
}
$(document).ready(function() {
    nhMain.init();
});;
'use strict';
var nhMenu = {
    init: function() {
        var self = this;
        if (typeof(nhMain.isMobile) != _UNDEFINED && !nhMain.isMobile) {
            self.stickyMenu();
        }
        self.tabMenu.init();
        self.mainMenu.init();
        if ($('[nh-menu] a[href="' + nhMain.pathname + '"]').length > 0 && !nhMain.isMobile) {
            $('[nh-menu] a[href="' + nhMain.pathname + '"]').each(function(index) {
                $(this).addClass('active');
                var toggleElement = $(this).parents('[nh-toggle-element]');
                if (toggleElement.length == 0) return;
                toggleElement.each(function(index) {
                    $(this).addClass('active').css({
                        'display': 'block'
                    });
                    var key = $(this).attr('nh-toggle-element');
                    $('[nh-toggle="' + key + '"]').addClass('open');
                });
            });
        }
    },
    stickyMenu: function(endPositionStickyMenu = 150) {
        var self = this;
        var sticky = $('.sticky-menu');
        var height = parseInt($('.sticky-menu').css('height'));
        if (sticky.length == 0) return false;
        sticky.wrap('<div style="height:' + height + 'px"></div>');
        var startScroll = $(window).scrollTop();
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();
            scroll > startScroll ? sticky.removeClass('scroll-up').addClass('scroll-down') : sticky.removeClass('scroll-down').addClass('scroll-up'), startScroll = scroll;
            startScroll > endPositionStickyMenu ? sticky.addClass('fix') : sticky.removeClass('fix');
        })
    },
    tabMenu: {
        init: function() {
            var self = this;
            if ($('.tabs-menu').length == 0) return false;
            $('.tabs-menu').each(function(index) {
                var menuObject = $(this);
                var maxHeight = 0;
                $(this).find('.sub-menu').each(function() {
                    var height = parseInt($(this).css('height'));
                    if (height > maxHeight) {
                        maxHeight = height;
                    }
                });
                menuObject.find('.container-menu').css('minHeight', maxHeight);
            });
            $('.tabs-menu .tabs-item > .menu-link').mouseenter(function() {
                var menuObject = $(this).closest('.tabs-menu');
                menuObject.find('.tabs-item').removeClass('active');
                $(this).closest('.tabs-item').addClass('active');
            })
        }
    },
    mainMenu: {
        menuObject: null,
        init: function() {
            var self = this;
            self.menuObject = $('[nh-menu="sidebar"]');
            if (self.menuObject == null || self.menuObject == _UNDEFINED || self.menuObject.length == 0) {
                return false
            };
            $(document).on('click', '[nh-menu="btn-open"]', function(e) {
                e.preventDefault();
                self.toggleMenu(!self.menuObject.hasClass('open'));
            });
            $(document).on('click', '[nh-menu="btn-close"]', function(e) {
                e.preventDefault();
                self.toggleMenu(false);
            });
            $(document).on('click', '.back-drop', function(e) {
                if (($(e.target).is('[nh-menu="close"]') || $(e.target).is('.back-drop.open')) && self.menuObject.hasClass('open')) {
                    self.toggleMenu(false);
                }
            });
        },
        toggleMenu: function(open = true) {
            var self = this;
            self.menuObject.toggleClass('open', open);
            $('.back-drop').toggleClass('open', open);
        },
    }
}
$(document).ready(function() {
    nhMenu.init();
});;
'use strict';
var nhSearch = {
    autoSuggest: {
        keyword: '',
        inputObject: null,
        form: null,
        wrapSuggestionObject: null,
        numberItem: 0,
        startLength: 2,
        init: function() {
            var self = this;
            if ($('input[nh-auto-suggest]').length == 0) {
                return false;
            }
            $(document).on('keyup', 'input[nh-auto-suggest]', function(e) {
                e.preventDefault();
                self.inputObject = $(this);
                self.form = self.inputObject.closest('form');
                if (self.form.length == 0) return false;
                var keyCode = e.keyCode;
                switch (keyCode) {
                    case 40:
                        self.activeItem('down');
                        break;
                    case 38:
                        self.activeItem('up');
                        break;
                    case 13:
                        var indexActive = self.getIndexItemActive();
                        if (indexActive > -1) {
                            self.redirectActiveItem(indexActive);
                        } else {
                            self.form.submit();
                        }
                        break;
                    default:
                        if (self.keyword == $.trim(self.inputObject.val())) return false;
                        self.keyword = $.trim(self.inputObject.val());
                        self.type = self.inputObject.attr('nh-auto-suggest');
                        if (self.keyword.length >= self.startLength) {
                            self.suggestion();
                        } else {
                            self.removeSuggestion();
                        }
                        break;
                }
            });
            $(document).on('click', 'button[nh-btn-submit]', function(e) {
                self.inputObject = $(this);
                self.form = self.inputObject.closest('form');
                self.form.submit();
            });
        },
        getIndexItemActive: function() {
            var self = this;
            if (!self.validateItem()) return false;
            var index = -1;
            var listItem = self.wrapSuggestionObject.find('li');
            $.each(listItem, function(indexItem, itemObject) {
                if ($(itemObject).hasClass('active')) {
                    index = indexItem;
                }
            });
            return index;
        },
        activeItem: function(type = 'down') {
            var self = this;
            if (!self.validateItem()) return false;
            var indexCurrent = self.getIndexItemActive();
            self.removeItemActive();
            var index = 0;
            if (indexCurrent != -1) {
                if (type == 'down') {
                    index = indexCurrent + 1;
                } else {
                    index = indexCurrent - 1;
                }
            }
            if (index < 0) index = 0;
            if (index >= self.numberItem) index = self.numberItem - 1;
            self.wrapSuggestionObject.find('li:eq(' + index + ')').addClass('active');
        },
        redirectActiveItem: function(index) {
            var self = this;
            if (!nhMain.utilities.notEmpty(self.wrapSuggestionObject) || self.wrapSuggestionObject.find('li:eq(' + index + ') a').length == 0) return false;
            var urlRedirect = self.wrapSuggestionObject.find('li:eq(' + index + ') a').attr('href');
            if (!nhMain.utilities.notEmpty(urlRedirect)) return false;
            document.location.href = urlRedirect;
        },
        removeItemActive: function() {
            var self = this;
            if (!self.validateItem()) return false;
            self.wrapSuggestionObject.find('li').removeClass('active');
        },
        validateItem: function() {
            var self = this;
            if (!nhMain.utilities.notEmpty(self.wrapSuggestionObject)) return false;
            if (!self.wrapSuggestionObject.find('li').length > 0) return false;
            return true;
        },
        suggestion: function() {
            var self = this
            if (!nhMain.utilities.notEmpty(self.inputObject)) return false;
            nhMain.callAjax({
                async: true,
                url: '/search/suggest',
                data: {
                    keyword: self.keyword,
                    type: self.type
                },
                dataType: _HTML
            }).done(function(response) {
                self.form.find('.wrap-suggestion').remove();
                self.form.append(response);
                self.wrapSuggestionObject = self.form.find('.wrap-suggestion');
                self.numberItem = self.wrapSuggestionObject.find('li').length;
            });
        },
        removeSuggestion: function() {
            var self = this;
            if (!nhMain.utilities.notEmpty(self.form) || !nhMain.utilities.notEmpty(self.form.find('.wrap-suggestion'))) return false;
            self.form.find('.wrap-suggestion').remove();
        }
    }
}
$(document).ready(function() {
    nhSearch.autoSuggest.init();
});;
'use strict';
var nhTableContent = {
    warpTableNav: null,
    warpTableFixed: null,
    iconSidebar: null,
    tableContent: null,
    tableNav: null,
    htmlTemplate: '\
  <div class="table-content-section">\
   <label nh-table-content="icon" class="table-content-icon" style="display: none">\
    <i class="iconsax isax-category"></i>\
   </label>\
      <div class="box-table-nav">\
    <h4 class="title-table-navigation">\
     <i class="iconsax isax-category"></i>\
     <b>' + nhMain.getLabel('muc_luc_noi_dung') + '</b>\
     <span nh-table-content="expand" class="icon-expand"></span>\
    </h4>\
    <nav nh-table-content="nav" class="collapse show"></nav>\
   </div>\
  </div>',
    init: function() {
        var self = this;
        self.tableContent = '[nh-table-content="content"]';
        if ($(self.tableContent).length == 0) {
            return false;
        }
        self.loadElement();
        self.warpTableNav = $('.table-content-section');
        self.warpTableFixed = '[nh-table-content="fixed"]';
        self.iconSidebar = '[nh-table-content="icon"]';
        self.tableNav = '[nh-table-content="nav"]';
        var headings = 'h1, h2, h3, h4, h5';
        self.makeIdsHeading(self.tableContent, headings);
        tocbot.init({
            tocSelector: self.tableNav,
            contentSelector: self.tableContent,
            headingSelector: headings,
            linkClass: 'table-link',
            activeLinkClass: 'is-active-link',
            listClass: 'table-content',
            listItemClass: 'list-item',
            activeListItemClass: 'is-active-li',
            scrollSmoothOffset: -200,
            headingsOffset: 200,
            hasInnerContainers: true
        });
        self.warpTableNav.on('click', self.iconSidebar, function(e) {
            $(self.warpTableFixed).collapse('show');
        });
        self.warpTableNav.on('click', '[nh-table-content="expand"]', function(e) {
            $(self.tableNav).collapse('toggle');
        });
        $(document).on('click', self.warpTableFixed + ' .title-table-navigation', function(e) {
            $(self.warpTableFixed).collapse('hide');
        });
        $(document).on('click', 'body', function(e) {
            if ((!$(e.target).is('.box-table-fixed *'))) {
                $(self.warpTableFixed).collapse('hide');
            }
        });
        var startPoint = $(self.tableContent).offset().top;
        $(window).scroll(function(event) {
            var endPoint = startPoint + parseInt($(self.tableContent).css('height'));
            var scrollTop = $(this).scrollTop();
            if (scrollTop >= startPoint && scrollTop <= endPoint) {
                $(self.iconSidebar).show();
                self.appendElement();
                $(self.warpTableFixed + ' .collapse').addClass('show');
            } else {
                $(self.iconSidebar).hide();
                $(self.warpTableFixed).collapse('hide');
            }
        });
    },
    appendElement: function() {
        var self = this;
        var html = $('.box-table-nav').html();
        if ($(self.warpTableFixed).length > 0) {
            $(self.warpTableFixed).html('');
            $(self.warpTableFixed).append(html);
        } else {
            var htmlAppend = $('<div nh-table-content="fixed" class="box-table-fixed collapse">').append(html);
            $('body').append(htmlAppend);
        }
    },
    loadElement: function() {
        var self = this;
        $(self.tableContent).before(self.htmlTemplate);
    },
    makeIdsHeading: function(wrapContent = null, heading = []) {
        var self = this;
        if (!nhMain.utilities.notEmpty(wrapContent) || !nhMain.utilities.notEmpty(heading)) return false;
        var content = document.querySelector(wrapContent)
        var headings = content.querySelectorAll(heading)
        var headingMap = {}
        Array.prototype.forEach.call(headings, function(heading) {
            var id = heading.id ? heading.id : heading.textContent.trim().toLowerCase().split(' ').join('-').replace(/[!@#$%^&*():]/ig, '').replace(/\//ig, '-')
            id = nhMain.utilities.noUnicode(id)
            headingMap[id] = !isNaN(headingMap[id]) ? ++headingMap[id] : 0
            if (headingMap[id]) {
                heading.id = id + '-' + headingMap[id]
            } else {
                heading.id = id
            }
        })
    }
}
$(document).ready(function() {
    nhTableContent.init();
});;
'use strict';
var nhProduct = {
    init: function() {
        var self = this;
        self.quickView.init();
        self.selectAttribute.init();
        self.quantityInput.init();
        self.detailProduct.init();
        self.filter.init();
    },
    quickView: {
        idModal: '#quick-view-modal',
        init: function() {
            var self = this;
            if ($(self.idModal).length == 0) {
                return false;
            }
            $(document).on('click', '[nh-btn-action="quick-view"]', function(e) {
                $(this).tooltip('hide');
                $(this).addClass('effect-spin');
                var productId = $(this).data('product-id');
                if (!productId > 0) {
                    nhMain.showLog(nhMain.getLabel('khong_lay_duoc_ID_san_pham'));
                    return false;
                }
                var _modal = $(self.idModal);
                nhMain.callAjax({
                    async: true,
                    url: '/product/quick-view/' + productId,
                    dataType: _HTML,
                }).done(function(response) {
                    _modal.find('.modal-content').html(response);
                    nhMain.initLibrary();
                    nhProduct.selectAttribute.activeOptionDefault(_modal.find('[nh-product]'));
                    _modal.modal('show');
                });
            });
            $(self.idModal).on('shown.bs.modal', function() {
                $('[nh-btn-action="quick-view"]').removeClass('effect-spin');
                $('[nh-owl-slick]').slick('setPosition');
            });
            $(self.idModal).on('hide.bs.modal', function() {
                $(this).find('.modal-content').html('');
            });
        }
    },
    detailProduct: {
        init: function() {
            var self = this;
            if ($('[nh-product-detail]').length == 0) {
                return false;
            }
            nhProduct.selectAttribute.activeOptionDefault($('[nh-product-detail]'));
        }
    },
    selectAttribute: {
        wrapElement: null,
        attributeSpecial: {},
        init: function() {
            var self = this;
            $(document).on('click', '[nh-attribute-option]', function(e) {
                var attributeElement = $(this).closest('[nh-attribute]');
                if ($(this).attr('data-trigger') != _UNDEFINED) {
                    $('[nh-slider-thumbs]').find('img[src="' + $(this).attr('data-trigger') + '"]').trigger('click');
                }
                attributeElement.find('[nh-attribute-option]').removeClass('active');
                $(this).addClass('active');
                self.selectAttributeOption($(this).closest('[nh-product]'));
            });
            $(document).on('click', '[nh-btn-action="clear-attribute-option"]', function(e) {
                self.clearOptions($(this).closest('[nh-product]'));
            });
        },
        validateElement: function(wrapElement = null) {
            var self = this;
            if (wrapElement == null || wrapElement == _UNDEFINED || wrapElement.length == 0) {
                nhMain.showLog(nhMain.getLabel('khong_tim_thay_the_bao_ngoai_san_pham') + ' [nh-product]');
                return false
            };
            self.wrapElement = wrapElement;
            self.attributeSpecial = {};
            if (self.wrapElement.attr('nh-product-attribute-special') != _UNDEFINED && self.wrapElement.attr('nh-product-attribute-special').length > 0) {
                self.attributeSpecial = nhMain.utilities.parseJsonToObject(self.wrapElement.attr('nh-product-attribute-special'));
            }
            if ($.isEmptyObject(self.attributeSpecial)) {
                return false;
            }
            return true;
        },
        selectAttributeOption: function(wrapElement = null) {
            var self = this;
            var validateElement = self.validateElement(wrapElement);
            if (!validateElement) return false;
            var optionSelected = [];
            self.wrapElement.find('[nh-attribute]').each(function(index) {
                var attributeElement = $(this);
                var attributeCode = attributeElement.attr('nh-attribute');
                attributeElement.find('[nh-attribute-option].active').each(function(index) {
                    var optionElement = $(this);
                    var optionCode = optionElement.attr('nh-attribute-option');
                    optionSelected.push(attributeCode);
                    optionSelected.push(optionCode);
                });
            });
            var labelPrice = self.wrapElement.find('[nh-label-price]');
            var labelPriceSpecial = self.wrapElement.find('[nh-label-price-special]');
            var labelCode = self.wrapElement.find('[nh-label-code]');
            var productItemId = null;
            var price = null;
            var priceSpecial = null;
            var applySpecial = false;
            var checkQuantity = false;
            if (typeof(nhMain.dataInit.product) != _UNDEFINED && nhMain.utilities.notEmpty(nhMain.dataInit.product.check_quantity)) {
                checkQuantity = true;
            }
            var quantityAvailable = 0;
            var code = null;
            if (!$.isEmptyObject(optionSelected) && !$.isEmptyObject(self.attributeSpecial)) {
                var specialCode = optionSelected.join('_');
                var itemSpecial = typeof(self.attributeSpecial[specialCode]) != _UNDEFINED ? self.attributeSpecial[specialCode] : {};
                applySpecial = typeof(itemSpecial.apply_special) != _UNDEFINED ? itemSpecial.apply_special : false;
                productItemId = typeof(itemSpecial.product_item_id) != _UNDEFINED ? itemSpecial.product_item_id : null;
                price = typeof(itemSpecial.price) != _UNDEFINED ? itemSpecial.price : null;
                priceSpecial = typeof(itemSpecial.price_special) != _UNDEFINED ? itemSpecial.price_special : null;
                quantityAvailable = typeof(itemSpecial.quantity_available) != _UNDEFINED ? nhMain.utilities.parseInt(itemSpecial.quantity_available) : 0;
                code = typeof(itemSpecial.code) != _UNDEFINED ? itemSpecial.code : null;
            }
            if (productItemId > 0) {
                labelPriceSpecial.toggleClass('d-none', !applySpecial);
                if (applySpecial) {
                    labelPrice.find('[nh-label-value]').text(nhMain.utilities.parseNumberToTextMoney(priceSpecial));
                    labelPriceSpecial.find('[nh-label-value]').text(nhMain.utilities.parseNumberToTextMoney(price));
                } else {
                    labelPrice.find('[nh-label-value]').text(nhMain.utilities.parseNumberToTextMoney(price));
                }
                labelCode.text(code);
                if (checkQuantity) {
                    self.wrapElement.find('[nh-quantity-product="wrap"]').toggleClass('d-none', !quantityAvailable > 0);
                    self.wrapElement.find('[nh-btn-action="add-cart"]').toggleClass('d-none', !quantityAvailable > 0);
                    self.wrapElement.find('[nh-quantity-product="out-stock"]').toggleClass('d-none', quantityAvailable > 0);
                }
                if (self.wrapElement.find('[nh-label-unit]').length > 0) {
                    self.wrapElement.find('[nh-label-unit]').text(' / ' + self.wrapElement.find('[nh-attribute] [nh-attribute-option].active').attr('nh-attribute-option'));
                }
            }
            self.wrapElement.attr('nh-product-item-id', productItemId);
            self.wrapElement.find('[nh-btn-action="add-cart"]').toggleClass('disable', !productItemId > 0)
        },
        clearOptions: function(wrapElement = null) {
            var self = this;
            var validateElement = self.validateElement(wrapElement);
            if (!validateElement) return false;
            self.wrapElement.find('[nh-attribute-option]').removeClass('active');
            self.wrapElement.attr('nh-product-item-id', '');
            self.wrapElement.find('[nh-btn-action="add-cart"]').addClass('disable');
        },
        activeOptionDefault: function(wrapElement = null) {
            var self = this;
            var validateElement = self.validateElement(wrapElement);
            if (!validateElement) return false;
            var productItemId = self.wrapElement.attr('nh-product-item-id');
            if (!productItemId > 0) return false;
            var keySpecialString = null;
            $.each(self.attributeSpecial, function(key, item) {
                if (typeof(item.product_item_id) != _UNDEFINED && item.product_item_id == productItemId) {
                    keySpecialString = key;
                }
            });
            if (keySpecialString == null || keySpecialString.length == 0) return false;
            var keySpecial = [];
            var keySpecialArray = keySpecialString.split('_');
            while (keySpecialArray.length) {
                keySpecial.push(keySpecialArray.splice(0, 2));
            }
            $.each(keySpecial, function(index, item) {
                var attributeCode = typeof(item[0]) != _UNDEFINED ? item[0] : null;
                var optionCode = typeof(item[1]) != _UNDEFINED ? item[1] : null;
                if (attributeCode == null || optionCode == null) return;
                var elementAttribute = self.wrapElement.find('[nh-attribute="' + attributeCode + '"]');
                if (elementAttribute.length == 0) return;
                var elementOption = elementAttribute.find('[nh-attribute-option="' + optionCode + '"]');
                if (elementOption.length == 0) return;
                elementOption.addClass('active');
            });
        }
    },
    quantityInput: {
        init: function() {
            var self = this;
            var min = 1;
            var max = 1000;
            $(document).on('click', '[nh-quantity-product="subtract"]', function(e) {
                var wrapElement = $(this).closest('[nh-quantity-product="wrap"]');
                var input = wrapElement.find('[nh-quantity-product="quantity"]');
                var value = nhMain.utilities.parseInt(input.val()) - 1;
                if (value < min) value = min;
                input.val(value);
            });
            $(document).on('click', '[nh-quantity-product="add"]', function(e) {
                var wrapElement = $(this).closest('[nh-quantity-product="wrap"]');
                var input = wrapElement.find('[nh-quantity-product="quantity"]');
                var value = nhMain.utilities.parseInt(input.val()) + 1;
                if (value > max) value = max;
                input.val(value);
            });
        }
    },
    filter: {
        wrapElement: null,
        priceRangerEl: null,
        minRangerPrice: 0,
        maxRangerPrice: 10000000,
        stepPrice: 500000,
        toPriceEl: null,
        fromPriceEl: null,
        btnRangerPrice: '[nh-price-range=button]',
        init: function() {
            var self = this;
            self.showFilterAdvanced();
            self.wrapElement = $('[nh-filter-params]');
            if (self.wrapElement.length == 0) {
                return false;
            }
            self.wrapElement.on('click', 'a[href]', function(e) {
                nhMain.showLoading.page()
            });
            self.priceRanger();
            self.getPriceFromUrl();
        },
        showFilterAdvanced: function() {
            var self = this;
            $(document).on('click', '[nh-filter="btn-toggle"]', function(e) {
                if (nhMain.utilities.notEmpty($('#click_show'))) {
                    $('#click_show').toggleClass('toggle');
                }
            });
            $(document).on('click', '[nh-filter="close"]', function(e) {
                if (nhMain.utilities.notEmpty($('#click_show'))) {
                    $('#click_show').removeClass('toggle');
                }
            });
        },
        priceRanger: function() {
            var self = this;
            self.priceRangerEl = self.wrapElement.find('[nh-price-range=slider]');
            self.fromPriceEl = self.wrapElement.find('[nh-price-range=from]');
            self.toPriceEl = self.wrapElement.find('[nh-price-range=to]');
            if (self.priceRangerEl.length == 0 || self.fromPriceEl.length == 0 || self.toPriceEl.length == 0 || self.btnRangerPrice == 0) return false;
            self.priceRangerEl.slider({
                range: true,
                min: self.minRangerPrice,
                max: self.maxRangerPrice,
                step: self.stepPrice,
                slide: function(event, ui) {
                    self.fromPriceEl.text(nhMain.utilities.parseNumberToTextMoney(ui.values[0]));
                    self.toPriceEl.text(nhMain.utilities.parseNumberToTextMoney(ui.values[1]));
                    self.updateBtnSliderPrice(ui.values[0], ui.values[1]);
                }
            });
        },
        getPriceFromUrl: function() {
            var self = this;
            var params = nhMain.utilities.getUrlVars();
            if (typeof(params.price_from) == _UNDEFINED && typeof(params.price_to) == _UNDEFINED) {
                self.updateSliderPrice(self.minRangerPrice, self.maxRangerPrice);
            } else {
                var priceFrom = nhMain.utilities.notEmpty(params.price_from) ? nhMain.utilities.parseInt(params.price_from) : self.minRangerPrice;
                var priceTo = nhMain.utilities.notEmpty(params.price_to) ? nhMain.utilities.parseInt(params.price_to) : self.maxRangerPrice;
                self.updateSliderPrice(priceFrom, priceTo);
            }
        },
        updateSliderPrice: function(fromPrice = self.minRangerPrice, toPrice = self.maxRangerPrice) {
            var self = this;
            if (self.priceRangerEl.length == 0 || self.fromPriceEl.length == 0 || self.toPriceEl.length == 0) return false;
            self.priceRangerEl.slider("values", [fromPrice, toPrice]);
            self.fromPriceEl.text(nhMain.utilities.parseNumberToTextMoney(fromPrice));
            self.toPriceEl.text(nhMain.utilities.parseNumberToTextMoney(toPrice));
            self.updateBtnSliderPrice(fromPrice, toPrice);
        },
        updateBtnSliderPrice: function(fromPrice = self.minRangerPrice, toPrice = self.maxRangerPrice) {
            var self = this;
            if (self.btnRangerPrice == 0) return false;
            var params = nhMain.utilities.getUrlVars();
            $.extend(params, {
                'price_from': fromPrice,
                'price_to': toPrice
            });
            var url = nhMain.pathname;
            if ($.isEmptyObject(params)) {
                url = nhMain.utilities.replaceUrlParam(url, 'price_from', fromPrice);
                url = nhMain.utilities.replaceUrlParam(url, 'price_to', toPrice);
            } else {
                $.each(params, function(index, value) {
                    url = nhMain.utilities.replaceUrlParam(url, index, value);
                });
            }
            $(self.btnRangerPrice).attr('nh-link-redirect', url);
        }
    }
}
$(document).ready(function() {
    nhProduct.init();
});;
'use strict';
var nhOrder = {
    init: function() {
        var self = this;
        self.cart.init();
        self.sidebar.init();
        self.orderInfo.init();
        self.checkout.init();
        self.coupon.init();
        self.point.init();
        self.affiliate.init();
        self.shippingMethod.init();
    },
    cart: {
        wrapElement: null,
        init: function() {
            var self = this;
            var checkChangeQuantity = false;
            $(document).on('click', '[nh-btn-action="add-cart"]:not(.disable)', function(e) {
                e.preventDefault();
                $(this).tooltip('hide');
                var wrapElement = $(this).closest('[nh-product]');
                if (wrapElement == _UNDEFINED || wrapElement.length == 0) {
                    nhMain.showLog(nhMain.getLabel('khong_tim_thay_the_bao_ngoai_san_pham') + ' [nh-product]');
                    return false;
                };
                var productItemId = wrapElement.attr('nh-product-item-id');
                var btnAddCart = $(this);
                var inputQuantity = wrapElement.find('input[nh-quantity-product="quantity"]');
                var quantity = inputQuantity.length > 0 ? nhMain.utilities.parseInt(inputQuantity.val()) : 1;
                var redirect = btnAddCart.attr('nh-redirect');
                if (productItemId == _UNDEFINED || !productItemId > 0) {
                    nhMain.showAlert(_ERROR, nhMain.getLabel('khong_lay_duoc_thong_tin_san_pham'));
                    return false;
                }
                btnAddCart.addClass('effect-spin');
                self.addProductToCart(productItemId, quantity, function() {
                    nhOrder.sidebar.reloadSidebarCart(function() {
                        if (typeof(redirect) != _UNDEFINED && redirect.length > 0) {
                            window.location.href = redirect;
                            return false;
                        }
                        if (typeof(nhProduct) != _UNDEFINED && $(nhProduct.quickView.idModal).length > 0) {
                            $(nhProduct.quickView.idModal).modal('hide');
                        }
                        nhOrder.sidebar.toggleSidebarCart(true);
                    });
                    btnAddCart.removeClass('effect-spin');
                });
            });
            $(document).on('click', '[nh-quantity-product="subtract"], [nh-quantity-product="add"]', function(e) {
                e.preventDefault();
                var wrapCartInfo = $('[nh-cart-info]');
                var itemElement = $(this).closest('[nh-cart-item]');
                if (itemElement.length == 0) return false;
                var quantity = itemElement.find('input[nh-quantity-product="quantity"]').val();
                var old_quantity = itemElement.attr('nh-cart-item-quantity');
                var price = itemElement.find('[nh-cart-price]').attr('nh-cart-price');
                var totalItem = itemElement.find('[nh-cart-total-item]');
                var total = wrapCartInfo.find('[nh-cart-total]');
                if (quantity != old_quantity) {
                    checkChangeQuantity = true;
                }
                totalItem.text(nhMain.utilities.parseNumberToTextMoney(quantity * price));
                totalItem.attr('nh-cart-total-item', quantity * price);
                var sumTotal = 0;
                wrapCartInfo.find('[nh-cart-item]').each(function(index) {
                    sumTotal += Number($(this).find('[nh-cart-total-item]').attr('nh-cart-total-item'));
                });
                total.text(nhMain.utilities.parseNumberToTextMoney(sumTotal));
            });
            $(document).on('click', '[nh-cart-action="checkout"]', function(e) {
                e.preventDefault();
                if (typeof(checkChangeQuantity) != _UNDEFINED && Boolean(checkChangeQuantity)) {
                    var items = [];
                    $('[nh-cart-item]').each(function(index) {
                        var productItemId = $(this).attr('nh-cart-item');
                        var quantity = $(this).find('input[nh-quantity-product="quantity"]').val();
                        if (productItemId > 0 && quantity > 0) {
                            items.push({
                                'product_item_id': productItemId,
                                'quantity': quantity
                            });
                        }
                    });
                    if ($.isEmptyObject(items)) {
                        nhMain.showAlert(_ERROR, nhMain.getLabel('khong_lay_duoc_thong_tin_gio_hang'));
                        return false;
                    }
                    nhMain.showLoading.page();
                    self.updateCart(items, function() {
                        window.location.href = '/order/info';
                    });
                } else {
                    window.location.href = '/order/info';
                }
            });
            $(document).on('click', '[nh-update-item-cart]', function(e) {
                e.preventDefault();
                var item = [];
                var wrapElement = $(this).closest('[nh-cart-item]');
                var productItemId = wrapElement.attr('nh-cart-item');
                var quantity = wrapElement.find('input[nh-quantity-product="quantity"]').val();
                if (productItemId > 0 && quantity > 0) {
                    item = [{
                        'product_item_id': productItemId,
                        'quantity': quantity
                    }]
                }
                if ($.isEmptyObject(item)) {
                    nhMain.showAlert(_ERROR, nhMain.getLabel('khong_lay_duoc_thong_tin_gio_hang'));
                    return false;
                }
                self.updateCart(item, function() {
                    nhMain.showAlert(_SUCCESS, nhMain.getLabel('cap_nhap_gio_hang_thanh_cong'));
                    var wrapCartInfo = $('[nh-cart-info]');
                    if (wrapCartInfo.length > 0) {
                        location.reload();
                    }
                    nhOrder.sidebar.reloadSidebarCart();
                });
            });
            $(document).on('click', '[nh-remove-item-cart]', function(e) {
                e.preventDefault();
                var productItemId = $(this).attr('nh-remove-item-cart');
                if (productItemId > 0) {
                    nhMain.showAlert(_WARNING, nhMain.getLabel('ban_co_muon_xoa_san_pham_nay_khoi_gio_hang_khong'), function() {
                        nhOrder.cart.removeProductInCart(productItemId, function() {
                            nhMain.showAlert(_SUCCESS, nhMain.getLabel('cap_nhap_gio_hang_thanh_cong'));
                            var wrapCartInfo = $('[nh-cart-info]');
                            if (wrapCartInfo.length > 0) {
                                location.reload();
                            }
                            nhOrder.sidebar.reloadSidebarCart();
                        });
                    });
                }
            });
            $(document).on('click', '[nh-btn-action="select-option"]:not(.disable)', function(e) {
                e.preventDefault();
                $(this).tooltip('hide');
                var wrapElement = $(this).closest('[nh-product]');
                if (wrapElement == _UNDEFINED || wrapElement.length == 0) {
                    nhMain.showLog(nhMain.getLabel('khong_tim_thay_the_bao_ngoai_san_pham') + ' [nh-product]');
                    return false;
                };
                wrapElement.find('.inner-image').addClass('effect-attribute-cart');
                if (typeof(nhProduct.selectAttribute) != _UNDEFINED) {
                    nhProduct.selectAttribute.activeOptionDefault(wrapElement);
                }
                setTimeout(function() {
                    wrapElement.addClass('active-quick-shop');
                }, 500);
                setTimeout(function() {
                    wrapElement.find('.inner-image').removeClass('effect-attribute-cart');
                }, 900);
            });
            $(document).on('click', '[nh-btn-action="close-quick-shop"]:not(.disable)', function(e) {
                var wrapElement = $(this).closest('[nh-product]');
                if (wrapElement == _UNDEFINED || wrapElement.length == 0) {
                    nhMain.showLog(nhMain.getLabel('khong_tim_thay_the_bao_ngoai_san_pham') + ' [nh-product]');
                    return false;
                };
                wrapElement.removeClass('active-quick-shop');
            });
            $(document).on('change', '[name="product_buy_discount"], input[nh-quantity-product="quantity"]', function(e) {
                var wrapElement = $(this).closest('[nh-product]');
                var inputQuantity = wrapElement.find('input[nh-quantity-product="quantity"]');
                var quantity = inputQuantity.length > 0 ? nhMain.utilities.parseInt(inputQuantity.val()) : 1;
                var total = quantity * parseInt(wrapElement.data('price'));
                $('[name="product_buy_discount"]:checked').each(function() {
                    total += quantity * parseInt($(this).data('price'));
                })
                $('[nh-label-all-price]').text(nhMain.utilities.parseNumberToTextMoney(total));
            });
            $(document).on('click', '[nh-quantity-product="subtract"], [nh-quantity-product="add"]', function(e) {
                var itemElement = $(this).closest('[nh-cart-item]');
                self.calculateBuyTogether();
                if (itemElement.length == 0) return false;
                var quantity = itemElement.find('input[nh-quantity-product="quantity"]').val();
                var old_quantity = itemElement.attr('nh-cart-item-quantity');
                if (quantity != old_quantity) {
                    $('[nh-btn-action="update-cart"]').removeClass('d-none');
                }
            });
            $(document).on('click', '[name="buy_together"]', function(e) {
                self.calculateBuyTogether();
            });
            $(document).on('click', '[nh-btn-action="add-multi-cart"]:not(.disable)', function(e) {
                var btnAddCart = $(this);
                btnAddCart.tooltip('hide');
                btnAddCart.addClass('effect-spin');
                var productItem = [];
                var productQuantity = [];
                $('[name="buy_together"]:checked').each(function() {
                    let element = $(this).closest('[item-buy-together]');
                    let quantity = nhMain.utilities.parseInt($('[nh-quantity-product="quantity"]', element).val());
                    productItem.push($(this).val());
                    productQuantity.push(quantity);
                })
                self.addMultiProductToCart(productItem, productQuantity, function(response) {
                    btnAddCart.removeClass('effect-spin');
                    var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                    var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                    if (code == _ERROR) {
                        nhMain.showAlert(_ERROR, message);
                    }
                    if (code == _SUCCESS && typeof(nhOrder.sidebar) != _UNDEFINED) {
                        nhOrder.sidebar.reloadSidebarCart(function() {
                            if (typeof(redirect) != _UNDEFINED && redirect.length > 0) {
                                window.location.href = redirect;
                                return false;
                            }
                            if (typeof(nhProduct) != _UNDEFINED && $(nhProduct.quickView.idModal).length > 0) {
                                $(nhProduct.quickView.idModal).modal('hide');
                            }
                            nhOrder.sidebar.toggleSidebarCart(true);
                        });
                        btnAddCart.removeClass('effect-spin');
                    }
                });
            })
        },
        calculateBuyTogether: function() {
            var total = 0;
            $('[name="buy_together"]:checked').each(function() {
                let element = $(this).closest('[item-buy-together]');
                let quantity = nhMain.utilities.parseInt($('[nh-quantity-product="quantity"]', element).val());
                let price = nhMain.utilities.parseInt($(this).attr('data-price'));
                total += price * quantity;
            })
            $('[total-buy-together]').text(nhMain.utilities.parseNumberToTextMoney(total));
        },
        calculateAddToCart: function(btnAddCart, callback = null) {
            var self = this;
            var wrapElement = btnAddCart.closest('[nh-product]');
            if (wrapElement == _UNDEFINED || wrapElement.length == 0) {
                nhMain.showLog(nhMain.getLabel('khong_tim_thay_the_bao_ngoai_san_pham') + ' [nh-product]');
                return false;
            };
            var productItem = [];
            var productQuantity = [];
            var total = 0;
            $('[name="buy_together"]:checked').each(function() {
                let element = $(this).closest('[item-buy-together]');
                let quantity = nhMain.utilities.parseInt($('[nh-quantity-product="quantity"]', element).val());
                let price = nhMain.utilities.parseInt(element.attr('data-price'));
                productItem.push($(this).val());
                productQuantity.push(quantity);
                total += price * quantity;
            })
            $('[total-buy-together]').text(nhMain.utilities.parseNumberToTextMoney(total));
            self.addMultiProductToCart(productItem, productQuantity, callback);
        },
        addMultiProductToCart: function(productItemId = null, quantity = 1, callback = null) {
            var self = this;
            if (typeof(callback) != 'function') {
                callback = function() {};
            }
            if (productItemId.length == 0 || !quantity > 0) {
                nhMain.showLog(nhMain.getLabel('du_lieu_khong_hop_le'));
                return false;
            }
            nhMain.callAjax({
                async: true,
                url: '/cart/add-multi-product',
                data: {
                    product_item_id: productItemId,
                    quantity: quantity
                },
            }).done(function(response) {
                callback(response);
            });
        },
        addProductToCart: function(productItemId = null, quantity = 1, callback = null) {
            var self = this;
            if (typeof(callback) != 'function') {
                callback = function() {};
            }
            if (!productItemId > 0 || !quantity > 0) {
                nhMain.showLog(nhMain.getLabel('du_lieu_khong_hop_le'));
                return false;
            }
            nhMain.callAjax({
                async: true,
                url: '/cart/add-product',
                data: {
                    product_item_id: productItemId,
                    quantity: quantity
                },
            }).done(function(response) {
                var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                if (code == _ERROR) {
                    nhMain.showAlert(_ERROR, message);
                }
                if (code == _SUCCESS && typeof(nhOrder.sidebar) != _UNDEFINED) {
                    callback(response);
                }
            });
        },
        removeProductInCart: function(productItemId = null, callback = null) {
            var self = this;
            if (typeof(callback) != 'function') {
                callback = function() {};
            }
            nhMain.callAjax({
                async: true,
                url: '/cart/remove-product',
                data: {
                    product_item_id: productItemId
                },
            }).done(function(response) {
                var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                if (code == _SUCCESS) {
                    callback();
                } else {
                    nhMain.showAlert(_ERROR, message);
                }
            });
        },
        updateCart: function(items = [], callback = null) {
            var self = this;
            if (typeof(callback) != 'function') {
                callback = function() {};
            }
            nhMain.callAjax({
                async: true,
                url: '/cart/update',
                data: {
                    items: items
                }
            }).done(function(response) {
                var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                if (code == _SUCCESS) {
                    callback();
                } else {
                    nhMain.showAlert(_ERROR, message);
                }
            });
        }
    },
    sidebar: {
        sidebarCartElement: null,
        miniCartElement: null,
        init: function() {
            var self = this;
            self.sidebarCartElement = $('[nh-mini-cart="sidebar"]');
            if (self.sidebarCartElement == null || self.sidebarCartElement == _UNDEFINED || self.sidebarCartElement.length == 0) {
                return false
            };
            self.miniCartElement = $('[nh-total-quantity-mini-cart]');
            var cartInfo = typeof(nhMain.dataInit.cart) != _UNDEFINED && nhMain.dataInit.cart != null ? nhMain.dataInit.cart : {};
            if (!$.isEmptyObject(cartInfo)) {
                nhOrder.sidebar.reloadSidebarCart();
            }
            $(document).on('click', '[nh-mini-cart="open"]', function(e) {
                e.preventDefault();
                self.toggleSidebarCart(!self.sidebarCartElement.hasClass('open'));
            });
            $(document).on('click', '[nh-mini-cart="close"]', function(e) {
                e.preventDefault();
                self.toggleSidebarCart(false);
            });
            $(document).on('click', '[nh-remove-item-mini-cart]', function(e) {
                e.preventDefault();
                var productItemId = $(this).attr('nh-remove-item-mini-cart');
                if (productItemId > 0) {
                    nhMain.showAlert(_WARNING, nhMain.getLabel('ban_co_muon_xoa_san_pham_nay_khoi_gio_hang_khong'), function() {
                        nhOrder.cart.removeProductInCart(productItemId, function() {
                            self.reloadSidebarCart();
                        });
                    });
                }
            });
            $(document).on('click', 'body', function(e) {
                if (($(e.target).is('[nh-mini-cart="close"]') || $(e.target).is('body.dark-overlay')) && self.sidebarCartElement.hasClass('open')) {
                    self.toggleSidebarCart(false);
                }
            });
        },
        toggleSidebarCart: function(open = true) {
            var self = this;
            self.sidebarCartElement.toggleClass('open', open);
            $('body').toggleClass('dark-overlay', open);
        },
        reloadSidebarCart: function(callback = null) {
            var self = this;
            if (typeof(callback) != 'function') {
                callback = function() {};
            }
            nhMain.showLoading.block(self.sidebarCartElement);
            nhMain.callAjax({
                url: '/cart/reload-sidebar-cart',
                dataType: 'html'
            }).done(function(response) {
                self.sidebarCartElement.find('.content-mini-cart').html(response);
                var totalQuantityCart = nhMain.utilities.parseInt(self.sidebarCartElement.find('[nh-total-quantity-cart]').attr('nh-total-quantity-cart'));
                if (self.miniCartElement.length > 0) {
                    self.miniCartElement.html(totalQuantityCart);
                }
                nhMain.showLoading.remove();
                callback();
            });
        }
    },
    orderInfo: {
        formElement: null,
        updateAddressModal: null,
        init: function() {
            var self = this;
            self.formElement = $('#order-info');
            self.updateAddressModal = $('#update-address-modal');
            if (self.formElement.length == 0) return;
            nhMain.location.init({
                idWrap: ['#order-info']
            });
            nhMain.validation.phoneVn();
            var validator = self.formElement.validate({
                ignore: ':hidden',
                rules: {
                    full_name: {
                        required: true,
                        maxlength: 255
                    },
                    phone: {
                        required: true,
                        minlength: 10,
                        maxlength: 11,
                        phoneVN: true
                    },
                    address: {
                        required: true,
                    },
                    city_id: {
                        required: true,
                    },
                    district_id: {
                        required: true,
                    },
                },
                messages: {
                    full_name: {
                        required: nhMain.getLabel('vui_long_nhap_thong_tin'),
                        minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan'),
                        maxlength: nhMain.getLabel('thong_tin_nhap_qua_dai')
                    },
                    phone: {
                        required: nhMain.getLabel('vui_long_nhap_thong_tin'),
                        minlength: nhMain.getLabel('so_dien_thoai_khong_hop_le'),
                        maxlength: nhMain.getLabel('so_dien_thoai_khong_hop_le')
                    },
                    email: {
                        required: nhMain.getLabel('vui_long_nhap_thong_tin'),
                        email: nhMain.getLabel('email_chua_dung_dinh_dang'),
                        minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan'),
                        maxlength: nhMain.getLabel('thong_tin_nhap_qua_dai')
                    },
                    address: {
                        required: nhMain.getLabel('vui_long_nhap_thong_tin'),
                    },
                    city_id: {
                        required: nhMain.getLabel('vui_long_chon_thong_tin'),
                    },
                    district_id: {
                        required: nhMain.getLabel('vui_long_chon_thong_tin'),
                    }
                },
                errorPlacement: function(error, element) {
                    if (element.hasClass('selectpicker')) {
                        var formGroup = element.closest('.form-group');
                        formGroup.append(error.addClass('invalid-feedback'));
                    } else {
                        element.after(error.addClass('invalid-feedback'));
                    }
                },
                invalidHandler: function(event, validator) {
                    validator.errorList[0].element.focus();
                },
            });
            $(document).on('click', '[nh-btn-action="create-order"]', function(e) {
                e.preventDefault();
                if (validator.form()) {
                    nhMain.showLoading.page();
                    var formData = self.formElement.serialize();
                    nhMain.callAjax({
                        url: '/order/create',
                        data: formData
                    }).done(function(response) {
                        var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                        var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                        var status = typeof(response.status) != _UNDEFINED ? response.status : null;
                        var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                        var orderCode = nhMain.utilities.notEmpty(data.code) ? data.code : '';
                        var total = nhMain.utilities.notEmpty(data.total) ? nhMain.utilities.parseFloat(data.total) : 0;
                        var paid = nhMain.utilities.notEmpty(data.paid) ? nhMain.utilities.parseFloat(data.paid) : 0;
                        var debt = nhMain.utilities.notEmpty(data.debt) ? nhMain.utilities.parseFloat(data.debt) : 0;
                        if (code == _ERROR && status == 511) {
                            nhMain.showAlert(_ERROR, message);
                            setTimeout(function() {
                                window.location.href = '/order/error';
                            }, 2000);
                            return false;
                        }
                        nhMain.showLoading.remove();
                        if (code == _ERROR && status != 511) {
                            nhMain.showAlert(_ERROR, message);
                            return false;
                        }
                        if (total == paid && debt == 0) {
                            window.location.href = '/order/success?code=' + orderCode;
                        } else {
                            $('[name="code"]').val(orderCode);
                            nhOrder.checkout.process();
                        }
                    });
                }
            });
            $(document).on('click', '[nh-address="list"]', function(e) {
                self.updateAddressModal.modal('show');
                $('[nh-form="member-address"]').find('input[name="callback"]').val('contact');
            });
            $(document).on('click', '[nh-table="choose-row"] tbody tr', function(e) {
                var addressId = $(this).attr('data-address-id');
                if (!nhMain.utilities.notEmpty(addressId)) return false;
                self.chooseAddress(addressId, function(data) {
                    self.updateAddressModal.modal('hide');
                });
            });
            $(document).on('click', '[nh-order-login]', function(e) {
                var loginModal = $('#login-modal');
                if (loginModal.length > 0) {
                    loginModal.modal('show');
                    loginModal.find('input[name="redirect"]').val(window.location.href);
                } else {
                    window.location.href = '/member/login';
                }
            });
            $(document).on('change', '#city_id', function(e) {
                var shippingMethodId = $('[nh-shipping-method]').attr('nh-shipping-method');
                var cityId = $('#order-info').find('select[name="city_id"]').val();
                nhOrder.shippingMethod.loadListShippingMethod(cityId, shippingMethodId);
            });
        },
        chooseAddress: function(address_id = null, callback = null) {
            var self = this;
            if (typeof(callback) != 'function') {
                callback = function() {};
            }
            if (!nhMain.utilities.notEmpty(address_id)) return false;
            nhMain.callAjax({
                url: '/order/choose-address',
                data: {
                    address_id: address_id
                }
            }).done(function(response) {
                var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                var status = typeof(response.status) != _UNDEFINED ? response.status : null;
                var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                var orderCode = typeof(data.code) != _UNDEFINED ? data.code : null;
                if (code == _ERROR && status == 511) {
                    var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                    nhMain.showAlert(_ERROR, message);
                    setTimeout(function() {
                        window.location.href = '/order/error';
                    }, 2000);
                    return false;
                }
                if (code == _ERROR && status != 511) {
                    nhMain.showAlert(_ERROR, message);
                    return false;
                }
                if (code == _SUCCESS) {
                    self.reload();
                    callback(data);
                }
            });
        },
        reload: function(viewReload = null, wrapElement = null) {
            var self = this;
            if (wrapElement == null || wrapElement.length == 0) {
                wrapElement = $('[nh-order-info]');
            }
            var formData = self.formElement.serialize();
            if (viewReload != null && viewReload.length > 0) {
                var firstChar = formData.length > 0 ? '&' : '';
                formData += firstChar + 'view_reload=' + viewReload;
            }
            nhMain.showLoading.page();
            nhMain.callAjax({
                url: '/order/info',
                dataType: _HTML,
                data: formData
            }).done(function(response) {
                wrapElement.html(response);
                nhMain.showLoading.remove();
                $(document).find('.selectpicker').selectpicker('refresh');
                nhMain.input.inputMask.init($(document).find('.number-input'), 'number');
            });
        }
    },
    checkout: {
        init: function() {
            var self = this;
            var formElement = $('#form-checkout');
            $(document).on('click', '[nh-btn-action="checkout"]', function(e) {
                e.preventDefault();
                self.process();
            });
        },
        process: function() {
            var formElement = $('#order-info');
            var paymentGateway = $('[nh-gateway-item].active').attr('nh-gateway-item');
            if (typeof(paymentGateway) == _UNDEFINED || paymentGateway.length == 0) {
                nhMain.showAlert(_ERROR, nhMain.getLabel('khong_lay_duoc_ma_phuong_thuc_thanh_toan'));
                return false;
            }
            formElement.find('input[name="payment_gateway"]').val(paymentGateway);
            var formData = formElement.serialize();
            nhMain.showLoading.page();
            nhMain.callAjax({
                url: '/order/checkout/process',
                data: formData
            }).done(function(response) {
                nhMain.showLoading.remove();
                var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                var orderCode = typeof(data.code) != _UNDEFINED ? data.code : null;
                var urlCheckout = typeof(data.url) != _UNDEFINED ? data.url : null;
                if (code != _SUCCESS || orderCode == null || orderCode.length == 0) {
                    nhMain.showAlert(_ERROR, message);
                    return false;
                }
                if (urlCheckout != null && urlCheckout.length > 0) {
                    window.location.href = urlCheckout;
                } else {
                    window.location.href = '/order/success?code=' + orderCode;
                }
            });
        }
    },
    affiliate: {
        inputAffiliate: null,
        init: function() {
            var self = this;
            self.inputAffiliate = $('input#affiliate-code');
            if (self.inputAffiliate.length == 0) return;
            $(document).on('click', '[nh-btn-action="apply-affiliate"]', function(e) {
                if ($('input#affiliate-code').val().length == 0) {
                    nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_nhap_ma_gioi_thieu'));
                    return false;
                }
                var affiliateCode = $('input#affiliate-code').val();
                self.applyAffiliate(affiliateCode, function(e) {
                    nhOrder.orderInfo.reload('element_order_info_right', $('#order-info-right'));
                });
            });
            $(document).on('click', '[nh-btn-action="delete-affiliate"]', function(e) {
                self.deleteAffiliate(function(e) {
                    nhOrder.orderInfo.reload('element_order_info_right', $('#order-info-right'));;
                })
            });
        },
        applyAffiliate: function(affiliateCode = null, callback = null) {
            var self = this;
            if (typeof(callback) != 'function') {
                callback = function() {};
            }
            nhMain.showLoading.page();
            nhMain.callAjax({
                url: '/affiliate/apply',
                data: {
                    affiliate_code: affiliateCode
                }
            }).done(function(response) {
                nhMain.showLoading.remove();
                var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                if (code == _ERROR) {
                    nhMain.showAlert(_ERROR, message);
                    return false;
                }
                if (code == _SUCCESS) {
                    nhMain.showAlert(_SUCCESS, message);
                    callback();
                }
            });
        },
        deleteAffiliate: function(callback = null) {
            var self = this;
            if (typeof(callback) != 'function') {
                callback = function() {};
            }
            nhMain.showLoading.page();
            nhMain.callAjax({
                url: '/affiliate/delete',
            }).done(function(response) {
                nhMain.showLoading.remove();
                var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                var status = typeof(response.status) != _UNDEFINED ? response.status : null;
                var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                if (code == _ERROR) {
                    var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                    nhMain.showAlert(_ERROR, message);
                    return false;
                }
                if (code == _SUCCESS) {
                    callback();
                }
            });
        }
    },
    coupon: {
        init: function() {
            var self = this;
            self.orderCoupon.init();
            self.listCoupon.init();
        },
        orderCoupon: {
            inputCoupon: null,
            coupon: null,
            init: function() {
                var self = this;
                self.inputCoupon = $('input#order-coupon-code');
                if (self.inputCoupon.length == 0) return;
                self.event();
            },
            event: function() {
                var self = this;
                $(document).on('click', '[nh-btn-action="apply-coupon"]', function(e) {
                    if ($('input#order-coupon-code').val().length == 0) {
                        nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_nhap_ma_coupon'));
                        return false;
                    }
                    var couponCode = $('input#order-coupon-code').val();
                    self.checkCoupon(couponCode, function(e) {
                        nhOrder.orderInfo.reload('element_order_info_right', $('#order-info-right'));
                    });
                });
                $(document).on('click', '[nh-btn-action="delete-coupon"]', function(e) {
                    self.deleteCoupon(function(e) {
                        nhOrder.orderInfo.reload('element_order_info_right', $('#order-info-right'));;
                    })
                });
                $(document).on('click', '[nh-btn-action="list-coupon"]', function(e) {
                    if (!nhOrder.coupon.listCoupon.modal.length > 0) return;
                    nhOrder.coupon.listCoupon.modal.modal('show');
                });
            },
            checkCoupon: function(couponCode = null, callback = null) {
                var self = this;
                if (typeof(callback) != 'function') {
                    callback = function() {};
                }
                nhMain.showLoading.page();
                nhMain.callAjax({
                    url: '/promotion/check-coupon',
                    data: {
                        coupon: couponCode
                    }
                }).done(function(response) {
                    nhMain.showLoading.remove();
                    var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                    var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                    var status = typeof(response.status) != _UNDEFINED ? response.status : null;
                    var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                    if (code == _ERROR) {
                        nhMain.showAlert(_ERROR, message);
                        return false;
                    }
                    if (code == _SUCCESS) {
                        if ($.isEmptyObject(data)) {
                            nhMain.showAlert(_ERROR, message);
                            return false;
                        }
                        callback(data);
                    }
                });
            },
            deleteCoupon: function(callback = null) {
                var self = this;
                if (typeof(callback) != 'function') {
                    callback = function() {};
                }
                nhMain.showLoading.page();
                nhMain.callAjax({
                    url: '/promotion/delete-coupon',
                }).done(function(response) {
                    nhMain.showLoading.remove();
                    var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                    var status = typeof(response.status) != _UNDEFINED ? response.status : null;
                    var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                    if (code == _ERROR) {
                        var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                        nhMain.showAlert(_ERROR, message);
                        return false;
                    }
                    if (code == _SUCCESS) {
                        callback(data);
                    }
                });
            }
        },
        listCoupon: {
            modal: $('#list-coupon-modal'),
            wrapElement: $('[nh-promotion]'),
            init: function() {
                var self = this;
                if (self.wrapElement.length == 0) return;
                self.event();
            },
            event: function() {
                var self = this;
                $(document).on('click', '[nh-btn-action="select-coupon"]', function(e) {
                    var code = $(this).attr('nh-coupon-code');
                    if (nhOrder.coupon.orderCoupon.inputCoupon.length > 0) {
                        nhOrder.coupon.orderCoupon.checkCoupon(code, function(e) {
                            self.modal.modal('hide');
                            nhOrder.orderInfo.reload('element_order_info_right', $('#order-info-right'));
                        });
                    }
                });
            }
        }
    },
    point: {
        init: function() {
            var self = this;
            $(document).on('click', '[nh-btn-action="apply-point-promotion"]', function(e) {
                if ($('#point-promotion').length == 0) return false;
                var pointPromotion = $('#point-promotion').val().replace(',', '');
                if (pointPromotion.length == 0) {
                    nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_nhap_diem'));
                    return false;
                }
                self.applyPoint(pointPromotion, _PROMOTION, function(e) {
                    nhOrder.orderInfo.reload();
                });
            });
            $(document).on('click', '[nh-btn-action="apply-point-promotion-all"]', function(e) {
                if ($('#point-promotion').length == 0) return false;
                var pointMax = $('#point-promotion').attr('nh-point-max');
                if (pointMax.length == 0) {
                    nhMain.showAlert(_ERROR, nhMain.getLabel('khong_lay_duoc_thong_tin_so_diem'));
                    return false;
                }
                self.applyPoint(pointMax, _PROMOTION, function(e) {
                    nhOrder.orderInfo.reload();
                });
            });
            $(document).on('click', '[nh-btn-action="apply-wallet"]', function(e) {
                if ($('#wallet').length == 0) return false;
                var pointWallet = $('#wallet').val().replace(',', '');
                if (pointWallet.length == 0) {
                    nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_nhap_diem'));
                    return false;
                }
                self.applyPoint(pointWallet, _WALLET, function(e) {
                    nhOrder.orderInfo.reload();
                });
            });
            $(document).on('click', '[nh-btn-action="apply-wallet-all"]', function(e) {
                if ($('#wallet').length == 0) return false;
                var pointMax = $('#wallet').attr('nh-point-max');
                if (pointMax.length == 0) {
                    nhMain.showAlert(_ERROR, nhMain.getLabel('khong_lay_duoc_thong_tin_so_diem'));
                    return false;
                }
                self.applyPoint(pointMax, _WALLET, function(e) {
                    nhOrder.orderInfo.reload();
                });
            });
            $(document).on('keyup keypess keydown', '#point-promotion', function(e) {
                var pointToMoney = $(this).attr('nh-point-money');
                var pointMax = $(this).attr('nh-point-max');
                var point = $(this).val().replace(',', '');
                if (parseInt(pointMax) < parseInt(point)) {
                    point = pointMax;
                    $(this).val(pointMax);
                }
                var wrapElement = $(this).closest('.input-group');
                var labelPointToMoney = wrapElement.find('.point-to-money');
                labelPointToMoney.text(nhMain.utilities.parseNumberToTextMoney(pointToMoney * point));
            });
            $(document).on('keyup keypess keydown', '#wallet', function(e) {
                var pointToMoney = $(this).attr('nh-point-money');
                var pointMax = $(this).attr('nh-point-max');
                var point = $(this).val().replace(',', '');
                if (parseInt(pointMax) < parseInt(point)) {
                    point = pointMax;
                    $(this).val(pointMax);
                }
                var wrapElement = $(this).closest('.input-group');
                var labelPointToMoney = wrapElement.find('.point-to-money');
                labelPointToMoney.text(nhMain.utilities.parseNumberToTextMoney(pointToMoney * point));
            });
            $(document).on('click', '[nh-btn-action="delete-wallet"]', function(e) {
                self.deletePoint(_WALLET, function(e) {
                    nhOrder.orderInfo.reload();
                })
            });
            $(document).on('click', '[nh-btn-action="delete-point-promotion"]', function(e) {
                self.deletePoint(_PROMOTION, function(e) {
                    nhOrder.orderInfo.reload();
                })
            });
        },
        applyPoint: function(point = null, type = null, callback = null) {
            var self = this;
            if (typeof(callback) != 'function') {
                callback = function() {};
            }
            nhMain.showLoading.page();
            nhMain.callAjax({
                url: '/customer/point/apply-order',
                data: {
                    type: type,
                    point: point
                }
            }).done(function(response) {
                var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                var status = typeof(response.status) != _UNDEFINED ? response.status : null;
                var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                nhMain.showLoading.remove();
                if (code == _ERROR) {
                    nhMain.showAlert(_ERROR, message);
                    return false;
                }
                if (code == _SUCCESS) {
                    if ($.isEmptyObject(data)) {
                        nhMain.showAlert(_ERROR, message);
                        return false;
                    }
                    callback(data);
                }
            });
        },
        deletePoint: function(type = null, callback = null) {
            var self = this;
            if (typeof(callback) != 'function') {
                callback = function() {};
            }
            nhMain.showLoading.page();
            nhMain.callAjax({
                url: '/customer/point/clear-in-order',
                data: {
                    type: type
                }
            }).done(function(response) {
                var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                var status = typeof(response.status) != _UNDEFINED ? response.status : null;
                var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                nhMain.showLoading.remove();
                if (code == _ERROR) {
                    var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                    nhMain.showAlert(_ERROR, message);
                    return false;
                }
                if (code == _SUCCESS) {
                    callback(data);
                }
            });
        }
    },
    shippingMethod: {
        wrapElement: $('[nh-wrap="shipping-method"]'),
        init: function() {
            var self = this;
            if (self.wrapElement.length == 0) return;
            self.event();
        },
        event: function() {
            var self = this;
            $(document).on('change', '[nh-shipping-method]', function(e) {
                var shippingMethodId = $(this).attr('nh-shipping-method');
                var cityId = $('#order-info').find('select[name="city_id"]').val();
                self.loadListShippingMethod(cityId, shippingMethodId);
            });
            $(document).on('change', 'form#order-info select[name="city_id"]', function(e) {
                nhOrder.orderInfo.reload('element_order_info_right', $('#order-info-right'));;
            });
        },
        loadListShippingMethod: function(city_id = null, shipping_method_id = null) {
            nhMain.showLoading.page();
            nhMain.callAjax({
                url: '/order/shipping-method/select',
                data: {
                    shipping_method_id: typeof(shipping_method_id) != _UNDEFINED ? shipping_method_id : null,
                    city_id: typeof(city_id) != _UNDEFINED ? city_id : null,
                }
            }).done(function(response) {
                var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                if (code != _SUCCESS) {
                    nhMain.showLoading.remove();
                    nhMain.showAlert(_ERROR, message);
                    return false;
                } else {
                    nhOrder.orderInfo.reload('element_order_info_right', $('#order-info-right'));;
                }
            });
        }
    }
}
$(document).ready(function() {
    nhOrder.init();
});;
'use strict';
var nhWishlist = {
    wishlistCookie: {},
    wishlistProduct: [],
    wishlistArticle: [],
    accountId: null,
    expires_cookie: 10,
    countTotal: 0,
    messages: '',
    init: function() {
        var self = this;
        self.wishlistCookie = nhMain.utilities.notEmpty(nhMain.dataInit.wishlist) ? nhMain.dataInit.wishlist : {};
        self.wishlistProduct = nhMain.utilities.notEmpty(self.wishlistCookie.product) ? self.wishlistCookie.product : [];
        self.wishlistArticle = nhMain.utilities.notEmpty(self.wishlistCookie.article) ? self.wishlistCookie.article : [];
        var accountInfo = typeof(nhMain.dataInit.member) != _UNDEFINED && !$.isEmptyObject(nhMain.dataInit.member) ? nhMain.dataInit.member : {};
        self.accountId = typeof(accountInfo.account_id) != _UNDEFINED ? accountInfo.account_id : null;
        if (nhMain.utilities.notEmpty(self.wishlistProduct)) {
            $.each(self.wishlistProduct, function(index, value) {
                self.loadWishlist(nhMain.utilities.parseInt(value), _PRODUCT);
            });
        }
        if (nhMain.utilities.notEmpty(self.wishlistArticle)) {
            $.each(self.wishlistArticle, function(index, value) {
                self.loadWishlist(nhMain.utilities.parseInt(value), _ARTICLE);
            });
        }
        $(document).on('click', '[nh-btn-action="wishlist"]:not(.added-wishlist)', function(e) {
            $(this).tooltip('hide');
            var recordID = nhMain.utilities.parseInt($(this).attr('wishlist-id'));
            var type = $(this).attr('wishlist-type');
            if (!nhMain.utilities.notEmpty(recordID) || !nhMain.utilities.notEmpty(type)) {
                nhMain.showAlert(_ERROR, nhMain.getLabel('khong_lay_duoc_thong_tin_yeu_thich'));
                return false;
            }
            var btnWishlist = $(this);
            btnWishlist.addClass('effect-spin');
            self.addToWishlist(recordID, type, function() {
                setTimeout(function() {
                    btnWishlist.removeClass('effect-spin');
                }, 1000);
                btnWishlist.addClass('added-wishlist');
            });
        });
        $(document).on('click', '.added-wishlist[nh-btn-action="wishlist"]', function(e) {
            var recordID = nhMain.utilities.parseInt($(this).attr('wishlist-id'));
            var type = $(this).attr('wishlist-type');
            var btn_delete = $(this);
            if (!nhMain.utilities.notEmpty(recordID) || !nhMain.utilities.notEmpty(type)) {
                nhMain.showAlert(_ERROR, nhMain.getLabel('khong_lay_duoc_thong_tin_yeu_thich'));
                return false;
            }
            self.messages = nhMain.getLabel('ban_co_muon_xoa_san_pham_yeu_thich_nay');
            if (type == _ARTICLE) {
                self.messages = nhMain.getLabel('ban_co_muon_xoa_bai_viet_yeu_thich_nay');
            }
            nhMain.showAlert(_WARNING, self.messages, function() {
                btn_delete.removeClass('added-wishlist');
                self.remove(recordID, type, btn_delete);
            });
        });
        $(document).on('click', '[wishlist-remove]', function(e) {
            var recordID = nhMain.utilities.parseInt($(this).attr('wishlist-remove'));
            var type = $(this).attr('wishlist-type');
            var btn_delete = $(this);
            if (!nhMain.utilities.notEmpty(recordID) || !nhMain.utilities.notEmpty(type)) {
                nhMain.showAlert(_ERROR, nhMain.getLabel('khong_lay_duoc_thong_tin_yeu_thich'));
                return false;
            }
            self.messages = nhMain.getLabel('ban_co_muon_xoa_san_pham_yeu_thich_nay');
            if (type == _ARTICLE) {
                self.messages = nhMain.getLabel('ban_co_muon_xoa_bai_viet_yeu_thich_nay');
            }
            nhMain.showAlert(_WARNING, self.messages, function() {
                self.remove(recordID, type, btn_delete);
            });
        });
        self.reloadMiniWishlist();
    },
    addToWishlist: function(record_id = null, type = null, callback = null) {
        var self = this;
        if (typeof(callback) != 'function') {
            callback = function() {};
        }
        if (!nhMain.utilities.notEmpty(record_id) || !nhMain.utilities.notEmpty(type)) {
            nhMain.showLog(nhMain.getLabel('du_lieu_khong_hop_le'));
            return false;
        }
        callback();
        if (nhMain.utilities.notEmpty(self.accountId)) {
            nhMain.callAjax({
                async: true,
                url: '/wishlist/add-product',
                data: {
                    account_id: self.accountId,
                    record_id: record_id,
                    type: type
                },
            }).done(function(response) {
                var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                var status = typeof(response.status) != _UNDEFINED ? response.status : {};
                if (code == _SUCCESS) {
                    nhMain.showAlert(_SUCCESS, message);
                } else {
                    nhMain.showAlert(_ERROR, message);
                }
            });
        } else {
            if ($.inArray(record_id, self.wishlistProduct) == -1 && type == _PRODUCT) {
                self.wishlistProduct.push(record_id);
            }
            if ($.inArray(record_id, self.wishlistArticle) == -1 && type == _ARTICLE) {
                self.wishlistArticle.push(record_id);
            }
            self.wishlistCookie = {
                product: self.wishlistProduct,
                article: self.wishlistArticle
            };
            self.messages = nhMain.getLabel('them_thanh_cong_san_pham_yeu_thich');
            if (type == _ARTICLE) {
                self.messages = nhMain.getLabel('them_thanh_cong_bai_viet_yeu_thich');
            }
            $.cookie(_WISHLIST, JSON.stringify(self.wishlistCookie), {
                expires: self.expires_cookie,
                path: '/'
            });
            setTimeout(function() {
                nhMain.showAlert(_SUCCESS, self.messages);
            }, 1000);
        }
        self.reloadMiniWishlist(self.countTotal + 1);
    },
    loadWishlist: function(record_id = null, type = null) {
        var self = this;
        if ($('[wishlist-id="' + record_id + '"][wishlist-type="' + type + '"]').length > 0) {
            $('[wishlist-id="' + record_id + '"][wishlist-type="' + type + '"]').each(function(index) {
                $(this).addClass('added-wishlist');
            });
        }
    },
    reloadMiniWishlist: function(updateCount = null, callback = null) {
        var self = this;
        if (typeof(callback) != 'function') {
            callback = function() {};
        }
        if ($('[wishlist-total]').length > 0) {
            self.countTotal = typeof(self.wishlistProduct) != _UNDEFINED ? self.wishlistProduct.length : 0;
            if (nhMain.utilities.notEmpty(updateCount)) {
                self.countTotal = updateCount;
            }
            $('[wishlist-total]').html(nhMain.utilities.parseInt(self.countTotal));
        }
        if ($('[wishlist-total="article"]').length > 0) {
            self.countTotal = typeof(self.wishlistArticle) != _UNDEFINED ? self.wishlistArticle.length : 0;
            if (nhMain.utilities.notEmpty(updateCount)) {
                self.countTotal = updateCount;
            }
            $('[wishlist-total]').html(nhMain.utilities.parseInt(self.countTotal));
        }
        if ($('[wishlist-total="all"]').length > 0) {
            var countProduct = typeof(self.wishlistProduct) != _UNDEFINED ? self.wishlistProduct.length : 0;
            var countArticle = typeof(self.wishlistArticle) != _UNDEFINED ? self.wishlistArticle.length : 0;
            self.countTotal = (countProduct + countArticle);
            if (nhMain.utilities.notEmpty(updateCount)) {
                self.countTotal = updateCount;
            }
            $('[wishlist-total]').html(nhMain.utilities.parseInt(self.countTotal));
        }
    },
    remove: function(record_id = null, type = null, btn_delete = null) {
        var self = this;
        if (nhMain.utilities.notEmpty(self.accountId)) {
            nhMain.callAjax({
                async: true,
                url: '/wishlist/remove-product',
                data: {
                    account_id: self.accountId,
                    record_id: record_id,
                    type: type
                },
            }).done(function(response) {
                var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                var status = typeof(response.status) != _UNDEFINED ? response.status : {};
                if (code == _SUCCESS) {
                    nhMain.showAlert(_SUCCESS, message);
                    if (nhMain.utilities.notEmpty(btn_delete)) {
                        btn_delete.closest('tr:not([nh-cart-item])').remove();
                    }
                    self.reloadMiniWishlist(self.countTotal - 1);
                } else {
                    nhMain.showAlert(_ERROR, message);
                }
            });
        } else {
            if (type == _PRODUCT) {
                self.wishlistProduct.splice($.inArray(record_id, self.wishlistProduct), 1);
            }
            if (type == _ARTICLE) {
                self.wishlistArticle.splice($.inArray(record_id, self.wishlistArticle), 1);
            }
            self.wishlistCookie = {
                product: self.wishlistProduct,
                article: self.wishlistArticle
            };
            self.messages = nhMain.getLabel('xoa_thanh_cong_san_pham_yeu_thich');
            if (type == _ARTICLE) {
                self.messages = nhMain.getLabel('xoa_thanh_cong_bai_viet_yeu_thich');
            }
            $.cookie(_WISHLIST, JSON.stringify(self.wishlistCookie), {
                expires: self.expires_cookie,
                path: '/'
            });
            if (nhMain.utilities.notEmpty(btn_delete)) {
                btn_delete.closest('tr:not([nh-cart-item])').remove();
            }
            self.reloadMiniWishlist(self.countTotal - 1);
            setTimeout(function() {
                nhMain.showAlert(_SUCCESS, self.messages);
            }, 1000);
        }
    }
}
$(document).ready(function() {
    nhWishlist.init();
});;
'use strict';
var nhCompare = {
    compareIds: [],
    expires_cookie: 10,
    modal: '[nh-compare="modal"]',
    wrapElement: null,
    contentElement: null,
    maxItem: 3,
    maxItemMobile: 2,
    init: function() {
        var self = this;
        if (!nhMain.utilities.notEmpty($(self.modal)) && !nhMain.utilities.notEmpty($(self.wrapElement))) return false;
        self.compareIds = nhMain.utilities.notEmpty($.cookie(_COMPARE)) ? nhMain.utilities.parseJsonToObject($.cookie(_COMPARE)) : [];
        if (nhMain.isMobile) {
            self.refreshCompareIds(self.maxItem, self.maxItemMobile);
            self.maxItem = self.maxItemMobile;
        }
        if (nhMain.utilities.notEmpty(self.compareIds)) {
            $.each(self.compareIds, function(index, value) {
                self.loadActiveButton(nhMain.utilities.parseInt(value));
            });
        }
        $(document).on('click', '[nh-btn-action="compare"]', function(e) {
            $(this).tooltip('hide');
            var recordID = nhMain.utilities.parseInt($(this).attr('data-product-id'));
            if (!nhMain.utilities.notEmpty(recordID)) {
                nhMain.showAlert(_ERROR, nhMain.getLabel('khong_lay_duoc_thong_tin_so_sanh_san_pham'));
                return false;
            }
            self.addToCompare(recordID, function() {
                self.ajaxLoadCompare();
            });
            $('[nh-btn-action="compare"]').removeClass('added-compare');
            $('[nh-btn-action="compare"]').attr('data-original-title', nhMain.getLabel('so_sanh'));
            if (nhMain.utilities.notEmpty(self.compareIds)) {
                $.each(self.compareIds, function(index, value) {
                    self.loadActiveButton(nhMain.utilities.parseInt(value));
                });
            }
            if (nhMain.utilities.notEmpty($('#compare-search-modal'))) {
                $('#compare-search-modal').modal('hide');
            }
        });
        $(document).on('click', '[compare-bar="btn"]', function(e) {
            if (!nhMain.utilities.notEmpty(self.contentElement)) return false;
            self.contentElement.toggleClass('open');
        });
        $(document).on('click', '[compare-remove]', function(e) {
            var recordID = nhMain.utilities.parseInt($(this).attr('compare-remove'));
            if (!nhMain.utilities.notEmpty(recordID)) {
                nhMain.showAlert(_ERROR, nhMain.getLabel('khong_lay_duoc_thong_tin_so_sanh_san_pham'));
                return false;
            }
            nhMain.showAlert(_WARNING, nhMain.getLabel('ban_co_muon_xoa_san_pham_ra_khoi_danh_sach_so_sanh'), function() {
                self.removeElementCookie(recordID, $(this));
                self.ajaxLoadCompare();
                $('[nh-btn-action="compare"]').removeClass('added-compare');
                $('[nh-btn-action="compare"]').attr('data-original-title', nhMain.getLabel('so_sanh'));
                if (nhMain.utilities.notEmpty(self.compareIds)) {
                    $.each(self.compareIds, function(index, value) {
                        self.loadActiveButton(nhMain.utilities.parseInt(value));
                    });
                }
            });
        });
        $(document).on('click', '[nh-compare="close"]', function(e) {
            if (!nhMain.utilities.notEmpty(self.contentElement)) return false;
            self.contentElement.removeClass('open');
        });
        $(document).on('click', '[compare-bar="close"]', function(e) {
            if (!nhMain.utilities.notEmpty(self.contentElement) || !nhMain.utilities.notEmpty(self.modal)) return false;
            self.contentElement.removeClass('open');
            $(self.modal).removeClass('open');
        });
        self.reloadMiniCompare();
    },
    addToCompare: function(record_id = null, callback = null) {
        var self = this;
        if (!nhMain.utilities.notEmpty(record_id)) {
            nhMain.showLog(nhMain.getLabel('du_lieu_khong_hop_le'));
            return false;
        }
        if ($.inArray(record_id, self.compareIds) == -1) {
            self.compareIds.push(record_id);
        }
        if (self.compareIds.length > self.maxItem) self.compareIds.shift();
        $.cookie(_COMPARE, JSON.stringify(self.compareIds), {
            expires: self.expires_cookie
        });
        self.reloadMiniCompare();
        if (typeof(callback) != 'function') {
            callback = function() {};
        }
        callback();
    },
    ajaxLoadCompare: function() {
        var self = this;
        nhMain.showLoading.page();
        if (nhMain.utilities.notEmpty($('[nh-block]').find('[compare-content]'))) {
            location.reload();
            return false;
        }
        nhMain.callAjax({
            async: true,
            url: '/product/compare',
            dataType: _HTML,
        }).done(function(response) {
            $(self.modal).html(response);
            nhMain.showLoading.remove();
            self.wrapElement = $('[nh-compare="warp"]');
            if (!nhMain.utilities.notEmpty($(self.wrapElement))) return false;
            self.contentElement = self.wrapElement.find('[compare-content]');
            $(self.modal).addClass('open');
            self.contentElement.addClass('open');
            self.wrapElement.find('div[nh-light-gallery]').each(function(index) {
                var config = nhMain.utilities.parseJsonToObject($(this).attr('nh-light-gallery'));
                $(this).lightGallery(config);
            });
            $("body").tooltip({
                selector: '[data-toggle=tooltip]'
            });
        });
    },
    loadActiveButton: function(record_id = null) {
        var self = this;
        if ($('[data-product-id="' + record_id + '"][nh-btn-action="compare"]').length > 0) {
            $('[data-product-id="' + record_id + '"][nh-btn-action="compare"]').each(function(index) {
                $(this).addClass('added-compare');
                $(this).attr('data-original-title', nhMain.getLabel('da_them_so_sanh'));
            });
        }
    },
    reloadMiniCompare: function() {
        var self = this;
        if ($('[compare-total]').length > 0) {
            var countTotal = typeof(self.compareIds) != _UNDEFINED ? self.compareIds.length : 0;
            $('[compare-total]').html(nhMain.utilities.parseInt(countTotal));
        }
    },
    removeElementCookie: function(record_id = null, btn_delete = null) {
        var self = this;
        self.compareIds.splice($.inArray(record_id, self.compareIds), 1);
        $.cookie(_COMPARE, JSON.stringify(self.compareIds), {
            expires: self.expires_cookie
        });
        self.reloadMiniCompare();
        nhMain.showAlert(_SUCCESS, nhMain.getLabel('xoa_thanh_cong_san_pham_so_sanh'));
    },
    refreshCompareIds: function(maxItem = null, maxItemMobile = null) {
        var self = this;
        if (!nhMain.utilities.notEmpty(self.compareIds)) return false;
        if (maxItem > maxItemMobile && self.compareIds.length > maxItemMobile) {
            self.compareIds.splice(0, self.compareIds.length - maxItemMobile);
        }
        $.cookie(_COMPARE, JSON.stringify(self.compareIds), {
            expires: self.expires_cookie
        });
    }
}
$(document).ready(function() {
    nhCompare.init();
});;
'use strict';
var nhMember = {
    init: function() {
        var self = this;
        nhMain.location.init({
            idWrap: ['#member-address', '#member-register']
        });
        self.login.init();
        self.register.init();
        self.profile.init();
        self.avatar.init();
        self.saveAddress.init();
        self.changePassword.init();
        self.orderManager.init();
        self.cancelOrder.init();
        self.forgotPassword.init();
        self.verifyForgotPassword.init();
        self.verifyEmail.init();
        self.attendance.init();
        self.wallet.init();
        self.otp.init({
            wrap: ['[nh-form="verify-email"]', '[nh-form="verify-forgot-password"]', '[nh-form="change-phone"]', '[nh-form="change-email"]', '[nh-form="give-point"]', '[nh-form="process-active"]']
        });
        self.changeEmail.init();
        self.changePhone.init();
        self.affiliate.init();
        self.associateBank.init();
    },
    login: {
        modalLogin: null,
        init: function() {
            var self = this;
            var formElement = $('form[nh-form="member-login"]');
            if (formElement == null || formElement == _UNDEFINED || formElement.length == 0) {
                return false;
            }
            self.modalLogin = $('#login-modal');
            self.event();
            var memberInfo = nhMain.utilities.notEmpty(nhMain.dataInit.member) ? nhMain.dataInit.member : {};
            if (!$.isEmptyObject(memberInfo) && $('[nh-mini-member]').length > 0) {
                self.reloadMiniMember();;
            }
        },
        event: function() {
            var self = this;
            $('form[nh-form="member-login"]').each(function(index) {
                var formElement = $(this);
                var validator = formElement.validate({
                    ignore: ':hidden',
                    rules: {
                        username: {
                            required: true
                        },
                        password: {
                            required: true,
                        },
                    },
                    messages: {
                        username: {
                            required: nhMain.getLabel('vui_long_nhap_tai_khoan'),
                        },
                        password: {
                            required: nhMain.getLabel('vui_long_nhap_mat_khau'),
                        }
                    },
                    errorPlacement: function(error, element) {
                        var group = element.closest('.input-group');
                        if (group.length) {
                            group.after(error.addClass('invalid-feedback'));
                        } else {
                            element.after(error.addClass('invalid-feedback'));
                        }
                    },
                    invalidHandler: function(event, validator) {
                        validator.errorList[0].element.focus();
                    },
                });
                formElement.on('keydown', 'input', function(e) {
                    if (e.keyCode == 13) {
                        formElement.find('[nh-btn-action="submit"]').trigger('click');
                        return false;
                    }
                });
                formElement.on('click', '[nh-btn-action="submit"]', function(e) {
                    e.preventDefault();
                    if (!validator.form()) return false;
                    nhMain.reCaptcha.check(function(token) {
                        var formData = formElement.serialize();
                        if (token != null) {
                            formData = formData + '&' + _TOKEN_RECAPTCHA + '=' + token;
                        }
                        nhMain.callAjax({
                            url: formElement.attr('action'),
                            data: formData
                        }).done(function(response) {
                            var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                            var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                            var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                            if (code == _SUCCESS) {
                                if (nhMain.utilities.notEmpty(data.wait_active)) {
                                    nhMain.showAlert(_INFO, nhMain.getLabel('ban_chua_kich_hoat_tai_khoan_vui_long_truy_cap') + '<a href="/member/verify-email"><span>' + nhMain.getLabel('duong_dan') + '</span></a>' + nhMain.getLabel('nay_de_kich_hoat_tai_khoan'), null, {
                                        'html': true
                                    });
                                    return false;
                                }
                                nhMain.showAlert(_SUCCESS, message);
                                if (nhMain.utilities.notEmpty(data.redirect)) {
                                    window.location.href = data.redirect;
                                } else {
                                    window.location.href = '/member/dashboard';
                                }
                            } else {
                                nhMain.showAlert(_ERROR, message);
                            }
                        });
                    });
                });
            });
            $(document).on('click', '[nh-btn-login-social="facebook"]', function(e) {
                if (typeof(FB) == _UNDEFINED || typeof(FB.login) == _UNDEFINED && typeof(FB.login) != 'function') {
                    nhMain.showLog('Chưa khai báo thư viện SDK Facebook');
                    return false;
                }
                var formElement = $(this).closest('form[nh-form="member-login"]');
                if (formElement.length == 0) return false;
                FB.login(function(response) {
                    if (response.authResponse) {
                        FB.api('/me', function(response) {
                            var picture = typeof(response.picture) != _UNDEFINED && typeof(response.picture.data) != _UNDEFINED ? response.picture.data : null;
                            var redirect = formElement.find(['input[name="redirect"]']).val();
                            var data = {
                                social_id: typeof(response.id) != _UNDEFINED ? response.id : null,
                                type: 'facebook',
                                full_name: typeof(response.name) != _UNDEFINED ? response.name : null,
                                email: typeof(response.email) != _UNDEFINED ? response.email : null,
                                picture: typeof(picture.url) != _UNDEFINED ? picture.url : null,
                                redirect: nhMain.utilities.notEmpty(redirect) ? redirect : null
                            };
                            self.socialLogin(data);
                        }, {
                            fields: 'email, name, picture.width(2048)'
                        });
                    }
                });
            });
            $(document).on('click', '[nh-btn-login-social="google"]', function(e) {
                if (typeof(auth2) == _UNDEFINED || typeof(auth2.signIn) == _UNDEFINED && typeof(auth2.signIn) != 'function') {
                    nhMain.showLog('Chưa khai báo thư viện Google');
                    return false;
                }
                var formElement = $(this).closest('form[nh-form="member-login"]');
                if (formElement.length == 0) return false;
                auth2.signIn({
                    scope: 'profile email'
                }).then(function(response) {
                    var profile = response.getBasicProfile();
                    var picture = nhMain.utilities.notEmpty(profile.getImageUrl()) != _UNDEFINED ? profile.getImageUrl().replace('s96-c', 's1024-c', true) : null;
                    var redirect = formElement.find(['input[name="redirect"]']).val();
                    var data = {};
                    var data = {
                        social_id: profile.getId(),
                        type: 'google',
                        full_name: profile.getName(),
                        email: profile.getEmail(),
                        picture: picture,
                        redirect: nhMain.utilities.notEmpty(redirect) ? redirect : null
                    }
                    self.socialLogin(data);
                });
            });
        },
        socialLogin: function(data = {}, callback = null) {
            var self = this;
            if (typeof(callback) != 'function') {
                callback = function() {};
            }
            nhMain.showLoading.page();
            nhMain.callAjax({
                url: '/member/social-login',
                data: data
            }).done(function(response) {
                var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                nhMain.showLoading.remove();
                if (code == _SUCCESS) {
                    nhMain.showAlert(_SUCCESS, message);
                    var action = nhMain.utilities.notEmpty(response.action) ? response.action : null;
                    if (action == 'add') {
                        window.location.href = '/member/profile';
                    }
                    if (nhMain.utilities.notEmpty(data.redirect)) {
                        window.location.href = data.redirect;
                    } else {
                        window.location.href = '/member/dashboard';
                    }
                    if (self.modalLogin != null) {
                        self.modalLogin.modal('hide');
                    }
                } else {
                    nhMain.showAlert(_ERROR, message);
                }
            });
        },
        reloadMiniMember: function() {
            var self = this;
            nhMain.callAjax({
                async: false,
                url: '/member/reload-mini-member',
                dataType: 'html'
            }).done(function(response) {
                $('[nh-mini-member]').html(response);
            });
        }
    },
    register: {
        init: function() {
            var self = this;
            var formElement = $('form[nh-form="member-register"]');
            if (formElement == null || formElement == _UNDEFINED || formElement.length == 0) {
                return false;
            }
            nhMain.validation.phoneVn();
            $.validator.addMethod('regexUser', function(username, element) {
                return username.match(/^[a-zA-Z0-9]+$/);
            }, nhMain.getLabel('tai_khoan_khong_duoc_chua_ky_tu_dac_biet'));
            $('form[nh-form="member-register"]').each(function(index) {
                var formElement = $(this);
                var validator = formElement.validate({
                    ignore: ':hidden',
                    rules: {
                        username: {
                            required: true,
                            minlength: 6,
                            maxlength: 255,
                            regexUser: true
                        },
                        full_name: {
                            required: true,
                            minlength: 6,
                            maxlength: 255
                        },
                        phone: {
                            required: true,
                            minlength: 10,
                            maxlength: 11,
                            phoneVN: true
                        },
                        email: {
                            required: true,
                            email: true,
                            minlength: 10,
                            maxlength: 255
                        },
                        password: {
                            minlength: 6,
                            required: true,
                        },
                        verify_password: {
                            equalTo: '#password-register'
                        },
                        city_id: {
                            required: true
                        },
                        district_id: {
                            required: true
                        },
                        address: {
                            required: true
                        }
                    },
                    messages: {
                        username: {
                            required: nhMain.getLabel('vui_long_nhap_tai_khoan'),
                            minlength: nhMain.getLabel('tai_khoan_nhap_qua_ngan'),
                            maxlength: nhMain.getLabel('tai_khoan_nhap_qua_dai')
                        },
                        phone: {
                            required: nhMain.getLabel('vui_long_nhap_so_dien_thoai'),
                            minlength: nhMain.getLabel('so_dien_thoai_khong_hop_le'),
                            maxlength: nhMain.getLabel('so_dien_thoai_khong_hop_le')
                        },
                        full_name: {
                            required: nhMain.getLabel('vui_long_nhap_ho_va_ten'),
                            minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan'),
                            maxlength: nhMain.getLabel('thong_tin_nhap_qua_dai')
                        },
                        email: {
                            required: nhMain.getLabel('vui_long_nhap_email'),
                            email: nhMain.getLabel('email_chua_dung_dinh_dang'),
                            minlength: nhMain.getLabel('email_nhap_qua_ngan'),
                            maxlength: nhMain.getLabel('email_nhap_qua_dai')
                        },
                        password: {
                            required: nhMain.getLabel('vui_long_nhap_mat_khau'),
                            minlength: nhMain.getLabel('mat_khau_nhap_qua_ngan')
                        },
                        verify_password: {
                            equalTo: nhMain.getLabel('xac_nhan_mat_khau_chua_chinh_xac')
                        },
                        city_id: {
                            required: nhMain.getLabel('vui_long_nhap_thong_tin')
                        },
                        district_id: {
                            required: nhMain.getLabel('vui_long_nhap_thong_tin')
                        },
                        address: {
                            required: nhMain.getLabel('vui_long_nhap_thong_tin')
                        }
                    },
                    errorPlacement: function(error, element) {
                        var group = element.closest('.input-group');
                        var bootstrap_select = element.closest('.bootstrap-select');
                        if (group.length) {
                            group.after(error.addClass('invalid-feedback'));
                        } else if (bootstrap_select.length) {
                            bootstrap_select.after(error.addClass('invalid-feedback'));
                        } else {
                            element.after(error.addClass('invalid-feedback'));
                        }
                    },
                    invalidHandler: function(event, validator) {
                        validator.errorList[0].element.focus();
                    },
                });
                formElement.on('keydown', 'input', function(e) {
                    if (e.keyCode == 13) {
                        formElement.find('[nh-btn-action="submit"]').trigger('click');
                        return false;
                    }
                });
                formElement.on('click', '[nh-btn-action="submit"]', function(e) {
                    e.preventDefault();
                    if (!validator.form()) return false;
                    nhMain.reCaptcha.check(function(token) {
                        var formData = formElement.serialize();
                        if (token != null) {
                            formData = formData + '&' + _TOKEN_RECAPTCHA + '=' + token;
                        }
                        nhMain.showLoading.page();
                        nhMain.callAjax({
                            url: formElement.attr('action'),
                            data: formData
                        }).done(function(response) {
                            var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                            var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                            var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                            nhMain.showLoading.remove();
                            if (code == _SUCCESS) {
                                if (nhMain.utilities.notEmpty(data.waiting_confirm)) {
                                    nhMain.showAlert(_SUCCESS, message);
                                    window.location.href = '/member/success?email=' + data.email;
                                } else {
                                    window.location.href = '/member/dashboard';
                                }
                            } else {
                                nhMain.showAlert(_ERROR, message);
                            }
                        });
                    });
                });
            });
        }
    },
    orderManager: {
        formElement: null,
        page: 1,
        init: function() {
            var self = this;
            self.formElement = $('form[nh-form="list-order"]');
            if (self.formElement == null || self.formElement == _UNDEFINED || self.formElement.length == 0) {
                return false;
            }
            $(document).on('click', '[nh-btn-action="order-search"]', function(e) {
                self.page = 1;
                self.search();
                return false;
            });
            $(document).on('click', '.pagination .page-item:not(.disabled , .active) a', function(e) {
                e.preventDefault();
                self.page = parseInt($(this).attr('nh-page-redirect'));
                self.search();
                return false;
            });
        },
        search: function() {
            var self = this;
            nhMain.showLoading.page();
            var formData = self.formElement.serialize();
            formData = formData + '&page=' + self.page;
            nhMain.callAjax({
                url: self.formElement.attr('action'),
                data: formData,
                dataType: 'html'
            }).done(function(response) {
                nhMain.showLoading.remove();
                self.formElement.find('[nh-form="table-order"]').html(response);
            });
        }
    },
    saveAddress: {
        modal: null,
        init: function() {
            var self = this;
            var formElement = $('form[nh-form="member-address"]');
            if (formElement == null || formElement == _UNDEFINED || formElement.length == 0) {
                return false;
            }
            self.modal = $('#change-address-modal');
            nhMain.validation.phoneVn();
            var formElement = $('#member-address');
            var validator = formElement.validate({
                ignore: ':hidden',
                rules: {
                    name: {
                        required: true,
                        minlength: 6,
                        maxlength: 255,
                    },
                    phone: {
                        required: true,
                        minlength: 10,
                        maxlength: 11,
                        phoneVN: true
                    },
                    email: {
                        required: true,
                        email: true,
                        minlength: 10,
                        maxlength: 255
                    },
                    city_id: {
                        required: true
                    },
                    district_id: {
                        required: true
                    },
                    address: {
                        required: true
                    }
                },
                messages: {
                    name: {
                        required: nhMain.getLabel('vui_long_nhap_ten_dia_chi'),
                        minlength: nhMain.getLabel('ten_dia_chi_nhap_qua_ngan'),
                        maxlength: nhMain.getLabel('ten_dia_chi_nhap_qua_dai')
                    },
                    phone: {
                        required: nhMain.getLabel('vui_long_nhap_so_dien_thoai'),
                        minlength: nhMain.getLabel('so_dien_thoai_khong_hop_le'),
                        maxlength: nhMain.getLabel('so_dien_thoai_khong_hop_le')
                    },
                    email: {
                        required: nhMain.getLabel('vui_long_nhap_thong_tin'),
                        email: nhMain.getLabel('email_chua_dung_dinh_dang'),
                        minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan'),
                        maxlength: nhMain.getLabel('thong_tin_nhap_qua_dai')
                    },
                    city_id: {
                        required: nhMain.getLabel('vui_long_nhap_thong_tin')
                    },
                    district_id: {
                        required: nhMain.getLabel('vui_long_nhap_thong_tin')
                    },
                    address: {
                        required: nhMain.getLabel('vui_long_nhap_thong_tin')
                    }
                },
                errorPlacement: function(error, element) {
                    var group = element.closest('.input-group');
                    var bootstrap_select = element.closest('.bootstrap-select');
                    if (group.length) {
                        group.after(error.addClass('invalid-feedback'));
                    } else if (bootstrap_select.length) {
                        bootstrap_select.after(error.addClass('invalid-feedback'));
                    } else {
                        element.after(error.addClass('invalid-feedback'));
                    }
                },
                invalidHandler: function(event, validator) {
                    validator.errorList[0].element.focus();
                },
            });
            formElement.on('keydown', 'input', function(e) {
                if (e.keyCode == 13) {
                    formElement.find('[nh-btn-action="submit"]').trigger('click');
                    return false;
                }
            });
            formElement.on('click', '[nh-btn-action="submit"]', function(e) {
                e.preventDefault();
                if (!validator.form()) return false;
                nhMain.reCaptcha.check(function(token) {
                    var formData = formElement.serialize();
                    if (token != null) {
                        formData = formData + '&' + _TOKEN_RECAPTCHA + '=' + token;
                    }
                    nhMain.callAjax({
                        url: formElement.attr('action'),
                        data: formData
                    }).done(function(response) {
                        var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                        var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                        var status = typeof(response.status) != _UNDEFINED ? response.status : {};
                        if (status == 403) {
                            nhMain.showAlert(_ERROR, message);
                            location.reload();
                        }
                        if (code == _SUCCESS) {
                            nhMain.showAlert(_SUCCESS, message);
                            location.reload();
                        } else {
                            nhMain.showAlert(_ERROR, message);
                        }
                        $('#change-address-modal').modal('hide');
                    });
                });
            });
            $(document).on('click', '[nh-address="default"]', function(e) {
                var _id = $(this).attr('data-id');
                if (_id == null || _id == _UNDEFINED || _id.length == 0) {
                    return false;
                }
                nhMain.callAjax({
                    url: '/member/address/is-default',
                    data: {
                        id: _id
                    }
                }).done(function(response) {
                    var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                    var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                    var status = typeof(response.status) != _UNDEFINED ? response.status : {};
                    if (status == 403) {
                        nhMain.showAlert(_ERROR, message);
                        location.reload();
                    }
                    if (code == _SUCCESS) {
                        nhMain.showAlert(_SUCCESS, message);
                        location.reload();
                    } else {
                        nhMain.showAlert(_ERROR, message);
                    }
                });
            });
            $(document).on('click', '[nh-address="delete"]', function(e) {
                var _id = $(this).attr('data-id');
                var _btn_delete = $(this);
                if (_id == null || _id == _UNDEFINED || _id.length == 0) {
                    return false;
                }
                nhMain.showAlert(_WARNING, nhMain.getLabel('ban_co_muon_xoa_dia_chi_nay'), function() {
                    nhMain.callAjax({
                        url: '/member/address/delete',
                        data: {
                            id: _id
                        }
                    }).done(function(response) {
                        var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                        var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                        var status = typeof(response.status) != _UNDEFINED ? response.status : {};
                        if (status == 403) {
                            nhMain.showAlert(_ERROR, message);
                            location.reload();
                        }
                        if (code == _SUCCESS) {
                            nhMain.showAlert(_SUCCESS, message);
                            location.reload();
                        } else {
                            nhMain.showAlert(_ERROR, message);
                        }
                    });
                });
            });
            $(document).on('click', '[nh-address="add"]', function(e) {
                self.clearInputAddressModal();
                self.modal.modal('show');
            });
            $(document).on('click', '[nh-address="edit"]', function(e) {
                self.clearInputAddressModal();
                var addressInfo = $(this).data('address');
                self.loadInfoAddressModal(addressInfo);
                self.modal.modal('show');
            });
        },
        clearInputAddressModal: function() {
            var self = this;
            self.modal.find('input').val('');
            var citySelect = self.modal.find('select#city_id');
            var districtSelect = self.modal.find('select#district_id');
            var wardSelect = self.modal.find('select#ward_id');
            citySelect.selectpicker('destroy');
            citySelect.val('');
            citySelect.selectpicker('render');
            districtSelect.find('option:not([value=""])').remove();
            districtSelect.selectpicker('refresh');
            wardSelect.find('option:not([value=""])').remove();
            wardSelect.selectpicker('refresh');
        },
        loadInfoAddressModal: function(addressInfo = {}) {
            var self = this;
            if (addressInfo.customer_id == null || addressInfo.customer_id == _UNDEFINED || addressInfo.customer_id.length == 0) {
                return false;
            }
            self.modal.find('input[name="address_id"]').val(typeof(addressInfo.id) != _UNDEFINED ? addressInfo.id : '');
            self.modal.find('input[name="name"]').val(typeof(addressInfo.address_name) != _UNDEFINED ? addressInfo.address_name : '');
            self.modal.find('input[name="phone"]').val(typeof(addressInfo.phone) != _UNDEFINED ? addressInfo.phone : '');
            self.modal.find('input[name="zip_code"]').val(typeof(addressInfo.zip_code) != _UNDEFINED ? addressInfo.zip_code : '');
            self.modal.find('input[name="address"]').val(typeof(addressInfo.address) != _UNDEFINED ? addressInfo.address : '');
            self.modal.find('select#city_id').val(typeof(addressInfo.city_id) != _UNDEFINED ? addressInfo.city_id : '');
            self.modal.find('select#city_id').selectpicker('render');
            var city_id = typeof(addressInfo.city_id) != _UNDEFINED ? nhMain.utilities.parseInt(addressInfo.city_id) : null;
            var district_id = typeof(addressInfo.district_id) != _UNDEFINED ? nhMain.utilities.parseInt(addressInfo.district_id) : null;
            if (city_id > 0) {
                var _data = {};
                _data[_PAGINATION] = {};
                _data[_PAGINATION][_PERPAGE] = 200;
                nhMain.callAjax({
                    async: false,
                    url: '/location/district/json/' + city_id,
                    data: _data,
                }).done(function(response) {
                    var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                    var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                    var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                    if (code == _SUCCESS) {
                        if (!$.isEmptyObject(data)) {
                            var listOption = '';
                            $.each(data, function(key, item) {
                                listOption += '<option value="' + item.id + '">' + item.name + '</option>';
                            });
                            self.modal.find('select#district_id').append(listOption);
                            self.modal.find('select#district_id').selectpicker('destroy');
                        }
                    } else {
                        nhMain.showLog(message);
                    }
                });
            }
            if (district_id > 0) {
                var _data = {};
                _data[_PAGINATION] = {};
                _data[_PAGINATION][_PERPAGE] = 200;
                nhMain.callAjax({
                    async: false,
                    url: '/location/ward/json/' + district_id,
                    data: _data,
                }).done(function(response) {
                    var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                    var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                    var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                    if (code == _SUCCESS) {
                        if (!$.isEmptyObject(data)) {
                            var listOption = '';
                            $.each(data, function(key, item) {
                                listOption += '<option value="' + item.id + '">' + item.name + '</option>';
                            });
                            self.modal.find('select#ward_id').append(listOption);
                            self.modal.find('select#ward_id').selectpicker('destroy');
                        }
                    } else {
                        nhMain.showLog(message);
                    }
                });
            }
            self.modal.find('select#district_id').val(typeof(addressInfo.district_id) != _UNDEFINED ? addressInfo.district_id : '');
            self.modal.find('select#district_id').selectpicker('render');
            self.modal.find('select#ward_id').val(typeof(addressInfo.ward_id) != _UNDEFINED ? addressInfo.ward_id : '');
            self.modal.find('select#ward_id').selectpicker('render');
        }
    },
    avatar: {
        wrapAvatar: null,
        btnDeleteAvatar: null,
        btnUploadAvatar: null,
        showAvatar: null,
        deleteAvatarElement: '<span nh-delete-avatar class="avatar-clear-image icon-close"><i class="iconsax isax-add"></i></span>',
        init: function() {
            var self = this;
            self.wrapAvatar = $('.avatar-upload');
            self.btnDeleteAvatar = '[nh-delete-avatar]';
            self.btnUploadAvatar = '[nh-avatar-upload]';
            self.showAvatar = '[nh-avatar]';
            if (self.wrapAvatar == null || self.wrapAvatar == _UNDEFINED || self.wrapAvatar.length == 0) {
                return false;
            }
            $(document).on('change', self.btnUploadAvatar, function(e) {
                $.each(this.files, function(index, file) {
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL(file);
                    fileReader.onload = function(e) {
                        self.wrapAvatar.find(self.showAvatar).css('background-image', 'url("' + fileReader.result + '")').addClass('loading');
                    }
                    var formData = new FormData();
                    formData.append('file', file);
                    formData.append('path', _CUSTOMER);
                    self.uploadAvatar(formData, function() {
                        self.wrapAvatar.append(self.deleteAvatarElement);
                        self.wrapAvatar.find(self.showAvatar).removeClass('loading');
                    });
                });
            });
            $(document).on('click', self.btnDeleteAvatar, function(e) {
                nhMain.callAjax({
                    async: true,
                    url: '/member/delete-avatar'
                }).done(function(response) {
                    var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                    var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                    var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                    if (code == _ERROR) {
                        nhMain.showAlert(_ERROR, message);
                    }
                    if (code == _SUCCESS) {
                        var wrap = $(self.btnDeleteAvatar).closest('.avatar-upload');
                        wrap.find(self.showAvatar).css('background-image', '');
                        $(self.btnDeleteAvatar).remove();
                    }
                })
            })
        },
        uploadAvatar: function(formData = {}, callback = null) {
            var self = this;
            if (typeof(callback) != 'function') {
                callback = function() {};
            }
            nhMain.callAjax({
                async: true,
                url: '/member/upload-avatar',
                data: formData,
                contentType: false,
                processData: false,
            }).done(function(response) {
                var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                if (code == _ERROR) {
                    nhMain.showAlert(_ERROR, message);
                }
                if (code == _SUCCESS && !$.isEmptyObject(data)) {
                    callback(data);
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                nhMain.showLog(errorThrown);
            });
        }
    },
    profile: {
        init: function() {
            var self = this;
            var formElement = $('form[nh-form="member-profile"]');
            if (formElement == null || formElement == _UNDEFINED || formElement.length == 0) {
                return false;
            }
            var validator = formElement.validate({
                ignore: ':hidden',
                rules: {
                    full_name: {
                        required: true,
                        minlength: 6,
                        maxlength: 255
                    },
                    email: {
                        required: true,
                        email: true,
                        minlength: 10,
                        maxlength: 255
                    }
                },
                messages: {
                    full_name: {
                        required: nhMain.getLabel('vui_long_nhap_ho_va_ten'),
                        minlength: nhMain.getLabel('ho_va_ten_nhap_qua_ngan'),
                        maxlength: nhMain.getLabel('ho_va_ten_nhap_qua_dai')
                    },
                    email: {
                        required: nhMain.getLabel('vui_long_nhap_email'),
                        email: nhMain.getLabel('email_chua_dung_dinh_dang'),
                        minlength: nhMain.getLabel('email_nhap_qua_ngan'),
                        maxlength: nhMain.getLabel('email_nhap_qua_dai')
                    }
                },
                errorPlacement: function(error, element) {
                    var group = element.closest('.input-group');
                    var bootstrap_select = element.closest('.bootstrap-select');
                    if (group.length) {
                        group.after(error.addClass('invalid-feedback'));
                    } else if (bootstrap_select.length) {
                        bootstrap_select.after(error.addClass('invalid-feedback'));
                    } else {
                        element.after(error.addClass('invalid-feedback'));
                    }
                },
                invalidHandler: function(event, validator) {
                    validator.errorList[0].element.focus();
                },
            });
            formElement.on('keydown', 'input', function(e) {
                if (e.keyCode == 13) {
                    formElement.find('[nh-btn-action="submit"]').trigger('click');
                    return false;
                }
            });
            formElement.on('click', '[nh-btn-action="submit"]', function(e) {
                e.preventDefault();
                if (!validator.form()) return false;
                nhMain.reCaptcha.check(function(token) {
                    var formData = formElement.serialize();
                    if (token != null) {
                        formData = formData + '&' + _TOKEN_RECAPTCHA + '=' + token;
                    }
                    nhMain.callAjax({
                        url: formElement.attr('action'),
                        data: formData
                    }).done(function(response) {
                        var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                        var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                        var status = typeof(response.status) != _UNDEFINED ? response.status : {};
                        if (status == 403) {
                            nhMain.showAlert(_ERROR, message);
                            location.reload();
                        }
                        if (code == _SUCCESS) {
                            nhMain.showAlert(_SUCCESS, message);
                            location.reload();
                        } else {
                            nhMain.showAlert(_ERROR, message);
                        }
                    });
                });
            });
        },
    },
    changePassword: {
        init: function() {
            var self = this;
            var formElement = $('form[nh-form="change-password"]');
            if (formElement == null || formElement == _UNDEFINED || formElement.length == 0) {
                return false;
            }
            var validator = formElement.validate({
                ignore: ':hidden',
                rules: {
                    old_password: {
                        minlength: 6,
                        maxlength: 255,
                        required: true,
                    },
                    new_password: {
                        minlength: 6,
                        maxlength: 255,
                        required: true,
                    },
                    re_password: {
                        equalTo: '#new_password'
                    }
                },
                messages: {
                    old_password: {
                        required: nhMain.getLabel('vui_long_nhap_mat_khau'),
                        minlength: nhMain.getLabel('mat_khau_nhap_qua_ngan'),
                        maxlength: nhMain.getLabel('mat_khau_nhap_qua_dai')
                    },
                    new_password: {
                        required: nhMain.getLabel('vui_long_nhap_mat_khau_moi'),
                        minlength: nhMain.getLabel('mat_khau_nhap_qua_ngan'),
                        maxlength: nhMain.getLabel('mat_khau_nhap_qua_dai')
                    },
                    re_password: {
                        equalTo: nhMain.getLabel('xac_nhan_mat_khau_chua_chinh_xac')
                    }
                },
                errorPlacement: function(error, element) {
                    var group = element.closest('.input-group');
                    var bootstrap_select = element.closest('.bootstrap-select');
                    if (group.length) {
                        group.after(error.addClass('invalid-feedback'));
                    } else if (bootstrap_select.length) {
                        bootstrap_select.after(error.addClass('invalid-feedback'));
                    } else {
                        element.after(error.addClass('invalid-feedback'));
                    }
                },
                invalidHandler: function(event, validator) {
                    validator.errorList[0].element.focus();
                },
            });
            formElement.on('keydown', 'input', function(e) {
                if (e.keyCode == 13) {
                    formElement.find('[nh-btn-action="submit"]').trigger('click');
                    return false;
                }
            });
            formElement.on('click', '[nh-btn-action="submit"]', function(e) {
                e.preventDefault();
                if (!validator.form()) return false;
                nhMain.reCaptcha.check(function(token) {
                    var formData = formElement.serialize();
                    if (token != null) {
                        formData = formData + '&' + _TOKEN_RECAPTCHA + '=' + token;
                    }
                    nhMain.callAjax({
                        url: formElement.attr('action'),
                        data: formData
                    }).done(function(response) {
                        var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                        var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                        var status = typeof(response.status) != _UNDEFINED ? response.status : {};
                        if (status == 403) {
                            nhMain.showAlert(_ERROR, message);
                            location.reload();
                        }
                        if (code == _SUCCESS) {
                            formElement.find('input').val('');
                            nhMain.showAlert(_SUCCESS, message);
                        } else {
                            nhMain.showAlert(_ERROR, message);
                        }
                    });
                });
            });
        }
    },
    cancelOrder: {
        init: function() {
            var _modal = $('#cancel-order-modal');
            if (_modal == null || _modal == _UNDEFINED || _modal.length == 0) {
                return false;
            }
            $(document).on('click', '[nh-order-btn="cancel"]', function(e) {
                var orderId = $(this).data('id');
                _modal.find('input').val('');
                _modal.find('textarea').val('');
                _modal.find('input[name="order_id"]').val(orderId);
                _modal.modal('show');
            });
            _modal.on('click', '[nh-confirm]', function(e) {
                var note = _modal.find('textarea[name="note"]').val();
                var order_id = _modal.find('input[name="order_id"]').val();
                nhMain.callAjax({
                    url: '/member/order/cancel',
                    data: {
                        customer_order_id: order_id,
                        customer_cancel: 1,
                        customer_note_cancel: note
                    }
                }).done(function(response) {
                    var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                    var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                    var status = typeof(response.status) != _UNDEFINED ? response.status : {};
                    if (status == 403) {
                        nhMain.showAlert(_ERROR, message);
                        location.reload();
                    }
                    if (code == _SUCCESS) {
                        nhMain.showAlert(_SUCCESS, message);
                    } else {
                        nhMain.showAlert(_ERROR, message);
                    }
                    location.reload();
                    _modal.modal('hide');
                });
            });
        }
    },
    forgotPassword: {
        init: function() {
            var self = this;
            var formElement = $('form[nh-form="forgot-password"');
            if (formElement == null || formElement == _UNDEFINED || formElement.length == 0) {
                return false;
            }
            var validator = formElement.validate({
                ignore: ':hidden',
                rules: {
                    email: {
                        required: true,
                        email: true,
                        minlength: 10,
                        maxlength: 255
                    }
                },
                messages: {
                    email: {
                        required: nhMain.getLabel('vui_long_nhap_email'),
                        email: nhMain.getLabel('email_chua_dung_dinh_dang'),
                        minlength: nhMain.getLabel('email_nhap_qua_ngan'),
                        maxlength: nhMain.getLabel('email_nhap_qua_dai')
                    }
                },
                errorPlacement: function(error, element) {
                    var group = element.closest('.input-group');
                    var bootstrap_select = element.closest('.bootstrap-select');
                    if (group.length) {
                        group.after(error.addClass('invalid-feedback'));
                    } else if (bootstrap_select.length) {
                        bootstrap_select.after(error.addClass('invalid-feedback'));
                    } else {
                        element.after(error.addClass('invalid-feedback'));
                    }
                },
                invalidHandler: function(event, validator) {
                    validator.errorList[0].element.focus();
                },
            });
            formElement.on('keydown', 'input', function(e) {
                if (e.keyCode == 13) {
                    formElement.find('[nh-btn-action="submit"]').trigger('click');
                    return false;
                }
            });
            formElement.on('click', '[nh-btn-action="submit"]', function(e) {
                e.preventDefault();
                if (!validator.form()) return false;
                nhMain.reCaptcha.check(function(token) {
                    var formData = formElement.serialize();
                    if (token != null) {
                        formData = formData + '&' + _TOKEN_RECAPTCHA + '=' + token;
                    }
                    nhMain.showLoading.page();
                    nhMain.callAjax({
                        url: formElement.attr('action'),
                        data: formData
                    }).done(function(response) {
                        var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                        var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                        var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                        nhMain.showLoading.remove();
                        if (code == _SUCCESS) {
                            if (nhMain.utilities.notEmpty(data.email)) {
                                window.location.href = '/member/verify-forgot-password?email=' + data.email;
                            }
                        } else {
                            nhMain.showAlert(_ERROR, message);
                        }
                    });
                });
            });
        }
    },
    verifyForgotPassword: {
        init: function() {
            var self = this;
            var formElement = $('form[nh-form="verify-forgot-password"]');
            if (formElement == null || formElement == _UNDEFINED || formElement.length == 0) {
                return false;
            }
            var validator = formElement.validate({
                ignore: ':hidden',
                rules: {
                    email: {
                        required: true,
                        email: true,
                        minlength: 10,
                        maxlength: 255
                    }
                },
                messages: {
                    email: {
                        required: nhMain.getLabel('vui_long_nhap_email'),
                        email: nhMain.getLabel('email_chua_dung_dinh_dang'),
                        minlength: nhMain.getLabel('email_nhap_qua_ngan'),
                        maxlength: nhMain.getLabel('email_nhap_qua_dai')
                    },
                    new_password: {
                        required: nhMain.getLabel('vui_long_nhap_mat_khau_moi'),
                        minlength: nhMain.getLabel('mat_khau_nhap_qua_ngan'),
                        maxlength: nhMain.getLabel('mat_khau_nhap_qua_dai')
                    },
                    re_password: {
                        equalTo: nhMain.getLabel('xac_nhan_mat_khau_chua_chinh_xac')
                    }
                },
                errorPlacement: function(error, element) {
                    var group = element.closest('.input-group');
                    var bootstrap_select = element.closest('.bootstrap-select');
                    if (group.length) {
                        group.after(error.addClass('invalid-feedback'));
                    } else if (bootstrap_select.length) {
                        bootstrap_select.after(error.addClass('invalid-feedback'));
                    } else {
                        element.after(error.addClass('invalid-feedback'));
                    }
                },
                invalidHandler: function(event, validator) {
                    validator.errorList[0].element.focus();
                },
            });
            formElement.on('keydown', 'input', function(e) {
                if (e.keyCode == 13) {
                    formElement.find('[nh-btn-action="submit"]').trigger('click');
                    return false;
                }
            });
            formElement.on('click', '[nh-btn-action="submit"]', function(e) {
                e.preventDefault();
                if (formElement.find('[name="code"]').val().length == 0) {
                    nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_nhap_ma_xac_nhan'));
                }
                formElement.find('[name="new_password"]').rules('add', {
                    minlength: 6,
                    maxlength: 255,
                    required: true,
                });
                formElement.find('[name="re_password"]').rules('add', {
                    equalTo: '#new_password'
                });
                if (!validator.form()) return false;
                nhMain.reCaptcha.check(function(token) {
                    var formData = formElement.serialize();
                    if (token != null) {
                        formData = formData + '&' + _TOKEN_RECAPTCHA + '=' + token;
                    }
                    nhMain.showLoading.page();
                    nhMain.callAjax({
                        url: formElement.attr('action'),
                        data: formData
                    }).done(function(response) {
                        var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                        var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                        var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                        nhMain.showLoading.remove();
                        if (code == _SUCCESS) {
                            nhMain.showAlert(_SUCCESS, message);
                            window.location.href = '/member/login';
                        } else {
                            nhMain.showAlert(_ERROR, message);
                        }
                    });
                });
            });
            formElement.on('click', '[nh-btn-action="resend-verify"]', function(e) {
                e.preventDefault();
                formElement.find('[name="new_password"]').rules('remove');
                formElement.find('[name="re_password"]').rules('remove');
                if (!validator.form()) return false;
                nhMain.reCaptcha.check(function(token) {
                    var formData = {
                        email: formElement.find('[name="email"]').val(),
                        generate_token: 'forgot_password'
                    }
                    if (token != null) {
                        formData[_TOKEN_RECAPTCHA] = token;
                    }
                    nhMain.showLoading.page();
                    nhMain.callAjax({
                        url: '/member/resend-verify-code',
                        data: formData
                    }).done(function(response) {
                        var countDownElement = $('[nh-countdown]');
                        if (countDownElement == null || countDownElement == _UNDEFINED || countDownElement.length == 0) {
                            return false;
                        }
                        nhMember.countDown.init(60, function(sec) {
                            countDownElement.text(nhMain.getLabel('gui_lai_sau') + ' (' + sec + ')');
                            $('[nh-btn-action="resend-verify"]').addClass('disable');
                        }, function() {
                            countDownElement.text('');
                            $('[nh-btn-action="resend-verify"]').removeClass('disable');
                        });
                        var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                        var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                        var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                        nhMain.showLoading.remove();
                        if (code == _SUCCESS) {
                            nhMain.showAlert(_SUCCESS, message);
                        } else {
                            nhMain.showAlert(_ERROR, message);
                        }
                    });
                });
            });
        }
    },
    verifyEmail: {
        init: function() {
            var self = this;
            var formElement = $('form[nh-form="verify-email"]');
            if (formElement == null || formElement == _UNDEFINED || formElement.length == 0) {
                return false;
            }
            var validator = formElement.validate({
                ignore: ':hidden',
                rules: {
                    email: {
                        required: true,
                        email: true,
                        minlength: 10,
                        maxlength: 255
                    }
                },
                messages: {
                    email: {
                        required: nhMain.getLabel('vui_long_nhap_email'),
                        email: nhMain.getLabel('email_chua_dung_dinh_dang'),
                        minlength: nhMain.getLabel('email_nhap_qua_ngan'),
                        maxlength: nhMain.getLabel('email_nhap_qua_dai')
                    }
                },
                errorPlacement: function(error, element) {
                    var group = element.closest('.input-group');
                    var bootstrap_select = element.closest('.bootstrap-select');
                    if (group.length) {
                        group.after(error.addClass('invalid-feedback'));
                    } else if (bootstrap_select.length) {
                        bootstrap_select.after(error.addClass('invalid-feedback'));
                    } else {
                        element.after(error.addClass('invalid-feedback'));
                    }
                },
                invalidHandler: function(event, validator) {
                    validator.errorList[0].element.focus();
                },
            });
            formElement.on('keydown', 'input', function(e) {
                if (e.keyCode == 13) {
                    formElement.find('[nh-btn-action="submit"]').trigger('click');
                    return false;
                }
            });
            formElement.on('click', '[nh-btn-action="submit"]', function(e) {
                e.preventDefault();
                if (formElement.find('[name="code"]').val().length == 0) {
                    nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_nhap_ma_xac_nhan'));
                }
                if (!validator.form()) return false;
                nhMain.reCaptcha.check(function(token) {
                    var formData = formElement.serialize();
                    if (token != null) {
                        formData = formData + '&' + _TOKEN_RECAPTCHA + '=' + token;
                    }
                    nhMain.showLoading.page();
                    nhMain.callAjax({
                        url: formElement.attr('action'),
                        data: formData
                    }).done(function(response) {
                        var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                        var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                        var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                        nhMain.showLoading.remove();
                        if (code == _SUCCESS) {
                            nhMain.showAlert(_SUCCESS, message);
                            window.location.href = '/member/login';
                        } else {
                            nhMain.showAlert(_ERROR, message);
                        }
                    });
                });
            });
            formElement.on('click', '[nh-btn-action="resend-verify"]', function(e) {
                e.preventDefault();
                if (!validator.form()) return false;
                nhMain.reCaptcha.check(function(token) {
                    var formData = {
                        email: formElement.find('[name="email"]').val(),
                        generate_token: 'active_account'
                    }
                    if (token != null) {
                        formData[_TOKEN_RECAPTCHA] = token;
                    }
                    nhMain.showLoading.page();
                    nhMain.callAjax({
                        url: '/member/resend-verify-code',
                        data: formData
                    }).done(function(response) {
                        var countDownElement = $('[nh-countdown]');
                        if (countDownElement == null || countDownElement == _UNDEFINED || countDownElement.length == 0) {
                            return false;
                        }
                        nhMember.countDown.init(60, function(sec) {
                            countDownElement.text(nhMain.getLabel('gui_lai_sau') + ' (' + sec + ')');
                            $('[nh-btn-action="resend-verify"]').addClass('disable');
                        }, function() {
                            countDownElement.text('');
                            $('[nh-btn-action="resend-verify"]').removeClass('disable');
                        });
                        var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                        var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                        var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                        nhMain.showLoading.remove();
                        if (code == _SUCCESS) {
                            nhMain.showAlert(_SUCCESS, message);
                        } else {
                            nhMain.showAlert(_ERROR, message);
                        }
                    });
                });
            });
        },
    },
    countDown: {
        timer: null,
        init: function(seconds = 60, callBackDuring = null, callBackEnd = null) {
            var self = this;
            if (typeof(callBackDuring) != 'function') {
                callBackDuring = function() {};
            }
            if (typeof(callBackEnd) != 'function') {
                callBackEnd = function() {};
            }
            seconds = typeof(seconds) != _UNDEFINED ? seconds : null;
            clearTimeout(self.timer);
            (function decrementCounter() {
                if (--seconds < 0) {
                    callBackEnd();
                    return false;
                }
                self.timer = setTimeout(function() {
                    callBackDuring(seconds);
                    decrementCounter();
                }, 1000);
            })();
        }
    },
    attendance: {
        wrap_attendance: $('[nh-attendance]'),
        init: function() {
            var self = this;
            if (self.wrap_attendance == null || self.wrap_attendance == _UNDEFINED || self.wrap_attendance.length == 0) {
                return false;
            }
            self.event();
        },
        event: function() {
            var self = this;
            self.wrap_attendance.on('click', '[attendance-tick="true"]', function(e) {
                var _this = $(this);
                var day = _this.data('day');
                var date = _this.data('date');
                var point = _this.data('point');
                var point_promotion = $('.number_point_promition').html();
                nhMain.callAjax({
                    url: '/member/attendance-tick',
                    data: {
                        day: day,
                        date: date,
                        point: point
                    }
                }).done(function(response) {
                    var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                    var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                    if (code == _SUCCESS) {
                        _this.removeAttr("attendance-tick");
                        _this.attr("checked", "true");
                        $(this).addClass('123123');
                        $('#modal-attendance-success').modal('show');
                        $('#modal-attendance-success .number-point').html('+' + point);
                        $('#modal-attendance-success .point').html(point);
                        $('.number_point_promition').html(parseInt(point_promotion) + parseInt(point));
                    } else {
                        $('#modal-attendance-error').modal('show');
                    }
                    $('p.message').html(message);
                });
            });
        }
    },
    wallet: {
        init: function() {
            var self = this;
            self.givePoint.init();
            self.buyPoint.init();
            self.managerPoint.init();
        },
        givePoint: {
            formElement: $('form#give-point'),
            validator: null,
            init: function() {
                var self = this;
                if (self.formElement.length == 0) return;
                self.event();
            },
            event: function() {
                var self = this;
                self.validator = self.formElement.validate({
                    ignore: ':hidden',
                    rules: {
                        customer_code: {
                            required: true
                        },
                        point: {
                            required: true
                        }
                    },
                    messages: {
                        customer_code: {
                            required: nhMain.getLabel('vui_long_nhap_thong_tin'),
                        },
                        point: {
                            required: nhMain.getLabel('vui_long_nhap_thong_tin'),
                        }
                    },
                    errorPlacement: function(error, element) {
                        var group = element.closest('.input-group');
                        var bootstrap_select = element.closest('.bootstrap-select');
                        if (group.length) {
                            group.after(error.addClass('invalid-feedback'));
                        } else if (bootstrap_select.length) {
                            bootstrap_select.after(error.addClass('invalid-feedback'));
                        } else {
                            element.after(error.addClass('invalid-feedback'));
                        }
                    },
                    invalidHandler: function(event, validator) {
                        validator.errorList[0].element.focus();
                    },
                });
                self.formElement.on('keydown', 'input', function(e) {
                    if (e.keyCode == 13) {
                        self.formElement.find('[nh-btn-action="submit"]').trigger('click');
                        return false;
                    }
                });
                self.formElement.on('click', '[nh-btn-action="submit"]', function(e) {
                    if (self.formElement.find('[name="code"]').val().length == 0) {
                        nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_nhap_ma_xac_nhan'));
                    }
                    if (self.validator == null || !self.validator.form()) return false;
                    var formData = self.formElement.serialize();
                    nhMain.showLoading.page();
                    nhMain.callAjax({
                        async: false,
                        url: '/member/wallet/ajax-give-point',
                        data: formData,
                    }).done(function(response) {
                        var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                        var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                        var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                        nhMain.showLoading.remove();
                        if (code == _SUCCESS) {
                            nhMain.showAlert(_SUCCESS, message);
                            location.reload();
                        } else {
                            nhMain.showAlert(_ERROR, message);
                        }
                    });
                });
                self.formElement.on('keyup keypess keydown', 'input[name="point"]', function(e) {
                    var pointMax = $(this).attr('nh-point-max');
                    var point = $(this).val().replace(',', '');
                    if (parseInt(pointMax) < parseInt(point)) {
                        point = pointMax;
                        $(this).val(pointMax);
                    }
                });
                self.formElement.on('click', '[nh-btn-action="get-verify"]', function(e) {
                    e.preventDefault();
                    nhMain.reCaptcha.check(function(token) {
                        var formData = {
                            type_verify: self.formElement.find('[name="type_verify"]:checked').val(),
                            type_token: 'give_point'
                        }
                        if (token != null) {
                            formData[_TOKEN_RECAPTCHA] = token;
                        }
                        nhMain.showLoading.page();
                        nhMain.callAjax({
                            url: '/member/get-verify-code',
                            data: formData
                        }).done(function(response) {
                            var countDownElement = $('[nh-countdown]');
                            if (countDownElement == null || countDownElement == _UNDEFINED || countDownElement.length == 0) {
                                return false;
                            }
                            nhMember.countDown.init(60, function(sec) {
                                countDownElement.text(nhMain.getLabel('gui_lai_sau') + ' (' + sec + ')');
                                $('[nh-btn-action="get-verify"]').addClass('disable');
                            }, function() {
                                countDownElement.text('');
                                $('[nh-btn-action="get-verify"]').removeClass('disable');
                            });
                            var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                            var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                            var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                            nhMain.showLoading.remove();
                            if (code == _SUCCESS) {
                                nhMain.showAlert(_SUCCESS, message);
                            } else {
                                nhMain.showAlert(_ERROR, message);
                            }
                        });
                    });
                });
            }
        },
        buyPoint: {
            formElement: $('form#buy-point'),
            init: function() {
                var self = this;
                if (self.formElement.length == 0) return;
                self.event();
            },
            event: function() {
                var self = this;
                self.formElement.on('keydown', 'input', function(e) {
                    if (e.keyCode == 13) {
                        self.formElement.find('[nh-btn-action="submit"]').trigger('click');
                        return false;
                    }
                });
                self.formElement.on('click', '[nh-btn-action="submit"]', function(e) {
                    var inputPoint = self.formElement.find('input[name="point"]:checked').val();
                    var payment_gateway = self.formElement.find('input[name="payment_gateway"]');
                    if (inputPoint == null || inputPoint == _UNDEFINED || inputPoint.length == 0) {
                        nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_chon_so_tien_nap'));
                        return false;
                    }
                    if (typeof(payment_gateway) == _UNDEFINED || payment_gateway.length == 0 || payment_gateway.val().length == 0) {
                        nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_chon_cong_thanh_toan'));
                        return false;
                    }
                    var formData = self.formElement.serialize();
                    nhMain.showLoading.page();
                    nhMain.callAjax({
                        async: false,
                        url: '/member/wallet/ajax-buy-point',
                        data: formData,
                    }).done(function(response) {
                        nhMain.showLoading.remove();
                        var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                        var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                        var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                        var orderCode = typeof(data.code) != _UNDEFINED ? data.code : null;
                        var urlCheckout = typeof(data.url) != _UNDEFINED ? data.url : null;
                        if (code != _SUCCESS) {
                            nhMain.showAlert(_ERROR, message);
                            return false;
                        }
                        if (urlCheckout != null && urlCheckout.length > 0) {
                            window.location.href = urlCheckout;
                        }
                        if (code == _SUCCESS) {
                            nhMain.showAlert(_SUCCESS, message);
                        }
                    });
                });
                self.formElement.on('click', '[choose-payments]', function(e) {
                    var code = $(this).attr('code');
                    var payment_gateway = self.formElement.find('input[name="payment_gateway"]');
                    if (typeof(code) == _UNDEFINED || code == '') {
                        nhMain.showAlert(_ERROR, nhMain.getLabel('khong_lay_duoc_ma_phuong_thuc_thanh_toan'));
                        return false;
                    }
                    if (typeof(payment_gateway) == _UNDEFINED || payment_gateway.length == 0) {
                        nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_chon_cong_thanh_toan'));
                        return false;
                    }
                    $('[choose-payments]').removeClass('active bg-orange');
                    $(this).addClass('active bg-orange');
                    payment_gateway.val(code);
                });
            }
        },
        managerPoint: {
            wrap: null,
            action: null,
            page: 1,
            init: function() {
                var self = this;
                self.wrap = $('#transaction_history');
                if (self.wrap == null || self.wrap == _UNDEFINED || self.wrap.length == 0) {
                    return false;
                }
                $(document).on('click', '[nh-wallet-redirect]', function(e) {
                    self.action = $(this).attr('nh-wallet-redirect');
                    self.page = 1;
                    self.tabs();
                    return false;
                });
                $(document).on('click', '.pagination .page-item:not(.disabled , .active) a', function(e) {
                    e.preventDefault();
                    self.page = parseInt($(this).attr('nh-page-redirect'));
                    self.tabs();
                    return false;
                });
            },
            tabs: function() {
                var self = this;
                nhMain.showLoading.page();
                nhMain.callAjax({
                    url: '/member/ajax-history-point',
                    data: {
                        page: self.page,
                        action: self.action
                    },
                    dataType: 'html'
                }).done(function(response) {
                    nhMain.showLoading.remove();
                    self.wrap.html(response);
                });
            }
        }
    },
    otp: {
        wrapElement: null,
        inputOtp: null,
        inputVerification: null,
        init: function(params = {}) {
            var self = this;
            self.wrapElement = typeof(params.wrap) != _UNDEFINED ? params.wrap : [];
            if (self.wrapElement == null || self.wrapElement == _UNDEFINED || self.wrapElement.length == 0) {
                return;
            }
            $.each(self.wrapElement, function(index, wrapElement) {
                var inputOtp = '[nh-otp="input"]';
                var inputVerification = '[nh-otp="verification"]';
                if ($(wrapElement).length == 0 || $(wrapElement).find(inputOtp).length == 0 || $(wrapElement).find(inputVerification).length == 0) {
                    return;
                }
                self.inputOtp = inputOtp;
                self.inputVerification = inputVerification;
                self.event();
            });
        },
        event: function() {
            var self = this;
            $(document).on('keypress', self.inputOtp, function(e) {
                if (e.which != 8 && e.which != 46 && e.which != 37 && e.which != 39 && e.which != 9 && (e.which < 48 || e.which > 57)) return false;
            });
            $(document).on('keyup', self.inputOtp, function(e) {
                var value = $(this).val();
                if (value.length > 0 && e.which != 46 && e.which != 8 && e.which != 37 && e.which != 39 && e.which != 9) {
                    if (!isNaN(parseInt(e.key))) {
                        $(this).val(e.key);
                    }
                    $(this).next().focus();
                } else {
                    $(this).val(value);
                }
                var codeOtp = [];
                $(self.inputOtp).each(function(i) {
                    codeOtp[i] = $(self.inputOtp)[i].value;
                });
                $(self.inputVerification).val(codeOtp.join(''));
            });
            $(document).on('keydown', self.inputOtp, function(e) {
                switch (e.keyCode) {
                    case 8:
                        if ($(this).val().length > 0) {
                            $(this).val('');
                        } else {
                            $(this).prev().focus();
                        }
                        break;
                    case 46:
                        if ($(this).val().length > 0) {
                            $(this).val('');
                        } else {
                            $(this).next().focus();
                        }
                        break;
                    case 37:
                        $(this).prev().focus();
                        break;
                    case 39:
                        $(this).next().focus();
                        break;
                }
            });
            $(document).on('paste', self.inputOtp, function(e) {
                var pastedData = e.originalEvent.clipboardData.getData('text');
                var inputLength = $(self.inputOtp).length;
                for (var i = 0; i < pastedData.length; i++) {
                    if (isNaN(parseInt(pastedData[i]))) {
                        nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_nhap_so'));
                        return false;
                    }
                    if (i < inputLength) {
                        $(self.inputOtp)[i].value = pastedData[i];
                    }
                    if (i == (inputLength - 1)) {
                        $(self.inputOtp)[i - 1].focus();
                    }
                }
            });
        }
    },
    changeEmail: {
        init: function() {
            var self = this;
            var formElement = $('form[nh-form="change-email"]');
            if (formElement == null || formElement == _UNDEFINED || formElement.length == 0) {
                return false;
            }
            nhMain.validation.phoneVn();
            var validator = formElement.validate({
                ignore: ':hidden',
                rules: {
                    new_email: {
                        required: true,
                        email: true,
                        minlength: 10,
                        maxlength: 255
                    },
                },
                messages: {
                    new_email: {
                        required: nhMain.getLabel('vui_long_nhap_thong_tin'),
                        email: nhMain.getLabel('email_chua_dung_dinh_dang'),
                        minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan'),
                        maxlength: nhMain.getLabel('thong_tin_nhap_qua_dai')
                    }
                },
                errorPlacement: function(error, element) {
                    var group = element.closest('.input-group');
                    var bootstrap_select = element.closest('.bootstrap-select');
                    if (group.length) {
                        group.after(error.addClass('invalid-feedback'));
                    } else if (bootstrap_select.length) {
                        bootstrap_select.after(error.addClass('invalid-feedback'));
                    } else {
                        element.after(error.addClass('invalid-feedback'));
                    }
                },
                invalidHandler: function(event, validator) {
                    validator.errorList[0].element.focus();
                },
            });
            formElement.on('keydown', 'input', function(e) {
                if (e.keyCode == 13) {
                    formElement.find('[nh-btn-action="submit"]').trigger('click');
                    return false;
                }
            });
            formElement.on('click', '[nh-btn-action="submit"]', function(e) {
                e.preventDefault();
                if (formElement.find('[name="code"]').val().length == 0) {
                    nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_nhap_ma_xac_nhan'));
                }
                if (!validator.form()) return false;
                nhMain.reCaptcha.check(function(token) {
                    var formData = formElement.serialize();
                    if (token != null) {
                        formData = formData + '&' + _TOKEN_RECAPTCHA + '=' + token;
                    }
                    nhMain.showLoading.page();
                    nhMain.callAjax({
                        url: formElement.attr('action'),
                        data: formData
                    }).done(function(response) {
                        var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                        var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                        var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                        nhMain.showLoading.remove();
                        if (code == _SUCCESS) {
                            nhMain.showAlert(_SUCCESS, message);
                            window.location.href = '/member/dashboard';
                        } else {
                            nhMain.showAlert(_ERROR, message);
                        }
                    });
                });
            });
            formElement.on('click', '[nh-btn-action="get-verify"]', function(e) {
                e.preventDefault();
                nhMain.reCaptcha.check(function(token) {
                    var formData = {
                        type_verify: formElement.find('[name="type_verify"]:checked').val(),
                        type_token: 'verify_change_email'
                    }
                    if (token != null) {
                        formData[_TOKEN_RECAPTCHA] = token;
                    }
                    nhMain.showLoading.page();
                    nhMain.callAjax({
                        url: '/member/get-verify-code',
                        data: formData
                    }).done(function(response) {
                        var countDownElement = $('[nh-countdown]');
                        if (countDownElement == null || countDownElement == _UNDEFINED || countDownElement.length == 0) {
                            return false;
                        }
                        nhMember.countDown.init(60, function(sec) {
                            countDownElement.text(nhMain.getLabel('gui_lai_sau') + ' (' + sec + ')');
                            $('[nh-btn-action="get-verify"]').addClass('disable');
                        }, function() {
                            countDownElement.text('');
                            $('[nh-btn-action="get-verify"]').removeClass('disable');
                        });
                        var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                        var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                        var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                        nhMain.showLoading.remove();
                        if (code == _SUCCESS) {
                            nhMain.showAlert(_SUCCESS, message);
                        } else {
                            nhMain.showAlert(_ERROR, message);
                        }
                    });
                });
            });
        }
    },
    changePhone: {
        init: function() {
            var self = this;
            var formElement = $('form[nh-form="change-phone"]');
            if (formElement == null || formElement == _UNDEFINED || formElement.length == 0) {
                return false;
            }
            nhMain.validation.phoneVn();
            var validator = formElement.validate({
                ignore: ':hidden',
                rules: {
                    new_phone: {
                        required: true,
                        minlength: 10,
                        maxlength: 11,
                        phoneVN: true
                    }
                },
                messages: {
                    new_phone: {
                        required: nhMain.getLabel('vui_long_nhap_so_dien_thoai'),
                        minlength: nhMain.getLabel('so_dien_thoai_khong_hop_le'),
                        maxlength: nhMain.getLabel('so_dien_thoai_khong_hop_le')
                    }
                },
                errorPlacement: function(error, element) {
                    var group = element.closest('.input-group');
                    var bootstrap_select = element.closest('.bootstrap-select');
                    if (group.length) {
                        group.after(error.addClass('invalid-feedback'));
                    } else if (bootstrap_select.length) {
                        bootstrap_select.after(error.addClass('invalid-feedback'));
                    } else {
                        element.after(error.addClass('invalid-feedback'));
                    }
                },
                invalidHandler: function(event, validator) {
                    validator.errorList[0].element.focus();
                },
            });
            formElement.on('keydown', 'input', function(e) {
                if (e.keyCode == 13) {
                    formElement.find('[nh-btn-action="submit"]').trigger('click');
                    return false;
                }
            });
            formElement.on('click', '[nh-btn-action="submit"]', function(e) {
                e.preventDefault();
                if (formElement.find('[name="code"]').val().length == 0) {
                    nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_nhap_ma_xac_nhan'));
                }
                if (!validator.form()) return false;
                nhMain.reCaptcha.check(function(token) {
                    var formData = formElement.serialize();
                    if (token != null) {
                        formData = formData + '&' + _TOKEN_RECAPTCHA + '=' + token;
                    }
                    nhMain.showLoading.page();
                    nhMain.callAjax({
                        url: formElement.attr('action'),
                        data: formData
                    }).done(function(response) {
                        var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                        var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                        var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                        nhMain.showLoading.remove();
                        if (code == _SUCCESS) {
                            nhMain.showAlert(_SUCCESS, message);
                            window.location.href = '/member/dashboard';
                        } else {
                            nhMain.showAlert(_ERROR, message);
                        }
                    });
                });
            });
            formElement.on('click', '[nh-btn-action="get-verify"]', function(e) {
                e.preventDefault();
                nhMain.reCaptcha.check(function(token) {
                    var formData = {
                        type_verify: formElement.find('[name="type_verify"]:checked').val(),
                        type_token: 'verify_change_phone'
                    }
                    if (token != null) {
                        formData[_TOKEN_RECAPTCHA] = token;
                    }
                    nhMain.showLoading.page();
                    nhMain.callAjax({
                        url: '/member/get-verify-code',
                        data: formData
                    }).done(function(response) {
                        var countDownElement = $('[nh-countdown]');
                        if (countDownElement == null || countDownElement == _UNDEFINED || countDownElement.length == 0) {
                            return false;
                        }
                        nhMember.countDown.init(60, function(sec) {
                            countDownElement.text(nhMain.getLabel('gui_lai_sau') + ' (' + sec + ')');
                            $('[nh-btn-action="get-verify"]').addClass('disable');
                        }, function() {
                            countDownElement.text('');
                            $('[nh-btn-action="get-verify"]').removeClass('disable');
                        });
                        var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                        var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                        var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                        nhMain.showLoading.remove();
                        if (code == _SUCCESS) {
                            nhMain.showAlert(_SUCCESS, message);
                        } else {
                            nhMain.showAlert(_ERROR, message);
                        }
                    });
                });
            });
        }
    },
    associateBank: {
        modal: null,
        init: function() {
            var self = this;
            var formElement = $('form[nh-form="associate-bank"]');
            if (formElement == null || formElement == _UNDEFINED || formElement.length == 0) {
                return false;
            }
            self.modal = $('#change-associate-bank-modal');
            var validator = formElement.validate({
                ignore: ':hidden',
                rules: {
                    bank_key: {
                        required: true
                    },
                    bank_branch: {
                        required: true,
                        minlength: 6
                    },
                    account_holder: {
                        required: true,
                        minlength: 6
                    },
                    account_number: {
                        required: true,
                        minlength: 6,
                        number: true
                    }
                },
                messages: {
                    bank_key: {
                        required: nhMain.getLabel('vui_long_nhap_thong_tin'),
                        minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan')
                    },
                    bank_branch: {
                        required: nhMain.getLabel('vui_long_nhap_thong_tin'),
                        minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan')
                    },
                    account_holder: {
                        required: nhMain.getLabel('vui_long_nhap_thong_tin'),
                        minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan')
                    },
                    account_number: {
                        required: nhMain.getLabel('vui_long_nhap_thong_tin'),
                        minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan'),
                        number: nhMain.getLabel('so_tai_khoan_chua_dung_dinh_dang')
                    }
                },
                errorPlacement: function(error, element) {
                    var group = element.closest('.input-group');
                    var bootstrap_select = element.closest('.bootstrap-select');
                    if (group.length) {
                        group.after(error.addClass('invalid-feedback'));
                    } else if (bootstrap_select.length) {
                        bootstrap_select.after(error.addClass('invalid-feedback'));
                    } else {
                        element.after(error.addClass('invalid-feedback'));
                    }
                },
                invalidHandler: function(event, validator) {
                    validator.errorList[0].element.focus();
                },
            });
            formElement.on('keydown', 'input', function(e) {
                if (e.keyCode == 13) {
                    formElement.find('[nh-btn-action="submit"]').trigger('click');
                    return false;
                }
            });
            formElement.on('click', '[nh-btn-action="submit"]', function(e) {
                e.preventDefault();
                if (!validator.form()) return false;
                nhMain.reCaptcha.check(function(token) {
                    var formData = formElement.serialize();
                    if (token != null) {
                        formData = formData + '&' + _TOKEN_RECAPTCHA + '=' + token;
                    }
                    nhMain.showLoading.page();
                    nhMain.callAjax({
                        url: formElement.attr('action'),
                        data: formData
                    }).done(function(response) {
                        var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                        var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                        var status = typeof(response.status) != _UNDEFINED ? response.status : {};
                        nhMain.showLoading.remove();
                        if (code == _SUCCESS) {
                            nhMain.showAlert(_SUCCESS, message);
                            location.reload();
                        } else {
                            nhMain.showAlert(_ERROR, message);
                        }
                        $('#change-associate-bank-modal').modal('hide');
                    });
                });
            });
            $(document).on('click', '[nh-affiliate="delete-bank"]', function(e) {
                var _id = $(this).attr('data-id');
                var _btn_delete = $(this);
                if (_id == null || _id == _UNDEFINED || _id.length == 0) {
                    return false;
                }
                nhMain.showAlert(_WARNING, nhMain.getLabel('ban_co_muon_xoa_lien_ket_ngan_hang_nay'), function() {
                    nhMain.showLoading.page();
                    nhMain.callAjax({
                        url: '/member/bank/delete',
                        data: {
                            bank_id: _id
                        }
                    }).done(function(response) {
                        var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                        var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                        var status = typeof(response.status) != _UNDEFINED ? response.status : {};
                        nhMain.showLoading.remove();
                        if (code == _SUCCESS) {
                            nhMain.showAlert(_SUCCESS, message);
                            location.reload();
                        } else {
                            nhMain.showAlert(_ERROR, message);
                        }
                    });
                });
            });
            $(document).on('click', '[nh-affiliate="add"]', function(e) {
                self.clearInputAffiliateModal();
                self.modal.modal('show');
            });
            $(document).on('click', '[nh-affiliate="edit"]', function(e) {
                self.clearInputAffiliateModal();
                var affiliateInfo = $(this).data('affiliate');
                self.loadAffiliateModal(affiliateInfo);
                self.modal.modal('show');
            });
        },
        clearInputAffiliateModal: function() {
            var self = this;
            self.modal.find('input').val('');
            var bankKeySelect = self.modal.find('select#ward_id');
            bankKeySelect.selectpicker('destroy');
            bankKeySelect.val('');
            bankKeySelect.selectpicker('render');
        },
        loadAffiliateModal: function(affiliateInfo = {}) {
            var self = this;
            if (affiliateInfo.customer_id == null || affiliateInfo.customer_id == _UNDEFINED || affiliateInfo.customer_id.length == 0) {
                return false;
            }
            self.modal.find('input[name="bank_id"]').val(typeof(affiliateInfo.id) != _UNDEFINED ? affiliateInfo.id : '');
            self.modal.find('input[name="bank_branch"]').val(typeof(affiliateInfo.bank_branch) != _UNDEFINED ? affiliateInfo.bank_branch : '');
            self.modal.find('input[name="account_holder"]').val(typeof(affiliateInfo.account_holder) != _UNDEFINED ? affiliateInfo.account_holder : '');
            self.modal.find('input[name="account_number"]').val(typeof(affiliateInfo.account_number) != _UNDEFINED ? affiliateInfo.account_number : '');
            self.modal.find('input[name="bank_key"]').selectpicker('render');
            self.modal.find('select#bank_key').val(typeof(affiliateInfo.bank_key) != _UNDEFINED ? affiliateInfo.bank_key : '');
            self.modal.find('select#bank_key').selectpicker('render');
        }
    },
    affiliate: {
        init: function() {
            var self = this;
            self.statistics.init();
            self.chart.init();
            self.activeAccount.init();
            self.pointTomoney.init();
        },
        statistics: {
            wrapElement: null,
            init: function() {
                var self = this;
                self.wrapElement = $('#wrap-dashboard-statistic-element');
                if (self.wrapElement == null || self.wrapElement == _UNDEFINED || self.wrapElement.length == 0) {
                    return false;
                }
                self.event();
            },
            event: function() {
                var self = this;
                $(document).on('click', '[filter-month]', function(e) {
                    var month = typeof($(this).attr('filter-month')) != _UNDEFINED ? $(this).attr('filter-month') : null;
                    var monthText = $(this).text();
                    $(this).closest('.dropdown').find('.dropdown-toggle').text(monthText);
                    self.loadStatisticMonth(month);
                });
            },
            loadStatisticMonth: function(month = null) {
                var self = this;
                nhMain.showLoading.page();
                nhMain.callAjax({
                    url: '/member/affiliate/load-statistic-month',
                    dataType: 'html',
                    data: {
                        month: month
                    }
                }).done(function(response) {
                    self.wrapElement.html(response);
                    nhMain.showLoading.remove();
                    return false
                });
            },
        },
        chart: {
            wrapElement: null,
            chartElement: null,
            chartData: null,
            init: function() {
                var self = this;
                self.wrapElement = $('#wrap-load-chart-profit');
                if (self.wrapElement == null || self.wrapElement == _UNDEFINED || self.wrapElement.length == 0) {
                    return false;
                }
                self.initChart();
                $(document).on('click', '[chart-month]', function(e) {
                    var month = typeof($(this).attr('chart-month')) != _UNDEFINED ? $(this).attr('chart-month') : null;
                    var monthText = $(this).text();
                    $(this).closest('.dropdown').find('.dropdown-toggle').text(monthText);
                    self.loadChart(month);
                });
            },
            loadChart: function(month) {
                var self = this;
                nhMain.showLoading.page();
                nhMain.callAjax({
                    url: '/member/affiliate/load-chart-profit',
                    dataType: 'html',
                    data: {
                        month: month
                    }
                }).done(function(response) {
                    self.wrapElement.html(response);
                    nhMain.showLoading.remove();
                    self.initChart();
                });
            },
            initChart: function() {
                var self = this;
                self.chartElement = self.wrapElement.find('#chart-profit');
                if (self.chartElement.length == 0) return false;
                var inputData = $('#data-chart-profit');
                if (inputData.length == 0) return false;
                self.chartData = nhMain.utilities.parseJsonToObject(inputData.val());
                if ($.isEmptyObject(self.chartData)) return false;
                var labelText = $.trim($('#dropdown-month-chart-profit .dropdown-toggle').text());
                var color = Chart.helpers.color;
                var barChartData = {
                    labels: typeof(self.chartData.labels) != _UNDEFINED ? self.chartData.labels : [],
                    datasets: [{
                        fill: true,
                        label: labelText,
                        backgroundColor: 'rgba(93, 120, 255, 0.6)',
                        borderColor: 'rgba(93, 120, 255, 0)',
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 12,
                        pointBackgroundColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
                        pointBorderColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
                        pointHoverBackgroundColor: 'rgba(93, 120, 255, 1)',
                        pointHoverBorderColor: Chart.helpers.color('#000000').alpha(0.1).rgbString(),
                        data: typeof(self.chartData.money_data) != _UNDEFINED ? self.chartData.money_data : []
                    }]
                };
                var ctx = self.chartElement[0].getContext('2d');
                var chart = new Chart(ctx, {
                    type: 'line',
                    data: barChartData,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: {
                            display: true,
                            position: 'bottom'
                        },
                        scales: {
                            x: {
                                categoryPercentage: 0.35,
                                barPercentage: 0.70,
                                display: true,
                                gridLines: false,
                                ticks: {
                                    display: true,
                                    beginAtZero: true,
                                    fontColor: 'rgba(175, 180, 212, 1)',
                                    fontSize: 13,
                                    padding: 10
                                }
                            },
                            y: {
                                categoryPercentage: 0.35,
                                barPercentage: 0.70,
                                display: true,
                                gridLines: {
                                    color: 'rgba(217, 223, 250, 1)',
                                    drawBorder: false,
                                    offsetGridLines: false,
                                    drawTicks: false,
                                    borderDash: [3, 4],
                                    zeroLineWidth: 1,
                                    zeroLineColor: 'rgba(217, 223, 250, 1)',
                                    zeroLineBorderDash: [3, 4]
                                },
                                ticks: {
                                    display: true,
                                    beginAtZero: true,
                                    fontColor: 'rgba(175, 180, 212, 1)',
                                    fontSize: 13,
                                    padding: 10,
                                    callback: function(value, index, values) {
                                        return nhMain.utilities.parseNumberToTextMoney(value);
                                    }
                                }
                            }
                        },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
                                        if (label) {
                                            label += ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                            label += new Intl.NumberFormat('en-US').format(parseFloat(context.parsed.y));
                                        }
                                        return label + ' VND';
                                    }
                                }
                            }
                        },
                        layout: {
                            padding: {
                                left: 0,
                                right: 0,
                                top: 5,
                                bottom: 5
                            }
                        }
                    }
                });
            }
        },
        activeAccount: {
            init: function() {
                var self = this;
                var formElement = $('form[nh-form="process-active"]');
                if (formElement == null || formElement == _UNDEFINED || formElement.length == 0) {
                    return false;
                }
                var validator = formElement.validate({
                    ignore: ':hidden',
                    rules: {
                        identity_card_id: {
                            required: true,
                            number: true
                        },
                        identity_card_date: {
                            required: true
                        },
                        identity_card_name: {
                            required: true
                        },
                        bank_key: {
                            required: true
                        },
                        bank_branch: {
                            required: true,
                            minlength: 6
                        },
                        account_holder: {
                            required: true,
                            minlength: 6
                        },
                        account_number: {
                            required: true,
                            minlength: 6,
                            number: true
                        }
                    },
                    messages: {
                        identity_card_id: {
                            required: nhMain.getLabel('vui_long_nhap_thong_tin'),
                            number: nhMain.getLabel('cmnd_cccd_chua_dung_dinh_dang')
                        },
                        identity_card_date: {
                            required: nhMain.getLabel('vui_long_nhap_thong_tin')
                        },
                        identity_card_name: {
                            required: nhMain.getLabel('vui_long_nhap_thong_tin')
                        },
                        bank_key: {
                            required: nhMain.getLabel('vui_long_nhap_thong_tin')
                        },
                        bank_branch: {
                            required: nhMain.getLabel('vui_long_nhap_thong_tin'),
                            minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan')
                        },
                        account_holder: {
                            required: nhMain.getLabel('vui_long_nhap_thong_tin'),
                            minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan')
                        },
                        account_number: {
                            required: nhMain.getLabel('vui_long_nhap_thong_tin'),
                            minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan'),
                            number: nhMain.getLabel('so_tai_khoan_chua_dung_dinh_dang')
                        }
                    },
                    errorPlacement: function(error, element) {
                        var group = element.closest('.input-group');
                        var bootstrap_select = element.closest('.bootstrap-select');
                        if (group.length) {
                            group.after(error.addClass('invalid-feedback'));
                        } else if (bootstrap_select.length) {
                            bootstrap_select.after(error.addClass('invalid-feedback'));
                        } else {
                            element.after(error.addClass('invalid-feedback'));
                        }
                    },
                    invalidHandler: function(event, validator) {
                        validator.errorList[0].element.focus();
                    },
                });
                formElement.on('keydown', 'input', function(e) {
                    if (e.keyCode == 13) {
                        formElement.find('[nh-btn-action="submit"]').trigger('click');
                        return false;
                    }
                });
                formElement.on('click', '[nh-btn-action="submit"]', function(e) {
                    e.preventDefault();
                    if (!validator.form()) return false;
                    nhMain.showAlert(_WARNING, nhMain.getLabel('ban_co_muon_khoi_tao_tai_khoan_doi_tac'), function() {
                        nhMain.reCaptcha.check(function(token) {
                            var formData = formElement.serialize();
                            if (token != null) {
                                formData = formData + '&' + _TOKEN_RECAPTCHA + '=' + token;
                            }
                            nhMain.showLoading.page();
                            nhMain.callAjax({
                                url: formElement.attr('action'),
                                data: formData
                            }).done(function(response) {
                                var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                                var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                                var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                                nhMain.showLoading.remove();
                                if (code == _SUCCESS) {
                                    if (nhMain.utilities.notEmpty(data.wait_active)) {
                                        nhMain.showAlert(_ERROR, message);
                                        return false;
                                    }
                                    nhMain.showAlert(_SUCCESS, message);
                                    if (nhMain.utilities.notEmpty(data.redirect)) {
                                        window.location.href = data.redirect;
                                    } else {
                                        window.location.href = '/member/affiliate/active';
                                    }
                                } else {
                                    nhMain.showAlert(_ERROR, message);
                                }
                            });
                        });
                    });
                });
                formElement.on('click', '[nh-btn-action="get-verify"]', function(e) {
                    e.preventDefault();
                    nhMain.reCaptcha.check(function(token) {
                        var formData = {
                            type_verify: formElement.find('[name="type_verify"]:checked').val(),
                            type_token: _AFFILIATE
                        }
                        if (token != null) {
                            formData[_TOKEN_RECAPTCHA] = token;
                        }
                        nhMain.showLoading.page();
                        nhMain.callAjax({
                            url: '/member/get-verify-code',
                            data: formData
                        }).done(function(response) {
                            var countDownElement = $('[nh-countdown]');
                            if (countDownElement == null || countDownElement == _UNDEFINED || countDownElement.length == 0) {
                                return false;
                            }
                            nhMember.countDown.init(60, function(sec) {
                                countDownElement.text(nhMain.getLabel('gui_lai_sau') + ' (' + sec + ')');
                                $('[nh-btn-action="get-verify"]').addClass('disable');
                            }, function() {
                                countDownElement.text('');
                                $('[nh-btn-action="get-verify"]').removeClass('disable');
                            });
                            var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                            var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                            var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                            nhMain.showLoading.remove();
                            if (code == _SUCCESS) {
                                nhMain.showAlert(_SUCCESS, message);
                            } else {
                                nhMain.showAlert(_ERROR, message);
                            }
                        });
                    });
                });
            }
        },
        pointTomoney: {
            init: function() {
                var self = this;
                var formElement = $('form[nh-form="point-tomoney"]');
                if (formElement == null || formElement == _UNDEFINED || formElement.length == 0) {
                    return false;
                }
                self.modal = $('#point-tomoney-modal');
                var validator = formElement.validate({
                    ignore: ':hidden',
                    rules: {
                        bank_id: {
                            required: true
                        },
                        point: {
                            required: true
                        }
                    },
                    messages: {
                        bank_id: {
                            required: nhMain.getLabel('vui_long_chon_ngan_hang')
                        },
                        point: {
                            required: nhMain.getLabel('so_diem_khong_du_dieu_kien_de_rut')
                        }
                    },
                    errorPlacement: function(error, element) {
                        var group = element.closest('.input-group');
                        var bootstrap_select = element.closest('.bootstrap-select');
                        if (group.length) {
                            group.after(error.addClass('invalid-feedback'));
                        } else if (bootstrap_select.length) {
                            bootstrap_select.after(error.addClass('invalid-feedback'));
                        } else {
                            element.after(error.addClass('invalid-feedback'));
                        }
                    },
                    invalidHandler: function(event, validator) {
                        validator.errorList[0].element.focus();
                    },
                });
                formElement.on('keydown', 'input', function(e) {
                    if (e.keyCode == 13) {
                        formElement.find('[nh-btn-action="submit"]').trigger('click');
                        return false;
                    }
                });
                formElement.on('click', '[nh-btn-action="submit"]', function(e) {
                    e.preventDefault();
                    if (!validator.form()) return false;
                    nhMain.reCaptcha.check(function(token) {
                        var formData = formElement.serialize();
                        if (token != null) {
                            formData = formData + '&' + _TOKEN_RECAPTCHA + '=' + token;
                        }
                        nhMain.callAjax({
                            url: formElement.attr('action'),
                            data: formData
                        }).done(function(response) {
                            var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                            var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                            var status = typeof(response.status) != _UNDEFINED ? response.status : {};
                            if (code == _SUCCESS) {
                                nhMain.showAlert(_SUCCESS, message);
                                location.reload();
                            } else {
                                nhMain.showAlert(_ERROR, message);
                            }
                            self.modal.modal('hide');
                        });
                    });
                });
                $(document).on('click', '[nh-affiliate="point-tomoney"]', function(e) {
                    self.clearInputPointTomoney();
                    self.modal.modal('show');
                });
                $(document).on('keyup keypess keydown', '#point', function(e) {
                    var pointToMoney = $(this).attr('nh-point-money');
                    var pointMax = $(this).attr('nh-point-max');
                    var point = $(this).val().replace(',', '');
                    if (parseInt(pointMax) < parseInt(point)) {
                        point = pointMax;
                        $(this).val(pointMax);
                    }
                    var wrapElement = $(this).closest('.input-group');
                    var labelPointToMoney = wrapElement.find('.point-to-money');
                    labelPointToMoney.text(nhMain.utilities.parseNumberToTextMoney(pointToMoney * point));
                });
            },
            clearInputPointTomoney: function() {
                var self = this;
                self.modal.find('input').val('');
                var bankSelect = self.modal.find('select#bank_id');
                self.modal.find('.point-to-money').text(0);
                bankSelect.selectpicker('destroy');
                bankSelect.val('');
                bankSelect.selectpicker('render');
            }
        }
    }
}
$(document).ready(function() {
    nhMember.init();
});;
'use strict';
var nhContact = {
    init: function() {
        var self = this;
        if ($('form[nh-form-contact]').length == 0) {
            return false;
        }
        nhMain.validation.phoneVn();
        $.each($('form[nh-form-contact]'), function(index, contact) {
            var formElement = $(contact);
            var formCode = formElement.attr('nh-form-contact');
            if (formCode.length == 0) {
                return false;
            }
            var validator = formElement.validate({
                ignore: ":hidden",
                errorPlacement: function(error, element) {
                    var messageRequired = element.attr('message-required');
                    if (typeof(messageRequired) != _UNDEFINED && messageRequired.length > 0) {
                        error.text(messageRequired);
                    }
                    error.addClass('invalid-feedback')
                    var group = element.closest('.input-group');
                    if (group.length) {
                        group.after(error);
                    } else if (element.hasClass('select2-hidden-accessible')) {
                        element.closest('.form-group').append(error);
                    } else {
                        element.after(error);
                    }
                },
                invalidHandler: function(event, validator) {
                    validator.errorList[0].element.focus();
                },
            });
            formElement.on('keydown', 'input, textarea', function(e) {
                if (e.keyCode == 13) {
                    formElement.find('[nh-btn-action="submit"]').trigger('click');
                    return false;
                }
            });
            formElement.on('click', '[nh-btn-action="submit"]', function(e) {
                e.preventDefault();
                if (validator.form()) {
                    nhMain.showLoading.page();
                    nhMain.reCaptcha.check(function(token) {
                        var formData = formElement.serialize() + '&form_code=' + formCode;
                        if (token != null) {
                            formData = formData + '&' + _TOKEN_RECAPTCHA + '=' + token;
                        }
                        nhMain.callAjax({
                            url: formElement.attr('action'),
                            data: formData
                        }).done(function(response) {
                            nhMain.showLoading.remove();
                            var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                            var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                            var status = typeof(response.status) != _UNDEFINED ? response.status : {};
                            if (code == _SUCCESS) {
                                nhMain.showAlert(_SUCCESS, message);
                                location.reload();
                            } else {
                                nhMain.showAlert(_ERROR, message);
                            }
                        });
                    });
                }
            });
        });
    }
}
$(document).ready(function() {
    nhContact.init();
});;
'use strict';
var nhComment = {
    info: {
        full_name: null,
        email: null,
        phone: null,
        logged: false
    },
    config: {
        max_number_files: 10,
        expires_cookie: 10,
    },
    loginModal: null,
    infoModal: null,
    infoForm: null,
    init: function() {
        var self = this;
        self.loginModal = $('#login-modal');
        self.infoModal = $('#info-comment-modal');
        self.infoForm = self.infoModal.find('form#info-comment-form');
        if (self.infoModal.length == 0 || self.infoForm.length == 0) {
            nhMain.showLog(nhMain.getLabel('chuc_nang_binh_luan_thieu_dieu_kien_de_hoat_dong'));
            return false;
        }
        self.getInfo();
        self.event();
        self.comment.init();
        self.rating.init();
    },
    event: function() {
        var self = this;
        nhMain.validation.phoneVn();
        var validatorInfo = self.infoForm.validate({
            ignore: ':hidden',
            rules: {
                full_name: {
                    required: true,
                    minlength: 6,
                    maxlength: 255
                },
                email: {
                    required: true,
                    email: true,
                    minlength: 10,
                    maxlength: 255
                },
                phone: {
                    required: true,
                    phoneVN: true
                }
            },
            messages: {
                full_name: {
                    required: nhMain.getLabel('vui_long_nhap_thong_tin'),
                    minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan'),
                    maxlength: nhMain.getLabel('thong_tin_nhap_qua_dai')
                },
                email: {
                    required: nhMain.getLabel('vui_long_nhap_thong_tin'),
                    email: nhMain.getLabel('email_chua_dung_dinh_dang'),
                    minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan'),
                    maxlength: nhMain.getLabel('thong_tin_nhap_qua_dai')
                },
                phone: {
                    required: nhMain.getLabel('vui_long_nhap_thong_tin'),
                    phoneVN: nhMain.getLabel('so_dien_thoai_chua_chinh_xac')
                }
            },
            errorPlacement: function(error, element) {
                var group = element.closest('.input-group');
                if (group.length) {
                    group.after(error.addClass('invalid-feedback'));
                } else {
                    element.after(error.addClass('invalid-feedback'));
                }
            },
            invalidHandler: function(event, validator) {
                validatorInfo.errorList[0].element.focus();
            },
        });
        self.infoModal.on('click', '#btn-send-info', function(e) {
            e.preventDefault();
            if (validatorInfo.form()) {
                self.setInfo({
                    full_name: self.infoForm.find('input[name="full_name"]').val(),
                    email: self.infoForm.find('input[name="email"]').val(),
                    phone: self.infoForm.find('input[name="phone"]').val(),
                });
                self.infoModal.modal('hide');
                if (self.comment.triggerAdd) {
                    self.comment.addComment();
                }
                if (self.rating.triggerAdd) {
                    self.rating.addCommentRating();
                }
            }
        });
        self.infoModal.on('show.bs.modal', function(e) {
            self.infoModal.find('input[name="full_name"]').val(self.info.full_name);
            self.infoModal.find('input[name="email"]').val(self.info.email);
            self.infoModal.find('input[name="phone"]').val(self.info.phone);
        });
    },
    setInfo: function(data = {}) {
        var self = this;
        var full_name = nhMain.utilities.notEmpty(data.full_name) ? data.full_name : null;
        var email = nhMain.utilities.notEmpty(data.email) ? data.email : null;
        var phone = nhMain.utilities.notEmpty(data.phone) ? data.phone : null;
        $.cookie(_INFO_COMMENT, JSON.stringify({
            full_name: full_name,
            email: email,
            phone: phone
        }), {
            expires: self.config.expires_cookie
        });
        self.info.full_name = full_name;
        self.info.email = email;
        self.info.phone = phone;
        if (typeof(nhMain.dataInit.member) != _UNDEFINED && !$.isEmptyObject(nhMain.dataInit.member)) {
            self.info.logged = true;
        }
        self.comment.showInfo();
        self.rating.showInfo();
    },
    getInfo: function(config = {}) {
        var self = this;
        var loginRequired = typeof(config.login_required) != _UNDEFINED ? config.login_required : 0;
        var memberInfo = typeof(nhMain.dataInit.member) != _UNDEFINED && !$.isEmptyObject(nhMain.dataInit.member) ? nhMain.dataInit.member : {};
        if (loginRequired == 0) {
            var infoCookie = nhMain.utilities.notEmpty($.cookie(_INFO_COMMENT)) ? JSON.parse($.cookie(_INFO_COMMENT)) : {};
            self.info.full_name = typeof(infoCookie.full_name) != _UNDEFINED ? infoCookie.full_name : null;
            self.info.email = typeof(infoCookie.email) != _UNDEFINED ? infoCookie.email : null;
            self.info.phone = typeof(infoCookie.phone) != _UNDEFINED ? infoCookie.phone : null;
        }
        if (loginRequired > 0 || self.info.full_name == null) {
            self.info.full_name = typeof(memberInfo.full_name) != _UNDEFINED ? memberInfo.full_name : null;
            self.info.email = typeof(memberInfo.email) != _UNDEFINED ? memberInfo.email : null;
            self.info.phone = typeof(memberInfo.phone) != _UNDEFINED ? memberInfo.phone : null;
        }
        if (!$.isEmptyObject(memberInfo)) {
            self.info.logged = true;
        }
        return self.info;
    },
    convertFullNameToSpell: function(fullName = null) {
        var self = this;
        if (!nhMain.utilities.notEmpty(fullName)) return '';
        var str = fullName.toString().split(' ');
        var char = '';
        $.each(str, function(key, value) {
            char = char + '' + value.charAt(0);
        });
        return char.toUpperCase().substr(0, 3);
    },
    ajaxAddComment: function(data = {}, callback = null) {
        var self = this;
        if (typeof(callback) != 'function') {
            callback = function() {};
        }
        nhMain.showLoading.page();
        nhMain.callAjax({
            async: true,
            url: '/comment/add',
            data: {
                full_name: self.info.full_name,
                email: self.info.email,
                phone: self.info.phone,
                content: typeof(data.content) != _UNDEFINED ? data.content : null,
                images: typeof(data.images) != _UNDEFINED ? data.images : [],
                parent_id: typeof(data.parent_id) != _UNDEFINED ? data.parent_id : null,
                url: window.location.pathname,
                block_code: typeof(data.block_code) != _UNDEFINED ? data.block_code : null,
                type_comment: typeof(data.type_comment) != _UNDEFINED ? data.type_comment : null,
                rating: typeof(data.rating) != _UNDEFINED ? data.rating : null,
            },
        }).done(function(response) {
            callback(response);
            nhMain.showLoading.remove();
        });
    },
    ajaxLoadComment: function(params = {}, options = {}, callback = null) {
        var self = this;
        if (typeof(callback) != 'function') {
            callback = function() {};
        }
        if (typeof(options.show_loading) != _UNDEFINED && Boolean(options.show_loading)) {
            nhMain.showLoading.page();
        }
        if (typeof(params.url) == _UNDEFINED) {
            params.url = window.location.pathname;
        }
        nhMain.callAjax({
            async: true,
            url: '/comment/load',
            data: params,
        }).done(function(response) {
            callback(response);
            nhMain.showLoading.remove();
        });
    },
    ajaxUploadImage: function(formData = {}, callback = null) {
        var self = this;
        if (typeof(callback) != 'function') {
            callback = function() {};
        }
        nhMain.callAjax({
            async: true,
            url: '/comment/upload-image',
            data: formData,
            contentType: false,
            processData: false,
        }).done(function(response) {
            var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
            var message = typeof(response.message) != _UNDEFINED ? response.message : '';
            var data = typeof(response.data) != _UNDEFINED ? response.data : {};
            if (code == _ERROR) {
                nhMain.showAlert(_ERROR, message);
            }
            if (code == _SUCCESS && !$.isEmptyObject(data)) {
                callback(data);
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            nhMain.showLog(errorThrown);
        });
    },
    comment: {
        config: {},
        block_code: null,
        wrapElement: null,
        listElement: null,
        contentElement: null,
        listReplyElement: null,
        content: null,
        images: [],
        scrollHeightDefault: 0,
        template: {
            item: '\
    <li nh-comment-item="" is-parent="true" class="comment-item">\
     <div class="post-author">\
      <span class="letter-first"></span>\
      <span class="name-author"></span>\
     </div>\
     <div class="comment-content">\
      <div class="inner-content"></div>\
      <div class="comment-action">\
       <div class="inner-like">\
        <i class="iconsax isax-like-1"></i>\
        <span class="number-like"></span> ' +
                nhMain.getLabel('thich') + '</div>\
       <div class="inner-reply">\
        <span class="number-reply"></span> ' +
                nhMain.getLabel('tra_loi') + '</div> \
       <div class="post-date"></div>\
      </div>\
     </div>\
    </li>',
            itemReply: '\
    <li nh-comment-item="" class="reply">\
     <div class="post-author">\
      <span class="letter-first"></span>\
      <span class="name-author"></span>\
     </div>\
     <div class="comment-content">\
      <div class="inner-content"></div>\
      <div class="comment-action">\
       <div class="inner-like">\
        <i class="iconsax isax-like-1"></i>\
        <span class="number-like"></span> ' +
                nhMain.getLabel('thich') + '</div>\
       <div class="inner-reply">' +
                nhMain.getLabel('tra_loi') + '</div> \
       <div class="post-date"></div>\
      </div>\
     </div>\
    </li>',
            wrapReply: '<ul class="list-reply"></ul>',
            inputContent: '\
    <div class="edit-comment">\
     <textarea nh-input-comment placeholder="' + nhMain.getLabel('moi_ban_de_lai_binh_luan') + '"></textarea>\
     <div class="box-comment">\
      <label>\
       <i nh-trigger-upload class="iconsax isax-camera"></i>\
      </label>\
      <input nh-input-comment-images name="files[]" type="file" class="d-none" accept="image/gif, image/jpeg, image/png" multiple="multiple">\
     </div>\
     <ul class="comment-images"></ul>\
     <span nh-btn-send-comment class="btn rounded-0 btn-dark">' +
                nhMain.getLabel('gui_binh_luan') + '</span>\
    </div>',
            moreItem: '<a nh-comment-more="" class="comment-more" href="javascript:;">' + nhMain.getLabel('xem_them_thao_luan') + '</a>',
            wrapListImageSelect: '<ul class="comment-images"></ul>',
            imageSelect: '\
    <li nh-item-comment-image class="loading">\
     <img class="img-comment" src="">\
     <i class="close-image">x</i>\
    </li>',
        },
        triggerAdd: false,
        init: function() {
            var self = this;
            if ($('[nh-comment]').length == 0) {
                return false;
            }
            self.wrapElement = $('[nh-comment]');
            var configBlock = nhMain.utilities.parseJsonToObject(self.wrapElement.attr('nh-comment'));
            if ($.isEmptyObject(configBlock)) {
                nhMain.showLog(nhMain.getLabel('chuc_nang_binh_luan_thieu_dieu_kien_de_hoat_dong'));
                return false;
            }
            $.extend(self.config, configBlock);
            var wrapBlock = self.wrapElement.closest('[nh-block]');
            if (wrapBlock.length > 0 && wrapBlock.attr('nh-block').length > 0) {
                self.block_code = wrapBlock.attr('nh-block');
            }
            var loginRequired = typeof(self.config.login_required) != _UNDEFINED ? self.config.login_required : 0;
            if (loginRequired == 1 && nhComment.loginModal.length == 0) {
                nhMain.showLog(nhMain.getLabel('chuc_nang_binh_luan_thieu_dieu_kien_de_hoat_dong'));
                return false;
            }
            self.listElement = self.wrapElement.find('[nh-list-comment]');
            if (self.listElement.length == 0) {
                nhMain.showLog(nhMain.getLabel('chuc_nang_binh_luan_thieu_dieu_kien_de_hoat_dong'));
                return false;
            }
            self.showInfo();
            self.contentElement = self.wrapElement.find('[nh-input-comment]');
            if (self.contentElement.length > 0) {
                self.initInputContent(self.contentElement);
            }
            self.event();
            self.loadComment({
                show_loading: false
            });
        },
        initInputContent: function(input = null) {
            var self = this;
            if (typeof(input) == _UNDEFINED || input == null || input.length == 0) return false;
            self.scrollHeightDefault = input[0].scrollHeight;
            input[0].setAttribute('style', 'height:' + self.scrollHeightDefault + 'px; overflow-y:hidden;');
            input.on('input', function() {
                this.style.height = 'auto';
                this.style.height = this.scrollHeight + 'px';
            });
        },
        event: function() {
            var self = this;
            self.wrapElement.on('click', '[nh-btn-send-comment]', function(e) {
                self.contentElement = $(this).closest('.edit-comment').find('[nh-input-comment]');
                self.addComment();
            });
            self.wrapElement.on('click', '[nh-comment-change-info]', function(e) {
                if (self.logged) {
                    window.location.href = '/member/dashboard';
                } else {
                    nhComment.infoModal.modal('show');
                }
            });
            self.wrapElement.on('click', '.inner-reply', function(e) {
                var commentItem = $(this).closest('li[nh-comment-item][is-parent]');
                if (commentItem.length == 0) return false;
                var commentId = commentItem.attr('nh-comment-item');
                if (!nhMain.utilities.notEmpty(commentId)) return false;
                var numberReply = $(this).find('.number-reply').text();
                var loadReply = false;
                if (nhMain.utilities.notEmpty(numberReply) && commentItem.find('.list-reply').length == 0) {
                    loadReply = true;
                    commentItem.append(self.template.wrapReply);
                }
                if (commentItem.find('.edit-comment').length == 0) {
                    commentItem.append(self.template.inputContent);
                    self.contentElement = commentItem.find('[nh-input-comment]');
                    self.initInputContent(self.contentElement);
                }
                self.contentElement = commentItem.find('[nh-input-comment]');
                self.contentElement.focus();
                if (loadReply) {
                    self.loadComment({
                        parent_id: commentId
                    });
                }
            });
            self.wrapElement.on('click', '.inner-like', function(e) {
                var commentId = $(this).closest('li[nh-comment-item]').attr('nh-comment-item');
                var btnLike = $(this);
                self.likeComment(commentId, function(response) {
                    var numberLike = typeof(response.number_like) != _UNDEFINED ? response.number_like : '';
                    btnLike.find('.number-like').text(numberLike);
                    btnLike.toggleClass('liked', response.type == 'like' ? true : false);
                });
            });
            self.wrapElement.on('click', '[nh-comment-more]', function(e) {
                var commentItem = $(this).closest('li.comment-item');
                var page = $(this).attr('nh-comment-more');
                if (!page > 0) return;
                var commentId = commentItem.length > 0 ? commentItem.attr('nh-comment-item') : null;
                self.loadComment({
                    parent_id: commentId,
                    page: page
                });
            });
            self.wrapElement.on('click', '[nh-trigger-upload]', function(e) {
                var boxComment = $(this).closest('.box-comment');
                if (boxComment.length == 0) return;
                boxComment.find('input[nh-input-comment-images]').trigger('click');
            });
            self.wrapElement.on('change', '[nh-input-comment-images]', function(e) {
                self.showImagesSelect(this);
            });
            self.wrapElement.on('click', '.comment-images .close-image', function(e) {
                $(this).closest('li').remove();
            });
        },
        addComment: function() {
            var self = this;
            nhComment.getInfo(self.config);
            var loginRequired = typeof(self.config.login_required) != _UNDEFINED ? self.config.login_required : 0;
            self.content = $.trim(self.contentElement.val());
            self.images = [];
            if (self.content.length == 0) {
                nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_nhap_noi_dung_binh_luan'));
                self.contentElement.focus();
                return false;
            }
            var itemComment = self.contentElement.closest('li[nh-comment-item]');
            var parent_id = itemComment.length > 0 ? itemComment.attr('nh-comment-item') : null;
            if (loginRequired == 1 && !nhComment.info.logged) {
                nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_dang_nhap_tai_khoan_de_su_dung_chuc_nang_nay'), function() {
                    nhComment.loginModal.modal('show');
                    nhComment.loginModal.find('input[name="redirect"]').val(window.location.href);
                });
                return false;
            }
            if (loginRequired == 0 && !nhMain.utilities.notEmpty(nhComment.info.full_name)) {
                self.triggerAdd = true;
                nhComment.infoModal.modal('show');
                return false;
            }
            var wrapInput = self.contentElement.closest('.edit-comment');
            wrapInput.find('li[nh-item-comment-image]').each(function(index) {
                if ($(this).hasClass('loading')) {
                    nhMain.showAlert(_SUCCESS, nhMain.getLabel('vui_long_cho_he_thong_dang_tai_anh_binh_luan'));
                    return false;
                }
                if ($(this).find('img.img-comment').length > 0) {
                    self.images.push($(this).find('img.img-comment').attr('src'));
                }
            });
            var data = {
                content: self.content,
                parent_id: parent_id,
                type_comment: _COMMENT,
                rating: self.rating,
                images: self.images,
                block_code: self.block_code
            }
            nhComment.ajaxAddComment(data, function(response) {
                var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                if (code == _ERROR) {
                    var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                    nhMain.showAlert(_ERROR, message);
                }
                if (code == _SUCCESS) {
                    if (self.config.awaiting_approval > 0) {
                        nhMain.showAlert(_SUCCESS, nhMain.getLabel('cam_on_ban_da_gui_binh_luan_cho_chung_toi_quan_tri_vien_se_xet_duyet_binh_luan_cua_ban_truoc_khi_dang_tai'));
                    } else {
                        var wrapList = null;
                        if (itemComment.length > 0) {
                            var numberReply = itemComment.find('.number-reply:first').text();
                            if ($.isNumeric(numberReply)) {
                                numberReply++;
                            } else {
                                numberReply = 1;
                            }
                            itemComment.find('.number-reply:first').text(numberReply);
                            if (itemComment.find('.list-reply').length == 0) {
                                itemComment.find('.edit-comment').before(self.template.wrapReply);
                            }
                            wrapList = itemComment.find('.list-reply');
                        }
                        var data = typeof(response.data) != _UNDEFINED ? response.data : '';
                        self.appendComment(data, wrapList, {
                            load_first: parent_id > 0 ? false : true
                        });
                    }
                    self.clearBoxComment();
                }
            });
        },
        likeComment: function(commentId = null, callback = null) {
            var self = this;
            if (typeof(callback) != 'function') {
                callback = function() {};
            }
            if (!commentId > 0) {
                nhMain.showLog(nhMain.getLabel('khong_lay_duoc_ID_binh_luan'));
                return false;
            }
            var loginRequired = typeof(self.config.login_required) != _UNDEFINED ? self.config.login_required : 0;
            if (loginRequired == 1 && !nhComment.info.logged) {
                nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_dang_nhap_tai_khoan_de_su_dung_chuc_nang_nay'));
                nhComment.loginModal.modal('show');
                nhComment.loginModal.find('input[name="redirect"]').val(window.location.href);
                return false;
            }
            if (typeof($.cookie(_LIKE_COMMENT)) == _UNDEFINED) {
                $.cookie(_LIKE_COMMENT, JSON.stringify([]), {
                    expires: self.config.expires_cookie
                });
            }
            var type = null;
            if ($.inArray(parseInt(commentId), JSON.parse($.cookie(_LIKE_COMMENT))) == -1) {
                type = _LIKE;
            } else {
                type = _DISLIKE;
            }
            nhMain.callAjax({
                async: false,
                url: '/comment/like',
                data: {
                    comment_id: commentId,
                    type: type
                },
            }).done(function(response) {
                var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                var data = typeof(response.data) != _UNDEFINED ? response.data : '';
                var id = typeof(data.id) != _UNDEFINED ? data.id : null;
                var type = typeof(data.type) != _UNDEFINED ? data.type : null;
                if (code == _ERROR) {
                    nhMain.showAlert(_ERROR, message);
                }
                if (code == _SUCCESS) {
                    if (id > 0) {
                        var listLiked = JSON.parse($.cookie(_LIKE_COMMENT));
                        if (type == _DISLIKE) {
                            listLiked.splice($.inArray(id, listLiked), 1);
                        } else {
                            listLiked.push(id);
                        }
                        $.cookie(_LIKE_COMMENT, JSON.stringify(listLiked), {
                            expires: self.config.expires_cookie
                        });
                    }
                    callback(data);
                }
            });
        },
        loadComment: function(params = {}) {
            var self = this;
            var parent_id = typeof(params.parent_id) != _UNDEFINED ? parseInt(params.parent_id) : null;
            nhComment.ajaxLoadComment({
                parent_id: parent_id,
                page: typeof(params.page) != _UNDEFINED ? params.page : null,
                type_comment: _COMMENT,
                number_record: typeof(self.config.number_record) != _UNDEFINED ? self.config.number_record : null,
                sort_field: typeof(self.config.sort_field) != _UNDEFINED ? self.config.sort_field : null,
                sort_type: typeof(self.config.sort_type) != _UNDEFINED ? self.config.sort_type : null,
            }, {
                show_loading: typeof(params.show_loading) != _UNDEFINED ? Boolean(params.show_loading) : true
            }, function(response) {
                var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                if (code == _ERROR) {
                    var message = typeof(response.message) != _UNDEFINED ? response.message : null;
                    nhMain.showLog(message);
                }
                if (code == _SUCCESS && nhMain.utilities.notEmpty(data.comments)) {
                    var wrapReplyElement = null;
                    if (parent_id > 0) {
                        wrapReplyElement = self.wrapElement.find('li[nh-comment-item="' + parent_id + '"]').find('.list-reply');
                    }
                    var comments = typeof(data.comments) != _UNDEFINED ? data.comments : [];
                    $.each(comments, function(index, comment) {
                        self.appendComment(comment, wrapReplyElement);
                    });
                    var pagination = typeof(data[_PAGINATION]) != _UNDEFINED ? data[_PAGINATION] : [];
                    var total = typeof(pagination.total) ? parseInt(pagination.total) : 0;
                    var page = typeof(pagination.page) ? parseInt(pagination.page) : 0;
                    var pages = typeof(pagination.pages) ? parseInt(pagination.pages) : 0;
                    if (page < pages) {
                        if (parent_id > 0) {
                            var replyRatingElement = self.wrapElement.find('li[nh-comment-item="' + parent_id + '"]');
                            if (replyRatingElement.length > 0 && replyRatingElement.find('[nh-comment-more]').length == 0) {
                                replyRatingElement.find('.child-reply').after(self.template.moreItem);
                            }
                            replyRatingElement.find('[nh-comment-more]').attr('nh-comment-more', page + 1);
                        } else {
                            if (self.wrapElement.find('> [nh-comment-more]').length == 0) {
                                self.listElement.after(self.template.moreItem);
                            }
                            self.wrapElement.find('> [nh-comment-more]').attr('nh-comment-more', page + 1);
                        }
                    } else {
                        self.wrapElement.find('[nh-comment-more]').remove();
                    }
                    self.wrapElement.find('[nh-total-comment]').text(nhMain.utilities.parseNumberToTextMoney(total));
                }
            });
        },
        appendComment: function(comment = {}, wrapReplyElement = null, params = {}) {
            var self = this;
            var loadFirst = typeof(params.load_first) != _UNDEFINED ? Boolean(params.load_first) : false;
            var wrapElement = null;
            var htmlItem = null;
            var appendItem = null;
            if (!nhMain.utilities.notEmpty(wrapReplyElement)) {
                wrapElement = self.listElement;
                htmlItem = self.template.item;
            } else {
                wrapElement = wrapReplyElement;
                htmlItem = self.template.itemReply;
            }
            if (loadFirst) {
                wrapElement.prepend(htmlItem);
                appendItem = wrapElement.find('li[nh-comment-item]:first-child');
            } else {
                wrapElement.append(htmlItem);
                appendItem = wrapElement.find('li[nh-comment-item]:last-child');
            }
            if (appendItem.length == 0) return;
            var commentId = typeof(comment.id) != _UNDEFINED ? parseInt(comment.id) : null;
            var fullName = typeof(comment.full_name) != _UNDEFINED ? comment.full_name : '';
            var content = typeof(comment.content) != _UNDEFINED ? comment.content : '';
            var time = typeof(comment.time) != _UNDEFINED ? comment.time : '';
            var fullTime = typeof(comment.full_time) != _UNDEFINED ? comment.full_time : '';
            var numberReply = typeof(comment.number_reply) != _UNDEFINED ? comment.number_reply : null;
            var numberLike = typeof(comment.number_like) != _UNDEFINED ? comment.number_like : null;
            var images = typeof(comment.images) != _UNDEFINED ? comment.images : [];
            var isAdmin = typeof(comment.is_admin) != _UNDEFINED ? parseInt(comment.is_admin) : 0;
            if (!nhMain.utilities.notEmpty(fullName) || !nhMain.utilities.notEmpty(content)) return;
            var letterFirst = fullName.slice(0, 1);
            appendItem.attr('nh-comment-item', commentId);
            appendItem.find('.post-author .name-author').text(fullName);
            appendItem.find('.post-author .letter-first').text(letterFirst);
            appendItem.find('.comment-content .inner-content').html(content.replace(/\n/g, '<br />'));
            appendItem.find('.comment-content .post-date').text(time);
            appendItem.find('.comment-content .number-reply').text(numberReply);
            appendItem.find('.comment-content .number-like').text(numberLike);
            if (isAdmin) {
                appendItem.find('.post-author').append('<span class="is-admin">' + nhMain.getLabel('quan_tri_vien') + '</span>')
            }
            if (images.length > 0) {
                appendItem.find('.comment-content .inner-content').after('<div class="album-images"></div>');
                var wrapAlbum = appendItem.find('.album-images');
                $.each(images, function(index, image) {
                    var thumb = nhMain.utilities.getThumbImage(image);
                    wrapAlbum.append('<a href="' + nhMain.cdnUrl + image + '"><img class="image-comment" src="' + nhMain.cdnUrl + thumb + '" ></a>');
                });
                wrapAlbum.lightGallery({});
            }
            var loginRequired = typeof(self.config.login_required) != _UNDEFINED ? self.config.login_required : 0;
            if (loginRequired == 0) {
                var listLiked = typeof($.cookie(_LIKE_COMMENT)) != _UNDEFINED ? JSON.parse($.cookie(_LIKE_COMMENT)) : [];
                if ($.inArray(commentId, listLiked) > -1) {
                    appendItem.find('.inner-like').addClass('liked');
                }
            }
        },
        showImagesSelect: function(input = null) {
            var self = this;
            if (input == null || typeof(input.files) == _UNDEFINED) {
                return false;
            }
            var wrapComment = $(input).closest('.edit-comment');
            var boxComment = wrapComment.find('.box-comment');
            if (wrapComment.length == 0 || boxComment.length == 0) {
                return false;
            }
            var wrapAlbum = wrapComment.find('.comment-images');
            if (wrapAlbum.length == 0) {
                boxComment.after(self.template.wrapListImageSelect);
                wrapAlbum = wrapComment.find('.comment-images');
            }
            wrapAlbum.html('');
            $.each(input.files, function(index, file) {
                if (index >= nhComment.config.max_number_files) return;
                var fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = function(e) {
                    self.appendImageSelect(fileReader.result, input);
                }
            });
            $.each(input.files, function(index, file) {
                if (index >= nhComment.config.max_number_files) return;
                var formData = new FormData();
                formData.append('file', file);
                formData.append('path', _COMMENT);
                nhComment.ajaxUploadImage(formData, function(data) {
                    var urlImage = typeof(data.url) != _UNDEFINED ? data.url : null;
                    var liElement = wrapAlbum.find('li:eq(' + index + ')');
                    if (liElement.length > 0) {
                        liElement.removeClass('loading');
                        liElement.find('img.img-comment').attr('src', nhMain.cdnUrl + urlImage);
                    }
                });
            });
        },
        appendImageSelect: function(urlImage = null, input = null, params = {}) {
            var self = this;
            var wrapAlbum = $(input).closest('.edit-comment').find('.comment-images');
            if (wrapAlbum.length == 0) {
                return false;
            }
            if (urlImage == null || typeof(urlImage) == _UNDEFINED || urlImage.length == 0) {
                return false;
            }
            wrapAlbum.append(self.template.imageSelect);
            wrapAlbum.find('li:last-child img.img-comment').attr('src', urlImage);
            wrapAlbum.removeClass('d-none');
            if (typeof(params.uploaded) != _UNDEFINED && params.uploaded > 0) {
                wrapAlbum.find('li:last-child').removeClass('loading');
            }
        },
        clearBoxComment: function() {
            var self = this;
            var wrap = self.contentElement.closest('.edit-comment');
            if (wrap.length == 0) {
                return false;
            }
            self.contentElement.val('');
            self.contentElement.css('height', self.scrollHeightDefault + 'px')
            wrap.find('.comment-images').remove();
        },
        showInfo: function() {
            var self = this;
            nhComment.getInfo(self.config);
            if (!nhMain.utilities.notEmpty(nhComment.info.full_name)) return false;
            self.wrapElement.find('[nh-comment-fullname]').text(nhComment.info.full_name);
            self.wrapElement.find('[nh-comment-info]').removeClass('d-none');
        }
    },
    rating: {
        config: {},
        block_code: null,
        content: null,
        rating: null,
        triggerAdd: false,
        wrapElement: null,
        listElement: null,
        formRating: null,
        contentElement: null,
        ratingItem: null,
        template: {
            item: '\
    <li nh-rating-item="" is-parent="true" class="item">\
     <div class="box-rating">\
      <div class="author-info">\
       <span class="letter-first"></span>\
       <div>\
        <span class="post-author"></span>\
        <br />\
        <span class="post-date"></span>\
       </div>\
      </div>\
      <div class="rating-content">\
                   <div class="star-rating">\
                       <span style="width:100%"></span>\
                   </div>\
       <div class="description"></div>\
       <div class="btn-action">\
        <div class="inner-reply">\
         <i class="iconsax isax-message-text"></i>\
         <span class="number-reply"></span> ' + nhMain.getLabel('tra_loi') + '\
        </div> \
       </div>\
      </div>\
     </div>\
    </li>',
            itemReply: '\
    <li nh-rating-item="" class="item">\
     <div class="author-info">\
      <div class="meta">\
       <span class="post-author"></span> - \
       <span class="post-date"></span>\
      </div>\
     </div>\
     <div class="rating-content">\
      <div class="description"></div>\
     </div>\
    </li>',
            moreItem: '<a nh-comment-more="" class="comment-more" href="javascript:;">' + nhMain.getLabel('xem_them_danh_gia') + '</a>',
            formRating: '',
            inputReplyRating: '\
    <div class="rating-form">\
        <div class="form-group">\
      <textarea nh-input-rating placeholder="' + nhMain.getLabel('nhan_xet_cua_ban_ve_san_pham_nay') + '"></textarea>\
     </div>\
     <div>\
            <span nh-btn-reply-rating class="btn btn-dark rounded-0">' + nhMain.getLabel('gui_danh_gia') + '</span>\
     </div>\
    </div>',
            wrapReply: '<ul class="child-reply"></ul>',
            imageSelect: '\
    <li nh-item-rating-image class="loading">\
     <img class="img-comment" src="">\
     <i class="close-image">x</i>\
    </li>'
        },
        init: function() {
            var self = this;
            self.wrapElement = $('[nh-rating]');
            self.formRating = $('form[nh-form-rating]');
            self.listElement = self.wrapElement.find('[nh-list-rating]');
            self.contentElement = self.formRating.find('textarea[nh-input-rating]');
            if (self.wrapElement.length == 0) return false;
            var configBlock = nhMain.utilities.parseJsonToObject(self.wrapElement.attr('nh-rating'));
            if ($.isEmptyObject(configBlock)) {
                nhMain.showLog(nhMain.getLabel('chuc_nang_danh_gia_thieu_dieu_kien_de_hoat_dong'));
                return false;
            }
            $.extend(self.config, configBlock);
            var loginRequired = typeof(self.config.login_required) != _UNDEFINED ? self.config.login_required : 0;
            if (loginRequired == 1 && nhComment.loginModal.length == 0) {
                nhMain.showLog(nhMain.getLabel('chuc_nang_danh_gia_thieu_dieu_kien_de_hoat_dong'));
                return false;
            }
            if (self.listElement.length == 0) {
                nhMain.showLog(nhMain.getLabel('chuc_nang_danh_gia_thieu_dieu_kien_de_hoat_dong'));
                return false;
            }
            var wrapBlock = self.wrapElement.closest('[nh-block]');
            if (wrapBlock.length > 0 && wrapBlock.attr('nh-block').length > 0) {
                self.block_code = wrapBlock.attr('nh-block');
            }
            self.showInfo();
            self.event();
            self.loadCommentRating({
                show_loading: false
            });
        },
        event: function() {
            var self = this;
            nhMain.validation.phoneVn();
            var validatorRating = self.formRating.validate({
                ignore: ':hidden',
                rules: {
                    full_name: {
                        required: true,
                        minlength: 6,
                        maxlength: 255
                    },
                    email: {
                        required: true,
                        email: true,
                        minlength: 10,
                        maxlength: 255
                    },
                    phone: {
                        required: true,
                        phoneVN: true
                    },
                    content: {
                        required: true,
                        minlength: 20,
                        maxlength: 1000
                    }
                },
                messages: {
                    full_name: {
                        required: nhMain.getLabel('vui_long_nhap_thong_tin'),
                        minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan'),
                        maxlength: nhMain.getLabel('thong_tin_nhap_qua_dai')
                    },
                    email: {
                        required: nhMain.getLabel('vui_long_nhap_thong_tin'),
                        email: nhMain.getLabel('email_chua_dung_dinh_dang'),
                        minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan'),
                        maxlength: nhMain.getLabel('thong_tin_nhap_qua_dai')
                    },
                    phone: {
                        required: nhMain.getLabel('vui_long_nhap_thong_tin'),
                        phoneVN: nhMain.getLabel('so_dien_thoai_chua_chinh_xac')
                    },
                    content: {
                        required: nhMain.getLabel('vui_long_nhap_thong_tin'),
                        minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan'),
                        maxlength: nhMain.getLabel('thong_tin_nhap_qua_dai')
                    }
                },
                errorPlacement: function(error, element) {
                    var group = element.closest('.input-group');
                    if (group.length) {
                        group.after(error.addClass('invalid-feedback'));
                    } else {
                        element.after(error.addClass('invalid-feedback'));
                    }
                },
                invalidHandler: function(event, validator) {
                    validatorRating.errorList[0].element.focus();
                },
            });
            self.wrapElement.on('click', '[nh-btn-send-rating]', function(e) {
                e.preventDefault();
                if (validatorRating.form()) {
                    self.ratingItem = null;
                    self.contentElement = self.formRating.find('textarea[nh-input-rating]');
                    nhComment.setInfo({
                        full_name: self.formRating.find('input[name="full_name"]').val(),
                        email: self.formRating.find('input[name="email"]').val(),
                        phone: self.formRating.find('input[name="phone"]').val(),
                        full_name: self.formRating.find('input[name="full_name"]').val(),
                    });
                    self.addCommentRating();
                }
            });
            self.wrapElement.on('click', '[nh-btn-reply-rating]', function(e) {
                e.preventDefault();
                self.ratingItem = $(this).closest('li[nh-rating-item]');
                if (self.ratingItem.length == 0) return false;
                self.contentElement = self.ratingItem.find('textarea[nh-input-rating]');
                if (self.contentElement.length == 0) return false;
                self.addCommentRating();
            });
            self.wrapElement.on('click', '.inner-reply', function(e) {
                self.ratingItem = $(this).closest('li[nh-rating-item][is-parent]');
                if (self.ratingItem.length == 0) return false;
                var ratingId = self.ratingItem.attr('nh-rating-item');
                if (!nhMain.utilities.notEmpty(ratingId)) return false;
                if (self.ratingItem.find('.entry-reply').length == 0) {
                    self.ratingItem.find('.rating-content').append('<div class="entry-reply"></div>');
                }
                var replyWrap = self.ratingItem.find('.entry-reply');
                var numberReply = $(this).find('.number-reply').text();
                var loadReply = false;
                if (nhMain.utilities.notEmpty(numberReply) && replyWrap.find('.child-reply').length == 0) {
                    loadReply = true;
                    replyWrap.prepend(self.template.wrapReply);
                }
                if (replyWrap.find('.rating-form').length == 0) {
                    replyWrap.append(self.template.inputReplyRating);
                }
                self.contentElement = self.ratingItem.find('[nh-input-rating]');
                self.contentElement.focus();
                if (loadReply) {
                    self.loadCommentRating({
                        parent_id: ratingId
                    });
                }
            });
            self.wrapElement.on('click', '[nh-comment-more]', function(e) {
                e.preventDefault();
                self.ratingItem = $(this).closest('li[nh-rating-item]');
                var page = $(this).attr('nh-comment-more');
                if (!page > 0) return;
                var commentId = self.ratingItem.length > 0 ? self.ratingItem.attr('nh-rating-item') : null;
                self.loadCommentRating({
                    parent_id: commentId,
                    page: page
                });
            });
            self.wrapElement.on('click', '[nh-btn-show-rating]', function(e) {
                var listRating = !$.isEmptyObject($.cookie(_RATING_LIST)) ? JSON.parse($.cookie(_RATING_LIST)) : [];
                if ($.inArray(window.location.pathname, listRating) > -1) {
                    nhMain.showAlert(_SUCCESS, nhMain.getLabel('ban_da_danh_gia_san_pham_nay_roi'));
                    return false
                };
                self.formRating.collapse('toggle');
            });
            self.wrapElement.on('click', '[nh-trigger-upload]', function(e) {
                self.formRating.find('input[nh-input-rating-images]').trigger('click');
            });
            self.wrapElement.on('change', '[nh-input-rating-images]', function(e) {
                self.showImagesRating(this);
            });
            self.wrapElement.on('change', '[nh-review-star] input[type="radio"]', function(e) {
                var star = nhMain.utilities.parseInt($(this).val());
                if (star > 5) star = 0;
                self.rating = star;
            });
            self.wrapElement.on('click', '.comment-images .close-image', function(e) {
                $(this).closest('li').remove();
            });
        },
        addCommentRating: function() {
            var self = this;
            nhComment.getInfo();
            self.content = $.trim(self.contentElement.val());
            self.images = [];
            if (self.content.length == 0) {
                nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_nhap_noi_dung_binh_luan'));
                self.contentElement.focus();
                return false;
            }
            var loginRequired = typeof(self.config.login_required) != _UNDEFINED ? self.config.login_required : 0;
            if (loginRequired == 1 && !nhComment.info.logged) {
                nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_dang_nhap_tai_khoan_de_su_dung_chuc_nang_nay'), function() {
                    nhComment.loginModal.modal('show');
                    nhComment.loginModal.find('input[name="redirect"]').val(window.location.href);
                });
                return false;
            }
            if (loginRequired == 0 && !nhMain.utilities.notEmpty(nhComment.info.full_name)) {
                self.triggerAdd = true;
                nhComment.infoModal.modal('show');
                return false;
            }
            var parent_id = null;
            if (self.contentElement.closest('li[nh-rating-item]').length > 0) {
                var parent_id = self.contentElement.closest('li[nh-rating-item]').attr('nh-rating-item');
            }
            if (parent_id != null) {
                self.rating = null;
            }
            self.formRating.find('li[nh-item-rating-image]').each(function(index) {
                if ($(this).hasClass('loading')) {
                    nhMain.showAlert(_SUCCESS, nhMain.getLabel('vui_long_cho_he_thong_dang_tai_anh_binh_luan'));
                    return false;
                }
                if ($(this).find('img.img-comment').length > 0) {
                    self.images.push($(this).find('img.img-comment').attr('src'));
                }
            });
            var data = {
                content: self.content,
                parent_id: parent_id,
                type_comment: _RATING,
                rating: self.rating,
                images: self.images,
                block_code: self.block_code
            }
            nhComment.ajaxAddComment(data, function(response) {
                var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                if (code == _ERROR) {
                    var message = typeof(response.message) != _UNDEFINED ? response.message : '';
                    nhMain.showAlert(_ERROR, message);
                }
                if (code == _SUCCESS) {
                    if (self.config.awaiting_approval > 0) {
                        nhMain.showAlert(_SUCCESS, nhMain.getLabel('cam_on_ban_da_gui_binh_luan_cho_chung_toi_quan_tri_vien_se_xet_duyet_binh_luan_cua_ban_truoc_khi_dang_tai'));
                    } else {
                        var wrapList = null;
                        if (nhMain.utilities.notEmpty(self.ratingItem)) {
                            var numberReply = self.ratingItem.find('.number-reply:first').text();
                            if ($.isNumeric(numberReply)) {
                                numberReply++;
                            } else {
                                numberReply = 1;
                            }
                            self.ratingItem.find('.number-reply:first').text(numberReply);
                            if (self.ratingItem.find('.child-reply').length == 0) {
                                self.ratingItem.find('.rating-form').before(self.template.wrapReply);
                            }
                            var wrapList = self.ratingItem.find('.child-reply');
                        }
                        var data = typeof(response.data) != _UNDEFINED ? response.data : '';
                        self.appendCommentRating(data, wrapList, {
                            load_first: parent_id > 0 ? false : true
                        });
                    }
                    if (!parent_id > 0) {
                        var listRating = nhMain.utilities.notEmpty($.cookie(_RATING_LIST)) ? JSON.parse($.cookie(_RATING_LIST)) : [];
                        if ($.inArray(window.location.pathname, listRating) == -1) {
                            listRating.push(window.location.pathname);
                            $.cookie(_RATING_LIST, JSON.stringify(listRating), {
                                expires: self.config.expires_cookie
                            });
                        }
                    }
                    self.clearBoxRating();
                }
            });
        },
        loadCommentRating: function(params = {}) {
            var self = this;
            var parent_id = typeof(params.parent_id) != _UNDEFINED ? params.parent_id : null;
            nhComment.ajaxLoadComment({
                parent_id: parent_id,
                page: typeof(params.page) != _UNDEFINED ? params.page : null,
                type_comment: _RATING,
                number_record: typeof(self.config.number_record) != _UNDEFINED ? self.config.number_record : null,
                sort_field: typeof(self.config.sort_field) != _UNDEFINED ? self.config.sort_field : null,
                sort_type: typeof(self.config.sort_type) != _UNDEFINED ? self.config.sort_type : null,
            }, {
                show_loading: typeof(params.show_loading) != _UNDEFINED ? Boolean(params.show_loading) : true
            }, function(response) {
                var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
                var data = typeof(response.data) != _UNDEFINED ? response.data : {};
                if (code == _ERROR) {
                    var message = typeof(response.message) != _UNDEFINED ? response.message : null;
                    nhMain.showLog(message);
                }
                if (code == _SUCCESS && nhMain.utilities.notEmpty(data.comments)) {
                    var wrapReplyElement = null;
                    if (parent_id > 0) {
                        wrapReplyElement = self.wrapElement.find('li[nh-rating-item="' + parent_id + '"]').find('.child-reply');
                    }
                    var comments = typeof(data.comments) != _UNDEFINED ? data.comments : [];
                    $.each(comments, function(index, comment) {
                        self.appendCommentRating(comment, wrapReplyElement);
                    });
                    var pagination = typeof(data[_PAGINATION]) != _UNDEFINED ? data[_PAGINATION] : [];
                    var page = typeof(pagination.page) ? parseInt(pagination.page) : 0;
                    var pages = typeof(pagination.pages) ? parseInt(pagination.pages) : 0;
                    if (page < pages) {
                        if (parent_id > 0) {
                            var replyRatingElement = self.wrapElement.find('li[nh-rating-item="' + parent_id + '"]');
                            if (replyRatingElement.length > 0 && replyRatingElement.find('[nh-comment-more]').length == 0) {
                                replyRatingElement.find('.child-reply').after(self.template.moreItem);
                            }
                            replyRatingElement.find('[nh-comment-more]').attr('nh-comment-more', page + 1);
                        } else {
                            if (self.wrapElement.find('> [nh-comment-more]').length == 0) {
                                self.listElement.after(self.template.moreItem);
                            }
                            self.wrapElement.find('> [nh-comment-more]').attr('nh-comment-more', page + 1);
                        }
                    } else {
                        self.wrapElement.find('[nh-comment-more]').remove();
                    }
                }
            });
        },
        appendCommentRating: function(comment = {}, wrapReplyElement = null, params = {}) {
            var self = this;
            var loadFirst = typeof(params.load_first) != _UNDEFINED ? Boolean(params.load_first) : false;
            var wrapElement = null;
            var htmlItem = null;
            var appendItem = null;
            if (nhMain.utilities.notEmpty(wrapReplyElement)) {
                wrapElement = wrapReplyElement;
                htmlItem = self.template.itemReply;
            } else {
                wrapElement = self.listElement;
                htmlItem = self.template.item;
            }
            if (loadFirst) {
                wrapElement.prepend(htmlItem);
                appendItem = wrapElement.find('li[nh-rating-item]:first-child');
            } else {
                wrapElement.append(htmlItem);
                appendItem = wrapElement.find('li[nh-rating-item]:last-child');
            }
            if (appendItem.length == 0) return;
            var commentId = typeof(comment.id) != _UNDEFINED ? parseInt(comment.id) : null;
            var fullName = typeof(comment.full_name) != _UNDEFINED ? comment.full_name : '';
            var content = typeof(comment.content) != _UNDEFINED ? comment.content : '';
            var time = typeof(comment.time) != _UNDEFINED ? comment.time : '';
            var fullTime = typeof(comment.full_time) != _UNDEFINED ? comment.full_time : '';
            var numberReply = typeof(comment.number_reply) != _UNDEFINED ? comment.number_reply : null;
            var numberLike = typeof(comment.number_like) != _UNDEFINED ? comment.number_like : null;
            var images = typeof(comment.images) != _UNDEFINED ? comment.images : [];
            var isAdmin = typeof(comment.is_admin) != _UNDEFINED ? parseInt(comment.is_admin) : 0;
            var rating = typeof(comment.rating) != _UNDEFINED ? parseInt(comment.rating) : 0;
            var widthRating = 0;
            if (rating >= 1 && rating <= 5) {
                widthRating = rating * 20;
            }
            if (!nhMain.utilities.notEmpty(fullName) || !nhMain.utilities.notEmpty(content)) return;
            appendItem.attr('nh-rating-item', commentId);
            appendItem.find('.author-info .post-author').text(fullName);
            appendItem.find('.author-info .letter-first').text(nhComment.convertFullNameToSpell(fullName));
            appendItem.find('.author-info .post-date').text(time);
            appendItem.find('.rating-content .description').text(content);
            appendItem.find('.rating-content .number-reply').text(numberReply);
            appendItem.find('.rating-content .number-like').text(numberLike);
            appendItem.find('.star-rating span').css('width', widthRating + '%');
            if (isAdmin) {
                appendItem.find('.post-author').append('<span class="is-admin">' + nhMain.getLabel('quan_tri_vien') + '</span>');
            }
            if (images.length > 0) {
                appendItem.find('.rating-content .description').after('<div class="album-images"></div>');
                var wrapAlbum = appendItem.find('.album-images');
                $.each(images, function(index, image) {
                    var thumb = nhMain.utilities.getThumbImage(image);
                    wrapAlbum.append('<a href="' + nhMain.cdnUrl + image + '"><img class="image-comment" src="' + nhMain.cdnUrl + thumb + '" ></a>');
                });
                wrapAlbum.lightGallery({});
            }
        },
        clearBoxRating: function() {
            var self = this;
            if (nhMain.utilities.notEmpty(self.contentElement)) {
                self.contentElement.val('');
            };
            self.formRating.find('.comment-images').remove();
            self.formRating.collapse('hide');
        },
        showImagesRating: function(input = null) {
            var self = this;
            if (input == null || typeof(input.files) == _UNDEFINED) {
                return false;
            }
            var wrapAlbum = self.formRating.find('.comment-images');
            wrapAlbum.html('');
            $.each(input.files, function(index, file) {
                if (index >= nhComment.config.max_number_files) return;
                var fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = function(e) {
                    self.appendImageRating(fileReader.result, input);
                }
            });
            $.each(input.files, function(index, file) {
                if (index >= nhComment.config.max_number_files) return;
                var formData = new FormData();
                formData.append('file', file);
                formData.append('path', _RATING);
                nhComment.ajaxUploadImage(formData, function(data) {
                    var urlImage = typeof(data.url) != _UNDEFINED ? data.url : null;
                    var liElement = wrapAlbum.find('li:eq(' + index + ')');
                    if (liElement.length > 0) {
                        liElement.removeClass('loading');
                        liElement.find('img.img-comment').attr('src', nhMain.cdnUrl + urlImage);
                    }
                });
            });
        },
        appendImageRating: function(urlImage = null, input = null, params = {}) {
            var self = this;
            var wrapAlbum = self.formRating.find('.comment-images');
            if (wrapAlbum.length == 0) return false;
            if (!nhMain.utilities.notEmpty(urlImage)) return false;
            wrapAlbum.append(self.template.imageSelect);
            wrapAlbum.find('li:last-child img.img-comment').attr('src', urlImage);
            wrapAlbum.removeClass('d-none');
            if (typeof(params.uploaded) != _UNDEFINED && params.uploaded > 0) {
                wrapAlbum.find('li:last-child').removeClass('loading');
            }
        },
        showInfo: function() {
            var self = this;
            nhComment.getInfo(self.config);
            if (!nhMain.utilities.notEmpty(nhComment.info.full_name)) return false;
            self.formRating.find('input[name="full_name"]').val(nhComment.info.full_name);
            self.formRating.find('input[name="email"]').val(nhComment.info.email);
            self.formRating.find('input[name="phone"]').val(nhComment.info.phone);
        }
    }
}
$(document).ready(function() {
    nhComment.init();
});;
$(window).scroll(function() {
    $('#return-to-top').fadeIn(200);
});
$('#return-to-top').click(function() {
    $('body,html').animate({
        scrollTop: 0
    }, 500);
});
$(".btn-view-all").click(function() {
    $('.content-main').toggleClass('transform-active');
    if (!$('.content-main').hasClass('transform-active')) {
        $('html, body').animate({
            scrollTop: $('#content-product').offset().top - 85
        }, 'slow');
    }
});
if ($('#show-countdown').length > 0) {
    var time_new = $('#show-countdown').attr('nh-time-end');
    var countDownDateTimeSale = new Date(time_new).getTime();
    var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDateTimeSale - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("show-countdown").innerHTML = "<li>" + "<div>" + days + "<\/div>" + "Ngày" + "<\/li>" + "<li>" + "<div>" + hours + "<\/div>" + "Giờ" + "<\/li>" + "<li>" + "<div>" + minutes + "<\/div>" + "Phút" + "<\/li>" + "<li>" + "<div>" + seconds + "<\/div>" + "Giây" + "<\/li>";
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("show-countdown").innerHTML = "<span>Khuyến mại kết thúc</span>";
        }
    }, 1000);
}
$(document).ready(function() {
    setTimeout(function() {
        $('#popup-promotion').modal('show');
    }, 3000);
});
$(window).scroll(function() {
    if ($(this).scrollTop() > 300) {
        $('.flex-menu').addClass('fixed');
    } else {
        $('.flex-menu').removeClass('fixed');
    }
});
$(window).scroll(function() {
    if ($(this).scrollTop() > 5) {
        $('.setting-menu-mb').addClass('fixed');
    } else {
        $('.setting-menu-mb').removeClass('fixed');
    }
});
$(document).ready(function() {
    nhMain.location.init({
        idWrap: ['#system']
    });
});
$(document).ready(function() {
    if ($('#product-information').height() > 150) {
        $.support.transition = (function() {
            var thisBody = document.body || document.documentElement,
                thisStyle = thisBody.style,
                support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;
            return support;
        })();
        var $copyWrapper = $('#product-information');
        $copyWrapper.each(function() {
            $('<div class="text-center"><span class="more-less">Đọc tiếp</span></div>').insertAfter('#product-information');
            var $moreLess = $('.more-less');
            $(this).addClass('initialized');
            var copyHeight = parseFloat($(this).css('max-height')),
                $copyInner;
            if ($(this).height() < copyHeight) {
                $(this).css({
                    'max-height': 'none'
                });
            } else {
                $(this).wrapInner('<div class="copy__inner"></div>');
                $copyInner = $(this).find('.copy__inner');
                $(this).append('<div class="copy__gradient"></div>');
                $moreLess.click(function() {
                    var maxHeight;
                    if ($.support.transition) {
                        maxHeight = {
                            'max-height': $copyInner.outerHeight(true)
                        };
                    } else {
                        maxHeight = {
                            'max-height': 'none'
                        };
                    }
                    if ($copyWrapper.hasClass('reveal')) {
                        $copyWrapper.css(maxHeight);
                        $copyWrapper.css('max-height');
                        $copyWrapper.css({
                            'max-height': copyHeight,
                            'transition': ''
                        });
                    } else {
                        $copyWrapper.css(maxHeight);
                        $copyWrapper.on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {
                            if (e.target === e.currentTarget) {
                                $copyWrapper.css({
                                    'max-height': 'none',
                                    'transition': 'none'
                                });
                                $copyWrapper.off('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
                            }
                        });
                    }
                    $copyWrapper.toggleClass("reveal");
                    if ($moreLess.text() === "Thu gọn") {
                        $moreLess.text("Đọc tiếp");
                    } else {
                        $moreLess.text("Thu gọn");
                    }
                });
            }
        });
    }
    $(document).on('change', '#system #district_id', function(e) {
        nhMain.callAjax({
            async: true,
            url: '/website/get-shop',
            data: {
                city_id: $('#city_id').val(),
                district_id: $('#district_id').val()
            },
        }).done(function(response) {
            var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
            var message = typeof(response.message) != _UNDEFINED ? response.message : '';
            if (code == _ERROR) {
                nhMain.showAlert(_ERROR, message);
            }
            if (code == _SUCCESS) {
                console.log(response)
                var _html = '';
                $.each(response.data, function(index, value) {
                    _html += '<div class="form-check form-check-inline align-items-start mr-0" data-shop=\'' + JSON.stringify(value) + '\'>';
                    _html += '<input class="form-check-input mr-10 " type="radio" name="address_shop" id="address_' + value.name + '" value="' + value.id + '" data-address="' + value.address + '">';
                    _html += '<label class="form-check-label font-weight-normal" for="address_' + value.name + '">' + value.name + '</label>';
                    _html += '</div>';
                });
                $('[list-data="shop"]').empty().append(_html);
            }
        });
    })
    $(document).on('click', '[data-shop] input[name="address_shop"]', function(e) {
        var data = $('input[name="address_shop"]:checked').closest('div[data-shop]').attr('data-shop');
        if (data) {
            data = JSON.parse(data);
            var src = 'https://maps.google.com/maps?hl=en&q=' + data.address + '&t=p&z=14&ie=UTF8&iwloc=B&output=embed';
            $('.map iframe').attr('src', src);
            $('[shop-col="name"]').text(data.name);
            $('[shop-col="address"]').text(data.address);
            $('[shop-col="hours_operation"]').text(data.hours_operation);
            $('[shop-col="phone"]').text(data.phone);
            $('[shop-col="hotline"]').text(data.hotline);
        }
    })
});;