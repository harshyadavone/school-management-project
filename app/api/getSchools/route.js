import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: false,
      },
    });


    const [rows] = await connection.execute("SELECT * FROM schools");

    await connection.end();

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching schools:", error);
    return NextResponse.json(
      { message: "Error fetching schools" },
      { status: 500 }
    );
  }
}
