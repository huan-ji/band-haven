var AlbumStore = require('../../stores/album');
var ApiActions = require('../../actions/api_actions');

var Player = {
	play: function () {
		// debugger;
		var playing = AlbumStore.selectedSong().playing;
		if (this.music.paused && playing) {
			this.music.play();

		} else if (!this.music.paused && !playing) {
			this.music.pause();

		}

		var that = this;



		this.music.addEventListener("canplaythrough", function () {
			that.duration = that.music.duration;
		}, false);
	},

	setup: function () {
		var that = this;
		this.music = document.getElementById('music'); // id for audio element

		this.duration = this.music.duration;
		this.pButton = document.getElementById('pButton');
		this.playhead = document.getElementById('playhead');
		this.timeline = document.getElementById('timeline');
		this.timelineWidth = this.timeline.offsetWidth - this.playhead.offsetWidth;
		this.playhead.addEventListener('mousedown', mouseDown, false);

		this.timeline.addEventListener("click", function (event) {
			moveplayhead(event);
			that.music.currentTime = that.duration * clickPercent(event);
		}, false);

		window.addEventListener('mouseup', mouseUp, false);
		this.music.addEventListener("timeupdate", timeUpdate, false);

		if (document.getElementById('pButton2')) {
			// debugger;
			this.pButton2 = document.getElementById('pButton2');
			this.playhead2 = document.getElementById('playhead2');
			this.timeline2 = document.getElementById('timeline2');
			this.timelineWidth2 = this.timeline2.offsetWidth - this.playhead2.offsetWidth;
			this.playhead2.addEventListener('mousedown', mouseDown2, false);
			this.timeline2.addEventListener("click", function (event) {
				moveplayhead2(event);
				that.music.currentTime = that.duration * clickPercent2(event);
			}, false);
		}


	},

}

module.exports = Player;

function clickPercent(e) {
	return (e.pageX - $(Player.timeline).offset().left) / Player.timelineWidth;
}

function clickPercent2(e) {
	return (e.pageX - $(Player.timeline2).offset().left) / Player.timelineWidth2;
}


// returns click as decimal (.77) of the total timelineWidth

// Makes playhead draggable

var onplayhead2 = false;

function mouseDown2() {
	onplayhead2 = true;
	window.addEventListener('mousemove', moveplayhead2, true);
	Player.music.removeEventListener('timeupdate', timeUpdate, false);
}

// Boolean value so that mouse is moved on mouseUp only when the playhead is released
var onplayhead = false;
// mouseDown EventListener
function mouseDown() {
	onplayhead = true;
	window.addEventListener('mousemove', moveplayhead, true);
	Player.music.removeEventListener('timeupdate', timeUpdate, false);
}
// mouseUp EventListener
// getting input from all mouse clicks
function mouseUp(e) {
	if (onplayhead == true) {
		moveplayhead(e);
		window.removeEventListener('mousemove', moveplayhead, true);
		// change current time
		Player.music.currentTime = Player.duration * clickPercent(e);
		Player.music.addEventListener('timeupdate', timeUpdate, false);
	} else if (onplayhead2 == true) {
		moveplayhead2(e);
		window.removeEventListener('mousemove', moveplayhead2, true);
		// change current time
		Player.music.currentTime = Player.duration * clickPercent2(e);
		Player.music.addEventListener('timeupdate', timeUpdate, false);
	}
	onplayhead = false;
	onplayhead2 = false;
}

function moveplayhead(e) {
	var newMargLeft = e.pageX - $(Player.timeline).offset().left;
	if (newMargLeft >= 0 && newMargLeft <= Player.timelineWidth) {
		Player.playhead.style.marginLeft = newMargLeft + "px";
	}
	if (newMargLeft < 0) {
		Player.playhead.style.marginLeft = "0px";
	}
	if (newMargLeft > Player.timelineWidth) {
		Player.playhead.style.marginLeft = Player.timelineWidth + "px";
	}
}

function moveplayhead2(e) {
	var newMargLeft = e.pageX - $(Player.timeline2).offset().left;
	if (newMargLeft >= 0 && newMargLeft <= Player.timelineWidth2) {
		Player.playhead2.style.marginLeft = newMargLeft + "px";
	}
	if (newMargLeft < 0) {
		Player.playhead2.style.marginLeft = "0px";
	}
	if (newMargLeft > Player.timelineWidth) {
		Player.playhead2.style.marginLeft = Player.timelineWidth2 + "px";
	}
}

// timeUpdate
// Synchronizes playhead position with current point in audio
function timeUpdate() {
	var playPercent = Player.timelineWidth * (Player.music.currentTime / Player.duration);
	Player.playhead.style.marginLeft = playPercent + "px";

	var playPercent2 = Player.timelineWidth2 * (Player.music.currentTime / Player.duration);
	Player.playhead2.style.marginLeft = playPercent2 + "px";


	if (Player.music.currentTime == Player.duration) {
		pButton.className = "";
		pButton.className = "play";
		ApiActions.playSwitch(false);
	}
}


// Gets audio file duration

module.exports = Player;
