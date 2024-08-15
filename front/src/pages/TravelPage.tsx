import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Travel {
    _id: string;
    name: string;
    startDate: string;
    endDate: string;
    description?: string;
    imageUrl?: string;
}

const TravelPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [travel, setTravels] = useState<Travel | null>(null);

    useEffect(() => {
        const fetchTravels = async () => {
            const res = await axios.get(`http://localhost:5000/api/travels/${id}`);
            setTravels(res.data);
        };
        fetchTravels();
    }, [id])

    if (!travel) return <div>Loading...</div>

    return (
        <div className="travel-details">
            <h1>{travel.name}</h1>
            <p>
                From {new Date(travel.startDate).toLocaleDateString()} to {new Date(travel.endDate).toLocaleDateString()}
            </p>
            <p>{travel.description}</p>
            {travel.imageUrl && <img src={travel.imageUrl} alt={travel.name} />}
        </div>
    );

};
export default TravelPage;