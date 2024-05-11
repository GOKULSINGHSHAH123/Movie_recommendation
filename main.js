const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors')
const app = express();
const path = require('path')

app.use(express.json());
app.use(cors())

// app.get('*',(req,res) =>{
//     res.sendFile(path.join(__dirname,'/Frontend/index.html'))
//   })



app.post('/', (req, res) => {

    const { movieName } = req.body;
    const pythonProcess = spawn('python', ['./python.py', movieName]);

    pythonProcess.stdout.on('data', function(data) {
        try {
            const movies = JSON.parse(data.toString());
            res.status(200).json(movies);
        } catch (error) {
            res.status(500).send('Error parsing movie data');
        }

    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.log(`Python script exited with code ${code}`);
            res.status(500).send('Failed to retrieve movies');
        }
    });
});

app.get('/', (req, res) => {

    const pythonProcess = spawn('python', ['./python.py', 'Avatar']);

    pythonProcess.stdout.on('data', function(data) {
        try {
            const movies = JSON.parse(data.toString());
            res.status(200).json(movies);
        } catch (error) {
            res.status(500).send('Error parsing movie data');
        }

    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.log(`Python script exited with code ${code}`);
            res.status(500).send('Failed to retrieve movies');
        }
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
