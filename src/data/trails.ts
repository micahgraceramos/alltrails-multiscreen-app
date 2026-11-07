import { ImageSourcePropType } from "react-native";

export type Difficulty = "Easy" | "Moderate" | "Hard";

export type Trail = {
  id: string;
  name: string;
  park: string;
  rating: number;
  reviews: number;
  difficulty: Difficulty;
  lengthKm: number;
  elevationM: number;
  time: string;
  routeType: string;
  description: string;
  image: ImageSourcePropType;
};

export const DIFFICULTY_STYLE = {
  Easy: { marker: "●", color: "#3FA34D" },
  Moderate: { marker: "■", color: "#E8B931" },
  Hard: { marker: "▲", color: "#E5643B" },
};

export const TRAILS: Trail[] = [
  {
    id: "parker-ridge",
    name: "Parker Ridge",
    park: "Banff National Park",
    rating: 4.8,
    reviews: 2140,
    difficulty: "Moderate",
    lengthKm: 6.8,
    elevationM: 270,
    time: "2–2.5 hr",
    routeType: "Out & back",
    description:
      "A steady switchback climb off the Icefields Parkway that opens onto a ridge overlooking the Saskatchewan Glacier. Short for the reward, and busy on summer weekends.",
    image: require("../../assets/images/parker-ridge.jpeg"),
  },
  {
    id: "kicking-horse",
    name: "Kicking Horse Viewpoint",
    park: "Banff National Park",
    rating: 4.4,
    reviews: 640,
    difficulty: "Moderate",
    lengthKm: 2.9,
    elevationM: 190,
    time: "1–1.5 hr",
    routeType: "Out & back",
    description:
      "A short forested climb to a rocky viewpoint looking out over the valley and the surrounding peaks. A good pick when you only have an hour or two.",
    image: require("../../assets/images/kicking-horse.webp"),
  },
  {
    id: "little-arethusa",
    name: "Little Arethusa Route",
    park: "Peter Lougheed Provincial Park",
    rating: 4.7,
    reviews: 410,
    difficulty: "Hard",
    lengthKm: 5.1,
    elevationM: 560,
    time: "2.5–3 hr",
    routeType: "Out & back",
    description:
      "A steep scramble route near Highwood Pass with big views of the cirque below. Loose rock near the top, so bring good boots and take your time.",
    image: require("../../assets/images/little-arethusa.jpeg"),
  },
  {
    id: "wilcox-pass",
    name: "Wilcox Viewpoint via Wilcox Pass",
    park: "Jasper National Park",
    rating: 4.9,
    reviews: 3020,
    difficulty: "Moderate",
    lengthKm: 9.7,
    elevationM: 480,
    time: "3–4 hr",
    routeType: "Out & back",
    description:
      "Climbs through forest into open alpine meadows with views across to the Athabasca Glacier and the Columbia Icefield. Bighorn sheep are often seen along the pass.",
    image: require("../../assets/images/wilcox-pass.jpeg"),
  },
  {
    id: "tent-ridge",
    name: "Tent Ridge Horseshoe",
    park: "Spray Valley Provincial Park",
    rating: 4.8,
    reviews: 1580,
    difficulty: "Hard",
    lengthKm: 10.5,
    elevationM: 820,
    time: "4–5 hr",
    routeType: "Loop",
    description:
      "A ridge-walk loop in Kananaskis with exposed sections and views over the Spray Lakes. One of the best horseshoe hikes near Canmore on a clear day.",
    image: require("../../assets/images/tent-ridge.jpg"),
  },
];

export const getTrail = (id: string) =>
  TRAILS.filter((trail) => trail.id === id)[0];
