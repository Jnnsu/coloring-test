import React, { useState } from 'react';
import axios from 'axios';
import { DEFAULT_PROMPT } from '@/constants/constants';

const ImageGenerator = () => {
  const [image, setImage] = useState('');

  const generateImage = async () => {
    console.log(process.env.NEXT_PUBLIC_OPENAI_API_KEY);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          model: 'dall-e-2',
          prompt: DEFAULT_PROMPT,
          n: 1,
          size: '1024x1024',
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
        },
      );
      console.log(response);
      const generatedImageURL = response.data.data[0].url;
      setImage(generatedImageURL);
    } catch (error) {
      console.error('Image generation failed:', error);
    }
  };

  return (
    <div>
      <button onClick={generateImage}>Generate Image</button>
      {image && <img src={image} alt="Generated" />}
    </div>
  );
};

export default ImageGenerator;
