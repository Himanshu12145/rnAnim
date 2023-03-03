import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { Card, Button } from "react-native-elements";
import Deck from "./components/Deck";
const DATA = [
  {
    id: 1,
    text: "Card #1",
    uri: "https://source.unsplash.com/user/wsanter",
  },
  {
    id: 2,
    text: "Card #2",
    uri: "https://source.unsplash.com/random",
  },
  {
    id: 3,
    text: "Card #3",
    uri: "https://source.unsplash.com/random/300x332",
  },
  {
    id: 4,
    text: "Card #4",
    uri: "https://source.unsplash.com/random/332x300",
  },
  {
    id: 5,
    text: "Card #5",
    uri: "https://source.unsplash.com/random/900×700/?fruit",
  },
  {
    id: 6,
    text: "Card #6",
    uri: "https://source.unsplash.com/random/300x300",
  },
  {
    id: 7,
    text: "Card #7",
    uri: "https://source.unsplash.com/random/400x400",
  },
  {
    id: 8,
    text: "Card #8",
    uri: "https://source.unsplash.com/random/300×300",
  },
];
function renderDeck(item) {
  // console.log(item.uri);
  return (
    <Card key={item.id} title="items" source={{ uri: item.uri }}>
      <Image style={styles.image} source={{ uri: item.uri }} />
      <Text
        style={{
          marginBottom: 10,
          fontWeight: "bold",
          fontSize: 22,
          textAlign: "center",
        }}
      >
        {item.text}
      </Text>
      <Text style={{ marginBottom: 10 }}>I can edit it</Text>
      <Button
        icon={{ name: "code" }}
        backgroundColor="#03A9F4"
        title="View Now"
      />
    </Card>
  );
}

function renderNoMoreCards() {
  return (
    <Card>
      <Text
        style={{
          marginBottom: 10,
          fontWeight: "bold",
          fontSize: 22,
          textAlign: "center",
        }}
      >
        All DONE!
      </Text>
      <Text style={{ marginBottom: 10 }}>No Item to render</Text>
      <Button backgroundColor="#03A9F4" title="Get More!" />
    </Card>
  );
}
export default function App() {
  return (
    <>
      <View style={styles.topContainer} />
      <StatusBar style="dark" />
      <Deck
        renderNoMoreCards={renderNoMoreCards}
        data={DATA}
        renderDeck={renderDeck}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    height: 200,
    width: 323,
  },
  topContainer: {
    marginBottom: 20,
  },
});
