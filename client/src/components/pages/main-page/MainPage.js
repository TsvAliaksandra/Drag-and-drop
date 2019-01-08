import React from 'react';
import PropTypes from 'prop-types';
import './MainPage.less';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  setValue(e) {
    this.setState({value: e.target.value});
  }

  uploadToList(e) {
    const {value} = this.state;
    e.preventDefault();

    if (value === '') {
      return;
    }
    this.props.uploadToList(value);
    this.setState({value: ''});
  }

  renderListItems() {
    return this.props.listValue.map((item, index) => (
      <div className="self-list-item" key={item}>
        {item}
      </div>
    ));
  }

  renderListBlock() {
    return (
      <div className="list-block">
        <form onSubmit={(e) => this.uploadToList(e)}>
          <div>
            <input onChange={e => this.setValue(e)} value={this.state.value} />
          </div>
        </form>

        <div className="list-items-block">
          {this.props.listValue.length ? this.renderListItems() : ''}
        </div>
        <div>
          <input
            type="button"
            onClick={e => this.uploadToList(e)}
            value="submit"
          />
        </div>
      </div>
    );
  }

  render() {
    return <div>{this.renderListBlock()}</div>;
  }
}

MainPage.propsTypes = {
  listValue: PropTypes.array.isRequired,
  uploadToList: PropTypes.func
};

export default MainPage;
