import Image from "next/image";
import getStripe from "@/utils/get_stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Toolbar, Typography, Container, AppBar, Button, Box } from "@mui/material";
import Head from "next/head"; // Correct import for Head

export default function Home() {
  return (
    <Container maxWidth="false" disableGutters={true} style={{backgroundColor: "black"}}>
      <Head>
        <title>AI Flashcard</title> {/* Correct usage of title */}
        <meta name="description" content="Create personalized flashcards from your textbooks" />
      </Head>

      <AppBar position="static" >
        <Toolbar style={{backgroundColor: "black", padding: 20, borderBottom: "1px solid grey"}} disableGutters={true} >
          <Typography variant="h6" style={{flexGrow: 1, fontWeight: "bold", fontSize: 25}}>FlashQ</Typography>
          <SignedOut>
            <Button color = "inherit">Login</Button>
            <Button color = "inherit">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box  sx={{textAlign:"center", my: 4, backgroundColor: "black"}}>
        <Typography variant="h2" style={{fontWeight:"bold"}}> Welcome to FlashQ</Typography>
        <Typography variant="h5"  style={{color:"grey"}}> The easiest way to make flashcards</Typography>
        <Button variant="contained" color="primary" sx={{mt:  2,backgroundColor:"white", color: "black", borderRadius: 2, paddingLeft:2.5, paddingRight:2.5, fontSize:16,  textTransform: "none", '&:hover': {backgroundColor: "#DCDCDC", color: "black"},}}>
          Get Started</Button>
      </Box>
    </Container>
  );
}
