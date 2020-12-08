import { send } from "../deps.js";

const errorMiddleware = async (context, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
  }
};

const requestTimingMiddleware = async ({ request }, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${request.method} ${request.url.pathname} - ${ms} ms`);
};

const serveStaticFilesMiddleware = async (context, next) => {
  if (context.request.url.pathname.startsWith("/static")) {
    const path = context.request.url.pathname.substring(7);

    await send(context, path, {
      root: `${Deno.cwd()}/static`,
    });
  } else {
    await next();
  }
};

const paywallMiddleware = async ({ request, response, session }, next) => {
  if (/^\/news\/[0-9]+/.test(request.url.pathname.trim())) {
    let count = await session.get("count");
    console.log(
      "🚀 ~ file: middlewares.js ~ line 33 ~ paywallMiddleware ~ count",
      count
    );
    if (!count) {
      count = 1;
    } else {
      count = Number(count) + 1;
    }

    await session.set("count", count);
    if (count > 3) {
      response.body = "This content is only for paying users.";
    } else {
      await next();
    }
  } else {
    await next();
  }
};

export {
  errorMiddleware,
  requestTimingMiddleware,
  serveStaticFilesMiddleware,
  paywallMiddleware,
};
