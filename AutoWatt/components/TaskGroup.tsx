import { View, Text, TouchableOpacity } from 'react-native';

export default function TaskGroup({
	label
}) {
  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: '#888', paddingTop: 10, paddingBottom: 10 }}>
      <Text style={{ fontSize: 24, color: '#888', marginBottom: 10 }}>
      	{label}
    	</Text>

    	<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    		<TouchableOpacity style={{ backgroundColor: '#0a7ea4', borderColor: '#0a7ea4', borderWidth: 2, borderRadius: 3, width: '30%', padding: 10 }}>
    			<Text style={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>PASS</Text>
    		</TouchableOpacity>
    		<TouchableOpacity style={{ backgroundColor: '#0a7ea4', borderColor: '#0a7ea4', borderWidth: 2, borderRadius: 3, width: '30%', padding: 10 }}>
    			<Text style={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>FAIL</Text>
    		</TouchableOpacity>
    		<TouchableOpacity style={{ backgroundColor: '#0a7ea4', borderColor: '#0a7ea4', borderWidth: 2, borderRadius: 3, width: '30%', padding: 10 }}>
    			<Text style={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>N/A</Text>
    		</TouchableOpacity>
    	</View>
    </View>
  );
}
