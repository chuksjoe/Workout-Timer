class WorkoutTimer{
	constructor(){
		//Initialize the private props
		//h: hours, m: minutes, s: seconds
		this._h = 0; this._m = 0; this._s = 0;
		this._isRunning = false;
		this._isStopped = false;
	}
	//private method that increments the time variables
	_incrementTime(){
		this._s++;
		
		if(this._s > 59){
			this._s = 0;
			this._m++;
		}
		if(this._m > 59){
			this._m = 0;
			this._h++;
		}
	}
	isRunning(){
		return this._isRunning;
	}
	hasStopped(){
		return this._isStopped;
	}
	/*
	this method resets the time variables to 0 when the timer is stopped,
	and also calls the private running() function to continually increment
	the timer.
	*/
	start(){
		if(this._isStopped){
			this._h = this._m = this._s = 0;
			this._isStopped = false;
		}
		this._incrementTime();
		this._isRunning = true;
	}
	pause(){
		this._isRunning = false;
	}
	stop(){
		this.pause();
		this._isStopped = true;
	}
	
	toString(){
		let hr = this._h > 9 ? this._h : `0${this._h}`;
		let min = this._m > 9 ? this._m : `0${this._m}`;
		let sec = this._s > 9 ? this._s : `0${this._s}`;
		
		return hr + ':' + min + ':' + sec;
	}
}
/* =============  End of WorkoutTimer  ============================ */

const myTimer = new WorkoutTimer();
var runningTimer = null;
const timerDisplay = document.getElementById('timer-display');
const state = document.getElementById('state');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const stopBtn = document.getElementById('stop');

window.onload = function(){
	timerDisplay.innerHTML = '00:00:00';
	pauseBtn.disabled = 'disabled';
	stopBtn.disabled = 'disabled';
	state.textContent = 'Welcome';
}
function Timer(){
	myTimer.start();
	timerDisplay.innerHTML = myTimer.toString();
}
function startTimer(){
	if(myTimer.hasStopped()){
		timerDisplay.innerHTML = '00:00:00';
	}
	startBtn.disabled = 'disabled';
	stopBtn.disabled = null;
	pauseBtn.disabled = null;
	state.textContent = 'Running...';
	state.style.color = '#00b100';
	runningTimer = setInterval('Timer()', 1000);
}
function stopTimer(){
	myTimer.stop();
	stopBtn.disabled = 'disabled';
	pauseBtn.disabled = 'disabled';
	pauseBtn.innerHTML = 'Pause';
	startBtn.disabled = null;
	state.textContent = 'Stopped!';
	state.style.color = '#d50000';
	clearInterval(runningTimer);
}
function pauseTimer(){
	if(myTimer.isRunning()){
		myTimer.pause();
		pauseBtn.innerHTML = 'Continue';
		state.textContent = 'Paused';
		state.style.color = '#f7a300';
		clearInterval(runningTimer);
	}
	else{
		startTimer();
		pauseBtn.innerHTML = 'Pause';
	}
}