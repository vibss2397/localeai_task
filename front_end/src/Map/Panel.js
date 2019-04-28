    
import React, {PureComponent} from 'react';

const defaultContainer = ({children}) => <div className="control-panel row justify-content-end" ><div className="col-2 bg-light">{children}</div></div>;

export default class ControlPanel extends PureComponent {
  render() {
    const Container = this.props.containerComponent || defaultContainer;

    return (
      <Container>
          <br />
        <div class="row"><div style={{background: '#FF5733', display: 'block', color: '#FF5733', marginLeft:10}} className="col-1">a</div><div className="col-7"><p>Starting Points</p></div></div>
        <br />
        <div class="row"><div style={{background: '#f00', display: 'block', color: '#f00', marginLeft: 10}} className="col-1">a</div><div className="col-7"><p>Ending Points</p></div></div>
        <br />
      </Container>
    );
  }
}