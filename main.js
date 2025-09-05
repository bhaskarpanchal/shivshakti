// ===================== Swiper JS =====================
const initSwipers = () => {
  // Main Swiper
  new Swiper(".mySwiper", {
    slidesPerView: 3.5,
    spaceBetween: 20,
    loop: true,
    speed: 800,
    autoplay: {
      delay: 2300,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: ".swiper-button-next1",
      prevEl: ".swiper-button-prev1",
    },
  });

  // Feedback Swiper
  new Swiper(".mySwiperFeedback", {
    slidesPerView: 2,
    spaceBetween: 30,
    loop: true,
    speed: 800,
    navigation: {
      nextEl: ".swiper-button-next2",
      prevEl: ".swiper-button-prev2",
    },
  });

  // Our Client Swiper
  new Swiper(".mySwiperOurClient", {
    slidesPerView: 5,
    spaceBetween: 10,
    loop: true,
    speed: 2000,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
  });
};

// ===================== Contact Form JS =====================
class ContactForm {
  constructor() {
    this.form = document.getElementById("contactForm");
    this.submitBtn = document.getElementById("submitBtn");
    this.successMessage = document.getElementById("successMessage");
    this.init();
  }

  init() {
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
    this.form.querySelectorAll("input, textarea").forEach((field) => {
      field.addEventListener("blur", () => this.validateField(field));
      field.addEventListener("input", () => this.clearError(field));
    });
  }

  validateField(field) {
    const formGroup = field.closest(".form_group");
    const errorElement = formGroup.querySelector(".error");
    let isValid = true;
    let errorMessage = "";

    formGroup.classList.remove("error", "success");

    switch (field.name) {
      case "name":
        if (!field.value.trim())
          (errorMessage = "Full name is required"), (isValid = false);
        else if (field.value.trim().length < 2)
          (errorMessage = "Name must be at least 2 characters"),
            (isValid = false);
        else if (!/^[a-zA-Z\s'-]+$/.test(field.value.trim()))
          (errorMessage =
            "Name can only contain letters, spaces, hyphens, and apostrophes"),
            (isValid = false);
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!field.value.trim())
          (errorMessage = "Email is required"), (isValid = false);
        else if (!emailRegex.test(field.value.trim()))
          (errorMessage = "Please enter a valid email address"),
            (isValid = false);
        break;

      case "number":
        const phoneRegex = /^[\+]?[\d\s\-\(\)\.]{10,}$/;
        if (!field.value.trim())
          (errorMessage = "Phone number is required"), (isValid = false);
        else if (!phoneRegex.test(field.value.trim()))
          (errorMessage =
            "Please enter a valid phone number (at least 10 digits)"),
            (isValid = false);
        break;

      case "subject":
        if (!field.value.trim())
          (errorMessage = "Subject is required"), (isValid = false);
        else if (field.value.trim().length < 5)
          (errorMessage = "Subject must be at least 5 characters"),
            (isValid = false);
        else if (field.value.trim().length > 100)
          (errorMessage = "Subject must be less than 100 characters"),
            (isValid = false);
        break;

      case "message":
        if (!field.value.trim())
          (errorMessage = "Message is required"), (isValid = false);
        else if (field.value.trim().length < 10)
          (errorMessage = "Message must be at least 10 characters"),
            (isValid = false);
        else if (field.value.trim().length > 1000)
          (errorMessage = "Message must be less than 1000 characters"),
            (isValid = false);
        break;
    }

    if (!isValid) {
      formGroup.classList.add("error");
      errorElement.textContent = errorMessage;
    } else {
      formGroup.classList.add("success");
      errorElement.textContent = "";
    }

    return isValid;
  }

  clearError(field) {
    const formGroup = field.closest(".form_group");
    formGroup.classList.remove("error");
  }

  validateForm() {
    let isValid = true;
    this.form.querySelectorAll("input, textarea").forEach((field) => {
      if (!this.validateField(field)) isValid = false;
    });
    return isValid;
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (!this.validateForm()) {
      const firstError = this.form.querySelector(
        ".form_group.error input, .form_group.error textarea"
      );
      if (firstError) firstError.focus();
      return;
    }
    this.setLoadingState(true);
    try {
      await this.simulateFormSubmission();
      this.showSuccessMessage();
      this.resetForm();
    } catch {
      this.showErrorMessage("Something went wrong. Please try again.");
    } finally {
      this.setLoadingState(false);
    }
  }

  setLoadingState(isLoading) {
    if (isLoading) {
      this.submitBtn.innerHTML = `
        <div class="btn-loading-content">
          <span class="loading"></span>
          <span class="sending-text">Sending</span>
        </div>`;
      this.submitBtn.classList.add("loading-state");
      this.submitBtn.disabled = true;
    } else {
      this.submitBtn.innerHTML = "Send Message";
      this.submitBtn.classList.remove("loading-state");
      this.submitBtn.disabled = false;
    }
  }

  async simulateFormSubmission() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Form data:", new FormData(this.form));
  }

