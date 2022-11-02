---
slug: from-vue-to-astro
title: From Vue to Astro(-ish)
subtitle: I love Vue. But Astro is also kinda my thing now
date: 2022-11-2T11:38:14.158Z
unsplashId: YwSf1o8s79c
excerpt: I liked the idea behind Astro and wanted to build something more robust in the static world
---

As of today this website - icantevencode.com is powered by 🚀 [AstroJS](https://astro.build/). I am a pretty big VueJS fanboy and always discuss how I prefer it over stuff like React or *He-Who-Must-Not-Be-Named* (An-**khu**-glar). But I liked the idea behind Astro and wanted to build something more robust in the static world. The transition was pretty easy and without any major issues. Another thing is that I still have about 2 sections built with VueJS using the vue-integration. So...


## Tl;dr
- Lighthouse score - from 89 to 99
- Time to Interactive - from 2.6 s to 1.6 s
- Netlify build time - from 37s to 25 s
- Build files size - from 262 KB to 211 KB


## Why?
The previous version of the website was a Frankenstein-kind of a project that I did as a proof-of-concept: SSG experience powered fully by Vite and Vue (you can find it now here [vite-ssg-template](https://github.com/simeon-petrov-5/vite-ssg-template). This meant that plugins like [`vite-plugin-md`](https://github.com/antfu/vite-plugin-md), [`vite-plugin-pages`](https://github.com/hannoeru/vite-plugin-pages), [`vite-plugin-vue-layouts`](https://github.com/JohnCampionJr/vite-plugin-vue-layouts) and [`vite-ssg`](https://github.com/antfu/vite-ssg) were the main skeleton of the whole thing. And here lies the main issue... 

### Issue 1 - vite-plugin-md

> ❗ Note: I'm not up-to-date if my issue is still present with `vite-plugin-md` and I'm not hating on them. Different people have different use-cases and mine was not the best with this module. If this issue is now fixed then you can almost fully skip this section.

After an update from **vite-plugin-md** I couldn't anymore load my `.md` files via Vite's `globEager` and source the information from their frontmatter.

```js
const articleGlobs = import.meta.globEager("./*.md");
let articles = Object.keys(articleGlobs).map((key) => {
  return {
    to: key.replace("./", "/blog/").replace(".md", "").toLocaleLowerCase(),
    title: articleGlobs[key].title,
    date: articleGlobs[key].date,
    thumbnail: articleGlobs[key].thumbnail,
    excerpt: articleGlobs[key].excerpt,
  };
});
```

And wanting to create a dynamic `/blog` page listing all blog posts pretty much fully hangs on such behavior. There was a quick fix though - downgrading the version of `vite-plugin-md`. This is of course the first issue - I wasn't able to upgrade and use the latest versions until this was fixed.


### Issue 2 - Scrolling between pages and vite-ssg
This is another personal problem - when navigating through the website often the scroll behavior would be .. not the smoothest and either will stagger all over the page or just not scroll to the specific section. Again - this **can** be a pretty specific use case, which I totally get and was fine with. But the thing is ...

## Astro is cool. And made a lot of stuff easier.
Astro has support out-of-the-box for all of the stuff above - `.md` support, Prism highlight, working with frontmatter, scrolling between pages, etc. So for a lot of the stuff, I tried to "build" myself Astro comes ready and with a user-friendly approach.

The other thing is that usually, every JavaScript-based SSG generator in my experience (Next, Gatsby, Nuxt, Gridsome) has left me wanting more from the performance. A static SSG page would always need a lot of additional T.L.C. to have better performance results in a tool like Lighthouse. Astro in this case comes and delivered directly. So let's see what are the results.

## Results - was it worth it?

### Lighthouse data
Both websites were tested multiple times (10) after being deployed on Netlify. The average results are: 

| Category                 | Vite SSG | Astro |
| ------------------------ | --------- | ------------- |
| Performance score        | 89        | **99**        |
| First Contentful Paint   | 1.6 s     | 1.6 s         |
| Time to Interactive      | 2.6 s     | **1.6 s**     |
| Speed Index              | 2.0 s     | **1.8 s**     |
| Largest Contentful Paint | 3.6 s     | **1.6 s**     |

<br />
<br />

![Lighthouse scores](/assets/blog-imgs/from-vue-to-astro-1.jpg)


### Netlify build times
The build time on Netlify is also something that improves, although with currently 5 pages is not something major to track.

| Vite SSG | Astro |
| --------- | ------------- |
| 37s       | 25 s          |


### Overall file-size
The `/dist` folder size was also something I wanted to track and see if there was a difference

| Category     | Vite SSG | Astro |
| ------------ | --------- | ------------- |
| Size         | 262 KB    | *211 KB*      |
| Size on disk | 296 KB    | *244 KB*      |

## Summary
Vue is cool. Astro is also cool. The new build is smaller, has fewer files and is faster. This was a testing ground to see if Astro is something I can use in a more "production" situation down the road. The answer is a dedicated "yes" and will undoubtedly use it with the next project for a website that I have!