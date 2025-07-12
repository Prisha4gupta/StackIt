import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const createUserProfile = async (userId: string, userData: any) => {
  await setDoc(doc(db, 'users', userId), {
    ...userData,
    reputation: 0,
    badges: [],
    stats: {
      questions: 0,
      answers: 0,
      upvotes: 0
    }
  });
};

export const getUserProfile = async (userId: string) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const updateUserProfile = async (userId: string, updates: any) => {
  await updateDoc(doc(db, 'users', userId), updates);
};