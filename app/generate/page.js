"use client"
import { useUser, useAuth } from "@clerk/nextjs"
import {
    Grid, Container, Typography, Box, Paper, TextField, Button, Card,
    CardActionArea, CardContent, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { db } from "@/app/firebase"
import { Layout, LoadingScreen, MyTitle } from '../components/layout'; //navbar layout
import { doc, collection, setDoc, getDoc, writeBatch, cardDocRef } from "firebase/firestore"

export default function Generate() {
    const { isLoaded, isSignedIn, user } = useUser() //use []??
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
    const [text, setText] = useState("")
    const [name, setName] = useState("")
    const [open, setOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (!isSignedIn) {     //this redirectts users who are not signed in.
            router.push('/');
        }
    }, [isSignedIn, router]);

    if (!isSignedIn) {

        return (
            <LoadingScreen />
        )
    }

    const handleSubmit = async () => {
        fetch("api/generate", {
            method: "POST",
            body: text,
        })
            .then((res) => res.json())
            .then((data) => setFlashcards(data))
            .catch((error) => console.error("Error:", error));
    }
    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const saveFlashcards = async () => {
        if (!name) {
            alert("please enter a name")
            return
        }

        const batch = writeBatch(db)
        const userDocRef = doc(collection(db, "users"), user.id)
        const docSnap = await getDoc(userDocRef)

        if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || []
            if (collections.find((f) => f.name === name)) {
                alert("Flashcard collection with the same name already exists")
                return
            }
            else {
                collections.push({ name })
                batch.set(userDocRef, { flashcards: collections }, { merge: true })

            }
        }
        else {
            batch.set(userDocRef, { flashcards: [{ name }] })
        }
        const colRef = collection(userDocRef, name)
        flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colRef)
            batch.set(cardDocRef, flashcard)
        });

        await batch.commit()
        handleClose()
        router.push("/flashcards")
    }

    //actual components for flashcards

    return (
        <Layout>
            <Container maxWidth="md">
                <Box sx={{
                    mt: 4, mb: 6, display: "flex", flexDirection: "column", alignItems: "center"
                }}>
                    <MyTitle text="Generate flashcards" />
                    <Paper sx={{ p: 4, width: "100%" }}>
                        <TextField value={text}
                            onChange={(e) => setText(e.target.value)}
                            label="Enter Text" fullWidth multiline rows={4} variant="outlined"
                            sx={{
                                mb: 2
                            }} />
                        <Button
  variant="contained"
  sx={{
    backgroundColor: '#4CAF50', // Vibrant green color for the button
    color: 'white', // Text color to be white
    '&:hover': {
      backgroundColor: '#45A049', // Slightly darker green for hover effect
    },
    '&:active': {
      backgroundColor: '#388E3C', // Even darker green for active state
    },
    borderRadius: 2, // Optional: rounded corners
    padding: '8px 16px', // Optional: padding for better sizing
    fontSize: '16px', // Optional: font size for better readability
  }}
  onClick={handleSubmit}
  fullWidth
>
  Submit
</Button>

                    </Paper>
                </Box>
                {flashcards.length > 0 && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5">Preview</Typography>
                        <Grid container spacing={3}>
                            {flashcards.map((flashcard, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card>
                                        <CardActionArea onClick={() => {
                                            handleCardClick(index)
                                        }}>
                                            <CardContent>
                                                <Box sx={{
                                                    perspective: "1000px",
                                                    "& > div": {
                                                        transition: "transform 0.6s",
                                                        transformStyle: "preserve-3d",
                                                        position: "relative",
                                                        width: "100%",
                                                        height: "200px",
                                                        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                                                        transform: flipped[index] ?
                                                            "rotateY(180deg)" : "rotateY(0deg)",
                                                    },

                                                    "& > div > div": {
                                                        position: "absolute",
                                                        width: "100%",
                                                        height: "100%",
                                                        backfaceVisibility: "hidden",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        padding: 2,
                                                        boxSizing: "border-box",
                                                    },

                                                    "& > div > div:nth-of-type(2)": {
                                                        transform: "rotateY(180deg)"
                                                    }
                                                }}>
                                                    <div>
                                                        <div><Typography variant="h6"
                                                            component="div">{flashcard.front}</Typography>
                                                        </div>
                                                        <div><Typography variant="h6"
                                                            component="div">{flashcard.back}</Typography>
                                                        </div>
                                                    </div>
                                                </Box>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: 'white',
                                    color: 'black',
                                    '&:hover': {
                                        backgroundColor: '#f0f0f0', // Light gray for hover effect
                                        color: 'black',
                                    },
                                    '&:active': {
                                        backgroundColor: '#e0e0e0', // Slightly darker gray for active state
                                    },
                                }}
                                onClick={handleOpen}
                            >
                                Save
                            </Button>
                        </Box>
                    </Box>
                )}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Save Flashcards</DialogTitle>
                    <DialogContent>Please enter a name for your collection</DialogContent>
                    <TextField autoFocus margin="dense" label="Collection Name" type="text"
                        fullWidth value={name} onChange={(e) => setName(e.target.value)}
                        varaint="outlined"></TextField>
                    <DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={saveFlashcards}>Save</Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>

            </Container>
        </Layout>
    )
}