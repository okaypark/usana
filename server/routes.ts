import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to submit contact form" });
      }
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to get contacts" });
    }
  });

  // Update contact status
  app.patch("/api/contacts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const { isContacted } = req.body;
      
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid contact ID" });
      }

      const contact = await storage.updateContactStatus(id, Boolean(isContacted));
      if (!contact) {
        return res.status(404).json({ success: false, message: "Contact not found" });
      }

      res.json({ success: true, contact });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to update contact" });
    }
  });

  // Get FAQs
  app.get("/api/faqs", async (req, res) => {
    try {
      const faqs = await storage.getFaqs();
      res.json(faqs);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to get FAQs" });
    }
  });

  // Create FAQ (for admin purposes)
  app.post("/api/faqs", async (req, res) => {
    try {
      const faqData = req.body;
      const faq = await storage.createFaq(faqData);
      res.json({ success: true, faq });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to create FAQ" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
