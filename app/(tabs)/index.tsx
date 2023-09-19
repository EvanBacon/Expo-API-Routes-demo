import { Text, View, useThemeColor } from "../../components/Themed";

import React from "react";
import { Button, StyleSheet, TextInput } from "react-native";

// export { ErrorBoundary } from 'expo-router';

export default function Page() {
  const [loading, setLoading] = React.useState(false);
  const [bio, setBio] = React.useState("");
  const [generatedBios, setGeneratedBios] = React.useState("");
  const color = useThemeColor({}, "text");

  const generateBio = async () => {
    setGeneratedBios("");
    setLoading(true);

    const prompt = `Generate 2 tweets about developing universal apps with Expo Router and the new API Routes, with no hashtags and explicitly labeled "1." and "2.". Make sure each generated tweet is at max 10 words. Base it on this context: ${bio}.`;

    const response = await fetch("/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const answer = await response.json();
    setGeneratedBios(answer.choices[0].text);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Expo Router Tweet AI</Text>

        <TextInput
          value={bio}
          style={{
            color,
            minHeight: 120,
            borderWidth: 1,
            borderColor: color,
            padding: 8,
          }}
          onChange={(e) => setBio(e.nativeEvent.text)}
          rows={4}
          placeholderTextColor={"#9CA3AF"}
          placeholder="e.g. Expo Router enthusiast."
        />

        <Button
          disabled={loading}
          onPress={() => generateBio()}
          title={loading ? "Loading..." : "Generate"}
        />

        {generatedBios != null && (
          <>
            <Text style={styles.subtitle}>Generated Tweets:</Text>
            {generatedBios
              .substring(generatedBios?.indexOf("1") + 2)
              .split("2.")
              .map((generatedBio, index) => (
                <Text key={String(index)}>{generatedBio}</Text>
              ))}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  main: {
    flex: 1,
    gap: 8,
    justifyContent: "center",
    alignItems: "stretch",
    maxWidth: 640,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 24,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
