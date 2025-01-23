export function Card({ className, children }) {
  return (
    <div className={`
      bg-transparent 
      rounded-lg 
      shadow-lg 
      backdrop-blur-sm 
      relative 
      overflow-hidden
      ${className}
      before:absolute
      before:content-['']
      before:inset-0
      before:bg-gradient-to-br
      before:from-cyan-200/30
      before:to-cyan-400/20
      before:animate-flow
      `}>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
 }