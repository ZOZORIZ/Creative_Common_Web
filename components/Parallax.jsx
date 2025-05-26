'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import '../styles/parallax.css';

export default function Parallax() {
    const parallaxRef = useRef(null);
    const dayImagesRef = useRef([]);
    const nightImagesRef = useRef([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        const parallaxContainer = parallaxRef.current;
        if (!parallaxContainer) return;

        // Check if device is mobile
        const isMobile = window.innerWidth <= 768;
        
        // Fixed scroll values for mobile and desktop
        const scrollValues = {
            mobile: {
                dayLight: 800,
                firstSun: -30,
                cloud1: -150,
                cloud2: 75,
                secondSun: 30,
                nightCloud1: { y: 30, x: -75 },
                nightCloud2: { y: 30, x: 75 }
            },
            desktop: {
                dayLight: 800,
                firstSun: -50,
                cloud1: -200,
                cloud2: 100,
                secondSun: 50,
                nightCloud1: { y: 50, x: -100 },
                nightCloud2: { y: 50, x: 100 }
            }
        };

        const values = isMobile ? scrollValues.mobile : scrollValues.desktop;

        // Simple parallax for day_light.svg
        const dayLight = dayImagesRef.current[0];
        if (dayLight) {
            gsap.to(dayLight, {
                y: values.dayLight,
                x: 0,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: "top top",
                    end: isMobile ? "+=600" : "center center",
                    scrub: 0.5,
                }
            });
        }

        // First sun fade up animation
        const firstSun = dayImagesRef.current[3];
        if (firstSun) {
            gsap.to(firstSun, {
                y: values.firstSun,
                opacity: 0,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: "top top",
                    end: isMobile ? "+=300" : "+=400",
                    scrub: 0.5
                }
            });
        }

        // Horizontal parallax for clouds
        const cloud1 = dayImagesRef.current[1];
        const cloud2 = dayImagesRef.current[2];
        if (cloud1) {
            gsap.to(cloud1, {
                x: values.cloud1,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: "top top",
                    end: isMobile ? "+=400" : "center center",
                    scrub: 0.5
                }
            });
        }
        if (cloud2) {
            gsap.to(cloud2, {
                x: values.cloud2,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: "top top",
                    end: isMobile ? "+=400" : "center center",
                    scrub: 0.5
                }
            });
        }

        // Second sun animation
        const secondSun = dayImagesRef.current[4];
        if (secondSun) {
            gsap.fromTo(secondSun,
                { opacity: 0, y: values.secondSun },
                {
                    opacity: 1,
                    y: 0,
                    ease: "power2.in",
                    scrollTrigger: {
                        trigger: "#form-section",
                        start: isMobile ? "top bottom" : "top bottom",
                        end: isMobile ? "top center" : "top top",
                        scrub: 0.5,
                    }
                }
            );
        }

        // Night clouds animations
        const nightCloud1 = nightImagesRef.current[1];
        const nightCloud2 = nightImagesRef.current[2];
        if (nightCloud1) {
            gsap.fromTo(nightCloud1,
                { opacity: 0, y: values.nightCloud1.y, x: values.nightCloud1.x },
                {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    ease: "power3.in",
                    scrollTrigger: {
                        trigger: "#form-section",
                        start: isMobile ? "top bottom" : "top bottom",
                        end: isMobile ? "top center" : "top top",
                        scrub: 0.5,
                    }
                }
            );
        }
        if (nightCloud2) {
            gsap.fromTo(nightCloud2,
                { opacity: 0, y: values.nightCloud2.y, x: values.nightCloud2.x },
                {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    ease: "power3.in",
                    scrollTrigger: {
                        trigger: "#form-section",
                        start: isMobile ? "top bottom" : "top bottom",
                        end: isMobile ? "top center" : "top top",
                        scrub: 0.5,
                    }
                }
            );
        }

        // Keep other animations as they were
        dayImagesRef.current.forEach((img, index) => {
            if (!img || index === 0 || index === 1 || index === 2 || index === 3 || index === 4) return;
            gsap.to(img, {
                y: isMobile ? -30 : -100,
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: "top top",
                    end: isMobile ? "+=300" : "center top",
                    scrub: true
                }
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className="parallax-outer" ref={parallaxRef}>
            <img 
                src="/entirebg.svg" 
                alt="Background" 
                className="Background"
            />
            
            <img ref={el => dayImagesRef.current[0] = el} src="/day_light.svg" alt="Day Light" className="ParallaxImage DayImage" />
            <img ref={el => dayImagesRef.current[1] = el} src="/day_cloud_1.svg" alt="Day Cloud 1" className="ParallaxImage DayImage" />
            <img ref={el => dayImagesRef.current[2] = el} src="/day_cloud_2.svg" alt="Day Cloud 2" className="ParallaxImage DayImage" />
            <img ref={el => dayImagesRef.current[3] = el} src="/sun.svg" alt="Sun" className="ParallaxImage DayImage" />
            <img ref={el => dayImagesRef.current[4] = el} src="/sun.svg" alt="Second Sun" className="ParallaxImage DayImage second-sun" />

            <img ref={el => nightImagesRef.current[0] = el} src="/night_light.svg" alt="Night Light" className="ParallaxImage NightImage" />
            <img ref={el => nightImagesRef.current[1] = el} src="/night_cloud_1.svg" alt="Night Cloud 1" className="ParallaxImage NightImage" />
            <img ref={el => nightImagesRef.current[2] = el} src="/night_cloud_2.svg" alt="Night Cloud 2" className="ParallaxImage NightImage" />
        </div>
    );
} 