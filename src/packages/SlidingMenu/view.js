;(function() {

    var moarbb = window.moarbb = window.moarbb || {},
        views = moarbb.views = moarbb.views || {};

    views.SlidingMenuView = Backbone.View.extend({

        className: 'slidingMenuView',
        template: moarbb.templates['SlidingMenu'],
        events: {
            'click .burger': '_onBurgerClick',
            'mousedown .burger': '_onBurgerStartDrag',
            'touchstart .burger': '_onBurgerStartDrag',
            'mousemove': '_onMouseMove',
            'touchmove': '_onTouchMove',
            'mouseup': '_onMouseUp',
            'touchend': '_onTouchEnd'
        },
        
        initialize: function(params) {
            if (!params.content) {
                throw 'You must supply a content parameter';
            }

            if (!params.menu) {
                throw 'You must supply a menu parameter';
            }

            this._content = params.content;
            this._menu = params.menu;
            this._header = params.header;
            this._menuIsOpen = false;
            this._hideBurger = params.hideBurger != null ? params.hideBurger : false;
            this._menuIsOpenOnLoad = params.menuOpen != null ? params.menuOpen : false;
            this._menuWidth = params.menuWidth || 300;
        },

        render: function() {
            this.$el.html(this.template({}));
            this.setContent(this._content);
            this.setMenu(this._menu);
            this.setHeader(this._header);

            if (this._hideBurger) {
                this.$('.burger').hide();
            }
            if (this._menuIsOpenOnLoad) {
                this.openMenu(true);
            }
            return this;
        },

        remove: function() {
            this.stopListening();
            this.$el.remove();
            this._content.remove();
            this._menu.remove();
            this._headerView && this._headerView.remove();
            return this;
        },

        toggleMenu: function() {
            if (this._menuIsOpen) {
                this.closeMenu();
            }
            else {
                this.openMenu();
            }
        },

        openMenu: function(immediate, force) {
            if (!force && this._menuIsOpen) {
                return;
            }

            this._setMenuTargetTranslate(this._menuWidth, immediate);
            this._menuIsOpen = true;
        },

        closeMenu: function(immediate, force) {
            if (!force && !this._menuIsOpen) {
                return;
            }

            this._setMenuTargetTranslate(0, immediate);
            this._menuIsOpen = false;
        },

        setMenu: function(view) {
            if (this._menu != view) {
                this._menu && this._menu.remove();
            }
            this._menu = view;
            this.$('.menu').append(this._menu.$el);
            this._menu.render();
        },

        setContent: function(view, keepMenuOpen) {
            if (this._content != view) {
                this._content && this._content.remove();
            }
            this._content = view;
            this.$('.content').append(this._content.$el);
            this._content.render();

            if (!keepMenuOpen) {
                this.closeMenu();
            }

            this._setHeaderPadding();
        },

        setHeader: function(view) {
            if (this._header != view) {
                this._header && this._header.remove();
            }

            if (!this._header) {
                return;
            }

            this._header = view;
            this.$('.headerContent').append(this._header.$el);
            this._header.render();

            this._setHeaderPadding();
        },

        _setHeaderPadding: function() {
            this.$('.content').css({
                'padding-top': this.$('.header').outerHeight()
            });
        },

        _setMenuTargetTranslate: function(x, immediate) {
            var $container = this.$('.container');
            if (immediate) {
                $container.removeClass('animated');
            }
            else {
                $container.addClass('animated');
            }

            x = Math.max(0, Math.min(this._menuWidth, x));

            $container.css({
                '-webkit-transform': 'translate(' + x + 'px, 0)',
                '-ms-transform': 'translate(' + x + 'px, 0)',
                'transform': 'translate(' + x + 'px, 0)'
            });
        },

        _onBurgerClick: function() {
        },

        _onBurgerStartDrag: function(e) {
            this._startMenuDrag(e);
            return false;
        },

        _startMenuDrag: function(e) {
            this._menuDragging = true;
            this._mouseDownPosition = this._getPageOffsets(e);
            this._lastMousePosition = this._mouseDownPosition;
        },

        _onTouchMove: function(e) {
            this._onMouseMove(e);
        },

        _onMouseMove: function(e) {
            if (!this._menuDragging) {
                return true;
            }

            this._lastMousePosition = this._getPageOffsets(e);
            var dx = this._getDragTranslate().x,
                tx = this._menuIsOpen
                    ? this._menuWidth + dx
                    : dx;

            this._setMenuTargetTranslate(tx, true);
            return false;
        },

        _onTouchEnd: function(e) {
            this._onMouseUp(e);
        },

        _onMouseUp: function(e) {
            if (this._menuDragging) {
                this._menuDragging = false;
                
                var dx = this._getDragTranslate().x;
                if (Math.abs(dx) > 3) {
                    var tx = this._menuIsOpen
                            ? this._menuWidth + dx
                            : dx;
                    tx = Math.max(0, Math.min(this._menuWidth, tx));
                    if (tx >= this._menuWidth / 2) {
                        this.openMenu(false, true);
                    }
                    else {
                        this.closeMenu(false, true);
                    }
                }
                else {
                    this.toggleMenu();
                }
                return false;
            }
            return true;
        },

        _getDragTranslate: function() {
            return {
                x: this._lastMousePosition.x - this._mouseDownPosition.x,
                y: this._lastMousePosition.y - this._mouseDownPosition.y
            };
        },

        _getPageOffsets: function(e) {
            if (e.originalEvent.touches) {
                return {
                    x: e.originalEvent.touches[0].pageX,
                    y: e.originalEvent.touches[0].pageY
                };
            }

            return {
                x: e.pageX,
                y: e.pageY
            };
        }
    });
})();