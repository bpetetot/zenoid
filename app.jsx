import React, {Component} from 'react';
import blessed from 'neo-blessed';
import {createBlessedRenderer} from 'react-blessed';

const render = createBlessedRenderer(blessed);

const config = {
	width: 50,
	height: 25,
};

class App extends Component {
  render() {
    return (
      <box left="center" top="center" width={80} height={15} border={{type: 'line'}} style={{border: {fg: 'cyan'}}}>
        0
      </box>
    );
  }
}

const screen = blessed.screen({
  title: 'Zenoid',
  smartCSR: false,
  debug: true,
});

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

render(<App />, screen);
