export function script(url) {
  return new Promise((resolve, reject) => {
    let name = url.replace(/\W+/g, '_');

    if (!document.body.querySelector(`script[name="${name}"]`)) {
      let element = document.createElement('script');
      element.name = name;
      element.onload = resolve;
      element.onerror = reject;
      element.src = url;
      document.body.appendChild(element);
    } else {
      setTimeout(resolve);
    }
  });
}
