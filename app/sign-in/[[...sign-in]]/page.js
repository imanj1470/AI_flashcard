import { SignIn } from "@clerk/nextjs";
import { Button, Toolbar, Typography, Container, AppBar, Box } from "@mui/material";
import Link from "next/link"; // Correct import for Link

export default function SignUpPage() {
    return (
        <Container maxWidth="false" sx={{ display: "flex", flexDirection: "column", height: "calc(100vh - 64px)" }} // Adjust height to exclude AppBar height
        >
            <AppBar position="static" >
                <Toolbar style={{backgroundColor: "black", padding: 20, borderBottom: "1px solid grey"}} disableGutters={true} >
                <Typography variant="h6" style={{flexGrow: 1, fontWeight: "bold", fontSize: 25}}><Link href="/" style={{color:"white", textDecoration: "none"}}>FlashQ</Link></Typography>
                </Toolbar>
            </AppBar>

            <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    flexGrow={1}
                >
                <Typography padding={5} fontSize={40} fontWeight={"bold"}> 
                        Sign In
                </Typography>
                <SignIn/>
            </Box>
        </Container>
    );
}
