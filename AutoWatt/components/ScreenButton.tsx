import { View, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function ScreenButton({
	text,
	value = '',
	simple = false,
	onPress = () => {}
}) {
  return (
    <TouchableOpacity 
    	onPress={onPress} 
    	style={{
  			borderRadius: 10,
  			paddingVertical: 10
  		}}
		>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
	      <Text style={{ fontSize: 28, fontWeight: 300 }}>
	      	{text}
	    	</Text>
	    	{
	    		simple
	    		? null
	    		: <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
			    	<Text style={{ fontSize: 28, fontWeight: 300 }}>{value}</Text>
			    	<Feather name="chevron-right" size={28} color="#2F9DFB" />
		    	</View>
	    	}
    	</View>
    </TouchableOpacity>
  );
}
