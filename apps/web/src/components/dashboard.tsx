'use client';

import { useEffect, useMemo, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

type Me = { email: string; role: string; subscription: string | null };

export function Dashboard() {
  const [token, setToken] = useState('');
  const [me, setMe] = useState<Me | null>(null);
  const [metrics, setMetrics] = useState<any>(null);

  const links = useMemo(() => {
    const base = ['Dashboard', 'Bodega', 'Ventas', 'Reportes'];
    if (me?.subscription === 'PORCINO' || me?.subscription === 'COMBO' || me?.subscription === 'EMPRESARIAL') base.unshift('Porcino');
    if (me?.subscription === 'PISCICOLA' || me?.subscription === 'COMBO' || me?.subscription === 'EMPRESARIAL') base.push('Piscícola');
    if (me?.subscription === 'GANADERO' || me?.subscription === 'COMBO' || me?.subscription === 'EMPRESARIAL') base.push('Ganadero');
    return base;
  }, [me]);

  useEffect(() => {
    if (!token) return;
    (async () => {
      const meRes = await fetch(`${API_URL}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
      const meData = await meRes.json();
      setMe(meData);

      const metricsRes = await fetch(`${API_URL}/porcino/metrics`, { headers: { Authorization: `Bearer ${token}` } });
      if (metricsRes.ok) setMetrics(await metricsRes.json());
    })();
  }, [token]);

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-slate-900 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Granja SaaS</h2>
        <nav className="space-y-2">{links.map((l) => <div key={l} className="py-2 border-b border-slate-700">{l}</div>)}</nav>
      </aside>
      <main className="flex-1 p-8">
        {!token && (
          <div className="bg-white border rounded-xl p-6">
            <h1 className="text-2xl font-bold mb-2">Dashboard interno</h1>
            <p className="mb-3">Pega un JWT para consumir la API (demo rápida).</p>
            <input className="w-full border rounded p-2" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Bearer token" />
          </div>
        )}
        {me && (
          <>
            <h1 className="text-3xl font-bold mb-6">Hola, {me.email}</h1>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white border rounded-xl p-4"><p>Suscripción</p><p className="text-2xl font-bold">{me.subscription}</p></div>
              <div className="bg-white border rounded-xl p-4"><p>Animales porcinos</p><p className="text-2xl font-bold">{metrics?.totalAnimales ?? 0}</p></div>
              <div className="bg-white border rounded-xl p-4"><p>Eventos registrados</p><p className="text-2xl font-bold">{metrics?.totalEventos ?? 0}</p></div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
