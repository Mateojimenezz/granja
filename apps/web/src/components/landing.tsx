export function Landing() {
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-r from-brand to-emerald-500 text-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Gestiona tu producción agropecuaria con un SaaS moderno</h1>
          <p className="text-xl mb-8">Centraliza granjas, inventario, eventos productivos y reportes en una sola plataforma escalable.</p>
          <a href="/dashboard" className="bg-white text-brand px-6 py-3 rounded-lg font-semibold">Probar gratis</a>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold mb-8">Módulos por suscripción</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {['Porcino', 'Piscícola', 'Ganadero'].map((m) => (
            <div key={m} className="bg-white border rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-xl mb-2">{m}</h3>
              <p>Diseñado para operaciones reales, con trazabilidad y control por eventos.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div><h3 className="text-2xl font-bold mb-3">Beneficios</h3><p>Control operativo, decisiones con datos, multi-granja y acceso por roles.</p></div>
          <div><h3 className="text-2xl font-bold mb-3">Tabla de precios</h3><p>Planes Porcino, Piscícola, Ganadero, Combo y Empresarial.</p></div>
          <div><h3 className="text-2xl font-bold mb-3">Listo para escalar</h3><p>Arquitectura modular preparada para Stripe y crecimiento SaaS.</p></div>
        </div>
      </section>
    </main>
  );
}
