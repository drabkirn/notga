import { AppConfig, UserSession } from 'blockstack';

const myAppConfig = new AppConfig(["store_write"]);

if(process.env.NODE_ENV === "development") myAppConfig.appDomain = "http://localhost:3000";
else myAppConfig.appDomain = "https://feedka.herokuapp.com";

myAppConfig.redirectPath = "/login";

export const appConfig = myAppConfig;

export const userSession = new UserSession({ appConfig: appConfig });

export const isUserSignedIn = userSession.isUserSignedIn();



export const notebookFileName = "notebook_v1.json";



export const easyMDEOptions = {
  autoDownloadFontAwesome: false,
  forceSync: true,
  indentWithTabs: false,
  placeholder: "Get started by taking your note here...",
  // minHeight: "500px",
  // onToggleFullScreen
  showIcons: ["strikethrough", "code", "table", "horizontal-rule"],
  renderingConfig: {
    codeSyntaxHighlighting: true
  },
  spellChecker: false,
  status: false
};