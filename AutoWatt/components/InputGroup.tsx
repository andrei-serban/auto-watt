import { View, Text, TextInput, Switch } from 'react-native';

export default function InputGroup({
	note,
	type,
	label,
	value,
	setValue,
	placeholder,
	tag = 'input',
	numberOfLines = 1
}) {
  return (
    <View style={{ borderColor: '#777', borderWidth: 1, borderRadius: 10, padding: 8, marginTop: 25 }}>
      <Text style={{ marginBottom: 5, fontSize: 20, fontWeight: 300 }}>{label}</Text>

      {
      	tag === 'input'
      	? <TextInput
      		multiline={numberOfLines > 1}
          numberOfLines={numberOfLines}
	        style={{ fontSize: 24, height: numberOfLines > 1 ? (numberOfLines * 30) : 'auto' }}
	        placeholder={placeholder || `Enter the ${(label || '').toLowerCase()} here`}
	        value={value}
	        onChangeText={setValue}
	        keyboardType={type || 'default'}
	      />
	      : null
      }

      {
      	tag === 'switch'
      	? <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
		    	<Text style={{ fontSize: 24 }}>No</Text>
		    	<Switch
		    		trackColor={{ true: '#0a7ea4' }}
		        onValueChange={setValue}
		        value={value}
		      />
		      <Text style={{ fontSize: 24 }}>Yes</Text>
	      </View>
	      : null
      }

    	{
    		note
    		? <Text style={{ paddingTop: 10, fontSize: 10 }}>
    			Note for self: {note}
  			</Text>
    		: null
    	}
    </View>
  );
}
