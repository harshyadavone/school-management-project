import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { writeFile } from "fs/promises";
import path from "path";

async function createTableIfNotExists(connection) {
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address TEXT,
        city VARCHAR(100),
        state VARCHAR(100),
        contact VARCHAR(20),
        image VARCHAR(255),
        email_id VARCHAR(255)
      )
    `;

  await connection.execute(createTableQuery);
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const image = formData.get("image");

    if (!image) {
      return NextResponse.json(
        { message: "No image uploaded" },
        { status: 400 }
      );
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const imageName = `${Date.now()}-${image.name}`;
    const imagePath = path.join(
      process.cwd(),
      "public",
      "schoolImages",
      imageName
    );
    await writeFile(imagePath, buffer);

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


    // Create the table if it doesn't exist
    await createTableIfNotExists(connection);

    const [result] = await connection.execute(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, imageName, email_id]
    );

    await connection.end();

    return NextResponse.json({
      message: "School added successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error adding school:", error);
    return NextResponse.json(
      { message: "Error adding school", error: error.message },
      { status: 500 }
    );
  }
}
