import React, { useState } from 'react';
import { MapPin, Home as HomeIcon, Map } from 'lucide-react';
import { motion } from 'framer-motion';
import MapModal from '../components/MapModal';
import { useTrip } from '../store/TripContext';

const Home = () => {
    const { places } = useTrip();
    const [selectedPlace, setSelectedPlace] = useState(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    // Group places by date
    const groupedPlaces = places.reduce((acc, place) => {
        const date = place.date || '날짜 미정';
        if (!acc[date]) acc[date] = [];
        acc[date].push(place);
        return acc;
    }, {});

    // Sort dates (dates first, then '날짜 미정')
    const sortedDates = Object.keys(groupedPlaces).sort((a, b) => {
        if (a === '날짜 미정') return 1;
        if (b === '날짜 미정') return -1;
        return a.localeCompare(b);
    });

    // Sort places within each date by time
    sortedDates.forEach(date => {
        groupedPlaces[date].sort((a, b) => {
            const timeA = a.time || '23:59'; // Put undefined time at the end
            const timeB = b.time || '23:59';
            return timeA.localeCompare(timeB);
        });
    });

    return (
        <>
            <motion.div
                className="container mt-lg"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.section className="hero text-center mb-xl" variants={itemVariants}>
                    <h1 className="text-primary font-bold" style={{ fontSize: '3.5rem', marginBottom: '1rem', letterSpacing: '-1px' }}>
                        묵호항 여행
                    </h1>
                    <p className="text-muted" style={{ fontSize: '1.25rem' }}>
                        바다의 낭만과 맛있는 음식이 있는 곳 (디자인 구려도 이해해 ㅡㅡ 아직 미완성이야)
                    </p>
                </motion.section>

                <motion.div variants={containerVariants}>
                    {sortedDates.map(date => (
                        <div key={date} className="timeline-section mb-xl">
                            <motion.h3
                                className="font-bold text-2xl mb-lg text-primary border-bottom pb-sm"
                                variants={itemVariants}
                            >
                                {date === '날짜 미정' ? '📅 일정 미정' : `📅 ${date}`}
                            </motion.h3>

                            <div className="grid-2-col gap-lg">
                                {groupedPlaces[date].map((place) => (
                                    <motion.div
                                        key={place.id}
                                        className="card bg-surface p-lg rounded-lg shadow-md border-top-primary hover-lift relative"
                                        variants={itemVariants}
                                    >
                                        {place.time && (
                                            <div className="absolute top-4 right-4 bg-light px-2 py-1 rounded text-sm font-bold text-primary">
                                                {place.time}
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between mb-md">
                                            <div className="flex items-center gap-sm text-primary">
                                                {place.category === 'accommodation' ? <HomeIcon size={28} /> : <MapPin size={28} />}
                                                <h2 className="font-bold text-xl">
                                                    {place.category === 'restaurant' ? '맛집' :
                                                        place.category === 'cafe' ? '카페' :
                                                            place.category === 'accommodation' ? '숙소' : '여행지'}
                                                </h2>
                                            </div>
                                            <button
                                                onClick={() => setSelectedPlace(place)}
                                                className="btn btn-outline flex items-center gap-xs text-sm py-1 px-2"
                                            >
                                                <Map size={14} /> 위치 보기
                                            </button>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-sm">{place.name}</h3>
                                        <p className="text-muted mb-sm">
                                            {place.note || (place.category === 'spot' ? '힐링 여행지' : '추천 장소')}
                                        </p>
                                        {place.address && <p className="text-sm text-muted opacity-75">{place.address}</p>}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            <MapModal
                isOpen={!!selectedPlace}
                onClose={() => setSelectedPlace(null)}
                address={selectedPlace?.address}
                name={selectedPlace?.name}
            />
        </>
    );
};

export default Home;
