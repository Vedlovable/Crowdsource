import React from 'react';

const GeometricBackground = ({ children, variant = 'default' }) => {
  const getBackgroundStyle = () => {
    switch (variant) {
      case 'login':
        return {
          background: `
            linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.05) 50%, rgba(21, 128, 61, 0.1) 100%),
            conic-gradient(from 45deg at 25% 25%, rgba(34, 197, 94, 0.1), transparent, rgba(22, 163, 74, 0.1)),
            conic-gradient(from 225deg at 75% 75%, rgba(21, 128, 61, 0.1), transparent, rgba(34, 197, 94, 0.1))
          `
        };
      case 'dashboard':
        return {
          background: `
            linear-gradient(45deg, rgba(22, 163, 74, 0.02) 0%, rgba(34, 197, 94, 0.05) 100%),
            radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(21, 128, 61, 0.1) 0%, transparent 50%)
          `
        };
      default:
        return {
          background: `
            linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(22, 163, 74, 0.03) 100%),
            repeating-linear-gradient(45deg, transparent, transparent 50px, rgba(34, 197, 94, 0.02) 50px, rgba(34, 197, 94, 0.02) 100px)
          `
        };
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={getBackgroundStyle()}>
      {/* Animated geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 border border-green-500/20 rotate-45 animate-pulse" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-1/4 right-20 w-16 h-16 bg-green-400/10 rounded-full animate-bounce" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-1/3 left-1/4 w-12 h-12 border-2 border-green-600/30 animate-spin" style={{animationDuration: '8s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-green-500/20 transform rotate-12 animate-pulse" style={{animationDuration: '2s'}}></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-green-400/15 rounded-lg animate-bounce" style={{animationDuration: '5s', animationDelay: '1s'}}></div>
      </div>
      
      {/* Slow moving geometric pattern overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 animate-pulse" style={{
          backgroundImage: `
            linear-gradient(30deg, transparent 40%, rgba(34, 197, 94, 0.1) 40%, rgba(34, 197, 94, 0.1) 60%, transparent 60%),
            linear-gradient(150deg, transparent 40%, rgba(22, 163, 74, 0.1) 40%, rgba(22, 163, 74, 0.1) 60%, transparent 60%)
          `,
          backgroundSize: '80px 80px',
          animation: 'float 20s ease-in-out infinite'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
      `}</style>
    </div>
  );
};

export default GeometricBackground;