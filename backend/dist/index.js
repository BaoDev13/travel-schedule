"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
mongoose_1.default.connect(config_1.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Could not connect to MongoDB', err));
const travelSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String, required: false },
    imageUrl: { type: String, required: false },
});
const Travel = mongoose_1.default.model('Travel', travelSchema);
//lay du lieu cac chuyen di
app.get('/api/travels', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const travels = yield Travel.find();
    res.json(travels);
}));
//tao chuyen di
app.post('/api/travels', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newTravel = new Travel(req.body);
    yield newTravel.save();
    res.json(newTravel);
}));
//lay chi tiet chuyen di
app.get('/api/travels/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const travelDetail = yield Travel.findById(id);
    if (!travelDetail) {
        return res.status(404).json({ message: 'Travel not found' });
    }
    res.json(travelDetail);
}));
//cap nhat chuyen di
app.put('/api/travels/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const travelUpdate = yield Travel.findByIdAndUpdate(id);
    if (!travelUpdate) {
        return res.status(404).json({ message: 'Travel not found' });
    }
    res.json(travelUpdate);
}));
//xoa chuyen di
app.delete('/api/travels/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleteTravel = yield Travel.findByIdAndDelete(id);
        if (!deleteTravel) {
            return res.status(404).json({ message: 'Travel not found' });
        }
        res.json({ message: 'Travel deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
}));
app.listen(config_1.PORT, () => console.log(`Server started on port ${config_1.PORT}`));
