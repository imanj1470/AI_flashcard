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

            <AppBar position="static" >
                <Toolbar style={{ backgroundColor: "black", padding: 20, borderBottom: "1px solid grey" }} disableGutters={true} >
                    <Typography variant="h6" style={{ flexGrow: 1, fontWeight: "bold", fontSize: 25 }}><Link href="/" style={{ color: "white", textDecoration: "none" }}>FlashQ</Link></Typography>
                    <SignedOut>
                        <Button color="inherit" ><Link href="/sign-in" style={{ color: "white" }}>Sign In</Link></Button>
                        <Button color="inherit"><Link href="/sign-up" style={{ color: "white" }}>Sign Up</Link></Button>
                    </SignedOut>
                    <SignedIn>
                        <Button color="inherit" ><Link href="/generate" style={{ color: "white" }}>Generate</Link></Button>
                        <Button color="inherit"><Link href="/sign-up" style={{ color: "white" }}>Dashboard</Link></Button> 
                        {/* MAKE THESE SECTIONS PROPERLY LINK TO PAGES */}
                        **Make these sections properly link to paages and whatever**
                        <UserButton />

                    </SignedIn>
                </Toolbar>
            </AppBar>  {/* header end */}

            {/* main content */}
            <Box sx={{ textAlign: "center", my: 4, backgroundColor: "black" }}>
                {children}
            </Box>

        </Container>
    )
}

export default Layout;