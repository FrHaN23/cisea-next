import { Box, styled } from "@mui/material";
import Image from "next/image";

const LogoBig = () => {
  return (
    <Box sx={{
        height: "180px",
        width: "320px",
        overflow: "hidden",
        display: "block",
    }}>
      <Image src="/images/logos/stiker.png" alt="logo" height={400} width={800} priority />
    </Box>
  );
};

export default LogoBig;
