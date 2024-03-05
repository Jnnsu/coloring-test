import axios from 'axios';

export default async function getGPTResponse(promptA: string, promptB: string) {
  const finalPrompt = promptA + promptB;

  try {
    const res = await axios.post(
      'https://api.openai.com/v4/completions',
      {
        model: 'text-davinci-003', // 모델은 예시이며, 사용 가능한 최신 모델로 설정해야 함
        prompt: finalPrompt,
        max_tokens: 50,
      },
      {
        headers: {
          Authorization: `Bearer YOUR_API_KEY`,
        },
      },
    );

    console.log(res.data.choices[0].text);
    return res.data.choices[0].text; // 결과 처리
  } catch (error) {
    console.error(error);
    throw Error;
  }
}
