'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Parallax from './Parallax';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

const helpOptions = [
  'Poster / Banner',
  'Instagram Reel / Video Edit',
  'Motion Graphics / Animation',
  'Copywriting (event description / caption)',
  'Other (specify)',
];

const aestheticOptions = [
  'Clean & minimal',
  'Bold & vibrant',
  'Retro / Vintage',
  'Futuristic / Techy',
  'Cultural / Traditional',
  'Other (describe)',
];

export default function Hero() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    help: '',
    helpOther: '',
    club: '',
    event: '',
    about: '',
    aesthetic: '',
    aestheticOther: '',
    references: null,
    logo: null,
    date: '',
    whatsapp: '',
    email: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const refInputReferences = useRef();
  const refInputLogo = useRef();

  // Add state for validation and warning
  const [validationError, setValidationError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [warningMessage, setWarningMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Add this function to handle file size validation
  const validateFileSize = (file) => {
    if (file && file.size > MAX_FILE_SIZE) {
      setValidationError(true);
      setWarningMessage(`File size must be less than 5MB. Current size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
      return false;
    }
    return true;
  };

  // Modify the file input handlers
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file && validateFileSize(file)) {
      setForm({ ...form, [field]: file });
      setValidationError(false);
      setWarningMessage('');
    } else {
      e.target.value = ''; // Clear the input
    }
  };

  // Create a new function to handle upload and submission
  const handleUploadAndSubmit = async () => {
    let isValid = true;
    let message = '';

    // Validate mandatory fields for the final step (step 8)
    if (!form.date) {
      isValid = false;
      message = 'Please select a date!';
    } else if (!form.whatsapp) {
      isValid = false;
      message = 'Please provide your WhatsApp number!';
    }

    if (!isValid) {
      setValidationError(true);
      setShakeKey(prevKey => prevKey + 1);
      setWarningMessage(message);
      return;
    }

    setValidationError(false);
    setWarningMessage('');
    setIsSubmitting(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('name', form.name || '');
      formData.append('email', form.email || '');
      formData.append('phone', form.whatsapp || '');
      formData.append('eventType', form.help === 'Other (specify)' ? form.helpOther || '' : form.help || '');
      formData.append('eventDate', form.date ? form.date.toISOString() : '');
      formData.append('budget', form.club || '');
      formData.append('message', `Event: ${form.event || ''}\nAbout: ${form.about || ''}\nAesthetic: ${form.aesthetic === 'Other (describe)' ? form.aestheticOther || '' : form.aesthetic || ''}\nNotes: ${form.notes || ''}`);

      if (form.references) {
        formData.append('references', form.references, form.references.name);
      }
      if (form.logo) {
        formData.append('logo', form.logo, form.logo.name);
      }

      const response = await fetch('/api/upload-and-submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      if (!data.success) {
        throw new Error(data.error || 'Form submission failed');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.message || 'Failed to submit form. Please try again.');
      setValidationError(true);
      setShakeKey(prev => prev + 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  const next = () => {
    let isValid = true;
    let message = '';

    // Validate mandatory fields based on current step
    if (step === 1 && !form.name) {
      isValid = false;
      message = 'Please tell us your name!';
    } else if (step === 2 && !form.help) {
      isValid = false;
      message = 'Please select what you need with!';
    } else if (step === 3 && !form.club) {
      isValid = false;
      message = 'Please tell us which club or department you are from!';
    } else if (step === 4 && !form.event) {
      isValid = false;
      message = 'Please provide the event or project name!';
    } else if (step === 5 && !form.about) {
      isValid = false;
      message = 'Please tell us what the event is about!';
    }

    if (!isValid) {
      setValidationError(true);
      setShakeKey(prevKey => prevKey + 1);
      setWarningMessage(message);
    } else {
      setValidationError(false);
      setWarningMessage('');
      setStep(s => s + 1);
    }
  };

  const back = () => {
    setValidationError(false);
    setWarningMessage('');
    setStep(s => s - 1);
  }

  // Check URL parameter on mount and scroll if needed
  useEffect(() => {
    let timer;

    try {
      // Wait for loading screen to be removed
      const checkLoadingScreen = setInterval(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (!loadingScreen) {
          clearInterval(checkLoadingScreen);
          
          // Now that loading screen is gone, check URL parameter
          const searchParams = new URLSearchParams(window.location.search);
          const shouldScroll = searchParams.get('scroll') === 'form';
          console.log('Hero: URL parameter scroll is', searchParams.get('scroll'));

          if (shouldScroll) {
            console.log('Hero: Found scroll parameter, waiting for button...');
            
            // Use a small delay to ensure button is rendered
            timer = setTimeout(() => {
              console.log('Hero: Attempting to find #scroll-down-button...');
              const scrollButton = document.getElementById('scroll-down-button');

              if (scrollButton) {
                console.log('Hero: #scroll-down-button found! Programmatically clicking...');
                // Programmatically click the scroll down button
                scrollButton.click();
                console.log('Hero: Click event triggered on #scroll-down-button.');
                
                // Only remove the parameter after we've clicked the button
                const newUrl = window.location.pathname;
                window.history.replaceState({}, '', newUrl);
                console.log('Hero: Removed scroll parameter from URL');
              } else {
                console.warn('Hero: #scroll-down-button not found.');
              }
            }, 100); // Small delay to ensure button is rendered
          }
        }
      }, 100); // Check every 100ms for loading screen removal

      // Cleanup both timers
      return () => {
        clearInterval(checkLoadingScreen);
        if (timer) {
          console.log('Hero: Cleaning up timeout.');
          clearTimeout(timer);
        }
      };
    } catch (e) {
      console.error('Hero: Failed to check URL parameters or set up timers:', e);
    }
  }, []); // Empty dependency array means this effect runs once on mount

  // Function to scroll to the form section (used by the scroll down button)
  const scrollToFormSection = () => {
    const formSection = document.getElementById('form-section');
    if (formSection) {
      console.log('Hero: #form-section found via scrollToFormSection! Scrolling...');
      // Use scrollIntoView to scroll the form section into view
      formSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start', // Align the top of the element to the top of the viewport
      });
    } else {
      console.warn('Hero: #form-section not found via scrollToFormSection.');
    }
  };

  // Modify the original scrollToForm function to use the new one (for button click)
  const scrollToForm = () => {
    scrollToFormSection();
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <div className="bg-gradient-to-r from-pink-200 to-indigo-200 rounded-xl shadow-2xl p-10 max-w-lg w-full text-center animate-fade-in">
          <div className="text-5xl mb-4">🚨</div>
          <h2 className="text-2xl font-bold mb-2">Your Creative SOS Message Has Been Received</h2>
          <p className="mb-4 text-lg">The CreativeCommon Team is now officially working on this</p>
          <p className="italic text-gray-700">and remember—our club designs everything except your excuses for late submissions.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen">
      <Parallax />
      {/* Hero Section */}
      <div className="h-screen relative">
        <div className="w-full h-full flex flex-col items-center justify-center pt-20 sm:pt-32">
          {/* Content */}
          <div className="relative z-10 px-4 sm:px-0">
            <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 sm:backdrop-blur-none sm:bg-transparent sm:p-0">
              <motion.h1
                className="font-jacquard text-[clamp(4rem,8vw,200px)] sm:text-[clamp(3rem,16vw,200px)] leading-none text-white text-center select-none"
                style={{ lineHeight: '0.8em', letterSpacing: '0.09em', textShadow: '3px 3px 6px rgba(0,0,0,0.6)' }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                Creative Common
              </motion.h1>
              <div className="mt-2 sm:mt-0 text-sm sm:text-2xl md:text-3xl tracking-[0.15em] sm:tracking-[0.3em] font-medium text-white text-center">
                C R E A T I V E &nbsp; C O M M O N
              </div>
              <div className="mt-2 sm:mt-6 text-xs sm:text-lg italic text-white/80 text-center w-full max-w-4xl mx-auto">
                <div className="flex justify-center">
                    -where ideas matter as much as execution
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-20 sm:bottom-8 left-0 right-0 flex justify-center items-center"
          >
            <div 
              id="scroll-down-button"
              onClick={scrollToForm}
              className="cursor-pointer backdrop-blur-md bg-white/15 rounded-full px-6 sm:px-8 py-2 sm:py-3 flex items-center gap-4 border border-white/50 hover:bg-white/10 transition-all duration-300"
            >
              <span className="tracking-[0.3em] font-bold text-base sm:text-lg text-white/90 animate-[bounce_1s_ease-in-out_infinite]">SCROLL DOWN</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Form Section */}
      <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-pink-50">
        <div 
          id="form-section"
          className="w-full min-h-screen flex items-center justify-center px-4 sm:px-6 py-10"
        >
          <div 
            key={shakeKey}
            className={`w-full max-w-xl bg-white/95 rounded-2xl p-4 sm:p-8 animate-fade-in relative z-10 ${validationError ? 'animate-shake' : ''}`}
            style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
          >
            {!isSubmitted ? (
              <>
                <div className="mb-6 sm:mb-8 text-center">
                  <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-indigo-700">Request a Design</h2>
                  <p className="text-gray-500">Let us know what you need and we'll make it awesome!</p>
                </div>

                {/* Warning Message */}
                {validationError && warningMessage && (
                  <motion.div
                    key={shakeKey}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 text-center text-red-600 font-semibold bg-red-100 border border-red-400 rounded-md p-3"
                  >
                    {warningMessage}
                  </motion.div>
                )}

                {step === 1 && (
                  <div className="space-y-6">
                    <label className="block text-lg font-semibold">What's your name? <span className="text-pink-500">*</span></label>
                    <input
                      className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-300 outline-none ${validationError && !form.name ? 'border-red-500 placeholder-red-500' : ''}`}
                      value={form.name}
                      onChange={e => {
                        setForm({ ...form, name: e.target.value });
                        if (validationError && e.target.value) {
                          setValidationError(false);
                          setWarningMessage('');
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && form.name) {
                          e.preventDefault();
                          next();
                        }
                      }}
                      placeholder="Your name"
                      required
                    />
                    <p className="text-gray-400 text-sm">→ So we know who to thank 😄</p>
                    <div className="flex gap-2">
                      <button
                        className="flex-1 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold transition-all duration-300 hover:from-indigo-600 hover:to-pink-600 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
                        onClick={form.name ? next : undefined}
                        disabled={!form.name}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <label className="block text-lg font-semibold">What would you like us to help with? <span className="text-pink-500">*</span></label>
                    <div className={`grid gap-3 ${validationError && !form.help ? 'border-red-500' : ''}`}>
                      {helpOptions.map(opt => (
                        <label key={opt} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${form.help === opt ? 'bg-indigo-100 border-indigo-400' : 'hover:bg-gray-50'} ${validationError && !form.help ? 'border-red-400' : ''}`}>
                          <input
                            type="radio"
                            name="help"
                            value={opt}
                            checked={form.help === opt}
                            onChange={e => {
                              setForm({ ...form, help: opt });
                              if (validationError && opt) {
                                setValidationError(false);
                                setWarningMessage('');
                              }
                            }}
                            className="accent-pink-500"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                      {form.help === 'Other (specify)' && (
                        <input
                          className={`w-full p-2 rounded border mt-2 ${validationError && form.help === 'Other (specify)' && !form.helpOther ? 'border-red-500 placeholder-red-500' : ''}`}
                          placeholder="Please specify"
                          value={form.helpOther}
                          onChange={e => {
                            setForm({ ...form, helpOther: e.target.value });
                            if (validationError && e.target.value) {
                              setValidationError(false);
                              setWarningMessage('');
                            }
                          }}
                        />
                      )}
                    </div>
                    <div className="flex gap-2">
                      {step > 1 && (
                        <button
                          className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold transition-all duration-300 hover:bg-gray-200 hover:scale-105 hover:shadow-md border border-gray-200"
                          onClick={back}
                        >
                          Back
                        </button>
                      )}
                      <button
                        className="flex-1 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold transition-all duration-300 hover:from-indigo-600 hover:to-pink-600 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
                        onClick={form.help ? next : undefined}
                        disabled={!form.help}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <label className="block text-lg font-semibold">Which club or department are you from? <span className="text-pink-500">*</span></label>
                    <input
                      className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-300 outline-none ${validationError && !form.club ? 'border-red-500 placeholder-red-500' : ''}`}
                      value={form.club}
                      onChange={e => {
                        setForm({ ...form, club: e.target.value });
                        if (validationError && e.target.value) {
                          setValidationError(false);
                          setWarningMessage('');
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && form.club) {
                          e.preventDefault();
                          next();
                        }
                      }}
                      placeholder="e.g. Literary Club, Robotics Dept."
                      required
                    />
                    <div className="flex gap-2">
                      {step > 1 && (
                        <button
                          className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold transition-all duration-300 hover:bg-gray-200 hover:scale-105 hover:shadow-md border border-gray-200"
                          onClick={back}
                        >
                          Back
                        </button>
                      )}
                      <button
                        className="flex-1 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold transition-all duration-300 hover:from-indigo-600 hover:to-pink-600 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
                        onClick={form.club ? next : undefined}
                        disabled={!form.club}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <label className="block text-lg font-semibold">What's the name of the event or project? <span className="text-pink-500">*</span></label>
                    <input
                      className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-300 outline-none ${validationError && !form.event ? 'border-red-500 placeholder-red-500' : ''}`}
                      value={form.event}
                      onChange={e => {
                        setForm({ ...form, event: e.target.value });
                        if (validationError && e.target.value) {
                          setValidationError(false);
                          setWarningMessage('');
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && form.event) {
                          e.preventDefault();
                          next();
                        }
                      }}
                      placeholder="Event or project name"
                      required
                    />
                    <div className="flex gap-2">
                      {step > 1 && (
                        <button
                          className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold transition-all duration-300 hover:bg-gray-200 hover:scale-105 hover:shadow-md border border-gray-200"
                          onClick={back}
                        >
                          Back
                        </button>
                      )}
                      <button
                        className="flex-1 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold transition-all duration-300 hover:from-indigo-600 hover:to-pink-600 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
                        onClick={form.event ? next : undefined}
                        disabled={!form.event}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-6">
                    <label className="block text-lg font-semibold">What's the event about? <span className="text-pink-500">*</span></label>
                    <textarea
                      className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-300 outline-none min-h-[80px] ${validationError && !form.about ? 'border-red-500 placeholder-red-500' : ''}`}
                      value={form.about}
                      onChange={e => {
                        setForm({ ...form, about: e.target.value });
                        if (validationError && e.target.value) {
                          setValidationError(false);
                          setWarningMessage('');
                        }
                      }}
                      placeholder="A quick summary of the purpose or vibe."
                      required
                    />
                    <p className="text-gray-400 text-sm">→ A quick summary of the purpose or vibe.</p>
                    <div className="flex gap-2">
                      {step > 1 && (
                        <button
                          className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold transition-all duration-300 hover:bg-gray-200 hover:scale-105 hover:shadow-md border border-gray-200"
                          onClick={back}
                        >
                          Back
                        </button>
                      )}
                      <button
                        className="flex-1 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold transition-all duration-300 hover:from-indigo-600 hover:to-pink-600 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
                        onClick={form.about ? next : undefined}
                        disabled={!form.about}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {step === 6 && (
                  <div className="space-y-6">
                    <label className="block text-lg font-semibold">What's your target aesthetic or mood? <span className="text-gray-400">(optional)</span></label>
                    <div className="grid gap-3">
                      {aestheticOptions.map(opt => (
                        <label key={opt} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${form.aesthetic === opt ? 'bg-pink-100 border-pink-400' : 'hover:bg-gray-50'}`}>
                          <input
                            type="radio"
                            name="aesthetic"
                            value={opt}
                            checked={form.aesthetic === opt}
                            onChange={e => setForm({ ...form, aesthetic: opt })}
                            className="accent-indigo-500"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                      {form.aesthetic === 'Other (describe)' && (
                        <input
                          className="w-full p-2 rounded border mt-2"
                          placeholder="Describe your aesthetic or mood"
                          value={form.aestheticOther}
                          onChange={e => setForm({ ...form, aestheticOther: e.target.value })}
                        />
                      )}
                    </div>
                    <div className="flex gap-2">
                      {step > 1 && (
                        <button
                          className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold transition-all duration-300 hover:bg-gray-200 hover:scale-105 hover:shadow-md border border-gray-200"
                          onClick={back}
                        >
                          Back
                        </button>
                      )}
                      <button
                        className="flex-1 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold transition-all duration-300 hover:from-indigo-600 hover:to-pink-600 hover:scale-105 hover:shadow-lg"
                        onClick={next}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {step === 7 && (
                  <div className="space-y-8">
                    <div>
                      <label className="block text-lg font-semibold mb-2">Upload any references (if you have any) <span className="text-gray-400">(optional)</span></label>
                      <div
                        className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-300 rounded-lg p-4 bg-indigo-50 hover:bg-indigo-100 transition cursor-pointer"
                      >
                        <input
                          type="file"
                          id="references"
                          className="hidden"
                          ref={refInputReferences}
                          onChange={(e) => handleFileChange(e, 'references')}
                          accept="image/*,video/*,application/pdf"
                        />
                        <label htmlFor="references" className="flex flex-col items-center cursor-pointer">
                          <svg className="w-10 h-10 text-indigo-400 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 16v-8m0 0l-4 4m4-4l4 4"/><rect x="4" y="4" width="16" height="16" rx="2"/></svg>
                          <span className="text-indigo-700 font-medium">Click or drag file to upload</span>
                          {form.references && (
                            <span className="mt-2 text-sm text-gray-600">{form.references.name}</span>
                          )}
                        </label>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">→ Posters, videos, moodboards, etc. (Max 5MB)</p>
                    </div>
                    <div>
                      <label className="block text-lg font-semibold mb-2">Upload your club logo (if available) <span className="text-gray-400">(optional)</span></label>
                      <div
                        className="flex flex-col items-center justify-center border-2 border-dashed border-pink-300 rounded-lg p-4 bg-pink-50 hover:bg-pink-100 transition cursor-pointer"
                      >
                        <input
                          type="file"
                          id="logo"
                          className="hidden"
                          ref={refInputLogo}
                          onChange={(e) => handleFileChange(e, 'logo')}
                          accept="image/*"
                        />
                        <label htmlFor="logo" className="flex flex-col items-center cursor-pointer">
                          <svg className="w-10 h-10 text-pink-400 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 15l4-4 4 4"/></svg>
                          <span className="text-pink-700 font-medium">Click or drag file to upload</span>
                          {form.logo && (
                            <span className="mt-2 text-sm text-gray-600">{form.logo.name}</span>
                          )}
                        </label>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">→ Logo files only (Max 5MB)</p>
                    </div>
                    <div className="flex gap-2">
                      {step > 1 && (
                        <button
                          className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold transition-all duration-300 hover:bg-gray-200 hover:scale-105 hover:shadow-md border border-gray-200"
                          onClick={back}
                        >
                          Back
                        </button>
                      )}
                      <button
                        className="flex-1 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold transition-all duration-300 hover:from-indigo-600 hover:to-pink-600 hover:scale-105 hover:shadow-lg"
                        onClick={next}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {step === 8 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-lg font-semibold">When do you need this by? <span className="text-pink-500">*</span></label>
                      <DatePicker
                        selected={form.date}
                        onChange={date => {
                          setForm({ ...form, date: date });
                          if (validationError && date) {
                             setValidationError(false);
                             setWarningMessage('');
                           }
                        }}
                        className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-300 outline-none ${validationError && !form.date ? 'border-red-500 placeholder-red-500' : ''}`}
                        placeholderText="Select a date"
                        minDate={new Date()}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-semibold">Your WhatsApp number <span className="text-pink-500">*</span></label>
                      <input
                        type="tel"
                        className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-300 outline-none ${validationError && !form.whatsapp ? 'border-red-500 placeholder-red-500' : ''}`}
                        value={form.whatsapp}
                        onChange={e => {
                          setForm({ ...form, whatsapp: e.target.value });
                          if (validationError && e.target.value) {
                            setValidationError(false);
                            setWarningMessage('');
                          }
                        }}
                        placeholder="+91 XXXXX XXXXX"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-semibold">Your email <span className="text-gray-400">(optional)</span></label>
                      <input
                        type="email"
                        className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-300 outline-none"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-semibold">Any additional notes? <span className="text-gray-400">(optional)</span></label>
                      <textarea
                        className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-300 outline-none min-h-[80px]"
                        value={form.notes}
                        onChange={e => setForm({ ...form, notes: e.target.value })}
                        placeholder="Any other details you'd like to share..."
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold transition-all duration-300 hover:bg-gray-200 hover:scale-105 hover:shadow-md border border-gray-200"
                        onClick={back}
                        disabled={isSubmitting}
                      >
                        Back
                      </button>
                      <button
                        className={`flex-[2] py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold text-lg transition-all duration-300 hover:from-indigo-600 hover:to-pink-600 hover:scale-105 hover:shadow-lg ${
                          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={handleUploadAndSubmit}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Submitting...</span>
                          </div>
                        ) : (
                          'Submit Request'
                        )}
                      </button>
                    </div>

                    {error && (
                      <div className="text-red-500 text-sm mt-2">
                        {error}
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8 sm:py-12">
                {/* Confetti Animation */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-4 h-4"
                      initial={{ 
                        top: '50%', 
                        left: '50%',
                        rotate: 0,
                        scale: 0
                      }}
                      animate={{ 
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        rotate: 360,
                        scale: 1
                      }}
                      transition={{ 
                        duration: 1.5,
                        delay: i * 0.1,
                        ease: "easeOut"
                      }}
                    >
                      <div className={`w-full h-full ${['bg-pink-500/20', 'bg-indigo-500/20', 'bg-yellow-500/20'][i % 3]} rounded-full`} />
                    </motion.div>
                  ))}
                </div>

                {/* Success Content */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <span className="text-3xl sm:text-4xl">🎉</span>
                    </motion.div>
                  </div>

                  <motion.h3 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
                  >
                    Your creative SOS has been received 🚨✨
                  </motion.h3>

                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-base sm:text-lg text-gray-600 mb-6"
                  >
                    Our team of slightly sleep-deprived design ninjas 🥷 armed with coffee and Photoshop will now take over.
                  </motion.p>

                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-sm sm:text-base text-gray-500 mb-8 italic"
                  >
                    remember we design everything except your excuses for late submission
                  </motion.p>

                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-indigo-600 font-medium mb-8"
                  >
                    -CreativeCommon ©
                  </motion.p>

                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    onClick={() => {
                      setIsSubmitted(false);
                      setForm({
                        name: '',
                        help: '',
                        helpOther: '',
                        club: '',
                        event: '',
                        about: '',
                        aesthetic: '',
                        aestheticOther: '',
                        references: null,
                        logo: null,
                        date: '',
                        whatsapp: '',
                        email: '',
                        notes: '',
                      });
                      setStep(1);
                    }}
                    className="px-6 sm:px-8 py-2 sm:py-3 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-medium hover:from-indigo-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Submit Another Request
                  </motion.button>
                </motion.div>
              </div>
            )}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xs sm:text-sm text-white/70 mb-0 max-w-2xl mx-auto text-center italic fixed bottom-1 left-0 right-0"
            >
              creativecommon ©
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}