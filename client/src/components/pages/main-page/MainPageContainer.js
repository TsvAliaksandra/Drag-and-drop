import {connect} from 'react-redux';
import {uploadToList} from '../../../redux/modules/main/mainActions';
import MainPage from './MainPage';

const mapStateToProps = state => ({
  listValue: state.main.listValue,
});

const mapDispatchToProps = {
  uploadToList,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
