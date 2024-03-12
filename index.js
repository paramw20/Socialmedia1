const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000; // You can use any available port
const cors = require('cors');

app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://112115125:sJAlNjs92AaysQS1@cluster0.nrko4tr.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a MongoDB model (Schema)
const reports = mongoose.model('reports', {
    url: String,
});

app.get('/', (req, res,next) => {
  try {
    return res.status(200).json({
      message: "Running"
    });
  } catch (error) {
    console.log(error);
    return res.statusCode(500).json({
      message: error
    });
  }
  
});
app.get('/api/data', async (req, res) => {
  try {
    const data = await reports.find();
    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
