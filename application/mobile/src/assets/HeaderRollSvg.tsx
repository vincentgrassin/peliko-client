import * as React from "react";
import { ImageSourcePropType } from "react-native";
import Svg, { Defs, G, Rect, Use, ClipPath } from "react-native-svg";

export interface HeaderRollSvgProps {
  url?: ImageSourcePropType | undefined;
  backgroundColor?: string;
}
const HeaderRollSvg: React.FC<HeaderRollSvgProps> = ({
  url,
  backgroundColor,
  ...props
}) => {
  return (
    <Svg
      width="100%"
      height="60px"
      viewBox="0 0 360 100"
      {...props}
      preserveAspectRatio="none"
    >
      <Defs>
        <Rect id="rect" x="0" y="0" width="100%" height="60px" rx="25" />
        <ClipPath id="clip">
          <Use href="#rect" x="0" y="0" />
        </ClipPath>
      </Defs>
      <G stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <Rect
          fill={backgroundColor}
          x={0}
          y={-20}
          width={360}
          height={100}
          rx={20}
        />
        <Rect
          fillOpacity={0.502267264}
          fill="#FFF"
          x={16}
          y={20}
          width={6}
          height={20}
          rx={3}
        />
        <Rect
          fillOpacity={0.502267264}
          fill="#FFF"
          x={64}
          y={20}
          width={6}
          height={20}
          rx={3}
        />
        <Rect
          fillOpacity={0.502267264}
          fill="#FFF"
          x={40}
          y={20}
          width={6}
          height={20}
          rx={3}
        />
        <Rect
          fillOpacity={0.502267264}
          fill="#FFF"
          x={88}
          y={20}
          width={6}
          height={20}
          rx={3}
        />
        <Rect
          fillOpacity={0.502267264}
          fill="#FFF"
          x={112}
          y={20}
          width={6}
          height={20}
          rx={3}
        />
        <Rect
          fillOpacity={0.502267264}
          fill="#FFF"
          x={136}
          y={20}
          width={6}
          height={20}
          rx={3}
        />
        <Rect
          fillOpacity={0.502267264}
          fill="#FFF"
          x={160}
          y={20}
          width={6}
          height={20}
          rx={3}
        />
        <Rect
          fillOpacity={0.502267264}
          fill="#FFF"
          x={184}
          y={20}
          width={6}
          height={20}
          rx={3}
        />
        <Rect
          fillOpacity={0.502267264}
          fill="#FFF"
          x={208}
          y={20}
          width={6}
          height={20}
          rx={3}
        />
        <Rect
          fillOpacity={0.502267264}
          fill="#FFF"
          x={232}
          y={20}
          width={6}
          height={20}
          rx={3}
        />
        <Rect
          fillOpacity={0.502267264}
          fill="#FFF"
          x={256}
          y={20}
          width={6}
          height={20}
          rx={3}
        />
        <Rect
          fillOpacity={0.502267264}
          fill="#FFF"
          x={280}
          y={20}
          width={6}
          height={20}
          rx={3}
        />
        <Rect
          fillOpacity={0.502267264}
          fill="#FFF"
          x={304}
          y={20}
          width={6}
          height={20}
          rx={3}
        />
        <Rect
          fillOpacity={0.502267264}
          fill="#FFF"
          x={328}
          y={20}
          width={6}
          height={20}
          rx={3}
        />
      </G>
    </Svg>
  );
};

export default HeaderRollSvg;
