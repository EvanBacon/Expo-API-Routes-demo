// @ts-expect-error: untyped export
import registry from "@react-native/assets-registry/registry";
import { ExpoRequest, ExpoResponse } from "expo-router/server";
import satori from "satori";
import React from "react";

import fs from "fs";
import path from "path";

const MyFont = fs.readFileSync(
  assetToPath(require("assets/fonts/SpaceMono-Regular.ttf"))
);

export async function GET(req: ExpoRequest, { text }: { text: string }) {
  const svgString = await satori(
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundImage: "linear-gradient(to bottom, #dbf4ff, #fff1f1)",
        fontSize: 60,
        letterSpacing: -2,
        fontWeight: 700,
        textAlign: "center",
      }}
    >
      <div
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))",
          backgroundClip: "text",
          "-webkit-background-clip": "text",
          color: "transparent",
        }}
      >
        {decodeURIComponent(text)}
      </div>
      <div
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))",
          backgroundClip: "text",
          "-webkit-background-clip": "text",
          color: "transparent",
        }}
      >
        Once, Run
      </div>
      <div
        style={{
          display: "flex",
          backgroundImage:
            "linear-gradient(90deg, rgb(255, 77, 77), rgb(249, 203, 40))",
          backgroundClip: "text",
          "-webkit-background-clip": "text",
          color: "transparent",
        }}
      >
        Everywhere -- {new Date().toLocaleTimeString()}
      </div>
    </div>,
    {
      width: 600,
      height: 400,

      fonts: [
        {
          name: "Space",
          data: MyFont,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );

  return new ExpoResponse(svgString, {
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
}

function assetToPath(source: number): string {
  // get the URI from the packager
  const asset = registry.getAssetByID(source);
  if (asset == null) {
    throw new Error(
      `Asset with ID "${source}" could not be found. Please check the image source or packager.`
    );
  }
  return path.join(
    __dirname,
    process.env.NODE_ENV === "production" ? "../../../" : "",
    asset.httpServerLocation.replace("/assets/?unstable_path=", ""),
    `${asset.name}.${asset.type}`
  );
}
