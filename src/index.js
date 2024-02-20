import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//pages
import HomePage from './HomePage';
import DetailsPage from './DetailsPage';

const Stack = createNativeStackNavigator();

function MainApp() {
  return (
    <Stack.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="DetailsPage" component={DetailsPage} />
    </Stack.Navigator>
  );
}

export default MainApp;
