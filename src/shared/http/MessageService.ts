import { API_BASE } from "./api";

class MessageService {
    async sendMessage(message: string) {
        const data = await fetch(`${API_BASE}/send-message`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        if (!data.ok) {
            return null;
        }

        return data;
    }
}
export default new MessageService();
