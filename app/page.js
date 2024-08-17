"use client"
import Image from "next/image";
import getStripe from "@/utils/get_stripe";
import { useState, useEffect } from 'react';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Toolbar, Typography, Container, AppBar, Button, Box, Link } from "@mui/material";
import Head from "next/head"; // Correct import for Head
import { Typewriter } from 'react-simple-typewriter';


export default function Home() {
  return (
    <Container maxWidth="false" disableGutters={true} style={{ backgroundColor: "black" }}>
      <Head>
        <title>FlashQ</title> {/* Correct usage of title */}
        <meta name="description" content="Create personalized flashcards from your textbooks" />
      </Head>

      <AppBar position="static" >
        <Toolbar style={{ backgroundColor: "black", padding: 20, borderBottom: "1px solid grey" }} disableGutters={true} >
          <Typography variant="h6" style={{ flexGrow: 1, fontWeight: "bold", fontSize: 25 }}><Link href="/" style={{ color: "white", textDecoration: "none" }}>FlashQ</Link></Typography>
          <SignedOut>
            <Button color="inherit" ><Link href="/sign-in" style={{ color: "white" }}>Sign In</Link></Button>
            <Button color="inherit"><Link href="/sign-up" style={{ color: "white" }}>Sign Up</Link></Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box sx={{ textAlign: "center", my: 4, backgroundColor: "black" }}>
        <Typography variant="h2" style={{ fontWeight: "bold" }}>Welcome to FlashQ</Typography>
        {/* ["Fast Track Your Learning with Automated Flashcards.",
            "Produce High Quality Cards Within Seconds.",
            "Seamlessly Track Your Progress."] */}
            
        <Typography variant="h5" padding={0.5} style={{ color: "grey" }}>
          <Typewriter padding={5} words={
            ["Fast Track Your Learning with Automated Flashcards.",
              "Produce High Quality Cards Within Seconds.",
              "Seamlessly Track Your Progress."]
          }
            loop={0}
            cursor
            typeSpeed={25}
            deleteSpeed={10}
            delaySpeed={2000}
          />
        </Typography>

        <Button variant="contained" color="primary" sx={{ mt: 2, backgroundColor: "white", color: "black", borderRadius: 2, paddingLeft: 2.5, paddingRight: 2.5, fontSize: 16, textTransform: "none", '&:hover': { backgroundColor: "#DCDCDC", color: "black" }, }}>
          Get Started</Button>
      </Box>
    </Container>
  );
}
