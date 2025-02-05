import React, { useState, useEffect, useRef, useCallback } from "react";

const LoginSocket: React.FC = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string>("");
  const [screenshots, setScreenshots] = useState<Record<string, string> | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isCaptcha, setIsCaptcha] = useState(false);
  const [captchaImage, setCaptchaImage] = useState<string | null>(null);
  const [captchaCode, setCaptchaCode] = useState("");
  const [is2FA, setIs2FA] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [authImage, setAuthImage] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  const handleConnect = useCallback(() => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      console.log("Websocket connection is already open.");
      return;
    }

    const ws = new WebSocket("ws://localhost/api/meta-login-ws");

    ws.onopen = () => {
      console.log("WebSocket connected");
      setSocket(ws);
      socketRef.current = ws;
      setError(null);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "screenshot") {
          setMessage(`${data.step} screenshot received`);
          if (data.image) {
            setScreenshots((prevScreenshots) => ({
              ...prevScreenshots,
              [data.step]: data.image,
            }));
          }
        } else if (data.type === "error") {
          setError(data.message);
        } else if (data.type === "success") {
          setScreenshots(data.screenshots);
          setMessage(data.message);
          console.log("Login Success", data);
          setSocket(null);
          socketRef.current?.close();

          // Close the socket
        } else if (data.type === "captcha") {
          setMessage(data.message);
          setIsCaptcha(true);
          setCaptchaImage(data.image);
        } else if (data.type === "2fa") {
          setMessage(data.message);
          setIs2FA(true);
          setAuthImage(data.image);
        }
      } catch (e) {
        console.error("Error parsing WebSocket message:", e);
        setError("Error parsing data");
      }
    };

    ws.onerror = (event) => {
      console.error("WebSocket error:", event);
      setError("WebSocket error");
    };

    ws.onclose = () => {
      setSocket(null);
      socketRef.current = null;
      console.log("WebSocket connection closed");
      setMessage("websocket connection closed");
    };
    setSocket(ws);
    socketRef.current = ws;
  }, []);

  const sendCaptchaCode = () => {
    if (socket) {
      socket.send(JSON.stringify({ type: "captcha_code", code: captchaCode }));
      setIsCaptcha(false);
      setCaptchaImage(null);
      setCaptchaCode("");
    }
  };
  const send2FAcode = () => {
    if (socket) {
      socket.send(JSON.stringify({ type: "auth_code", code: authCode }));
      setIs2FA(false);
      setAuthImage(null);
      setAuthCode("");
    }
  };

  return (
    <div>
      <button onClick={handleConnect}>Start Login</button>
      {isCaptcha && captchaImage && (
        <div>
          <img src={`data:image/png;base64,${captchaImage}`} alt="Captcha" />
          <input
            type="text"
            placeholder="Enter captcha"
            value={captchaCode}
            onChange={(e) => setCaptchaCode(e.target.value)}
          />
          <button onClick={sendCaptchaCode}>Submit captcha</button>
        </div>
      )}
      {is2FA && authImage && (
        <div>
          <img
            src={`data:image/png;base64,${authImage}`}
            alt="2FA Authentication"
          />
          <input
            type="text"
            placeholder="Enter 2FA Code"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
          />
          <button onClick={send2FAcode}>Submit 2FA code</button>
        </div>
      )}

      <p>message: {message}</p>
      {error && <p>Error: {error}</p>}
      {screenshots && (
        <div>
          <h3>Screenshots:</h3>
          {Object.entries(screenshots).map(([key, value]) => (
            <div key={key}>
              <p>{key}:</p>
              <img
                src={`data:image/png;base64,${value}`}
                style={{ maxWidth: "300px" }}
                alt={`Screenshot of ${key}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoginSocket;
