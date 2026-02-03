import * as dotenv from 'dotenv';
dotenv.config();

import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { Pinecone } from '@pinecone-database/pinecone';
import { PineconeStore } from '@langchain/pinecone';

async function indexDocument(){

    // pdf read karo
    const PDF_PATH = './dsa.pdf';
    const pdfLoader = new PDFLoader(PDF_PATH);
    const rawDocs = await pdfLoader.load();
    console.log('PDF loading');
    console.log('   → Total pages:', rawDocs.length);
      if (!rawDocs.length || !rawDocs[0]?.pageContent) {
            throw new Error('❌ PDF is empty or unreadable!');
        }
    
    // chuncking karo    
     const textSplitter = new RecursiveCharacterTextSplitter({
     chunkSize: 1000,
     chunkOverlap: 200,
     });
     const chunkedDocs = await textSplitter.splitDocuments(rawDocs);
    
       console.log('chunking completed');
       console.log('   → Total chunks created:', chunkedDocs.length);
       if (!chunkedDocs.length) {
            throw new Error('❌ No chunks created! Text splitting failed.');
        }


    // vector embedding model
     const embeddings = new GoogleGenerativeAIEmbeddings({
     apiKey: process.env.GEMINI_API_KEY,
     model: 'text-embedding-004',
     });
      console.log('vector embedding configure');

     //database configure 
     // initialise pinecone client     
     const pinecone = new Pinecone({
        apiKey:process.env.PINECONE_API_KEY
     });
     const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);
     console.log('database configure');
      console.log('   → Index name:', process.env.PINECONE_INDEX_NAME);


     // langchain(chunking , embedding , database);
     await PineconeStore.fromDocuments(chunkedDocs, embeddings, {
      pineconeIndex,
      maxConcurrency: 5,
     });
     console.log('Data stored successfully');

   }

 indexDocument();