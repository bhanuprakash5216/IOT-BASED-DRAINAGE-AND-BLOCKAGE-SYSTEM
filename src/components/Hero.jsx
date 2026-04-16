import { Activity } from 'lucide-react'
import clsx from 'clsx'

export function Hero({ isAlert }) {
    return (
        <div className="border-b border-blue-500/10 backdrop-blur-sm bg-blue-900/30">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                            IoT Drainage Monitor
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl">
                            Intelligent Blockage Detection System powered by ESP8266 & Supabase
                        </p>
                    </div>

                    <div className={clsx(
                        "inline-flex items-center px-6 py-3 rounded-full border text-sm font-bold transition-all duration-300 shadow-lg",
                        isAlert
                            ? "bg-red-600 border-red-500 text-white shadow-red-200"
                            : "bg-blue-600 border-blue-500 text-white shadow-blue-200"
                    )}>
                        <span className={clsx(
                            "flex h-3 w-3 rounded-full mr-3 relative",
                            isAlert ? "bg-white" : "bg-emerald-400"
                        )}>
                            <span className={clsx(
                                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                                isAlert ? "bg-white" : "bg-emerald-400"
                            )}></span>
                        </span>
                        {isAlert ? "SYSTEM ALERT" : "SYSTEM NORMAL"}
                    </div>
                </div>
            </div>
        </div>
    )
}
