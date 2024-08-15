import express, { Request, Response } from 'express';
import mongoose, { mongo } from 'mongoose';
import cors from 'cors';
import { MONGODB_URI } from './config/config';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Could not connect to MongoDB', err));

interface ITravel extends mongoose.Document {
    name: string;
    startDate: Date;
    endDate: Date;
    description: string;
    imageUrl: string;
}

const travelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String, required: false },
    imageUrl: { type: String, required: false },
});


const Travel = mongoose.model<ITravel>('Travel', travelSchema);

//lay du lieu cac chuyen di
app.get('/api/travels', async (req: Request, res: Response) => {
    const travels = await Travel.find();
    res.json(travels);
});

//tao chuyen di
app.post('/api/travels', async (req: Request, res: Response) => {
    const newTravel = new Travel(req.body);
    await newTravel.save();
    res.json(newTravel);
})
//lay chi tiet chuyen di
app.get('/api/travels/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const travelDetail = await Travel.findById(id);
    if (!travelDetail) {
        return res.status(404).json({ message: 'Travel not found' });
    }
    res.json(travelDetail);
})

//cap nhat chuyen di
app.put('/api/travels/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const travelUpdate = await Travel.findByIdAndUpdate(id);
    if (!travelUpdate) {
        return res.status(404).json({ message: 'Travel not found' })
    }
    res.json(travelUpdate);
})

//xoa chuyen di
app.delete('/api/travels/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteTravel = await Travel.findByIdAndDelete(id);
        if (!deleteTravel) {
            return res.status(404).json({ message: 'Travel not found' });
        }
        res.json({ message: 'Travel deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', err })
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));