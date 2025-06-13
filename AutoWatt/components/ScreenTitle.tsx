import { View, Text } from 'react-native';

export default function ScreenTitle({
	children
}) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      <Text style={{ fontSize: 28, fontWeight: 500, textAlign: 'center' }}>
      	{children}
    	</Text>
    </View>
  );
}
