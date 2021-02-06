
interface LinkType {
  href: string;
  pathname: string;
  label: string;
}

export const mainLoyoutLinks = (userId: number): LinkType[] => {

  const links: LinkType[] = [
    {
      href: "/feed",
      pathname: "/feed",
      label: "Лента",
    },
    {
      href: `/profile/${userId}`,
      pathname: "/profile/[ID]",
      label: "Профиль",
    },
    {
      href: "/im",
      pathname: "/im",
      label: "Мессенджер",
    },
    {
      href: "/profile",
      pathname: "/profile",
      label: "Инициативы",
    },
    {
      href: "/command",
      pathname: "/command",
      label: "Команды",
    },
    {
      href: "/learn",
      pathname: "/learn",
      label: "Обучение",
    },
  ];

  return links
}