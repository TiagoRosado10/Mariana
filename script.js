/* =========================================
   ELEMENTOS
========================================= */

const pages = document.querySelectorAll(".page");
const nextButtons = document.querySelectorAll(".next-btn");
const finalButton = document.querySelector(".final-btn");
const noButtons = document.querySelectorAll(".no-btn");

let currentPage = 0;


/* =========================================
   MUDAR DE PÁGINA
========================================= */

function nextPage() {

    if (currentPage >= pages.length - 1) {
        return;
    }

    pages[currentPage].classList.remove("active");

    currentPage++;

    pages[currentPage].classList.add("active");
}


/* =========================================
   BOTÕES SIM
========================================= */

nextButtons.forEach(button => {

    button.addEventListener("click", () => {

        createHearts();

        setTimeout(() => {
            nextPage();
        }, 250);

    });

});


/* =========================================
   BOTÃO FINAL
========================================= */

if (finalButton) {

    finalButton.addEventListener("click", () => {

        createHearts();

        setTimeout(() => {
            nextPage();
        }, 250);

    });

}


/* =========================================
   BOTÃO "NÃO" A FUGIR
========================================= */

noButtons.forEach(button => {

    /*
        Desktop:
        O botão muda de posição quando
        o rato se aproxima.
    */

    button.addEventListener("mouseenter", () => {

        moveButton(button);

    });


    /*
        Telemóvel:
        Como não existe hover,
        fazemos o botão fugir quando
        a pessoa tenta tocar nele.
    */

    button.addEventListener("touchstart", (event) => {

        event.preventDefault();

        moveButton(button);

    });

});


/* =========================================
   MOVER BOTÃO
========================================= */

function moveButton(button) {

    const container = button.closest(".buttons");

    const containerRect = container.getBoundingClientRect();

    const buttonRect = button.getBoundingClientRect();

    /*
        Limites para o botão não desaparecer
        completamente do ecrã.
    */

    const maxX =
        containerRect.width - buttonRect.width;

    const maxY = 90;

    let newX =
        Math.random() * maxX - (buttonRect.left - containerRect.left);

    let newY =
        Math.random() * maxY - 20;

    /*
        Mantém o movimento dentro de uma
        zona razoável.
    */

    newX = Math.max(-80, Math.min(150, newX));
    newY = Math.max(-50, Math.min(70, newY));

    button.style.transform =
        `translate(${newX}px, ${newY}px) rotate(${randomRotation()}deg)`;
}


/* =========================================
   ROTAÇÃO ALEATÓRIA
========================================= */

function randomRotation() {

    return Math.floor(Math.random() * 20) - 10;

}


/* =========================================
   CORAÇÕES AO CLICAR
========================================= */

function createHearts() {

    const numberOfHearts = 12;

    for (let i = 0; i < numberOfHearts; i++) {

        const heart = document.createElement("div");

        heart.innerHTML = "♥";

        heart.style.position = "fixed";
        heart.style.left = "50%";
        heart.style.top = "50%";

        heart.style.zIndex = "9999";

        heart.style.pointerEvents = "none";

        heart.style.color = "#df667d";

        heart.style.fontSize =
            `${Math.random() * 18 + 12}px`;

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            Math.random() * 250 + 100;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;

        heart.animate(

            [
                {
                    transform:
                        "translate(-50%, -50%) scale(0)",
                    opacity: 0
                },

                {
                    transform:
                        "translate(-50%, -50%) scale(1)",
                    opacity: 1,
                    offset: 0.2
                },

                {
                    transform:
                        `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0.5)`,
                    opacity: 0
                }
            ],

            {
                duration: 900,
                easing: "cubic-bezier(.2,.8,.3,1)"
            }

        );

        document.body.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 1000);

    }

}