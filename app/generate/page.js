"use client"
import { useUser, useAuth } from "@clerk/nextjs"
import { Container, Typography, Box, Paper, TextField} from "@mui/material"
import { writeBatch } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Layout from '../components/layout'; //navbar layout

export default function Generate() {
    const { isLoaded, isSignedIn, user } = useUser() //use []??
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
    const [text, setText] = useState("")
    const [name, setName] = useState("")
    const [open, setOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (!isSignedIn) {     //this redirectts users who are not signed in. uncomment for production
            router.push('/');
        }
    }, [isSignedIn, router]);

    if (!isSignedIn) {
        
        return (
            <Box sx={{ 
                display: "grid",
                placeItems: "center",
                height:"100vh",
                textAlign:"center",
                }}>
                <Typography variant="h2">Loading...</Typography>
            </Box>
        )
    }

    const handleSubmit = async () => {
        fetch("api/generate", {
            method: "POST",
            body: text,
        })
            .then((res) => res.json())
            .then(data > setFlashcards(data))
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
        flashcaards.forEach((flashcard) => {
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
                    <Typography variant="h4">Generate Flashcards</Typography>
                    <Paper sx={{p:4, width: "100%"}}>
                        <TextField value={text}
                        onChange={(e) => setText(e.target.value)}
                        label = "Enter Text" fullWidth multiline rows={4} variant="outlined"
                        sx={{
                            mb: 2
                        }}
                        />
                    </Paper>
                </Box>
            </Container>
        </Layout>
    )
}