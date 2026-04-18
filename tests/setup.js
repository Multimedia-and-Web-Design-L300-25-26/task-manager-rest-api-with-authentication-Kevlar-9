import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: ".env.test", quiet: true });
process.env.JWT_SECRET ||= "test-secret-key";

beforeAll(async () => {
	await mongoose.connect(process.env.MONGO_URI, {
		serverSelectionTimeoutMS: 5000
	});

	const { collections } = mongoose.connection;

	await Promise.all(
		Object.values(collections).map((collection) => collection.deleteMany({}))
	);
});

afterAll(async () => {
	await mongoose.connection.dropDatabase();
	await mongoose.connection.close();
});