// ============================================================
// AURA WEBSITE
// SCRIPT.JS
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================================
    // ELEMENTS
    // ========================================================

    const landingPage = document.getElementById("landing-page");
    const dashboardPage = document.getElementById("dashboard-page");
    const adminPanel = document.getElementById("admin-panel");

    const loginButton = document.getElementById("login-button");
    const inviteButton = document.getElementById("invite-button");

    const navItems = document.querySelectorAll(".nav-item");
    const dashboardPanels =
        document.querySelectorAll(".dashboard-panel");

    const dashboardTitle =
        document.getElementById("dashboard-title");

    const adminButton =
        document.getElementById("administrator-button");

    const adminOverlay =
        document.getElementById("admin-overlay");

    const adminClose =
        document.getElementById("admin-close");

    const adminForm =
        document.getElementById("admin-auth-form");

    const adminCode =
        document.getElementById("admin-code");

    const adminError =
        document.getElementById("admin-error");

    const adminBack =
        document.getElementById("admin-back");

    const logoutButton =
        document.getElementById("logout-button");


    // ========================================================
    // CONFIG
    // ========================================================

    /*
     * Paste your Discord OAuth2 invite URL here.
     */

    const DISCORD_INVITE_URL =
        "https://discord.com/oauth2/authorize?client_id=1534160410654277693&permissions=330816&integration_type=0&scope=bot";


    /*
     * TEMPORARY ADMIN CODE
     *
     * This is only for the frontend showcase.
     * It is NOT secure authentication.
     */

    const ADMIN_CODE = "777";


    // ========================================================
    // DISCORD LOGIN
    // ========================================================

   if (loginButton) {

        loginButton.addEventListener("click", event => {

            event.preventDefault();

            // Start the real Discord OAuth2 flow.
            // The Flask backend handles the client secret.
            window.location.href = "/auth/discord";

        });

    }


    // ========================================================
    // SHOW DASHBOARD
    // ========================================================

    function showDashboard() {

        if (landingPage) {
            landingPage.classList.add("hidden");
        }

        if (adminPanel) {
            adminPanel.classList.add("hidden");
        }

        if (dashboardPage) {
            dashboardPage.classList.remove("hidden");
        }

    }


    // ========================================================
    // SHOW LANDING PAGE
    // ========================================================

    function showLanding() {

        if (dashboardPage) {
            dashboardPage.classList.add("hidden");
        }

        if (adminPanel) {
            adminPanel.classList.add("hidden");
        }

        if (landingPage) {
            landingPage.classList.remove("hidden");
        }

    }


    // ========================================================
    // SIDEBAR NAVIGATION
    // ========================================================

    navItems.forEach(item => {

        /*
         * Administrator is handled separately.
         */

        if (item.id === "administrator-button") {
            return;
        }


        item.addEventListener("click", () => {

            const panelName =
                item.dataset.panel;

            if (!panelName) {
                return;
            }


            // Remove active state
            navItems.forEach(nav => {

                nav.classList.remove("active");

            });


            // Activate clicked button
            item.classList.add("active");


            // Hide every panel
            dashboardPanels.forEach(panel => {

                panel.classList.remove("active-panel");

            });


            // Find requested panel
            const targetPanel =
                document.getElementById(
                    `panel-${panelName}`
                );


            if (targetPanel) {

                targetPanel.classList.add(
                    "active-panel"
                );

            }


            // Update header title
            if (dashboardTitle) {

                const title =
                    item.textContent.trim();

                dashboardTitle.textContent =
                    title;

            }

        });

    });


    // ========================================================
    // ADMIN AUTHENTICATION MODAL
    // ========================================================

    function openAdminModal() {

        if (!adminOverlay) {
            return;
        }


        adminOverlay.classList.remove("hidden");

        document.body.style.overflow =
            "hidden";


        if (adminCode) {

            adminCode.value = "";

            setTimeout(() => {

                adminCode.focus();

            }, 100);

        }


        if (adminError) {

            adminError.classList.add("hidden");

        }

    }


    function closeAdminModal() {

        if (!adminOverlay) {
            return;
        }


        adminOverlay.classList.add("hidden");

        document.body.style.overflow =
            "";

    }


    if (adminButton) {

        adminButton.addEventListener(
            "click",
            openAdminModal
        );

    }


    if (adminClose) {

        adminClose.addEventListener(
            "click",
            closeAdminModal
        );

    }


    // Click outside window
    if (adminOverlay) {

        adminOverlay.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    adminOverlay
                ) {

                    closeAdminModal();

                }

            }
        );

    }


    // Escape key
    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                adminOverlay &&
                !adminOverlay.classList.contains("hidden")
            ) {

                closeAdminModal();

            }

        }
    );


    // ========================================================
    // ADMIN CODE CHECK
    // ========================================================

    if (adminForm) {

        adminForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const enteredCode =
                    adminCode
                        ? adminCode.value.trim()
                        : "";


                if (
                    enteredCode ===
                    ADMIN_CODE
                ) {

                    // Correct
                    if (adminError) {

                        adminError.classList.add(
                            "hidden"
                        );

                    }


                    closeAdminModal();


                    // Hide dashboard
                    if (dashboardPage) {

                        dashboardPage.classList.add(
                            "hidden"
                        );

                    }


                    // Show admin panel
                    if (adminPanel) {

                        adminPanel.classList.remove(
                            "hidden"
                        );

                    }


                    console.log(
                        "😎 Administrator authentication successful."
                    );


                } else {

                    // Wrong code
                    if (adminError) {

                        adminError.textContent =
                            "❌ Invalid authentication code.";

                        adminError.classList.remove(
                            "hidden"
                        );

                    }


                    // Shake window
                    const authWindow =
                        document.querySelector(
                            ".admin-auth-window"
                        );


                    if (authWindow) {

                        authWindow.style.animation =
                            "none";

                        void authWindow.offsetWidth;

                        authWindow.style.animation =
                            "errorShake 0.3s ease";

                    }

                }

            }
        );

    }


    // ========================================================
    // ADMIN BACK BUTTON
    // ========================================================

    if (adminBack) {

        adminBack.addEventListener(
            "click",
            () => {

                if (adminPanel) {

                    adminPanel.classList.add(
                        "hidden"
                    );

                }


                if (dashboardPage) {

                    dashboardPage.classList.remove(
                        "hidden"
                    );

                }


                console.log(
                    "Returned to dashboard."
                );

            }
        );

    }


    // ========================================================
    // LOGOUT
    // ========================================================

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            async () => {

                try {

                    await fetch(
                        "/logout",
                        {
                            credentials: "include"
                        }
                    );

                } catch (error) {

                    console.error(
                        "Logout request failed:",
                        error
                    );

                }

                showLanding();

                console.log(
                    "Logged out."
                );

            }
        );

    }


    // ========================================================
    // INITIAL STATE / DISCORD SESSION
    // ========================================================

    if (adminPanel) {
        adminPanel.classList.add("hidden");
    }

    /*
     * Check the Flask Discord session.
     * After OAuth callback, Flask returns to "/" and this
     * automatically opens the dashboard for the logged-in user.
     */
    async function checkDiscordSession() {

        try {

            const response = await fetch(
                "/api/me",
                {
                    credentials: "include"
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Session check returned ${response.status}`
                );
            }

            const data = await response.json();

            if (data.logged_in) {

                showDashboard();

                console.log(
                    "Discord session detected. Dashboard opened."
                );

            } else {

                showLanding();

            }

        } catch (error) {

            console.error(
                "Discord session check failed:",
                error
            );

            showLanding();

        }

    }

    checkDiscordSession();


    // ========================================================
    // DEBUG
    // ========================================================

    console.log(
        "%cAURA WEBSITE",
        "font-size: 22px; font-weight: bold;"
    );

    console.log(
        "Frontend loaded successfully."
    );

    // ============================================================
// AURA LIVE DATA
// ============================================================

async function fetchAuraData() {
    try {

        const sessionResponse = await fetch(
            "/api/me",
            {
                credentials: "include"
            }
        );

        if (!sessionResponse.ok) {
            return;
        }

        const session = await sessionResponse.json();

        if (!session.logged_in) {
            return;
        }

        const response = await fetch(
            "/api/dashboard",
            {
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();

        // -------------------------------
        // PROFILE
        // -------------------------------

        if (data.user) {
            document.getElementById("sidebar-username").textContent =
                data.user.username ?? "Unknown";

            document.getElementById("header-username").textContent =
                data.user.username ?? "Unknown";

            document.getElementById("profile-username").textContent =
                data.user.username ?? "Unknown";

            document.getElementById("profile-id").textContent =
                `Discord ID: ${data.user.id ?? "—"}`;

            document.getElementById("stat-aura").textContent =
                Number(data.user.aura ?? 0).toLocaleString();

            document.getElementById("profile-aura").textContent =
                Number(data.user.aura ?? 0).toLocaleString();

            document.getElementById("stat-rank").textContent =
                data.user.rank ? `#${data.user.rank}` : "—";

            document.getElementById("profile-rank").textContent =
                data.user.rank ? `#${data.user.rank}` : "—";
        }


        // -------------------------------
        // STOCK
        // -------------------------------

        if (data.stock) {
            document.getElementById("stat-stock").textContent =
                Number(data.stock.price ?? 0).toFixed(2);

            document.getElementById("market-price").textContent =
                Number(data.stock.price ?? 0).toFixed(2);

            const change =
                Number(data.stock.change ?? 0);

            document.getElementById("market-change").textContent =
                `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`;
        }


        // -------------------------------
        // INVESTMENTS
        // -------------------------------

        if (data.investment) {
            document.getElementById("investment-shares").textContent =
                Number(data.investment.shares ?? 0).toLocaleString();

            document.getElementById("investment-buy-price").textContent =
                Number(data.investment.buy_price ?? 0).toFixed(2);

            document.getElementById("investment-value").textContent =
                Number(data.investment.value ?? 0).toLocaleString();

            document.getElementById("investment-profit").textContent =
                Number(data.investment.profit ?? 0).toLocaleString();

            document.getElementById("stat-investment").textContent =
                Number(data.investment.value ?? 0).toLocaleString();
        }


        // -------------------------------
        // LEADERBOARD
        // -------------------------------

        if (Array.isArray(data.leaderboard)) {

            const leaderboard =
                document.getElementById("leaderboard-list");

            leaderboard.innerHTML = "";

            data.leaderboard.forEach((user, index) => {

                const row =
                    document.createElement("div");

                row.className = "leaderboard-row";

                row.innerHTML = `
                    <span>#${index + 1}</span>
                    <span>${escapeHTML(user.username ?? "Unknown")}</span>
                    <strong>
                        ${Number(user.aura ?? 0).toLocaleString()} ✦
                    </strong>
                `;

                leaderboard.appendChild(row);
            });
        }


        // -------------------------------
        // HISTORY
        // -------------------------------

        if (Array.isArray(data.history)) {

            const history =
                document.getElementById("history-list");

            history.innerHTML = "";

            if (data.history.length === 0) {

                history.innerHTML = `
                    <div class="empty-state">
                        No activity yet.
                    </div>
                `;

            } else {

                data.history.forEach(entry => {

                    const item =
                        document.createElement("div");

                    item.className = "history-item";

                    item.innerHTML = `
                        <strong>
                            ${escapeHTML(entry.action ?? "Activity")}
                        </strong>

                        <span>
                            ${escapeHTML(entry.details ?? "")}
                        </span>
                    `;

                    history.appendChild(item);
                });
            }
        }

    } catch (error) {

        console.error(
            "Aura live-data update failed:",
            error
        );
    }
}


// ============================================================
// SAFE HTML TEXT
// ============================================================

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


// ============================================================
// AUTOMATIC UPDATES
// ============================================================

fetchAuraData();

setInterval(() => {
    fetchAuraData();
}, 5000);

});