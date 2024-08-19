"use client";

import {
  DyteMeeting,
  DyteParticipantsAudio,
  provideDyteDesignSystem,
} from "@dytesdk/react-ui-kit";
import {
  DyteProvider,
  useDyteClient,
  useDyteMeeting,
  useDyteSelector,
} from "@dytesdk/react-web-core";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const MeetingUI = () => {
  const meetingRef = useRef<HTMLDyteMeetingElement>(null);
  const { meeting } = useDyteMeeting();
  const roomState = useDyteSelector((state) => state.self.roomState);

  useEffect(() => {
    if (meetingRef.current) {
      provideDyteDesignSystem(meetingRef.current, {
        googleFont: "Lato",
        colors: {
          text: "#000",
          "video-bg": "#3F937C",
          "text-on-brand": "#000",
          brand: {
            "300": "#D4E2DD",
            "400": "#BED3CC",
            "500": "#AFC8BF",
            "600": "#3F937C",
            "700": "#347866",
          },
          background: {
            "1000": "#0e201b",
            "900": "#1D4339",
            "800": "#285E50",
            "700": "#347866",
            "600": "#3F937C",
          },
        },
        borderRadius: "extra-rounded",
      });
    }
  }, [meetingRef.current]);

  if (roomState === "waitlisted") {
    return (
      <div
        style={{
          background:
            "linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)",
          padding: "20px",
          borderRadius: "10px",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "black" }}>This is a custom waiting room</h1>
      </div>
    );
  }

  return (
    <>
      <DyteMeeting
        mode="fill"
        meeting={meeting}
        showSetupScreen
        ref={meetingRef}
      />
      <DyteParticipantsAudio meeting={meeting} />
    </>
  );
};

export default function Meeting() {
  const [meeting, initMeeting] = useDyteClient();
  const params = useSearchParams();

  useEffect(() => {
    const authToken = params.get("authToken");
    if (authToken) {
      initMeeting({
        authToken,
        defaults: {
          audio: false,
          video: true,
        },
      });
    }
  }, [params]);

  return (
    <div style={{ height: "100vh" }}>
      <DyteProvider value={meeting}>
        <MeetingUI />
      </DyteProvider>
    </div>
  );
}
