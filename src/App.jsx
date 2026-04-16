import { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { useDrainageData } from './hooks/useDrainageData'
import { Hero } from './components/Hero'
import { AlertBanner } from './components/AlertBanner'
import { StatusCard } from './components/StatusCard'
import { DataChart } from './components/DataChart'
import { Droplets, Wind, Activity } from 'lucide-react'
import clsx from 'clsx'


function App() {
    const { latestReading, historicalData, loading, error } = useDrainageData()
    const [prevAlertState, setPrevAlertState] = useState(false)

    const waterLevel = latestReading?.water_level || 0
    const gasLevel = latestReading?.gas_level || 0

    // Specific alerts based on user thresholds
    const isWaterAlert = waterLevel < 15
    const isGasAlert = gasLevel > 400
    const isGlobalAlert = isWaterAlert || isGasAlert

    // Trigger toast on alert state change
    useEffect(() => {
        if (latestReading) {
            if (isGlobalAlert && !prevAlertState) {
                toast.error('CRITICAL ALERT: Hardware detected blockage!', {
                    duration: 5000,
                    position: 'top-right',
                    style: {
                        border: '1px solid #ef4444',
                        padding: '16px',
                        color: '#ef4444',
                    },
                    iconTheme: {
                        primary: '#ef4444',
                        secondary: '#FFFAEE',
                    },
                })
            }
            setPrevAlertState(isGlobalAlert)
        }
    }, [isGlobalAlert, prevAlertState, latestReading])

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center text-red-500">
                Error loading data: {error}
            </div>
        )
    }

    return (
        <div className={clsx(
            "min-h-screen font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-700",
            isGlobalAlert ? "bg-red-950/40" : "text-slate-100"
        )}>
            <Toaster />

            <Hero isAlert={isGlobalAlert} />
            <AlertBanner isAlert={isGlobalAlert} />

            <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

                {/* Status Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatusCard
                        title="Water Level"
                        value={latestReading?.water_level}
                        unit="cm"
                        isAlert={isWaterAlert}
                        icon={Droplets}
                        type="water"
                    />
                    <StatusCard
                        title="Gas Level"
                        value={latestReading?.gas_level}
                        unit="ppm"
                        isAlert={isGasAlert}
                        icon={Wind}
                        type="gas"
                    />
                    <StatusCard
                        title="System Status"
                        value={isGlobalAlert ? "CRITICAL" : "NORMAL"}
                        isAlert={isGlobalAlert}
                        icon={Activity}
                        type="status"
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <DataChart
                            data={historicalData}
                            type="water"
                            isAlert={isWaterAlert}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <DataChart
                            data={historicalData}
                            type="gas"
                            isAlert={isGasAlert}
                        />
                    </motion.div>
                </div>

                <div className="mt-12 text-center text-gray-400 text-sm">
                    <p>IoT Drainage Monitoring System &copy; {new Date().getFullYear()}</p>
                    <p className="mt-1">Last updated: {latestReading ? new Date(latestReading.created_at).toLocaleString() : 'Never'}</p>
                </div>

            </main>
        </div>
    )
}

export default App
