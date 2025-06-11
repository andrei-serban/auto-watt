import { View, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function MegaButton({
	title,
	status = -1,
	disabled = false,
	onPress = () => {}
}) {
  return (
    <TouchableOpacity 
    	onPress={onPress} 
    	style={{
    		opacity: disabled ? 0.5 : 1,
  			backgroundColor: 
  				status === 1 
  				? 'green' 
  				: (status === 0 
						? 'red' 
						: (
							status === -2
							? 'lightgray'
							: 'gray'
						)
					), 
  			marginTop: 10, 
  			borderRadius: 10, 
  			paddingVertical: 20, 
  			paddingHorizontal: 10
  		}}
		>
      <View style={{ marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
	      <Text style={{ fontSize: 28, fontWeight: 300, color: '#fff' }}>
	      	{title}
	    	</Text>
	    	<Feather name="chevron-right" size={28} color="white" />
    	</View>
    	<Text style={{ fontSize: 28, fontWeight: 700, color: '#fff', opacity: 0.75 }}>
      	{
      		status === 1
      		? 'Pass'
      		: (status === 0
      			? 'Fail'
      			: (
      				status === -2
      				? 'Not started'
      				: 'N/A'
    				)
    			)
      	}
    	</Text>
    </TouchableOpacity>
  );
}
