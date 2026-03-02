import { Router, Request, Response } from "express";

type Book = {
  id: string;
  user: string;
  title: string;
  author: string;
  publishedYear?: number;
  genre?: string;
  description?: string;
  updatedAt: number;
};

// Demo in-memory store (replace with DB)
const books: Book[] = [
  {
    id: "1",
    user: "alice",
    title: "Old Title",
    author: "Old Author",
    publishedYear: 1999,
    genre: "Fiction",
    description: "Old description",
    updatedAt: Date.now(),
  },
];

const router = Router();

const allowedFields = new Set([
  "title",
  "author",
  "publishedYear",
  "genre",
  "description",
]);

function pickPatch(body: any) {
  const patch: Record<string, any> = {};
  for (const key of Object.keys(body ?? {})) {
    if (allowedFields.has(key)) patch[key] = body[key];
  }
  return patch;
}

function validatePatch(patch: Record<string, any>) {
  const errors: string[] = [];

  if ("title" in patch && (typeof patch.title !== "string" || patch.title.trim().length === 0))
    errors.push("title must be a non-empty string");

  if ("author" in patch && (typeof patch.author !== "string" || patch.author.trim().length === 0))
    errors.push("author must be a non-empty string");

  if ("publishedYear" in patch) {
    const y = patch.publishedYear;
    if (!Number.isInteger(y) || y < 0 || y > 9999) errors.push("publishedYear must be an integer between 0 and 9999");
  }

  if ("genre" in patch && typeof patch.genre !== "string")
    errors.push("genre must be a string");

  if ("description" in patch && typeof patch.description !== "string")
    errors.push("description must be a string");

  return errors;
}

router.patch("/books/:user", (req: Request, res: Response) => {
  const user = req.params.user;

  const patch = pickPatch(req.body);

  if (Object.keys(patch).length === 0) {
    return res.status(400).json({
      message: "No valid fields provided to update",
      allowedFields: Array.from(allowedFields),
    });
  }

  const errors = validatePatch(patch);
  if (errors.length) {
    return res.status(422).json({ message: "Validation failed", errors });
  }

  const book = books.find((b) => b.user === user);
  if (!book) {
    return res.status(404).json({ message: `Book for user '${user}' not found` });
  }

  Object.assign(book, patch, { updatedAt: Date.now() });

  return res.status(200).json(book);
});

export default router;
