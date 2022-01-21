import { useState } from 'react';
import Head from 'next/head'
import {  Button, Headline, Modal, styled } from 'newskit';

const Dummy = styled.div`
    color: red;
    border: 1px solid violet;
    width: 100px;
    height: 100px;
`;

export const config = {
  unstable_runtimeJS: false
};


const NewskitPage = () => {

    const [showModal, setShowModal] = useState(false);

    
    
    return (
        <div>
            
            <Head>
                <title>NewsKit Emotion Combination</title>
            </Head>
            
            <div>
                <Headline>Emotional Newskit</Headline>
                <Button onClick={() => {
                    console.log('show modal');
                    setShowModal(true);
                }}>Open modal</Button>
            </div>
            <Dummy />
            <Modal open={showModal} onDismiss={()=>setShowModal(false)}>Modal content</Modal>
        </div>
    )
}

export default NewskitPage;
