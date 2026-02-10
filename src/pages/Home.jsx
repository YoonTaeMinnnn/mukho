import React from 'react';
import { MapPin, Home as HomeIcon } from 'lucide-react';

import { motion } from 'framer-motion';

const Home = () => {
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
                    바다의 낭만과 맛있는 음식이 있는 곳
                </p>
            </motion.section>

            <motion.div className="grid-2-col gap-lg" variants={containerVariants}>
                <motion.div className="card bg-surface p-lg rounded-lg shadow-md border-top-primary hover-lift" variants={itemVariants}>
                    <div className="flex items-center gap-sm mb-md text-primary">
                        <MapPin size={28} />
                        <h2 className="font-bold text-xl">여행지</h2>
                    </div>
                    <h3 className="text-2xl font-bold mb-sm">묵호항</h3>
                    <p className="text-muted">
                        강원도 동해시의 아름다운 항구. 논골담길, 묵호등대 등 볼거리가 가득한 힐링 여행지입니다.
                    </p>
                </motion.div>

                <motion.div className="card bg-surface p-lg rounded-lg shadow-md border-top-secondary hover-lift" variants={itemVariants}>
                    <div className="flex items-center gap-sm mb-md text-secondary">
                        <HomeIcon size={28} />
                        <h2 className="font-bold text-xl">숙소</h2>
                    </div>
                    <h3 className="text-2xl font-bold mb-sm">어달을담다</h3>
                    <p className="text-muted">
                        오션뷰가 멋진 감성 펜션. 편안한 휴식과 함께 동해의 일출을 즐길 수 있는 공간입니다.
                    </p>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Home;
