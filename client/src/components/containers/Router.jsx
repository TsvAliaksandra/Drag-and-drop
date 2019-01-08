import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import MainPageContainer from '../pages/main-page/MainPageContainer';

const AppComponent = () => {
  return (
    <Switch>
      <Route exact path="/" component={MainPageContainer} />
      <Redirect from="*" exact to="/" />
    </Switch>
  );
};

export default AppComponent;
