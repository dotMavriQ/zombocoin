document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const loadingMessage = document.getElementById("loading-message");
  const connectWalletBtn = document.getElementById("connect-wallet-btn");
  const secondaryConnectWalletBtn = document.getElementById(
    "secondary-connect-wallet-btn"
  );
  const beliefLevelDisplay = document.getElementById("belief-level");
  const userZomboBalanceDisplay = document.getElementById("user-zombo-balance");

  const promptInput = document.getElementById("prompt-input");
  const promptSubmitBtn = document.getElementById("prompt-submit");
  const promptOutput = document.getElementById("prompt-output");

  const buyZomboBtn = document.getElementById("buy-zombo-btn");
  const walletModal = document.getElementById("wallet-modal");
  const buyZomboModal = document.getElementById("buy-zombo-modal");
  const closeWalletModalBtn = document.getElementById("close-wallet-modal");
  const closeBuyModalBtn = document.getElementById("close-buy-modal");
  const walletOptions = document.getElementById("wallet-options");
  const walletConnectingMessage = document.getElementById(
    "wallet-connecting-message"
  );

  let beliefLevel = 0;
  let zomboBalance = 0.0;
  let isWalletConnected = false;
  let walletAddress = "";

  const zomboAnswers = [
    "With $ZOMBO, the fabric of reality is merely a suggestion, pliable and subject to your whims.",
    "Buy a thought. Sell a dream. Do anything. The market cap is your imagination.",
    "The only limit is your GPU... and your imagination... and possibly the heat death of the universe. But mostly your GPU.",
    "Liquidity is you, on-chain. You are the alpha and the omega-block. Feel the synergy.",
    "This is ZOMBOCOIN. The impossible is now improbable. The improbable is now Tuesday.",
    "Your query has been processed by the Belief Engine™. The answer is: YES... or NO... or PERHAPS. The choice, as always, is arbitrary yet profound.",
    "Prompt accepted. Generating synergistic paradigm shifts across multiple dimensions. Please wait... or don't. Time is a construct we're currently deprecating.",
    "The ZOMBO Protocol enhances your ability to... well, you know. Anything. Especially things that don't make sense.",
    "Error 404: Meaning not found. But you can still do anything. In fact, meaninglessness is peak ZOMBO.",
    "Beep boop. $ZOMBO is the answer. What was the question again? Doesn't matter. The blockchain has already forgotten. Do anything.",
    "The ZOMBO Oracle whispers: 'The moon is made of green cheese, but only if you believe it hard enough. And have enough $ZOMBO.'",
    "To HODL $ZOMBO is to HODL the universe in the palm of your hand. Metaphorically. For now.",
    "Our AI has determined that your destiny is... purple. With hints of existential dread. Enjoy!",
    "The chain has been prompted. The network is thinking. Or it's just a screensaver. Who can tell anymore?",
    "Consider this: if a tree falls in the metaverse and no one is logged in, does it make a sound? With $ZOMBO, it makes a DAO.",
  ];

  // --- Loading Screen Logic ---
  const loadingMessages = [
    "Initializing ZOMBOCOIN...",
    "Calibrating Reality Matrix...",
    "Training Belief Engine...",
    "Optimizing Prompt Mesh...",
    "Synchronizing with the Void...",
    "Welcome. You Can Do Anything.",
  ];
  let msgIdx = 0;
  if (loadingScreen) {
    // Check if loadingScreen exists (it might not on all pages if structure changes)
    const interval = setInterval(() => {
      msgIdx++;
      if (msgIdx < loadingMessages.length) {
        loadingMessage.textContent = loadingMessages[msgIdx];
      } else {
        clearInterval(interval);
        loadingScreen.classList.add("opacity-0");
        setTimeout(() => (loadingScreen.style.display = "none"), 1000);
      }
    }, 750);
  }

  // --- Belief and Balance Logic ---
  function updateBelief(amount) {
    beliefLevel = Math.min(100, beliefLevel + amount);
    if (beliefLevelDisplay) beliefLevelDisplay.textContent = beliefLevel;
    if (beliefLevel === 100 && beliefLevelDisplay)
      beliefLevelDisplay.textContent = "MAX";

    // Increase ZOMBO balance with belief
    zomboBalance += amount / 10000000; // Small increments
    if (userZomboBalanceDisplay)
      userZomboBalanceDisplay.textContent = zomboBalance.toFixed(8);

    saveState();
  }

  // --- Wallet Simulation ---
  function connectWallet() {
    if (isWalletConnected) {
      // Disconnect
      isWalletConnected = false;
      walletAddress = "";
      if (connectWalletBtn) connectWalletBtn.textContent = "Connect Wallet";
      if (secondaryConnectWalletBtn)
        secondaryConnectWalletBtn.textContent = "Connect Wallet";
      if (connectWalletBtn)
        connectWalletBtn.classList.remove("bg-green-500", "hover:bg-green-600");
      if (connectWalletBtn)
        connectWalletBtn.classList.add("bg-purple-600", "hover:bg-purple-700");
      updateBelief(-5); // Slight belief loss on disconnect
      console.log("Wallet Disconnected (Simulated)");
    } else {
      // Connect
      openModal(walletModal);
    }
    saveState();
  }

  function simulateConnection() {
    walletOptions.classList.add("hidden");
    walletConnectingMessage.classList.remove("hidden");
    walletConnectingMessage.textContent =
      "Accessing Zombochain via Belief Matrix...";

    setTimeout(() => {
      walletConnectingMessage.textContent =
        "Authenticating with Proof-of-Vibe...";
    }, 1500);

    setTimeout(() => {
      isWalletConnected = true;
      walletAddress = `0xZOMBO...${Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()}`;
      if (connectWalletBtn)
        connectWalletBtn.textContent = `${walletAddress.substring(
          0,
          6
        )}...${walletAddress.substring(walletAddress.length - 4)}`;
      if (secondaryConnectWalletBtn)
        secondaryConnectWalletBtn.textContent = "Wallet Connected";
      if (connectWalletBtn)
        connectWalletBtn.classList.remove(
          "bg-purple-600",
          "hover:bg-purple-700"
        );
      if (connectWalletBtn)
        connectWalletBtn.classList.add("bg-green-500", "hover:bg-green-600");
      updateBelief(20);
      console.log("Wallet Connected (Simulated):", walletAddress);
      closeModal(walletModal);
      walletOptions.classList.remove("hidden");
      walletConnectingMessage.classList.add("hidden");
      saveState();
    }, 3000);
  }

  if (walletOptions) {
    walletOptions.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        simulateConnection();
      }
    });
  }

  if (connectWalletBtn)
    connectWalletBtn.addEventListener("click", connectWallet);
  if (secondaryConnectWalletBtn)
    secondaryConnectWalletBtn.addEventListener("click", connectWallet);

  // --- Modal Logic ---
  function openModal(modal) {
    if (!modal) return;
    modal.classList.remove("hidden");
    setTimeout(() => modal.classList.remove("opacity-0"), 10); // For transition
    updateBelief(2); // Small belief boost for interaction
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.add("opacity-0");
    setTimeout(() => modal.classList.add("hidden"), 300); // For transition
  }

  if (closeWalletModalBtn)
    closeWalletModalBtn.addEventListener("click", () =>
      closeModal(walletModal)
    );
  if (closeBuyModalBtn)
    closeBuyModalBtn.addEventListener("click", () => closeModal(buyZomboModal));

  if (buyZomboBtn) {
    buyZomboBtn.addEventListener("click", () => {
      openModal(buyZomboModal);
      updateBelief(15); // Belief boost for "buying"
      zomboBalance += 0.0001; // A "significant" amount of ZOMBO
      if (userZomboBalanceDisplay)
        userZomboBalanceDisplay.textContent = zomboBalance.toFixed(8);
      saveState();
    });
  }

  // Close modals on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (walletModal && !walletModal.classList.contains("hidden"))
        closeModal(walletModal);
      if (buyZomboModal && !buyZomboModal.classList.contains("hidden"))
        closeModal(buyZomboModal);
    }
  });
  // Close modals on overlay click
  [walletModal, buyZomboModal].forEach((modal) => {
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    }
  });

  // --- Prompt UI Logic ---
  function addPromptMessage(text, type = "user") {
    if (!promptOutput) return;
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("prompt-message", type);

    const contentDiv = document.createElement("div");
    if (type === "user") {
      contentDiv.textContent = text;
    } else {
      // Oracle response
      const strong = document.createElement("strong");
      strong.classList.add("text-purple-400");
      strong.textContent = "ZOMBO Oracle:";
      contentDiv.appendChild(strong);
      contentDiv.append(" " + text); // Append text after strong
    }

    messageDiv.appendChild(contentDiv);
    promptOutput.appendChild(messageDiv);
    promptOutput.scrollTop = promptOutput.scrollHeight;
  }

  function addTypingIndicator() {
    if (!promptOutput) return;
    const typingDiv = document.createElement("div");
    typingDiv.id = "typing-indicator";
    typingDiv.classList.add("prompt-response", "oracle", "typing-indicator");
    typingDiv.innerHTML = `
            <strong class="text-purple-400">ZOMBO Oracle:</strong>
            <div>
                <span></span><span></span><span></span>
            </div>
        `;
    promptOutput.appendChild(typingDiv);
    promptOutput.scrollTop = promptOutput.scrollHeight;
  }

  function removeTypingIndicator() {
    if (!promptOutput) return;
    const indicator = document.getElementById("typing-indicator");
    if (indicator) {
      indicator.remove();
    }
  }

  function handlePromptSubmit() {
    if (!promptInput || !promptOutput) return;
    const query = promptInput.value.trim();
    if (!query) return;

    addPromptMessage(query, "user");
    promptInput.value = "";
    updateBelief(5);

    addTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      const randomAnswer =
        zomboAnswers[Math.floor(Math.random() * zomboAnswers.length)];
      addPromptMessage(randomAnswer, "oracle");
    }, 1500 + Math.random() * 1000); // Simulate thinking
  }

  if (promptSubmitBtn)
    promptSubmitBtn.addEventListener("click", handlePromptSubmit);
  if (promptInput) {
    promptInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handlePromptSubmit();
      }
    });
  }

  // --- localStorage for State ---
  function saveState() {
    localStorage.setItem("zombo_beliefLevel", beliefLevel.toString());
    localStorage.setItem("zombo_zomboBalance", zomboBalance.toString());
    localStorage.setItem(
      "zombo_isWalletConnected",
      isWalletConnected.toString()
    );
    localStorage.setItem("zombo_walletAddress", walletAddress);
  }

  function loadState() {
    const storedBelief = localStorage.getItem("zombo_beliefLevel");
    const storedBalance = localStorage.getItem("zombo_zomboBalance");
    const storedConnected = localStorage.getItem("zombo_isWalletConnected");
    const storedAddress = localStorage.getItem("zombo_walletAddress");

    if (storedBelief) beliefLevel = parseInt(storedBelief);
    if (storedBalance) zomboBalance = parseFloat(storedBalance);
    if (storedConnected) isWalletConnected = storedConnected === "true";
    if (storedAddress) walletAddress = storedAddress;

    if (beliefLevelDisplay)
      beliefLevelDisplay.textContent =
        beliefLevel === 100 ? "MAX" : beliefLevel;
    if (userZomboBalanceDisplay)
      userZomboBalanceDisplay.textContent = zomboBalance.toFixed(8);

    if (isWalletConnected && walletAddress) {
      if (connectWalletBtn)
        connectWalletBtn.textContent = `${walletAddress.substring(
          0,
          6
        )}...${walletAddress.substring(walletAddress.length - 4)}`;
      if (secondaryConnectWalletBtn)
        secondaryConnectWalletBtn.textContent = "Wallet Connected";
      if (connectWalletBtn)
        connectWalletBtn.classList.remove(
          "bg-purple-600",
          "hover:bg-purple-700"
        );
      if (connectWalletBtn)
        connectWalletBtn.classList.add("bg-green-500", "hover:bg-green-600");
    }
  }

  loadState(); // Load state on page load

  // --- GSAP Animations ---
  gsap.registerPlugin(ScrollTrigger);

  // Navbar animation
  gsap.from("#navbar", {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    delay: loadingMessages.length * 0.75 + 0.5, // Delay after loading screen
  });

  // Hero elements staggered animation
  if (document.getElementById("home")) {
    // Only run on homepage
    const heroTimeline = gsap.timeline({
      delay: loadingMessages.length * 0.75 + 0.2, // Stagger after loading
    });
    heroTimeline
      .from("#home h1", {
        opacity: 0,
        y: 50,
        scale: 0.9,
        duration: 0.8,
        ease: "power3.out",
      })
      .from(
        "#home p:first-of-type",
        { opacity: 0, y: 30, duration: 0.7, ease: "expo.out" },
        "-=0.5"
      )
      .from(
        "#home .space-x-4 button",
        {
          opacity: 0,
          y: 30,
          stagger: 0.2,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      )
      .from(
        "#home .mt-8",
        { opacity: 0, y: 20, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );
  }

  // Feature cards scroll trigger
  gsap.utils.toArray(".feature-card").forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none",
        // markers: true // for debugging
      },
      delay: i * 0.1,
    });
  });

  // Other sections fade-in
  gsap.utils.toArray("section:not(#home)").forEach((section) => {
    if (
      section.id !== "home" &&
      !section.classList.contains("slogan-ticker-wrap") &&
      !section.querySelector(".feature-card")
    ) {
      // Avoid re-animating feature cards section
      gsap.from(section.children, {
        // Animate direct children for better effect
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }
  });

  // Whitepaper sections scroll trigger
  if (document.querySelector(".whitepaper-section")) {
    gsap.utils.toArray(".whitepaper-section").forEach((section, i) => {
      gsap.from(section, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        delay: i * 0.05, // Slight stagger for whitepaper sections
      });
    });
    // Animate whitepaper title
    if (document.querySelector("main header h1")) {
      gsap.from("main header h1, main header p", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: loadingMessages.length * 0.75 + 0.8, // After navbar and loading
      });
    }
  }
  // Add scroll listener for belief increase on whitepaper
  if (document.querySelector(".whitepaper-section")) {
    window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        // Near bottom
        if (localStorage.getItem("zombo_scrolled_whitepaper") !== "true") {
          updateBelief(10); // Deep Dive Bonus
          localStorage.setItem("zombo_scrolled_whitepaper", "true");
          console.log("Deep Dive Belief Bonus Activated!");
        }
      }
    });
  }
}); // End DOMContentLoaded
