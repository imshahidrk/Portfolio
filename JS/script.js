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

// ------------------------ FORM VALIDATION --------------------

function validateForm() {
    var fname = document.forms["myForm"]["fname"].value;
    var lname = document.forms["myForm"]["lname"].value;
    var email = document.forms["myForm"]["email"].value;
    var tel = document.forms["myForm"]["tel"].value;
    var formMessage = document.getElementById('formMessage');

    formMessage.style.color = 'red';
    var namePattern = /^[a-zA-Z]+$/;
    if (!namePattern.test(fname)) {
        formMessage.innerText = 'Please enter your First Name properly';
        return false;
    }
    if (!namePattern.test(lname)) {
        formMessage.innerText = 'Please enter your Last Name properly';
        return false;
    }
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        formMessage.innerText = 'Please enter a valid email address';
        return false;
    }
    var telPattern = /^[9876]\d{9}$/;
    if (!telPattern.test(tel)) {
        formMessage.innerText = 'Please enter a valid 10-digit phone number';
        return false;
    }
    return true;
}

// CODE FOR ADDING CONTACT FORM DETAILS IN GOOGLE SHEET
const scriptURL = 'https://script.google.com/macros/s/AKfycbwfxIicxq3W5Jq_dqRBANjlmniOCe2hFZ8qNuBXpbTEoh1_oeaw1ykrROKE80V9It7L/exec'
const form = document.forms['myForm'];
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', async e => {
    e.preventDefault(); // Prevent default submission

    // Validate form
    if (!validateForm()) return;

    // Show processing message
    formMessage.innerHTML = 'Processing...';
    formMessage.style.color = 'green';

    try {
        // Submit to Google Sheet
        const sheetResponse = await fetch(scriptURL, {
            method: 'POST',
            body: new FormData(form),
            mode: 'no-cors'
        });

        // Submit to PHP for email sending
        const emailResponse = await fetch('send_email.php', {
            method: 'POST',
            body: new FormData(form)
        });

        // Check email response
        const emailResult = await emailResponse.json();
        if (emailResult.status === 'success') {
            formMessage.innerHTML = 'Your message has been sent successfully!<br>Thank you, I will reach you soon!';
            formMessage.style.color = 'green';
            form.reset();
            setTimeout(() => {
                formMessage.innerHTML = '';
            }, 7000);
        } else {
            formMessage.innerHTML = 'Error sending email: ' + emailResult.message;
            formMessage.style.color = 'red';
        }
    } catch (error) {
        formMessage.innerHTML = 'Error: ' + error.message;
        formMessage.style.color = 'red';
        console.error('Error:', error);
    }
});


