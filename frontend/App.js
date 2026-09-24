import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';

import CompetitionDetailsScreen from './src/screens/CompetitionDetailsScreen';

export default function App() {
  return (
    <PaperProvider>
      <CompetitionDetailsScreen />
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
