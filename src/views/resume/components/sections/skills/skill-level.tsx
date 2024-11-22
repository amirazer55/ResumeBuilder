import { View } from "lucide-react";
import { SkillLevelProps } from "../../types";

export function SkillLevel({ level, fontSize }: SkillLevelProps) {
  const skillMap: { [key: string]: number } = {
    novice: 1,
    beginner: 2,
    intermediate: 3,
    advanced: 4,
    expert: 5,
  };

  const numberOfCircles = skillMap[level] || 0;
  const numberOfEmptyCircles = 5 - numberOfCircles;

  return (
    <View style={{ flexDirection: "row" }}>
      {Array.from({ length: numberOfCircles }, (_, idx) => (
        <View
          key={idx}
          style={{
            width: fontSize.normal / 2,
            height: fontSize.normal / 2,
            borderRadius: 5,
            backgroundColor: "black",
            margin: 1,
          }}
        />
      ))}
      {Array.from({ length: numberOfEmptyCircles }, (_, idx) => (
        <View
          key={numberOfCircles + idx}
          style={{
            width: fontSize.normal / 2,
            height: fontSize.normal / 2,
            borderRadius: 5,
            backgroundColor: "#9ca3af",
            margin: 1,
          }}
        />
      ))}
    </View>
  );
}
