var Player = {
	//Play and Pause
	play: function () {
		// start music
		if (this.music.paused) {
			this.music.play();
			// remove play, add pause
			this.pButton.className = "";
			this.pButton.className = "pause";
		} else { // pause music
			this.music.pause();
			// remove pause, add play
			this.pButton.className = "";
			this.pButton.className = "play";
		}

		var that = this;



		this.music.addEventListener("canplaythrough", function () {
			that.duration = that.music.duration;
		}, false);
	},

	setup: function () {
		var that = this;
		this.music = document.getElementById('music'); // id for audio element
		this.duration = this.music.duration; // Duration of audio clip
		// debugger;


		this.pButton = document.getElementById('pButton'); // play button

		this.playhead = document.getElementById('playhead'); // playhead

		this.timeline = document.getElementById('timeline'); // timeline
		// timeline width adjusted for playhead
		this.timelineWidth = this.timeline.offsetWidth - this.playhead.offsetWidth;

		// timeupdate event listener


		this.playhead.addEventListener('mousedown', mouseDown, false);
		//Makes timeline clickable

		this.timeline.addEventListener("click", function (event) {

			moveplayhead(event);
			// debugger;
			that.music.currentTime = that.duration * clickPercent(event);
			// debugger;
		}, false);

		this.music.addEventListener("timeupdate", timeUpdate, false);
		window.addEventListener('mouseup', mouseUp, false);

	},

}

module.exports = Player;

function clickPercent(e) {
	return (e.pageX - $(Player.timeline).offset().left) / Player.timelineWidth;
}


// returns click as decimal (.77) of the total timelineWidth

// Makes playhead draggable

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
	}
	onplayhead = false;
}
// mousemove EventListener
// Moves playhead as user drags
function moveplayhead(e) {
	var newMargLeft = e.pageX - $(Player.timeline).offset().left;
	// debugger;
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

// timeUpdate
// Synchronizes playhead position with current point in audio
function timeUpdate() {
	var playPercent = Player.timelineWidth * (Player.music.currentTime / Player.duration);
	Player.playhead.style.marginLeft = playPercent + "px";

	if (Player.music.currentTime == Player.duration) {
		pButton.className = "";
		pButton.className = "play";
	}
}


// Gets audio file duration

module.exports = Player;
