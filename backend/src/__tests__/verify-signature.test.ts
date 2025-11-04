import { describe, it, expect, beforeEach } from "bun:test";
import request from "supertest";
import app from "../app";
import { privateKeyToAccount } from "viem/accounts";

describe("POST /verify-signature", () => {
  let testAccount: ReturnType<typeof privateKeyToAccount>;
  let testAddress: string;

  beforeEach(() => {
    const privateKey = ("0x" + "1".repeat(64)) as `0x${string}`;
    testAccount = privateKeyToAccount(privateKey);
    testAddress = testAccount.address;
  });

  describe("Success cases", () => {
    it("should verify a valid signature and return success", async () => {
      const message = "Hello, World!";
      const signature = await testAccount.signMessage({ message });

      const response = await request(app)
        .post("/verify-signature")
        .set("x-wallet-address", testAddress)
        .send({
          message,
          signature,
        })
        .expect(200);

      expect(response.body).toHaveProperty("isValid", true);
      expect(response.body).toHaveProperty("signer");
      expect(response.body.signer.toLowerCase()).toBe(
        testAddress.toLowerCase()
      );
      expect(response.body).toHaveProperty("originalMessage", message);
    });

    it("should handle case-insensitive address comparison", async () => {
      const message = "Test message";
      const signature = await testAccount.signMessage({ message });

      // Test with uppercase address
      const response = await request(app)
        .post("/verify-signature")
        .set("x-wallet-address", testAddress.toUpperCase())
        .send({
          message,
          signature,
        })
        .expect(200);

      expect(response.body.isValid).toBe(true);
      expect(response.body.signer.toLowerCase()).toBe(
        testAddress.toLowerCase()
      );
    });
  });

  describe("Error cases", () => {
    it("should return 400 when x-wallet-address header is missing", async () => {
      const message = "Test message";
      const signature = await testAccount.signMessage({ message });

      const response = await request(app)
        .post("/verify-signature")
        .send({
          message,
          signature,
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Missing x-wallet-address header");
    });

    it("should return 400 when x-wallet-address is invalid", async () => {
      const message = "Test message";
      const signature = await testAccount.signMessage({ message });

      const response = await request(app)
        .post("/verify-signature")
        .set("x-wallet-address", "invalid-address")
        .send({
          message,
          signature,
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("Invalid Ethereum address");
    });

    it("should return 400 when message is empty", async () => {
      const signature = await testAccount.signMessage({ message: "test" });

      const response = await request(app)
        .post("/verify-signature")
        .set("x-wallet-address", testAddress)
        .send({
          message: "",
          signature,
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Validation Error");
    });

    it("should return 400 when signature is missing", async () => {
      const response = await request(app)
        .post("/verify-signature")
        .set("x-wallet-address", testAddress)
        .send({
          message: "Test message",
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Validation Error");
    });

    it("should return 400 when signature format is invalid", async () => {
      const response = await request(app)
        .post("/verify-signature")
        .set("x-wallet-address", testAddress)
        .send({
          message: "Test message",
          signature: "invalid-signature",
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Validation Error");
    });

    it("should return isValid=false when signature does not match the address", async () => {
      const message = "Test message";
      const signature = await testAccount.signMessage({ message });

      const differentAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0";

      const response = await request(app)
        .post("/verify-signature")
        .set("x-wallet-address", differentAddress)
        .send({
          message,
          signature,
        })
        .expect(200);

      expect(response.body.isValid).toBe(false);
      expect(response.body.signer).not.toBe(differentAddress.toLowerCase());
    });

    it("should return isValid=false when signature does not match the message", async () => {
      const message = "Original message";
      const signature = await testAccount.signMessage({ message });

      const response = await request(app)
        .post("/verify-signature")
        .set("x-wallet-address", testAddress)
        .send({
          message: "Different message",
          signature,
        })
        .expect(200);

      expect(response.body.isValid).toBe(false);
    });

    it("should handle invalid signature format", async () => {
      const response = await request(app)
        .post("/verify-signature")
        .set("x-wallet-address", testAddress)
        .send({
          message: "Test message",
          signature: "0x" + "a".repeat(130),
        })
        .expect(200);

      expect(response.body.isValid).toBe(false);
      expect(response.body.signer).toBe("");
    });
  });
});
