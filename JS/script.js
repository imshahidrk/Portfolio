// ---------- DARK MODE BUTTON -------------
const toggle = document.getElementById("toggle");

toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-theme", toggle.checked);
});
// ---------- NAVIGATION BAR FUNCTION -------------
const menuBtn = document.getElementById("myNavMenu");
const menuIcon = document.getElementById("menu-icon");      // Menu Bars
const closeIcon = document.getElementById("close-icon");    // Menu Closing 

// Toggle the menu
function myMenuFunction() {
    menuBtn.classList.toggle("responsive");
    menuIcon.classList.toggle("menu-click");
}

// Close the menu if it's open
function closeMenu() {
    if (menuBtn.classList.contains("responsive")) {
        menuBtn.classList.remove("responsive");
        menuIcon.classList.remove("menu-click");
    }
}

// Event listeners for closing the menu
document.querySelectorAll('.nav-menu a').forEach(link => link.addEventListener('click', closeMenu));


// ------------- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING -------
    window.onscroll = function() {headerShadow()};

    function headerShadow(){
        const navHeader =document.getElementById("header");
        const navMenu =document.getElementById("myNavMenu");

        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50){
            navHeader.style.height = "70px";
            navHeader.style.lineHeight = "70px";
            navMenu.style.top = "70px";
                // For Dark Mode
                if(document.body.classList.contains("dark-theme")){
                navHeader.style.boxShadow = "0 1px 6px rgb(216, 216, 216, 0.2)";
                }else{
                navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
                }
        }else {
            navHeader.style.height = "90px";
            navHeader.style.lineHeight = "90px";
            navMenu.style.top = "90px";
            navHeader.style.boxShadow = "none";
            }
    }

// ------------- TYPING EFFECT -------
    var typingEffect = new Typed(".typedText",{
        strings : ["Developer", "Creator", "Designer"],
        loop : true,
        typeSpeed : 100,
        backSpeed : 80,
        backDelay : 2000
    })
// ------------- SCROLL REVEAL ANIMATAION -------
    const sr = ScrollReveal({
        origin : 'top',
        distance : '80px',
        duration : 2000,
        reset : true
    })

// ------------- HOME  -------
    sr.reveal('.featured-text-card',{})
    sr.reveal('.featured-name',{delay:100})
    sr.reveal('.featured-text-info',{delay : 200})
    sr.reveal('.featured-text-btn',{delay : 200})
    sr.reveal('.social-icons',{delay : 200})
    sr.reveal('.featured-image',{delay : 300})

// ------------- SERVICE BOX & WORK BOX  -------
    sr.reveal('.service-box',{interval: 300})

// ------------- HEADINGS  -------
    sr.reveal('.top-header',{})    

// ------------- ABOUT INFO & CONTACT INFO -------
    const srLeft = ScrollReveal({
        origin : 'left',
        distance : '80px',
        duration : 2000,
        reset : true
    })

    srLeft.reveal('.about-info',{delay: 100})
    srLeft.reveal('.contact-info',{delay: 100})

// ------------- ABOUT SKILLS & FORM BOX  -------
const srRight = ScrollReveal({
    origin : 'right',
    distance : '80px',
    duration : 2000,
    reset : true
})

srRight.reveal('.skills-box',{delay: 100})
srRight.reveal('.form-control',{delay: 100})
// ------------- ABOUT SKILLS & FORM BOX  -------
const srBottom = ScrollReveal({
    opacity: 0,
    duration: 2000,
    easing: 'ease-in-out',
    reset: true,     // Ensures the animation only happens once on load
    distance: '0px'
})

srBottom.reveal('.work-box',{interval: 300})

// ------------- CHANGE ACTIVE LINK  -------
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.scrollY;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
                sectionTop = current.offsetTop - 50,
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
 
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link')

        }else{
                document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}

    window.addEventListener('scroll', scrollActive)


    
// FORM VALIDATION, SEND EMAIL, SAVE FORM DATA INTO SHEET AND STATUS MESSAGE

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // Initialize EmailJS
    emailjs.init('dJ5kojzYGVgg3hR0d'); // Your EmailJS Public Key

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        formMessage.innerHTML = '';

        // Show processing message
        formMessage.innerHTML = 'Processing...';
        formMessage.style.color = 'green';

        // Get form data
        var fname = document.forms["myForm"]["fname"].value.trim();
        var lname = document.forms["myForm"]["lname"].value.trim();
        var email = document.forms["myForm"]["user_email"].value.trim();
        var tel = document.forms["myForm"]["tel"].value.trim();
        var message = document.forms["myForm"]["message"].value.trim() || '(No message provided)';
        var full_name = `${fname} ${lname}`;

        // Log email for debugging
        // console.log('Submitted email:', email);     //For testing purpose

        // Validate inputs
        var namePattern = /^[a-zA-Z]+$/;
        if (!namePattern.test(fname)) {
            formMessage.innerHTML = 'Please enter your First Name properly';
            formMessage.style.color = 'red';
            return;
        }
        if (!namePattern.test(lname)) {
            formMessage.innerHTML = 'Please enter your Last Name properly';
            formMessage.style.color = 'red';
            return;
        }
        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            formMessage.innerHTML = 'Please enter a valid email address';
            formMessage.style.color = 'red';
            return;
        }
        var telPattern = /^[9876]\d{9}$/;
        if (!telPattern.test(tel)) {
            formMessage.innerHTML = 'Please enter a valid 10-digit phone number';
            formMessage.style.color = 'red';
            return;
        }

        try {
            // Send user thank-you email
            await emailjs.send('service_1vfgxxj', 'template_mf01bjf', {
                full_name,
                user_email: email,
                tel,
                message
            });

            // Send admin notification email
            await emailjs.send('service_1vfgxxj', 'template_znnt8eb', {
                full_name,
                user_email: email,
                tel,
                message
            });

            // Log into google sheet
            const scriptURL = 'https://script.google.com/macros/s/AKfycbwGOzZ1au9ZoupkTVJlg_H-u0GyflzJ4zw48CZwCOA72XYqUGOGq1fEiScDj7dEcszg/exec';
            // Get IP address from ipify API
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            const ipAddress = ipData.ip || 'Unknown';
            // Get User Agent
            const userAgent = navigator.userAgent || 'Unknown';
            // Create FormData and append IP and User Agent
            const formData = new FormData(form);
            formData.append('ipAddress', ipAddress);
            formData.append('userAgent', userAgent);
            // Send form data to Google Apps Script
            await fetch(scriptURL, {
                method: 'POST',
                body: formData
            });

            
            // Success message
            formMessage.innerHTML = 'Your message has been sent successfully!<br>Thank you, I will reach you soon!';
            formMessage.style.color = 'green';
            form.reset();
            setTimeout(() => { formMessage.innerHTML = ''; }, 7000);
        } catch (error) {
            console.error('EmailJS Error:', error);
            formMessage.innerHTML = 'Error sending email: ' + (error.text || 'Please try again later.');
            formMessage.style.color = 'red';
        }
    });
});