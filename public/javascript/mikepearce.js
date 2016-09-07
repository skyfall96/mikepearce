var MP = {
	initialize: function() {
		// this.setupAudio();
		this.setupAnimations();
	},

	setupAudio: function() {
		var spinAudio = [];
		spinAudio.push(getNextAudio('spin'));

		var clickAudio = [];
		clickAudio.push(getNextAudio('click'));

		[].slice.call(document.getElementsByClassName('hex')).forEach(function(hex) {
			hex.addEventListener('mouseover', function() {
				play('spin');
			});
		});

		[].slice.call(document.getElementsByClassName('webicon')).forEach(function(webicon) {
			webicon.addEventListener('click', function() {
				play('click');
			});
		});

		function play(type) {
			var audio = getNextAudio(type);
			audio.play();
		}

		function getNextAudio(type) {
			var collection;

			switch (type) {
				case 'click':
						collection = clickAudio;
					break;
				case 'spin':
						collection = spinAudio;
					break;
			}

			var audio = collection.shift();
			if (!audio) {
				audio = createNewAudio(type, collection);
			}

			return audio;
		}

		function createNewAudio(type, collection) {
			var audio = new Audio();

			if (audio.canPlayType('audio/ogg')) {
				audio.src = '/audio/' + type + '.ogg';
			} else if (audio.canPlayType('audio/mp3')) {
				audio.src = '/audio/' + type + '.mp3';
			}

			if (type === 'spin') {
				audio.duration = 0.03;
				audio.volume = 0.3;
			} else if ('click') {
				audio.duration = 0.015
				audio.volume = 1;
			}

			audio.preload = 'auto';
			audio.load();
			audio.addEventListener('ended', function() {
				collection.push(audio);
			});

			return audio;
		}
	},

	setupAnimations: function() {
		[].slice.call(document.getElementsByClassName('webicon')).forEach(function(hex) {
			hex.addEventListener('click', handleAnimation);
		});

		function handleAnimation(evt) {
			evt.preventDefault();

			var hex = evt.target.parentNode.parentNode;

			hex.classList.add('swing');
			hex.addEventListener('animationend', function() {
				hex.removeEventListener('animationend', function() {});
				hex.classList.add('drop');
				hex.classList.remove('swing');
				setTimeout(function() {
					window.location.href = evt.target.href;
				}, 250);
			});
		}
	}
};
