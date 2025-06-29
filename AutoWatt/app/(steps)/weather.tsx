import { useContext } from "react";
import { useRouter } from "expo-router";
import { View, ScrollView } from "react-native";
import BackButton from "@/components/BackButton";
import ScreenTitle from "@/components/ScreenTitle";
import ScreenButton from "@/components/ScreenButton";
import { GlobalContext } from "@/context/GlobalContext";

export default function WeatherScreen() {
  const router = useRouter();
  const { setWeather } = useContext(GlobalContext);
  const options = [
    "Clear / Sunny",
    "Partly Cloudy",
    "Overcast",
    "Light Rain",
    "Heavy Rain",
    "Fog / Mist",
    "Snow",
    "Icy",
    "Windy",
    "Storm Conditions",
  ];

  return (
    <ScrollView style={{ padding: 20 }}>
      <BackButton />

      <ScreenTitle>Solar Maintenance{"\n"}Weather</ScreenTitle>

      <View
        style={{
          borderColor: "#777",
          borderWidth: 1,
          borderRadius: 10,
          padding: 8,
          marginTop: 25,
        }}
      >
        {options.map((option, index) => (
          <View key={option}>
            {index ? (
              <View
                style={{ height: 0, borderTopWidth: 1, borderTopColor: "#777" }}
              ></View>
            ) : null}
            <ScreenButton
              text={option}
              simple={true}
              onPress={() => {
                setWeather(option);
                router.back();
              }}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
