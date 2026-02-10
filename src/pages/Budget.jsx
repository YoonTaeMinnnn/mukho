import React, { useState } from 'react';
import { useTrip } from '../store/TripContext';
import { Plus, Trash2, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BudgetManager = () => {
    const { budgetItems, addBudgetItem, removeBudgetItem } = useTrip();
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('food'); // food, transport, stay, etc

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description.trim() || !amount) return;

        addBudgetItem({
            description,
            amount: parseInt(amount, 10),
            category
        });
        setDescription('');
        setAmount('');
    };

    const totalBudget = budgetItems.reduce((sum, item) => sum + item.amount, 0);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(val);
    };

    return (
        <motion.div
            className="container mt-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
        >
            <h2 className="text-center font-bold mb-lg" style={{ fontSize: '2rem' }}>예산 관리</h2>

            <div className="grid-2-col gap-lg">
                {/* Add Form */}
                <div className="card bg-surface p-lg rounded-lg shadow-md h-fit">
                    <h3 className="font-bold mb-md text-xl">지출 항목 추가</h3>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-md">
                        <div>
                            <label className="block text-sm font-bold mb-sm">항목 설명</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="예: 저녁 식사"
                                className="w-full"
                                style={{ width: '100%' }}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-sm">금액 (원)</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="예: 50000"
                                className="w-full"
                                style={{ width: '100%' }}
                                required
                                min="0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-sm">카테고리</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full"
                                style={{ width: '100%' }}
                            >
                                <option value="food">식비</option>
                                <option value="stay">숙박</option>
                                <option value="transport">교통</option>
                                <option value="other">기타</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-secondary mt-sm">
                            <Plus size={18} className="mr-sm" /> 추가하기
                        </button>
                    </form>
                </div>

                {/* List & Summary */}
                <div className="flex flex-col gap-lg">
                    {/* Summary Card */}
                    <motion.div
                        className="card bg-surface p-lg rounded-lg shadow-md border-top-primary hover-lift"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="flex items-center gap-sm mb-sm text-primary">
                            <Wallet size={24} />
                            <h3 className="font-bold text-xl">총 예상 비용</h3>
                        </div>
                        <div className="text-center">
                            <motion.span
                                key={totalBudget}
                                initial={{ scale: 1.2, color: '#e76f51' }}
                                animate={{ scale: 1, color: '#0f4c81' }}
                                className="font-bold text-primary"
                                style={{ fontSize: '2.5rem' }}
                            >
                                {formatCurrency(totalBudget)}
                            </motion.span>
                        </div>
                    </motion.div>

                    {/* List Card */}
                    <div className="card bg-surface p-lg rounded-lg shadow-md">
                        <h3 className="font-bold mb-md text-xl">지출 목록</h3>
                        {budgetItems.length === 0 ? (
                            <p className="text-muted text-center py-md">등록된 지출 내역이 없습니다.</p>
                        ) : (
                            <ul className="budget-list flex flex-col gap-sm">
                                <AnimatePresence>
                                    {budgetItems.map((item) => (
                                        <motion.li
                                            key={item.id}
                                            className="budget-item flex items-center justify-between p-md border rounded-md"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            layout
                                        >
                                            <div>
                                                <div className="font-bold">{item.description}</div>
                                                <div className="text-sm text-muted">
                                                    {item.category === 'food' && '식비'}
                                                    {item.category === 'stay' && '숙박'}
                                                    {item.category === 'transport' && '교통'}
                                                    {item.category === 'other' && '기타'}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-md">
                                                <span className="font-bold">{formatCurrency(item.amount)}</span>
                                                <button onClick={() => removeBudgetItem(item.id)} className="text-red-500 hover:text-red-700 transition-colors">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </motion.li>
                                    ))}
                                </AnimatePresence>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default BudgetManager;
