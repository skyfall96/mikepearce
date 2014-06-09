define(function(require, exports, module) {
	// import dependencies
	var Engine = require('famous/core/Engine');
	var Surface = require('famous/core/Surface');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var GridLayout = require('famous/views/GridLayout');

	// create the main context
	var mainContext = Engine.createContext();

	var grid = new GridLayout({
		dimensions: [50, 10]
	});

	var surfaces = [];


	var _randomColor = function() {
        var _rgb = function() {
            var color = Math.round(Math.random() * 255).toString(16);
            if (color.length !== 2) {
                color + '0' + color;
            }
            return color;
        };
		
        return _rgb() + _rgb() + _rgb();
	};

    var startColor = 'ffffff';//_randomColor();
    var endColor = _randomColor();

	for (var i = 1; i <= 500; i += 1) {
		var bgColor = MP.util.generateColorBetweenTwoColors(startColor, endColor, Math.random());
		surfaces.push(new Surface({
			properties: {
				backgroundColor: '#' + bgColor,
				borderRadius: '4px'
			}
		}));
	}

	grid.sequenceFrom(surfaces);

	mainContext.add(grid);
});
