import { useState } from 'react';

export default function LeasingOffersPage() {
  const [form, setForm] = useState({ fname: '', phn: '', city: '' });

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setForm({ fname: '', phn: '', city: '' });
  };

  return (
    <div className="py-8">
      <div className="page-container max-w-3xl">
        <div className="page-card">
          <h1>Vehicle Leasing Offers in Sri Lanka</h1>

          <p><strong>Please enter your details to connect with a leasing agent</strong></p>

          <form onSubmit={handleSubmit}>
            <div className="leasing-form">
              <input type="text" name="fname" placeholder="Full Name" value={form.fname} onChange={set('fname')} required />
              <input type="tel" name="phn" placeholder="Phone" minLength={10} value={form.phn} onChange={set('phn')} required />
              <input type="text" name="city" placeholder="City" value={form.city} onChange={set('city')} required />
              <input className="auth-btn" type="submit" value="Submit" />
            </div>
            <input type="text" id="website" name="website" style={{ display: 'none' }} />
          </form>

          <p style={{ fontSize: 12 }}><strong>*කොන්දේසි සහිතයි</strong></p>
          <p>ඔබගේ අවශ්‍යතාවයට සරිලන පරිදි මාසික වාරික සකසාගත හැකි අතර ඉහත වාරිකය ගණනය කිරීමේදී ලීසින් මුදලින් 40% අවසන් වාරිකයක් සහිතව ගණනය කර ඇත.</p>

          <div style={{ padding: '20px 0' }}>
            <img
              src="https://riyasewana.com/images/cf/cf8.jpg"
              width={600}
              height={600}
              alt="Leasing Offer CF Riyasewana"
              style={{ maxWidth: '100%', height: 'auto', borderRadius: 6 }}
            />
          </div>

          <p style={{ fontSize: 15 }}>Riyasewana is joining hands with top leasing companies to bring the best rates and offers.</p>
        </div>
      </div>
    </div>
  );
}
