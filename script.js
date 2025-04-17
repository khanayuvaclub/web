document.addEventListener("DOMContentLoaded", () => {
  // Declare AOS
  const AOS = window.AOS

  // Declare VanillaTilt
  const VanillaTilt = window.VanillaTilt

  // Declare particlesJS
  const particlesJS = window.particlesJS

  // Declare Tally
  const Tally = window.Tally

  // Preloader
  const preloader = document.querySelector(".preloader")
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("fade-out")
    }, 1000)
  })

  // Initialize AOS (Animate on Scroll)
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  })

  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active")
      navMenu.classList.toggle("active")
    })
  }

  // Close menu when clicking on a nav link
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Header scroll effect
  const header = document.querySelector(".header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    const isClickInsideMenu = navMenu.contains(event.target)
    const isClickOnToggle = menuToggle.contains(event.target)

    if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active")
    }
  })

  // Back to top button
  const backToTopButton = document.getElementById("back-to-top")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("visible")
    } else {
      backToTopButton.classList.remove("visible")
    }
  })

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Initialize Vanilla Tilt for 3D card effect
  VanillaTilt.init(document.querySelectorAll(".hero-image-3d"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.3,
  })

  // Initialize Particles.js for hero background
  if (document.getElementById("particles-js")) {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#d4e0ff", // Light blue color for particles
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#a3bffa", // Light blue color for connecting lines
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 6,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    })
  }

  // Add 3D hover effect to member cards
  const memberCards = document.querySelectorAll(".member-card")
  memberCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const cardRect = card.getBoundingClientRect()
      const x = e.clientX - cardRect.left
      const y = e.clientY - cardRect.top

      const centerX = cardRect.width / 2
      const centerY = cardRect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)"
    })
  })

// Financial Form Submission
const paymentForm = document.getElementById('paymentForm');
if (paymentForm) {
    paymentForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const status = document.getElementById('status');
        status.textContent = 'पेश गर्दै...';
        status.className = '';

        const fileInput = document.getElementById('screenshot');
        const file = fileInput.files[0];

        if (!file) {
            status.textContent = 'कृपया छवि फाइल चयन गर्नुहोस्।';
            status.className = 'error';
            return;
        }

        // Check file size (limit to ~4MB for Google Apps Script)
        if (file.size > 4 * 1024 * 1024) {
            status.textContent = 'फाइल धेरै ठूलो छ। कृपया ४ एमबी भन्दा कमको छवि अपलोड गर्नुहोस्।';
            status.className = 'error';
            return;
        }

        // Convert file to base64
        const reader = new FileReader();
        reader.onload = async function(event) {
            const base64Data = event.target.result.split(',')[1]; // Remove data:image/...;base64, prefix

            // Collect form data
            const formData = new FormData(paymentForm);
            const data = {
                Name: formData.get('Name'),
                Phone: formData.get('Phone'),
                Amount: formData.get('Amount'),
                Method: formData.get('Method'),
                screenshotBase64: base64Data,
                screenshotName: file.name
            };

            try {
                const response = await fetch('https://script.google.com/macros/s/AKfycbxg2aN_ErP6KcNqnHWCXfmxX7GsDl5nguPw93PyOgkpNTcS01SqjTtHrlJJ5gBhE4cN/exec', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams(data)
                });

                const result = await response.json();
                if (result.result === 'success') {
                    status.textContent = 'सफलतापूर्वक पेश गरियो!';
                    status.className = 'success';
                    paymentForm.reset();
                } else {
                    status.textContent = 'त्रुटि: ' + result.error;
                    status.className = 'error';
                }
            } catch (error) {
                status.textContent = 'त्रुटि: ' + error.message;
                status.className = 'error';
            }
        };
        reader.readAsDataURL(file);
    });
}
  // Scroll to top button
  const scrollTopBtn = document.createElement("button")
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
  scrollTopBtn.className = "scroll-top-btn"
  document.body.appendChild(scrollTopBtn)

  // Add CSS for scroll to top button
  const style = document.createElement("style")
  style.textContent = `
        .scroll-top-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
        }
        
        .scroll-top-btn.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-top-btn:hover {
            background-color: var(--secondary-color);
            transform: translateY(-3px);
        }
    `
  document.head.appendChild(style)

  // Show/hide scroll to top button
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add("visible")
    } else {
      scrollTopBtn.classList.remove("visible")
    }
  })

  // Scroll to top when button is clicked
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Add animation to elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".member-card, .section-title, .about-content, .message, .payment-section, .form-container",
    )

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 100) {
        element.classList.add("animate")
      }
    })
  }

  // Add CSS for scroll animations
  const animationStyle = document.createElement("style")
  animationStyle.textContent = `
        .member-card, .section-title, .about-content, .message, .payment-section, .form-container {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .member-card.animate, .section-title.animate, .about-content.animate, .message.animate, .payment-section.animate, .form-container.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .section-title {
            transition-delay: 0.1s;
        }
        
        .about-content, .message {
            transition-delay: 0.3s;
        }
        
        .member-card:nth-child(1) {
            transition-delay: 0.1s;
        }
        
        .member-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .member-card:nth-child(3) {
            transition-delay: 0.3s;
        }
        
        .member-card:nth-child(4) {
            transition-delay: 0.4s;
        }
        
        .member-card:nth-child(5) {
            transition-delay: 0.5s;
        }
        
        .member-card:nth-child(6) {
            transition-delay: 0.6s;
        }
        
        .member-card:nth-child(7) {
            transition-delay: 0.7s;
        }
    `
  document.head.appendChild(animationStyle)

  // Run animation on load and scroll
  window.addEventListener("load", animateOnScroll)
  window.addEventListener("scroll", animateOnScroll)
})
