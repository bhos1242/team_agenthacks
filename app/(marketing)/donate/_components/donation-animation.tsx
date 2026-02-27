"use client"

import { Heart, Sparkles, Star, HandHeart } from "lucide-react"
import { useEffect, useState } from "react"

export function DonationAnimation() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const frame = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(frame);
    }, [])

    if (!mounted) return null

    return (
        <div className="relative w-full aspect-square flex items-center justify-center">
            {/* Deep glowing background representing warmth and care */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[3rem] animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute inset-4 bg-orange-500/10 rounded-full blur-[2rem] animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }} />

            {/* Main Interactive Container */}
            <div className="relative w-full h-full flex flex-col items-center justify-center animate-float">
                
                {/* Large Background Hands representing support */}
                <div className="absolute bottom-0 w-full flex justify-center opacity-40 dark:opacity-20 translate-y-8">
                    <HandHeart className="w-32 h-32 md:w-40 md:h-40 text-muted-foreground" strokeWidth={1} strokeLinecap="round" />
                </div>

                {/* Center Glowing Heart (the core of the animation) */}
                <div className="relative z-20 flex items-center justify-center -translate-y-4 md:-translate-y-8">
                    <Heart 
                        className="w-16 h-16 md:w-20 md:h-20 text-primary fill-primary drop-shadow-[0_0_25px_rgba(249,115,22,0.8)]"
                        style={{ animation: 'heartbeat 2s infinite ease-in-out' }}
                    />
                    
                    {/* Concentric expanding rings representing expanding impact */}
                    <div className="absolute inset-[-50%] border-2 border-primary/40 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                    <div className="absolute inset-[-50%] border border-primary/20 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '1.2s' }} />
                </div>

                {/* Orbiting Sparkles and Small Hearts (representing lives touched) */}
                <div className="absolute inset-0 animate-spin-slow z-30 pointer-events-none">
                    <Sparkles className="absolute top-[20%] left-[20%] w-5 h-5 text-yellow-400 animate-pulse drop-shadow-md" />
                    <Star className="absolute bottom-[25%] right-[20%] w-4 h-4 text-orange-400 fill-orange-400 animate-pulse drop-shadow-md" style={{ animationDelay: '1s' }} />
                    <Sparkles className="absolute top-[35%] right-[10%] w-6 h-6 text-rose-400 animate-pulse drop-shadow-md" style={{ animationDelay: '1.5s' }} />
                    <Star className="absolute bottom-[40%] left-[10%] w-3 h-3 text-yellow-500 fill-yellow-500 animate-pulse drop-shadow-md" style={{ animationDelay: '0.5s' }} />
                </div>

                {/* Floating Smaller Hearts out-of-sync */}
                <Heart className="absolute top-[25%] right-[30%] w-5 h-5 text-rose-500 fill-rose-500 animate-float-delayed opacity-80 z-10 blur-[0.5px]" />
                <Heart className="absolute bottom-[35%] left-[25%] w-6 h-6 text-primary fill-primary animate-float opacity-70 z-10 blur-[1.5px]" style={{ animationDuration: '4.5s' }} />
                <Heart className="absolute top-[15%] left-[40%] w-3 h-3 text-orange-400 fill-orange-400 animate-float-delayed z-10 blur-[0.5px]" style={{ animationDelay: '2.5s' }} />
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes heartbeat {
                    0% { transform: scale(1); }
                    14% { transform: scale(1.15); }
                    28% { transform: scale(1); }
                    42% { transform: scale(1.15); }
                    70% { transform: scale(1); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-12px); }
                }
                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(18px); }
                }
                .animate-spin-slow {
                    animation: spin 25s linear infinite;
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-float-delayed {
                    animation: float-delayed 7s ease-in-out infinite;
                }
            `}} />
        </div>
    )
}
