import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Le site et l'admin Payload ont chacun leur layout racine (voir app/global-not-found.tsx).
    globalNotFound: true,
  },
  async headers() {
    return [
      {
        // iOS Quick Look opens AR models only when served with the USDZ media type.
        source: "/novadis/models/:file*.usdz",
        headers: [{ key: "Content-Type", value: "model/vnd.usdz+zip" }],
      },
    ];
  },
};

export default withPayload(nextConfig);
