document.addEventListener("DOMContentLoaded", () => {
const mainText = document.querySelector(".main-text");
const textBox = document.querySelector(".text-box");
const loopCheck = document.querySelector("#isLooping");
const layers = {
        topText1: document.querySelector(".top-1"),
        topText2: document.querySelector(".top-2"),
        topText3: document.querySelector(".top-3"),
        bottomText1: document.querySelector(".bottom-1"),
        bottomText2: document.querySelector(".bottom-2"),
        bottomText3: document.querySelector(".bottom-3"),
      };
  
    const animateLoop = (pause = false) => {
            const animations = [
      gsap.to(mainText, {duration:1, scale: 1, repeat: -1, yoyo: true, ease: "power1.inOut", repeatDelay: 2 }),
      gsap.to(layers.topText1, { duration: 2, opacity: 1, y: -20, repeat: -1, yoyo: true, repeatDelay: 1 }),
      gsap.to(layers.topText2, { duration: 2, opacity: 1, y: -40, repeat: -1, yoyo: true, repeatDelay: 1  }),
      gsap.to(layers.topText3, { duration: 2, opacity: 1, y: -60, repeat: -1, yoyo: true, repeatDelay: 1  }),
      gsap.to(layers.bottomText1, { duration: 2, opacity: 1, y: 20, repeat: -1, yoyo: true, repeatDelay: 1  }),
      gsap.to(layers.bottomText2, { duration: 2, opacity: 1, y: 40, repeat: -1, yoyo: true, repeatDelay: 1  }),
      gsap.to(layers.bottomText3, { duration: 2, opacity: 1, y: 60, repeat: -1, yoyo: true, repeatDelay: 1  }),
        ]

        }

        animateLoop()
    });