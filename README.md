MoarBB
======

A bunch of useful utils and views built on top of backbone.js

#Code
The development and production versions of the JS and CSS are available in the /bin directory

#Views
##SlidingMenuView

###Overview
Provides a view that lets you show/hide a menu like in mobile apps.  Features include:
 - Tap to open menu
 - Tap to close menu
 - Mouse support
 - Touch support
 - Drag menu open/close
 - Modifiable header, menu and content views

Based on backbone.js.  You can modify the styling of the view by overriding the view styles in your own code.

###Example
To see an example of the sliding menu view, visit: http://markdaws.net/moarbb/test/slidingmenu-test.html

To see a full code sample, look at: https://github.com/markdaws/MoarBB/blob/master/test/slidingmenu-test.html

###Dependencies
To use the moarbb.js library, you need to include http://jquery.com/download, http://backbonejs.org/ and http://underscorejs.org/ in your webpage.

###Initializing
```javascript
    var slidingMenu = new moarbb.views.SlidingMenuView({
    
        // optional - the view that appears in the header area
        header: new TestHeader({ testName: 'foo' }),

        // required - the view that appears in the content area
        content: new TestContent({ testName: 'abc'}),

        // required - the view that renders the menu
        menu: new TestMenu({}),

	      // If true the burger icon you can click on is hidden,                                                                    // then it is up to you to build the open/close dynamics
	      // in to your header view
	      hideBurger: false,
	      
	      // If true the menu initially appears open on load
	      menuOpen: false,
	      
	      // The width of the opened menu
	      menuWidth: 350
    });

    $('#content').append(slidingMenu.$el);
    slidingMenu.render();

    // In this example, when the user clicks on a menu item
    // we update the sliding menu content and header view
    slidingMenu.menu.on('menuItemClicked', function(index) {
        slidingMenu.setContent(new TestContent({ testName: index }));
        slidingMenu.setHeader(new TestHeader({ testName: index }));
    });

```

##Available Public methods
```javascript
// Programatically open/close the menu
slidingMenu.toggleMenu();

// Programatically open the menu
slidingMenu.openMenu();

// Progrramatically close the menu
slidingMenu.closeMenu();

// Sets the menu view
slidingMenu.setMenu(someMenuView);

// Sets the content view
slidingMenu.setContent(someContentView);

// Sets the header menu
slidingMenu.setHeader(someHeaderView);
```

#Development
```bash
npm install

#To run the test samples (http://localhost:9999/test/)
npm start

#To build new development versions of the files in /bin
grunt build-dev

#To build production versions in /bin 
#1. Change the version number in package.json (if checking in a new version)
grunt build-prod

#To have continuous build with file watch
grunt watch
```
