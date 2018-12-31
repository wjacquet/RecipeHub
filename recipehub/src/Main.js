import React, {Component} from 'react'

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <header>
          This is the Home Page
        </header>
        <Button variant="contained">
          Default
        </Button>
      </div>
    );
  }
}

export default Main;