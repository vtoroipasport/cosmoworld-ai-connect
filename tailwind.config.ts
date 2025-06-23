
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				neon: {
					blue: '#00f5ff',
					purple: '#bf40bf',
					pink: '#ff1493',
					green: '#39ff14',
					orange: '#ff6600',
					cyan: '#00ffff',
					magenta: '#ff00ff',
					yellow: '#ffff00'
				},
				cyber: {
					dark: '#0a0a0f',
					medium: '#1a1a2e',
					light: '#16213e',
					accent: '#0f3460'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px) scale(0.9)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0) scale(1)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.8) rotateY(-30deg)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1) rotateY(0deg)',
						opacity: '1'
					}
				},
				'glow-pulse': {
					'0%, 100%': {
						boxShadow: '0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor'
					},
					'50%': {
						boxShadow: '0 0 30px currentColor, 0 0 60px currentColor, 0 0 90px currentColor'
					}
				},
				'float-advanced': {
					'0%, 100%': {
						transform: 'translateY(0px) rotateX(0deg)'
					},
					'25%': {
						transform: 'translateY(-15px) rotateX(5deg)'
					},
					'50%': {
						transform: 'translateY(-30px) rotateX(0deg)'
					},
					'75%': {
						transform: 'translateY(-15px) rotateX(-5deg)'
					}
				},
				'pulse-glow-advanced': {
					'0%, 100%': {
						opacity: '1',
						transform: 'scale(1)',
						filter: 'brightness(1)'
					},
					'50%': {
						opacity: '0.9',
						transform: 'scale(1.05)',
						filter: 'brightness(1.2)'
					}
				},
				'gradient-shift-advanced': {
					'0%': {
						backgroundPosition: '0% 50%'
					},
					'25%': {
						backgroundPosition: '50% 0%'
					},
					'50%': {
						backgroundPosition: '100% 50%'
					},
					'75%': {
						backgroundPosition: '50% 100%'
					},
					'100%': {
						backgroundPosition: '0% 50%'
					}
				},
				'neon-flicker-advanced': {
					'0%, 100%': {
						textShadow: '0 0 7px currentColor, 0 0 15px currentColor, 0 0 25px currentColor, 0 0 35px currentColor',
						opacity: '1'
					},
					'10%': {
						textShadow: '0 0 3px currentColor, 0 0 8px currentColor, 0 0 15px currentColor, 0 0 25px currentColor',
						opacity: '0.8'
					},
					'20%': {
						textShadow: '0 0 7px currentColor, 0 0 15px currentColor, 0 0 25px currentColor, 0 0 35px currentColor',
						opacity: '1'
					}
				},
				'matrix-rain': {
					'0%': {
						transform: 'translateY(-100%)',
						opacity: '0'
					},
					'50%': {
						opacity: '1'
					},
					'100%': {
						transform: 'translateY(100vh)',
						opacity: '0'
					}
				},
				'cyber-glitch': {
					'0%, 100%': {
						transform: 'translate(0)',
						filter: 'hue-rotate(0deg)'
					},
					'20%': {
						transform: 'translate(-2px, 2px)',
						filter: 'hue-rotate(90deg)'
					},
					'40%': {
						transform: 'translate(-2px, -2px)',
						filter: 'hue-rotate(180deg)'
					},
					'60%': {
						transform: 'translate(2px, 2px)',
						filter: 'hue-rotate(270deg)'
					},
					'80%': {
						transform: 'translate(2px, -2px)',
						filter: 'hue-rotate(360deg)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
				'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
				'float-advanced': 'float-advanced 8s ease-in-out infinite',
				'pulse-glow-advanced': 'pulse-glow-advanced 3s ease-in-out infinite',
				'gradient-shift-advanced': 'gradient-shift-advanced 5s ease infinite',
				'neon-flicker-advanced': 'neon-flicker-advanced 2s ease-in-out infinite',
				'matrix-rain': 'matrix-rain 3s linear infinite',
				'cyber-glitch': 'cyber-glitch 0.3s ease-in-out infinite'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'cyber-grid': 'linear-gradient(rgba(0,245,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.1) 1px, transparent 1px)',
				'neural-network': 'radial-gradient(circle at 20% 30%, rgba(0,245,255,0.2) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(255,20,147,0.2) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(57,255,20,0.2) 0%, transparent 50%)'
			},
			backdropBlur: {
				'xs': '2px',
			},
			fontFamily: {
				'futura': ['Futura', 'sans-serif'],
				'orbitron': ['Orbitron', 'monospace'],
				'rajdhani': ['Rajdhani', 'sans-serif']
			},
			perspective: {
				'1000': '1000px',
				'2000': '2000px',
			},
			transformStyle: {
				'preserve-3d': 'preserve-3d',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
