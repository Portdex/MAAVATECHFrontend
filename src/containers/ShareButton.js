import React, { useState } from 'react';
import { FiShare2, FiCopy } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon
import { useParams } from 'react-router-dom';

const ShareButton = ({ link }) => {
  const [copied, setCopied] = useState(false);
  const { username } = useParams();

  const currentUrl = window.location.href;
  const shareLink = currentUrl;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
  };

  const shareOnWhatsApp = () => {
    const message = `Check out ${username}'s profile: ${shareLink}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  const shareOnFacebook = () => {
    const message = `Check out ${username}'s profile: ${shareLink}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`;
    window.open(facebookUrl, '_blank');
  };
  return (
    
      
      <button className='share-button' onClick={shareOnWhatsApp}>
        <FiShare2 /> 
        {/* <button onClick={copyToClipboard}>
        {copied ? <FiCopy /> : <FiShare2 />}
      </button> */}
      </button>
  );
};

export default ShareButton;
