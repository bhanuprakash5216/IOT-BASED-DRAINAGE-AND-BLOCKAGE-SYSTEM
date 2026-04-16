import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import clsx from 'clsx'
import { format } from 'date-fns'

export function DataChart({ data, type, isAlert }) {
    const isWater = type === 'water'
    // Updated colors: Cyan for Water, Purple for Gas (High contrast on dark)
    const color = isAlert ? '#ef4444' : (isWater ? '#22d3ee' : '#c084fc')
    const gradientId = `color${type}`

    // Threshold values
    const threshold = isWater ? 15 : 190

    // Format timestamp for X-axis
    const formattedData = data.map(item => ({
        ...item,
        formattedTime: new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    }))

    return (
        <div className={clsx(
            "rounded-2xl p-6 border transition-all duration-300 h-96 shadow-2xl backdrop-blur-md",
            isAlert
                ? "bg-red-600/20 border-red-500/50 shadow-red-900/20"
                : "bg-blue-900/20 border-blue-500/20 shadow-blue-900/20"
        )}>
            <h3 className={clsx(
                "text-lg font-bold mb-6 flex items-center gap-2",
                isAlert ? "text-red-200" : "text-white"
            )}>
                {isWater ? "Water Level History" : "Gas Level History"}
                {isAlert && <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full font-bold">ALERT ACTIVE</span>}
            </h3>

            <div className="h-full max-h-[300px] -ml-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={formattedData}>
                        <defs>
                            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis
                            dataKey="formattedTime"
                            stroke="rgba(255,255,255,0.4)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="rgba(255,255,255,0.4)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            unit={isWater ? " cm" : ""}
                            domain={[0, dataMax => Math.max(dataMax, threshold + (isWater ? 2 : 50))]}
                        />
                        <Tooltip
                            contentStyle={{
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                backdropFilter: 'blur(8px)',
                                color: '#fff',
                                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)'
                            }}
                            itemStyle={{ color: '#fff' }}
                            labelStyle={{ color: '#94a3b8' }}
                        />
                        <ReferenceLine
                            y={threshold}
                            stroke="#ef4444"
                            strokeDasharray="3 3"
                            label={{
                                value: 'Threshold',
                                position: 'insideTopRight',
                                fill: '#ef4444',
                                fontSize: 12
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey={isWater ? "water_level" : "gas_level"}
                            stroke={color}
                            strokeWidth={3}
                            fillOpacity={1}
                            fill={`url(#${gradientId})`}
                            animationDuration={1000}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
