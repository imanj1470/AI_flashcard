import Image from "next/image";
import getStripe from "@/utils/get_stripe"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import {Toolbar, Typography, Container, AppBar, Button } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Head>
        <Title>
          AI Flashcard
        </Title>
        <meta name="description" content="Create personalised flashcards from your textbooks"/>
      </Head>

      <AppBar position = "static">
        <Toolbar>
          <Typography variant="h6">AI Flashcards</Typography>
          <SignedOut>
            <Button>Login</Button>
            <Button>Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton/>
          </SignedIn>
        </Toolbar>
      </AppBar>
    </Container>
  );
}
