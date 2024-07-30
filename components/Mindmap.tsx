"use client";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
import { Manager } from "../visualizations/manager";
import { selectChart } from "@/store/chartSlice";
import { addNode, removeNode, editNode } from "@/store/chartSlice";
import { onToggle } from "@/store/panelSlice";

export default function Mindmap() {
  const dispatch = useDispatch();
  const jsonData = useSelector(selectChart);
  let containerRef = useRef<any>();
  let canvasRef = useRef<any>();

  const addNodeData = (node: Object) => {
    dispatch(addNode(node));
  };
  const removeNodeData = (parentData: Object) => {
    dispatch(removeNode(parentData));
  };
  const editNodeData = (data: String) => {
    dispatch(editNode(data));
  };
  const toggleNodeEditor = (isOpen: Boolean | String) => {
    dispatch(onToggle(isOpen));
  };
  let runOnce = false;

  useEffect(() => {
    const init = async () => {
      if (canvasRef.current && containerRef.current && !runOnce) {
        runOnce = true;
        Manager.initialize(
          800,
          600,
          0xeeeeee,
          document.getElementById("pixi-canvas"),
          document.getElementById("container"),
          jsonData,
          [addNodeData, removeNodeData, editNodeData, toggleNodeEditor],
        );
        await Manager.initializeLoader();
      }
    };
    init();
    console.log("rerendering");
  }, []);

  return (
    <Box
      ref={containerRef}
      id="container"
      w="100vw"
      h="93vh"
      position="absolute"
    >
      <canvas ref={canvasRef} id="pixi-canvas" />
    </Box>
  );
}
