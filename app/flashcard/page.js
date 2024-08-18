"use client"
import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { db } from "@/app/firebase"

import { useSearchParams } from "next/navigation"

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser() //use []??
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
    const searchParams = useSearchParams()
    const search = searchParams.get(`id`)

    useEffect(() => {
        async function getFlashcard() {
            if (!search || !user) return
            const colRef = collection(doc(collection(db, "users"), user.id), search)
            const docs = await getDocs(colRef)
            const flashcards = []

            docs.array.forEach(doc => {
                flashcards.push({ id: doc.id, ...doc.data() })
            });
            setFlashcards(flashcards)
        }
        getFlashcard()
    }, [user, search])

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }





}