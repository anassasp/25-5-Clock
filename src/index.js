import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      wMinute: 25,
      bMinute: 5,
      session: "Session",
      time: 1500,
      pause: true,
      play: false
    };
    this.timer = 0;

    this.setTimer = this.setTimer.bind(this);
    this.playTimer = this.playTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resetPlayer = this.resetPlayer.bind(this);
    this.changeSessionTime = this.changeSessionTime.bind(this);
    this.changeBreakTime = this.changeBreakTime.bind(this);
  }

  playTimer(){

    if(this.state.pause === false){
      if(this.state.time === 0){
        clearInterval(this.timer);
        this.audio.play();
        if(this.state.session === "Session"){
          this.setState(state => ({
            session: "Break",
            time: state.bMinute * 60,
            pause: true,
            play: false
          }))
        } else {
          this.setState(state => ({
            session: "Session",
            time: state.wMinute * 60,
            pause: true,
            play: false
          }))
        }
        this.setTimer();
      } else{
        this.setState(state => ({
          time: state.time -1,
        }))
      }
    }
  }

  setTimer(){
    if(this.state.time > 0 && this.state.pause === true && this.state.play === false){
      this.timer = setInterval(this.playTimer, 1000);
      this.setState({
        pause: false,
        play: true
      })
    }
  }

  pauseTimer(){
    if(this.state.time > 0 && this.state.pause === true && this.state.play === false){
      this.setTimer();
    } else {
      this.setState(state => ({
        pause: !state.pause
      }))
      
    }
  }

  resetPlayer(){
    clearInterval(this.timer);
    this.setState({
      wMinute: 25,
      bMinute: 5,
      session: "Session",
      time: 1500,
      pause: true,
      play: false
    });
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  changeSessionTime(e){
    const evalue = e.target.value;

    if(this.state.play === false){
      if(evalue === "+"){
        if(this.state.wMinute < 60){
          this.setState(state => ({
            wMinute: state.wMinute +1,
            time: (state.wMinute +1) * 60
          }))
        }
        
      } else {
        if(this.state.wMinute > 1){
            this.setState(state => ({
              wMinute: state.wMinute -1,
              time: (state.wMinute -1) * 60
            }))
        }
      }

    }
  }

  changeBreakTime(e){
    const evalue = e.target.value;

    if(this.state.play === false){
      if(evalue === "+"){
        if(this.state.bMinute < 60){
          this.setState(state => ({
            bMinute: state.bMinute +1,
            time: (state.bMinute +1) * 60
          }))
        }
      } else {
        if(this.state.bMinute > 1){
            this.setState(state => ({
              bMinute: state.bMinute -1,
              time: (state.bMinute -1) * 60
            }))
        }
      }

    }
  }

  render(){
    return (
      <div className="wrapper">
        <h1 className="title">25 + 5 Clock</h1>
        <h2 className="subtitle">A simple tool yet useful for anyone who procrastinates a lot</h2>
        <div className="content-wrapper">
         <div className="opt-wrapper">
          <Option 
            optionTitle="Session"
            minute={this.state.wMinute}
            onClick={this.changeSessionTime}
            idLabel="session-label"
            idDec="session-decrement"
            idInc="session-increment"
            idLen="session-length"
          />
          <Option
            optionTitle="Break"
            minute={this.state.bMinute}
            onClick={this.changeBreakTime}
            idLabel="break-label"
            idDec="break-decrement"
            idInc="break-increment"
            idLen="break-length"
          />
          </div>
        <Timer 
          time={this.state.time}
          session={this.state.session}
         />
        <Player 
          setTimer={this.setTimer}
          pauseTimer={this.pauseTimer}
          resetPlayer={this.resetPlayer}
        />
        <audio
          id="beep"
          preload="auto"
          ref={(audio) => {
            this.audio = audio;
          }}
          src="https://assets.mixkit.co/sfx/download/mixkit-sport-start-bleeps-918.wav"
          />
        </div>
      </div>
    );
  }
}

const Option = (props) => {
  return (
    <div className="option-content">
      <h3 id={props.idLabel} className="option-title">{props.optionTitle}</h3>
      <div className="btnOpt-wrapper">
        <button id={props.idDec} className="btnOpt" onClick={props.onClick} value="-">-</button>
        <span id={props.idLen} className="opt-timer">{props.minute.toString()}</span>
        <button id={props.idInc} className="btnOpt" onClick={props.onClick} value="+">+</button>
      </div>
    </div>
  )
}

const Timer = (props) => {
  return (
    <div className="timer-container">
      <h3 id="timer-label" className="session-title">{props.session}</h3>
      <div className="time-counter" id="time-left">{Math.floor((props.time / 60)).toString().padStart(2,0) + ":" + (props.time % 60).toString().padStart(2,0)}</div>
    </div>
  )
}

const Player = (props) => {
  return(
    <div className="player-container">
      <button className="btn-player" onClick={props.setTimer}>Play</button>
      <button className="btn-player" id="start_stop" onClick={props.pauseTimer}>Pause</button>
      <button className="btn-player" id="reset" onClick={props.resetPlayer}>Reset</button>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);