const drumBank = [
{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Chord-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3' },

{
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Chord-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3' },

{
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Chord-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3' },

{
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Shaker',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3' },

{
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3' },

{
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3' },

{
  keyCode: 90,
  keyTrigger: 'Z',
  id: 'Punchy-Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3' },

{
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Side-Stick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3' },

{
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Snare',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3' }];

const activeStyle = {
  backgroundColor: '#33C2F6',
  color: 'white',
  boxShadow: '0 3px #33C2F6',
  height: 77,
  marginTop: 13 };


const inactiveStyle = {
  backgroundColor: 'black',
  color: 'white',
  marginTop: 10,
  boxShadow: '1px 1px 3px #33C2F6' };


class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: inactiveStyle };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.activatePad = this.activatePad.bind(this);
    this.playSound = this.playSound.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }

  activatePad() {
    if (this.state.padStyle.backgroundColor === '#33C2F6') {
      this.setState({
        padStyle: inactiveStyle });

    } else {
      this.setState({
        padStyle: activeStyle });

    }
  }

  playSound() {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    this.activatePad();
    setTimeout(() => this.activatePad(), 100);
    this.props.updateDisplay(this.props.clipId.replace(/-/g, ' '));
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", {
        className: "drum-pad",
        id: this.props.clipId,
        onClick: this.playSound,
        style: this.state.padStyle }, /*#__PURE__*/

      React.createElement("audio", {
        className: "clip",
        id: this.props.keyTrigger,
        src: this.props.clip }),


      this.props.keyTrigger));


  }}


class PadBank extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let padBank = drumBank.map((drumObj, i) => {
      return /*#__PURE__*/(
        React.createElement(DrumPad, {
          clip: drumObj.url,
          clipId: drumObj.id,
          keyCode: drumObj.keyCode,
          keyTrigger: drumObj.keyTrigger,
          updateDisplay: this.props.updateDisplay }));



    });

    return /*#__PURE__*/(
      React.createElement("div", { className: "pad-bank" },
      padBank));



  }}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'Rock Out!' };

    this.displayClipName = this.displayClipName.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
  }

  displayClipName(name) {
    this.setState({
      display: name });

  }

  clearDisplay() {
    this.setState({
      display: ' ' });

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "inner-container", id: "drum-machine" }, /*#__PURE__*/
      React.createElement(PadBank, {
        updateDisplay: this.displayClipName }), /*#__PURE__*/

      React.createElement("p", { id: "display" },
      this.state.display)));



  }}



ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));