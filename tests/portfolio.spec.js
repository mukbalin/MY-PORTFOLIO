const { test, expect } = require("@playwright/test");
test("space landing, background controls, and route navigation", async ({
  page,
  request,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "MUKHTAR",
  );
  await expect(page.locator(".hero-portrait img")).toBeVisible();
  await page
    .getByRole("button", { name: "Pause background animation" })
    .click();
  await expect(
    page.getByRole("button", { name: "Resume background animation" }),
  ).toHaveAttribute("aria-pressed", "true");
  const frozen = await page.locator("canvas").evaluate((c) => c.toDataURL());
  await page.mouse.move(100, 200);
  await page.evaluate(
    () =>
      new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
  );
  expect(await page.locator("canvas").evaluate((c) => c.toDataURL())).toBe(
    frozen,
  );
  await page.screenshot({
    path: "test-results/space-desktop.png",
    animations: "disabled",
  });
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "About", exact: true })
    .click();
  await expect(page).toHaveURL("/about");
  await expect(
    page
      .getByRole("navigation")
      .getByRole("link", { name: "About", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  for (const path of ["/Mukhtar_Bello_CV.pdf", "/Mukhtar_Bello_RESUME.pdf"]) {
    const response = await request.get(path);
    expect(response.ok()).toBeTruthy();
    expect((await response.body()).subarray(0, 4).toString()).toBe("%PDF");
  }
  expect(
    (await request.get("/projects.html", { maxRedirects: 0 })).status(),
  ).toBe(308);
  expect(errors).toEqual([]);
});
test("service accordions, skill filters, keyboard search, and reveals", async ({
  page,
}) => {
  await page.goto("/about");
  const panel = page
    .locator("details")
    .filter({ hasText: "INTERACTIVE EXPERIENCES" });
  await expect(panel).not.toHaveAttribute("open");
  await panel.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(panel).toHaveAttribute("open", "");
  await panel.locator("summary").click();
  await expect(panel).not.toHaveAttribute("open");
  await page.getByRole("button", { name: "Frameworks", exact: true }).click();
  await expect(page.locator(".tool-card")).toHaveCount(3);
  await page.keyboard.press("/");
  await expect(
    page.getByRole("textbox", { name: "Search technologies" }),
  ).toBeFocused();
  await page.getByRole("textbox", { name: "Search technologies" }).fill("next");
  await expect(page.locator(".tool-card")).toHaveCount(1);
  await expect(page.locator(".tool-card")).toContainText("Next.js");
  await page
    .getByRole("textbox", { name: "Search technologies" })
    .fill("unmatched");
  await expect(
    page.getByText("No matches. Try another technology or category."),
  ).toBeVisible();
  await page.getByRole("textbox", { name: "Search technologies" }).fill("");
  for (const target of await page.locator("[data-reveal]").all()) {
    await target.scrollIntoViewIfNeeded();
    await expect(target).toHaveCSS("opacity", "1");
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({
    path: "test-results/space-about.png",
    fullPage: true,
    animations: "disabled",
  });
});
test("project modal supports keyboard dismissal and focus restoration", async ({
  page,
}) => {
  await page.goto("/projects");
  const trigger = page.getByRole("button", {
    name: "View personal portfolio details",
  });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page
      .getByRole("dialog")
      .getByRole("heading", { name: "PERSONAL PORTFOLIO" }),
  ).toBeVisible();
  await page.screenshot({
    path: "test-results/space-project-dialog.png",
    animations: "disabled",
  });
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await page.getByRole("button", { name: "VIEW DETAILS", exact: true }).click();
  await page.getByRole("button", { name: "Close project details" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
test("mobile navigation, responsive layouts, reduced motion, and contact", async ({
  page,
  context,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.screenshot({
    path: "test-results/space-mobile.png",
    animations: "disabled",
  });
  await page.getByRole("button", { name: "Open main menu" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Contact", exact: true })
    .click();
  await expect(page).toHaveURL("/contact");
  await expect(
    page.getByRole("button", { name: "Open main menu" }),
  ).toHaveAttribute("aria-expanded", "false");
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page
    .locator(".contact-copy")
    .getByRole("button", { name: "Copy email address" })
    .click();
  await expect(page.locator(".contact-copy .copy-status")).toHaveText(
    "Email copied",
  );
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "mukhtarmuki123@gmail.com",
  );
  await page.getByLabel("Your name").fill("Portfolio visitor");
  await page.getByLabel("Your email").fill("visitor@example.com");
  await page.getByLabel("Subject", { exact: true }).fill("New website");
  await page
    .getByLabel("Message", { exact: true })
    .fill("I would like to discuss a website.");
  await page.getByRole("button", { name: "Open email draft" }).click();
  await expect(page.locator('.contact-form [role="status"]')).toContainText(
    "Your email app was requested",
  );
  await page.screenshot({
    path: "test-results/space-mobile-contact.png",
    fullPage: true,
    animations: "disabled",
  });
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/about", "/projects", "/contact"]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${route} fits ${width}px`,
      ).toBeTruthy();
    }
  }
});

test("custom cursor follows the pointer, reacts to controls, and yields to text inputs", async ({
  page,
}) => {
  await page.goto("/");
  let moveAttempt = 0;
  await expect
    .poll(async () => {
      await page.mouse.move(350 + (moveAttempt++ % 2), 220);
      return page.locator(".custom-cursor").getAttribute("data-visible");
    })
    .toBe("");
  await expect(page.locator(".custom-cursor")).toHaveAttribute(
    "data-visible",
    "",
  );
  await expect(page.locator("html")).toHaveClass("has-custom-cursor");
  await page.getByRole("link", { name: "GET IN TOUCH", exact: true }).hover();
  await expect(page.locator(".custom-cursor")).toHaveAttribute(
    "data-hover",
    "",
  );
  await page.mouse.down();
  await expect(page.locator(".custom-cursor")).toHaveAttribute(
    "data-pressed",
    "",
  );
  await page.mouse.up();
  await page.goto("/contact");
  await page.getByLabel("Your name").hover();
  await expect(page.locator(".custom-cursor")).not.toHaveAttribute(
    "data-visible",
  );
  await expect(page.locator("html")).not.toHaveClass("has-custom-cursor");
  await expect
    .poll(async () => {
      await page.mouse.move(100 + (moveAttempt++ % 2), 150);
      return page.locator(".custom-cursor").getAttribute("data-visible");
    })
    .toBe("");
  await expect(page.locator(".custom-cursor")).toHaveAttribute(
    "data-visible",
    "",
  );
  await page.keyboard.press("Tab");
  await expect(page.locator(".custom-cursor")).not.toHaveAttribute(
    "data-visible",
  );
});
test("touch and reduced motion retain a static starfield and native cursor", async ({
  browser,
}) => {
  const context = await browser.newContext({
    isMobile: true,
    hasTouch: true,
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3107");
  await page.getByRole("button", { name: "Open main menu" }).tap();
  await expect(
    page.getByRole("button", { name: "Close main menu" }),
  ).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator(".custom-cursor")).toBeHidden();
  const frozen = await page.locator("canvas").evaluate((c) => c.toDataURL());
  await page.mouse.move(180, 250);
  await page.evaluate(
    () =>
      new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
  );
  expect(await page.locator("canvas").evaluate((c) => c.toDataURL())).toBe(
    frozen,
  );
  await context.close();
});
