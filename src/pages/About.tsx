import React from 'react'
import { Link } from 'react-router-dom'

const About: React.FC = () => {
  return (
    <div>
      {/* Header */}
      <header style={{ background: 'white', position: 'sticky', top: 0, zIndex: 1000, borderBottom: '1px solid #ddd', padding: '1rem 5%' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', fontSize: '1.6rem', fontWeight: 'bold', color: '#71b7e1' }}>
          Metrolodges
        </Link>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 5%' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>About Metrolodges</h1>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem', color: '#555' }}>
          Metrolodges is a global online marketplace and hospitality service that enables people to book and host accommodations, experiences, and digital services. Our mission is to help take the hassle out of travel so that more people can belong anywhere.
        </p>

        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>Our Story</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '1.5rem', color: '#666' }}>
          Founded in 2008, Metrolodges has grown from a small startup to a global community of millions of hosts and guests. We believe that travel should be accessible to everyone, and that by sharing homes, spaces, and experiences, we can build a more connected world.
        </p>

        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>Our Values</h2>
        <ul style={{ lineHeight: '1.8', marginBottom: '1.5rem', color: '#666', paddingLeft: '2rem' }}>
          <li><strong>Belonging:</strong> We believe in creating a world where anyone can belong anywhere.</li>
          <li><strong>Trust:</strong> We build trust through transparency and accountability.</li>
          <li><strong>Innovation:</strong> We continuously innovate to improve the experience for our users.</li>
          <li><strong>Social Impact:</strong> We're committed to creating positive social and economic impact.</li>
        </ul>

        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>Contact Us</h2>
        <p style={{ lineHeight: '1.6', color: '#666' }}>
          Have questions? Our support team is here to help.<br />
          Email: support@metrolodges.com<br />
          Phone: 1-800-METROLODGES
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

export default About
