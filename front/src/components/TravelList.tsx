import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditTravelModal from './EditTravel/EditTravelModal';

interface Travel {
    _id: string;
    name: string;
    startDate: string;
    endDate: string;
    description?: string;
    imageUrl?: string;
}

interface TravelListProps {
    refresh: boolean;
}

const TravelList: React.FC<TravelListProps> = ({ refresh }) => {
    const [travels, setTravels] = useState<Travel[]>([]);
    const [selectedTravel, setSelectedTravel] = useState<Travel | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTravels = async () => {
            const res = await axios.get('http://localhost:5000/api/travels');
            setTravels(res.data);
        };

        fetchTravels();
    }, [refresh]);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5000/api/travels/${id}`);
            setTravels(prevTravels => prevTravels.filter(travel => travel._id !== id));
        } catch (error) {
            console.error('Could not delete the travel', error);

        }
    };

    const handleEditClick = (travel: Travel) => {
        setSelectedTravel(travel);
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
        setSelectedTravel(null);
    };


    return (
        <div>
            <ul>
                {travels.map((travel) => (
                    <li key={travel._id} className="travel-item" style={{ flex: 1, cursor: 'pointer' }}>
                        <img src={travel.imageUrl} alt="Ảnh du lịch" width={150} />
                        <div onClick={() => navigate(`/travel/${travel._id}`)} style={{ flex: 1, cursor: 'pointer' }}>
                            <strong>{travel.name}</strong> - {new Date(travel.startDate).toLocaleDateString()} to {new Date(travel.endDate).toLocaleDateString()}
                            {travel.description && <div>Description: {travel.description}</div>}
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => handleEditClick(travel)}>Edit</button>
                            <button onClick={() => handleDelete(travel._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            {isEditModalOpen && selectedTravel && (
                <EditTravelModal
                    travel={selectedTravel}
                    onClose={handleCloseModal}
                    onEdit={() => {
                        setIsEditModalOpen(false);
                        setSelectedTravel(null);
                    }}
                />
            )}
        </div>
    );
};

export default TravelList;
