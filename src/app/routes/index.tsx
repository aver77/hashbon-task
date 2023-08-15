import { Navigate, Route, Routes } from "react-router-dom";
import ChatPage from "pages/chatPage";

const RoutesComponent = () => {
    return (
        <Routes>
            <Route key={"chat-page"} path={"/"} element={<ChatPage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};
export default RoutesComponent;
