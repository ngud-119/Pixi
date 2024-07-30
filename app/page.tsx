"use client";
import { Box } from "@chakra-ui/react";
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
