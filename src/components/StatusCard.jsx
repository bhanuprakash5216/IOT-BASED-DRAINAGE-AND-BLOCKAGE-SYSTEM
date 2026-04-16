import { motion } from 'framer-motion'
import clsx from 'clsx'

export function StatusCard({ title, value, unit, isAlert, icon: Icon, type }) {
    const isDanger = isAlert // Only alert status triggers danger color

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={clsx(
                "rounded-2xl p-6 relative overflow-hidden transition-all duration-300 border shadow-2xl backdrop-blur-md",
                isDanger
                    ? "bg-red-600/20 border-red-500/50 text-white shadow-red-900/20"
                    : "bg-blue-900/20 border-blue-500/20 text-white shadow-blue-900/20 hover:bg-blue-800/30"
            )}
        >
            <div className="flex items-center justify-between mb-4">
                <div className={clsx(
                    "p-3 rounded-xl transition-colors duration-300 backdrop-blur-sm bg-white/10",
                    isDanger ? "text-white" : "text-indigo-300"
                )}>
                    <Icon size={24} />
                </div>
                {isDanger && (
                    <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </span>
                )}
            </div>

            <h3 className={clsx("text-sm font-medium mb-1", isDanger ? "text-red-100" : "text-slate-400")}>{title}</h3>
            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight text-white">
                    {value || '--'}
                </span>
                {unit && <span className={clsx("text-sm", isDanger ? "text-red-200" : "text-slate-500")}>{unit}</span>}
            </div>
        </motion.div>
    )
}
