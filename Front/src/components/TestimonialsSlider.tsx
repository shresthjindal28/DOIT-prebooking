
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
    role: 'Homeowner',
    rating: 5,
    text: 'DO!T saved me so much time finding a reliable plumber. The service was prompt and professional, and the plumber fixed my leak quickly. I\'ll definitely use DO!T again for all my home service needs!'
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
    role: 'Apartment Resident',
    rating: 4,
    text: 'I was skeptical at first, but DO!T connected me with an amazing electrician who rewired my entire apartment safely and efficiently. The booking process was seamless, and the pricing was transparent.'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
    role: 'Small Business Owner',
    rating: 5,
    text: 'DO!T has been a lifesaver for maintaining my small cafe. From emergency plumbing issues to routine HVAC maintenance, they\'ve connected me with reliable professionals every time. Highly recommend!'
  },
  {
    id: 4,
    name: 'David Williams',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
    role: 'New Homeowner',
    rating: 5,
    text: 'As a first-time homeowner, I had no idea who to call for various repairs. DO!T made it easy to find vetted professionals. The painter they connected me with did an outstanding job on my living room!'
  }
];

const TestimonialsSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setActiveIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1));
  };

  const prevSlide = () => {
    setActiveIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1));
  };

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
  };

  const resumeAutoPlay = () => {
    setIsAutoPlaying(true);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, activeIndex]);

  return (
    <section className="py-16 bg-gradient-to-b from-muted to-white">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="h2 mb-3">What Our Customers Say</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Don't just take our word for it, hear from our satisfied customers
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto px-10">
          <button 
            onClick={prevSlide}
            onMouseEnter={pauseAutoPlay}
            onMouseLeave={resumeAutoPlay}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-muted transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full">
                  <Card className="bg-white shadow-md border-none">
                    <CardContent className="p-8">
                      <div className="flex justify-center mb-6">
                        <Quote size={40} className="text-doit-200 opacity-50" />
                      </div>
                      <p className="text-center text-lg text-foreground/80 italic mb-6">
                        "{testimonial.text}"
                      </p>
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            className={i < testimonial.rating ? "text-doit-400 fill-doit-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <div className="flex flex-col items-center">
                        <Avatar className="h-16 w-16 mb-3">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                          <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                          <p className="text-foreground/60 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={nextSlide}
            onMouseEnter={pauseAutoPlay}
            onMouseLeave={resumeAutoPlay}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-muted transition-colors z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={pauseAutoPlay}
                onMouseLeave={resumeAutoPlay}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'w-8 bg-doit-400' : 'w-2.5 bg-muted hover:bg-doit-200'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
