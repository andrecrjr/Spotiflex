// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let body = "grant_type=client_credentials";
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Authorization: `Basic ${Buffer.from(
        `09cc6d07722546fdbb6f06e4e9161f90:${process.env.SPOTIFY_SECRET_KEY}`
      ).toString("base64")}`,
    },
    body: body,
  });
  const data = await response.json();

  res.status(200).json(data);
};
