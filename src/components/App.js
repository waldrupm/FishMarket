import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      fishes: {},
      order: {}
    }
  };

  static propTypes = {
    match: PropTypes.object
  }

  // Bind to firebase
  componentDidMount() {
    const { params } = this.props.match;
    // Order information
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });

  };
  
  // save order state
  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }

  //remove firebase binding
  componentWillUnmount() {
    base.removeBinding(this.ref);
  };

  
  // Adds fish to catalog
  addFish = fish => {
    const fishes = { ...this.state.fishes};
    fishes[`fish${Date.now()}`] = fish;
    this.setState({
      fishes: fishes
    });
  };
  
  // Handle EditFishForm changes
  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = updatedFish;
    this.setState( { fishes });
  };

  deleteFish = (key) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = null;
    this.setState( { fishes } );
  };

  // Will load example fishes into the catalog
  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes});
  };

  // Adds items to the order
  addToOrder = (key) => {
    // Get state
    const order = { ...this.state.order };
    // add to order or update order quantity
    order[key] = order[key] + 1 || 1;
    // update state
    this.setState({ order });
  }

  removeFromOrder = key => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState( { order } );
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Daily" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} />
        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          storeId={this.props.match.params.storeId}
        />
      </div>
    )
  }
}

export default App;