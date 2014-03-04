var MP = MP || {};

MP.modal = function(config) {
	if (!config) {
		throw 'MP.modal.open requires a config object';
	}

	this.storeConfig(config);
};

MP.modal.prototype = {
	url: null,
	$modal: null,
	$shadowModal: null,

	storeConfig: function(config) {
		this.url = config.url;
	},

	open: function(config) {
		document.body.innerHTML += '<div id="shadowModal" class="shadowModal"><div id="modal" class="modal"></div></div>';

		this.$modal = document.getElementById('modal');
		this.$shadowModal = document.getElementById('shadowModal');

		this.load(this.url);
	},

	load: function(url) {
		if (!url) {
			return 'No url defined for modal load method';
		}

		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.onreadystatechange = _.bind(function() {
			if (xhr.readyState != 4 || xhr.status != 200) {
				return;
			}

			console.log(xhr.responseText);
			this.insertHtml(xhr.responseText);
		}, this);
		xhr.send(url);
	},

	insertHtml: function(html) {
		this.$modal.innerHTML = html;
	},

	close: function() {
		this.$shadowModal.parentNode.removeChild(this.$shadowModal);
	}
};