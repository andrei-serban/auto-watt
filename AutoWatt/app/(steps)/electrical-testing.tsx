import { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, ScrollView, TextInput } from 'react-native';
import TaskGroup from '../../components/TaskGroup';
import InputGroup from '../../components/InputGroup';
import ScreenTitle from '../../components/ScreenTitle';
import ScreenSummary from '../../components/ScreenSummary';

export default function ElectricalTestingScreen() {
  const [notes, setNotes] = useState('');

  return (
    <ScrollView style={{ padding: 20 }}>
    	<ScreenTitle>
    		Solar Maintenance{'\n'}System Components:{'\n'}Electrical Testing
    	</ScreenTitle>

    	<ScreenSummary />

			<View style={{ marginTop: 30 }}>
				<Text style={{ fontWeight: 600, fontSize: 28, marginBottom: 10 }}>Tasks</Text>
				<View style={{ borderColor: '#888', borderWidth: 1, borderRadius: 10, padding: 10 }}>
					<TaskGroup
						label="Voc within acceptable range"
					/>

					<TaskGroup
						label="Isc measuring safely"
					/>

					<TaskGroup
						label="Isulation resistance within limit"
					/>
				</View>
			</View>

      <InputGroup
      	numberOfLines={8}
        label="Electrical Testing notes"
        placeholder="Note"
        value={notes}
        setValue={setNotes}
      />

      <View style={{ height: 360 }}></View>
    </ScrollView>
  );
}
