import React, { useState } from 'react';
import TravelList from '../components/TravelList';
import AddTravel from '../components/AddTravel';

const Dashboard: React.FC = () => {
    const [refresh, setRefresh] = useState(false);

    const handleRefresh = () => {
        setRefresh(!refresh);
    };
    return (
        <div className='container'>
            <header className='header'>
                <h1>Travel Scheduler</h1>
            </header>
            <TravelList refresh={refresh} />
            <AddTravel onAdd={handleRefresh} />
        </div>
    );
};

export default Dashboard;