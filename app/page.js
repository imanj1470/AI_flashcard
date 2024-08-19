"use client"
import Image from "next/image";
import getStripe from "@/utils/get_stripe";
import { useState, useEffect } from 'react';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Toolbar, Typography, Container, AppBar, Button, Box, Link } from "@mui/material";
import Head from "next/head"; // Correct import for Head
import { Typewriter } from 'react-simple-typewriter';
import { useRouter } from "next/navigation"
import { Layout } from './/components/layout'; //navbar layout
import { useUser, useAuth } from "@clerk/nextjs"

import {AllInclusive as AllInclusiveIcon,} from '@mui/icons-material';

export default function Home() {
  const router = useRouter()
  const { isLoaded, isSignedIn, user } = useUser() //use []??

  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_session", {
      method: "POST",
      headers: {
        origin: "http://localhost:3000",
      },
    })
    const checkoutSessionJson = await checkoutSession.json()
    if (checkoutSession.statusCode === 500){
      console.error(checkoutSession.message)
      return
    }
    const stripe = await getStripe()
    const {error} = await stripe.redirectToChecout({
      sessionId: checkoutSessionJson.id
    })
    if (error) {
      console.warn(error.message)
    }
  }
  return (
    <>
      <Layout>
        <Typography variant="h2" style={{ fontWeight: "bold" }}>Welcome to FlashQ</Typography>
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

        <Button onClick={() => {
          if (!isSignedIn) {
            router.push('/sign-up')
          } else {
            router.push('/generate')
          }
        }
        } variant="contained" color="primary" sx={{ mt: 2, backgroundColor: "white", color: "black", borderRadius: 2, paddingLeft: 2.5, paddingRight: 2.5, fontSize: 16, textTransform: "none", '&:hover': { backgroundColor: "#DCDCDC", color: "black" }, }}
        >Try now</Button>
    
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center', // Center horizontally
        gap: 4, // Space between boxes
        backgroundColor: 'black', // Background color of the parent container
        p: 4, // Padding of the parent container
        mt: 4, // Margin top
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '80%',
        }}
      >
        <Box
          sx={{
            flex: 1,
            margin: '0 10px',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AllInclusiveIcon sx={{
        fontSize: 75, // Size of the icon
        color: 'black', // Color of the icon
        mb: 2, // Margin bottom to space between icon and text
      }}/>
          <Typography color="black" variant="h8">Generate flashcards quickly from your text. Tailor the content to your study needs.</Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            margin: '0 10px',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography color="black" variant="h8">Easily save and organize your flashcards. Access them anytime from your personal library.</Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            margin: '0 10px',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography color="black" variant="h8">Unlock premium features with our subscription service. Get advanced tools and unlimited access.</Typography>
        </Box>
      </Box>
    </Box>

      </Layout >

    </>
  );
}
