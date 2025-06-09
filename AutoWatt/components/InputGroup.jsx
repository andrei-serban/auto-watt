import { View, Text, TextInput, Switch } from 'react-native';

export default function InputGroup({
	note,
	type,
	label,
	value,
	setValue
}) {
  return (
    <View style={{ borderColor: '#777', borderWidth: 1, borderRadius: 10, padding: 8, marginTop: 25 }}>
      <Text style={{ marginBottom: 5, fontSize: 20, fontWeight: 300 }}>{label}</Text>

      <TextInput
        style={{ fontSize: 24 }}
        placeholder={`Enter the ${(label || '').toLowerCase()} here`}
        value={value}
        onChangeText={setValue}
        keyboardType={type || 'default'}
      />

    	<View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
	    	<Text style={{ fontSize: 24 }}>No</Text>
	    	<Switch
	        onValueChange={() => {}}
	        value={true}
	      />
	      <Text style={{ fontSize: 24 }}>Yes</Text>
      </View>

    	{
    		note
    		? <Text style={{ paddingTop: 20, fontSize: 10 }}>
    			Note for self: {note}
  			</Text>
    		: null
    	}
    </View>
  );
}
