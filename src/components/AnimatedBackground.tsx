export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 animated-bg opacity-30" />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl float-animation" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl float-animation" 
        style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/20 rounded-full blur-3xl float-animation"
        style={{ animationDelay: '4s' }} />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(128, 128, 128, 0.1) 59px, rgba(128, 128, 128, 0.1) 60px),
                           repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(128, 128, 128, 0.1) 59px, rgba(128, 128, 128, 0.1) 60px)`
          }}
        />
      </div>
    </div>
  );
}