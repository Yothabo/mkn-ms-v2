/**
 * Simple analytics service
 */

interface AnalyticsEvent {
  name: string;
  data?: Record<string, any>;
  timestamp?: string;
}

class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private isEnabled = true;

  track(name: string, data?: Record<string, any>): void {
    if (!this.isEnabled) return;

    const event: AnalyticsEvent = {
      name,
      data,
      timestamp: new Date().toISOString(),
    };

    this.events.push(event);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics:', event);
    }

    // Send to analytics endpoint (mock implementation)
    this.sendToEndpoint(event);
  }

  private async sendToEndpoint(event: AnalyticsEvent): Promise<void> {
    try {
      // In a real app, you would send this to your analytics service
      console.log('Sending analytics event:', event);
    } catch (error) {
      console.warn('Failed to send analytics event:', error);
    }
  }

  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  clearEvents(): void {
    this.events = [];
  }

  enable(): void {
    this.isEnabled = true;
  }

  disable(): void {
    this.isEnabled = false;
  }
}

export const analytics = new AnalyticsService();
