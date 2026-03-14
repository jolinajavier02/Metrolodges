import React from 'react'
import MainHeader from '../components/MainHeader'
import Footer from '../components/Footer'

const Help: React.FC = () => {
  return (
    <div style={{ background: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MainHeader showSearch={false} />
      <main style={{ flex: 1, maxWidth: '1000px', margin: '60px auto', padding: '0 24px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>Help Center</h1>
        
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>How can we help?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '24px', border: '1px solid #ddd', borderRadius: '12px', cursor: 'pointer' }}>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Getting started</h3>
              <p style={{ color: '#555' }}>Learn how to book your first stay with Metrolodges.</p>
            </div>
            <div style={{ padding: '24px', border: '1px solid #ddd', borderRadius: '12px', cursor: 'pointer' }}>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Hosting on Metrolodges</h3>
              <p style={{ color: '#555' }}>Everything you need to know about sharing your space.</p>
            </div>
            <div style={{ padding: '24px', border: '1px solid #ddd', borderRadius: '12px', cursor: 'pointer' }}>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Security & Safety</h3>
              <p style={{ color: '#555' }}>Your safety is our priority. See our guidelines.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Contact Us</h2>
          <p style={{ color: '#555', lineHeight: 1.6 }}>
            Our support team is available 24/7 to assist you. You can reach out to us via email at <b>support@metrolodges.com</b> or call us at our international helpline.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Help
