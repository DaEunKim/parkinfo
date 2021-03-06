import loadable from "@loadable/component";

export const Main = loadable(() => import("./Main"));
export const Home = loadable(() => import("./Home"));
export const List = loadable(() => import("./List"));
export const Board = loadable(() => import("./Board"));
export const DetailContent = loadable(() => import("./DetailContent"));
export const SignIn = loadable(() => import("./SignIn"));
export const SignUp = loadable(() => import("./SignUp"));
