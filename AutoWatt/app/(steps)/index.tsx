import { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, ScrollView, TextInput } from 'react-native';
import InputGroup from '../../components/InputGroup';
import ScreenTitle from '../../components/ScreenTitle';

export default function HomeScreen() {
	const router = useRouter();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [systemSize, setSystemSize] = useState('');
  const [batteryStorage, setBatteryStorage] = useState(false);
  const [voltageOptimiser, setVoltageOptimiser] = useState(false);
  const [authorisedPerson, setAuthorisedPerson] = useState('');

  const handlePress = () => {
    router.push('/(start)');
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <ScreenTitle>Solar Maintenance</ScreenTitle>

      <InputGroup
        label="Name"
        value={name}
        setValue={setName}
      />

      <InputGroup
        label="Address"
        value={address}
        setValue={setAddress}
      />

      <InputGroup
        type="numeric"
        label="System size"
        value={systemSize}
        setValue={setSystemSize}
      />

      <InputGroup
        tag="switch"
        note="this allows for the System Components - Battery Storage page to be triggered - if it's no this should just be grey'd out"
        label="Is battery stroage installed on-site?"
        value={batteryStorage}
        setValue={setBatteryStorage}
      />

      <InputGroup
        tag="switch"
        label="Is voltage optimiser installed on-site?"
        note="this allows for the System Components - Voltage Optimiser page to be triggered - if it's no this should just be grey'd out (see battery example above for example)"
        value={voltageOptimiser}
        setValue={setVoltageOptimiser}
      />

      <InputGroup
        label="Authorised person"
        placeholder="Enter name here"
        value={authorisedPerson}
        setValue={setAuthorisedPerson}
      />

      <View>
        <Text>

Start The date is chosen via a Calander or this wheel (if this is only available on iPhone than Calander is fine) - TIME is the same
  
Roof access available Y/N option
  
Cleaning performed  Y/N option
  
RAMs completed  Y/N option
  
Weather This brings you to weather page and once the option is selected this should be updated to look like
  
Ambient temperature This brings you to ambient temperature page and once the option is selected this should be updated to look like
  
System components The system components – each one brings you to a new page with the tasks associated with that component – I would like that if everything on the task list ‘Passes’ then the front page box will say Pass and same for Fail (maybe colours as well to make it easy – the box goes green for Pass and Red for Fail - see examples to the right)
  
System summary notes  System summary notes is a note logged by the technician manually
  
Inspection limitations  The inspection limitations – these are tick boxes to confirm whether something wasn’t done. 
  
Follow-up required  Follow up required is a Yes and No button
  
Follow-up details Follow-up notes is a note logged by the technician manually
  
Send report to  ‘Send report to’ allows the technician to manually enter email address to themselves and their manager (they have to have at least one email in there – error upon submitting if not filled in and highlight the area)
  
Generate report Generate report finishes the report and states the auto generation ‘pdf’ process bring you to the end page (15. Report submitted)
  After pressing “Generate Report”, just show:
  ✅ “Inspection submitted”
  📎 PDF generating…
  📨 Sent to technician@example.com
  This is reassurance and helps users trust the app.
  
        </Text>
      </View>

      <View style={{ height: 360 }}></View>
    </ScrollView>
  );
}
