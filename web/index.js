// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";



// @ts-ignore
const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  // @ts-ignore
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// All endpoints after this point will require an active session
app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

app.get("/api/products/count", async (_req, res) => {
  try {
    const productCountData = await shopify.api.rest.Product.count({
      session: res.locals.shopify.session,
    });
    res.status(200).send(productCountData);
  } catch (error) {
    console.log(error)
  }
});


// GET a list of pages
app.get("/api/pages/", async (_req, res) => {
  try {
    let pageCountData = await shopify.api.rest.Page.all({
      session: res.locals.shopify.session
    });
    console.log("------------------------------: ", pageCountData)
    res.status(200).send(pageCountData);
  } catch (error) {
    console.log(error)
  }
})



// GET a single page
app.get("/api/pages/:id", async (_req, res) => {
  try {
    let page = await shopify.api.rest.Page.find({
      session: res.locals.shopify.session,
      id: _req.params.id
    });

    res.status(200).send(page);
  } catch (error) {
    console.log(error)
  }
})

// #POST: Creates a page
app.post("/api/pages", async (_req, res) => {
  try {
    const page = new shopify.api.rest.Page({
      session: res.locals.shopify.session
    });

    page.title = _req.body.title
    page.body_html = _req.body.body_html
    page.published = _req.body.published
    await page.save({
      update: true,
    });

    console.log("__-----------------------_req body:", _req.body)

    res.status(200).send(page);
  } catch (error) {
    console.log(error)
  }
})


// #DELETE: Delte a page
app.delete("/api/pages/:id", async (_req, res) => {
  try {
    const deletedPage = await shopify.api.rest.Page.delete({
      session: res.locals.shopify.session,
      id: _req.params.id
    });

    console.log("__-----------------------_req body:", _req.params)

    res.status(200).send(deletedPage);
  } catch (error) {
    console.log(error)
  }
})


// #PUT: UPDATE a page
app.put("/api/pages/:id", async (_req, res) => {
  try {
    const page = new shopify.api.rest.Page({
      session: res.locals.shopify.session,
    });
    page.id = _req.params.id
    page.published = _req.body.isShown

    await page.save({
      update: true,
    });

    console.log("__-----------------------_req body:", _req.body)

    res.status(200).send(page);
  } catch (error) {
    console.log(error)
  }
})
















// app.get("/api/products/create", async (_req, res) => {
//   let status = 200;
//   let error = null;

//   try {
//     await productCreator(res.locals.shopify.session);
//   } catch (e) {
//     console.log(`Failed to process products/create: ${e.message}`);
//     status = 500;
//     error = e.message;
//   }
//   res.status(status).send({ success: status === 200, error });
// });



app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
