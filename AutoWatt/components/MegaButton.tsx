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
  				? '#28A745' 
  				: (status === 0 
						? '#DC3545' 
						: (
							status === -2
							? '#E9ECEF'
							: '#6C757D'
						)
					), 
  			marginTop: 10, 
  			borderRadius: 10, 
  			paddingVertical: 20, 
  			paddingHorizontal: 10
  		}}
		>
      <View style={{ marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
	      <Text style={{ fontSize: 28, fontWeight: 300, color: status === -2 ? '#6C757D' : '#fff' }}>
	      	{title}
	    	</Text>
	    	<Feather name="chevron-right" size={28} color="white" />
    	</View>
    	<Text style={{ 
    		fontSize: 28, 
    		fontWeight: 700, 
    		fontStyle: status === -2 ? 'italic' : 'normal',
    		color: status === -2 ? '#6C757D' : '#fff', 
    		opacity: 0.75
    	}}>
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
