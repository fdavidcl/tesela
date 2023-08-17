
const STORAGE_KEY = "tesela_v1_savedata";
export const savedData = () => JSON.parse(localStorage.getItem(STORAGE_KEY));
export const initialState = {
  lists: [
    {
      title: "Social",
      links: [
        {
          title: "Mastodon (c.im)",
          href: "https://c.im",
        },
        {
          title: "Tumblr",
          href: "https://tumblr.com",
        },
      ],
    },
    {
      title: "Work",
      links: [
        {
          title: "LinkedIn",
          href: "https://linkedin.com",
        },
      ],
    },
    {
      title: "Shopping",
      links: [
        {
          title: "Steam",
          href: "https://store.steampowered.com",
        },
      ],
    },
  ],
};