  showSuccessMessage() {
    this.successMessage.classList.add("show");
    setTimeout(() => this.successMessage.classList.remove("show"), 5000);
  }

  showErrorMessage(message) {
    alert(message);
  }

  resetForm() {
    this.form.reset();
    this.form.querySelectorAll(".form_group").forEach((group) => {
      group.classList.remove("error", "success");
      group.querySelector(".error").textContent = "";
    });
  }
}

// ===================== Counter JS =====================
const initCounters = () => {
  const counters = document.querySelectorAll(".counter");
  const section = document.querySelector(".counter_section");
  let started = false;

  const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    let current = 0;
    const duration = 2000;
    const stepTime = 20;
    const increment = target / (duration / stepTime);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.innerText = target;
        clearInterval(timer);
      } else {
        counter.innerText = Math.floor(current);
      }
    }, stepTime);
  };

  if (section) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          counters.forEach((c) => animateCounter(c));
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
  }
};

// ===================== Header Scroll Effect =====================
const initHeaderScroll = () => {
  const header = document.getElementById("mainHeader");
  const triggerHeight = 200;
  let scrollTimeout;
  let allowHeaderScroll = true;

  window.handleScroll = () => {
    if (!allowHeaderScroll) return;

    if (window.scrollY > triggerHeight) {
      header.classList.add("fixed");
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => header.classList.add("show"), 500);
    } else {
      header.classList.remove("show");
      header.classList.remove("fixed");
      clearTimeout(scrollTimeout);
    }
  };

  window.addEventListener("scroll", window.handleScroll);

  return () => allowHeaderScroll; // to control from sidebar
};

// ===================== Sidebar Menu =====================
const initSidebar = () => {
  const menuToggle = document.getElementById("menuToggle");
  const sidebarMenu = document.getElementById("sidebarMenu");
  const closeMenu = document.getElementById("closeMenu");
  const overlay = document.getElementById("overlay");
  const navLinks = document.querySelectorAll(".sidebar-nav a");

  let scrollPosition = 0;
  let allowHeaderScroll = true;

  const openSidebar = () => {
    scrollPosition = window.scrollY;
    allowHeaderScroll = false;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";

    sidebarMenu.classList.add("show");
    overlay.classList.add("show");
    document.body.classList.add("menu-open");
  };

  const closeSidebar = () => {
    sidebarMenu.classList.remove("show");
    overlay.classList.remove("show");
    document.body.classList.remove("menu-open");

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.overflow = "";

    window.scrollTo(0, scrollPosition);

    setTimeout(() => (allowHeaderScroll = true), 300);
  };

  menuToggle.addEventListener("click", openSidebar);
  closeMenu.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);
  navLinks.forEach((link) => link.addEventListener("click", closeSidebar));
};

// ===================== Initialize All =====================
document.addEventListener("DOMContentLoaded", () => {
  initSwipers();
  if (document.getElementById("contactForm")) {
    new ContactForm();
  }
  initCounters();
  initHeaderScroll();
  initSidebar();
});
