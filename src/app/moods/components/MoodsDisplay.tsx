import { Mood } from "../constants/moods";

const MoodsDisplay = ({
  currentMoodAccent,
}: {
  currentMoodAccent: Mood["colors"] | undefined;
}) => {
  return <h1>Your mood</h1>;
};

export default MoodsDisplay;
