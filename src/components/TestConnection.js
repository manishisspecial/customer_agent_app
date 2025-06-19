import React, { useState } from 'react';

const TestConnection = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: 'hello' })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Test Backend Connection</h2>
      <button onClick={handleTest} disabled={loading} style={{ padding: '8px 16px', margin: '12px 0' }}>
        {loading ? 'Testing...' : 'Test /api/test'}
      </button>
      {result && (
        <pre style={{ background: '#f0f0f0', padding: 12, marginTop: 12 }}>{JSON.stringify(result, null, 2)}</pre>
      )}
      {error && (
        <div style={{ color: 'red', marginTop: 12 }}>{error}</div>
      )}
    </div>
  );
};

export default TestConnection; 