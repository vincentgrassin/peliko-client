import React from "react";
import { Roll } from "../../components";

interface RollContainerProps {}

const RollContainer: React.FC<RollContainerProps> = ({ ...props }) => {
  return <Roll />;
};

export default RollContainer;
