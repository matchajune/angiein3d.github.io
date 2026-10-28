    // Minimal JS just for the spotlight effect
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        // Update CSS variables for the spotlight effect
        card.style.setProperty('--x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--y', `${e.clientY - rect.top}px`);
      });
    });


    function playWhenReady(video) {
      if (!video) return;
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      const tryPlay = function () {
        const playPromise = video.play();
        if (playPromise && playPromise.catch) {
          playPromise.catch(function () {});
        }
      };
      if (video.readyState >= 2) {
        tryPlay();
      } else {
        video.addEventListener('canplay', tryPlay, { once: true });
        video.addEventListener('loadeddata', tryPlay, { once: true });
      }
      tryPlay();
    }

    const allSiteVideos = document.querySelectorAll('video');
    allSiteVideos.forEach(playWhenReady);

    document.addEventListener('touchstart', function () {
      allSiteVideos.forEach(playWhenReady);
    }, { once: true, passive: true });

    document.addEventListener('click', function () {
      allSiteVideos.forEach(playWhenReady);
    }, { once: true });


    // form handling: send via EmailJS, then show success and reset
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const form = this;

      emailjs.sendForm("service_do1et99", "template_oklufvh", form).then(function() {
        // Show success message
        document.getElementById('successMessage').style.display = 'block';

        // Reset form
        form.reset();

        // Hide success message after 3 seconds
        setTimeout(function() {
          document.getElementById('successMessage').style.display = 'none';
        }, 3000);
      }, function(error) {
        console.error('EmailJS send failed:', error);
        alert('Sorry, your message could not be sent. Please email animaciond298@gmail.com directly.');
      });
    });
    
    // header "Contact" and hero "CONTACT ME" buttons scroll to the contact section
    document.querySelectorAll('.contact-btn, .bento-grid .btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      });
    });
