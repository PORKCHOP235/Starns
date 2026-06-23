"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface IntroScreenProps {
  onComplete: () => void;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [phase, setPhase] = useState<"enter" | "hold" | "burst" | "exit">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"),   900);
    const t2 = setTimeout(() => setPhase("burst"), 2000);
    const t3 = setTimeout(() => setPhase("exit"),  2600);
    const t4 = setTimeout(() => onComplete(),       3200);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onComplete]);

  const exiting = phase === "exit";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#060D1A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "scale(1.06)" : "scale(1)",
        transition: exiting ? "opacity 0.55s ease, transform 0.55s ease" : "none",
        pointerEvents: exiting ? "none" : "all",
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,194,203,0.12) 0%, rgba(124,58,237,0.08) 40%, transparent 70%)",
          animation: "introBgPulse 2s ease-in-out infinite",
        }}
      />

      {/* Particle ring — sparkle stars orbiting the logo */}
      {[
        { angle: 0,   radius: 160, size: 14, delay: "0s",    duration: "6s",  color: "#00C2CB" },
        { angle: 60,  radius: 140, size: 10, delay: "-1s",   duration: "8s",  color: "#7C3AED" },
        { angle: 120, radius: 180, size: 16, delay: "-2.5s", duration: "7s",  color: "#EC4899" },
        { angle: 180, radius: 150, size: 10, delay: "-0.5s", duration: "9s",  color: "#F97316" },
        { angle: 240, radius: 170, size: 12, delay: "-3.5s", duration: "6.5s",color: "#FBBF24" },
        { angle: 300, radius: 145, size: 8,  delay: "-1.8s", duration: "7.5s",color: "#00C2CB" },
      ].map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 0,
            height: 0,
            /* each sparkle rotates in its own orbit */
            animation: `orbit${i} ${p.duration} linear ${p.delay} infinite`,
            opacity: phase === "enter" ? 0 : 1,
            transition: "opacity 0.8s ease",
          }}
        >
          <span
            style={{
              position: "absolute",
              transform: `translate(${p.radius}px, -50%)`,
              fontSize: `${p.size}px`,
              color: p.color,
              filter: `drop-shadow(0 0 ${p.size / 2}px ${p.color})`,
              display: "block",
              animation: "starTwinkle 1.5s ease-in-out infinite",
              animationDelay: p.delay,
            }}
          >
            ✦
          </span>
        </div>
      ))}

      {/* Outer ring of static sparkles (near edges) */}
      {[
        { x: "15%",  y: "20%", size: 10, color: "#00C2CB", delay: "0s" },
        { x: "80%",  y: "15%", size: 8,  color: "#7C3AED", delay: "0.4s" },
        { x: "88%",  y: "70%", size: 12, color: "#EC4899", delay: "0.8s" },
        { x: "12%",  y: "75%", size: 9,  color: "#FBBF24", delay: "1.2s" },
        { x: "50%",  y: "10%", size: 7,  color: "#F97316", delay: "0.2s" },
        { x: "92%",  y: "40%", size: 11, color: "#00C2CB", delay: "1s" },
        { x: "5%",   y: "45%", size: 8,  color: "#7C3AED", delay: "0.6s" },
        { x: "45%",  y: "88%", size: 10, color: "#EC4899", delay: "1.4s" },
      ].map((s, i) => (
        <span
          key={`outer-${i}`}
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            fontSize: `${s.size}px`,
            color: s.color,
            filter: `drop-shadow(0 0 6px ${s.color})`,
            opacity: phase === "enter" ? 0 : 0.7,
            transition: `opacity 1s ease ${s.delay}`,
            animation: "starTwinkle 2s ease-in-out infinite",
            animationDelay: s.delay,
          }}
        >
          ✦
        </span>
      ))}

      {/* Core: logo */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          animation:
            phase === "enter"
              ? "introLogoEnter 0.9s cubic-bezier(.175,.885,.32,1.275) forwards"
              : phase === "hold"
              ? "introLogoPulse 1.2s ease-in-out infinite"
              : "introLogoBurst 0.5s cubic-bezier(.175,.885,.32,1.5) forwards",
        }}
      >
        {/* Glow ring behind logo */}
        <div
          style={{
            position: "absolute",
            inset: "-40px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,194,203,0.25) 0%, rgba(124,58,237,0.15) 40%, transparent 70%)",
            animation: "introGlow 1.5s ease-in-out infinite",
            opacity: phase === "enter" ? 0 : 1,
            transition: "opacity 0.5s ease",
          }}
        />
        <Image
          src="/logo.png"
          alt="Starn Marketing"
          width={260}
          height={120}
          priority
          style={{
            width: "260px",
            height: "auto",
            filter: "drop-shadow(0 0 32px rgba(0,194,203,0.6)) drop-shadow(0 0 64px rgba(124,58,237,0.3))",
            position: "relative",
            zIndex: 1,
          }}
        />
      </div>

      {/* Burst rays — visible only on burst phase */}
      {phase === "burst" &&
        [0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
          <div
            key={`ray-${i}`}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "2px",
              height: "0px",
              background: `linear-gradient(to top, transparent, ${
                ["#00C2CB","#7C3AED","#EC4899","#F97316","#FBBF24","#00C2CB","#7C3AED","#EC4899"][i]
              })`,
              transformOrigin: "bottom center",
              transform: `rotate(${deg}deg) translateX(-50%)`,
              animation: "rayShoot 0.5s ease-out forwards",
              animationDelay: `${i * 0.03}s`,
            }}
          />
        ))}

      <style>{`
        @keyframes introBgPulse {
          0%,100%{opacity:0.6} 50%{opacity:1}
        }
        @keyframes introLogoEnter {
          0%{opacity:0;transform:scale(0.4) rotate(-15deg)}
          70%{transform:scale(1.08) rotate(3deg)}
          100%{opacity:1;transform:scale(1) rotate(0deg)}
        }
        @keyframes introLogoPulse {
          0%,100%{transform:scale(1)}
          50%{transform:scale(1.06)}
        }
        @keyframes introLogoBurst {
          0%{transform:scale(1)}
          40%{transform:scale(1.18)}
          100%{transform:scale(0.8);opacity:0}
        }
        @keyframes introGlow {
          0%,100%{opacity:0.6;transform:scale(1)}
          50%{opacity:1;transform:scale(1.15)}
        }
        @keyframes starTwinkle {
          0%,100%{opacity:1;transform:translate(var(--tx,0),var(--ty,0)) scale(1)}
          50%{opacity:0.4;transform:translate(var(--tx,0),var(--ty,0)) scale(0.7)}
        }
        @keyframes rayShoot {
          0%{height:0;opacity:1}
          100%{height:200px;opacity:0}
        }

        /* Orbit keyframes for each of the 6 orbital sparkles */
        @keyframes orbit0{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes orbit1{from{transform:rotate(60deg)}to{transform:rotate(420deg)}}
        @keyframes orbit2{from{transform:rotate(120deg)}to{transform:rotate(480deg)}}
        @keyframes orbit3{from{transform:rotate(180deg)}to{transform:rotate(540deg)}}
        @keyframes orbit4{from{transform:rotate(240deg)}to{transform:rotate(600deg)}}
        @keyframes orbit5{from{transform:rotate(300deg)}to{transform:rotate(660deg)}}
      `}</style>
    </div>
  );
}
