import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  constructor(props) {
    super(props);

    this.myInput = React.createRef();
    this.goToStore = this.goToStore.bind(this);
  }

  goToStore(event) {
    event.preventDefault();
    const storeName = this.myInput.current.defaultValue;
    this.props.history.push(`/store/${storeName}`);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter a Store</h2>
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={this.myInput} />
        <button type="submit">Visit Store</button>
      </form>
    )
  }
}

export default StorePicker;