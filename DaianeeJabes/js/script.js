    document.addEventListener("DOMContentLoaded", function() {
        // Menu Toggle
        const menuButton = document.getElementById("menuButton");
        const menuOptions = document.getElementById("menuOptions");
        const menuOptionButtons = document.querySelectorAll(".menu-option");
        const contentSections = document.querySelectorAll(".content");

        menuButton.addEventListener("click", function() {
            menuOptions.style.display = (menuOptions.style.display === "flex") ? "none" : "flex";
        });

        menuOptionButtons.forEach(button => {
            button.addEventListener("click", () => {
                const target = button.getAttribute("data-target");
                contentSections.forEach(section => {
                    section.style.display = (section.id === target) ? "block" : "none";
                });
            });
        });

        document.getElementById("home").style.display = "block";

        // Countdown Timer
        const countdown = document.getElementById("countdown");
        const targetDate = new Date("2025-04-19T00:00:00").getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                countdown.innerHTML = "Expired";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdown.innerHTML = `
                <div class="countdown-item">${days} <span>Days</span></div>
                <div class="countdown-item">${hours} <span>Hours</span></div>
                <div class="countdown-item">${minutes} <span>Minutes</span></div>
                <div class="countdown-item">${seconds} <span>Seconds</span></div>
            `;
        }

        setInterval(updateCountdown, 1000);

        // Tabs for "Presentes"
        const padrinhosBtn = document.getElementById("padrinhosBtn");
        const convidadosBtn = document.getElementById("convidadosBtn");
        const padrinhosList = document.getElementById("padrinhosList");
        const convidadosList = document.getElementById("convidados");
        const passwordPrompt = document.getElementById("passwordPrompt");

        padrinhosBtn.addEventListener("click", () => {
            passwordPrompt.style.display = "block";
            padrinhosList.style.display = "none";
            convidadosList.style.display = "none";
        });

        convidadosBtn.addEventListener("click", () => {
            padrinhosList.style.display = "none";
            convidadosList.style.display = "block";
            passwordPrompt.style.display = "none";
        });

        document.getElementById("checkPasswordBtn").addEventListener("click", () => {
            const passwordInput = document.getElementById("padrinhosPassword").value;
            if (passwordInput === "kalebe01") {
                passwordPrompt.style.display = "none";
                padrinhosList.style.display = "block";
            } else {
                alert("Senha incorreta!");
            }
        });

        // Presence Form
        const form = document.getElementById("presence-form");
        const numAcompanhantesInput = document.getElementById("acompanhantes");
        const acompanhantesList = document.getElementById("acompanhantes-list");
        const acompanhantesContainer = document.getElementById("acompanhantes-container");

        numAcompanhantesInput.addEventListener("input", () => {
            const numAcompanhantes = parseInt(numAcompanhantesInput.value, 10);
            acompanhantesContainer.innerHTML = '';

            if (numAcompanhantes > 0) {
                acompanhantesList.classList.remove("d-none");

                for (let i = 1; i <= numAcompanhantes; i++) {
                    const div = document.createElement("div");
                    div.classList.add("acompanhante-item");
                    div.innerHTML = `
                        <label for="acompanhante-${i}">Nome do Acompanhante ${i}:</label>
                        <input type="text" id="acompanhante-${i}" name="acompanhante-${i}" class="form-control" placeholder="Nome do Acompanhante ${i}" required>
                        <label for="acompanhante-${i}-criança">É uma criança?</label>
                        <input type="checkbox" id="acompanhante-${i}-criança" name="acompanhante-${i}-criança">
                    `;
                    acompanhantesContainer.appendChild(div);
                }
            } else {
                acompanhantesList.classList.add("d-none");
            }
        });

        form.addEventListener("submit", event => {
            event.preventDefault();
            alert("Formulário enviado com sucesso!");
        });
    });

    function copiarValor() {
        var copyText = document.getElementById("valorCopiar");
        copyText.select();
        copyText.setSelectionRange(0, 99999); // Para dispositivos móveis
        document.execCommand("copy");
        alert("Valor copiado: " + copyText.value);
    }

    // Exibe a modal ao clicar em um item
    document.querySelectorAll('.item-presente').forEach(item => {
        item.addEventListener('click', function() {
            const itemNome = this.getAttribute('data-item');
            document.getElementById('mensagemPresente').textContent = ` ${itemNome}?`;
            $('#modalPresente').modal('show');
        });
    });

    // Envia a mensagem via WhatsApp
    function enviarWhatsApp() {
        const nomePadrinho = document.getElementById('nomePadrinho').value;
        const nomeMadrinha = document.getElementById('nomeMadrinha').value;
        const presente = document.getElementById('mensagemPresente').textContent;

        const mensagem = `Olá, gostaria de presentear os noivos com ${presente}.\n\nPadrinho: ${nomePadrinho}\nMadrinha: ${nomeMadrinha}`;
        const numeroWhatsApp = '43 999588399';
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp.replace(/\s+/g, '')}?text=${encodeURIComponent(mensagem)}`;

        window.open(urlWhatsApp, '_blank');
    }