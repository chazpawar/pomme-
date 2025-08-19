'use client';

import Image from "next/image";
import { useState } from "react";

export default function Spincock() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full min-h-screen bg-black relative">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              to right, transparent 0 150px, rgba(255,255,255,0.05) 150px 151px
            ),
            repeating-linear-gradient(
              to bottom, transparent 0 150px, rgba(255,255,255,0.05) 150px 151px
            )
          `,
        }}
      />

      {/* Main Banner */}
      <div className="h-screen -mt-12 overflow-hidden relative banner">
        {/* Product Container */}
        <div
          className={`absolute left-1/2 transform -translate-x-1/2 z-20 transition-all duration-700 cursor-pointer w-[300px] sm:w-[360px] md:w-[420px] lg:w-[480px] product ${
            isHovered ? "bottom-[200px]" : "bottom-[100px]"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Can 1 */}
          <Image
            src="/3d/coke1.png"
            alt="Can 1"
            width={520}
            height={1040}
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 transition-all duration-700 rotate-45 ${
              isHovered ? "opacity-0 rotate-y-90" : "opacity-100 rotate-y-0"
            }`}
            style={{
              transformOrigin: "center",
            }}
          />

          {/* Can 2 */}
          <Image
            src="/3d/coke2.png"
            alt="Can 2"
            width={520}
            height={1040}
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 transition-all duration-700 rotate-45 ${
              isHovered ? "opacity-100 rotate-y-0" : "opacity-0 -rotate-y-90"
            }`}
            style={{
              transformOrigin: "center",
            }}
          />
        </div>

        {/* Rock Elements */}
        <div className="absolute inset-0 w-full pointer-events-none rock">
          {/* Center Rock */}
          <Image
            src="/3.2d/rock1.png"
            alt="Rock 1"
            width={120}
            height={68}
            className={`absolute left-1/2 transform -translate-x-1/2 bottom-6 z-10 transition-all duration-700 ${
              isHovered ? "translate-y-6" : ""
            }`}
            style={{ height: "68px", width: "auto" }}
          />

          {/* Left Rock */}
          <Image
            src="/3.2d/rock2.png"
            alt="Rock 2"
            width={200}
            height={200}
            className={`absolute left-0 bottom-0 transition-all duration-700 ${
              isHovered ? "-translate-x-16 translate-y-16" : ""
            }`}
            style={{ height: "30%", width: "auto" }}
          />

          {/* Right Rock */}
          <div
            className="absolute right-0 transition-all duration-700"
            style={{
              bottom: "-50px",
              height: "60%",
              transform: `rotate(-25deg) ${
                isHovered ? "translateX(60px) translateY(60px)" : ""
              }`,
            }}
          >
            <Image
              src="/3.2d/rock3.png"
              alt="Rock 3"
              width={300}
              height={300}
              className="h-full w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}