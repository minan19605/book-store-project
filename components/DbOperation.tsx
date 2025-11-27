import React from 'react'
import {db } from '../firebase/init'
import {doc, setDoc, collection, getDocs, query, deleteDoc} from 'firebase/firestore'

export async function addBookToLibrary(userId:string, bookId:string): Promise<void> {
    if (!userId) {
        throw new Error('Invalid user')
    }

    // Path: users/{userId}/library/{book.id}
    const libraryRef = doc(db, 'users', userId, 'library', bookId)

    await setDoc(libraryRef, {bookId}, {merge: true})
}

export async function removeBookFromLibrary(userId:string, bookId:string): Promise<void> {
    if(!userId){
        throw new Error('Invalid user')
    }

    const libraryRef = doc(db, 'users', userId, 'library', bookId)
    await deleteDoc(libraryRef)
}

export async function fetchUserLibrary(userId:string):Promise<string[]> {
    if(!userId) return [];

    const libraryRef = collection(db, 'users', userId, 'library');
    const snapshot = await getDocs(libraryRef);

    const bookList: string[] = [];
    snapshot.forEach(doc => {
        bookList.push(doc.id)
    })

    return bookList;
}

export async function addBookToFinished(userId:string, bookId:string): Promise<void> {
    if (!userId) {
        throw new Error('Invalid user')
    }

    // Path: users/{userId}/library/{book.id}
    const libraryRef = doc(db, 'users', userId, 'finished', bookId)

    await setDoc(libraryRef, {bookId}, {merge: true})
}

export async function fetchUserFinished(userId:string):Promise<string[]> {
    if(!userId) return [];

    const libraryRef = collection(db, 'users', userId, 'finished');
    const snapshot = await getDocs(libraryRef);

    const bookList: string[] = [];
    snapshot.forEach(doc => {
        bookList.push(doc.id)
    })

    return bookList;
}