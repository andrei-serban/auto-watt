import { useState, useContext } from 'react';
import { useRouter } from 'expo-router';
import { View, ScrollView } from 'react-native';
import ScreenTitle from '../../components/ScreenTitle';
import ScreenButton from '../../components/ScreenButton';
import { GlobalContext } from '@/context/GlobalContext';

export default function AmbientTempScreen() {
	const router = useRouter();
  const { setAmbientTemp } = useContext(GlobalContext);
  const options = [
  	{
  		value: 'Freezing',
  		text: '< 0°C (Freezing)',
		},
	  {
	  	value: 'Cold',
	  	text: '0°C-10°C (Cold)',
	  },
	  {
	  	value: 'Cool',
	  	text: '10°C-20°C (Cool)',
  	},
	  {
	  	value: 'Warm',
	  	text: '20°C-30°C (Warm)',
  	},
	  {
	  	value: 'Hot',
	  	text: '30°C+ (Hot)'
  	}
  ];

  return (
    <ScrollView style={{ padding: 20 }}>
    	<ScreenTitle>
    		Solar Maintenance{'\n'}Ambient Temperature
    	</ScreenTitle>

    	<View style={{ borderColor: '#777', borderWidth: 1, borderRadius: 10, padding: 8, marginTop: 25 }}>
        {options.map((option, index) => <View key={option.value}>
	        {
	        	index
	        	? <View style={{ height: 0, borderTopWidth: 1, borderTopColor: '#777' }}></View>
	        	: null
	        }
	        <ScreenButton
	          text={option.text}
	          simple={true}
	          onPress={() => {
	          	setAmbientTemp(option.value);
	          	router.push('/(steps)');
	          }}
	        />
        </View>)}
      </View>
    </ScrollView>
  );
}
