import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Map } from 'lucide-react';

const MapModal = ({ isOpen, onClose, address, name }) => {
    if (!isOpen) return null;

    const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address || name)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="modal-overlay" onClick={onClose}>
                    <motion.div
                        className="modal-content bg-surface rounded-lg shadow-lg p-md"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-md">
                            <h3 className="font-bold text-xl flex items-center gap-sm">
                                <Map size={20} className="text-primary" />
                                {name} {address && <span className="text-sm font-normal text-muted">({address})</span>}
                            </h3>
                            <button onClick={onClose} className="text-muted hover:text-primary">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="map-container rounded-md overflow-hidden bg-gray-100">
                            <iframe
                                width="100%"
                                height="400"
                                src={mapUrl}
                                frameBorder="0"
                                scrolling="no"
                                marginHeight="0"
                                marginWidth="0"
                                title={`${name} Map`}
                            ></iframe>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default MapModal;
