const STORAGE_KEY = "tesela_v1_savedata";
export const loadData = () => JSON.parse(localStorage.getItem(STORAGE_KEY));
export const saveData = (state) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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
