const CARET = "^";
const COLON = ":";
const UNDERSCORE = "_";

const importAll = (r) =>
  r.keys().map((key) => key.slice(2).replace(".vue", "").split("/"));

const pages = importAll(require.context("../views", true, /\.vue$/));

const generateRoute = (path) => {
  if (path[0].toLowerCase().startsWith("index") && path.length > 1) {
    path.shift();
  }

  if (path.length === 1) {
    const shortcut = path[0].toLowerCase();
    return shortcut.startsWith("index")
      ? ""
      : shortcut.startsWith(UNDERSCORE)
      ? shortcut.replace(UNDERSCORE, COLON)
      : shortcut;
  }

  const lastElement = path[path.length - 1];

  if (lastElement.toLowerCase().startsWith("index")) {
    path.pop();
  } else if (lastElement.startsWith(UNDERSCORE)) {
    path[path.length - 1] = lastElement.replace(UNDERSCORE, COLON);
  }
  return path.map((p) => p.toLowerCase()).join("/");
};

const childrenFilter = (p) => ~p.indexOf(CARET);

const childrenByPath = pages
  .filter((path) => path.some(childrenFilter))
  .map((path) => {
    const copy = [...path];
    copy[copy.length - 1] = copy[copy.length - 1].slice(1);
    const key = `/${generateRoute(copy.slice(0, copy.length - 1))}`;
    return {
      path,
      route: `/${generateRoute(copy)}`,
      key,
    };
  })
  .reduce((acc, cur) => {
    const key = cur.key;
    delete cur.key;
    if (acc[key]) {
      acc[key].push(cur);
    } else {
      acc[key] = [cur];
    }
    return acc;
  }, {});

const defaultLayout = "AppLayout";

const notFoundPage = "Index";

const handleNotFoundPage = async () => {
  const module = await import(`../views/${notFoundPage}.vue`);
  const component = await module.default;
  return {
    path: "*",
    component,
  };
};

export default pages

  .filter((path) => !path.some(childrenFilter))

  .map(async (path) => {
    if (path.includes(notFoundPage)) {
      return await handleNotFoundPage();
    }

    const { default: component } = await import(`../views/${path.join("/")}`);

    const { layout, middlewares, name } = component;

    const route = `/${generateRoute([...path])}`;

    let children = [];
    if (childrenByPath[route]) {
      const promises = childrenByPath[route].map(async ({ path, route }) => {
        const { default: childComponent } = await import(
          `../views/${path.join("/")}`
        );
        const {
          layout: childLayout,
          middlewares: childMiddleware,
          name: childName,
        } = component;
        return {
          path: route,
          name: childName,
          component: childComponent,
          meta: {
            layout: childLayout || defaultLayout,
            middlewares: childMiddleware || {},
          },
        };
      });
      children = await Promise.all(promises);
    }
    return {
      path: route,
      name,
      component,
      meta: {
        layout: layout || defaultLayout,
        middlewares: middlewares || {},
      },
      children,
    };
  });
