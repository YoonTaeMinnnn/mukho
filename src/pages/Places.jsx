import React, { useState } from 'react';
import { useTrip } from '../store/TripContext';
import { Plus, Trash2, MapPin, Coffee, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PlaceManager = () => {
    const { places, addPlace, removePlace } = useTrip();
    const [newPlaceName, setNewPlaceName] = useState('');
    const [category, setCategory] = useState('restaurant');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newPlaceName.trim()) return;

        addPlace({
            name: newPlaceName,
            category: category,
            note: ''
        });
        setNewPlaceName('');
    };

    const getIcon = (cat) => {
        switch (cat) {
            case 'restaurant': return <Utensils size={18} />;
            case 'cafe': return <Coffee size={18} />;
            case 'spot': return <MapPin size={18} />;
            default: return <MapPin size={18} />;
        }
    };

    const getCategoryName = (cat) => {
        switch (cat) {
            case 'restaurant': return '맛집';
            case 'cafe': return '카페';
            case 'spot': return '명소';
            case 'accommodation': return '숙소';
            default: return '기타';
        }
    };

    const isFixed = (id) => id === 1 || id === 2; // Hardcoded fixed IDs for demo

    return (
        <motion.div
            className="container mt-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
        >
            <h2 className="text-center font-bold mb-lg" style={{ fontSize: '2rem' }}>장소 관리</h2>

            <div className="grid-2-col gap-lg">
                {/* Add Form */}
                <div className="card bg-surface p-lg rounded-lg shadow-md h-fit">
                    <h3 className="font-bold mb-md text-xl">새 장소 추가</h3>
                    {/* ... (form content remains same, just wrapper) ... */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-md">
                        <div>
                            <label className="block text-sm font-bold mb-sm">이름</label>
                            <input
                                type="text"
                                value={newPlaceName}
                                onChange={(e) => setNewPlaceName(e.target.value)}
                                placeholder="예: 논골담길 국수"
                                className="w-full"
                                style={{ width: '100%' }}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-sm">카테고리</label>
                            <div className="flex gap-sm">
                                {['restaurant', 'cafe', 'spot'].map(cat => (
                                    <button
                                        key={cat}
                                        type="button"
                                        className={`btn ${category === cat ? 'btn-primary' : 'btn-outline'}`}
                                        onClick={() => setCategory(cat)}
                                    >
                                        {cat === 'restaurant' ? '맛집' : cat === 'cafe' ? '카페' : '관광지'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="btn btn-secondary mt-sm">
                            <Plus size={18} className="mr-sm" /> 추가하기
                        </button>
                    </form>
                </div>

                {/* List */}
                <div className="card bg-surface p-lg rounded-lg shadow-md">
                    <h3 className="font-bold mb-md text-xl">내 여행 장소</h3>
                    <ul className="place-list flex flex-col gap-sm">
                        <AnimatePresence>
                            {places.map((place) => (
                                <motion.li
                                    key={place.id}
                                    className="place-item flex items-center justify-between p-md border rounded-md"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    layout
                                >
                                    <div className="flex items-center gap-md">
                                        <div className={`icon-box p-sm rounded-full bg-light`}>
                                            {getIcon(place.category)}
                                        </div>
                                        <div>
                                            <div className="font-bold">{place.name}</div>
                                            <div className="text-sm text-muted">{getCategoryName(place.category)}</div>
                                        </div>
                                    </div>

                                    {!isFixed(place.id) && (
                                        <button onClick={() => removePlace(place.id)} className="text-red-500 hover:text-red-700 transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                    {isFixed(place.id) && (
                                        <span className="text-xs bg-gray-200 px-2 py-1 rounded">오리지널</span>
                                    )}
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </ul>
                </div>
            </div>
        </motion.div>
    );
};

export default PlaceManager;
