var MP = {
	$commandLine: null,

	initialize: function() {
		this.setupCommandLine();
	},

	setupCommandLine: function() {
		this.$commandLine = document.getElementById('commandLine');

		this.$commandLine.onkeyup = _.bind(this.listenToCommandLine, this);

		this.$commandLine.focus();
	},

	listenToCommandLine: function(evt) {
		if (event.which !== 13) { //only care if enter/return is pressed
			return;
		}

		var command = window.btoa(evt.target.value);

		if (!command.length) {
			return;
		}

		this.clearCommandLine();

		switch (command) {
			case 'YWRkIHN0b2Nr':
				this.executeAlphaSequence();
				break;
			case 'dmlldyBzdG9ja3M=':
				this.executeBetaSequence();
				break;
		}
	},

	clearCommandLine: function() {
		this.$commandLine.value = '';
	},

	executeAlphaSequence: function() {

	},

	executeBetaSequence: function() {

	}
};