import axios from 'axios';

export const generateImageTest = async (
  promptDefault: string,
  customPrompt: string,
) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        model: 'dall-e-3',
        prompt: promptDefault + customPrompt,
        n: 1,
        size: '1024x1024',
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
      },
    );
    const generatedImageURL = response.data.data[0].url;
    return generatedImageURL;
  } catch (error) {
    console.error('Image generation failed:', error);
    alert('이미지 생성 실패. 다시 시도해주세요.');
  }
};
