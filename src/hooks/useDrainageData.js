import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'

export function useDrainageData() {
    const [latestReading, setLatestReading] = useState(null)
    const [historicalData, setHistoricalData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Helper to keep only the last 35 records
    const keepLast35 = (data) => {
        if (data.length > 35) {
            return data.slice(data.length - 35)
        }
        return data
    }

    // Process a reading to add alert flag if needed
    const processReading = (reading) => {
        if (!reading) return null;
        const isWaterUnsafe = reading.water_level < 15;
        const isGasUnsafe = reading.gas_level > 190;
        return {
            ...reading,
            alert: isWaterUnsafe || isGasUnsafe
        }
    }

    useEffect(() => {
        const fetchData = async (isInitial = false) => {
            try {
                if (isInitial) setLoading(true)
                const { data, error: fetchError } = await supabase
                    .from('drainage')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(35)

                if (fetchError) throw fetchError

                if (data && data.length > 0) {
                    const processedData = data.reverse().map(processReading)
                    setHistoricalData(processedData)
                    setLatestReading(processedData[processedData.length - 1])
                }
            } catch (err) {
                console.error("Error fetching data:", err)
                setError(err.message)
            } finally {
                if (isInitial) setLoading(false)
            }
        }

        // Initial fetch
        fetchData(true)

        // Set up polling every 1.5 seconds
        const pollInterval = setInterval(() => {
            fetchData(false)
        }, 1500)

        // Real-time subscription as backup
        const subscription = supabase
            .channel('drainage_changes')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'drainage' }, payload => {
                const newReading = processReading(payload.new)
                setHistoricalData(prev => {
                    const newData = [...prev, newReading]
                    return keepLast35(newData)
                })
                setLatestReading(newReading)
            })
            .subscribe()

        return () => {
            clearInterval(pollInterval)
            supabase.removeChannel(subscription)
        }
    }, [])

    return { latestReading, historicalData, loading, error }
}
