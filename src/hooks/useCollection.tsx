import { useEffect } from 'react'
import { useState } from 'react'
import { CollectionReference, DocumentData, collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

interface Channels{
    id: string,
    channel: DocumentData
}

const useCollection = (data:string) => {
  const [documents,setDocuments]=useState<Channels[]>([])
  const collectionRef: CollectionReference<DocumentData> = collection(db, data);
  useEffect(()=>{
    onSnapshot(collectionRef,(QuerySnapshot)=>{
      const channelsResults: Channels[] =[];
      QuerySnapshot.docs.forEach((doc)=>{
        channelsResults.push({
          id:doc.id,
          channel:doc.data()});
      });
      setDocuments(channelsResults)
    })
    
  },[])
    return{documents}
}

export default useCollection