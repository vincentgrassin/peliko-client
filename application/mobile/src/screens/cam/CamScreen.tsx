import React from "react";
import { Cam } from "../../components";

interface CamContainerProps {}

const CamContainer: React.FC<CamContainerProps> = ({ ...props }) => {
  return <Cam />;
};

export default CamContainer;
