window.onscroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
};

// 2. INTERACTIVE CTA FEEDBACK
// Replaces the basic alert with a timed button state change
document.querySelector('.cta-btn').onclick = function(e) {
    e.preventDefault();
    this.innerHTML = "Opening Mailbox...";
    this.style.background = "#333";
    
    setTimeout(() => {
        window.location.href = "mailto:hello@voidwriter.com";
        this.innerHTML = "Get Started";
        this.style.background = "#000";
    }, 800);
};




const greetingMsg = document.getElementById('greeting');
const hour = new Date().getHours();
let welcome;

if (hour < 12) welcome = "Good Morning. ";
else if (hour < 18) welcome = "Good Afternoon. ";
else welcome = "Good Evening. ";

// This adds the greeting to your existing text
greetingMsg.prepend(welcome);

