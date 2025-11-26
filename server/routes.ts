import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDestinationSchema, insertBlogPostSchema, insertPackageSchema, insertPanchangEventSchema, insertVideoTestimonialSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Destination routes
  app.get("/api/destinations", async (req, res) => {
    try {
      const destinations = await storage.getAllDestinations();
      res.json(destinations);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/destinations/:id", async (req, res) => {
    try {
      const destination = await storage.getDestination(req.params.id);
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }
      res.json(destination);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/destinations", async (req, res) => {
    try {
      const validatedData = insertDestinationSchema.parse(req.body);
      const destination = await storage.createDestination(validatedData);
      res.status(201).json(destination);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.patch("/api/destinations/:id", async (req, res) => {
    try {
      const destination = await storage.updateDestination(req.params.id, req.body);
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }
      res.json(destination);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Blog post routes
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const blogPosts = await storage.getAllBlogPosts();
      res.json(blogPosts);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/blog-posts/:id", async (req, res) => {
    try {
      const blogPost = await storage.getBlogPost(req.params.id);
      if (!blogPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(blogPost);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/blog-posts", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const blogPost = await storage.createBlogPost(validatedData);
      res.status(201).json(blogPost);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.patch("/api/blog-posts/:id", async (req, res) => {
    try {
      const blogPost = await storage.updateBlogPost(req.params.id, req.body);
      if (!blogPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(blogPost);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Package routes
  app.get("/api/packages", async (req, res) => {
    try {
      const packages = await storage.getAllPackages();
      res.json(packages);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/packages/:id", async (req, res) => {
    try {
      const pkg = await storage.getPackage(req.params.id);
      if (!pkg) {
        return res.status(404).json({ message: "Package not found" });
      }
      res.json(pkg);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/packages", async (req, res) => {
    try {
      const validatedData = insertPackageSchema.parse(req.body);
      const pkg = await storage.createPackage(validatedData);
      res.status(201).json(pkg);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.patch("/api/packages/:id", async (req, res) => {
    try {
      const pkg = await storage.updatePackage(req.params.id, req.body);
      if (!pkg) {
        return res.status(404).json({ message: "Package not found" });
      }
      res.json(pkg);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Panchang events routes
  app.get("/api/panchang-events", async (req, res) => {
    try {
      const { year, month } = req.query;
      if (year && month) {
        const events = await storage.getPanchangEventsByMonth(
          parseInt(year as string),
          parseInt(month as string)
        );
        return res.json(events);
      }
      const events = await storage.getAllPanchangEvents();
      res.json(events);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/panchang-events/:id", async (req, res) => {
    try {
      const event = await storage.getPanchangEvent(req.params.id);
      if (!event) {
        return res.status(404).json({ message: "Panchang event not found" });
      }
      res.json(event);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/panchang-events", async (req, res) => {
    try {
      const validatedData = insertPanchangEventSchema.parse(req.body);
      const event = await storage.createPanchangEvent(validatedData);
      res.status(201).json(event);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.patch("/api/panchang-events/:id", async (req, res) => {
    try {
      const event = await storage.updatePanchangEvent(req.params.id, req.body);
      if (!event) {
        return res.status(404).json({ message: "Panchang event not found" });
      }
      res.json(event);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/panchang-events/:id", async (req, res) => {
    try {
      const success = await storage.deletePanchangEvent(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Panchang event not found" });
      }
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Video testimonials routes
  app.get("/api/video-testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getAllVideoTestimonials();
      res.json(testimonials);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/video-testimonials/:id", async (req, res) => {
    try {
      const testimonial = await storage.getVideoTestimonial(req.params.id);
      if (!testimonial) {
        return res.status(404).json({ message: "Video testimonial not found" });
      }
      res.json(testimonial);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/video-testimonials", async (req, res) => {
    try {
      const validatedData = insertVideoTestimonialSchema.parse(req.body);
      const testimonial = await storage.createVideoTestimonial(validatedData);
      res.status(201).json(testimonial);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.patch("/api/video-testimonials/:id", async (req, res) => {
    try {
      const testimonial = await storage.updateVideoTestimonial(req.params.id, req.body);
      if (!testimonial) {
        return res.status(404).json({ message: "Video testimonial not found" });
      }
      res.json(testimonial);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/video-testimonials/:id", async (req, res) => {
    try {
      const success = await storage.deleteVideoTestimonial(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Video testimonial not found" });
      }
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
