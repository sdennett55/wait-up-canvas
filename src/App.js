import React from 'react';
import bgImage from './images/background.png';
import './App.scss';

class App extends React.Component {
  constructor() {
    super();
    this.canvas = React.createRef();
    this.link = React.createRef();
  }

  state = {
    url: null,
    title: 'first line',
    subtitle: 'second line',
    three: 'a. ',
    four: 'b. ',
    five: 'c. ',
    six: 'd. ',
    seven: '',
    eight: '',
    nine: '',
    ten: '',
    oneCoords: {
      x: 541,
      y: 98
    },
    twoCoords: {
      x: 541,
      y: 194
    },
    threeCoords: {
      x: 226,
      y: 431
    },
    fourCoords: {
      x: 226,
      y: 557
    },
    fiveCoords: {
      x: 226,
      y: 682
    },
    sixCoords: {
      x: 226,
      y: 807
    },
    sevenCoords: {
      x: 100,
      y: 100
    },
    eightCoords: {
      x: 100,
      y: 100
    },
    nineCoords: {
      x: 100,
      y: 100
    },
    tenCoords: {
      x: 100,
      y: 100
    }
  }

  componentDidMount() {
    let ctx = this.canvas.current.getContext('2d');
    ctx.fillStyle = '#1789fc';
    ctx.fillRect(0, 0, 1080, 1080);
    const newImage = new Image();
    newImage.src = bgImage;
    newImage.onload = () => {
      ctx.drawImage(newImage, 0, 0);
      this.handleText();
    };
    ctx.width = 1080;
    ctx.height = 1080;
    this.setState({ url: this.canvas.current.toDataURL() });
  }

  handleText = (e, title) => {
    let ctx = this.canvas.current.getContext('2d');
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    ctx.fillStyle = '#1789fc';
    ctx.fillRect(0, 0, 1080, 1080);
    const newImage = new Image();
    newImage.src = bgImage;
    ctx.drawImage(newImage, 0, 0);
    ctx.width = 1080;
    ctx.height = 1080;
    ctx.textAlign = "left";
    ctx.font = '90px staatliches';
    ctx.fillStyle = '#ffffff';
    if (typeof e === 'undefined') {
      ctx.textAlign = "center";
      ctx.fillText(this.state.title, this.state.oneCoords.x, this.state.oneCoords.y);
      ctx.fillText(this.state.subtitle, this.state.twoCoords.x, this.state.twoCoords.y);
      ctx.textAlign = "left";
      ctx.fillText(this.state.three, this.state.threeCoords.x, this.state.threeCoords.y);
      ctx.fillText(this.state.four, this.state.fourCoords.x, this.state.fourCoords.y);
      ctx.fillText(this.state.five, this.state.fiveCoords.x, this.state.fiveCoords.y);
      ctx.fillText(this.state.six, this.state.sixCoords.x, this.state.sixCoords.y);
      ctx.fillText(this.state.seven, this.state.sevenCoords.x, this.state.sevenCoords.y);
      ctx.fillText(this.state.eight, this.state.eightCoords.x, this.state.eightCoords.y);
      ctx.fillText(this.state.nine, this.state.nineCoords.x, this.state.nineCoords.y);
      ctx.fillText(this.state.ten, this.state.tenCoords.x, this.state.tenCoords.y);
      this.setState({ url: this.canvas.current.toDataURL() });
    } else {
      this.setState({ [title]: e.target.value }, () => {
        ctx.textAlign = "center";
        ctx.fillText(this.state.title, this.state.oneCoords.x, this.state.oneCoords.y);
        ctx.fillText(this.state.subtitle, this.state.twoCoords.x, this.state.twoCoords.y);
        ctx.textAlign = "left";
        ctx.fillText(this.state.three, this.state.threeCoords.x, this.state.threeCoords.y);
        ctx.fillText(this.state.four, this.state.fourCoords.x, this.state.fourCoords.y);
        ctx.fillText(this.state.five, this.state.fiveCoords.x, this.state.fiveCoords.y);
        ctx.fillText(this.state.six, this.state.sixCoords.x, this.state.sixCoords.y);
        ctx.fillText(this.state.seven, this.state.sevenCoords.x, this.state.sevenCoords.y);
        ctx.fillText(this.state.eight, this.state.eightCoords.x, this.state.eightCoords.y);
        ctx.fillText(this.state.nine, this.state.nineCoords.x, this.state.nineCoords.y);
        ctx.fillText(this.state.ten, this.state.tenCoords.x, this.state.tenCoords.y);
        this.setState({ url: this.canvas.current.toDataURL() });
      });
    }
  }

  handleRange = (e, textCoords, coord) => {
    const blah = e.target.value;
    this.setState(prevState => ({
      [textCoords]: { ...prevState[textCoords], [coord]: blah }
    }), () => {
      this.handleText();
    });
  };

  randomizer = (name) => {
    const randomized = this.state[name].split(' ').map(word => word.split('').sort(() => Math.random() > .5 ? 1 : -1).join('')).join(' '); 

    this.setState({ [name]: randomized }, () => {
      this.handleText();
    })
  };

  textInputs = {
    title: 'oneCoords',
    subtitle: 'twoCoords',
    three: 'threeCoords',
    four: 'fourCoords',
    five: 'fiveCoords',
    six: 'sixCoords',
    seven: 'sevenCoords',
    eight: 'eightCoords',
    nine: 'nineCoords',
    ten: 'tenCoords'
  };

  render() {

    return (
      <div className="App">
        <div className="canvas">
          <canvas width="1080" height="1080" ref={this.canvas}></canvas>
          <a className="App-button" ref={this.link} href={this.state.url} download>Download</a>
        </div>
        <div className="App-controls">

          {Object.entries(this.textInputs).map(([name, coords]) => (
            <>
              <input type="text" placeholder="title" tabIndex="1" value={this.state[name]} onChange={e => this.handleText(e, name)} />
              <button onClick={() => this.randomizer(name)}>Randomizer</button>
              <div className="App-controlBlock">
                <input type="range" min="0" max="1000" value={this.state[coords].x} onChange={e => this.handleRange(e, coords, 'x')} />
                <input type="text" className="App-numBlock" value={this.state[coords].x} onChange={e => this.handleRange(e, coords, 'x')} />
              </div>
              <div className="App-controlBlock">
                <input type="range" min="0" max="1000" value={this.state[coords].y} onChange={e => this.handleRange(e, coords, 'y')} />
                <input type="text" className="App-numBlock" value={this.state[coords].y} onChange={e => this.handleRange(e, coords, 'y')} />
              </div>
            </>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
