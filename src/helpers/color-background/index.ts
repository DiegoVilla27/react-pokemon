import { Rgb } from "@/interfaces/colors";

export const ColorBackground = (color?: string | number | Rgb): string => {
  if (color) {
    const colorMapType: Rgb = color as Rgb;
    return `rgb(${colorMapType[0]}, ${colorMapType[1]}, ${colorMapType[2]})`;
  }
  return "rgb(0, 0, 0)";
};
