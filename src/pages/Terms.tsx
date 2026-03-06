import React from 'react'
import { Link } from 'react-router-dom'

const Terms: React.FC = () => {
  return (
    <div>
      {/* Header */}
      <header style={{ background: 'white', position: 'sticky', top: 0, zIndex: 1000, borderBottom: '1px solid #ddd', padding: '1rem 5%' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', fontSize: '1.6rem', fontWeight: 'bold', color: '#71b7e1' }}>
          Metrolodges
        </Link>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 5%' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Terms of Service</h1>

        <p style={{ fontSize: '0.9rem', color: '#999', marginBottom: '2rem' }}>Last updated: March 2026</p>

        <h2 style={{ fontSize: '1.3rem', marginTop: '2rem', marginBottom: '1rem' }}>1. Acceptance of Terms</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '1.5rem', color: '#666' }}>
          By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
        </p>

        <h2 style={{ fontSize: '1.3rem', marginTop: '2rem', marginBottom: '1rem' }}>2. Use License</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '1.5rem', color: '#666' }}>
          Permission is granted to temporarily download one copy of the materials (information or software) on Metrolodges website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
        </p>
        <ul style={{ lineHeight: '1.8', marginBottom: '1.5rem', color: '#666', paddingLeft: '2rem' }}>
          <li>Modify or copy the materials</li>
          <li>Use the materials for any commercial purpose or for any public display</li>
          <li>Attempt to decompile or reverse engineer any software contained on the website</li>
          <li>Remove any copyright or other proprietary notations from the materials</li>
          <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
        </ul>

        <h2 style={{ fontSize: '1.3rem', marginTop: '2rem', marginBottom: '1rem' }}>3. Disclaimer</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '1.5rem', color: '#666' }}>
          The materials on Metrolodges website are provided on an 'as is' basis. Metrolodges makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>

        <h2 style={{ fontSize: '1.3rem', marginTop: '2rem', marginBottom: '1rem' }}>4. Limitation of Liability</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '1.5rem', color: '#666' }}>
          In no event shall Metrolodges or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Metrolodges website.
        </p>

        <h2 style={{ fontSize: '1.3rem', marginTop: '2rem', marginBottom: '1rem' }}>5. Accuracy of Materials</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '1.5rem', color: '#666' }}>
          The materials appearing on Metrolodges website could include technical, typographical, or photographic errors. Metrolodges does not warrant that any of the materials on the website are accurate, complete, or current. Metrolodges may make changes to the materials contained on the website at any time without notice.
        </p>

        <div style={{ marginTop: '3rem', padding: '2rem', background: '#f9f9f9', borderRadius: '8px' }}>
          <Link to="/" style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: '#71b7e1',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px'
          }}>
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Terms
