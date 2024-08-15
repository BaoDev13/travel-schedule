import React, { useState } from 'react';
import axios from 'axios';
import './editTravel.css'

interface Travel {
    _id: string;
    name: string;
    startDate: string;
    endDate: string;
    description?: string;
    imageUrl?: string;
}

interface EditTravelModalProps {
    travel: Travel;
    onClose: () => void;
    onEdit: () => void;
}

const EditTravelModal: React.FC<EditTravelModalProps> = ({ travel, onClose, onEdit }) => {
    const [formData, setFormData] = useState<Travel>(travel);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/travels/${travel._id}`, formData);
            onEdit();
        } catch (error) {
            console.error('Could not edit the travel', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Edit Travel</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </label>
                    <label>
                        Start Date:
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
                    </label>
                    <label>
                        End Date:
                        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
                    </label>
                    <label>
                        Description:
                        <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
                    </label>
                    <label>
                        Image URL:
                        <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
                    </label>
                    <button type="submit">Save Changes</button>
                </form>
            </div>
        </div>
    );
};

export default EditTravelModal;
