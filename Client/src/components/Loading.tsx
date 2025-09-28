import React, { useEffect, useState } from "react";
import "../App.css";

const Loading: React.FC = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="loading-container">
      <div className="spinner" />
      <p>Đang tải dữ liệu...</p>
    </div>
  );
};

export default Loading;
