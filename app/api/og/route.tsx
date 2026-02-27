import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Dynamic params
    const title = searchParams.get('title') || 'Seva Samarpan';
    const description = searchParams.get('description') || 'Empowering lives through education and care.';
    const type = searchParams.get('type') || 'NGO';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #f1f1f1 2%, transparent 0%), radial-gradient(circle at 75px 75px, #f1f1f1 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            padding: '40px 80px',
          }}
        >
          {/* Logo/Brand Area */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '40px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#16a34a',
                borderRadius: '10px',
                display: 'flex',
                marginRight: '12px',
              }}
            />
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#000' }}>Seva Samarpan</span>
          </div>

          {/* Badge */}
          <div
            style={{
              display: 'flex',
              padding: '8px 16px',
              borderRadius: '20px',
              backgroundColor: 'rgba(22, 163, 74, 0.1)',
              color: '#16a34a',
              fontSize: '18px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '24px',
            }}
          >
            {type}
          </div>

          {/* Main Title */}
          <div
            style={{
              fontSize: '80px',
              fontWeight: '900',
              textAlign: 'center',
              color: '#000',
              lineHeight: '1.1',
              marginBottom: '20px',
              maxWidth: '900px',
            }}
          >
            {title}
          </div>

          {/* Subtitle/Description */}
          <div
            style={{
              fontSize: '32px',
              textAlign: 'center',
              color: '#666',
              lineHeight: '1.4',
              maxWidth: '800px',
            }}
          >
            {description}
          </div>

          {/* Footer Decoration */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              display: 'flex',
              alignItems: 'center',
              color: '#16a34a',
            }}
          >
            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>sevasamarpan.org</span>
            <div
              style={{
                marginLeft: '10px',
                width: '24px',
                height: '24px',
                display: 'flex',
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </div>
          
          {/* Accent Blobs */}
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              right: '-5%',
              width: '400px',
              height: '400px',
              backgroundColor: 'rgba(22, 163, 74, 0.05)',
              borderRadius: '100%',
              filter: 'blur(60px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-10%',
              left: '-5%',
              width: '400px',
              height: '400px',
              backgroundColor: 'rgba(249, 115, 22, 0.05)',
              borderRadius: '100%',
              filter: 'blur(60px)',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    console.error(`OG image generation failed: ${e instanceof Error ? e.message : 'Unknown error'}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
