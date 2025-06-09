import { View, Text, TextInput, Switch } from 'react-native';

export default function ScreenTitle({
	children
}) {
  return (
    <View style={{ marginTop: 40, gap: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 300, color: '#888' }}>
      	Name: Cash &amp; Carry
    	</Text>
    	<Text style={{ fontSize: 20, fontWeight: 300, color: '#888' }}>
      	Address: Grove St., Oldham, GR0 1VE
    	</Text>
    	<Text style={{ fontSize: 20, fontWeight: 300, color: '#888' }}>
      	System size (kW): 100
    	</Text>
    	<Text style={{ fontSize: 20, fontWeight: 300, color: '#888' }}>
      	Authorised Person: Andrew Lloyd
    	</Text>
    </View>
  );
}
