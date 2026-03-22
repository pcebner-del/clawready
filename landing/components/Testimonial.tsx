export default function Testimonial() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-br from-[#0d1e3a] to-[#0a1628] rounded-3xl border border-blue-500/20 p-10 md:p-16 overflow-hidden">
          {/* Background quote mark */}
          <div className="absolute top-6 left-8 text-blue-500/10 font-serif" style={{ fontSize: '12rem', lineHeight: 1 }}>
            &ldquo;
          </div>

          {/* Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            {/* Stars */}
            <div className="flex gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <blockquote className="text-2xl md:text-3xl text-white font-medium leading-relaxed mb-10">
              I bought a $60 pawnshop laptop and got OpenClaw running in 5 minutes.
              <span className="text-blue-300"> Would have paid $50.</span>
            </blockquote>

            <div className="flex items-center gap-4">
              {/* Avatar placeholder */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-xl">
                P
              </div>
              <div>
                <p className="text-white font-semibold text-lg">Phil Ebner</p>
                <p className="text-slate-400">Cabinet Maker</p>
              </div>

              {/* Badge */}
              <div className="ml-auto hidden sm:flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-green-400 text-sm font-medium">Verified buyer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting stat */}
        <div className="grid sm:grid-cols-3 gap-6 mt-10">
          {[
            { value: '< 5 min', label: 'Typical install time' },
            { value: '100%', label: 'Of testers got it working' },
            { value: '$29', label: 'One-time, no subscription' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-slate-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
