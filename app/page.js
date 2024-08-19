"use client"
import Image from "next/image";
import getStripe from "@/utils/get_stripe";
import { useState, useEffect } from 'react';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Toolbar, Typography, Container, AppBar, Button, Box, Link } from "@mui/material";
import Head from "next/head"; // Correct import for Head
import { Typewriter } from 'react-simple-typewriter';
import { useRouter } from "next/navigation"
import { Layout, LoadingScreen } from './/components/layout'; //navbar layout
import { useUser, useAuth } from "@clerk/nextjs"

import {AllInclusive as InfinityIcon, Style as CardIcon, FolderCopy as FolderIcon} from '@mui/icons-material';

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
          <LoadingScreen/>
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
      justifyContent: 'center',
      gap: 4, // Space between boxes
      backgroundColor: 'black',
      p: 4, // Padding around the content
    }}
  >
    {/* Create Flashcards Box */}
    <Box
      sx={{
        width: 300,
        height: 200,
        backgroundColor: 'white',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        p: 2,
      }}
    >
      <CardIcon sx={{ fontSize: 40, mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        Create Flashcards
      </Typography>
      <Typography variant="body1">
        Quickly generate flashcards from your content with ease.
      </Typography>
    </Box>

    {/* Store Your Cards Box */}
    <Box
      sx={{
        width: 300,
        height: 200,
        backgroundColor: 'white',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        p: 2,
      }}
    >
      <FolderIcon sx={{ fontSize: 40, mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        Store Your Cards
      </Typography>
      <Typography variant="body1">
        Save and organize your flashcards in one convenient location.
      </Typography>
    </Box>

    {/* Subscription Service Box */}
    <Box
      sx={{
        width: 300,
        height: 200,
        backgroundColor: 'white',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        p: 2,
      }}
    >
      <InfinityIcon sx={{ fontSize: 40, mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        Subscription Service
      </Typography>
      <Typography variant="body1">
        Access premium features with our subscription plans.
      </Typography>
    </Box>
  </Box>

      </Layout >

    </>
  );
}
