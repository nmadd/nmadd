import React from 'react';
import ReactDOM from 'react-dom';
import Timeline from './timeline/Timeline.jsx';
import './App.css';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Info from './info/Info.jsx';
import {Provider} from 'react-redux';
import store from './store';
import {setCurrentInfo} from './actions';
import {compose} from 'redux';
import Particles from 'react-particles-js';

const styles = {
  particles : {
    position: 'relative'
  },
  content: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0,0,0,0)'
  }
}

const particleParams = {
        particles: {
          number: {
            value: 50
          },
          color: {
            value: '#ff00ff'
          },
          shape: {
            type: 'circle'
          },
          size: {
            value: 3
          },
          line_linked: {
            enable_auto: true,
            distance: 150,
            color: '#000000'
          },
          move: {
            direction: 'right',
            out_mode: 'out',
            speed: 1
          }
        }
}

const App = React.createClass({
  render() {
    return (
      <div >
        <Particles style={styles.particles} params={particleParams} />
        <div style={styles.content}>
          <Timeline/>
          {this.props.children}
        </div>
      </div>
    )
  }
})

const setInfoOnEnter = (nextState) => {
  store.dispatch(setCurrentInfo(nextState.params.num))
}
const routeEnterHandler = compose(setInfoOnEnter);

ReactDOM.render(
  <Provider store={store}>
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='info/:num' component={Info} onEnter={routeEnterHandler}/>
    </Route>
  </Router>
</Provider>, document.getElementById('root'))
