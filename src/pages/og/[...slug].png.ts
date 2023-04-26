import type { APIContext } from "astro";
import satori from "satori";
import { html } from "satori-html";
import { fetchArticles } from "src/utils/notion";
import { Resvg } from '@resvg/resvg-js';

// Astro Endpoints / API route
// https://docs.astro.build/en/core-concepts/endpoints/

const articles = await fetchArticles();

export async function get({ props }: APIContext) {
  const Roboto = await fetch(
    "https://fonts.cdnfonts.com/s/19795/Inter-Regular.woff"
  ).then((res) => res.arrayBuffer());

  // JSX design
  const markup = html`<div
    style="
    box-sizing: border-box;
    color: #111827;
    width: 1200px;
    height: 768px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  "
  >
    <div
      style="
      text-align: center;
      box-sizing: border-box;
      position: relative;
      width: 100%;
      height: 80%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 32px 48px;
      background-image: url(${props.cover});
      background-position: center;
      background-size: 100% 100%;
    "
    >
      <div
        style="
        box-sizing: border-box;
        display: flex;
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background-color: #111827;
        opacity: 0.4;
      "
      ></div>
      <div
        style="
        position: relative;
        z-index: 1;
        font-size: 62px;
        font-weight: bold;
        color: #fff;
        text-shadow: 0px 0px 3px #000;
        font-weight: bold;
      "
      >
        ${props.title}
      </div>
    </div>

    <div
      style="
      box-sizing: border-box;
      background-color: #0e161a;
      width: 100%;
      height: 20%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 50px;
      border-top: 2px solid #a9e34b;
    "
    >
      <div style="font-size: 32px; color: #a9e34b">
        ${new Date(props.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>

      <div style="display: flex; align-items: center">
        <img
          src="https://avatars.githubusercontent.com/u/15708352?v=4"
          style="
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-right: 20px;
          border: 2px solid #a9e34b;
        "
        />
        <div style="font-size: 32px; color: #a9e34b">Simeon Petrov</div>
      </div>
    </div>
  </div>`;

  // Generate SVG
  const svg = await satori(markup, {
    width: 1200,
    height: 768,
    fonts: [
      {
        name: "Roboto",
        data: Roboto,
      },
    ],
  });

  // Generate PNG
  const resvg = new Resvg(svg)
  const pngData = resvg.render()
  const buffer = pngData.asPng()

  return {
    body: buffer,
    encoding: "binary",
    headers: {
      "Content-Type": "image/png",
    },
  };
}

// Export all posts as paths that can be mapped to the API route
export function getStaticPaths() {
  const paths = articles.map((article) => {
    return {
      params: {
        slug: "blog/" + article.slug,
      },
      props: {
        title: article.title,
        cover: article.cover,
        date: article.lastEdited,
      },
    };
  });
  return paths;
}
