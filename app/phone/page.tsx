"use client";

import React, { useEffect, useState } from "react";
import { Device } from "@twilio/voice-sdk";

const PhonePage = () => {
  const [device, setDevice] = useState<Device | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    return () => {
      device?.disconnectAll();
      device?.destroy();
    };
  }, [device]);

  const handleConnect = async () => {
    const token = await fetch("http://localhost:3001/v1/api/twilio/token").then((res) => res.text());
    const newDevice = new Device(token);

    newDevice.on("connect", () => {
      setIsConnected(true);
    });

    newDevice.on("disconnect", () => {
      setIsConnected(false);
    });

    newDevice.on("incoming", (call) => {
      call.accept();
    });

    await newDevice.connect();
    setDevice(newDevice);
  };

  const handleDisconnect = () => {
    if (device) {
      device.disconnectAll();
      device.destroy();
      setDevice(null);
      setIsConnected(false);
    }
  };

  return (
    <div>
      <h1>Twilio Voice SDK</h1>
      <button onClick={handleConnect} disabled={isConnected}>
        Connect
      </button>
      <button onClick={handleDisconnect} disabled={!isConnected}>
        Disconnect
      </button>
      <div style={{ border: "1px solid black", padding: "20px", marginTop: "20px" }}>{isConnected ? "Connected to a call" : "Not connected"}</div>
    </div>
  );
};

export default PhonePage;
