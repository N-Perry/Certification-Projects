// Break view, increment & decrement
class BreakControls extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "length-control" }, /*#__PURE__*/
      React.createElement("div", { id: "break-label" }, "Break Length"), /*#__PURE__*/

      React.createElement("button", { className: "btn-level", id: "break-decrement", value: "-",
        onClick: this.props.onClick }, /*#__PURE__*/

      React.createElement("i", { className: "fa fa-arrow-down fa-2x" })), /*#__PURE__*/


      React.createElement("div", { className: "btn-level", id: "break-length" }, this.props.break), /*#__PURE__*/

      React.createElement("button", { className: "btn-level", id: "break-increment", value: "+",
        onClick: this.props.onClick }, /*#__PURE__*/

      React.createElement("i", { className: "fa fa-arrow-up fa-2x" }))));



  }}


// Session view, increment & decrement
class SessionControls extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "length-control" }, /*#__PURE__*/
      React.createElement("div", { id: "session-label" }, "Session Length"), /*#__PURE__*/

      React.createElement("button", { className: "btn-level", id: "session-decrement", value: "-",
        onClick: this.props.onClick }, /*#__PURE__*/

      React.createElement("i", { className: "fa fa-arrow-down fa-2x" })), /*#__PURE__*/


      React.createElement("div", { className: "btn-level", id: "session-length" }, this.props.session), /*#__PURE__*/

      React.createElement("button", { className: "btn-level", id: "session-increment", value: "+",
        onClick: this.props.onClick }, /*#__PURE__*/

      React.createElement("i", { className: "fa fa-arrow-up fa-2x" }))));



  }}


//contains break & session controls, timer display, pause/resume/reset
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerPaused: true,
      breakLength: 5,
      sessionLength: 25,
      timer: 1500,
      onBreak: false,
      IntervalID: '' };


    //method binding will go here
    this.clockify = this.clockify.bind(this);
    this.setBreakLength = this.setBreakLength.bind(this);
    this.setSessionLength = this.setSessionLength.bind(this);
    this.timerSwitchControl = this.timerSwitchControl.bind(this);
    this.pauseResume = this.pauseResume.bind(this);
    this.timerSwitchControl = this.timerSwitchControl.bind(this);
    this.refresh = this.refresh.bind(this);
  }


  setBreakLength(e) {
    if (this.state.timerPaused) {
      if (e.currentTarget.value === '-' && this.state.breakLength !== 1) {
        this.setState({
          breakLength: this.state.breakLength - 1 });

      } else if (e.currentTarget.value === '+' && this.state.breakLength !== 60) {
        this.setState({
          breakLength: this.state.breakLength + 1 });

      }
    }
  }

  setSessionLength(e) {
    if (this.state.timerPaused) {
      if (e.currentTarget.value === '-' && this.state.sessionLength !== 1) {
        this.setState({
          sessionLength: this.state.sessionLength - 1,
          timer: this.state.sessionLength * 60 - 60 });

      } else if (e.currentTarget.value === '+' && this.state.sessionLength !== 60) {
        this.setState({
          sessionLength: this.state.sessionLength + 1,
          timer: this.state.sessionLength * 60 + 60 });

      }
    }
  }

  pauseResume() {
    if (this.state.timerPaused) {
      //begincountdown
      this.setState({ timerPaused: false });
      this.setState({
        IntervalID: setInterval(() => {
          this.setState({ timer: this.state.timer - 1 });
          this.timerSwitchControl();
        }, 1000) });

    } else {
      clearInterval(this.state.IntervalID);
      this.setState({ timerPaused: true });
    }
  }

  timerSwitchControl() {
    let timer = this.state.timer;
    // this.buzzer-timer-
    if (timer === 0) {
      document.getElementById("beep").play();
    }
    if (timer < 0) {
      if (!this.state.onBreak) {
        //this.beginCountdown--
        this.setState({
          timer: this.state.breakLength * 60,
          onBreak: true });

      } else {
        //this.beginCountdown--
        this.setState({
          timer: this.state.sessionLength * 60,
          onBreak: false });

      }
    }
  }

  // when refresh button is clicked
  refresh() {
    if (this.state.IntervalID) {
      clearInterval(this.state.IntervalID);
    }
    this.setState({
      timerPaused: true,
      breakLength: 5,
      sessionLength: 25,
      timer: 1500,
      onBreak: false,
      IntervalID: '' });


    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
  }

  //Shoutout Peter Weinberg for this sick function to take care of formatting for mm:ss timer display
  clockify() {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
  }



  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { id: "main-title" }, "25 + 5 Clock"), /*#__PURE__*/
      React.createElement(BreakControls, {
        break: this.state.breakLength,
        onClick: this.setBreakLength }), /*#__PURE__*/

      React.createElement(SessionControls, {
        session: this.state.sessionLength,
        onClick: this.setSessionLength }), /*#__PURE__*/



      React.createElement("div", { className: "timer" }, /*#__PURE__*/
      React.createElement("div", { className: "timer-wrapper" }, /*#__PURE__*/
      React.createElement("div", { id: "timer-label" },
      !this.state.onBreak ? "Session" : "Break"), /*#__PURE__*/


      React.createElement("div", { id: "time-left" },
      this.clockify()))), /*#__PURE__*/




      React.createElement("div", { className: "timer-control" }, /*#__PURE__*/
      React.createElement("button", { id: "start_stop", onClick: this.pauseResume }, /*#__PURE__*/
      React.createElement("i", { className: "fa fa-play fa-2x" }), /*#__PURE__*/
      React.createElement("i", { className: "fa fa-pause fa-2x" })), /*#__PURE__*/


      React.createElement("button", { id: "reset", onClick: this.refresh }, "REFRESH")), /*#__PURE__*/





      React.createElement("audio", { id: "beep", preload: "auto", src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" })));


  }}



ReactDOM.render( /*#__PURE__*/React.createElement(Clock, null), document.getElementById("app"));