$(document).ready(function() {

    var headerView, contentView, menuView;

    menuView = new TestMenu({});
    var menu = new moarbb.views.SlidingMenuView({
        // optional
        //header: new TestHeader({ testName: 'foo' }),
        content: new TestContent({ testName: 'abc'}),
        menu: menuView
    });
    $('#content').append(menu.$el);
    menu.render();

    menuView.on('menuItemClicked', function(index) {
        menu.setContent(new TestContent({ testName: index }));
        //menu.setHeader(new TestHeader({ testName: index }));
    });
});


var TestContent = Backbone.View.extend({
    render: function() {
        for(var i=0; i<100; ++i) {
            this.$el.append($('<div style="width:200px;height:200px;margin-bottom:10px;' + 
                              'background-color:#0000ff;color:#fff;padding:10px;">' + 
                              this.options.testName + ' : ' + i 
                              + '</div>'));
        }
        this.$el.css({
            'background-color': '#ff0000'
        });
    }
});

var TestMenu = Backbone.View.extend({
    render: function() {
        var $ul = $('<ul style="margin:0"></ul>');
        for(var i=0; i<100; ++i) {
            $ul.append($('<li style="cursor:pointer;margin-bottom:10px;">Menu Item ' + i + '</li>'));
        }
        this.$el.append($ul);

        var self = this;
        this.$('li').click(function(e) {
            self.trigger('menuItemClicked', $(this).index());
        });

        this.$el.css({
            'background-color': '#aaaaaa'
        });
    }
});

var TestHeader = Backbone.View.extend({
    render: function() {
        this.$el.html($('<span>I am a header - ' +
                        this.options.testName
                        + '</span>'));
    }
});

/*
 TODOs

 - allow user to supply custom header
 - support Chrome/Firefox/IE9 +
 - support touch events
 - user supply custom content view
 - make sure content can scroll properly
 - click burger to toggle
 - drag burger
 - drag on body content (make option)
 - README.md

 - ability to change header, content
 - make content go under header ...

 - drag not working on desktop ...


FEATURES:
 - ability to change content dynamically ...
 - drag menu open/close
 - click to open/close
 - dynamically change header
 - dynamically change content



 */