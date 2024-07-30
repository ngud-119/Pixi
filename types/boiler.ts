import React, { ReactNode } from "react";

export interface ChildrenHOCProp {
  // children: React.ReactElement[] | React.ReactElement
  children: any;
}

export interface ClientRootProps {
  children: ReactNode;
}
