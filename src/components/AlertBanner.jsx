import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Info } from 'lucide-react'

export function AlertBanner({ isAlert }) {
    return (
        <AnimatePresence>
            {isAlert && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-red-600/20 border-b border-red-500/30 backdrop-blur-md overflow-hidden shadow-lg"
                >
                    <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <AlertTriangle className="h-6 w-6 text-red-500 animate-pulse" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-red-100 uppercase tracking-wider">
                                    System Alert Active
                                </h3>
                                <div className="mt-1 text-sm text-red-200/80">
                                    <p>
                                        Alert triggered by ESP8266 hardware.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
