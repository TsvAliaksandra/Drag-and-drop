import React from 'react';
import PropTypes from 'prop-types';
import './MainPage.less';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  setValue(e) {
    this.setState({value: e.target.value});
  }

  uploadToList() {
    this.props.uploadToList(this.state.value);
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
        <div>
          <input onChange={(e) => this.setValue(e)} value={this.state.value} />
        </div>
        <div className="list-items-block">
          {this.props.listValue.length ? this.renderListItems() : ''}
        </div>
        <div>
          <input
            type="button"
            onClick={() => this.uploadToList()}
            value="submit"
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderListBlock()}
      </div>
    );
  }
}

MainPage.propsTypes = {
  listValue: PropTypes.array.isRequired,
  uploadToList: PropTypes.func,
};

export default MainPage;
