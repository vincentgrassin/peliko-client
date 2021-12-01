import React from "react";
import { ImageSourcePropType } from "react-native";
import Svg, { Defs, G, Rect, Image, Use, ClipPath } from "react-native-svg";

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
      height="220px"
      viewBox="0 0 360 220"
      {...props}
      preserveAspectRatio="none"
    >
      <Defs>
        <Rect id="rect" x="0" y="0" width="100%" height="100%" rx="25" />
        <ClipPath id="clip">
          <Use href="#rect" x="0" y="0" />
        </ClipPath>
      </Defs>
      <G stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <Image
          x={0}
          y={0}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          opacity={0.8}
          href={url}
          clipPath="url(#clip)"
          //@ts-ignore
          rx={25}
        />
        <Rect
          fill={backgroundColor}
          x={0}
          y={-20}
          width={360}
          height={220}
          rx={20}
        />
        <Rect
          fillOpacity={0.502267264}
          fill="#FFF"
          x={16}
          y={172}
          width={6}
          height={8}
          rx={3}
        />
        <Rect
          fillOpacity={0.502267264}
          fill="#FFF"
          x={64}
          y={172}
          width={6}
          height={8}
          rx={3}
        />
        <Rect
          fillOpacity={0.502267264}
          fill="#FFF"
          x={40}
          y={172}
          width={6}
          height={8}
          rx={3}
        />
        <Rect
          fillOpacity={0.502267264}
          fill="#FFF"
          x={88}
          y={172}
          width={6}
          height={8}
          rx={3}
        />
        <Rect
          fillOpacity={0.502267264}
          fill="#FFF"
          x={112}
          y={172}
          width={6}
          height={8}
          rx={3}
        />
        <Rect
          fillOpacity={0.502267264}
          fill="#FFF"
          x={136}
          y={172}
          width={6}
          height={8}
          rx={3}
        />
        <Rect
          fillOpacity={0.502267264}
          fill="#FFF"
          x={160}
          y={172}
          width={6}
          height={8}
          rx={3}
        />
        <Rect
          fillOpacity={0.502267264}
          fill="#FFF"
          x={184}
          y={172}
          width={6}
          height={8}
          rx={3}
        />
        <Rect
          fillOpacity={0.502267264}
          fill="#FFF"
          x={208}
          y={172}
          width={6}
          height={8}
          rx={3}
        />
        <Rect
          fillOpacity={0.502267264}
          fill="#FFF"
          x={232}
          y={172}
          width={6}
          height={8}
          rx={3}
        />
        <Rect
          fillOpacity={0.502267264}
          fill="#FFF"
          x={256}
          y={172}
          width={6}
          height={8}
          rx={3}
        />
        <Rect
          fillOpacity={0.502267264}
          fill="#FFF"
          x={280}
          y={172}
          width={6}
          height={8}
          rx={3}
        />
        <Rect
          fillOpacity={0.502267264}
          fill="#FFF"
          x={304}
          y={172}
          width={6}
          height={8}
          rx={3}
        />
        <Rect
          fillOpacity={0.502267264}
          fill="#FFF"
          x={328}
          y={172}
          width={6}
          height={8}
          rx={3}
        />
      </G>
    </Svg>
  );
};

export default HeaderRollSvg;
