import React, { useState, useEffect } from 'react'
import { BundleAnalyzer } from './bundles/analyzers/BundleAnalyzer'
import './PerformanceMonitor.module.css'

interface PerformanceMonitorProps {
  autoStart?: boolean
  onClose?: () => void
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  autoStart = true,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [metrics, setMetrics] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (autoStart && process.env.NODE_ENV === 'development') {
      setIsVisible(true)
      analyzePerformance()
    }
  }, [autoStart])

  const analyzePerformance = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const report = await BundleAnalyzer.analyzeCurrentBundle()
      setMetrics(report)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  if (!isVisible) {
    return (
      <button
        className="performance-monitor-toggle"
        onClick={toggleVisibility}
        title="Show Performance Monitor"
      >
        Perf
      </button>
    )
  }

  return (
    <div className="performance-monitor">
      <div className="performance-monitor-header">
        <h3>Performance Monitor</h3>
        <button className="performance-monitor-close" onClick={handleClose}>
          Close
        </button>
      </div>

      <div className="performance-monitor-content">
        {loading ? (
          <div className="performance-monitor-loading">
            Analyzing performance...
          </div>
        ) : error ? (
          <div className="performance-monitor-error">
            Error: {error}
          </div>
        ) : metrics ? (
          <div className="performance-metrics">
            <div className="metric-summary">
              <div className="metric-total-size">
                Total Size: {metrics.totalSizeFormatted}
              </div>
              <div className="metric-chunk-count">
                Chunks: {metrics.chunkCount}
              </div>
            </div>

            {metrics.largestAssets.length > 0 && (
              <div className="metric-section">
                <h4>Largest Assets</h4>
                <ul className="asset-list">
                  {metrics.largestAssets.map((asset: any, index: number) => (
                    <li key={index} className="asset-item">
                      <span className="asset-name">{asset.name}</span>
                      <span className="asset-size">{asset.sizeFormatted}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {metrics.recommendations.length > 0 && (
              <div className="metric-section">
                <h4>Recommendations</h4>
                <ul className="recommendation-list">
                  {metrics.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="recommendation-item">
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="metric-actions">
              <button
                className="action-button"
                onClick={analyzePerformance}
                disabled={loading}
              >
                Re-analyze
              </button>
            </div>
          </div>
        ) : (
          <div className="performance-monitor-empty">
            No performance data available
          </div>
        )}
      </div>
    </div>
  )
}

export default PerformanceMonitor
