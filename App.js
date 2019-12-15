import { createStackNavigator, createAppContainer } from "react-navigation";

import Start from './components/Start'
import Main from "./components/Main"


const Root = createStackNavigator({
  Start: { screen: Start },
  Main: { screen: Main },


});

const App = createAppContainer(Root);

export default App;