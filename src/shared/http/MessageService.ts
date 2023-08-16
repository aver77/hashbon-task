import axios from "axios";
import { API_BASE } from "./api";

class MessageService {
    async sendMessage(message: string) {
        const { data } = await axios.post<string>(`${API_BASE}/send-message`, { message });
        return data;
    }
}
export default new MessageService();
