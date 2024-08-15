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

const TravelDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [travel, setTravel] = useState<Travel | null>(null);

    useEffect(() => {
        const fetchTravel = async () => {
            const res = await axios.get(`http://localhost:5000/api/travels/${id}`);
            setTravel(res.data);
        };

        fetchTravel();
    }, [id]);

    if (!travel) return <div>Loading...</div>;

    return (
        <div>
            <h2>{travel.name}</h2>
            <p>{new Date(travel.startDate).toLocaleDateString()} - {new Date(travel.endDate).toLocaleDateString()}</p>
            <img src={travel.imageUrl} alt="Travel" width={300} />
            <p>{travel.description}</p>
        </div>
    );
};

export default TravelDetails;
