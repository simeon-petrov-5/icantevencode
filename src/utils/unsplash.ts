import { createApi } from "unsplash-js";
import nodeFetch from "node-fetch";

const unsplash = createApi({
  accessKey: import.meta.env.UNSPLASH_KEY,
  fetch: nodeFetch as any,
});

interface Frontmatter {
  title: string;
  subtitle: string;
  unsplashId: string;
}

interface UnsplashData {
  url: string;
  username: string;
  desc: string;
  alt_desc: string;
}

const getUnsplashData = async (
  frontmatter: Frontmatter
): Promise<UnsplashData> => {
  const unsplashRes = await unsplash.photos.get({
    photoId: frontmatter.unsplashId,
  });

  const imgData: UnsplashData = {
    url: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixid=MnwzNzY0MjV8MHwxfGFsbHx8fHx8fHx8fDE2NjcxNTYxNTA&ixlib=rb-4.0.3&q=80&w=600",
    username: "sepoys",
    desc: "A snow covered Ama Dabl... ",
    alt_desc:
      "aerial photography of mountain range covered with snow under white and blue sky at daytime",
  };

  if (unsplashRes.type === "success") {
    const { urls, user, alt_description, description } = unsplashRes.response;
    imgData.url = urls.raw + "&q=80&w=600";
    imgData.username = user.username;
    imgData.alt_desc = alt_description || "Unsplash photo";

    if (description) {
      imgData.desc =
        description.length > 0
          ? description.substring(0, 23) + "..."
          : description;
    } else {
      imgData.desc = "";
    }
  }
  return imgData;
};

export default getUnsplashData;
