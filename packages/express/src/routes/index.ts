import { Router } from "express";
import { handler as ping } from "./ping";

const router = Router();

router.use("/-/ping", ping);

export { router as routes };
