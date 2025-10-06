export type CoreMember = {
  login?: string;
  name?: string;
  role?: string;
  url?: string;
  customPfp?: string;
  email?: string;
};

export const CORE_TEAM: CoreMember[] = [
  {
    login: "jonathancaudill",
    name: "Jonathan Caudill",
    role: "Project Manager, Lead Developer",
    email: "support@nookbrowser.com",
  },
  {
    login: "baginski11",
    name: "Maciej Baginski",
    role: "Lead Developer",
    email: "baginski@nookbrowser.com",
  },
  {
    login: "judekim0507",
    name: "Jude Kim",
    role: "Lead Website, Backend & API",
    email: "jude@nookbrowser.com",
  },
  {
    name: "Fabian Rouillon",
    role: "Lead Designer, Marketing & Branding",
    url: "https://beacons.ai/fabianrouillon",
    customPfp: "/pfp/fabian.png",
    // "https://cdn.beacons.ai/user_content/hR3p0FloBbYDlelAHa2W46kETF73/profile_fabianrouillon.png?t=1735776005986",
    email: "fabian@nookbrowser.com",
  },
  {
    login: "JoltCode",
    name: "JoltCode",
    role: "Developer",
    email: "joe@nookbrowser.com",
  },
  {
    name: "Kacper Lipowy",
    role: "Branding",
    url: "https://www.linkedin.com/in/kl244246?utm_source=share&utm_campaign=share_via&utm_content=profile",
    customPfp: "/pfp/kacper.png",
    email: "kacper@nookbrowser.com",
  },
];
