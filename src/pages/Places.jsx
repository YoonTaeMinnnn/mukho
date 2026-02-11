import React, { useState } from 'react';
import { useTrip } from '../store/TripContext';
import { Plus, Trash2, MapPin, Coffee, Utensils } from 'lucide-react';

const PlaceManager = () => {
    const { places, addPlace, removePlace } = useTrip();
    const [newPlaceName, setNewPlaceName] = useState('');
    const [newPlaceAddress, setNewPlaceAddress] = useState('');
    const [newPlaceDate, setNewPlaceDate] = useState('');
    const [newPlaceTime, setNewPlaceTime] = useState('');
    const [newPlaceNote, setNewPlaceNote] = useState('');
    const [category, setCategory] = useState('restaurant');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newPlaceName.trim()) return;

        addPlace({
            name: newPlaceName,
            category: category,
            address: newPlaceAddress,
            date: newPlaceDate,
            time: newPlaceTime,
            note: newPlaceNote
        });
        setNewPlaceName('');
        setNewPlaceAddress('');
        setNewPlaceDate('');
        setNewPlaceTime('');
        setNewPlaceNote('');
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

    // Safety check
    if (!places) return <div className="container mt-lg">Loading...</div>;

    return (
        <div className="container mt-lg">
            <h2 className="text-center font-bold mb-lg" style={{ fontSize: '2rem' }}>장소 관리</h2>

            <div className="grid-2-col gap-lg">
                {/* Add Form */}
                <div className="card bg-surface p-lg rounded-lg shadow-md h-fit">
                    <h3 className="font-bold mb-md text-xl">새 장소 추가</h3>
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
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-sm">주소 (선택)</label>
                            <input
                                type="text"
                                value={newPlaceAddress}
                                onChange={(e) => setNewPlaceAddress(e.target.value)}
                                placeholder="예: 강원도 동해시 ..."
                                className="w-full"
                                style={{ width: '100%' }}
                            />
                        </div>

                        <div className="grid-2-col gap-sm">
                            <div>
                                <label className="block text-sm font-bold mb-sm">날짜 (선택)</label>
                                <input
                                    type="date"
                                    value={newPlaceDate}
                                    onChange={(e) => setNewPlaceDate(e.target.value)}
                                    className="w-full"
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-sm">시간 (선택)</label>
                                <input
                                    type="time"
                                    value={newPlaceTime}
                                    onChange={(e) => setNewPlaceTime(e.target.value)}
                                    className="w-full"
                                    style={{ width: '100%' }}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-sm">설명 (선택)</label>
                            <input
                                type="text"
                                value={newPlaceNote}
                                onChange={(e) => setNewPlaceNote(e.target.value)}
                                placeholder="예: 바다가 보이는 멋진 카페"
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
                        {places.length === 0 && <p className="text-muted text-center py-md">등록된 장소가 없습니다.</p>}
                        {places.map((place) => (
                            <li
                                key={place.id}
                                className="place-item flex items-center justify-between p-md border rounded-md"
                            >
                                <div className="flex items-center gap-md">
                                    <div className="icon-box p-sm rounded-full" style={{ backgroundColor: '#f0f0f0' }}>
                                        {getIcon(place.category)}
                                    </div>
                                    <div>
                                        <div className="font-bold">{place.name}</div>
                                        <div className="text-sm text-muted">
                                            {getCategoryName(place.category)}
                                            {place.date && ` • ${place.date}`}
                                            {place.time && ` ${place.time}`}
                                        </div>
                                        {place.address && <div className="text-xs text-muted opacity-75 mt-xs">{place.address}</div>}
                                    </div>
                                </div>

                                <button onClick={() => removePlace(place.id)} className="text-red-500 hover:text-red-700 transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PlaceManager;
