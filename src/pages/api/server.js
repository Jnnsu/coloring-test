// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { Configuration, OpenAIApi } = require('openai');

// const app = express();
// const { OPENAI_API_KEY } = process.env;

// const configuration = new Configuration({
//   apiKey: OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// app.use(bodyParser.json());
// app.use(cors());

// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });

// app.post('/create', async (req, res) => {
//   const { prompt } = req.body;
//   try {
//     const response = await openai.createImage({
//       model: 'dall-e-2',
//       prompt: prompt,
//       n: 1,
//       size: '512x512',
//     });
//     res.json({ imageUrl: response.data[0].url });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// });

// module.exports = app;
