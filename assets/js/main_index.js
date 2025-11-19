document.addEventListener("DOMContentLoaded", function () {
    // Select elements to animate
    // We want to target the main blocks: header, intro text, year markers, and lists
    const observers = document.querySelectorAll('.header, .introduction p, .year, .introduction ul, .footer');
    
    // Add staggered-list class to lists inside introduction for JS handling
    document.querySelectorAll('.introduction ul').forEach(ul => {
        ul.classList.add('staggered-list');
    });

    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                target.classList.add('visible-section');
                
                // Handle staggered animation for lists
                if (target.classList.contains('staggered-list')) {
                    const items = target.querySelectorAll('li');
                    items.forEach((item, index) => {
                        // Add a delay based on index
                        item.style.transitionDelay = `${index * 0.1}s`;
                        // Force reflow to ensure transition plays if needed (though class addition usually handles it)
                    });
                }

                // entry.target.classList.remove('hidden-section'); // Keeping this to maintain the transition property
                observer.unobserve(target); // Only animate once
            }
        });
    }, observerOptions);

    observers.forEach(el => {
        // If it's a staggered list, we don't hide the UL itself in the same way, 
        // but we hide its children via CSS. 
        // However, the observer is on the UL.
        if (!el.classList.contains('staggered-list')) {
            el.classList.add('hidden-section');
        }
        observer.observe(el);
    });
});
