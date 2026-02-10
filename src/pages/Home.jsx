import React, { useState } from 'react';
import { MapPin, Home as HomeIcon, Map } from 'lucide-react';
import { motion } from 'framer-motion';
import MapModal from '../components/MapModal';
import { useTrip } from '../store/TripContext';

const Home = () => {
    const { places } = useTrip();
    const [selectedPlace, setSelectedPlace] = useState(null);

    const mukhoPlace = places.find(p => p.id === 1) || { name: '묵호항', address: '강원도 동해시 묵호진동 13-1' };
    const eodalPlace = places.find(p => p.id === 2) || { name: '어달을담다', address: '강원도 동해시 일출로 305' };

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

                <motion.div className="grid-2-col gap-lg" variants={containerVariants}>
                    <motion.div className="card bg-surface p-lg rounded-lg shadow-md border-top-primary hover-lift" variants={itemVariants}>
                        <div className="flex items-center justify-between mb-md">
                            <div className="flex items-center gap-sm text-primary">
                                <MapPin size={28} />
                                <h2 className="font-bold text-xl">여행지</h2>
                            </div>
                            <button
                                onClick={() => setSelectedPlace(mukhoPlace)}
                                className="btn btn-outline flex items-center gap-xs text-sm py-1 px-2"
                            >
                                <Map size={14} /> 위치 보기
                            </button>
                        </div>
                        <h3 className="text-2xl font-bold mb-sm">묵호항</h3>
                        <p className="text-muted mb-sm">
                            강원도 동해시의 아름다운 항구. 논골담길, 묵호등대 등 볼거리가 가득한 힐링 여행지입니다.
                        </p>
                        <p className="text-sm text-muted opacity-75">{mukhoPlace.address}</p>
                    </motion.div>

                    <motion.div className="card bg-surface p-lg rounded-lg shadow-md border-top-secondary hover-lift" variants={itemVariants}>
                        <div className="flex items-center justify-between mb-md">
                            <div className="flex items-center gap-sm text-secondary">
                                <HomeIcon size={28} />
                                <h2 className="font-bold text-xl">숙소</h2>
                            </div>
                            <button
                                onClick={() => setSelectedPlace(eodalPlace)}
                                className="btn btn-outline flex items-center gap-xs text-sm py-1 px-2"
                                style={{ borderColor: 'var(--color-secondary)', color: 'var(--color-secondary)' }}
                            >
                                <Map size={14} /> 위치 보기
                            </button>
                        </div>
                        <h3 className="text-2xl font-bold mb-sm">어달을담다</h3>
                        <p className="text-muted mb-sm">
                            오션뷰가 멋진 감성 펜션. 편안한 휴식과 함께 동해의 일출을 즐길 수 있는 공간입니다.
                        </p>
                        <p className="text-sm text-muted opacity-75">{eodalPlace.address}</p>
                    </motion.div>
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
