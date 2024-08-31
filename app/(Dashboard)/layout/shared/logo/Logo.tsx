import Link from "next/link";
import { Container, styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

type Demension = {
  height?: number
  width?: number 
}

const Logo = (props: Demension) => {
  return (
    <Container className="mx-auto my-8">
      <Image src="/images/logos/dark-logo.svg" alt="logo" height={props.height ? props.height : 300} width={props.width ? props.width :380} priority />
    </Container>
  );
};

export default Logo;
