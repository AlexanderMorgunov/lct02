import io from "socket.io-client";

export const socket = io(`https://${process.env.NEXT_PUBLIC_APP_BASE_URL}`, {
  path: "/ws/",
  transports: ["websocket", "polling"],
  query: {
    token: localStorage.getItem("accessToken") ?? "",
  },
});
