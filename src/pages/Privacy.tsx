import React from 'react'
import { Link } from 'react-router-dom'

const Privacy: React.FC = () => {
  return (
    <div>
      {/* Header */}
      <header style={{ background: 'white', position: 'sticky', top: 0, zIndex: 1000, borderBottom: '1px solid #ddd', padding: '1rem 5%' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', fontSize: '1.6rem', fontWeight: 'bold', color: '#71b7e1' }}>
          Metrolodges
        </Link>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 5%' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Privacy Policy</h1>

        <p style={{ fontSize: '0.9rem', color: '#999', marginBottom: '2rem' }}>Last updated: March 2026</p>

        <h2 style={{ fontSize: '1.3rem', marginTop: '2rem', marginBottom: '1rem' }}>1. Introduction</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '1.5rem', color: '#666' }}>
          Metrolodges ("we" or "us" or "our") operates the website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our website and the choices you have associated with that data.
        </p>

        <h2 style={{ fontSize: '1.3rem', marginTop: '2rem', marginBottom: '1rem' }}>2. Information Collection and Use</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '1rem', color: '#666' }}>
          We collect several different types of information for various purposes to provide and improve our website and services to you.
        </p>

        <h3 style={{ fontSize: '1.1rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Types of Data Collected:</h3>
        <ul style={{ lineHeight: '1.8', marginBottom: '1.5rem', color: '#666', paddingLeft: '2rem' }}>
          <li><strong>Personal Data:</strong> Name, email address, phone number, device information, cookies data</li>
          <li><strong>Usage Data:</strong> Pages visited, time and date of visits, time spent on pages</li>
          <li><strong>Device Data:</strong> Browser type, IP address, operating system, referral URLs</li>
        </ul>

        <h2 style={{ fontSize: '1.3rem', marginTop: '2rem', marginBottom: '1rem' }}>3. Use of Data</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '1.5rem', color: '#666' }}>
          Metrolodges uses the collected data for various purposes:
        </p>
        <ul style={{ lineHeight: '1.8', marginBottom: '1.5rem', color: '#666', paddingLeft: '2rem' }}>
          <li>To provide and maintain our website</li>
          <li>To notify you about changes to our website</li>
          <li>To provide customer care and support</li>
          <li>To gather analysis or valuable information so we can improve our website</li>
          <li>To monitor the usage of our website</li>
          <li>To detect, prevent and address technical issues</li>
        </ul>

        <h2 style={{ fontSize: '1.3rem', marginTop: '2rem', marginBottom: '1rem' }}>4. Security of Data</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '1.5rem', color: '#666' }}>
          The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
        </p>

        <h2 style={{ fontSize: '1.3rem', marginTop: '2rem', marginBottom: '1rem' }}>5. Changes to This Privacy Policy</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '1.5rem', color: '#666' }}>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
        </p>

        <h2 style={{ fontSize: '1.3rem', marginTop: '2rem', marginBottom: '1rem' }}>6. Contact Us</h2>
        <p style={{ lineHeight: '1.6', color: '#666' }}>
          If you have any questions about this Privacy Policy, please contact us at:<br />
          Email: privacy@metrolodges.com
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

export default Privacy
