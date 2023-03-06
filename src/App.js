import React from "react";
import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

function App() {
  const qrRef = useRef();
  const [url, setUrl] = useState("");

  const handleDownload = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setUrl("");
  };

  const qrCodeEncoder = (e) => {
    setUrl(e.target.value);
  };

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={url}
      size={300}
      bgColor={"#ffffff"}
      level={"H"}
    />
  );
  return (
    <div className="w-full h-screen font-serif">
      <div className="w-full md:w-4/5 md:flex md:flex-row m-auto pt-[50px] md:pt-[200px] justify-around">
        <div className="w-[70%] md:w-[45%] px-2" ref={qrRef}>
          {qrcode}
        </div>
        <div className="w-[80%] md:w-2/5 m-auto">
          <form
            className="w-full md:flex flex-col my-10"
            onSubmit={handleDownload}
          >
            <label className="">Enter URL</label>
            <input
              className="bg-slate-600 text-white w-full py-4 pl-5 rounded-xl shadow-xl"
              type="text"
              value={url}
              onChange={qrCodeEncoder}
              placeholder="https://google.com"
            />
            <button
              type="submit"
              disabled={!url}
              className="bg-slate-400 w-full md:w-2/4 mt-5 md:mt-10 rounded-lg shadow-lg py-2"
            >
              Download QR code
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
