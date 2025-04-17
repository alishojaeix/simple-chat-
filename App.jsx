import React, { useState } from 'react';
import './styles.css';

function App() {
    const [messages, setMessages] = React.useState([
        { text: "سلام! من یک چت بات ساده هستم. چطور می‌توانم به شما کمک کنم؟", isUser: false }
    ]);
    const [inputValue, setInputValue] = React.useState("");

    // پاسخ‌های از پیش تعریف شده
    const botResponses = {
        "سلام": "سلام! چطور می‌توانم به شما کمک کنم؟",
        "خداحافظ": "خداحافظ! روز خوبی داشته باشید.",
        "چطور هستی": "من خوبم، ممنون! شما چطورید؟",
        "اسمت چیه": "من یک چت بات ساده هستم.",
        "کمک": "من می‌توانم به سوالات ساده پاسخ دهم. سوال خود را بپرسید.",
        "default": "متأسفانه متوجه سوال شما نشدم. می‌توانید سوال خود را به صورت دیگری مطرح کنید؟"
    };

    const handleSendMessage = () => {
        if (inputValue.trim() === "") return;

        // اضافه کردن پیام کاربر
        const userMessage = { text: inputValue, isUser: true };
        setMessages(prev => [...prev, userMessage]);
        setInputValue("");

        // شبیه‌سازی تأخیر برای پاسخ بات
        setTimeout(() => {
            const userInput = inputValue.toLowerCase();
            let botResponse = botResponses.default;

            // بررسی کلیدواژه‌ها
            for (const [key, value] of Object.entries(botResponses)) {
                if (userInput.includes(key.toLowerCase())) {
                    botResponse = value;
                    break;
                }
            }

            const botMessage = { text: botResponse, isUser: false };
            setMessages(prev => [...prev, botMessage]);
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <div className="container">
            <div className="chat-container">
                <div className="chat-header">
                    <h2>چت بات ساده</h2>
                </div>
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.isUser ? "user" : "bot"}`}>
                            <div className="message-content">
                                {message.text}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="پیام خود را بنویسید..."
                    />
                    <button onClick={handleSendMessage}>ارسال</button>
                </div>
            </div>
        </div>
    );
}

export default App; 