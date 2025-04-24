import { useEffect, useState } from "preact/hooks";

type LanguageProps = {
  url: string
}

const Language = (props: LanguageProps) => {
  // const currentUrl = Astro.url.pathname;
  const [currentUrl, setCurrentUrl] = useState(props.url || '');
  const [itUrl, setItUrl] = useState(currentUrl)
  const [enUrl, setEnUrl] = useState(currentUrl)
  const [isAboutPageIT, setIsAboutPageIT] = useState(currentUrl?.indexOf("/su-di-noi") >= 0);
  const [isAboutPageEN, setIsAboutPageEN] = useState(currentUrl?.indexOf("/about") >= 0);
  const [isBlogPageIT, setIsBlogPageIT] = useState(currentUrl?.indexOf("/il-mio-blog") >= 0);
  const [isBlogPageEN, setIsBlogPageEN] = useState(currentUrl?.indexOf("/my-blog") >= 0);
  const [language, setLanguage] = useState(currentUrl?.indexOf("/it") >= 0 ? 'it' : 'en');

  if (isAboutPageIT || isAboutPageEN) {
    setEnUrl("/en/about");
    setItUrl("/it/su-di-noi");
  } else if (isBlogPageEN || isBlogPageIT) {
    setItUrl("/it/il-mio-blog");
    setEnUrl("/en/my-blog");
  } else {
    setEnUrl("/en");
    setItUrl("/it");
  }

  const changeLanguage = (val: string) => {
    setLanguage(val.indexOf('/it') >= 0 ? 'it' : 'en');
    location.pathname = val;
  }

  return(
    <div class='language-selection'>
      <select name="language" id="language" onChange={(opt)=> changeLanguage(opt?.currentTarget?.value)}>
        <option value={itUrl} key='it' selected={language === 'it'}> it </option>
        <option value={enUrl} key='en' selected={language === 'en'}> en </option>
      </select>
    </div>
  )
}

export default Language