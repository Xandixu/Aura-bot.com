// ============================================================
// AURA WEBSITE
// SCRIPT.JS
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================================
    // ELEMENTS
    // ========================================================

    const landingPage =
        document.getElementById("landing-page");

    const dashboardPage =
        document.getElementById("dashboard-page");

    const adminPanel =
        document.getElementById("admin-panel");

    const loginButton =
        document.getElementById("login-button");

    const inviteButton =
        document.getElementById("invite-button");

    const navItems =
        document.querySelectorAll(".nav-item");

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
     * Wispbyte Flask backend.
     *
     * Your website is running through Live Server,
     * while bot.py + Flask are running on Wispbyte.
     */

    const API_BASE_URL =
        "https://aurafarmer.wisp.uno";


    /*
     * Aura bot invite.
     */

    const DISCORD_INVITE_URL =
        "https://discord.com/oauth2/authorize?client_id=1534160410654277693&permissions=330816&integration_type=0&scope=bot";


    /*
     * TEMPORARY FRONTEND ADMIN CODE.
     *
     * This is NOT secure authentication.
     * Keep this only if you still want the current
     * frontend administrator panel.
     */

    const ADMIN_CODE = "777";


    // ========================================================
    // DISCORD LOGIN
    // ========================================================

    if (loginButton) {

        loginButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                /*
                 * Send the user to the Flask OAuth endpoint
                 * running on Wispbyte.
                 */

                window.location.href =
                    `${API_BASE_URL}/auth/discord`;

            }
        );

    }


    // ========================================================
    // SHOW DASHBOARD
    // ========================================================

    function showDashboard() {

        if (landingPage) {

            landingPage.classList.add(
                "hidden"
            );

        }

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

    }


    // ========================================================
    // SHOW LANDING PAGE
    // ========================================================

    function showLanding() {

        if (dashboardPage) {

            dashboardPage.classList.add(
                "hidden"
            );

        }

        if (adminPanel) {

            adminPanel.classList.add(
                "hidden"
            );

        }

        if (landingPage) {

            landingPage.classList.remove(
                "hidden"
            );

        }

    }


    // ========================================================
    // INVITE BUTTON
    // ========================================================

    if (inviteButton) {

        inviteButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                window.open(
                    DISCORD_INVITE_URL,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

    }


    // ========================================================
    // SIDEBAR NAVIGATION
    // ========================================================

    navItems.forEach(item => {

        /*
         * Administrator button is handled separately.
         */

        if (
            item.id ===
            "administrator-button"
        ) {

            return;

        }


        item.addEventListener(
            "click",
            () => {

                const panelName =
                    item.dataset.panel;


                if (!panelName) {

                    return;

                }


                // Remove active state
                navItems.forEach(nav => {

                    nav.classList.remove(
                        "active"
                    );

                });


                // Activate clicked item
                item.classList.add(
                    "active"
                );


                // Hide all dashboard panels
                dashboardPanels.forEach(panel => {

                    panel.classList.remove(
                        "active-panel"
                    );

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


                // Update dashboard title
                if (dashboardTitle) {

                    const title =
                        item.textContent.trim();

                    dashboardTitle.textContent =
                        title;

                }

            }
        );

    });


    // ========================================================
    // ADMIN AUTHENTICATION MODAL
    // ========================================================

    function openAdminModal() {

        if (!adminOverlay) {

            return;

        }


        adminOverlay.classList.remove(
            "hidden"
        );


        document.body.style.overflow =
            "hidden";


        if (adminCode) {

            adminCode.value = "";


            setTimeout(
                () => {

                    adminCode.focus();

                },
                100
            );

        }


        if (adminError) {

            adminError.classList.add(
                "hidden"
            );

        }

    }


    function closeAdminModal() {

        if (!adminOverlay) {

            return;

        }


        adminOverlay.classList.add(
            "hidden"
        );


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


    // ========================================================
    // CLICK OUTSIDE ADMIN MODAL
    // ========================================================

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


    // ========================================================
    // ESCAPE KEY
    // ========================================================

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                adminOverlay &&
                !adminOverlay.classList.contains(
                    "hidden"
                )
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

                    if (adminError) {

                        adminError.classList.add(
                            "hidden"
                        );

                    }


                    closeAdminModal();


                    if (dashboardPage) {

                        dashboardPage.classList.add(
                            "hidden"
                        );

                    }


                    if (adminPanel) {

                        adminPanel.classList.remove(
                            "hidden"
                        );

                    }


                    console.log(
                        "Administrator authentication successful."
                    );


                } else {

                    if (adminError) {

                        adminError.textContent =
                            "❌ Invalid authentication code.";

                        adminError.classList.remove(
                            "hidden"
                        );

                    }


                    // Shake authentication window
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
                        `${API_BASE_URL}/logout`,
                        {
                            method: "GET",
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
    // CHECK DISCORD SESSION
    // ========================================================

    async function checkDiscordSession() {

        try {

            const response =
                await fetch(
                    `${API_BASE_URL}/api/me`,
                    {
                        credentials: "include"
                    }
                );


            if (!response.ok) {

                throw new Error(
                    `Session check returned ${response.status}`
                );

            }


            const data =
                await response.json();


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


    console.log(
        "Backend:",
        API_BASE_URL
    );


    // ========================================================
    // LIVE AURA DATA
    // ========================================================

    async function fetchAuraData() {

        try {

            // -----------------------------------------------
            // Check login session
            // -----------------------------------------------

            const sessionResponse =
                await fetch(
                    `${API_BASE_URL}/api/me`,
                    {
                        credentials: "include"
                    }
                );


            if (!sessionResponse.ok) {

                return;

            }


            const session =
                await sessionResponse.json();


            if (!session.logged_in) {

                return;

            }


            // -----------------------------------------------
            // Get dashboard data
            // -----------------------------------------------

            const response =
                await fetch(
                    `${API_BASE_URL}/api/dashboard`,
                    {
                        credentials: "include"
                    }
                );


            if (!response.ok) {

                throw new Error(
                    `API returned ${response.status}`
                );

            }


            const data =
                await response.json();


            // =================================================
            // USER DATA
            // =================================================

            if (data.user) {

                const username =
                    data.user.username ??
                    "Unknown";


                const userId =
                    data.user.id ??
                    "—";


                const aura =
                    Number(
                        data.user.aura ?? 0
                    ).toLocaleString();


                const rank =
                    data.user.rank
                        ? `#${data.user.rank}`
                        : "—";


                const sidebarUsername =
                    document.getElementById(
                        "sidebar-username"
                    );


                const headerUsername =
                    document.getElementById(
                        "header-username"
                    );


                const profileUsername =
                    document.getElementById(
                        "profile-username"
                    );


                const profileId =
                    document.getElementById(
                        "profile-id"
                    );


                const statAura =
                    document.getElementById(
                        "stat-aura"
                    );


                const profileAura =
                    document.getElementById(
                        "profile-aura"
                    );


                const statRank =
                    document.getElementById(
                        "stat-rank"
                    );


                const profileRank =
                    document.getElementById(
                        "profile-rank"
                    );


                if (sidebarUsername) {

                    sidebarUsername.textContent =
                        username;

                }


                if (headerUsername) {

                    headerUsername.textContent =
                        username;

                }


                if (profileUsername) {

                    profileUsername.textContent =
                        username;

                }


                if (profileId) {

                    profileId.textContent =
                        `Discord ID: ${userId}`;

                }


                if (statAura) {

                    statAura.textContent =
                        aura;

                }


                if (profileAura) {

                    profileAura.textContent =
                        aura;

                }


                if (statRank) {

                    statRank.textContent =
                        rank;

                }


                if (profileRank) {

                    profileRank.textContent =
                        rank;

                }

            }


            // =================================================
            // STOCK DATA
            // =================================================

            if (data.stock) {

                const price =
                    Number(
                        data.stock.price ?? 0
                    ).toFixed(2);


                const change =
                    Number(
                        data.stock.change ?? 0
                    );


                const statStock =
                    document.getElementById(
                        "stat-stock"
                    );


                const marketPrice =
                    document.getElementById(
                        "market-price"
                    );


                const marketChange =
                    document.getElementById(
                        "market-change"
                    );


                if (statStock) {

                    statStock.textContent =
                        price;

                }


                if (marketPrice) {

                    marketPrice.textContent =
                        price;

                }


                if (marketChange) {

                    marketChange.textContent =
                        `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`;

                }

            }


            // =================================================
            // INVESTMENT DATA
            // =================================================

            if (data.investment) {

                const investmentShares =
                    document.getElementById(
                        "investment-shares"
                    );


                const investmentBuyPrice =
                    document.getElementById(
                        "investment-buy-price"
                    );


                const investmentValue =
                    document.getElementById(
                        "investment-value"
                    );


                const investmentProfit =
                    document.getElementById(
                        "investment-profit"
                    );


                const statInvestment =
                    document.getElementById(
                        "stat-investment"
                    );


                if (investmentShares) {

                    investmentShares.textContent =
                        Number(
                            data.investment.shares ?? 0
                        ).toLocaleString();

                }


                if (investmentBuyPrice) {

                    investmentBuyPrice.textContent =
                        Number(
                            data.investment.buy_price ?? 0
                        ).toFixed(2);

                }


                if (investmentValue) {

                    investmentValue.textContent =
                        Number(
                            data.investment.value ?? 0
                        ).toLocaleString();

                }


                if (investmentProfit) {

                    investmentProfit.textContent =
                        Number(
                            data.investment.profit ?? 0
                        ).toLocaleString();

                }


                if (statInvestment) {

                    statInvestment.textContent =
                        Number(
                            data.investment.value ?? 0
                        ).toLocaleString();

                }

            }


            // =================================================
            // LEADERBOARD
            // =================================================

            if (
                Array.isArray(
                    data.leaderboard
                )
            ) {

                const leaderboard =
                    document.getElementById(
                        "leaderboard-list"
                    );


                if (leaderboard) {

                    leaderboard.innerHTML =
                        "";


                    data.leaderboard.forEach(
                        (user, index) => {

                            const row =
                                document.createElement(
                                    "div"
                                );


                            row.className =
                                "leaderboard-row";


                            row.innerHTML = `
                                <span>
                                    #${index + 1}
                                </span>

                                <span>
                                    ${escapeHTML(
                                        user.username ??
                                        "Unknown"
                                    )}
                                </span>

                                <strong>
                                    ${Number(
                                        user.aura ?? 0
                                    ).toLocaleString()} ✦
                                </strong>
                            `;


                            leaderboard.appendChild(
                                row
                            );

                        }
                    );

                }

            }


            // =================================================
            // HISTORY
            // =================================================

            if (
                Array.isArray(
                    data.history
                )
            ) {

                const history =
                    document.getElementById(
                        "history-list"
                    );


                if (history) {

                    history.innerHTML =
                        "";


                    if (
                        data.history.length ===
                        0
                    ) {

                        history.innerHTML = `
                            <div class="empty-state">
                                No activity yet.
                            </div>
                        `;

                    } else {

                        data.history.forEach(
                            entry => {

                                const item =
                                    document.createElement(
                                        "div"
                                    );


                                item.className =
                                    "history-item";


                                item.innerHTML = `
                                    <strong>
                                        ${escapeHTML(
                                            entry.action ??
                                            "Activity"
                                        )}
                                    </strong>

                                    <span>
                                        ${escapeHTML(
                                            entry.details ??
                                            ""
                                        )}
                                    </span>
                                `;


                                history.appendChild(
                                    item
                                );

                            }
                        );

                    }

                }

            }

        } catch (error) {

            console.error(
                "Aura live-data update failed:",
                error
            );

        }

    }


    // ========================================================
    // SAFE HTML
    // ========================================================

    function escapeHTML(value) {

        return String(value)
            .replaceAll(
                "&",
                "&amp;"
            )
            .replaceAll(
                "<",
                "&lt;"
            )
            .replaceAll(
                ">",
                "&gt;"
            )
            .replaceAll(
                '"',
                "&quot;"
            )
            .replaceAll(
                "'",
                "&#039;"
            );

    }


    // ========================================================
    // INITIAL DATA LOAD
    // ========================================================

    fetchAuraData();


    // ========================================================
    // AUTOMATIC DATA UPDATE
    // ========================================================

    setInterval(
        () => {

            fetchAuraData();

        },
        5000
    );

});