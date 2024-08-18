"use client"
import Image from "next/image";
import getStripe from "@/utils/get_stripe";
import { useState, useEffect } from 'react';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Toolbar, Typography, Container, AppBar, Button, Box, Link } from "@mui/material";
import Head from "next/head"; // Correct import for Head
import { Typewriter } from 'react-simple-typewriter';

import Layout from './/components/layout'; //navbar layout

export default function Home() {
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

        <Button variant="contained" color="primary" sx={{ mt: 2, backgroundColor: "white", color: "black", borderRadius: 2, paddingLeft: 2.5, paddingRight: 2.5, fontSize: 16, textTransform: "none", '&:hover': { backgroundColor: "#DCDCDC", color: "black" }, }}>
          Get Started</Button>
    </Layout >
    </>
  );
}
