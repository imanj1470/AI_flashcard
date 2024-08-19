import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Toolbar, Typography, Container, AppBar, Button, Box } from "@mui/material";
import Head from "next/head"; // Correct import for Head

const Layout = ({ children }) => {
    return (
        <Container maxWidth="false" disableGutters={true} style={{ backgroundColor: "black" }}> {/* header start */}
            <Head>
                <title>FlashQ</title> {/* Correct usage of title */}
                <meta name="description" content="Create personalized flashcards from your textbooks" />
            </Head>

            <AppBar position="static" sx={{ backgroundColor: "black", borderBottom: "1px solid grey" }}>
            <Toolbar sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", fontSize: 25 }}>
                    <Link href="/" style={{ color: "white", textDecoration: "none" }}>FlashQ</Link>
                </Typography>
                
                {/* Signed Out Section */}
                <SignedOut>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button color="inherit">
                            <Link href="/sign-in" style={{ color: "white", textDecoration: "none" }}>Sign In</Link>
                        </Button>
                        <Button color="inherit">
                            <Link href="/sign-up" style={{ color: "white", textDecoration: "none" }}>Sign Up</Link>
                        </Button>
                    </Box>
                </SignedOut>
                
                {/* Signed In Section */}
                <SignedIn>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button color="inherit">
                                <Link href="/generate" style={{ color: "white", textDecoration: "none" }}>Generate</Link>
                            </Button>
                            <Button color="inherit">
                                <Link href="/flashcards" style={{ color: "white", textDecoration: "none" }}>Flashcards</Link>
                            </Button>
                        </Box>
                        <UserButton sx={{ ml: 2 }} /> {/* Adjust margin-left for spacing */}
                    </Box>
                </SignedIn>
            </Toolbar>
        </AppBar>

            {/* main content */}
            <Box sx={{ textAlign: "center", my: 4, backgroundColor: "black" }}>
                {children}
            </Box>

        </Container>
    )
}

const MyTitle = ({ text }) => {
    return (
        <Box width="100vw" display="flex" justifyContent="center" mb={4}>
            <Typography variant="h3">{text}</Typography>
        </Box>
    )
}


const LoadingScreen = () => {
    return (
        <Box sx={{
            display: "grid",
            placeItems: "center",
            height: "100vh",
            textAlign: "center",
        }}>
            <Typography variant="h2">Loading...</Typography>
        </Box>
    )
}


export { Layout, MyTitle, LoadingScreen }