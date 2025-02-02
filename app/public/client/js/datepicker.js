! function(a) {
                 "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery)
             }(function(a, b) {
                 function c() {
                     return new Date(Date.UTC.apply(Date, arguments))
                 }

                 function d() {
                     var a = new Date;
                     return c(a.getFullYear(), a.getMonth(), a.getDate())
                 }

                 function e(a, b) {
                     return a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth() && a.getUTCDate() === b.getUTCDate()
                 }

                 function f(c, d) {
                     return function() {
                         return d !== b && a.fn.datepicker.deprecated(d), this[c].apply(this, arguments)
                     }
                 }

                 function g(a) {
                     return a && !isNaN(a.getTime())
                 }

                 function h(b, c) {
                     function d(a, b) {
                         return b.toLowerCase()
                     }
                     var e, f = a(b).data(),
                         g = {},
                         h = new RegExp("^" + c.toLowerCase() + "([A-Z])");
                     c = new RegExp("^" + c.toLowerCase());
                     for (var i in f) c.test(i) && (e = i.replace(h, d), g[e] = f[i]);
                     return g
                 }

                 function i(b) {
                     var c = {};
                     if (q[b] || (b = b.split("-")[0], q[b])) {
                         var d = q[b];
                         return a.each(p, function(a, b) {
                             b in d && (c[b] = d[b])
                         }), c
                     }
                 }
                 var j = function() {
                         var b = {
                             get: function(a) {
                                 return this.slice(a)[0]
                             },
                             contains: function(a) {
                                 for (var b = a && a.valueOf(), c = 0, d = this.length; c < d; c++)
                                     if (0 <= this[c].valueOf() - b && this[c].valueOf() - b < 864e5) return c;
                                 return -1
                             },
                             remove: function(a) {
                                 this.splice(a, 1)
                             },
                             replace: function(b) {
                                 b && (a.isArray(b) || (b = [b]), this.clear(), this.push.apply(this, b))
                             },
                             clear: function() {
                                 this.length = 0
                             },
                             copy: function() {
                                 var a = new j;
                                 return a.replace(this), a
                             }
                         };
                         return function() {
                             var c = [];
                             return c.push.apply(c, arguments), a.extend(c, b), c
                         }
                     }(),
                     k = function(b, c) {
                         a.data(b, "datepicker", this), this._events = [], this._secondaryEvents = [], this._process_options(c), this.dates = new j, this.viewDate = this.o.defaultViewDate, this.focusDate = null, this.element = a(b), this.isInput = this.element.is("input"), this.inputField = this.isInput ? this.element : this.element.find("input"), this.component = !!this.element.hasClass("date") && this.element.find(".add-on, .input-group-addon, .input-group-append, .input-group-prepend, .btn"), this.component && 0 === this.component.length && (this.component = !1), this.isInline = !this.component && this.element.is("div"), this.picker = a(r.template), this._check_template(this.o.templates.leftArrow) && this.picker.find(".prev").html(this.o.templates.leftArrow), this._check_template(this.o.templates.rightArrow) && this.picker.find(".next").html(this.o.templates.rightArrow), this._buildEvents(), this._attachEvents(), this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"), this.o.rtl && this.picker.addClass("datepicker-rtl"), this.o.calendarWeeks && this.picker.find(".datepicker-days .datepicker-switch, thead .datepicker-title, tfoot .today, tfoot .clear").attr("colspan", function(a, b) {
                             return Number(b) + 1
                         }), this._process_options({
                             startDate: this._o.startDate,
                             endDate: this._o.endDate,
                             daysOfWeekDisabled: this.o.daysOfWeekDisabled,
                             daysOfWeekHighlighted: this.o.daysOfWeekHighlighted,
                             datesDisabled: this.o.datesDisabled
                         }), this._allow_update = !1, this.setViewMode(this.o.startView), this._allow_update = !0, this.fillDow(), this.fillMonths(), this.update(), this.isInline && this.show()
                     };
                 k.prototype = {
                     constructor: k,
                     _resolveViewName: function(b) {
                         return a.each(r.viewModes, function(c, d) {
                             if (b === c || -1 !== a.inArray(b, d.names)) return b = c, !1
                         }), b
                     },
                     _resolveDaysOfWeek: function(b) {
                         return a.isArray(b) || (b = b.split(/[,\s]*/)), a.map(b, Number)
                     },
                     _check_template: function(c) {
                         try {
                             if (c === b || "" === c) return !1;
                             if ((c.match(/[<>]/g) || []).length <= 0) return !0;
                             return a(c).length > 0
                         } catch (a) {
                             return !1
                         }
                     },
                     _process_options: function(b) {
                         this._o = a.extend({}, this._o, b);
                         var e = this.o = a.extend({}, this._o),
                             f = e.language;
                         q[f] || (f = f.split("-")[0], q[f] || (f = o.language)), e.language = f, e.startView = this._resolveViewName(e.startView), e.minViewMode = this._resolveViewName(e.minViewMode), e.maxViewMode = this._resolveViewName(e.maxViewMode), e.startView = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, e.startView)), !0 !== e.multidate && (e.multidate = Number(e.multidate) || !1, !1 !== e.multidate && (e.multidate = Math.max(0, e.multidate))), e.multidateSeparator = String(e.multidateSeparator), e.weekStart %= 7, e.weekEnd = (e.weekStart + 6) % 7;
                         var g = r.parseFormat(e.format);
                         e.startDate !== -1 / 0 && (e.startDate ? e.startDate instanceof Date ? e.startDate = this._local_to_utc(this._zero_time(e.startDate)) : e.startDate = r.parseDate(e.startDate, g, e.language, e.assumeNearbyYear) : e.startDate = -1 / 0), e.endDate !== 1 / 0 && (e.endDate ? e.endDate instanceof Date ? e.endDate = this._local_to_utc(this._zero_time(e.endDate)) : e.endDate = r.parseDate(e.endDate, g, e.language, e.assumeNearbyYear) : e.endDate = 1 / 0), e.daysOfWeekDisabled = this._resolveDaysOfWeek(e.daysOfWeekDisabled || []), e.daysOfWeekHighlighted = this._resolveDaysOfWeek(e.daysOfWeekHighlighted || []), e.datesDisabled = e.datesDisabled || [], a.isArray(e.datesDisabled) || (e.datesDisabled = e.datesDisabled.split(",")), e.datesDisabled = a.map(e.datesDisabled, function(a) {
                             return r.parseDate(a, g, e.language, e.assumeNearbyYear)
                         });
                         var h = String(e.orientation).toLowerCase().split(/\s+/g),
                             i = e.orientation.toLowerCase();
                         if (h = a.grep(h, function(a) {
                                 return /^auto|left|right|top|bottom$/.test(a)
                             }), e.orientation = {
                                 x: "auto",
                                 y: "auto"
                             }, i && "auto" !== i)
                             if (1 === h.length) switch (h[0]) {
                                 case "top":
                                 case "bottom":
                                     e.orientation.y = h[0];
                                     break;
                                 case "left":
                                 case "right":
                                     e.orientation.x = h[0]
                             } else i = a.grep(h, function(a) {
                                 return /^left|right$/.test(a)
                             }), e.orientation.x = i[0] || "auto", i = a.grep(h, function(a) {
                                 return /^top|bottom$/.test(a)
                             }), e.orientation.y = i[0] || "auto";
                             else;
                         if (e.defaultViewDate instanceof Date || "string" == typeof e.defaultViewDate) e.defaultViewDate = r.parseDate(e.defaultViewDate, g, e.language, e.assumeNearbyYear);
                         else if (e.defaultViewDate) {
                             var j = e.defaultViewDate.year || (new Date).getFullYear(),
                                 k = e.defaultViewDate.month || 0,
                                 l = e.defaultViewDate.day || 1;
                             e.defaultViewDate = c(j, k, l)
                         } else e.defaultViewDate = d()
                     },
                     _applyEvents: function(a) {
                         for (var c, d, e, f = 0; f < a.length; f++) c = a[f][0], 2 === a[f].length ? (d = b, e = a[f][1]) : 3 === a[f].length && (d = a[f][1], e = a[f][2]), c.on(e, d)
                     },
                     _unapplyEvents: function(a) {
                         for (var c, d, e, f = 0; f < a.length; f++) c = a[f][0], 2 === a[f].length ? (e = b, d = a[f][1]) : 3 === a[f].length && (e = a[f][1], d = a[f][2]), c.off(d, e)
                     },
                     _buildEvents: function() {
                         var b = {
                             keyup: a.proxy(function(b) {
                                 -1 === a.inArray(b.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) && this.update()
                             }, this),
                             keydown: a.proxy(this.keydown, this),
                             paste: a.proxy(this.paste, this)
                         };
                         !0 === this.o.showOnFocus && (b.focus = a.proxy(this.show, this)), this.isInput ? this._events = [
                             [this.element, b]
                         ] : this.component && this.inputField.length ? this._events = [
                             [this.inputField, b],
                             [this.component, {
                                 click: a.proxy(this.show, this)
                             }]
                         ] : this._events = [
                             [this.element, {
                                 click: a.proxy(this.show, this),
                                 keydown: a.proxy(this.keydown, this)
                             }]
                         ], this._events.push([this.element, "*", {
                             blur: a.proxy(function(a) {
                                 this._focused_from = a.target
                             }, this)
                         }], [this.element, {
                             blur: a.proxy(function(a) {
                                 this._focused_from = a.target
                             }, this)
                         }]), this.o.immediateUpdates && this._events.push([this.element, {
                             "changeYear changeMonth": a.proxy(function(a) {
                                 this.update(a.date)
                             }, this)
                         }]), this._secondaryEvents = [
                             [this.picker, {
                                 click: a.proxy(this.click, this)
                             }],
                             [this.picker, ".prev, .next", {
                                 click: a.proxy(this.navArrowsClick, this)
                             }],
                             [this.picker, ".day:not(.disabled)", {
                                 click: a.proxy(this.dayCellClick, this)
                             }],
                             [a(window), {
                                 resize: a.proxy(this.place, this)
                             }],
                             [a(document), {
                                 "mousedown touchstart": a.proxy(function(a) {
                                     this.element.is(a.target) || this.element.find(a.target).length || this.picker.is(a.target) || this.picker.find(a.target).length || this.isInline || this.hide()
                                 }, this)
                             }]
                         ]
                     },
                     _attachEvents: function() {
                         this._detachEvents(), this._applyEvents(this._events)
                     },
                     _detachEvents: function() {
                         this._unapplyEvents(this._events)
                     },
                     _attachSecondaryEvents: function() {
                         this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents)
                     },
                     _detachSecondaryEvents: function() {
                         this._unapplyEvents(this._secondaryEvents)
                     },
                     _trigger: function(b, c) {
                         var d = c || this.dates.get(-1),
                             e = this._utc_to_local(d);
                         this.element.trigger({
                             type: b,
                             date: e,
                             viewMode: this.viewMode,
                             dates: a.map(this.dates, this._utc_to_local),
                             format: a.proxy(function(a, b) {
                                 0 === arguments.length ? (a = this.dates.length - 1, b = this.o.format) : "string" == typeof a && (b = a, a = this.dates.length - 1), b = b || this.o.format;
                                 var c = this.dates.get(a);
                                 return r.formatDate(c, b, this.o.language)
                             }, this)
                         })
                     },
                     show: function() {
                         if (!(this.inputField.is(":disabled") || this.inputField.prop("readonly") && !1 === this.o.enableOnReadonly)) return this.isInline || this.picker.appendTo(this.o.container), this.place(), this.picker.show(), this._attachSecondaryEvents(), this._trigger("show"), (window.navigator.msMaxTouchPoints || "ontouchstart" in document) && this.o.disableTouchKeyboard && a(this.element).blur(), this
                     },
                     hide: function() {
                         return this.isInline || !this.picker.is(":visible") ? this : (this.focusDate = null, this.picker.hide().detach(), this._detachSecondaryEvents(), this.setViewMode(this.o.startView), this.o.forceParse && this.inputField.val() && this.setValue(), this._trigger("hide"), this)
                     },
                     destroy: function() {
                         return this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), delete this.element.data().datepicker, this.isInput || delete this.element.data().date, this
                     },
                     paste: function(b) {
                         var c;
                         if (b.originalEvent.clipboardData && b.originalEvent.clipboardData.types && -1 !== a.inArray("text/plain", b.originalEvent.clipboardData.types)) c = b.originalEvent.clipboardData.getData("text/plain");
                         else {
                             if (!window.clipboardData) return;
                             c = window.clipboardData.getData("Text")
                         }
                         this.setDate(c), this.update(), b.preventDefault()
                     },
                     _utc_to_local: function(a) {
                         if (!a) return a;
                         var b = new Date(a.getTime() + 6e4 * a.getTimezoneOffset());
                         return b.getTimezoneOffset() !== a.getTimezoneOffset() && (b = new Date(a.getTime() + 6e4 * b.getTimezoneOffset())), b
                     },
                     _local_to_utc: function(a) {
                         return a && new Date(a.getTime() - 6e4 * a.getTimezoneOffset())
                     },
                     _zero_time: function(a) {
                         return a && new Date(a.getFullYear(), a.getMonth(), a.getDate())
                     },
                     _zero_utc_time: function(a) {
                         return a && c(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate())
                     },
                     getDates: function() {
                         return a.map(this.dates, this._utc_to_local)
                     },
                     getUTCDates: function() {
                         return a.map(this.dates, function(a) {
                             return new Date(a)
                         })
                     },
                     getDate: function() {
                         return this._utc_to_local(this.getUTCDate())
                     },
                     getUTCDate: function() {
                         var a = this.dates.get(-1);
                         return a !== b ? new Date(a) : null
                     },
                     clearDates: function() {
                         this.inputField.val(""), this.update(), this._trigger("changeDate"), this.o.autoclose && this.hide()
                     },
                     setDates: function() {
                         var b = a.isArray(arguments[0]) ? arguments[0] : arguments;
                         return this.update.apply(this, b), this._trigger("changeDate"), this.setValue(), this
                     },
                     setUTCDates: function() {
                         var b = a.isArray(arguments[0]) ? arguments[0] : arguments;
                         return this.setDates.apply(this, a.map(b, this._utc_to_local)), this
                     },
                     setDate: f("setDates"),
                     setUTCDate: f("setUTCDates"),
                     remove: f("destroy", "Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead"),
                     setValue: function() {
                         var a = this.getFormattedDate();
                         return this.inputField.val(a), this
                     },
                     getFormattedDate: function(c) {
                         c === b && (c = this.o.format);
                         var d = this.o.language;
                         return a.map(this.dates, function(a) {
                             return r.formatDate(a, c, d)
                         }).join(this.o.multidateSeparator)
                     },
                     getStartDate: function() {
                         return this.o.startDate
                     },
                     setStartDate: function(a) {
                         return this._process_options({
                             startDate: a
                         }), this.update(), this.updateNavArrows(), this
                     },
                     getEndDate: function() {
                         return this.o.endDate
                     },
                     setEndDate: function(a) {
                         return this._process_options({
                             endDate: a
                         }), this.update(), this.updateNavArrows(), this
                     },
                     setDaysOfWeekDisabled: function(a) {
                         return this._process_options({
                             daysOfWeekDisabled: a
                         }), this.update(), this
                     },
                     setDaysOfWeekHighlighted: function(a) {
                         return this._process_options({
                             daysOfWeekHighlighted: a
                         }), this.update(), this
                     },
                     setDatesDisabled: function(a) {
                         return this._process_options({
                             datesDisabled: a
                         }), this.update(), this
                     },
                     place: function() {
                         if (this.isInline) return this;
                         var b = this.picker.outerWidth(),
                             c = this.picker.outerHeight(),
                             d = a(this.o.container),
                             e = d.width(),
                             f = "body" === this.o.container ? a(document).scrollTop() : d.scrollTop(),
                             g = d.offset(),
                             h = [0];
                         this.element.parents().each(function() {
                             var b = a(this).css("z-index");
                             "auto" !== b && 0 !== Number(b) && h.push(Number(b))
                         });
                         var i = Math.max.apply(Math, h) + this.o.zIndexOffset,
                             j = this.component ? this.component.parent().offset() : this.element.offset(),
                             k = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1),
                             l = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1),
                             m = j.left - g.left,
                             n = j.top - g.top;
                         "body" !== this.o.container && (n += f), this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"), "auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x), "right" === this.o.orientation.x && (m -= b - l)) : j.left < 0 ? (this.picker.addClass("datepicker-orient-left"), m -= j.left - 10) : m + b > e ? (this.picker.addClass("datepicker-orient-right"), m += l - b) : this.o.rtl ? this.picker.addClass("datepicker-orient-right") : this.picker.addClass("datepicker-orient-left");
                         var o, p = this.o.orientation.y;
                         if ("auto" === p && (o = -f + n - c, p = o < 0 ? "bottom" : "top"), this.picker.addClass("datepicker-orient-" + p), "top" === p ? n -= c + parseInt(this.picker.css("padding-top")) : n += k, this.o.rtl) {
                             var q = e - (m + l);
                             this.picker.css({
                                 top: n,
                                 right: q,
                                 zIndex: i
                             })
                         } else this.picker.css({
                             top: n,
                             left: m,
                             zIndex: i
                         });
                         return this
                     },
                     _allow_update: !0,
                     update: function() {
                         if (!this._allow_update) return this;
                         var b = this.dates.copy(),
                             c = [],
                             d = !1;
                         return arguments.length ? (a.each(arguments, a.proxy(function(a, b) {
                             b instanceof Date && (b = this._local_to_utc(b)), c.push(b)
                         }, this)), d = !0) : (c = this.isInput ? this.element.val() : this.element.data("date") || this.inputField.val(), c = c && this.o.multidate ? c.split(this.o.multidateSeparator) : [c], delete this.element.data().date), c = a.map(c, a.proxy(function(a) {
                             return r.parseDate(a, this.o.format, this.o.language, this.o.assumeNearbyYear)
                         }, this)), c = a.grep(c, a.proxy(function(a) {
                             return !this.dateWithinRange(a) || !a
                         }, this), !0), this.dates.replace(c), this.o.updateViewDate && (this.dates.length ? this.viewDate = new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? this.viewDate = new Date(this.o.startDate) : this.viewDate > this.o.endDate ? this.viewDate = new Date(this.o.endDate) : this.viewDate = this.o.defaultViewDate), d ? (this.setValue(), this.element.change()) : this.dates.length && String(b) !== String(this.dates) && d && (this._trigger("changeDate"), this.element.change()), !this.dates.length && b.length && (this._trigger("clearDate"), this.element.change()), this.fill(), this
                     },
                     fillDow: function() {
                         if (this.o.showWeekDays) {
                             var b = this.o.weekStart,
                                 c = "<tr>";
                             for (this.o.calendarWeeks && (c += '<th class="cw">&#160;</th>'); b < this.o.weekStart + 7;) c += '<th class="dow', -1 !== a.inArray(b, this.o.daysOfWeekDisabled) && (c += " disabled"), c += '">' + q[this.o.language].daysMin[b++ % 7] + "</th>";
                             c += "</tr>", this.picker.find(".datepicker-days thead").append(c)
                         }
                     },
                     fillMonths: function() {
                         for (var a, b = this._utc_to_local(this.viewDate), c = "", d = 0; d < 12; d++) a = b && b.getMonth() === d ? " focused" : "", c += '<span class="month' + a + '">' + q[this.o.language].monthsShort[d] + "</span>";
                         this.picker.find(".datepicker-months td").html(c)
                     },
                     setRange: function(b) {
                         b && b.length ? this.range = a.map(b, function(a) {
                             return a.valueOf()
                         }) : delete this.range, this.fill()
                     },
                     getClassNames: function(b) {
                         var c = [],
                             f = this.viewDate.getUTCFullYear(),
                             g = this.viewDate.getUTCMonth(),
                             h = d();
                         return b.getUTCFullYear() < f || b.getUTCFullYear() === f && b.getUTCMonth() < g ? c.push("old") : (b.getUTCFullYear() > f || b.getUTCFullYear() === f && b.getUTCMonth() > g) && c.push("new"), this.focusDate && b.valueOf() === this.focusDate.valueOf() && c.push("focused"), this.o.todayHighlight && e(b, h) && c.push("today"), -1 !== this.dates.contains(b) && c.push("active"), this.dateWithinRange(b) || c.push("disabled"), this.dateIsDisabled(b) && c.push("disabled", "disabled-date"), -1 !== a.inArray(b.getUTCDay(), this.o.daysOfWeekHighlighted) && c.push("highlighted"), this.range && (b > this.range[0] && b < this.range[this.range.length - 1] && c.push("range"), -1 !== a.inArray(b.valueOf(), this.range) && c.push("selected"), b.valueOf() === this.range[0] && c.push("range-start"), b.valueOf() === this.range[this.range.length - 1] && c.push("range-end")), c
                     },
                     _fill_yearsView: function(c, d, e, f, g, h, i) {
                         for (var j, k, l, m = "", n = e / 10, o = this.picker.find(c), p = Math.floor(f / e) * e, q = p + 9 * n, r = Math.floor(this.viewDate.getFullYear() / n) * n, s = a.map(this.dates, function(a) {
                                 return Math.floor(a.getUTCFullYear() / n) * n
                             }), t = p - n; t <= q + n; t += n) j = [d], k = null, t === p - n ? j.push("old") : t === q + n && j.push("new"), -1 !== a.inArray(t, s) && j.push("active"), (t < g || t > h) && j.push("disabled"), t === r && j.push("focused"), i !== a.noop && (l = i(new Date(t, 0, 1)), l === b ? l = {} : "boolean" == typeof l ? l = {
                             enabled: l
                         } : "string" == typeof l && (l = {
                             classes: l
                         }), !1 === l.enabled && j.push("disabled"), l.classes && (j = j.concat(l.classes.split(/\s+/))), l.tooltip && (k = l.tooltip)), m += '<span class="' + j.join(" ") + '"' + (k ? ' title="' + k + '"' : "") + ">" + t + "</span>";
                         o.find(".datepicker-switch").text(p + "-" + q), o.find("td").html(m)
                     },
                     fill: function() {
                         var e, f, g = new Date(this.viewDate),
                             h = g.getUTCFullYear(),
                             i = g.getUTCMonth(),
                             j = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCFullYear() : -1 / 0,
                             k = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCMonth() : -1 / 0,
                             l = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0,
                             m = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0,
                             n = q[this.o.language].today || q.en.today || "",
                             o = q[this.o.language].clear || q.en.clear || "",
                             p = q[this.o.language].titleFormat || q.en.titleFormat,
                             s = d(),
                             t = (!0 === this.o.todayBtn || "linked" === this.o.todayBtn) && s >= this.o.startDate && s <= this.o.endDate && !this.weekOfDateIsDisabled(s);
                         if (!isNaN(h) && !isNaN(i)) {
                             this.picker.find(".datepicker-days .datepicker-switch").text(r.formatDate(g, p, this.o.language)), this.picker.find("tfoot .today").text(n).css("display", t ? "table-cell" : "none"), this.picker.find("tfoot .clear").text(o).css("display", !0 === this.o.clearBtn ? "table-cell" : "none"), this.picker.find("thead .datepicker-title").text(this.o.title).css("display", "string" == typeof this.o.title && "" !== this.o.title ? "table-cell" : "none"), this.updateNavArrows(), this.fillMonths();
                             var u = c(h, i, 0),
                                 v = u.getUTCDate();
                             u.setUTCDate(v - (u.getUTCDay() - this.o.weekStart + 7) % 7);
                             var w = new Date(u);
                             u.getUTCFullYear() < 100 && w.setUTCFullYear(u.getUTCFullYear()), w.setUTCDate(w.getUTCDate() + 42), w = w.valueOf();
                             for (var x, y, z = []; u.valueOf() < w;) {
                                 if ((x = u.getUTCDay()) === this.o.weekStart && (z.push("<tr>"), this.o.calendarWeeks)) {
                                     var A = new Date(+u + (this.o.weekStart - x - 7) % 7 * 864e5),
                                         B = new Date(Number(A) + (11 - A.getUTCDay()) % 7 * 864e5),
                                         C = new Date(Number(C = c(B.getUTCFullYear(), 0, 1)) + (11 - C.getUTCDay()) % 7 * 864e5),
                                         D = (B - C) / 864e5 / 7 + 1;
                                     z.push('<td class="cw">' + D + "</td>")
                                 }
                                 y = this.getClassNames(u), y.push("day");
                                 var E = u.getUTCDate();
                                 this.o.beforeShowDay !== a.noop && (f = this.o.beforeShowDay(this._utc_to_local(u)), f === b ? f = {} : "boolean" == typeof f ? f = {
                                     enabled: f
                                 } : "string" == typeof f && (f = {
                                     classes: f
                                 }), !1 === f.enabled && y.push("disabled"), f.classes && (y = y.concat(f.classes.split(/\s+/))), f.tooltip && (e = f.tooltip), f.content && (E = f.content)), y = a.isFunction(a.uniqueSort) ? a.uniqueSort(y) : a.unique(y), z.push('<td class="' + y.join(" ") + '"' + (e ? ' title="' + e + '"' : "") + ' data-date="' + u.getTime().toString() + '">' + E + "</td>"), e = null, x === this.o.weekEnd && z.push("</tr>"), u.setUTCDate(u.getUTCDate() + 1)
                             }
                             this.picker.find(".datepicker-days tbody").html(z.join(""));
                             var F = q[this.o.language].monthsTitle || q.en.monthsTitle || "Months",
                                 G = this.picker.find(".datepicker-months").find(".datepicker-switch").text(this.o.maxViewMode < 2 ? F : h).end().find("tbody span").removeClass("active");
                             if (a.each(this.dates, function(a, b) {
                                     b.getUTCFullYear() === h && G.eq(b.getUTCMonth()).addClass("active")
                                 }), (h < j || h > l) && G.addClass("disabled"), h === j && G.slice(0, k).addClass("disabled"), h === l && G.slice(m + 1).addClass("disabled"), this.o.beforeShowMonth !== a.noop) {
                                 var H = this;
                                 a.each(G, function(c, d) {
                                     var e = new Date(h, c, 1),
                                         f = H.o.beforeShowMonth(e);
                                     f === b ? f = {} : "boolean" == typeof f ? f = {
                                         enabled: f
                                     } : "string" == typeof f && (f = {
                                         classes: f
                                     }), !1 !== f.enabled || a(d).hasClass("disabled") || a(d).addClass("disabled"), f.classes && a(d).addClass(f.classes), f.tooltip && a(d).prop("title", f.tooltip)
                                 })
                             }
                             this._fill_yearsView(".datepicker-years", "year", 10, h, j, l, this.o.beforeShowYear), this._fill_yearsView(".datepicker-decades", "decade", 100, h, j, l, this.o.beforeShowDecade), this._fill_yearsView(".datepicker-centuries", "century", 1e3, h, j, l, this.o.beforeShowCentury)
                         }
                     },
                     updateNavArrows: function() {
                         if (this._allow_update) {
                             var a, b, c = new Date(this.viewDate),
                                 d = c.getUTCFullYear(),
                                 e = c.getUTCMonth(),
                                 f = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCFullYear() : -1 / 0,
                                 g = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCMonth() : -1 / 0,
                                 h = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0,
                                 i = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0,
                                 j = 1;
                             switch (this.viewMode) {
                                 case 4:
                                     j *= 10;
                                 case 3:
                                     j *= 10;
                                 case 2:
                                     j *= 10;
                                 case 1:
                                     a = Math.floor(d / j) * j <= f, b = Math.floor(d / j) * j + j > h;
                                     break;
                                 case 0:
                                     a = d <= f && e <= g, b = d >= h && e >= i
                             }
                             this.picker.find(".prev").toggleClass("disabled", a), this.picker.find(".next").toggleClass("disabled", b)
                         }
                     },
                     click: function(b) {
                         b.preventDefault(), b.stopPropagation();
                         var e, f, g, h;
                         e = a(b.target), e.hasClass("datepicker-switch") && this.viewMode !== this.o.maxViewMode && this.setViewMode(this.viewMode + 1), e.hasClass("today") && !e.hasClass("day") && (this.setViewMode(0), this._setDate(d(), "linked" === this.o.todayBtn ? null : "view")), e.hasClass("clear") && this.clearDates(), e.hasClass("disabled") || (e.hasClass("month") || e.hasClass("year") || e.hasClass("decade") || e.hasClass("century")) && (this.viewDate.setUTCDate(1), f = 1, 1 === this.viewMode ? (h = e.parent().find("span").index(e), g = this.viewDate.getUTCFullYear(), this.viewDate.setUTCMonth(h)) : (h = 0, g = Number(e.text()), this.viewDate.setUTCFullYear(g)), this._trigger(r.viewModes[this.viewMode - 1].e, this.viewDate), this.viewMode === this.o.minViewMode ? this._setDate(c(g, h, f)) : (this.setViewMode(this.viewMode - 1), this.fill())), this.picker.is(":visible") && this._focused_from && this._focused_from.focus(), delete this._focused_from
                     },
                     dayCellClick: function(b) {
                         var c = a(b.currentTarget),
                             d = c.data("date"),
                             e = new Date(d);
                         this.o.updateViewDate && (e.getUTCFullYear() !== this.viewDate.getUTCFullYear() && this._trigger("changeYear", this.viewDate), e.getUTCMonth() !== this.viewDate.getUTCMonth() && this._trigger("changeMonth", this.viewDate)), this._setDate(e)
                     },
                     navArrowsClick: function(b) {
                         var c = a(b.currentTarget),
                             d = c.hasClass("prev") ? -1 : 1;
                         0 !== this.viewMode && (d *= 12 * r.viewModes[this.viewMode].navStep), this.viewDate = this.moveMonth(this.viewDate, d), this._trigger(r.viewModes[this.viewMode].e, this.viewDate), this.fill()
                     },
                     _toggle_multidate: function(a) {
                         var b = this.dates.contains(a);
                         if (a || this.dates.clear(), -1 !== b ? (!0 === this.o.multidate || this.o.multidate > 1 || this.o.toggleActive) && this.dates.remove(b) : !1 === this.o.multidate ? (this.dates.clear(), this.dates.push(a)) : this.dates.push(a), "number" == typeof this.o.multidate)
                             for (; this.dates.length > this.o.multidate;) this.dates.remove(0)
                     },
                     _setDate: function(a, b) {
                         b && "date" !== b || this._toggle_multidate(a && new Date(a)), (!b && this.o.updateViewDate || "view" === b) && (this.viewDate = a && new Date(a)), this.fill(), this.setValue(), b && "view" === b || this._trigger("changeDate"), this.inputField.trigger("change"), !this.o.autoclose || b && "date" !== b || this.hide()
                     },
                     moveDay: function(a, b) {
                         var c = new Date(a);
                         return c.setUTCDate(a.getUTCDate() + b), c
                     },
                     moveWeek: function(a, b) {
                         return this.moveDay(a, 7 * b)
                     },
                     moveMonth: function(a, b) {
                         if (!g(a)) return this.o.defaultViewDate;
                         if (!b) return a;
                         var c, d, e = new Date(a.valueOf()),
                             f = e.getUTCDate(),
                             h = e.getUTCMonth(),
                             i = Math.abs(b);
                         if (b = b > 0 ? 1 : -1, 1 === i) d = -1 === b ? function() {
                             return e.getUTCMonth() === h
                         } : function() {
                             return e.getUTCMonth() !== c
                         }, c = h + b, e.setUTCMonth(c), c = (c + 12) % 12;
                         else {
                             for (var j = 0; j < i; j++) e = this.moveMonth(e, b);
                             c = e.getUTCMonth(), e.setUTCDate(f), d = function() {
                                 return c !== e.getUTCMonth()
                             }
                         }
                         for (; d();) e.setUTCDate(--f), e.setUTCMonth(c);
                         return e
                     },
                     moveYear: function(a, b) {
                         return this.moveMonth(a, 12 * b)
                     },
                     moveAvailableDate: function(a, b, c) {
                         do {
                             if (a = this[c](a, b), !this.dateWithinRange(a)) return !1;
                             c = "moveDay"
                         } while (this.dateIsDisabled(a));
                         return a
                     },
                     weekOfDateIsDisabled: function(b) {
                         return -1 !== a.inArray(b.getUTCDay(), this.o.daysOfWeekDisabled)
                     },
                     dateIsDisabled: function(b) {
                         return this.weekOfDateIsDisabled(b) || a.grep(this.o.datesDisabled, function(a) {
                             return e(b, a)
                         }).length > 0
                     },
                     dateWithinRange: function(a) {
                         return a >= this.o.startDate && a <= this.o.endDate
                     },
                     keydown: function(a) {
                         if (!this.picker.is(":visible")) return void(40 !== a.keyCode && 27 !== a.keyCode || (this.show(), a.stopPropagation()));
                         var b, c, d = !1,
                             e = this.focusDate || this.viewDate;
                         switch (a.keyCode) {
                             case 27:
                                 this.focusDate ? (this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill()) : this.hide(), a.preventDefault(), a.stopPropagation();
                                 break;
                             case 37:
                             case 38:
                             case 39:
                             case 40:
                                 if (!this.o.keyboardNavigation || 7 === this.o.daysOfWeekDisabled.length) break;
                                 b = 37 === a.keyCode || 38 === a.keyCode ? -1 : 1, 0 === this.viewMode ? a.ctrlKey ? (c = this.moveAvailableDate(e, b, "moveYear")) && this._trigger("changeYear", this.viewDate) : a.shiftKey ? (c = this.moveAvailableDate(e, b, "moveMonth")) && this._trigger("changeMonth", this.viewDate) : 37 === a.keyCode || 39 === a.keyCode ? c = this.moveAvailableDate(e, b, "moveDay") : this.weekOfDateIsDisabled(e) || (c = this.moveAvailableDate(e, b, "moveWeek")) : 1 === this.viewMode ? (38 !== a.keyCode && 40 !== a.keyCode || (b *= 4), c = this.moveAvailableDate(e, b, "moveMonth")) : 2 === this.viewMode && (38 !== a.keyCode && 40 !== a.keyCode || (b *= 4), c = this.moveAvailableDate(e, b, "moveYear")), c && (this.focusDate = this.viewDate = c, this.setValue(), this.fill(), a.preventDefault());
                                 break;
                             case 13:
                                 if (!this.o.forceParse) break;
                                 e = this.focusDate || this.dates.get(-1) || this.viewDate, this.o.keyboardNavigation && (this._toggle_multidate(e), d = !0), this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.setValue(), this.fill(), this.picker.is(":visible") && (a.preventDefault(), a.stopPropagation(), this.o.autoclose && this.hide());
                                 break;
                             case 9:
                                 this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill(), this.hide()
                         }
                         d && (this.dates.length ? this._trigger("changeDate") : this._trigger("clearDate"), this.inputField.trigger("change"))
                     },
                     setViewMode: function(a) {
                         this.viewMode = a, this.picker.children("div").hide().filter(".datepicker-" + r.viewModes[this.viewMode].clsName).show(), this.updateNavArrows(), this._trigger("changeViewMode", new Date(this.viewDate))
                     }
                 };
                 var l = function(b, c) {
                     a.data(b, "datepicker", this), this.element = a(b), this.inputs = a.map(c.inputs, function(a) {
                         return a.jquery ? a[0] : a
                     }), delete c.inputs, this.keepEmptyValues = c.keepEmptyValues, delete c.keepEmptyValues, n.call(a(this.inputs), c).on("changeDate", a.proxy(this.dateUpdated, this)), this.pickers = a.map(this.inputs, function(b) {
                         return a.data(b, "datepicker")
                     }), this.updateDates()
                 };
                 l.prototype = {
                     updateDates: function() {
                         this.dates = a.map(this.pickers, function(a) {
                             return a.getUTCDate()
                         }), this.updateRanges()
                     },
                     updateRanges: function() {
                         var b = a.map(this.dates, function(a) {
                             return a.valueOf()
                         });
                         a.each(this.pickers, function(a, c) {
                             c.setRange(b)
                         })
                     },
                     clearDates: function() {
                         a.each(this.pickers, function(a, b) {
                             b.clearDates()
                         })
                     },
                     dateUpdated: function(c) {
                         if (!this.updating) {
                             this.updating = !0;
                             var d = a.data(c.target, "datepicker");
                             if (d !== b) {
                                 var e = d.getUTCDate(),
                                     f = this.keepEmptyValues,
                                     g = a.inArray(c.target, this.inputs),
                                     h = g - 1,
                                     i = g + 1,
                                     j = this.inputs.length;
                                 if (-1 !== g) {
                                     if (a.each(this.pickers, function(a, b) {
                                             b.getUTCDate() || b !== d && f || b.setUTCDate(e)
                                         }), e < this.dates[h])
                                         for (; h >= 0 && e < this.dates[h];) this.pickers[h--].setUTCDate(e);
                                     else if (e > this.dates[i])
                                         for (; i < j && e > this.dates[i];) this.pickers[i++].setUTCDate(e);
                                     this.updateDates(), delete this.updating
                                 }
                             }
                         }
                     },
                     destroy: function() {
                         a.map(this.pickers, function(a) {
                             a.destroy()
                         }), a(this.inputs).off("changeDate", this.dateUpdated), delete this.element.data().datepicker
                     },
                     remove: f("destroy", "Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead")
                 };
                 var m = a.fn.datepicker,
                     n = function(c) {
                         var d = Array.apply(null, arguments);
                         d.shift();
                         var e;
                         if (this.each(function() {
                                 var b = a(this),
                                     f = b.data("datepicker"),
                                     g = "object" == typeof c && c;
                                 if (!f) {
                                     var j = h(this, "date"),
                                         m = a.extend({}, o, j, g),
                                         n = i(m.language),
                                         p = a.extend({}, o, n, j, g);
                                     b.hasClass("input-daterange") || p.inputs ? (a.extend(p, {
                                         inputs: p.inputs || b.find("input").toArray()
                                     }), f = new l(this, p)) : f = new k(this, p), b.data("datepicker", f)
                                 }
                                 "string" == typeof c && "function" == typeof f[c] && (e = f[c].apply(f, d))
                             }), e === b || e instanceof k || e instanceof l) return this;
                         if (this.length > 1) throw new Error("Using only allowed for the collection of a single element (" + c + " function)");
                         return e
                     };
                 a.fn.datepicker = n;
                 var o = a.fn.datepicker.defaults = {
                         assumeNearbyYear: !1,
                         autoclose: !1,
                         beforeShowDay: a.noop,
                         beforeShowMonth: a.noop,
                         beforeShowYear: a.noop,
                         beforeShowDecade: a.noop,
                         beforeShowCentury: a.noop,
                         calendarWeeks: !1,
                         clearBtn: !1,
                         toggleActive: !1,
                         daysOfWeekDisabled: [],
                         daysOfWeekHighlighted: [],
                         datesDisabled: [],
                         endDate: 1 / 0,
                         forceParse: !0,
                         format: "mm/dd/yyyy",
                         keepEmptyValues: !1,
                         keyboardNavigation: !0,
                         language: "en",
                         minViewMode: 0,
                         maxViewMode: 4,
                         multidate: !1,
                         multidateSeparator: ",",
                         orientation: "auto",
                         rtl: !1,
                         startDate: -1 / 0,
                         startView: 0,
                         todayBtn: !1,
                         todayHighlight: !1,
                         updateViewDate: !0,
                         weekStart: 0,
                         disableTouchKeyboard: !1,
                         enableOnReadonly: !0,
                         showOnFocus: !0,
                         zIndexOffset: 10,
                         container: "body",
                         immediateUpdates: !1,
                         title: "",
                         templates: {
                             leftArrow: "&#x00AB;",
                             rightArrow: "&#x00BB;"
                         },
                         showWeekDays: !0
                     },
                     p = a.fn.datepicker.locale_opts = ["format", "rtl", "weekStart"];
                 a.fn.datepicker.Constructor = k;
                 var q = a.fn.datepicker.dates = {
                         en: {
                             days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                             daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                             daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                             months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                             monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                             today: "Today",
                             clear: "Clear",
                             titleFormat: "MM yyyy"
                         }
                     },
                     r = {
                         viewModes: [{
                             names: ["days", "month"],
                             clsName: "days",
                             e: "changeMonth"
                         }, {
                             names: ["months", "year"],
                             clsName: "months",
                             e: "changeYear",
                             navStep: 1
                         }, {
                             names: ["years", "decade"],
                             clsName: "years",
                             e: "changeDecade",
                             navStep: 10
                         }, {
                             names: ["decades", "century"],
                             clsName: "decades",
                             e: "changeCentury",
                             navStep: 100
                         }, {
                             names: ["centuries", "millennium"],
                             clsName: "centuries",
                             e: "changeMillennium",
                             navStep: 1e3
                         }],
                         validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
                         nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
                         parseFormat: function(a) {
                             if ("function" == typeof a.toValue && "function" == typeof a.toDisplay) return a;
                             var b = a.replace(this.validParts, "\0").split("\0"),
                                 c = a.match(this.validParts);
                             if (!b || !b.length || !c || 0 === c.length) throw new Error("Invalid date format.");
                             return {
                                 separators: b,
                                 parts: c
                             }
                         },
                         parseDate: function(c, e, f, g) {
                             function h(a, b) {
                                 return !0 === b && (b = 10), a < 100 && (a += 2e3) > (new Date).getFullYear() + b && (a -= 100), a
                             }

                             function i() {
                                 var a = this.slice(0, j[n].length),
                                     b = j[n].slice(0, a.length);
                                 return a.toLowerCase() === b.toLowerCase()
                             }
                             if (!c) return b;
                             if (c instanceof Date) return c;
                             if ("string" == typeof e && (e = r.parseFormat(e)), e.toValue) return e.toValue(c, e, f);
                             var j, l, m, n, o, p = {
                                     d: "moveDay",
                                     m: "moveMonth",
                                     w: "moveWeek",
                                     y: "moveYear"
                                 },
                                 s = {
                                     yesterday: "-1d",
                                     today: "+0d",
                                     tomorrow: "+1d"
                                 };
                             if (c in s && (c = s[c]), /^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/i.test(c)) {
                                 for (j = c.match(/([\-+]\d+)([dmwy])/gi), c = new Date, n = 0; n < j.length; n++) l = j[n].match(/([\-+]\d+)([dmwy])/i), m = Number(l[1]), o = p[l[2].toLowerCase()], c = k.prototype[o](c, m);
                                 return k.prototype._zero_utc_time(c)
                             }
                             j = c && c.match(this.nonpunctuation) || [];
                             var t, u, v = {},
                                 w = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"],
                                 x = {
                                     yyyy: function(a, b) {
                                         return a.setUTCFullYear(g ? h(b, g) : b)
                                     },
                                     m: function(a, b) {
                                         if (isNaN(a)) return a;
                                         for (b -= 1; b < 0;) b += 12;
                                         for (b %= 12, a.setUTCMonth(b); a.getUTCMonth() !== b;) a.setUTCDate(a.getUTCDate() - 1);
                                         return a
                                     },
                                     d: function(a, b) {
                                         return a.setUTCDate(b)
                                     }
                                 };
                             x.yy = x.yyyy, x.M = x.MM = x.mm = x.m, x.dd = x.d, c = d();
                             var y = e.parts.slice();
                             if (j.length !== y.length && (y = a(y).filter(function(b, c) {
                                     return -1 !== a.inArray(c, w)
                                 }).toArray()), j.length === y.length) {
                                 var z;
                                 for (n = 0, z = y.length; n < z; n++) {
                                     if (t = parseInt(j[n], 10), l = y[n], isNaN(t)) switch (l) {
                                         case "MM":
                                             u = a(q[f].months).filter(i), t = a.inArray(u[0], q[f].months) + 1;
                                             break;
                                         case "M":
                                             u = a(q[f].monthsShort).filter(i), t = a.inArray(u[0], q[f].monthsShort) + 1
                                     }
                                     v[l] = t
                                 }
                                 var A, B;
                                 for (n = 0; n < w.length; n++)(B = w[n]) in v && !isNaN(v[B]) && (A = new Date(c), x[B](A, v[B]), isNaN(A) || (c = A))
                             }
                             return c
                         },
                         formatDate: function(b, c, d) {
                             if (!b) return "";
                             if ("string" == typeof c && (c = r.parseFormat(c)), c.toDisplay) return c.toDisplay(b, c, d);
                             var e = {
                                 d: b.getUTCDate(),
                                 D: q[d].daysShort[b.getUTCDay()],
                                 DD: q[d].days[b.getUTCDay()],
                                 m: b.getUTCMonth() + 1,
                                 M: q[d].monthsShort[b.getUTCMonth()],
                                 MM: q[d].months[b.getUTCMonth()],
                                 yy: b.getUTCFullYear().toString().substring(2),
                                 yyyy: b.getUTCFullYear()
                             };
                             e.dd = (e.d < 10 ? "0" : "") + e.d, e.mm = (e.m < 10 ? "0" : "") + e.m, b = [];
                             for (var f = a.extend([], c.separators), g = 0, h = c.parts.length; g <= h; g++) f.length && b.push(f.shift()), b.push(e[c.parts[g]]);
                             return b.join("")
                         },
                         headTemplate: '<thead><tr><th colspan="7" class="datepicker-title"></th></tr><tr><th class="prev">' + o.templates.leftArrow + '</th><th colspan="5" class="datepicker-switch"></th><th class="next">' + o.templates.rightArrow + "</th></tr></thead>",
                         contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
                         footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
                     };
                 r.template = '<div class="datepicker"><div class="datepicker-days"><table class="table-condensed">' + r.headTemplate + "<tbody></tbody>" + r.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + r.headTemplate + r.contTemplate + r.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + r.headTemplate + r.contTemplate + r.footTemplate + '</table></div><div class="datepicker-decades"><table class="table-condensed">' + r.headTemplate + r.contTemplate + r.footTemplate + '</table></div><div class="datepicker-centuries"><table class="table-condensed">' + r.headTemplate + r.contTemplate + r.footTemplate + "</table></div></div>", a.fn.datepicker.DPGlobal = r, a.fn.datepicker.noConflict = function() {
                     return a.fn.datepicker = m, this
                 }, a.fn.datepicker.version = "1.9.0", a.fn.datepicker.deprecated = function(a) {
                     var b = window.console;
                     b && b.warn && b.warn("DEPRECATED: " + a)
                 }, a(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function(b) {
                     var c = a(this);
                     c.data("datepicker") || (b.preventDefault(), n.call(c, "show"))
                 }), a(function() {
                     n.call(a('[data-provide="datepicker-inline"]'))
                 })
             });; ! function(a) {
                 a.fn.datepicker.dates['vi'] = {
                     days: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"],
                     daysShort: ["CN", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
                     daysMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
                     months: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
                     monthsShort: ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7", "Th8", "Th9", "Th10", "Th11", "Th12"],
                     today: "Hôm nay",
                     clear: "Xóa",
                     format: "dd/mm/yyyy"
                 }
             }(jQuery);; ! function(i) {
                 "use strict";
                 "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
             }(function(i) {
                 "use strict";
                 var e = window.Slick || {};
                 (e = function() {
                     var e = 0;
                     return function(t, o) {
                         var s, n = this;
                         n.defaults = {
                             accessibility: !0,
                             adaptiveHeight: !1,
                             appendArrows: i(t),
                             appendDots: i(t),
                             arrows: !0,
                             asNavFor: null,
                             prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                             nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                             autoplay: !1,
                             autoplaySpeed: 3e3,
                             centerMode: !1,
                             centerPadding: "50px",
                             cssEase: "ease",
                             customPaging: function(e, t) {
                                 return i('<button type="button" />').text(t + 1)
                             },
                             dots: !1,
                             dotsClass: "slick-dots",
                             draggable: !0,
                             easing: "linear",
                             edgeFriction: .35,
                             fade: !1,
                             focusOnSelect: !1,
                             focusOnChange: !1,
                             infinite: !0,
                             initialSlide: 0,
                             lazyLoad: "ondemand",
                             mobileFirst: !1,
                             pauseOnHover: !0,
                             pauseOnFocus: !0,
                             pauseOnDotsHover: !1,
                             respondTo: "window",
                             responsive: null,
                             rows: 1,
                             rtl: !1,
                             slide: "",
                             slidesPerRow: 1,
                             slidesToShow: 1,
                             slidesToScroll: 1,
                             speed: 500,
                             swipe: !0,
                             swipeToSlide: !1,
                             touchMove: !0,
                             touchThreshold: 5,
                             useCSS: !0,
                             useTransform: !0,
                             variableWidth: !1,
                             vertical: !1,
                             verticalSwiping: !1,
                             waitForAnimate: !0,
                             zIndex: 1e3
                         }, n.initials = {
                             animating: !1,
                             dragging: !1,
                             autoPlayTimer: null,
                             currentDirection: 0,
                             currentLeft: null,
                             currentSlide: 0,
                             direction: 1,
                             $dots: null,
                             listWidth: null,
                             listHeight: null,
                             loadIndex: 0,
                             $nextArrow: null,
                             $prevArrow: null,
                             scrolling: !1,
                             slideCount: null,
                             slideWidth: null,
                             $slideTrack: null,
                             $slides: null,
                             sliding: !1,
                             slideOffset: 0,
                             swipeLeft: null,
                             swiping: !1,
                             $list: null,
                             touchObject: {},
                             transformsEnabled: !1,
                             unslicked: !1
                         }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(t), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(t).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
                     }
                 }()).prototype.activateADA = function() {
                     this.$slideTrack.find(".slick-active").attr({
                         "aria-hidden": "false"
                     }).find("a, input, button, select").attr({
                         tabindex: "0"
                     })
                 }, e.prototype.addSlide = e.prototype.slickAdd = function(e, t, o) {
                     var s = this;
                     if ("boolean" == typeof t) o = t, t = null;
                     else if (t < 0 || t >= s.slideCount) return !1;
                     s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function(e, t) {
                         i(t).attr("data-slick-index", e)
                     }), s.$slidesCache = s.$slides, s.reinit()
                 }, e.prototype.animateHeight = function() {
                     var i = this;
                     if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
                         var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
                         i.$list.animate({
                             height: e
                         }, i.options.speed)
                     }
                 }, e.prototype.animateSlide = function(e, t) {
                     var o = {},
                         s = this;
                     s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
                         left: e
                     }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
                         top: e
                     }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), i({
                         animStart: s.currentLeft
                     }).animate({
                         animStart: e
                     }, {
                         duration: s.options.speed,
                         easing: s.options.easing,
                         step: function(i) {
                             i = Math.ceil(i), !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o))
                         },
                         complete: function() {
                             t && t.call()
                         }
                     })) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function() {
                         s.disableTransition(), t.call()
                     }, s.options.speed))
                 }, e.prototype.getNavTarget = function() {
                     var e = this,
                         t = e.options.asNavFor;
                     return t && null !== t && (t = i(t).not(e.$slider)), t
                 }, e.prototype.asNavFor = function(e) {
                     var t = this.getNavTarget();
                     null !== t && "object" == typeof t && t.each(function() {
                         var t = i(this).slick("getSlick");
                         t.unslicked || t.slideHandler(e, !0)
                     })
                 }, e.prototype.applyTransition = function(i) {
                     var e = this,
                         t = {};
                     !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
                 }, e.prototype.autoPlay = function() {
                     var i = this;
                     i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
                 }, e.prototype.autoPlayClear = function() {
                     var i = this;
                     i.autoPlayTimer && clearInterval(i.autoPlayTimer)
                 }, e.prototype.autoPlayIterator = function() {
                     var i = this,
                         e = i.currentSlide + i.options.slidesToScroll;
                     i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e))
                 }, e.prototype.buildArrows = function() {
                     var e = this;
                     !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
                         "aria-disabled": "true",
                         tabindex: "-1"
                     }))
                 }, e.prototype.buildDots = function() {
                     var e, t, o = this;
                     if (!0 === o.options.dots) {
                         for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
                         o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active")
                     }
                 }, e.prototype.buildOut = function() {
                     var e = this;
                     e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, t) {
                         i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "")
                     }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
                 }, e.prototype.buildRows = function() {
                     var i, e, t, o, s, n, r, l = this;
                     if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 1) {
                         for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
                             var d = document.createElement("div");
                             for (e = 0; e < l.options.rows; e++) {
                                 var a = document.createElement("div");
                                 for (t = 0; t < l.options.slidesPerRow; t++) {
                                     var c = i * r + (e * l.options.slidesPerRow + t);
                                     n.get(c) && a.appendChild(n.get(c))
                                 }
                                 d.appendChild(a)
                             }
                             o.appendChild(d)
                         }
                         l.$slider.empty().append(o), l.$slider.children().children().children().css({
                             width: 100 / l.options.slidesPerRow + "%",
                             display: "inline-block"
                         })
                     }
                 }, e.prototype.checkResponsive = function(e, t) {
                     var o, s, n, r = this,
                         l = !1,
                         d = r.$slider.width(),
                         a = window.innerWidth || i(window).width();
                     if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
                         s = null;
                         for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
                         null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || !1 === l || r.$slider.trigger("breakpoint", [r, l])
                     }
                 }, e.prototype.changeSlide = function(e, t) {
                     var o, s, n, r = this,
                         l = i(e.currentTarget);
                     switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll != 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
                         case "previous":
                             s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
                             break;
                         case "next":
                             s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
                             break;
                         case "index":
                             var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
                             r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus");
                             break;
                         default:
                             return
                     }
                 }, e.prototype.checkNavigable = function(i) {
                     var e, t;
                     if (e = this.getNavigableIndexes(), t = 0, i > e[e.length - 1]) i = e[e.length - 1];
                     else
                         for (var o in e) {
                             if (i < e[o]) {
                                 i = t;
                                 break
                             }
                             t = e[o]
                         }
                     return i
                 }, e.prototype.cleanUpEvents = function() {
                     var e = this;
                     e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
                 }, e.prototype.cleanUpSlideEvents = function() {
                     var e = this;
                     e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1))
                 }, e.prototype.cleanUpRows = function() {
                     var i, e = this;
                     e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(i))
                 }, e.prototype.clickHandler = function(i) {
                     !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault())
                 }, e.prototype.destroy = function(e) {
                     var t = this;
                     t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                         i(this).attr("style", i(this).data("originalStyling"))
                     }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
                 }, e.prototype.disableTransition = function(i) {
                     var e = this,
                         t = {};
                     t[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
                 }, e.prototype.fadeSlide = function(i, e) {
                     var t = this;
                     !1 === t.cssTransitions ? (t.$slides.eq(i).css({
                         zIndex: t.options.zIndex
                     }), t.$slides.eq(i).animate({
                         opacity: 1
                     }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({
                         opacity: 1,
                         zIndex: t.options.zIndex
                     }), e && setTimeout(function() {
                         t.disableTransition(i), e.call()
                     }, t.options.speed))
                 }, e.prototype.fadeSlideOut = function(i) {
                     var e = this;
                     !1 === e.cssTransitions ? e.$slides.eq(i).animate({
                         opacity: 0,
                         zIndex: e.options.zIndex - 2
                     }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({
                         opacity: 0,
                         zIndex: e.options.zIndex - 2
                     }))
                 }, e.prototype.filterSlides = e.prototype.slickFilter = function(i) {
                     var e = this;
                     null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit())
                 }, e.prototype.focusHandler = function() {
                     var e = this;
                     e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(t) {
                         t.stopImmediatePropagation();
                         var o = i(this);
                         setTimeout(function() {
                             e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay())
                         }, 0)
                     })
                 }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
                     return this.currentSlide
                 }, e.prototype.getDotCount = function() {
                     var i = this,
                         e = 0,
                         t = 0,
                         o = 0;
                     if (!0 === i.options.infinite)
                         if (i.slideCount <= i.options.slidesToShow) ++o;
                         else
                             for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
                     else if (!0 === i.options.centerMode) o = i.slideCount;
                     else if (i.options.asNavFor)
                         for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
                     else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
                     return o - 1
                 }, e.prototype.getLeft = function(i) {
                     var e, t, o, s, n = this,
                         r = 0;
                     return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, r = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e
                 }, e.prototype.getOption = e.prototype.slickGetOption = function(i) {
                     return this.options[i]
                 }, e.prototype.getNavigableIndexes = function() {
                     var i, e = this,
                         t = 0,
                         o = 0,
                         s = [];
                     for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, i = 2 * e.slideCount); t < i;) s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
                     return s
                 }, e.prototype.getSlick = function() {
                     return this
                 }, e.prototype.getSlideCount = function() {
                     var e, t, o = this;
                     return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function(s, n) {
                         if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft) return e = n, !1
                     }), Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
                 }, e.prototype.goTo = e.prototype.slickGoTo = function(i, e) {
                     this.changeSlide({
                         data: {
                             message: "index",
                             index: parseInt(i)
                         }
                     }, e)
                 }, e.prototype.init = function(e) {
                     var t = this;
                     i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
                 }, e.prototype.initADA = function() {
                     var e = this,
                         t = Math.ceil(e.slideCount / e.options.slidesToShow),
                         o = e.getNavigableIndexes().filter(function(i) {
                             return i >= 0 && i < e.slideCount
                         });
                     e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
                         "aria-hidden": "true",
                         tabindex: "-1"
                     }).find("a, input, button, select").attr({
                         tabindex: "-1"
                     }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t) {
                         var s = o.indexOf(t);
                         i(this).attr({
                             role: "tabpanel",
                             id: "slick-slide" + e.instanceUid + t,
                             tabindex: -1
                         }), -1 !== s && i(this).attr({
                             "aria-describedby": "slick-slide-control" + e.instanceUid + s
                         })
                     }), e.$dots.attr("role", "tablist").find("li").each(function(s) {
                         var n = o[s];
                         i(this).attr({
                             role: "presentation"
                         }), i(this).find("button").first().attr({
                             role: "tab",
                             id: "slick-slide-control" + e.instanceUid + s,
                             "aria-controls": "slick-slide" + e.instanceUid + n,
                             "aria-label": s + 1 + " of " + t,
                             "aria-selected": null,
                             tabindex: "-1"
                         })
                     }).eq(e.currentSlide).find("button").attr({
                         "aria-selected": "true",
                         tabindex: "0"
                     }).end());
                     for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) e.$slides.eq(s).attr("tabindex", 0);
                     e.activateADA()
                 }, e.prototype.initArrowEvents = function() {
                     var i = this;
                     !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
                         message: "previous"
                     }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", {
                         message: "next"
                     }, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler)))
                 }, e.prototype.initDotEvents = function() {
                     var e = this;
                     !0 === e.options.dots && (i("li", e.$dots).on("click.slick", {
                         message: "index"
                     }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1))
                 }, e.prototype.initSlideEvents = function() {
                     var e = this;
                     e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)))
                 }, e.prototype.initializeEvents = function() {
                     var e = this;
                     e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
                         action: "start"
                     }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
                         action: "move"
                     }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
                         action: "end"
                     }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
                         action: "end"
                     }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition)
                 }, e.prototype.initUI = function() {
                     var i = this;
                     !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show()
                 }, e.prototype.keyHandler = function(i) {
                     var e = this;
                     i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({
                         data: {
                             message: !0 === e.options.rtl ? "next" : "previous"
                         }
                     }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({
                         data: {
                             message: !0 === e.options.rtl ? "previous" : "next"
                         }
                     }))
                 }, e.prototype.lazyLoad = function() {
                     function e(e) {
                         i("img[data-lazy]", e).each(function() {
                             var e = i(this),
                                 t = i(this).attr("data-lazy"),
                                 o = i(this).attr("data-srcset"),
                                 s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
                                 r = document.createElement("img");
                             r.onload = function() {
                                 e.animate({
                                     opacity: 0
                                 }, 100, function() {
                                     o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({
                                         opacity: 1
                                     }, 200, function() {
                                         e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                                     }), n.$slider.trigger("lazyLoaded", [n, e, t])
                                 })
                             }, r.onerror = function() {
                                 e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, t])
                             }, r.src = t
                         })
                     }
                     var t, o, s, n = this;
                     if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, s = Math.ceil(o + n.options.slidesToShow), !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)), t = n.$slider.find(".slick-slide").slice(o, s), "anticipated" === n.options.lazyLoad)
                         for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++) r < 0 && (r = n.slideCount - 1), t = (t = t.add(d.eq(r))).add(d.eq(l)), r--, l++;
                     e(t), n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
                 }, e.prototype.loadSlider = function() {
                     var i = this;
                     i.setPosition(), i.$slideTrack.css({
                         opacity: 1
                     }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
                 }, e.prototype.next = e.prototype.slickNext = function() {
                     this.changeSlide({
                         data: {
                             message: "next"
                         }
                     })
                 }, e.prototype.orientationChange = function() {
                     var i = this;
                     i.checkResponsive(), i.setPosition()
                 }, e.prototype.pause = e.prototype.slickPause = function() {
                     var i = this;
                     i.autoPlayClear(), i.paused = !0
                 }, e.prototype.play = e.prototype.slickPlay = function() {
                     var i = this;
                     i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1
                 }, e.prototype.postSlide = function(e) {
                     var t = this;
                     t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()))
                 }, e.prototype.prev = e.prototype.slickPrev = function() {
                     this.changeSlide({
                         data: {
                             message: "previous"
                         }
                     })
                 }, e.prototype.preventDefault = function(i) {
                     i.preventDefault()
                 }, e.prototype.progressiveLazyLoad = function(e) {
                     e = e || 1;
                     var t, o, s, n, r, l = this,
                         d = i("img[data-lazy]", l.$slider);
                     d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function() {
                         s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === l.options.adaptiveHeight && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad()
                     }, r.onerror = function() {
                         e < 3 ? setTimeout(function() {
                             l.progressiveLazyLoad(e + 1)
                         }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad())
                     }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l])
                 }, e.prototype.refresh = function(e) {
                     var t, o, s = this;
                     o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, {
                         currentSlide: t
                     }), s.init(), e || s.changeSlide({
                         data: {
                             message: "index",
                             index: t
                         }
                     }, !1)
                 }, e.prototype.registerBreakpoints = function() {
                     var e, t, o, s = this,
                         n = s.options.responsive || null;
                     if ("array" === i.type(n) && n.length) {
                         s.respondTo = s.options.respondTo || "window";
                         for (e in n)
                             if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) {
                                 for (t = n[e].breakpoint; o >= 0;) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
                                 s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings
                             } s.breakpoints.sort(function(i, e) {
                             return s.options.mobileFirst ? i - e : e - i
                         })
                     }
                 }, e.prototype.reinit = function() {
                     var e = this;
                     e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
                 }, e.prototype.resize = function() {
                     var e = this;
                     i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
                         e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
                     }, 50))
                 }, e.prototype.removeSlide = e.prototype.slickRemove = function(i, e, t) {
                     var o = this;
                     if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i, o.slideCount < 1 || i < 0 || i > o.slideCount - 1) return !1;
                     o.unload(), !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit()
                 }, e.prototype.setCSS = function(i) {
                     var e, t, o = this,
                         s = {};
                     !0 === o.options.rtl && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s)))
                 }, e.prototype.setDimensions = function() {
                     var i = this;
                     !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({
                         padding: "0px " + i.options.centerPadding
                     }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({
                         padding: i.options.centerPadding + " 0px"
                     })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
                     var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
                     !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
                 }, e.prototype.setFade = function() {
                     var e, t = this;
                     t.$slides.each(function(o, s) {
                         e = t.slideWidth * o * -1, !0 === t.options.rtl ? i(s).css({
                             position: "relative",
                             right: e,
                             top: 0,
                             zIndex: t.options.zIndex - 2,
                             opacity: 0
                         }) : i(s).css({
                             position: "relative",
                             left: e,
                             top: 0,
                             zIndex: t.options.zIndex - 2,
                             opacity: 0
                         })
                     }), t.$slides.eq(t.currentSlide).css({
                         zIndex: t.options.zIndex - 1,
                         opacity: 1
                     })
                 }, e.prototype.setHeight = function() {
                     var i = this;
                     if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
                         var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
                         i.$list.css("height", e)
                     }
                 }, e.prototype.setOption = e.prototype.slickSetOption = function() {
                     var e, t, o, s, n, r = this,
                         l = !1;
                     if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) r.options[o] = s;
                     else if ("multiple" === n) i.each(o, function(i, e) {
                         r.options[i] = e
                     });
                     else if ("responsive" === n)
                         for (t in s)
                             if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]];
                             else {
                                 for (e = r.options.responsive.length - 1; e >= 0;) r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
                                 r.options.responsive.push(s[t])
                             } l && (r.unload(), r.reinit())
                 }, e.prototype.setPosition = function() {
                     var i = this;
                     i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i])
                 }, e.prototype.setProps = function() {
                     var i = this,
                         e = document.body.style;
                     i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType
                 }, e.prototype.setSlideClasses = function(i) {
                     var e, t, o, s, n = this;
                     if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), !0 === n.options.centerMode) {
                         var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
                         e = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center")
                     } else i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = !0 === n.options.infinite ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
                     "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
                 }, e.prototype.setupInfinite = function() {
                     var e, t, o, s = this;
                     if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (t = null, s.slideCount > s.options.slidesToShow)) {
                         for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1) t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
                         for (e = 0; e < o + s.slideCount; e += 1) t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
                         s.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                             i(this).attr("id", "")
                         })
                     }
                 }, e.prototype.interrupt = function(i) {
                     var e = this;
                     i || e.autoPlay(), e.interrupted = i
                 }, e.prototype.selectHandler = function(e) {
                     var t = this,
                         o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
                         s = parseInt(o.attr("data-slick-index"));
                     s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s)
                 }, e.prototype.slideHandler = function(i, e, t) {
                     var o, s, n, r, l, d = null,
                         a = this;
                     if (e = e || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i))
                         if (!1 === e && a.asNavFor(i), o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function() {
                             a.postSlide(o)
                         }) : a.postSlide(o));
                         else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function() {
                         a.postSlide(o)
                     }) : a.postSlide(o));
                     else {
                         if (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), !0 === a.options.fade) return !0 !== t ? (a.fadeSlideOut(n), a.fadeSlide(s, function() {
                             a.postSlide(s)
                         })) : a.postSlide(s), void a.animateHeight();
                         !0 !== t ? a.animateSlide(d, function() {
                             a.postSlide(s)
                         }) : a.postSlide(s)
                     }
                 }, e.prototype.startLoad = function() {
                     var i = this;
                     !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading")
                 }, e.prototype.swipeDirection = function() {
                     var i, e, t, o, s = this;
                     return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical"
                 }, e.prototype.swipeEnd = function(i) {
                     var e, t, o = this;
                     if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1;
                     if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
                     if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
                         switch (t = o.swipeDirection()) {
                             case "left":
                             case "down":
                                 e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                                 break;
                             case "right":
                             case "up":
                                 e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
                         }
                         "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]))
                     } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
                 }, e.prototype.swipeHandler = function(i) {
                     var e = this;
                     if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
                         case "start":
                             e.swipeStart(i);
                             break;
                         case "move":
                             e.swipeMove(i);
                             break;
                         case "end":
                             e.swipeEnd(i)
                     }
                 }, e.prototype.swipeMove = function(i) {
                     var e, t, o, s, n, r, l = this;
                     return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s), !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft))))
                 }, e.prototype.swipeStart = function(i) {
                     var e, t = this;
                     if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, !1;
                     void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, t.dragging = !0
                 }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
                     var i = this;
                     null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit())
                 }, e.prototype.unload = function() {
                     var e = this;
                     i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
                 }, e.prototype.unslick = function(i) {
                     var e = this;
                     e.$slider.trigger("unslick", [e, i]), e.destroy()
                 }, e.prototype.updateArrows = function() {
                     var i = this;
                     Math.floor(i.options.slidesToShow / 2), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
                 }, e.prototype.updateDots = function() {
                     var i = this;
                     null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"))
                 }, e.prototype.visibility = function() {
                     var i = this;
                     i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
                 }, i.fn.slick = function() {
                     var i, t, o = this,
                         s = arguments[0],
                         n = Array.prototype.slice.call(arguments, 1),
                         r = o.length;
                     for (i = 0; i < r; i++)
                         if ("object" == typeof s || void 0 === s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), void 0 !== t) return t;
                     return o
                 }
             });;