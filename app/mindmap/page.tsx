"use client";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
import { Manager } from "@/visualizations/manager";
import { selectChart } from "@/store/chartSlice";
import { addNode, removeNode } from "@/store/chartSlice";
import Mindmap from "@/components/Mindmap";
import SidePanel from "@/components/SidePanel";

export default function Page() {
  return (
    <Box>
      <Mindmap />
      <SidePanel />
    </Box>
  );
}
