import { NextRequest, NextResponse } from 'next/server';

interface AnalyticsEvent {
  type: 'page_view' | 'interaction' | 'custom';
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  timestamp: number;
  sessionId: string;
  userId?: string;
}

interface AnalyticsPayload {
  events: AnalyticsEvent[];
  userAgent: string;
  language: string;
  timezone: string;
  screen: {
    width: number;
    height: number;
  };
  viewport: {
    width: number;
    height: number;
  };
}

// In-memory storage for demo purposes
// In production, you'd want to use a proper database
const analyticsData: AnalyticsPayload[] = [];

export async function POST(request: NextRequest) {
  try {
    const payload: AnalyticsPayload = await request.json();
    
    // Basic validation
    if (!payload.events || !Array.isArray(payload.events)) {
      return NextResponse.json(
        { error: 'Invalid payload' },
        { status: 400 }
      );
    }

    // Filter out sensitive information
    const sanitizedPayload: AnalyticsPayload = {
      ...payload,
      userAgent: payload.userAgent?.substring(0, 200) || 'Unknown', // Limit length
      events: payload.events.map(event => ({
        ...event,
        // Remove any potentially sensitive data from labels
        label: event.label?.replace(/[^\w\s-]/g, '') || undefined
      }))
    };

    // Store the analytics data
    analyticsData.push(sanitizedPayload);

    // In production, you would:
    // 1. Store in a database (PostgreSQL, MongoDB, etc.)
    // 2. Process events in real-time or batch
    // 3. Generate insights and reports
    // 4. Set up data retention policies

    // For demo purposes, log some basic stats
    console.log(`Analytics: Received ${payload.events.length} events from session ${payload.events[0]?.sessionId}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve analytics data (for admin purposes)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    
    if (sessionId) {
      // Return data for specific session
      const sessionData = analyticsData.filter(
        payload => payload.events.some(event => event.sessionId === sessionId)
      );
      return NextResponse.json(sessionData);
    }

    // Return summary statistics
    const totalEvents = analyticsData.reduce(
      (sum, payload) => sum + payload.events.length,
      0
    );
    
    const uniqueSessions = new Set(
      analyticsData.flatMap(payload => 
        payload.events.map(event => event.sessionId)
      )
    ).size;

    const eventTypes = analyticsData
      .flatMap(payload => payload.events)
      .reduce((acc, event) => {
        acc[event.type] = (acc[event.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    return NextResponse.json({
      totalEvents,
      uniqueSessions,
      eventTypes,
      dataPoints: analyticsData.length
    });
  } catch (error) {
    console.error('Analytics GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
