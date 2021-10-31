import { UserSession, AppConfig } from '@stacks/auth'
import { showConnect } from '@stacks/connect';
import { Storage } from '@stacks/storage';
import generateUUID from './generateUUID';

const myAppConfig = new AppConfig(["store_write"]);

if(process.env.NODE_ENV === "development") myAppConfig.appDomain = "http://localhost:3000/notga";
else myAppConfig.appDomain = "https://drabkirn.cdadityang.xyz/notga";

myAppConfig.redirectPath = "/login";

export const appConfig = myAppConfig;

export const loginPopup = showConnect;

export const userSession = new UserSession({ appConfig: appConfig });

export const userStorage = new Storage({ userSession: userSession });

export const isUserSignedIn = userSession.isUserSignedIn();



export const notebookFileName = "notebook_v1.json";

export const tagsFileName = "tags_v1.json";



export const easyMDEOptions = {
  autoDownloadFontAwesome: false,
  forceSync: true,
  indentWithTabs: false,
  placeholder: "Get started by taking your note here...",
  showIcons: ["strikethrough", "code", "table", "horizontal-rule"],
  hideIcons: ["side-by-side"],
  renderingConfig: {
    codeSyntaxHighlighting: true
  },
  spellChecker: false,
  uploadImage: true,
  imageAccept: "image/png, image/jpeg, image/jpg",
  imageUploadFunction: (file, onSuccess, onError) => uploadImage(file, onSuccess, onError),
  imageTexts: {
    sbInit: 'Drag & drop/copy-paste images!',
    sbOnDragEnter: 'Let it go, let it go',
    sbOnDrop: 'Uploading...',
    sbProgress: 'Uploading... (#progress#)',
    sbOnUploaded: 'Upload complete!',
    sizeUnits: 'b,Kb,Mb'
  },
  errorMessages: {
      noFileGiven: 'Please select a file',
      typeNotAllowed: 'This file type is not allowed!',
      fileTooLarge: 'Image too big',
      importError: 'Something went oops!',
  },
  errorCallback: (errorMessage) => {
    console.error(errorMessage);
    alert(errorMessage);
  }
};

async function uploadImage(file, onSuccess, onError) {
  const fileSizeLimit = 1024 * 1024 * 2; // 2 MB
  const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];

  if(!file) {
    onError("Image not found, please select a image.");
    return;
  }

  if(file.size >= fileSizeLimit) {
    onError("Image too big, max is 2 MB. You can compress it and upload.");
    return;
  }

  if(!allowedFileTypes.includes(file.type)) {
    onError("This file type is not allowed! Only png, jpg, jpeg allowed.");
    return;
  }

  const uuid = generateUUID();
  const options = { encrypt: true };
  await userStorage.putFile(`image-${uuid}.${file.type.split("/")[1]}`, file, options)
    .then((res) => {
      onSuccess(res);
    })
    .catch((err) => {
      onError(err);
    });
};


export const handleImagesRender = (userSession) => {
  const allImages = document.querySelectorAll('img');
  const onlyNotesImages = [...allImages].filter((image) => image.src.startsWith("https://gaia.blockstack.org/hub"));
  onlyNotesImages.forEach(async (image) => {
    const splitURL = image.src.split("/");
    const splitURLLength = splitURL.length;
    const relativeImageURL = splitURL[splitURLLength - 1];

    const options = { decrypt: true };
    await userStorage.getFile(relativeImageURL, options)
      .then((res) => {
        const arrayBufferView = new Uint8Array(res);
        const blob = new Blob([ arrayBufferView ], { type: "image/jpeg" });
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(blob);
        image.src = imageUrl;
        image.className = "responsive-img";
      })
      .catch((err) => {
        console.log(err);
      });
  });
};