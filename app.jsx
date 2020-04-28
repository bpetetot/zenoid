import React, {Component} from 'react';
import blessed from 'neo-blessed';
import {createBlessedRenderer} from 'react-blessed';

const render = createBlessedRenderer(blessed);

class App extends Component {
  render() {
    return (
      <box label="react-blessed demo" border={{type: 'line'}} style={{border: {fg: 'cyan'}}}>
        ⚽️
      </box>
    );
  }
}

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'Zenoid'
});

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

render(<App />, screen);
