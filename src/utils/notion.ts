import { Client } from "@notionhq/client";
import type {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
const notion = new Client({ auth: import.meta.env.NOTION_API_KEY });
const databaseId = import.meta.env.NOTION_DB_ID;

export interface ArticleDetails {
  id: string;
  cover: string;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  lastEdited: string;
}

const getArticleDetails = (pages: PageObjectResponse[]): ArticleDetails[] => {
  // ToDo: Probably can re-map specific types to represent the Notion real response?
  return pages.map((page) => ({
    id: page.id,
    cover: page.cover ? (page.cover as any)[page.cover.type].url : "",
    slug:
      (page.properties.Slug as any).rich_text[0]?.plain_text ||
      "oops-forgotten-slug",
    title:
      (page.properties.Title as any).title[0]?.plain_text ||
      "oops-forgotten-title",
    excerpt: (page.properties.Excerpt as any).rich_text[0]?.plain_text || "",
    tags: (page.properties.Tags as any).multi_select.map(
      (select: any) => select.name
    ),
    lastEdited: (pages[0].properties["Last edited time"] as any)
      .last_edited_time,
  }));
};

export const fetchArticles = async () => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Status",
        status: {
          equals: "Published",
        },
      },
    });
    return getArticleDetails(response.results as PageObjectResponse[]);
  } catch (err) {
    console.log("🐞 fetchArticles: Failed to load articles", err);
    return [];
  }
};

export const fetchBlocks = async (pageId: string) => {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
    });
    return response.results as BlockObjectResponse[];
  } catch (err) {
    console.log("🐞 fetchBlocks: Failed to load article's blocks", err);
    return [];
  }
};

export const fetchBlockChildren = async (block_id: string) => {
  try {
    const response = await notion.blocks.children.list({
      block_id,
    });
    return response.results as BlockObjectResponse[];
  } catch (err) {
    console.log("🐞 fetchBlocks: Failed to load article's blocks", err);
    return [];
  }
};
