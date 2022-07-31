const temp = (type: string) => {
  return (value: string) => {
    if (value.split('^')?.[1] === 'important') {
      return `{${type}: ${value.split('^').splice(0, 1).concat('!important').join(' ')}}`
    }
    return `{${type}: ${value}}`
  }
};

const clsn = (className:string) => className.includes('^important')
    ? className.replaceAll('^important', '')
    : className;

const styles: Record<string, (value: string) => string> = {
  'bg-color': temp('background-color'),
  color: temp('color'),
  'font-size':temp('font-size')
};

const styleSheet = document.styleSheets[0];

const catchCssRules: Record<string, string> = {};

const isImportant = (style: string) => style.at(0) === '!';

const trans = (style: string) => style.split('.').join('-');

const computeClassName = (style: string) => isImportant(style)
  ? `${trans(style.substring(1))}^important`
  : trans(style);

const setCssRule = (className: string) => {
  if (catchCssRules[className]) { 
    return
  }

  const arr = className.split('-');

  const type = arr.slice(0, -1).join('-');

  const value = arr.slice(-1)?.[0];

  if (styles?.[type]?.(value)) { 
    const rule = `.${clsn(className)} ${styles[type](value)}`;
    catchCssRules[className] = rule;
    styleSheet.insertRule(rule);
  } else {
    console.warn('call-css-warn',`${className}为定义！`)
  }

}

type StyleKey = 'bg.color' | 'color' | 'font.size';

type ClStyle = `!${StyleKey}.${string}` | `${StyleKey}.${string}`;

export const cl = (...styles: ClStyle[]) => styles.map(
  style => {
    const className = computeClassName(style);
    if (!catchCssRules[className]) {
      setCssRule(className)
    }
    return clsn(className);
  }
).join(' ');