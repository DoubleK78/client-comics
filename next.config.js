/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./lib/i18n/index.ts');
const nextConfig = {
    env: {
        identityServer: process.env.IDENTITY_API_URL,
        portalServer: process.env.PORTAL_API_URL,
        clientServer: process.env.NEXT_BASE_URL,
        googleAnalytics: process.env.GOOGLE_ANALYTICS,
        prePortalServer: process.env.PORTAL_PRE_API_URL,
        maintenanceMode: process.env.MAINTENANCE_MODE,
        maintenanceEstimateCompleted: process.env.MAINTENANCE_ESTIMATE_COMPLETED,
        storageS1: process.env.STORAGE_S1
    }
}

const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    fallbacks: {
        document: "/~offline"
    }
});

module.exports = withPWA(withNextIntl(nextConfig));
