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
    email: "support@browsewithnook.com",
  },
  {
    login: "baginski11",
    name: "Maciej Baginski",
    role: "Lead Developer",
    email: "baginski@browsewithnook.com",
  },
  {
    login: "judekim0507",
    name: "Jude Kim",
    role: "Lead Website, Developer",
    customPfp: "/pfp/jude.png",
    email: "jude@browsewithnook.com",
  },
  {
    name: "Fabian Rouillon",
    role: "Lead Designer, Marketing & Branding",
    url: "https://beacons.ai/fabianrouillon",
    customPfp: "/pfp/fabian.png",
    email: "fabian@browsewithnook.com",
  },
  {
    login: "JoltCode",
    name: "JoltCode",
    role: "Developer",
    email: "joe@browsewithnook.com",
  },
  {
    name: "Kacper Lipowy",
    role: "Branding",
    url: "https://www.kacperlipowy.com/",
    customPfp: "/pfp/kacper.png",
    email: "kacper@browsewithnook.com",
  },
];
